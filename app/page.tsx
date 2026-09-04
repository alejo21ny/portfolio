import Link from "next/link";
import Section from "./components/Section";
import ProjectCard from "./components/ProjectCard";
import Tag from "./components/Tag";
import { SITE } from "@/lib/site";
import { PROJECTS } from "@/lib/projects";

const EXPERTISE = [
  {
    title: "Full-Stack Engineering",
    items: ["React", "TypeScript / JavaScript", "PHP / Laravel", "Symfony", "Node.js", "REST APIs"],
  },
  {
    title: "AI & Automation",
    items: [
      "LLM APIs",
      "AI-assisted workflows",
      "conversational assistants",
      "tool/function patterns",
      "provider abstractions",
      "workflow automation",
    ],
  },
  {
    title: "Cloud & Platform",
    items: ["AWS", "Azure", "Cloudflare", "Docker", "Terraform", "CI/CD", "GitHub Actions"],
  },
  {
    title: "Data & Backend",
    items: ["PostgreSQL", "MySQL", "SQL", "Azure Data Factory", "ADLS", "Databricks", "PySpark"],
  },
  {
    title: "Systems & Integrations",
    items: [
      "Google Workspace",
      "Slack",
      "webhooks",
      "identity/access lifecycle",
      "scheduled jobs",
      "internal tooling",
    ],
  },
];

const WORK_ON = [
  "Production Software",
  "AI & Automation",
  "Cloud Platforms",
  "API & System Integrations",
  "Identity & Access",
  "Data Engineering",
  "Internal Tools",
];

export default function Home() {
  return (
    <>
      <section id="home" className="scroll-mt-20">
        <div className="mx-auto max-w-5xl px-6 py-24 sm:py-32">
          <p className="mb-4 text-sm font-medium tracking-wide text-accent animate-fade-up">
            {SITE.tagline}
          </p>
          <h1 className="mb-4 text-4xl font-semibold tracking-tight sm:text-6xl animate-fade-up">
            {SITE.name}
          </h1>
          <p className="mb-8 max-w-2xl text-xl text-muted animate-fade-up">{SITE.role}</p>
          <p className="mb-10 max-w-xl text-lg text-foreground/90 animate-fade-up">{SITE.statement}</p>

          <div className="flex flex-wrap items-center gap-4 animate-fade-up">
            <Link
              href="/#work"
              className="rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
            >
              View Work
            </Link>
            <Link
              href="/#contact"
              className="rounded-md border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:border-accent"
            >
              Contact Me
            </Link>
            <div className="ml-2 flex items-center gap-4 text-sm text-muted">
              <a href={SITE.github} className="hover:text-foreground">
                GitHub
              </a>
              <a href={SITE.linkedin} className="hover:text-foreground">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      <Section id="work" eyebrow="Selected work" title="Production work, not tutorials">
        <div className="grid gap-6 sm:grid-cols-2">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Section>

      <Section id="expertise" eyebrow="Capabilities" title="Expertise">
        <div className="grid gap-8 sm:grid-cols-2">
          {EXPERTISE.map((group) => (
            <div key={group.title}>
              <h3 className="mb-3 text-sm font-semibold tracking-wide text-muted">{group.title}</h3>
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
        <div className="grid gap-10 sm:grid-cols-2">
          <div className="space-y-4 text-muted">
            <p>
              Based in <span className="text-foreground">Medellín, Colombia</span>. 10+ years across
              software, cloud, internal systems, data and automation.
            </p>
            <p>Bilingual — English / Spanish.</p>
            <p>
              A senior hands-on technical contributor combining software engineering, platform
              operations, automation and business-oriented problem solving.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold tracking-wide text-muted">What I Work On</h3>
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

      <Section id="contact" eyebrow="Get in touch" title="Contact">
        <p className="mb-6 max-w-xl text-muted">
          Open to conversations about full-stack engineering, AI-assisted automation, and
          cloud/platform work.
        </p>
        <div className="flex flex-wrap gap-4">
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
      </Section>
    </>
  );
}
