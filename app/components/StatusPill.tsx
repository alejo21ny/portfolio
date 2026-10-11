import type { Status } from "@/lib/types";

const STYLE: Record<Status, string> = {
  Live: "border-emerald-500/40 text-emerald-500",
  Staging: "border-sky-500/40 text-sky-500",
  "Built & tested": "border-amber-500/40 text-amber-600",
  "In development": "border-border text-muted",
};

export default function StatusPill({ status }: { status: Status }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[11px] ${STYLE[status]}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full bg-current ${status === "Live" ? "animate-pulse-soft" : ""}`}
        aria-hidden
      />
      {status}
    </span>
  );
}
