import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const ALLOWED_MIME: Record<string, string> = {
  "application/pdf": "pdf",
  "application/msword": "doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
};

const MAX_FILE_BYTES = 5 * 1024 * 1024;

const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255).toLowerCase(),
  role: z.enum(["candidate", "employer"]),
  message: z.string().trim().max(1000).optional().default(""),
  // Honeypot: real users never fill this.
  company_website: z.string().max(0).optional().default(""),
  resume: z
    .object({
      filename: z.string().min(1).max(200),
      mimeType: z.string().max(200),
      // base64 payload, bounded before decoding
      data: z.string().max(Math.ceil((MAX_FILE_BYTES * 4) / 3) + 1024),
    })
    .nullable()
    .optional(),
});

export type ContactInput = z.input<typeof contactSchema>;

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => contactSchema.parse(input))
  .handler(async ({ data }) => {
    const {
      checkRateLimit,
      getClientIp,
      getUserAgent,
      hashIp,
      writeAuditLog,
    } = await import("./security.server");

    // Silently accept honeypot hits so bots don't learn the rule.
    if (data.company_website) return { ok: true as const };

    const ip = getClientIp();
    const ipHash = await hashIp(ip);

    const allowed = await checkRateLimit("contact_submit", ipHash, 5, 60 * 60 * 1000);
    if (!allowed) {
      await writeAuditLog({
        action: "contact.rate_limited",
        entity: "contact_submissions",
        metadata: { email_domain: data.email.split("@")[1] },
      });
      throw new Error("Too many submissions. Please try again later.");
    }

    let resumePath: string | null = null;

    if (data.resume) {
      const ext = ALLOWED_MIME[data.resume.mimeType];
      if (!ext) throw new Error("Unsupported file type. Upload a PDF or Word document.");

      let bytes: Uint8Array;
      try {
        const binary = atob(data.resume.data);
        bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
      } catch {
        throw new Error("Could not read the uploaded file.");
      }
      if (bytes.byteLength === 0 || bytes.byteLength > MAX_FILE_BYTES) {
        throw new Error("Resume must be between 1 byte and 5 MB.");
      }

      // Content sniffing: PDFs start with %PDF-, OOXML/OLE have known magic bytes.
      const magic = String.fromCharCode(...bytes.slice(0, 5));
      const looksPdf = magic.startsWith("%PDF-");
      const looksZip = bytes[0] === 0x50 && bytes[1] === 0x4b;
      const looksOle = bytes[0] === 0xd0 && bytes[1] === 0xcf;
      if (!(looksPdf || looksZip || looksOle)) {
        throw new Error("File content does not match a PDF or Word document.");
      }

      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      // Server-generated path only — filename from the client is never trusted.
      resumePath = `${new Date().getFullYear()}/${crypto.randomUUID()}.${ext}`;
      const { error: uploadError } = await supabaseAdmin.storage
        .from("resumes")
        .upload(resumePath, bytes, { contentType: data.resume.mimeType, upsert: false });
      if (uploadError) {
        console.error("resume upload failed", uploadError);
        throw new Error("Could not store the resume. Please try again.");
      }
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin
      .from("contact_submissions")
      .insert({
        name: data.name,
        email: data.email,
        role: data.role,
        message: data.message || null,
        resume_path: resumePath,
        ip_hash: ipHash,
        user_agent: getUserAgent(),
      })
      .select("id")
      .single();

    if (error) {
      console.error("contact insert failed", error);
      throw new Error("Submission failed. Please try again.");
    }

    await writeAuditLog({
      action: "contact.submitted",
      entity: "contact_submissions",
      entityId: row.id,
      metadata: { role: data.role, has_resume: Boolean(resumePath) },
    });

    return { ok: true as const };
  });
