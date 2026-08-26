import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, MapPin, Calendar, Briefcase, Network, Cpu, Radio, CheckCircle2, Menu, X } from "lucide-react";
import logoAsset from "@/assets/logo.png.asset.json";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TransCorps Consulting — Workforce Solutions & Corporate Recruitment" },
      {
        name: "description",
        content:
          "TransCorps Consulting is a specialized IT and Telecommunications sub-contracting practice based in Haymarket, VA. Founded in 2021 by Hao Tran.",
      },
      { property: "og:title", content: "TransCorps Consulting" },
      {
        property: "og:description",
        content: "Specialized IT and Telecommunications consulting and workforce solutions.",
      },
      { property: "og:image", content: logoAsset.url },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Navbar() {
  const [open, setOpen] = useState(false);
  const links = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];
  return (
    <header className="fixed inset-x-0 top-0 z-50 backdrop-blur-md bg-background/55 border-b border-border/60">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-10">
        <a href="#home" className="flex items-center gap-2.5 group">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-background ring-1 ring-border overflow-hidden">
            <img src={logoAsset.url} alt="TransCorps logo" className="h-9 w-9 object-cover" />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">
            Trans<span className="text-brand">Corps</span>
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative px-4 py-2 text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
              >
                <span className="relative">
                  {l.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-brand transition-all duration-300 group-hover:w-full hover:w-full" />
                </span>
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              className="ml-3 inline-flex items-center gap-1.5 rounded-md border border-brand/40 bg-brand/10 px-4 py-2 text-sm font-medium text-brand transition-all duration-300 hover:bg-brand hover:text-brand-foreground hover:shadow-[var(--shadow-brand)]"
            >
              Get in touch <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </li>
        </ul>

        <button
          onClick={() => setOpen((o) => !o)}
          className="md:hidden grid h-10 w-10 place-items-center rounded-md border border-border text-foreground"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>
      {open && (
        <div className="md:hidden border-t border-border/60 bg-background/95 backdrop-blur">
          <div className="mx-auto flex max-w-7xl flex-col px-4 py-3 sm:px-6">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-3 text-sm text-muted-foreground hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-md border border-brand/40 bg-brand/10 px-4 py-2.5 text-sm font-medium text-brand"
            >
              Get in touch
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section
      id="home"
      className="relative isolate overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28"
      style={{ background: "var(--gradient-hero)" }}
    >
      <div className="absolute inset-0 -z-10 grid-bg" aria-hidden />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_1fr]">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1.5 text-xs uppercase tracking-[0.18em] text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse" />
              Workforce Solutions · Est. 2021
            </div>
            <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.75rem]">
              Modernize your <span className="text-brand">digital presence</span>.
              <br className="hidden sm:block" />
              Compete. Win. Grow.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              <span className="text-foreground/90">
                As a small consulting business owner, I want to modernize and strengthen my digital
                presence
              </span>{" "}
              — so I can compete with other consulting firms and attract more clients. That's the
              brief TransCorps is built around.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-md bg-brand px-5 py-3 text-sm font-semibold text-brand-foreground shadow-[var(--shadow-brand)] transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0"
              >
                Request a consultation
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="#about"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-surface/60 px-5 py-3 text-sm font-medium text-foreground transition-all duration-300 hover:border-brand/50 hover:bg-surface-elevated"
              >
                About the firm
              </a>
            </div>

            <dl className="mt-12 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-border bg-border">
              {[
                { k: "2021", v: "Established" },
                { k: "VA", v: "Haymarket, USA" },
                { k: "1:1", v: "Owner-led service" },
              ].map((s) => (
                <div key={s.v} className="bg-background px-4 py-5 sm:px-6">
                  <dt className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
                    {s.k}
                  </dt>
                  <dd className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                    {s.v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-brand/10 blur-3xl" />
            <div
              className="relative rounded-2xl border border-border bg-surface p-8 sm:p-10"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <img
                src={logoAsset.url}
                alt="TransCorps Consulting"
                className="mx-auto aspect-[3/2] w-full max-w-sm rounded-lg object-cover"
              />
              <div className="mt-8 grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-border bg-background p-4">
                  <Cpu className="h-5 w-5 text-brand" />
                  <p className="mt-3 font-display text-sm font-semibold">Information Technology</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Modernization, cloud & cybersecurity advisory.
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-background p-4">
                  <Radio className="h-5 w-5 text-brand" />
                  <p className="mt-3 font-display text-sm font-semibold">Telecommunications</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Networks, voice systems & carrier engagement.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  const services = [
    {
      icon: Cpu,
      title: "Information Technology",
      body:
        "Strategic IT consulting for cloud adoption, infrastructure modernization, and cybersecurity posture for lean organizations.",
    },
    {
      icon: Radio,
      title: "Telecommunications",
      body:
        "Network design, voice & data systems, and carrier engagements — end-to-end telecom support for regional businesses.",
    },
    {
      icon: Network,
      title: "Workforce & Recruitment",
      body:
        "Sub-contracting capacity, candidate sourcing, and onboarding support for projects that need a senior hand on deck.",
    },
  ];

  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-[0.2em] text-brand">About</p>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              A one-person practice with enterprise discipline.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              TransCorps Consulting is a sub-contracting firm run by{" "}
              <span className="text-foreground">Hao Tran</span> — every engagement is delivered by
              the owner, with the rigor and accountability of a larger shop and the responsiveness
              of a true partner.
            </p>

            <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-surface">
              <div className="flex aspect-[4/3] w-full items-center justify-center bg-surface">
                <span className="font-display text-sm uppercase tracking-wider text-muted-foreground">
                  Founder · Principal Consultant
                </span>
              </div>
            </div>
          </div>

          <div className="min-w-0">
            <div className="grid gap-4 sm:grid-cols-2">
              <Fact icon={Calendar} label="Established" value="2021" />
              <Fact icon={MapPin} label="Located in" value="Haymarket, VA" />
              <Fact icon={Briefcase} label="Structure" value="Sub-contractor" />
              <Fact icon={CheckCircle2} label="Engagement" value="Owner-led" />
            </div>

            <div className="mt-10 space-y-px overflow-hidden rounded-2xl border border-border bg-border">
              {services.map((s) => (
                <div
                  key={s.title}
                  className="group flex gap-5 bg-background p-6 transition-colors duration-300 hover:bg-surface sm:p-7"
                >
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-md border border-brand/30 bg-brand/10 text-brand transition-transform duration-300 group-hover:scale-105">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display text-lg font-semibold tracking-tight">
                      {s.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="https://trancorps.zohorecruit.com/jobs/Careers"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 inline-flex items-center gap-3 rounded-xl border border-brand/30 bg-brand/10 px-5 py-3.5 text-base font-semibold text-brand transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-brand hover:bg-brand hover:text-brand-foreground hover:shadow-[var(--shadow-brand)]"
            >
              <Briefcase className="h-5 w-5" />
              View current job openings
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Fact({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Calendar;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-border bg-surface px-5 py-4">
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-background text-brand">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</p>
        <p className="font-display text-base font-semibold">{value}</p>
      </div>
    </div>
  );
}

function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", role: "candidate", message: "" });

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10">
        <div
          className="relative overflow-hidden rounded-3xl border border-border bg-surface p-6 sm:p-12 lg:p-16"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand/20 blur-3xl" />
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-[0.2em] text-brand">Get in touch</p>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                Drop your resume — or request a consultation.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                Whether you're a candidate looking for your next role or a business that needs
                senior IT or telecom expertise on a project, we'll respond personally within one
                business day.
              </p>

              <ul className="mt-8 space-y-3 text-sm">
                {[
                  "Owner-led communication — no account managers in the middle.",
                  "Specialized in IT & Telecommunications engagements.",
                  "Based in Haymarket, VA — serving clients nationwide.",
                ].map((b) => (
                  <li key={b} className="flex items-start gap-3 text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <a
                href="https://trancorps.zohorecruit.com/jobs/Careers"
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-8 flex items-center gap-4 rounded-2xl border border-border bg-background p-5 transition-all duration-500 ease-out hover:-translate-y-0.5 hover:border-brand/60 hover:bg-surface-elevated hover:shadow-[var(--shadow-card)]"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-brand/30 bg-brand/10 text-brand transition-all duration-500 ease-out group-hover:scale-105 group-hover:bg-brand group-hover:text-brand-foreground">
                  <Briefcase className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-lg font-semibold tracking-tight text-foreground transition-colors duration-300 group-hover:text-brand">
                    View current job openings
                  </span>
                  <span className="block text-sm text-muted-foreground transition-colors duration-300 group-hover:text-foreground/80">
                    Browse live roles on our careers board
                  </span>
                </span>
                <ArrowRight className="h-5 w-5 shrink-0 text-brand transition-transform duration-500 ease-out group-hover:translate-x-1" />
              </a>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="relative rounded-2xl border border-border bg-background p-5 sm:p-7"
            >
              {submitted ? (
                <div className="flex h-full min-h-[360px] flex-col items-center justify-center text-center">
                  <div className="grid h-14 w-14 place-items-center rounded-full border border-brand/40 bg-brand/10 text-brand">
                    <CheckCircle2 className="h-7 w-7" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold">Thanks, {form.name || "we got it"}.</h3>
                  <p className="mt-2 max-w-xs text-sm text-muted-foreground">
                    We'll reach out at {form.email || "your email"} within one business day.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ name: "", email: "", role: "candidate", message: "" });
                    }}
                    className="mt-6 text-xs uppercase tracking-wider text-brand hover:underline"
                  >
                    Send another
                  </button>
                </div>
              ) : (
                <div className="space-y-5">
                  <Field label="Full name">
                    <input
                      required
                      maxLength={100}
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="form-input"
                      placeholder="Jane Doe"
                    />
                  </Field>
                  <Field label="Email address">
                    <input
                      required
                      type="email"
                      maxLength={255}
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="form-input"
                      placeholder="jane@company.com"
                    />
                  </Field>
                  <Field label="I am a">
                    <div className="relative">
                      <select
                        value={form.role}
                        onChange={(e) => setForm({ ...form, role: e.target.value })}
                        className="form-input appearance-none pr-10"
                      >
                        <option value="candidate">Candidate — looking for opportunities</option>
                        <option value="employer">Employer — looking to hire / consult</option>
                      </select>
                      <ArrowRight className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 rotate-90 text-muted-foreground" />
                    </div>
                  </Field>
                  <Field label="Message (optional)">
                    <textarea
                      maxLength={1000}
                      rows={3}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="form-input resize-none"
                      placeholder="Tell us about your role or project…"
                    />
                  </Field>
                  <button
                    type="submit"
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-md bg-brand px-5 py-3 text-sm font-semibold text-brand-foreground shadow-[var(--shadow-brand)] transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110"
                  >
                    {form.role === "candidate" ? "Submit resume" : "Request consultation"}
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      <style>{`
        .form-input {
          width: 100%;
          background: transparent;
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 0.7rem 0.85rem;
          font-size: 0.875rem;
          color: var(--foreground);
          transition: border-color var(--transition-smooth), box-shadow var(--transition-smooth), background var(--transition-smooth);
        }
        .form-input::placeholder { color: color-mix(in oklab, var(--muted-foreground) 80%, transparent); }
        .form-input:focus {
          outline: none;
          border-color: var(--brand);
          box-shadow: 0 0 0 3px color-mix(in oklab, var(--brand) 25%, transparent);
          background: color-mix(in oklab, var(--brand) 4%, transparent);
        }
        .form-input option { background: var(--surface); color: var(--foreground); }
      `}</style>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-xs text-muted-foreground sm:flex-row sm:px-6 lg:px-10">
        <div className="flex items-center gap-2">
          <img src={logoAsset.url} alt="" className="h-6 w-6 rounded object-cover" />
          <span>© {new Date().getFullYear()} TransCorps Consulting · Haymarket, VA</span>
        </div>
        <div className="flex items-center gap-5">
          <a href="#home" className="hover:text-foreground transition-colors">Home</a>
          <a href="#about" className="hover:text-foreground transition-colors">About</a>
          <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
}

function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
