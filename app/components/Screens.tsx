import type { Project } from "@/lib/types";
import { asset } from "@/lib/asset";

type Shot = NonNullable<Project["screenshots"]>[number];

// Real screenshots captured from each app running locally, shown in a light
// browser / phone frame. Plain <img> — the site is a static export, so there
// is no image optimisation server to lean on.
function BrowserFrame({ shot }: { shot: Shot }) {
  return (
    <figure className="overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
      <div className="flex items-center gap-1.5 border-b border-border px-3 py-2" aria-hidden>
        <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={asset(shot.src)} alt={shot.alt} loading="lazy" className="block w-full" width={1440} height={900} />
      <figcaption className="border-t border-border px-3 py-2 text-xs text-muted">{shot.alt}</figcaption>
    </figure>
  );
}

function PhoneFrame({ shot }: { shot: Shot }) {
  return (
    <figure className="mx-auto w-full max-w-[15rem]">
      <div className="overflow-hidden rounded-[2rem] border-[6px] border-foreground/80 bg-surface shadow-lg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={asset(shot.src)} alt={shot.alt} loading="lazy" className="block w-full" width={780} height={1688} />
      </div>
      <figcaption className="mt-2 text-center text-xs text-muted">{shot.alt}</figcaption>
    </figure>
  );
}

export default function Screens({ shots }: { shots: Shot[] }) {
  const desktop = shots.filter((s) => s.device === "desktop");
  const mobile = shots.filter((s) => s.device === "mobile");
  return (
    <div className="grid items-start gap-6 lg:grid-cols-[1fr_auto]">
      <div className="grid gap-6">
        {desktop.map((s) => (
          <BrowserFrame key={s.src} shot={s} />
        ))}
      </div>
      {mobile.length > 0 && (
        <div className="grid gap-6 lg:sticky lg:top-24 lg:w-60">
          {mobile.map((s) => (
            <PhoneFrame key={s.src} shot={s} />
          ))}
        </div>
      )}
    </div>
  );
}
