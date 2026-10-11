import { SITE } from "@/lib/site";
import { DICT, type Locale } from "@/lib/i18n";
import ExternalLink from "./ExternalLink";

export default function Footer({ locale }: { locale: Locale }) {
  const t = DICT[locale];
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          © {new Date().getFullYear()} {SITE.name}. {t.footer.rights}
        </p>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          <ExternalLink href={SITE.gwork} className="transition-colors hover:text-foreground">
            GWork Systems
          </ExternalLink>
          <ExternalLink href={SITE.github} className="transition-colors hover:text-foreground">
            GitHub
          </ExternalLink>
          <ExternalLink href={SITE.linkedin} className="transition-colors hover:text-foreground">
            LinkedIn
          </ExternalLink>
          <a href={`mailto:${SITE.email}`} className="transition-colors hover:text-foreground">
            {SITE.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
