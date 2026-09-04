import Link from "next/link";
import { NAV, SITE } from "@/lib/site";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-5xl items-center gap-4 px-6 py-4">
        <Link href="/#home" className="font-semibold tracking-tight">
          {SITE.name}
        </Link>

        <div className="ml-auto hidden items-center gap-6 text-sm text-muted sm:flex">
          {NAV.map((item) => (
            <Link key={item.href} href={`/${item.href}`} className="transition-colors hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-2 sm:ml-0">
          <ThemeToggle />

          {/* Native disclosure — no JS state needed, keyboard/screen-reader friendly by default. */}
          <details className="relative sm:hidden">
            <summary
              className="flex h-9 w-9 list-none items-center justify-center rounded-md border border-border text-muted [&::-webkit-details-marker]:hidden"
              aria-label="Open navigation menu"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </summary>
            <div className="absolute right-0 top-11 flex w-40 flex-col gap-1 rounded-md border border-border bg-surface p-2 text-sm shadow-lg">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={`/${item.href}`}
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
