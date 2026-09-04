import type { Metadata } from "next";
import CaseStudyHeader from "@/app/components/CaseStudyHeader";
import { PROJECTS } from "@/lib/projects";

const project = PROJECTS.find((p) => p.slug === "hubspot-portal-sync")!;

export const metadata: Metadata = {
  title: project.name,
  description: project.summary,
};

export default function HubSpotCaseStudy() {
  return (
    <article>
      <CaseStudyHeader
        label={project.label}
        title={project.name}
        tags={project.tags}
        github={project.github}
      />

      <div className="mx-auto max-w-3xl space-y-12 px-6 py-16">
        <section>
          <h2 className="mb-3 text-xl font-semibold tracking-tight">The integration problem</h2>
          <p className="text-muted">
            Two HubSpot portals each hold their own copy of a custom ticket object. Keeping them
            in sync without ever creating a duplicate record — and without silently losing track
            of a failed attempt — is deceptively easy to get wrong once retries, rate limits, and
            re-triggered automations enter the picture.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold tracking-tight">Data flow</h2>
          <p className="text-muted">
            A HubSpot Serverless Function or a Workflow Custom Code Action triggers the sync. The
            source record is read, mapped to the target portal&apos;s schema, and the target
            portal is searched for an existing match. Exactly one of{" "}
            <strong className="text-foreground">create</strong>,{" "}
            <strong className="text-foreground">update</strong>,{" "}
            <strong className="text-foreground">archive</strong>, or{" "}
            <strong className="text-foreground">no-op</strong> happens, and the outcome — synced,
            failed, or the specific error — is written back onto the source record.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold tracking-tight">Idempotency</h2>
          <p className="text-muted">
            An external identifier, present on both portals, is the sync&apos;s key. The same sync
            can run twice — or be retried by HubSpot itself — without ever producing a duplicate
            target record. If a lookup ever turns up more than one match for the same identifier,
            the sync fails loudly instead of guessing which record to touch.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold tracking-tight">Resilience</h2>
          <p className="text-muted">
            Only <code>429</code> (rate limited) and <code>5xx</code> responses are retried, with
            backoff — a <code>4xx</code> fails immediately, since retrying it would just fail the
            same way again. Whatever fails, the reason is truncated to a safe length and written
            back to the source record inside its own best-effort try/catch, so a failure to record
            that status can never mask the original error.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold tracking-tight">Testing</h2>
          <p className="text-muted">
            42 tests run entirely against mocks and fakes — no live HubSpot calls, no credentials
            required to run them — covering field mapping, duplicate detection, every branch of
            the sync decision, retryable vs. terminal failures, and, explicitly, that an access
            token never reaches a log line or a thrown error. GitHub Actions runs the full suite
            on every push.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold tracking-tight">Engineering trade-offs</h2>
          <ul className="list-disc space-y-2 pl-5 text-muted">
            <li>
              Two thin entry points share one orchestrator, kept separate only because HubSpot&apos;s
              two trigger types have genuinely different request/response shapes.
            </li>
            <li>
              Status writes are deliberately not retried — a transient failure to update sync
              status should never bury the real error that caused it.
            </li>
            <li>
              Node&apos;s built-in test runner was used instead of adding Jest or Mocha — the
              project had exactly one real dependency and didn&apos;t need a framework to get
              solid coverage.
            </li>
          </ul>
        </section>
      </div>
    </article>
  );
}
