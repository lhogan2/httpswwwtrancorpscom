// Server-only security utilities. Never import from client code.
import { getRequest } from "@tanstack/react-start/server";
import type { Database } from "@/integrations/supabase/types";

export type AppRole = Database["public"]["Enums"]["app_role"];

/** Best-effort client IP from edge headers. */
export function getClientIp(): string {
  const req = getRequest();
  const h = req.headers;
  return (
    h.get("cf-connecting-ip") ??
    h.get("x-real-ip") ??
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}

export function getUserAgent(): string {
  return (getRequest().headers.get("user-agent") ?? "unknown").slice(0, 300);
}

/** One-way hash so we never store raw IP addresses (PII minimisation). */
export async function hashIp(ip: string): Promise<string> {
  const salt = process.env["SUPABASE_SERVICE_ROLE_KEY"] ?? "static-fallback-salt";
  const bytes = new TextEncoder().encode(`${salt}:${ip}`);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .slice(0, 32);
}

/**
 * Fixed-window rate limiter backed by the private `rate_limits` table.
 * Returns false when the caller has exceeded `limit` requests in `windowMs`.
 */
export async function checkRateLimit(
  scope: string,
  identifier: string,
  limit: number,
  windowMs: number,
): Promise<boolean> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const windowStart = new Date(Math.floor(Date.now() / windowMs) * windowMs).toISOString();
  const bucketKey = `${scope}:${identifier}`;

  const { data: existing } = await supabaseAdmin
    .from("rate_limits")
    .select("id, request_count")
    .eq("bucket_key", bucketKey)
    .eq("window_start", windowStart)
    .maybeSingle();

  if (!existing) {
    const { error } = await supabaseAdmin
      .from("rate_limits")
      .insert({ bucket_key: bucketKey, window_start: windowStart, request_count: 1 });
    // Unique-violation means a concurrent request created it: fall through and count it.
    if (error && error.code !== "23505") return true;
    return true;
  }

  if (existing.request_count >= limit) return false;

  await supabaseAdmin
    .from("rate_limits")
    .update({ request_count: existing.request_count + 1 })
    .eq("id", existing.id);

  return true;
}

export type AuditEvent = {
  action: string;
  entity?: string;
  entityId?: string;
  actorId?: string | null;
  actorEmail?: string | null;
  metadata?: Record<string, unknown>;
};

/** Append-only audit trail. Failures never block the caller's request. */
export async function writeAuditLog(event: AuditEvent): Promise<void> {
  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await supabaseAdmin.from("audit_logs").insert({
      action: event.action,
      entity: event.entity ?? null,
      entity_id: event.entityId ?? null,
      actor_id: event.actorId ?? null,
      actor_email: event.actorEmail ?? null,
      metadata: (event.metadata ?? {}) as never,
      ip_hash: await hashIp(getClientIp()),
      user_agent: getUserAgent(),
    });
  } catch (err) {
    console.error("audit log write failed", err);
  }
}

/**
 * Server-side authorization. Throws when the signed-in user lacks every
 * allowed role. Always call this before privileged work — a route guard is UX,
 * this is the security boundary.
 *
 * Reads user_roles directly under RLS (users may read only their own roles);
 * the SECURITY DEFINER helper lives in a private schema and is not callable
 * over the API.
 */
export async function assertRole(
  supabase: {
    from: (table: "user_roles") => {
      select: (cols: string) => {
        eq: (col: string, val: string) => PromiseLike<{ data: { role: string }[] | null }>;
      };
    };
  },
  userId: string,
  allowed: AppRole[],
): Promise<AppRole> {
  const { data } = await supabase.from("user_roles").select("role").eq("user_id", userId);
  const held = new Set((data ?? []).map((r) => r.role));
  for (const role of allowed) {
    if (held.has(role)) return role;
  }
  throw new Error("Forbidden: insufficient permissions");
}

