# David Gomez — Personal Portfolio

David Gomez's personal engineering portfolio — positioning, expertise, and real project case studies. Not affiliated with any employer; this is an individual technical portfolio.

## Purpose

A single-page site (Home / Work / Expertise / About / Contact, navigated by anchors) plus a dedicated case-study page per featured project. Every project shown links to real, working source code — nothing here is a mockup.

## Stack

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · ESLint 9

No UI/animation/theme libraries — the light/dark/system toggle and motion are hand-rolled with a small blocking inline script (avoids a flash of the wrong theme) and plain CSS, kept intentionally dependency-light.

## Local setup

```bash
npm install
npm run dev
```

The app is now at **http://localhost:3000**.

## Development

```bash
npm run lint       # ESLint (via next lint)
npm run typecheck  # tsc --noEmit
```

## Build

```bash
npm run build
```

Produces a fully static export in `out/` (`output: "export"` in `next.config.ts`) — the site has no server-side features (no auth, no database, no API routes), so a static build is the correct target, not a limitation.

## Structure

```
app/
  layout.tsx            root layout: fonts, metadata, JSON-LD, theme script
  page.tsx               single-page home: Hero / Work / Expertise / About / Contact
  globals.css             design tokens (light/dark), motion, focus states
  robots.ts / sitemap.ts  generated at build time
  work/
    smart-library/         case study
    hubspot-portal-sync/   case study
  components/              Navbar, Footer, ThemeToggle, ProjectCard, Section, Tag, ...
lib/
  site.ts                 site-wide copy/config (name, links, SEO strings)
  projects.ts             typed project data shown on the home page and case studies
```

## Deployment target

Static export, deployable to either **Cloudflare Pages** or **Netlify** with no adapter — both serve `out/` directly. Not yet deployed; `NEXT_PUBLIC_SITE_URL` in `lib/site.ts` is the single place the production URL gets set once a domain is chosen (used for canonical links, Open Graph, the sitemap, and JSON-LD).

## Content principles

- Every claim about a featured project is sourced from that project's own README/docs — nothing is measured or invented here.
- No skill percentage bars, no stock imagery, no generic AI-gradient aesthetic, no fabricated metrics, dates, or credentials.
- Additional projects get added to `lib/projects.ts` and a new `app/work/<slug>/page.tsx` — no placeholder/"coming soon" entries are shown publicly.
