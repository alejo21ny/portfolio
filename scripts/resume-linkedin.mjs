// Writes docs/linkedin-experience.md: every LinkedIn "Experience" entry, field by
// field, built from lib/resume.ts so LinkedIn and the CV always match.
//
//   npm run resume:linkedin
import { writeFile } from "node:fs/promises";
import { RESUME, formatMonth } from "../lib/resume.ts";

const job = (company) => RESUME.experience.find((j) => j.company === company);
const earlier = (company) => RESUME.earlier.find((j) => j.company === company);
const contracts = job("Freelance & contract projects");

// LinkedIn keeps a few roles as separate entries that the CV groups together.
const ENTRIES = [
  { from: job("GWork Systems"), type: "Autónomo", where: "Medellín, Antioquia, Colombia", mode: "En remoto", skills: ["Next.js", "TypeScript", "PostgreSQL", "Cloudflare", "AI Automation"] },
  { from: job("indie.io"), type: "Jornada completa", where: "Medellín, Antioquia, Colombia", mode: "En remoto", skills: ["AWS", "Cloudflare", "Terraform", "IT Management", "AI Automation"] },
  { from: job("Major Media"), type: "Contrato", where: "Medellín, Antioquia, Colombia", mode: "En remoto", skills: ["WordPress", "PHP", "JavaScript", "Web Performance"] },
  { from: job("Fiserv"), type: "Jornada completa", where: "Medellín, Antioquia, Colombia", mode: "Híbrido", keepDescription: true, skills: ["RESTful APIs", "OpenAPI / Swagger", "Technical Writing", "Markdown", "Confluence"] },
  { from: job("Steward"), company: "Steward Health Care", type: "Jornada completa", where: "Estados Unidos", mode: "En remoto", extra: { en: "Provisioning for Meditech and corporate systems.", es: "Aprovisionamiento para Meditech y sistemas corporativos." }, skills: ["Okta", "Google Workspace", "MDM", "IT Provisioning", "Project Management"] },
  { from: job("Virtual Latinos"), type: "Contrato", where: "Medellín, Antioquia, Colombia", mode: "En remoto", keepDescription: true, skills: ["Laravel", "React", "TypeScript", "PostgreSQL", "HubSpot"] },
  { from: job("U.S.-based staffing company"), company: "U.S. staffing company (confidential)", type: "Contrato", where: "Medellín, Antioquia, Colombia", mode: "En remoto", skills: ["SEO", "WordPress", "Google Analytics", "JavaScript"] },
  { from: job("SouthDesk"), type: "Jornada completa", where: "Medellín, Antioquia, Colombia", mode: "Presencial", skills: ["Technical Support", "Azure", "Office 365", "WordPress"] },
  { from: job("Abatech"), company: "ABA Tech", type: "Jornada completa", where: "Medellín, Antioquia, Colombia", mode: "Presencial", skills: ["Azure", "Docker", "CI/CD", "Python", "Cybersecurity"] },
  { title: { en: "Front-End & WordPress Developer — Web Team Lead", es: "Desarrollador Front-End y WordPress — Líder del Equipo Web" }, company: "Admin Ops", start: "2022-11", end: "2023-02", type: "Contrato", where: "Medellín, Antioquia, Colombia", mode: "En remoto", bullets: { en: [contracts.bullets.en[2]], es: [contracts.bullets.es[2]] }, skills: ["WordPress", "Front-End Development", "Team Leadership"] },
  { title: { en: "Full-Stack Developer", es: "Desarrollador Full-Stack" }, company: "All Bookings", start: "2022-01", end: "2022-07", type: "Autónomo", where: "Medellín, Antioquia, Colombia", mode: "En remoto", bullets: { en: [contracts.bullets.en[1]], es: [contracts.bullets.es[1]] }, skills: ["Full-Stack Development", "PHP", "MySQL"] },
  { title: { en: "SQL Server Developer & Database Administrator", es: "Desarrollador y Administrador de Bases de Datos SQL Server" }, company: "Adage LATAM", start: "2022-01", end: "2022-04", type: "Contrato", where: "Medellín, Antioquia, Colombia", mode: "En remoto", bullets: { en: [contracts.bullets.en[0]], es: [contracts.bullets.es[0]] }, skills: ["Microsoft SQL Server", "Database Administration"] },
  { from: job("UNIFI BPO"), company: "Unifi PMO", type: "Jornada completa", where: "Medellín, Antioquia, Colombia", mode: "Híbrido", skills: ["React", "FastAPI", "MySQL", "Swagger", "Figma"] },
  { from: job("Solvo Global"), type: "Jornada completa", where: "Medellín, Antioquia, Colombia", mode: "Presencial", skills: ["IT Support", "Systems Administration", "Bilingual Support"] },
  { from: job("The Charlee Hotel"), company: "The Charlee", type: "Jornada completa", where: "Medellín, Antioquia, Colombia", mode: "Presencial", skills: ["Hotel Operations", "Night Audit", "Team Leadership"] },
  { from: job("Own hospitality business"), company: "TuApartamento MDE", type: "Autónomo", where: "Medellín, Antioquia, Colombia", mode: "Presencial", skills: ["General Management", "Hospitality", "Laravel", "Marketing", "Airbnb / Booking.com"] },
  { title: { en: "Freelance Full-Stack & Mobile Developer", es: "Desarrollador Full-Stack y Móvil Freelance" }, company: "Profesional independiente", start: "2017-03", end: "2023-02", type: "Freelance", where: "Colombia", mode: "Híbrido", bullets: { en: ["Web and SaaS projects for small businesses alongside my main roles: WooCommerce stores, multilingual WordPress sites (WPML) and integrations with Stripe, Twilio and Firebase."], es: ["Proyectos web y SaaS para pymes en paralelo a mis cargos principales: tiendas WooCommerce, sitios WordPress multilingües (WPML) e integraciones con Stripe, Twilio y Firebase."] }, skills: ["Full-Stack Development", "WordPress", "Laravel", "React"] },
  { from: earlier("Agenciauto"), where: "Medellín, Antioquia, Colombia", type: "Jornada completa", mode: "Presencial", skills: ["IT Support"] },
  { from: job("Aerolínea de Antioquia (ADA)"), company: "ADA", type: "Jornada completa", where: "Medellín, Antioquia, Colombia", mode: "Presencial", skills: ["C#", ".NET", "Microsoft SQL Server", "IT Support"] },
  { from: earlier("Affinity / EE Hoteles"), company: "Affinity / EE Hoteles (antes: Novelty Suites S.A.)", where: "Medellín, Antioquia, Colombia", type: "Jornada completa", mode: "Presencial", skills: ["Hotel Operations", "Night Audit", "Front Desk Management"] },
  { from: earlier("Two Cousins Trucking Corp."), company: "TWO COUSINS TRUCKING CORP", where: "Nueva York, Estados Unidos", type: "Jornada completa", mode: "Presencial", skills: ["Office Management", "Administration"] },
];

const range = (start, end, locale) => `${formatMonth(start, locale)} – ${end === null ? (locale === "en" ? "Present" : "actualidad") : formatMonth(end, locale)}`;

const out = [
  "# LinkedIn — experience, ready to paste",
  "",
  "Generated from `lib/resume.ts` by `npm run resume:linkedin` — do not edit by hand.",
  "Order = how LinkedIn should show them (newest first). Paste the **EN** text in the",
  "English profile and the **ES** text in the Spanish one.",
  "",
];

ENTRIES.forEach((e, i) => {
  const f = e.from ?? {};
  const title = e.title ?? f.role;
  const company = e.company ?? f.company;
  const start = e.start ?? f.start;
  const end = e.end !== undefined ? e.end : f.end;
  const bullets = e.bullets ?? (f.bullets ? f.bullets : { en: [f.line?.en], es: [f.line?.es] });
  out.push(`## ${i + 1}. ${title.en} — ${company}`, "");
  out.push(`- **Cargo (EN):** ${title.en}`);
  out.push(`- **Cargo (ES):** ${title.es}`);
  out.push(`- **Tipo de empleo:** ${e.type}`);
  out.push(`- **Empresa:** ${company}`);
  out.push(`- **Fechas:** ${range(start, end, "es")}${end === null ? " (marca \"Trabajo actualmente en este cargo\")" : ""}`);
  out.push(`- **Ubicación:** ${e.where} · **Tipo:** ${e.mode}`);
  out.push(`- **Aptitudes:** ${e.skills.join(", ")}`);
  out.push("");
  if (e.keepDescription) {
    out.push("**Descripción:** deja la que ya tienes en LinkedIn (está muy completa); solo cambia el cargo y las fechas.", "");
  } else {
    for (const locale of ["en", "es"]) {
      out.push(`**Descripción (${locale.toUpperCase()}):**`, "", "```");
      if (f.note) out.push(f.note[locale]);
      if (e.extra) out.push(e.extra[locale]);
      out.push(...bullets[locale].map((b) => `• ${b}`));
      out.push("```", "");
    }
  }
});

await writeFile("docs/linkedin-experience.md", out.join("\n"));
console.log("✓ docs/linkedin-experience.md");
