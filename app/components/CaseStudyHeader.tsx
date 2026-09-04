import Link from "next/link";
import Tag from "./Tag";

export default function CaseStudyHeader({
  label,
  title,
  tags,
  github,
  live,
}: {
  label: string;
  title: string;
  tags: string[];
  github: string;
  live?: string;
}) {
  return (
    <header className="mx-auto max-w-3xl px-6 pt-16">
      <Link href="/#work" className="text-sm text-muted hover:text-foreground">
        ← Back to work
      </Link>
      <p className="mt-6 text-sm font-medium tracking-wide text-accent">{label}</p>
      <h1 className="mb-4 mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
      <div className="mb-6 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
      <div className="mb-4 flex flex-wrap gap-4 text-sm">
        <a href={github} className="font-medium text-foreground hover:text-accent">
          View source →
        </a>
        {live && (
          <a href={live} className="font-medium text-foreground hover:text-accent">
            Live demo →
          </a>
        )}
      </div>
    </header>
  );
}
