import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, MapPin, Calendar, Briefcase, Network, Cpu, Radio, CheckCircle2, Menu, X } from "lucide-react";


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
      { property: "og:image", content: "https://httpswwwtrancorpscom.lovable.app/logo.png" },
      { name: "twitter:image", content: "https://httpswwwtrancorpscom.lovable.app/logo.png" },
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
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-10">
        <a href="#home" aria-label="TransCorps — go to top of page" className="flex items-center gap-2.5 group">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-background ring-1 ring-border overflow-hidden">
            <img src="/logo.png" alt="TransCorps logo" className="h-9 w-9 object-cover" />
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
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="md:hidden grid h-10 w-10 place-items-center rounded-md border border-border text-foreground"
          aria-label={open ? "Close main menu" : "Open main menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>
      {open && (
        <div id="mobile-menu" className="md:hidden border-t border-border/60 bg-background/95 backdrop-blur">
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
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28"
      style={{ background: "var(--gradient-hero)" }}
    >
      <div className="absolute inset-0 -z-10 grid-bg" aria-hidden />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_1fr]">
          <div className="min-w-0">
            <h1 id="hero-heading" className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.75rem]">
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
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-brand/10 blur-3xl" />
            <div
              className="relative rounded-2xl border border-border bg-surface p-8 sm:p-10"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <img
                src="/logo.png"
                alt=""
                aria-hidden="true"
                className="mx-auto aspect-[3/2] w-full max-w-sm rounded-lg object-cover"
              />
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

  const facts = [
    { icon: Calendar, label: "Established", value: "2021" },
    { icon: MapPin, label: "Located in", value: "Haymarket, VA" },
    { icon: Briefcase, label: "Structure", value: "Sub-contractor" },
    { icon: CheckCircle2, label: "Engagement", value: "Owner-led" },
  ];

  return (
    <section id="about" aria-labelledby="about-heading" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-[0.2em] text-brand">About</p>
            <h2 id="about-heading" className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              A one-person practice with enterprise discipline.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              TransCorps Consulting is a sub-contracting firm run by{" "}
              <span className="text-foreground">Hao Tran</span> — every engagement is delivered by
              the owner, with the rigor and accountability of a larger shop and the responsiveness
              of a true partner.
            </p>

            <div
              className="mt-8 grid grid-cols-2 gap-3 rounded-2xl border border-border bg-surface p-6 sm:p-8"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              {facts.map((f) => (
                <div key={f.label} className="rounded-lg border border-border bg-background p-4">
                  <f.icon className="h-5 w-5 text-brand" />
                  <p className="mt-3 text-[12px] uppercase tracking-wider text-muted-foreground">
                    {f.label}
                  </p>
                  <p className="font-display text-sm font-semibold">{f.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="min-w-0">
            <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-border">
              {services.map((s) => (
                <div
                  key={s.title}
                  className="group flex flex-1 items-center gap-5 bg-background p-6 transition-colors duration-300 hover:bg-surface sm:p-7"
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
          </div>
        </div>
      </div>
    </section>
  );
}


function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="relative pb-24 pt-12 sm:pb-32 sm:pt-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10">
        <div
          className="relative overflow-hidden rounded-3xl border border-border bg-surface p-6 sm:p-12 lg:p-16"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand/20 blur-3xl" />
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.2em] text-brand">Get in touch</p>
            <h2 id="contact-heading" className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Let's work together.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              Whether you're a candidate looking for your next role or a business that needs
              senior IT or telecom expertise on a project, reach out — you'll hear back personally
              within one business day.
            </p>

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
                  <span className="sr-only"> (opens in a new tab)</span>
                </span>
                <span className="block text-sm text-muted-foreground transition-colors duration-300 group-hover:text-foreground/80">
                  Browse live roles on our careers board
                </span>
              </span>
              <ArrowRight className="h-5 w-5 shrink-0 text-brand transition-transform duration-500 ease-out group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-xs text-muted-foreground sm:flex-row sm:px-6 lg:px-10">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="" className="h-6 w-6 rounded object-cover" />
          <span>© {new Date().getFullYear()} TransCorps Consulting · Haymarket, VA</span>
        </div>
        <nav aria-label="Footer" className="flex items-center gap-5">
          <a href="#home" className="hover:text-foreground transition-colors">Home</a>
          <a href="#about" className="hover:text-foreground transition-colors">About</a>
          <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
        </nav>
      </div>
    </footer>
  );
}

function Home() {
  return (
    <div className="min-h-dvh bg-background text-foreground antialiased">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
