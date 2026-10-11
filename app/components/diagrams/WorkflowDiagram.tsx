import type { Workflow } from "@/lib/types";
import { KIND_META, KindLegend, type LegendLabels } from "./kinds";

// Vertical timeline on phones, a wrapping left-to-right chain from `md` up.
// Pure CSS layout — it reflows instead of shrinking like an SVG would.
export default function WorkflowDiagram({
  workflow,
  index,
  legend,
}: {
  workflow: Workflow;
  index?: number;
  legend: LegendLabels;
}) {
  const kinds = workflow.steps.map((s) => s.kind ?? "auto");
  return (
    <figure className="rounded-xl border border-border bg-surface p-5 sm:p-6">
      <figcaption className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-mono text-xs text-accent">
            {index !== undefined ? `flow_${String(index + 1).padStart(2, "0")}` : "flow"}
          </p>
          <h3 className="text-lg font-semibold tracking-tight">{workflow.title}</h3>
          {workflow.summary && <p className="mt-1 max-w-2xl text-sm text-muted">{workflow.summary}</p>}
        </div>
        <KindLegend kinds={kinds} labels={legend} />
      </figcaption>

      <ol
        className="relative grid gap-3 md:grid-cols-3 lg:grid-cols-[repeat(var(--steps),minmax(0,1fr))]"
        style={{ "--steps": workflow.steps.length } as React.CSSProperties}
      >
        {workflow.steps.map((step, i) => {
          const meta = KIND_META[step.kind ?? "auto"];
          const last = i === workflow.steps.length - 1;
          return (
            <li key={i} className="relative flex gap-3 md:block">
              {/* phone: vertical rail */}
              {!last && (
                <span
                  className="absolute left-[0.6875rem] top-7 h-[calc(100%-0.5rem)] w-px bg-border md:hidden"
                  aria-hidden
                />
              )}
              <span
                className={`relative z-10 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border bg-background font-mono text-[10px] text-muted md:hidden ${meta.ring}`}
              >
                {i + 1}
              </span>

              <div
                className={`h-full flex-1 rounded-lg border bg-background/60 p-3 ${meta.ring} md:relative`}
              >
                <div className="mb-1 flex items-center gap-2">
                  <span className={`h-2 w-2 shrink-0 rounded-full ${meta.dot}`} aria-hidden />
                  <span className="hidden font-mono text-[10px] text-muted md:inline">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="sr-only">{legend[step.kind ?? "auto"]}:</span>
                  <p className="text-sm font-medium leading-snug">{step.label}</p>
                </div>
                {step.detail && <p className="text-xs leading-relaxed text-muted">{step.detail}</p>}
              </div>
              {!last && (
                <span
                  className="absolute -right-[0.6rem] top-1/2 z-10 hidden -translate-y-1/2 text-xs text-accent lg:block"
                  aria-hidden
                >
                  ›
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </figure>
  );
}
