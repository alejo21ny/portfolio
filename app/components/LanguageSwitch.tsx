"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n";

// Maps the current page to its counterpart: /work/x/ ⇄ /es/work/x/.
// usePathname() returns the path without the deploy base path.
export default function LanguageSwitch({ locale, label, short }: { locale: Locale; label: string; short: string }) {
  const pathname = usePathname() || "/";
  const target = locale === "en" ? `/es${pathname === "/" ? "/" : pathname}` : pathname.replace(/^\/es(?=\/|$)/, "") || "/";
  return (
    <Link
      href={target}
      hrefLang={locale === "en" ? "es" : "en"}
      aria-label={label}
      title={label}
      className="inline-flex h-9 items-center justify-center rounded-md border border-border px-2.5 font-mono text-xs text-muted transition-colors hover:border-accent hover:text-foreground"
    >
      {short}
    </Link>
  );
}
