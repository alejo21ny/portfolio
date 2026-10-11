import type { StepKind } from "@/lib/types";

// One visual vocabulary for every diagram on the site: the same colour always
// means the same kind of step, so a reader learns it once.
export const KIND_META: Record<StepKind, { label: string; dot: string; ring: string }> = {
  user: { label: "Person", dot: "bg-sky-500", ring: "border-sky-500/40" },
  auto: { label: "Automation", dot: "bg-accent", ring: "border-accent/50" },
  ai: { label: "AI / LLM", dot: "bg-violet-500", ring: "border-violet-500/50" },
  data: { label: "Data store", dot: "bg-amber-500", ring: "border-amber-500/40" },
  external: { label: "External API", dot: "bg-rose-500", ring: "border-rose-500/40" },
  guard: { label: "Safety gate", dot: "bg-emerald-500", ring: "border-emerald-500/40" },
};

export function KindLegend({ kinds }: { kinds: StepKind[] }) {
  const unique = Array.from(new Set(kinds));
  if (unique.length < 2) return null;
  return (
    <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted" aria-label="Legend">
      {unique.map((k) => (
        <li key={k} className="flex items-center gap-1.5">
          <span className={`h-2 w-2 rounded-full ${KIND_META[k].dot}`} aria-hidden />
          {KIND_META[k].label}
        </li>
      ))}
    </ul>
  );
}
