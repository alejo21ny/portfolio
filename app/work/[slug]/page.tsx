import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PROJECTS, getProject } from "@/lib/projects";
import StatusPill from "@/app/components/StatusPill";
import Tag from "@/app/components/Tag";
import Screens from "@/app/components/Screens";
import ArchitectureDiagram from "@/app/components/diagrams/ArchitectureDiagram";
import WorkflowDiagram from "@/app/components/diagrams/WorkflowDiagram";
import DataModelDiagram from "@/app/components/diagrams/DataModelDiagram";

export const dynamicParams = false;

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}/` },
  };
}

function Block({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24">
      <p className="mb-1 font-mono text-xs uppercase tracking-wider text-accent">{eyebrow}</p>
      <h2 className="mb-5 text-2xl font-semibold tracking-tight">{title}</h2>
      {children}
    </section>
  );
}

export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  const index = PROJECTS.indexOf(project);
  const next = PROJECTS[(index + 1) % PROJECTS.length];

  const toc = [
    { id: "overview", label: "Overview" },
    project.screenshots && { id: "screens", label: "Screens" },
    project.architecture && { id: "architecture", label: "Architecture" },
    project.workflows && { id: "workflows", label: "Workflows" },
    project.dataModel && { id: "data-model", label: "Data model" },
    project.ai && { id: "ai", label: "AI" },
    { id: "stack", label: "Stack" },
  ].filter(Boolean) as { id: string; label: string }[];

  return (
    <article>
      <header className="relative overflow-hidden border-b border-border">
        <div className="bg-grid bg-grid-fade absolute inset-0 opacity-60" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-4 pb-12 pt-10 sm:px-6 sm:pt-14">
          <Link href="/#work" className="text-sm text-muted hover:text-foreground">
            ← All work
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <StatusPill status={project.status} />
            <span className="font-mono text-xs uppercase tracking-wider text-muted">
              {project.category} · {project.year}
            </span>
          </div>
          <p className="mt-4 text-sm font-medium text-accent">{project.label}</p>
          <h1 className="mt-1 text-4xl font-semibold tracking-tight sm:text-5xl">{project.name}</h1>
          <p className="mt-4 max-w-3xl text-lg text-muted">{project.summary}</p>

          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            {project.live && (
              <a href={project.live} className="rounded-md bg-accent px-4 py-2 font-medium text-accent-foreground hover:opacity-90">
                Visit live site ↗
              </a>
            )}
            {project.github && (
              <a href={project.github} className="rounded-md border border-border px-4 py-2 font-medium hover:border-accent">
                View source ↗
              </a>
            )}
            {project.privateRepo && (
              <span className="rounded-md border border-dashed border-border px-4 py-2 text-muted">
                Private repository — walkthrough on request
              </span>
            )}
          </div>

          <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border lg:grid-cols-4">
            {project.metrics.map((m) => (
              <div key={m.label} className="bg-surface p-4 sm:p-5">
                <dt className="sr-only">{m.label}</dt>
                <dd className="font-mono text-2xl font-semibold sm:text-3xl">{m.value}</dd>
                <dd className="mt-1 text-xs text-muted sm:text-sm">{m.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <nav
        aria-label="On this page"
        className="sticky top-[61px] z-30 border-b border-border bg-background/85 backdrop-blur-sm"
      >
        <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 py-2 text-sm sm:px-6">
          {toc.map((t) => (
            <a
              key={t.id}
              href={`#${t.id}`}
              className="shrink-0 rounded-md px-3 py-1.5 text-muted transition-colors hover:bg-surface hover:text-foreground"
            >
              {t.label}
            </a>
          ))}
        </div>
      </nav>

      <div className="mx-auto max-w-6xl space-y-16 px-4 py-14 sm:px-6 sm:py-16">
        <Block id="overview" eyebrow="Overview" title="Problem → solution">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-surface p-6">
              <p className="mb-2 font-mono text-xs uppercase tracking-wider text-rose-500">The problem</p>
              <p className="text-foreground/90">{project.problem}</p>
            </div>
            <div className="rounded-xl border border-accent/40 bg-surface p-6">
              <p className="mb-2 font-mono text-xs uppercase tracking-wider text-accent">What I built</p>
              <p className="text-foreground/90">{project.solution}</p>
            </div>
          </div>
        </Block>

        {project.screenshots && (
          <Block id="screens" eyebrow="Screens" title="The product, running">
            <Screens shots={project.screenshots} />
          </Block>
        )}

        {project.architecture && (
          <Block id="architecture" eyebrow="System design" title="Architecture">
            <ArchitectureDiagram architecture={project.architecture} />
          </Block>
        )}

        {project.workflows && (
          <Block id="workflows" eyebrow="How it works" title="Workflows & pipelines">
            <div className="space-y-6">
              {project.workflows.map((w, i) => (
                <WorkflowDiagram key={w.title} workflow={w} index={i} />
              ))}
            </div>
          </Block>
        )}

        {project.dataModel && (
          <Block id="data-model" eyebrow="Database" title="Data model">
            <DataModelDiagram model={project.dataModel} />
          </Block>
        )}

        {project.ai && (
          <Block id="ai" eyebrow="AI boundary" title="Where AI earns its keep">
            <ul className="grid gap-3 md:grid-cols-2">
              {project.ai.map((a) => (
                <li key={a} className="flex gap-3 rounded-xl border border-violet-500/30 bg-surface p-4 text-sm text-foreground/90">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-violet-500" aria-hidden />
                  {a}
                </li>
              ))}
            </ul>
          </Block>
        )}

        {project.sections?.map((s) => (
          <Block key={s.title} id={s.title.toLowerCase().replace(/[^a-z]+/g, "-")} eyebrow="Engineering" title={s.title}>
            {s.body && <p className="max-w-3xl text-muted">{s.body}</p>}
            {s.bullets && (
              <ul className="max-w-3xl space-y-2">
                {s.bullets.map((b) => (
                  <li key={b} className="flex gap-3 text-muted">
                    <span className="text-accent" aria-hidden>
                      ›
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            )}
          </Block>
        ))}

        <Block id="stack" eyebrow="Tooling" title="Stack">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {project.stack.map((g) => (
              <div key={g.group} className="rounded-xl border border-border bg-surface p-5">
                <p className="mb-3 font-mono text-xs uppercase tracking-wider text-muted">{g.group}</p>
                <div className="flex flex-wrap gap-2">
                  {g.items.map((i) => (
                    <Tag key={i}>{i}</Tag>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Block>

        <Link
          href={`/work/${next.slug}/`}
          className="group flex flex-col gap-1 rounded-xl border border-border bg-surface p-6 transition-colors hover:border-accent sm:flex-row sm:items-center sm:justify-between"
        >
          <span className="font-mono text-xs uppercase tracking-wider text-muted">Next case study</span>
          <span className="text-lg font-semibold group-hover:text-accent">{next.name} →</span>
        </Link>
      </div>
    </article>
  );
}
