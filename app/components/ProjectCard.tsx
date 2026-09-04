import Link from "next/link";
import type { Project } from "@/lib/projects";
import Tag from "./Tag";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="rounded-lg border border-border bg-surface p-6 transition-colors hover:border-accent">
      <p className="mb-1 text-sm font-medium text-accent">{project.label}</p>
      <h3 className="mb-2 text-xl font-semibold tracking-tight">{project.name}</h3>
      <p className="mb-4 text-muted">{project.summary}</p>

      <div className="mb-5 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-4 text-sm">
        <Link href={`/work/${project.slug}`} className="font-medium text-foreground hover:text-accent">
          Case study →
        </Link>
        <a href={project.github} className="text-muted hover:text-foreground">
          GitHub
        </a>
        {project.live && (
          <a href={project.live} className="text-muted hover:text-foreground">
            Live demo
          </a>
        )}
      </div>
    </article>
  );
}
