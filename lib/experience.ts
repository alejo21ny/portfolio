// Career timeline. Source: David's most recent résumé (2026); older CVs were
// used only to fill in the early roles it summarises.
type L = { en: string; es: string };

export type Role = {
  company: string;
  role: L;
  period: L;
  current?: boolean;
  bullets: { en: string[]; es: string[] };
  tags: string[];
};

export const ROLES: Role[] = [
  {
    company: "GWork Systems",
    role: { en: "Founder & Lead Engineer", es: "Fundador e Ingeniero Líder" },
    period: { en: "2026 – Present", es: "2026 – Actualidad" },
    current: true,
    bullets: {
      en: [
        "Design and build the platforms on this site end to end: booking, marketplace, sports and lead-intelligence products.",
        "AI-augmented delivery with coding agents, written ADRs, automated gates and staged releases on Cloudflare.",
      ],
      es: [
        "Diseño y construyo de punta a punta las plataformas de este sitio: reservas, marketplace, deportes e inteligencia comercial.",
        "Entrega potenciada con agentes de IA, ADRs por escrito, controles automáticos y despliegues por etapas en Cloudflare.",
      ],
    },
    tags: ["Next.js", "Cloudflare", "PostgreSQL", "AI agents"],
  },
  {
    company: "indie.io",
    role: { en: "IT Manager — IT & Internal Systems", es: "IT Manager — TI y Sistemas Internos" },
    period: { en: "Jun 2026 – Sep 2026", es: "Jun 2026 – Sep 2026" },
    bullets: {
      en: [
        "Owned internal systems and platform operations across AWS and Cloudflare (Workers, Access, DNS).",
        "Terraform / Terraform Cloud and Docker services, with CI/CD through GitHub workflows.",
        "AI-assisted operational tooling: LLM services integrated via API into PostgreSQL-backed dashboards.",
        "Automated onboarding/offboarding across Google Workspace, Slack and developer platforms, with approval gates and audit evidence.",
      ],
      es: [
        "Responsable de sistemas internos y operación de plataforma en AWS y Cloudflare (Workers, Access, DNS).",
        "Infraestructura como código con Terraform / Terraform Cloud y servicios en Docker, con CI/CD en GitHub.",
        "Herramientas operativas con IA: servicios LLM integrados por API en dashboards sobre PostgreSQL.",
        "Automatización de altas y bajas en Google Workspace, Slack y plataformas de desarrollo, con aprobaciones y evidencia de auditoría.",
      ],
    },
    tags: ["AWS", "Cloudflare", "Terraform", "Docker", "LLM APIs"],
  },
  {
    company: "Virtual Latinos",
    role: { en: "Full-Stack Developer", es: "Desarrollador Full-Stack" },
    period: { en: "Oct 2024 – Jun 2025", es: "Oct 2024 – Jun 2025" },
    bullets: {
      en: [
        "Led full-stack development (React, Redux, TypeScript, Laravel, PostgreSQL) for virtual-assistant management platforms.",
        "Automated operational workflows with Zapier and HubSpot integrations, reducing manual workload by 40%.",
        "Sprint planning, code reviews and mentoring; API docs and process manuals in Confluence, Swagger and Notion.",
      ],
      es: [
        "Lideré el desarrollo full-stack (React, Redux, TypeScript, Laravel, PostgreSQL) de plataformas de gestión de asistentes virtuales.",
        "Automaticé flujos operativos con Zapier e integraciones de HubSpot, reduciendo el trabajo manual en un 40%.",
        "Planeación de sprints, code reviews y mentoría; documentación de APIs y procesos en Confluence, Swagger y Notion.",
      ],
    },
    tags: ["React", "TypeScript", "Laravel", "PostgreSQL", "HubSpot"],
  },
  {
    company: "U.S.-based staffing company",
    role: { en: "SEO Specialist & Web Developer (Contractor)", es: "Especialista SEO y Desarrollador Web (Contratista)" },
    period: { en: "Jul 2024 – Oct 2024", es: "Jul 2024 – Oct 2024" },
    bullets: {
      en: ["SEO-driven websites in HTML/CSS/JS and WordPress, plus backend and server management."],
      es: ["Sitios web orientados a SEO en HTML/CSS/JS y WordPress, más gestión de backend y servidores."],
    },
    tags: ["WordPress", "SEO", "Linux"],
  },
  {
    company: "Steward",
    role: { en: "Provisioning Lead & Infrastructure Manager (Contractor)", es: "Líder de Aprovisionamiento y Gerente de Infraestructura (Contratista)" },
    period: { en: "Jan 2023 – Jun 2024", es: "Ene 2023 – Jun 2024" },
    bullets: {
      en: [
        "Directed IT provisioning across Google Workspace, Okta and MDM for macOS / Windows.",
        "Built internal dashboards (React, Node.js) for resource-allocation monitoring; led the AWS cloud migration.",
      ],
      es: [
        "Dirigí el aprovisionamiento de TI en Google Workspace, Okta y MDM para macOS / Windows.",
        "Construí dashboards internos (React, Node.js) para monitorear recursos; lideré la migración a AWS.",
      ],
    },
    tags: ["Okta", "Google Workspace", "AWS", "React", "Node.js"],
  },
  {
    company: "Abatech",
    role: { en: "IT Specialist & Systems Integrator", es: "Especialista TI e Integrador de Sistemas" },
    period: { en: "Jul 2021 – Nov 2022", es: "Jul 2021 – Nov 2022" },
    bullets: {
      en: ["Hybrid Azure / on-prem infrastructure, Python and Bash automation, Docker and CI/CD, security protocols."],
      es: ["Infraestructura híbrida Azure / local, automatización con Python y Bash, Docker y CI/CD, protocolos de seguridad."],
    },
    tags: ["Azure", "Python", "Docker", "CI/CD"],
  },
  {
    company: "UNIFI BPO",
    role: { en: "Software Analyst & Developer", es: "Analista y Desarrollador de Software" },
    period: { en: "Apr 2019 – Jul 2021", es: "Abr 2019 – Jul 2021" },
    bullets: {
      en: ["Web applications with React, FastAPI and MySQL; Swagger API docs; UI collaboration in Figma."],
      es: ["Aplicaciones web con React, FastAPI y MySQL; documentación de APIs en Swagger; colaboración de UI en Figma."],
    },
    tags: ["React", "FastAPI", "MySQL"],
  },
  {
    company: "Freelance",
    role: { en: "Software Developer & Consultant", es: "Desarrollador de Software y Consultor" },
    period: { en: "Feb 2017 – Apr 2019", es: "Feb 2017 – Abr 2019" },
    bullets: {
      en: ["End-to-end SaaS and WordPress delivery for SMEs (React, Node.js, Laravel, MongoDB) with Stripe, Twilio and Firebase integrations."],
      es: ["Entrega de SaaS y WordPress de punta a punta para pymes (React, Node.js, Laravel, MongoDB) con integraciones de Stripe, Twilio y Firebase."],
    },
    tags: ["Laravel", "React", "Stripe", "WordPress"],
  },
  {
    company: "Conquistadores Home, La Villa",
    role: { en: "IT Specialist, Full-Stack Developer & Team Lead", es: "Especialista TI, Desarrollador Full-Stack y Líder de Equipo" },
    period: { en: "Feb 2014 – Jan 2017", es: "Feb 2014 – Ene 2017" },
    bullets: {
      en: ["Custom booking and management systems (Laravel, Bootstrap, MySQL); led a small technical team."],
      es: ["Sistemas de reservas y gestión a la medida (Laravel, Bootstrap, MySQL); lideré un equipo técnico pequeño."],
    },
    tags: ["Laravel", "MySQL", "Booking"],
  },
  {
    company: "Aerolíneas de Antioquia · The Charlee Hotels · Novelty Suites · Two Cousins Trucking",
    role: { en: "IT systems, software & operational reporting", es: "Sistemas de TI, software y reportes operativos" },
    period: { en: "2008 – 2013", es: "2008 – 2013" },
    bullets: {
      en: ["Internal tools for flight scheduling and operational reporting (PHP, C#, SQL Server), hotel systems and audits, and IT infrastructure across airline, hospitality and logistics."],
      es: ["Herramientas internas de programación de vuelos y reportes (PHP, C#, SQL Server), sistemas hoteleros y auditoría, e infraestructura de TI en aerolínea, hotelería y logística."],
    },
    tags: ["PHP", "C#", "SQL Server"],
  },
];

export const EDUCATION: { title: L; school: string; year: string }[] = [
  { title: { en: "Technical Degree in Software Analysis and Development", es: "Técnico en Análisis y Desarrollo de Software" }, school: "CENSA", year: "2022" },
  { title: { en: "Computer Security Technician (Risk Analysis)", es: "Técnico en Seguridad Informática (Análisis de Riesgos)" }, school: "Carlos Slim Foundation", year: "2021" },
];

export const CERTIFICATIONS: { name: string; issuer: string; year: string }[] = [
  { name: "Web Scraping with Python and XPath", issuer: "Carlos Slim Foundation", year: "2023" },
  { name: "Front End Developer", issuer: "Carlos Slim Foundation", year: "2022" },
  { name: "Cloud Computing Fundamentals", issuer: "Carlos Slim Foundation", year: "2022" },
  { name: "PHP Programming with MySQL Database", issuer: "Politécnico Superior de Colombia", year: "2022" },
  { name: "Database Administrator", issuer: "Carlos Slim Foundation", year: "2021" },
];

export const LANGUAGES: { name: L; level: L }[] = [
  { name: { en: "Spanish", es: "Español" }, level: { en: "Native", es: "Nativo" } },
  { name: { en: "English", es: "Inglés" }, level: { en: "C2 — professional", es: "C2 — profesional" } },
];

export const RESUME_PDF = "/David_Gomez_Resume.pdf";
