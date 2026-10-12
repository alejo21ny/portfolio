// Writes editable Word versions of the résumé (public/cv/*.docx) from the same
// data as the web page and PDFs. Single column, real headings and bullets, so
// it also uploads cleanly to job portals.
//
//   npm run resume:docx
import { writeFile, mkdir } from "node:fs/promises";
import { join, resolve } from "node:path";
import { AlignmentType, BorderStyle, Document, ExternalHyperlink, HeadingLevel, LevelFormat, Packer, Paragraph, TabStopType, TextRun } from "docx";
import { RESUME, RESUME_FILES, RESUME_UI, formatRange, jobCompany, jobPeriod } from "../lib/resume.ts";

const ACCENT = "0F766E";
const MUTED = "52525B";
const FONT = "Calibri";
const RIGHT_TAB = 10080; // content width in twips (Letter, 0.75in margins)

const heading = (text) =>
  new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 220, after: 80 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: ACCENT, space: 2 } },
    children: [new TextRun({ text: text.toUpperCase(), bold: true, color: ACCENT, size: 20, characterSpacing: 30 })],
  });

const bullet = (text) => new Paragraph({ numbering: { reference: "bullets", level: 0 }, spacing: { after: 30 }, children: [new TextRun({ text, size: 20 })] });

const roleLine = (left, right) =>
  new Paragraph({
    keepNext: true,
    spacing: { before: 140 },
    tabStops: [{ type: TabStopType.RIGHT, position: RIGHT_TAB }],
    children: [new TextRun({ text: left, bold: true, size: 21 }), new TextRun({ text: `\t${right}`, color: MUTED, size: 19 })],
  });

const small = (text, opts = {}) => new Paragraph({ keepNext: opts.keepNext, spacing: { after: 40 }, children: [new TextRun({ text, color: MUTED, size: 18, italics: opts.italics })] });

const link = (label, url) => new ExternalHyperlink({ link: url, children: [new TextRun({ text: label, style: "Hyperlink", size: 18 })] });

function build(locale) {
  const ui = RESUME_UI[locale];
  const c = RESUME.contact;
  const sep = () => new TextRun({ text: "  |  ", color: MUTED, size: 18 });
  const body = [
    new Paragraph({ children: [new TextRun({ text: RESUME.name, bold: true, size: 40 })] }),
    new Paragraph({ spacing: { after: 60 }, children: [new TextRun({ text: RESUME.headline[locale], color: ACCENT, bold: true, size: 23 })] }),
    new Paragraph({ children: [new TextRun({ text: `${RESUME.location[locale]}  |  ${c.phone}  |  `, color: MUTED, size: 18 }), link(c.email, `mailto:${c.email}`)] }),
    new Paragraph({ children: [link(c.linkedin.label, c.linkedin.url), sep(), link(c.github.label, c.github.url), sep(), link(c.portfolio.label, c.portfolio.url)] }),

    heading(ui.summary),
    new Paragraph({ spacing: { after: 60 }, children: [new TextRun({ text: RESUME.summary[locale], size: 20 })] }),
    ...RESUME.highlights[locale].map(bullet),

    heading(ui.skills),
    ...RESUME.skills.map(
      (s) => new Paragraph({ spacing: { after: 30 }, children: [new TextRun({ text: `${s.group[locale]}: `, bold: true, size: 20 }), new TextRun({ text: s.items.join(", "), size: 20 })] }),
    ),

    heading(ui.experience),
    ...RESUME.experience.flatMap((job) => [
      roleLine(`${job.role[locale]} — ${jobCompany(job, locale)}`, jobPeriod(job, locale)),
      small(`${job.location[locale]}${job.note ? ` — ${job.note[locale]}` : ""}`, { keepNext: true }),
      ...job.bullets[locale].map(bullet),
      small(job.stack.join(" · "), { italics: true }),
    ]),

    heading(ui.earlier),
    ...RESUME.earlier.flatMap((job) => [
      roleLine(`${job.role[locale]} — ${job.company}`, job.period ? job.period[locale] : formatRange(job.start, job.end, locale)),
      new Paragraph({ spacing: { after: 30 }, children: [new TextRun({ text: job.line[locale], size: 20 })] }),
    ]),

    heading(ui.projects),
    ...RESUME.projects.map(
      (p) =>
        new Paragraph({
          numbering: { reference: "bullets", level: 0 },
          spacing: { after: 30 },
          children: [new TextRun({ text: `${p.name}: `, bold: true, size: 20 }), new TextRun({ text: p.line[locale], size: 20 })],
        }),
    ),
    small(`${ui.projectsNote} ${c.portfolio.url}`),

    heading(ui.education),
    ...RESUME.education.map((e) => roleLine(`${e.title[locale]} — ${e.school}`, e.year)),

    heading(ui.certifications),
    new Paragraph({ children: [new TextRun({ text: RESUME.certifications.map((cert) => `${cert.name} (${cert.issuer}, ${cert.year})`).join(" · "), size: 19 })] }),

    heading(ui.languages),
    new Paragraph({ children: [new TextRun({ text: RESUME.languages.map((l) => `${l.name[locale]} — ${l.level[locale]}`).join("  ·  "), size: 20 })] }),
  ];

  return new Document({
    creator: RESUME.name,
    title: `${RESUME.name} — ${ui.resume}`,
    styles: { default: { document: { run: { font: FONT, size: 20 } } } },
    numbering: {
      config: [
        {
          reference: "bullets",
          levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 300, hanging: 220 } } } }],
        },
      ],
    },
    sections: [{ properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1000, bottom: 1000, left: 1080, right: 1080 } } }, children: body }],
  });
}

const DEST = resolve("public/cv");
await mkdir(DEST, { recursive: true });
for (const locale of ["en", "es"]) {
  const file = join(DEST, RESUME_FILES.docx[locale]);
  await writeFile(file, await Packer.toBuffer(build(locale)));
  console.log(`✓ public/cv/${RESUME_FILES.docx[locale]}`);
}
