// Hero illustration: the kinds of systems on this site wired around one
// operator. Static SVG with a CSS dash animation on the edges (disabled under
// prefers-reduced-motion by the global rule in globals.css).
const POSITIONS = [
  { x: 70, y: 60 },
  { x: 330, y: 60 },
  { x: 40, y: 175 },
  { x: 360, y: 175 },
  { x: 90, y: 290 },
  { x: 310, y: 290 },
] as const;

type Labels = { center: [string, string]; nodes: [string, string][]; aria: string };

const CX = 200;
const CY = 175;

export default function SystemMap({ labels }: { labels: Labels }) {
  const NODES = POSITIONS.map((p, i) => ({ ...p, label: labels.nodes[i][0], sub: labels.nodes[i][1] }));
  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="bg-grid bg-grid-fade absolute inset-0 rounded-2xl" aria-hidden />
      <svg
        viewBox="-30 0 460 350"
        className="relative w-full"
        role="img"
        aria-label={labels.aria}
      >
        {NODES.map((n) => (
          <line
            key={`l-${n.label}`}
            x1={CX}
            y1={CY}
            x2={n.x}
            y2={n.y}
            className="animate-flow stroke-accent/60"
            strokeWidth={1.25}
          />
        ))}

        <g>
          <circle cx={CX} cy={CY} r={46} className="fill-surface stroke-accent" strokeWidth={1.5} />
          <circle cx={CX} cy={CY} r={56} className="animate-pulse-soft fill-none stroke-accent/30" />
          <text x={CX} y={CY - 4} textAnchor="middle" className="fill-foreground text-[13px] font-semibold">
            {labels.center[0]}
          </text>
          <text x={CX} y={CY + 13} textAnchor="middle" className="fill-muted font-mono text-[9px]">
            {labels.center[1]}
          </text>
        </g>

        {NODES.map((n) => (
          <g key={n.label}>
            <rect
              x={n.x - 62}
              y={n.y - 20}
              width={124}
              height={40}
              rx={8}
              className="fill-background stroke-border"
              strokeWidth={1}
            />
            <circle cx={n.x - 50} cy={n.y - 6} r={3} className="fill-accent" />
            <text x={n.x - 42} y={n.y - 2} className="fill-foreground text-[11px] font-medium">
              {n.label}
            </text>
            <text x={n.x - 54} y={n.y + 12} className="fill-muted font-mono text-[8px]">
              {n.sub}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
