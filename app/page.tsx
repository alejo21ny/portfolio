import Link from "next/link";
import Section from "./components/Section";
import ProjectCard from "./components/ProjectCard";
import SystemMap from "./components/SystemMap";
import Tag from "./components/Tag";
import WorkflowDiagram from "./components/diagrams/WorkflowDiagram";
import { SITE } from "@/lib/site";
import { PROJECTS } from "@/lib/projects";
import type { Workflow } from "@/lib/types";

const EXPERTISE = [
  {
    title: "Full-Stack Engineering",
    icon: "</>",
    items: ["React", "Next.js", "TypeScript", "PHP / Laravel", "Python / FastAPI", "Node.js", "React Native / Expo"],
  },
  {
    title: "AI & Automation",
    icon: "◇",
    items: [
      "LLM APIs & provider abstractions",
      "Grounded assistants",
      "Tool / function patterns",
      "AI-assisted delivery (agents)",
      "Scrapers & enrichment",
      "Schedulers & background jobs",
    ],
  },
  {
    title: "Cloud & Platform",
    icon: "☁",
    items: ["Cloudflare Workers / Pages / R2 / KV", "AWS", "Azure", "Docker", "Terraform", "GitHub Actions"],
  },
  {
    title: "Data & Backend",
    icon: "▤",
    items: ["PostgreSQL / PostGIS", "Drizzle / SQLAlchemy / Eloquent", "Neon", "Azure Data Factory", "Databricks", "PySpark"],
  },
  {
    title: "Payments & Integrations",
    icon: "⇄",
    items: ["Wompi", "PayU", "HubSpot", "Google OAuth", "Webhooks & idempotency", "Push (Expo / FCM)"],
  },
  {
    title: "Security & Reliability",
    icon: "⛨",
    items: ["CSP / HSTS", "OTP + TOTP MFA", "RBAC", "Rate limiting", "Audit trails", "Fail-closed config"],
  },
];

// How every project on this site was delivered. Each step is backed by
// artifacts in the repos themselves (discovery docs, ADRs, CLAUDE.md agent
// rules, CI gates, staged deploy workflows).
const PROCESS: Workflow = {
  title: "AI-augmented delivery, human-owned decisions",
  summary:
    "AI agents multiply output; written decisions, automated gates and human review keep it production-grade.",
  steps: [
    { label: "Discovery & audit", detail: "current-state audit, written scope", kind: "user" },
    { label: "Architecture & ADRs", detail: "decisions recorded before code", kind: "user" },
    { label: "Agent-assisted build", detail: "coding agents work against repo rules", kind: "ai" },
    { label: "Automated gates", detail: "types, lint, unit, DB, E2E, a11y, CSP", kind: "guard" },
    { label: "Human review", detail: "every change read and owned", kind: "user" },
    { label: "Staged release", detail: "staging first, gated production", kind: "auto" },
  ],
};

const PRINCIPLES = [
  {
    title: "The database is the last line of defence",
    body: "Double-bookings and oversold matches are made impossible with EXCLUDE constraints, unique indexes and advisory locks — not just checked in application code.",
  },
  {
    title: "Only a verified webhook moves money",
    body: "Payment confirmations come from signed, deduplicated provider events cross-checked against a snapshot. A redirect page never counts as success.",
  },
  {
    title: "Idempotent by default",
    body: "Imports, syncs, scrapers and notifications can all re-run safely — keyed on external ids and idempotency keys, resumable from a cursor.",
  },
  {
    title: "AI where it is grounded",
    body: "Assistants answer from real rows behind a read-only tool surface and a swappable provider. No invented data, no unscoped write access.",
  },
  {
    title: "Fail closed",
    body: "Apps refuse to boot with dev harnesses, sandbox providers or weak database TLS in production. Deploys need an explicit target.",
  },
  {
    title: "Honest status",
    body: "Every project here says exactly what is live, what is on staging, and what is built and tested. No fabricated metrics.",
  },
];

const WORK_ON = [
  "Production web & mobile products",
  "AI assistants & automation",
  "Booking, marketplace & payment engines",
  "API & system integrations",
  "Cloud platforms on the edge",
  "Data engineering",
  "Identity, access & security",
];

const totalTests = 723 + 165 + 164 + 230 + 87 + 93 + 13 + 42; // each figure is stated in its project's repo

export default function Home() {
  const featured = PROJECTS.filter((p) => p.featured);
  const rest = PROJECTS.filter((p) => !p.featured);
  const live = PROJECTS.filter((p) => p.status === "Live").length;

  const stats = [
    { value: `${PROJECTS.length}`, label: "systems with case studies" },
    { value: `${Math.floor(totalTests / 100) * 100}+`, label: "automated tests across them" },
    { value: `${live}`, label: "live in production" },
    { value: "10+", label: "years in software & cloud" },
  ];

  return (
    <>
      <section id="home" className="relative scroll-mt-20 overflow-hidden">
        <div className="bg-grid bg-grid-fade absolute inset-0 opacity-70" aria-hidden />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-muted animate-fade-up">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse-soft" aria-hidden />
              Full-stack · AI automation · Cloud — Medellín, CO
            </p>
            <h1 className="mb-4 text-4xl font-semibold tracking-tight sm:text-6xl animate-fade-up">
              {SITE.name}
            </h1>
            <p className="mb-6 text-xl text-accent sm:text-2xl animate-fade-up">{SITE.role}</p>
            <p className="mb-8 max-w-xl text-lg text-foreground/85 animate-fade-up">{SITE.statement}</p>

            <div className="flex flex-wrap items-center gap-3 animate-fade-up">
              <Link
                href="/#work"
                className="rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
              >
                See the systems
              </Link>
              <Link
                href="/#contact"
                className="rounded-md border border-border bg-surface px-5 py-2.5 text-sm font-medium transition-colors hover:border-accent"
              >
                Contact me
              </Link>
              <div className="flex items-center gap-4 px-1 text-sm text-muted">
                <a href={SITE.github} className="hover:text-foreground">
                  GitHub
                </a>
                <a href={SITE.linkedin} className="hover:text-foreground">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          <div className="animate-fade-up">
            <SystemMap />
          </div>
        </div>

        <div className="relative mx-auto max-w-6xl px-4 pb-16 sm:px-6">
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-surface p-5">
                <dd className="font-mono text-3xl font-semibold">{s.value}</dd>
                <dt className="mt-1 text-sm text-muted">{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <Section id="work" eyebrow="Selected work" title="Systems I've designed and built">
        <p className="-mt-4 mb-8 max-w-2xl text-muted">
          Every case study includes the architecture, the real workflows and the data model — drawn from the
          code, not from a pitch deck.
        </p>
        <div className="grid gap-6 lg:grid-cols-3">
          {featured.map((p) => (
            <ProjectCard key={p.slug} project={p} large />
          ))}
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </Section>

      <Section id="process" eyebrow="How I build" title="AI-augmented, production-minded">
        <p className="-mt-4 mb-8 max-w-2xl text-muted">
          I use AI coding agents every day — inside a process where architecture is written down first,
          every change passes automated gates, and a human owns every merge and every deploy.
        </p>
        <WorkflowDiagram workflow={PROCESS} />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PRINCIPLES.map((p, i) => (
            <div key={p.title} className="rounded-xl border border-border bg-surface p-5">
              <p className="mb-2 font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mb-2 font-semibold tracking-tight">{p.title}</h3>
              <p className="text-sm text-muted">{p.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="expertise" eyebrow="Capabilities" title="Expertise">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {EXPERTISE.map((group) => (
            <div key={group.title} className="rounded-xl border border-border bg-surface p-5">
              <div className="mb-4 flex items-center gap-3">
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-border font-mono text-sm text-accent"
                  aria-hidden
                >
                  {group.icon}
                </span>
                <h3 className="font-semibold tracking-tight">{group.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <Tag key={item}>{item}</Tag>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="about" eyebrow="About" title="About David">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="space-y-4 text-muted">
            <p>
              Based in <span className="text-foreground">{SITE.location}</span>. 10+ years across software,
              cloud, internal systems, data and automation. Bilingual — English / Spanish.
            </p>
            <p>
              A senior hands-on engineer who takes products from a blank repo to staging and production:
              architecture, backend, frontend, mobile, payments, infrastructure and the automation around
              them.
            </p>
            <p>
              I also run{" "}
              <a href="https://gworksystems.com" className="text-foreground underline decoration-accent underline-offset-4">
                GWork Systems
              </a>
              , a practice for software, AI automation, cloud and digital security.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold tracking-wide text-muted">What I work on</h3>
            <ul className="space-y-2">
              {WORK_ON.map((item) => (
                <li key={item} className="flex items-center gap-2 text-foreground/90">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section id="contact" eyebrow="Get in touch" title="Let's build something real">
        <div className="rounded-2xl border border-border bg-surface p-6 sm:p-10">
          <p className="mb-6 max-w-xl text-muted">
            Open to senior and lead roles, and to projects in full-stack engineering, AI-assisted
            automation, and cloud/platform work. Private repositories can be walked through on a call.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={`mailto:${SITE.email}`}
              className="rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
            >
              Email me
            </a>
            <a
              href={SITE.linkedin}
              className="rounded-md border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:border-accent"
            >
              LinkedIn
            </a>
            <a
              href={SITE.github}
              className="rounded-md border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:border-accent"
            >
              GitHub
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}
