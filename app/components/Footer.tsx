import { SITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-6 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {SITE.name}
        </p>
        <div className="flex gap-4">
          <a href={SITE.github} className="transition-colors hover:text-foreground">
            GitHub
          </a>
          <a href={SITE.linkedin} className="transition-colors hover:text-foreground">
            LinkedIn
          </a>
          <a href={`mailto:${SITE.email}`} className="transition-colors hover:text-foreground">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
