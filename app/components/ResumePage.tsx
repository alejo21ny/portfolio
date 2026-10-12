import type { Metadata } from "next";
import Link from "next/link";
import ExternalLink from "./ExternalLink";
import { asset } from "@/lib/asset";
import { localePath, type Locale } from "@/lib/i18n";
import { RESUME, RESUME_FILES, RESUME_UI, formatRange, jobCompany, jobPeriod } from "@/lib/resume";

export type ResumeVariant = "designed" | "ats";

export function resumeMetadata(locale: Locale, variant: ResumeVariant): Metadata {
  const ui = RESUME_UI[locale];
  const base = variant === "ats" ? "/resume/ats/" : "/resume/";
  return {
    title: variant === "ats" ? `${ui.resume} (ATS)` : ui.resume,
    description: `${RESUME.name} — ${RESUME.headline[locale]}`,
    alternates: {
      canonical: localePath(locale, base),
      languages: { en: base, es: `/es${base}` },
    },
    // The ATS page only exists to render its PDF.
    robots: variant === "ats" ? { index: false } : undefined,
  };
}

const ICONS = {
  mail: "M4 6h16v12H4zM4 7l8 6 8-6",
  phone: "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2",
  linkedin: "M5 9v10M5 5v.01M10 19v-6a3 3 0 0 1 6 0v6M10 10v9",
  github:
    "M9 19c-4 1.5-4-2-6-2.5M15 21v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.3 4.3 0 0 0-.1-3.2s-1-.3-3.4 1.3a11.6 11.6 0 0 0-6 0C6.8 2.8 5.8 3.1 5.8 3.1a4.3 4.3 0 0 0-.1 3.2A4.6 4.6 0 0 0 4.4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21",
  globe: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3c2.5 2.5 3.8 5.5 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.5-3.8-9S9.5 5.5 12 3z",
  pin: "M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
};

function Icon({ path }: { path: string }) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d={path} />
    </svg>
  );
}

function contacts() {
  const c = RESUME.contact;
  return [
    { icon: ICONS.mail, label: c.email, href: `mailto:${c.email}` },
    { icon: ICONS.phone, label: c.phone, href: c.phoneHref },
    { icon: ICONS.linkedin, label: c.linkedin.label, href: c.linkedin.url },
    { icon: ICONS.github, label: c.github.label, href: c.github.url },
    { icon: ICONS.globe, label: c.portfolio.label, href: c.portfolio.url },
  ];
}

function Toolbar({ locale, variant }: { locale: Locale; variant: ResumeVariant }) {
  const ui = RESUME_UI[locale];
  const other = variant === "ats" ? "/resume/" : "/resume/ats/";
  const base = "inline-flex items-center gap-2 rounded-md border px-3.5 py-2 text-sm font-medium transition-colors";
  const btn = `${base} border-border bg-surface hover:border-accent`;
  return (
    <div className="cv-toolbar mx-auto mb-6 flex max-w-[816px] flex-wrap items-center gap-2 px-4 sm:px-0">
      <a href={asset(`/cv/${RESUME_FILES.pdf[locale]}`)} download className={`${base} border-accent bg-accent text-accent-foreground hover:opacity-90`}>
        ↓ {ui.download}
      </a>
      <a href={asset(`/cv/${RESUME_FILES.ats[locale]}`)} download className={btn}>
        ↓ {ui.downloadAts}
      </a>
      <a href={asset(`/cv/${RESUME_FILES.docx[locale]}`)} download className={btn}>
        ↓ {ui.downloadDocx}
      </a>
      <Link href={localePath(locale, other)} className="ml-auto text-sm text-muted hover:text-foreground">
        {variant === "ats" ? `← ${ui.resume}` : "ATS →"}
      </Link>
      <p className="w-full text-xs text-muted">{ui.toolbarNote}</p>
    </div>
  );
}

function Heading({ children }: { children: string }) {
  return <h2 className="cv-h2">{children}</h2>;
}

function Experience({ locale }: { locale: Locale }) {
  return (
    <div className="space-y-3">
      {RESUME.experience.map((job) => (
        <article key={`${job.company}-${job.start}`}>
          {/* Title, meta and first bullet stay together so a role never starts at a page's last line. */}
          <div className="cv-keep">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3">
              <h3 className="cv-h3">
                {job.role[locale]} <span className="cv-at">·</span>{" "}
                {job.url ? (
                  <ExternalLink href={job.url} className="cv-company">
                    {jobCompany(job, locale)}
                  </ExternalLink>
                ) : (
                  <span className="cv-company">{jobCompany(job, locale)}</span>
                )}
              </h3>
              <span className="cv-date">{jobPeriod(job, locale)}</span>
            </div>
            <p className="cv-meta">
              {job.location[locale]}
              {job.note && ` — ${job.note[locale]}`}
            </p>
            <ul className="cv-list">
              <li>{job.bullets[locale][0]}</li>
            </ul>
          </div>
          <ul className="cv-list cv-cont">
            {job.bullets[locale].slice(1).map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          {job.stack.length > 0 && <p className="cv-stack">{job.stack.join(" · ")}</p>}
        </article>
      ))}
    </div>
  );
}

function Earlier({ locale }: { locale: Locale }) {
  return (
    <ul className="space-y-1.5">
      {RESUME.earlier.map((job) => (
        <li key={job.company} className="cv-keep">
          <div className="flex flex-wrap items-baseline justify-between gap-x-3">
            <p className="cv-h4">
              {job.role[locale]} <span className="cv-at">·</span> <span className="cv-company">{job.company}</span>
            </p>
            <span className="cv-date">{job.period ? job.period[locale] : formatRange(job.start, job.end, locale)}</span>
          </div>
          <p className="cv-small">{job.line[locale]}</p>
        </li>
      ))}
    </ul>
  );
}

function Projects({ locale }: { locale: Locale }) {
  const ui = RESUME_UI[locale];
  const site = RESUME.contact.portfolio.url;
  return (
    <>
      <p className="cv-small -mt-1 mb-2">{ui.projectsNote}</p>
      <ul className="space-y-2">
        {RESUME.projects.slice(0, 4).map((p) => (
          <li key={p.slug} className="cv-keep">
            <ExternalLink href={`${site}${localePath(locale, `/work/${p.slug}/`)}`} className="cv-h4 cv-link">
              {p.name}
            </ExternalLink>
            <p className="cv-small">{p.line[locale]}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

function Sidebar({ locale }: { locale: Locale }) {
  const ui = RESUME_UI[locale];
  return (
    <aside className="cv-side space-y-5">
      <section>
        <Heading>{ui.skills}</Heading>
        <div className="space-y-2.5">
          {RESUME.skills.map((s) => (
            <div key={s.group.en} className="cv-keep">
              <p className="cv-label">{s.group[locale]}</p>
              <p className="cv-chips">
                {s.items.map((i) => (
                  <span key={i}>{i}</span>
                ))}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="cv-keep">
        <Heading>{ui.languages}</Heading>
        <ul className="space-y-1">
          {RESUME.languages.map((l) => (
            <li key={l.name.en} className="flex justify-between gap-2">
              <span className="cv-h4">{l.name[locale]}</span>
              <span className="cv-small">{l.level[locale]}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="cv-keep">
        <Heading>{ui.education}</Heading>
        <ul className="space-y-2">
          {RESUME.education.map((e) => (
            <li key={e.title.en}>
              <p className="cv-h4">{e.title[locale]}</p>
              <p className="cv-small">
                {e.school} · {e.year}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <Heading>{ui.certifications}</Heading>
        <ul className="space-y-1.5">
          {RESUME.certifications
            .filter((c) => c.key)
            .map((c) => (
              <li key={c.name} className="cv-keep">
                <p className="cv-cert">{c.name}</p>
                <p className="cv-small">
                  {c.issuer} · {c.year}
                </p>
              </li>
            ))}
        </ul>
        <p className="cv-small mt-2">
          {ui.moreCerts(RESUME.certifications.filter((c) => !c.key).length)}
        </p>
      </section>

      <section>
        <Heading>{ui.projects}</Heading>
        <Projects locale={locale} />
      </section>
    </aside>
  );
}

function Designed({ locale }: { locale: Locale }) {
  const ui = RESUME_UI[locale];
  return (
    <article className="cv-sheet">
      <header className="cv-header">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={asset("/profile.jpg")} alt={RESUME.shortName} width={304} height={331} className="cv-photo" />
        <div className="min-w-0 flex-1">
          <h1 className="cv-name">{RESUME.name}</h1>
          <p className="cv-headline">{RESUME.headline[locale]}</p>
          <p className="cv-meta flex items-center gap-1.5">
            <Icon path={ICONS.pin} />
            {RESUME.location[locale]}
          </p>
        </div>
        <ul className="cv-contact">
          {contacts().map((c) => (
            <li key={c.href}>
              <a href={c.href}>
                <Icon path={c.icon} />
                {c.label}
              </a>
            </li>
          ))}
        </ul>
      </header>

      <section className="cv-keep">
        <Heading>{ui.summary}</Heading>
        <p className="cv-body">{RESUME.summary[locale]}</p>
        <ul className="cv-highlights">
          {RESUME.highlights[locale].map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      </section>

      <div className="cv-grid">
        <section>
          <Heading>{ui.experience}</Heading>
          <Experience locale={locale} />
          <div className="mt-4">
            <Heading>{ui.earlier}</Heading>
            <Earlier locale={locale} />
          </div>
        </section>
        <Sidebar locale={locale} />
      </div>
    </article>
  );
}

// Single column, no photo, no icons or columns: what applicant-tracking
// systems parse most reliably.
function Ats({ locale }: { locale: Locale }) {
  const ui = RESUME_UI[locale];
  const c = RESUME.contact;
  return (
    <article className="cv-sheet cv-ats">
      <header className="mb-4">
        <h1 className="cv-name">{RESUME.name}</h1>
        <p className="cv-headline">{RESUME.headline[locale]}</p>
        <p className="cv-small">
          {RESUME.location[locale]} | {c.phone} | {c.email}
        </p>
        <p className="cv-small">
          {c.linkedin.label} | {c.github.label} | {c.portfolio.label}
        </p>
      </header>

      <section>
        <Heading>{ui.summary}</Heading>
        <p className="cv-body">{RESUME.summary[locale]}</p>
      </section>

      <section>
        <Heading>{ui.skills}</Heading>
        <ul className="space-y-0.5">
          {RESUME.skills.map((s) => (
            <li key={s.group.en} className="cv-body">
              <strong>{s.group[locale]}:</strong> {s.items.join(", ")}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <Heading>{ui.experience}</Heading>
        <div className="space-y-3">
          {RESUME.experience.map((job) => (
            <div key={`${job.company}-${job.start}`} className="cv-keep">
              <p className="cv-h3">
                {job.role[locale]} — {jobCompany(job, locale)}
              </p>
              <p className="cv-small">
                {jobPeriod(job, locale)} | {job.location[locale]}
              </p>
              <ul className="cv-list">
                {job.bullets[locale].map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
          {RESUME.earlier.map((job) => (
            <div key={job.company} className="cv-keep">
              <p className="cv-h3">
                {job.role[locale]} — {job.company}
              </p>
              <p className="cv-small">{job.period ? job.period[locale] : formatRange(job.start, job.end, locale)}</p>
              <ul className="cv-list">
                <li>{job.line[locale]}</li>
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section>
        <Heading>{ui.projects}</Heading>
        <ul className="cv-list">
          {RESUME.projects.map((p) => (
            <li key={p.slug}>
              <strong>{p.name}:</strong> {p.line[locale]}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <Heading>{ui.education}</Heading>
        <ul className="cv-list">
          {RESUME.education.map((e) => (
            <li key={e.title.en}>
              {e.title[locale]} — {e.school}, {e.year}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <Heading>{ui.certifications}</Heading>
        <p className="cv-body">
          {RESUME.certifications.map((cert) => `${cert.name} (${cert.issuer}, ${cert.year})`).join(" · ")}
        </p>
      </section>

      <section>
        <Heading>{ui.languages}</Heading>
        <p className="cv-body">{RESUME.languages.map((l) => `${l.name[locale]} — ${l.level[locale]}`).join(" · ")}</p>
      </section>
    </article>
  );
}

export default function ResumePage({ locale, variant }: { locale: Locale; variant: ResumeVariant }) {
  return (
    <div className="cv-page py-8 sm:py-12">
      <Toolbar locale={locale} variant={variant} />
      {variant === "ats" ? <Ats locale={locale} /> : <Designed locale={locale} />}
    </div>
  );
}
