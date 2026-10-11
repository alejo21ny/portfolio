import type { DataModel } from "@/lib/types";

// Entity cards (table name + key columns) plus an explicit relationship list.
// Drawing crow's-foot lines between cards breaks as soon as the grid reflows
// on a phone; listing relations keeps the diagram correct at every width.
export default function DataModelDiagram({ model }: { model: DataModel }) {
  return (
    <figure className="rounded-xl border border-border bg-surface p-5 sm:p-6">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {model.entities.map((e) => (
          <div key={e.name} className="overflow-hidden rounded-md border border-border bg-background">
            <p className="border-b border-border bg-amber-500/10 px-3 py-1.5 font-mono text-sm font-semibold">
              {e.name}
            </p>
            <ul className="px-3 py-2 font-mono text-xs text-muted">
              {e.fields.map((f) => (
                <li key={f} className="py-0.5">
                  {f.startsWith("id") || f.endsWith("_id") ? (
                    <span className="text-foreground">{f}</span>
                  ) : (
                    f
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {model.relations.length > 0 && (
        <figcaption className="mt-6 border-t border-border pt-4">
          <p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-muted">Relationships</p>
          <ul className="grid gap-1.5 text-sm md:grid-cols-2">
            {model.relations.map((r) => (
              <li key={`${r.from}-${r.to}-${r.label}`} className="flex flex-wrap items-center gap-2">
                <code className="font-mono text-xs">{r.from}</code>
                <span className="rounded border border-border px-1.5 font-mono text-[10px] text-accent">
                  {r.cardinality}
                </span>
                <code className="font-mono text-xs">{r.to}</code>
                {r.label && <span className="text-xs text-muted">— {r.label}</span>}
              </li>
            ))}
          </ul>
          {model.note && <p className="mt-3 text-xs text-muted">{model.note}</p>}
        </figcaption>
      )}
    </figure>
  );
}
