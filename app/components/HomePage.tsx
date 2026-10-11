import Link from "next/link";
import Section from "./Section";
import ProjectCard from "./ProjectCard";
import SystemMap from "./SystemMap";
import Tag from "./Tag";
import ExternalLink from "./ExternalLink";
import WorkflowDiagram from "./diagrams/WorkflowDiagram";
import { SITE } from "@/lib/site";
import { EARLIER } from "@/lib/earlier";
import { DICT, getProjects, type Locale } from "@/lib/i18n";

const totalTests = 723 + 165 + 164 + 230 + 87 + 93 + 13 + 42; // each figure is stated in its project's repo

function Icon({ path }: { path: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d={path} />
    </svg>
  );
}

const ICONS = {
  mail: "M4 6h16v12H4zM4 7l8 6 8-6",
  linkedin: "M5 9v10M5 5v.01M10 19v-6a3 3 0 0 1 6 0v6M10 10v9",
  github: "M9 19c-4 1.5-4-2-6-2.5M15 21v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.3 4.3 0 0 0-.1-3.2s-1-.3-3.4 1.3a11.6 11.6 0 0 0-6 0C6.8 2.8 5.8 3.1 5.8 3.1a4.3 4.3 0 0 0-.1 3.2A4.6 4.6 0 0 0 4.4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21",
  globe: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3c2.5 2.5 3.8 5.5 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.5-3.8-9S9.5 5.5 12 3z",
};

export default function HomePage({ locale }: { locale: Locale }) {
  const t = DICT[locale];
  const projects = getProjects(locale);
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  const stats = [
    { value: `${projects.length}`, label: t.stats.systems },
    { value: `${Math.floor(totalTests / 100) * 100}+`, label: t.stats.tests },
    { value: "EN/ES", label: t.stats.stack },
    { value: "10+", label: t.stats.years },
  ];

  const contacts = [
    { href: `mailto:${SITE.email}`, label: t.contact.email, value: SITE.email, icon: ICONS.mail, external: false },
    { href: SITE.linkedin, label: "LinkedIn", value: "in/dgomezbuiles", icon: ICONS.linkedin, external: true },
    { href: SITE.github, label: "GitHub", value: "github.com/alejo21ny", icon: ICONS.github, external: true },
    { href: SITE.gwork, label: t.contact.website, value: "gworksystems.com", icon: ICONS.globe, external: true },
  ];

  return (
    <>
      <section id="home" className="relative scroll-mt-20 overflow-hidden">
        <div className="bg-grid bg-grid-fade absolute inset-0 opacity-70" aria-hidden />
        <div
          className="pointer-events-none absolute -top-40 left-1/2 h-[30rem] w-[60rem] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl"
          aria-hidden
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-muted animate-fade-up">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse-soft" aria-hidden />
              {t.badge}
            </p>
            <h1 className="mb-4 text-4xl font-semibold tracking-tight sm:text-6xl animate-fade-up">{SITE.name}</h1>
            <p className="mb-6 text-xl text-accent sm:text-2xl animate-fade-up">{t.role}</p>
            <p className="mb-8 max-w-xl text-lg text-foreground/85 animate-fade-up">{t.statement}</p>

            <div className="flex flex-wrap items-center gap-3 animate-fade-up">
              <Link
                href="#work"
                className="rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
              >
                {t.hero.primary}
              </Link>
              <Link
                href="#contact"
                className="rounded-md border border-border bg-surface px-5 py-2.5 text-sm font-medium transition-colors hover:border-accent"
              >
                {t.hero.secondary}
              </Link>
              <div className="flex items-center gap-1 px-1 text-muted">
                {contacts.slice(1).map((c) => (
                  <ExternalLink
                    key={c.href}
                    href={c.href}
                    aria-label={c.label}
                    title={c.label}
                    className="flex h-10 w-10 items-center justify-center rounded-md transition-colors hover:bg-surface hover:text-foreground"
                  >
                    <Icon path={c.icon} />
                  </ExternalLink>
                ))}
              </div>
            </div>
          </div>

          <div className="animate-fade-up">
            <SystemMap labels={t.systemMap} />
          </div>
        </div>

        <div className="relative mx-auto max-w-6xl px-4 pb-16 sm:px-6">
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-surface p-5">
                <dd className="font-mono text-3xl font-semibold">{s.value}</dd>
                <dt className="mt-1 text-sm text-muted">{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <Section id="work" eyebrow={t.work.eyebrow} title={t.work.title}>
        <p className="-mt-4 mb-8 max-w-2xl text-muted">{t.work.intro}</p>
        <div className="grid gap-6 lg:grid-cols-3">
          {featured.map((p) => (
            <ProjectCard key={p.slug} project={p} locale={locale} large />
          ))}
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((p) => (
            <ProjectCard key={p.slug} project={p} locale={locale} />
          ))}
        </div>

        <div className="mt-14">
          <h3 className="text-lg font-semibold tracking-tight">{t.work.earlier}</h3>
          <p className="mb-5 text-sm text-muted">{t.work.earlierIntro}</p>
          <ul className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-surface">
            {EARLIER.map((p) => (
              <li key={p.github}>
                <ExternalLink
                  href={p.github}
                  className="group flex flex-col gap-2 p-5 transition-colors hover:bg-background/60 md:flex-row md:items-start md:gap-6"
                >
                  <span className="font-mono text-xs text-muted md:w-12 md:pt-1">{p.year}</span>
                  <span className="flex-1">
                    <span className="block font-medium group-hover:text-accent">
                      {p.name[locale]} <span aria-hidden>↗</span>
                    </span>
                    <span className="mt-1 block text-sm text-muted">{p.summary[locale]}</span>
                  </span>
                  <span className="flex flex-wrap gap-2 md:w-64 md:justify-end">
                    {p.tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </span>
                </ExternalLink>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section id="process" eyebrow={t.process.eyebrow} title={t.process.title}>
        <p className="-mt-4 mb-8 max-w-2xl text-muted">{t.process.intro}</p>
        <WorkflowDiagram workflow={t.process.workflow} legend={t.caseStudy.legend} />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.process.principles.map((p, i) => (
            <div key={p.title} className="rounded-xl border border-border bg-surface p-5">
              <p className="mb-2 font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mb-2 font-semibold tracking-tight">{p.title}</h3>
              <p className="text-sm text-muted">{p.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="expertise" eyebrow={t.expertise.eyebrow} title={t.expertise.title}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.expertise.groups.map((group) => (
            <div key={group.title} className="rounded-xl border border-border bg-surface p-5">
              <div className="mb-4 flex items-center gap-3">
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-border font-mono text-sm text-accent"
                  aria-hidden
                >
                  {group.icon}
                </span>
                <h3 className="font-semibold tracking-tight">{group.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <Tag key={item}>{item}</Tag>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="about" eyebrow={t.about.eyebrow} title={t.about.title}>
        <div className="grid gap-10 md:grid-cols-2">
          <div className="space-y-4 text-muted">
            {t.about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p>
              {t.about.gwork[0]}
              <ExternalLink href={SITE.gwork} className="font-medium text-foreground underline decoration-accent underline-offset-4">
                GWork Systems
              </ExternalLink>
              {t.about.gwork[1]}
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold tracking-wide text-muted">{t.about.workOnTitle}</h3>
            <ul className="space-y-2">
              {t.about.workOn.map((item) => (
                <li key={item} className="flex items-center gap-2 text-foreground/90">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section id="contact" eyebrow={t.contact.eyebrow} title={t.contact.title}>
        <p className="-mt-4 mb-8 max-w-2xl text-muted">{t.contact.intro}</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {contacts.map((c) => {
            const content = (
              <>
                <span className="flex h-10 w-10 items-center justify-center rounded-md border border-border text-accent">
                  <Icon path={c.icon} />
                </span>
                <span className="mt-4 block font-medium group-hover:text-accent">{c.label}</span>
                <span className="mt-0.5 block break-all text-sm text-muted">{c.value}</span>
              </>
            );
            const cls =
              "group block rounded-xl border border-border bg-surface p-5 transition-all hover:-translate-y-0.5 hover:border-accent";
            return c.external ? (
              <ExternalLink key={c.href} href={c.href} className={cls}>
                {content}
              </ExternalLink>
            ) : (
              <a key={c.href} href={c.href} className={`${cls} border-accent/50`}>
                {content}
              </a>
            );
          })}
        </div>
      </Section>
    </>
  );
}
