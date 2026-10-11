import type { Architecture } from "@/lib/types";

// Layered architecture: each lane is a tier (client → edge/API → services →
// data → third parties). Lanes sit side by side on wide screens with arrows
// between them, and stack top-to-bottom on phones.
export default function ArchitectureDiagram({
  architecture,
  connectionsLabel,
}: {
  architecture: Architecture;
  connectionsLabel: string;
}) {
  const { lanes, flows } = architecture;
  return (
    <figure className="rounded-xl border border-border bg-surface p-5 sm:p-6">
      <div className="bg-grid -m-1 rounded-lg p-1">
        <div
          className="grid gap-3 lg:gap-0"
          style={{ gridTemplateColumns: `repeat(${lanes.length}, minmax(0, 1fr))` }}
        >
          {lanes.map((lane, li) => (
            <div
              key={lane.name}
              className="arch-lane relative col-span-full flex flex-col lg:col-span-1 lg:px-3"
            >
              <p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-muted">
                <span className="text-accent">{String(li + 1).padStart(2, "0")}</span> {lane.name}
              </p>
              <div className="flex flex-1 flex-col justify-center gap-2">
                {lane.nodes.map((node) => (
                  <div
                    key={node.label}
                    className="rounded-md border border-border bg-background px-3 py-2 shadow-sm"
                  >
                    <p className="text-sm font-medium leading-snug">{node.label}</p>
                    {node.detail && <p className="text-xs text-muted">{node.detail}</p>}
                  </div>
                ))}
              </div>
              {li < lanes.length - 1 && (
                <>
                  <span
                    className="absolute -right-2 top-1/2 z-10 hidden h-4 w-4 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface text-[10px] text-accent lg:flex"
                    aria-hidden
                  >
                    →
                  </span>
                  <span className="mx-auto mt-2 text-accent lg:hidden" aria-hidden>
                    ↓
                  </span>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {flows.length > 0 && (
        <figcaption className="mt-6 border-t border-border pt-4">
          <p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-muted">{connectionsLabel}</p>
          <ul className="grid gap-1.5 text-sm text-muted md:grid-cols-2">
            {flows.map((f) => (
              <li key={f} className="flex gap-2">
                <span className="text-accent" aria-hidden>
                  ›
                </span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </figcaption>
      )}
    </figure>
  );
}
