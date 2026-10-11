import Link from "next/link";
import { SITE } from "@/lib/site";
import { DICT, localePath, type Locale } from "@/lib/i18n";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitch from "./LanguageSwitch";

export default function Navbar({ locale }: { locale: Locale }) {
  const t = DICT[locale];
  const home = localePath(locale, "/");
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4 sm:px-6">
        <Link href={home} className="flex items-center gap-2.5 font-semibold tracking-tight">
          <span
            className="flex h-8 w-8 items-center justify-center rounded-md bg-accent font-mono text-xs font-bold text-accent-foreground"
            aria-hidden
          >
            DG
          </span>
          {SITE.name}
        </Link>

        <div className="ml-auto hidden items-center gap-6 text-sm text-muted md:flex">
          {t.nav.map((item) => (
            <Link key={item.href} href={`${home}${item.href}`} className="transition-colors hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-2 md:ml-2">
          <LanguageSwitch locale={locale} label={t.switchTo.label} short={t.switchTo.short} />
          <ThemeToggle labels={t.theme} />

          {/* Native disclosure — no JS state needed, keyboard/screen-reader friendly by default. */}
          <details className="relative md:hidden">
            <summary
              className="flex h-9 w-9 list-none items-center justify-center rounded-md border border-border text-muted [&::-webkit-details-marker]:hidden"
              aria-label={t.menu}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </summary>
            <div className="absolute right-0 top-11 flex w-44 flex-col gap-1 rounded-md border border-border bg-surface p-2 text-sm shadow-lg">
              {t.nav.map((item) => (
                <Link
                  key={item.href}
                  href={`${home}${item.href}`}
                  className="rounded px-2 py-1.5 text-muted transition-colors hover:bg-background hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </details>
        </div>
      </nav>
    </header>
  );
}
