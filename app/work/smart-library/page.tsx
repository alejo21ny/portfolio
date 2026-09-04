import type { Metadata } from "next";
import CaseStudyHeader from "@/app/components/CaseStudyHeader";
import { PROJECTS } from "@/lib/projects";

const project = PROJECTS.find((p) => p.slug === "smart-library")!;

export const metadata: Metadata = {
  title: project.name,
  description: project.summary,
};

export default function SmartLibraryCaseStudy() {
  return (
    <article>
      <CaseStudyHeader
        label={project.label}
        title={project.name}
        tags={project.tags}
        github={project.github}
        live={project.live}
      />

      <div className="mx-auto max-w-3xl space-y-12 px-6 py-16">
        <section>
          <h2 className="mb-3 text-xl font-semibold tracking-tight">The challenge</h2>
          <p className="text-muted">
            Build a library management system that goes beyond CRUD — one that demonstrates
            senior-level judgment on concurrency, security, and where an AI boundary actually
            earns its keep — and then take it all the way to a real, running deployment rather
            than leaving it as a local demo.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold tracking-tight">The product</h2>
          <p className="text-muted">
            A catalog with full-text and typo-tolerant fuzzy search, a borrow/return workflow,
            three roles (Admin, Librarian, Member) enforced server-side, an event-driven audit
            trail of every meaningful action, a grounded natural-language Library Assistant,
            optional Google sign-in, and a responsive light/dark/system UI.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold tracking-tight">Architecture</h2>
          <p className="text-muted">
            Laravel 12 on the backend with Inertia.js and React/TypeScript on the frontend,
            PostgreSQL 18 with the <code>pg_trgm</code> extension for fuzzy matching. Book
            availability is a computed property derived from the active loan relation, not a
            stored status column that can drift out of sync. The one deliberate ports-and-adapters
            seam in the codebase is the AI provider boundary (<code>AiProviderInterface</code>) —
            introduced there specifically because that dependency genuinely needed to be swappable
            with a real null-object fallback. Everywhere else uses idiomatic Laravel — Eloquent,
            Policies, Form Requests, Actions, Events — rather than a parallel domain layer that
            would just mirror the models for no behavioral benefit.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold tracking-tight">Reliability &amp; security</h2>
          <ul className="list-disc space-y-2 pl-5 text-muted">
            <li>
              A book can never be double-borrowed — enforced by a PostgreSQL partial unique index
              and a locked transaction, not application logic alone.
            </li>
            <li>
              Google sign-in only trusts an email as verified when Google&apos;s own{" "}
              <code>email_verified</code> claim comes back <code>true</code> for that exact
              account; a new Google sign-in is always created as a Member — role elevation never
              comes from an OAuth provider.
            </li>
            <li>
              The Assistant&apos;s tool surface is read-only by construction — there is no
              borrow/return/delete method reachable through it — and its endpoint is rate-limited
              independently of the rest of the app.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold tracking-tight">The Library Assistant, honestly</h2>
          <p className="text-muted">
            A deterministic action router decides what kind of question is being asked, then runs
            a real, read-only query against the actual catalog and loan tables — every result is a
            genuine row, never invented. A PostgreSQL trigram fallback adds typo tolerance when the
            strict search comes up empty. <strong className="text-foreground">No external AI model
            is configured in the live deployment</strong> — it runs entirely on its deterministic
            fallback in production today. The codebase includes a provider abstraction that
            supports plugging in an OpenAI-compatible endpoint to improve phrasing later; that is
            an implemented capability, not something currently active.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold tracking-tight">Testing &amp; CI</h2>
          <p className="text-muted">
            93 Pest tests, Pint, and Larastan (level 5) all clean on the backend; ESLint, TypeScript,
            and Prettier all clean on the frontend; 13 Playwright end-to-end tests covering the
            reviewer-critical browser flows. Three independent GitHub Actions jobs — backend,
            frontend, and E2E — gate every push.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold tracking-tight">Deployment</h2>
          <p className="text-muted">
            A dedicated production Docker image (separate from the local development setup) runs
            on Render, with HTTPS handled correctly behind Render&apos;s reverse proxy via
            Laravel&apos;s trusted-proxy configuration.
          </p>
        </section>
      </div>
    </article>
  );
}
