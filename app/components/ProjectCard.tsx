import Link from "next/link";
import type { Project } from "@/lib/types";
import StatusPill from "./StatusPill";
import Tag from "./Tag";

export default function ProjectCard({ project, large }: { project: Project; large?: boolean }) {
  const lead = project.metrics[0];
  return (
    <article
      className={`group relative flex flex-col rounded-xl border border-border bg-surface p-6 transition-colors hover:border-accent ${
        large ? "lg:p-8" : ""
      }`}
    >
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <StatusPill status={project.status} />
        <span className="font-mono text-[11px] uppercase tracking-wider text-muted">{project.category}</span>
        {project.privateRepo && (
          <span className="font-mono text-[11px] text-muted" title="Source in a private repository">
            · private repo
          </span>
        )}
      </div>

      <p className="mb-1 text-sm font-medium text-accent">{project.label}</p>
      <h3 className={`mb-3 font-semibold tracking-tight ${large ? "text-2xl" : "text-xl"}`}>
        <Link href={`/work/${project.slug}/`} className="after:absolute after:inset-0">
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

      <p className="mt-5 text-sm font-medium text-foreground transition-colors group-hover:text-accent">
        Case study, diagrams &amp; workflows →
      </p>
    </article>
  );
}
