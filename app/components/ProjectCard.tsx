import Link from "next/link";
import type { Project } from "@/lib/types";
import { DICT, localePath, type Locale } from "@/lib/i18n";
import Tag from "./Tag";

export default function ProjectCard({ project, locale, large }: { project: Project; locale: Locale; large?: boolean }) {
  const t = DICT[locale].card;
  const lead = project.metrics[0];
  return (
    <article
      className={`group relative flex flex-col rounded-xl border border-border bg-surface p-6 transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-lg hover:shadow-accent/5 ${
        large ? "lg:p-7" : ""
      }`}
    >
      <div className="mb-4 flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-muted">
        <span className="rounded border border-border px-2 py-0.5">{DICT[locale].categories[project.category]}</span>
        <span>{project.year}</span>
        {project.live && <span className="text-emerald-500">· {t.live}</span>}
        {project.privateRepo && <span className="normal-case tracking-normal">· {t.privateRepo}</span>}
      </div>

      <p className="mb-1 text-sm font-medium text-accent">{project.label}</p>
      <h3 className={`mb-3 font-semibold tracking-tight ${large ? "text-2xl" : "text-xl"}`}>
        <Link href={localePath(locale, `/work/${project.slug}/`)} className="after:absolute after:inset-0">
          {project.name}
        </Link>
      </h3>
      <p className="mb-5 text-muted">{project.summary}</p>

      {lead && (
        <p className="mb-5 flex items-baseline gap-2">
          <span className="font-mono text-2xl font-semibold text-foreground">{lead.value}</span>
          <span className="text-sm text-muted">{lead.label}</span>
        </p>
      )}

      <div className="mt-auto flex flex-wrap gap-2">
        {project.tags.slice(0, large ? 8 : 5).map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>

      <p className="mt-5 text-sm font-medium text-foreground transition-colors group-hover:text-accent">{t.cta} →</p>
    </article>
  );
}
