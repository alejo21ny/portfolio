import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PROJECTS } from "@/lib/projects";
import { SCREENS } from "@/lib/screens";
import { DICT, getProject, getProjects, localePath, type Locale } from "@/lib/i18n";
import Tag from "./Tag";
import Screens from "./Screens";
import ExternalLink from "./ExternalLink";
import ArchitectureDiagram from "./diagrams/ArchitectureDiagram";
import WorkflowDiagram from "./diagrams/WorkflowDiagram";
import DataModelDiagram from "./diagrams/DataModelDiagram";

export function caseStudyParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export function caseStudyMetadata(locale: Locale, slug: string): Metadata {
  const project = getProject(locale, slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.summary,
    alternates: {
      canonical: localePath(locale, `/work/${slug}/`),
      languages: { en: `/work/${slug}/`, es: `/es/work/${slug}/` },
    },
  };
}

function Block({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-32">
      <p className="mb-1 font-mono text-xs uppercase tracking-wider text-accent">{eyebrow}</p>
      <h2 className="mb-5 text-2xl font-semibold tracking-tight">{title}</h2>
      {children}
    </section>
  );
}

export default function CaseStudyPage({ locale, slug }: { locale: Locale; slug: string }) {
  const t = DICT[locale].caseStudy;
  const projects = getProjects(locale);
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const screens = SCREENS[slug];
  const next = projects[(projects.indexOf(project) + 1) % projects.length];

  const toc = [
    { id: "overview", label: t.toc.overview },
    screens && { id: "screens", label: t.toc.screens },
    project.architecture && { id: "architecture", label: t.toc.architecture },
    project.workflows && { id: "workflows", label: t.toc.workflows },
    project.dataModel && { id: "data-model", label: t.toc.dataModel },
    project.ai && { id: "ai", label: t.toc.ai },
    { id: "stack", label: t.toc.stack },
  ].filter(Boolean) as { id: string; label: string }[];

  return (
    <article>
      <header className="relative overflow-hidden border-b border-border">
        <div className="bg-grid bg-grid-fade absolute inset-0 opacity-60" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-4 pb-12 pt-10 sm:px-6 sm:pt-14">
          <Link href={`${localePath(locale, "/")}#work`} className="text-sm text-muted hover:text-foreground">
            {t.back}
          </Link>
          <p className="mt-6 font-mono text-xs uppercase tracking-wider text-muted">
            {DICT[locale].categories[project.category]} · {project.year}
          </p>
          <p className="mt-3 text-sm font-medium text-accent">{project.label}</p>
          <h1 className="mt-1 text-4xl font-semibold tracking-tight sm:text-5xl">{project.name}</h1>
          <p className="mt-4 max-w-3xl text-lg text-muted">{project.summary}</p>

          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            {project.live && (
              <ExternalLink
                href={project.live}
                className="rounded-md bg-accent px-4 py-2 font-medium text-accent-foreground hover:opacity-90"
              >
                {t.visit}
              </ExternalLink>
            )}
            {project.github && (
              <ExternalLink href={project.github} className="rounded-md border border-border px-4 py-2 font-medium hover:border-accent">
                {t.source}
              </ExternalLink>
            )}
            {project.privateRepo && (
              <span className="rounded-md border border-dashed border-border px-4 py-2 text-muted">{t.privateRepo}</span>
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

      <nav aria-label={t.toc.overview} className="sticky top-16 z-30 border-b border-border bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 py-2 text-sm sm:px-6">
          {toc.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="shrink-0 rounded-md px-3 py-1.5 text-muted transition-colors hover:bg-surface hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      <div className="mx-auto max-w-6xl space-y-16 px-4 py-14 sm:px-6 sm:py-16">
        <Block id="overview" eyebrow={t.overviewEyebrow} title={t.overviewTitle}>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-surface p-6">
              <p className="mb-2 font-mono text-xs uppercase tracking-wider text-rose-500">{t.problem}</p>
              <p className="text-foreground/90">{project.problem}</p>
            </div>
            <div className="rounded-xl border border-accent/40 bg-surface p-6">
              <p className="mb-2 font-mono text-xs uppercase tracking-wider text-accent">{t.built}</p>
              <p className="text-foreground/90">{project.solution}</p>
            </div>
          </div>
        </Block>

        {screens && (
          <Block id="screens" eyebrow={t.screensEyebrow} title={t.screensTitle}>
            <Screens shots={screens} locale={locale} />
          </Block>
        )}

        {project.architecture && (
          <Block id="architecture" eyebrow={t.archEyebrow} title={t.archTitle}>
            <ArchitectureDiagram architecture={project.architecture} connectionsLabel={t.keyConnections} />
          </Block>
        )}

        {project.workflows && (
          <Block id="workflows" eyebrow={t.flowsEyebrow} title={t.flowsTitle}>
            <div className="space-y-6">
              {project.workflows.map((w, i) => (
                <WorkflowDiagram key={w.title} workflow={w} index={i} legend={t.legend} />
              ))}
            </div>
          </Block>
        )}

        {project.dataModel && (
          <Block id="data-model" eyebrow={t.dataEyebrow} title={t.dataTitle}>
            <DataModelDiagram model={project.dataModel} relationshipsLabel={t.relationships} />
          </Block>
        )}

        {project.ai && (
          <Block id="ai" eyebrow={t.aiEyebrow} title={t.aiTitle}>
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

        {project.sections?.map((s, i) => (
          <Block key={s.title} id={`engineering-${i + 1}`} eyebrow={t.engineering} title={s.title}>
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

        <Block id="stack" eyebrow={t.stackEyebrow} title={t.stackTitle}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {project.stack.map((g) => (
              <div key={g.group} className="rounded-xl border border-border bg-surface p-5">
                <p className="mb-3 font-mono text-xs uppercase tracking-wider text-muted">{g.group}</p>
                <div className="flex flex-wrap gap-2">
                  {g.items.map((item) => (
                    <Tag key={item}>{item}</Tag>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Block>

        <Link
          href={localePath(locale, `/work/${next.slug}/`)}
          className="group flex flex-col gap-1 rounded-xl border border-border bg-surface p-6 transition-colors hover:border-accent sm:flex-row sm:items-center sm:justify-between"
        >
          <span className="font-mono text-xs uppercase tracking-wider text-muted">{t.next}</span>
          <span className="text-lg font-semibold group-hover:text-accent">{next.name} →</span>
        </Link>
      </div>
    </article>
  );
}
