# David Gomez — Personal Portfolio

David Gomez's personal engineering portfolio — positioning, expertise, and real project case studies. Not affiliated with any employer; this is an individual technical portfolio.

## Purpose

A single-page site (Home / Work / Process / Expertise / About / Contact, navigated by anchors) plus a generated case-study page per project at `/work/<slug>/`. Each case study renders, from plain data in `lib/projects.ts`:

- problem → solution, headline metrics and status (Live / Staging / Built & tested)
- a layered **architecture diagram** and the key connections
- one or more **workflow diagrams** (steps colour-coded: person, automation, AI, data, safety gate, external API)
- a **data-model diagram** (entities, key columns, relationships)
- real **screenshots** in browser/phone frames (`public/screens/`), the AI boundary, and the stack

Diagrams are CSS/SVG components (`app/components/diagrams/`), not images, so they reflow on phones and follow the light/dark theme. Public repos link to their source; private client repos are marked as such.

## Stack

Next.js 15 (App Router, static export) · React 19 · TypeScript · Tailwind CSS v4 · ESLint 9

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
  work/[slug]/page.tsx     one statically generated case study per project
  components/              Navbar, Footer, ThemeToggle, ProjectCard, SystemMap, Screens, ...
    diagrams/              ArchitectureDiagram, WorkflowDiagram, DataModelDiagram
lib/
  site.ts                 site-wide copy/config (name, links, SEO strings)
  types.ts                project / diagram types
  projects.ts             all project content + diagram data
  asset.ts                base-path-aware URLs for public/ files
public/screens/           screenshots captured from each app running locally
```

## Deployment

The same static export deploys to two places:

- **GitHub Pages** — `.github/workflows/deploy-pages.yml` builds on every push to `main` with `NEXT_PUBLIC_BASE_PATH=/portfolio` and publishes to `https://alejo21ny.github.io/portfolio/`. One-time setup: repo **Settings → Pages → Source: GitHub Actions**.
- **Netlify** — `netlify.toml` (`npm run build`, publish `out/`), served from the root at `https://fsdgportfolio.netlify.app`.

`NEXT_PUBLIC_SITE_URL` sets the canonical URL (Open Graph, sitemap, JSON-LD); it defaults to the Netlify URL. Pull requests run lint, typecheck and build in `.github/workflows/ci.yml`.

## Content principles

- Every claim about a featured project is sourced from that project's own README/docs — nothing is measured or invented here.
- No skill percentage bars, no stock imagery, no generic AI-gradient aesthetic, no fabricated metrics, dates, or credentials.
- Additional projects are a single entry in `lib/projects.ts` — the case-study page, diagrams and sitemap entry are generated from it. No placeholder/"coming soon" entries are shown publicly.
- Client work is described without the client's brand until they approve being named.
