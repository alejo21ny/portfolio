import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ThemeScript from "./ThemeScript";
import { SITE, SITE_URL } from "@/lib/site";
import { DICT, type Locale } from "@/lib/i18n";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export function rootMetadata(locale: Locale): Metadata {
  const t = DICT[locale];
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t.meta.title, template: `%s | ${SITE.name}` },
    description: t.meta.description,
    alternates: {
      canonical: locale === "en" ? "/" : "/es/",
      languages: { en: "/", es: "/es/", "x-default": "/" },
    },
    openGraph: {
      type: "website",
      url: locale === "en" ? SITE_URL : `${SITE_URL}/es/`,
      title: t.meta.title,
      description: t.meta.description,
      siteName: SITE.name,
      locale: locale === "en" ? "en_US" : "es_CO",
    },
    twitter: { card: "summary_large_image", title: t.meta.title, description: t.meta.description },
  };
}

// Each language has its own root layout (app/(en) and app/(es)) so <html lang>
// is correct in the static HTML; both render through this shell.
export default function RootShell({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const t = DICT[locale];
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE.name,
    jobTitle: t.role,
    url: SITE_URL,
    email: `mailto:${SITE.email}`,
    worksFor: { "@type": "Organization", name: "GWork Systems", url: SITE.gwork },
    sameAs: [SITE.github, SITE.linkedin, SITE.gwork],
  };
  return (
    <html lang={t.htmlLang} data-theme="dark" suppressHydrationWarning>
      <head>
        <ThemeScript />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-dvh font-sans antialiased`}>
        <Navbar locale={locale} />
        <main>{children}</main>
        <Footer locale={locale} />
      </body>
    </html>
  );
}
