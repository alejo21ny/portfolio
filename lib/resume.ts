// Single source of truth for the résumé / CV. The web page (/resume, /es/resume),
// the generated PDFs and DOCX files (scripts/resume-*.mjs) and the LinkedIn kit
// all read from here, so dates and titles can never drift between versions.
//
// Kept free of "@/..." imports so the export scripts can load it directly with
// Node's type stripping.

export type L = { en: string; es: string };
export type LL = { en: string[]; es: string[] };
export type ResumeLocale = keyof L;

// "YYYY-MM" or "YYYY". `end: null` means the role is current.
export type Job = {
  company: string;
  url?: string;
  role: L;
  location: L;
  start: string;
  end: string | null;
  note?: L;
  bullets: LL;
  stack: string[];
};

export type EarlierJob = {
  company: string;
  role: L;
  start?: string;
  end?: string;
  period?: L;
  line: L;
};

export const RESUME = {
  name: "David Alejandro Gómez Builes",
  shortName: "David Gómez",
  headline: {
    en: "Senior Full-Stack Engineer · Platform, Cloud & AI Automation",
    es: "Ingeniero Full-Stack Senior · Cloud, Plataformas y Automatización IA",
  } satisfies L,
  location: { en: "Medellín, Colombia · Open to remote & hybrid", es: "Medellín, Colombia · Disponible remoto e híbrido" } satisfies L,
  contact: {
    email: "david@gworksystems.com",
    phone: "+57 317 853 0602",
    phoneHref: "tel:+573178530602",
    linkedin: { label: "linkedin.com/in/dgomezbuiles", url: "https://www.linkedin.com/in/dgomezbuiles" },
    github: { label: "github.com/alejo21ny", url: "https://github.com/alejo21ny" },
    portfolio: { label: "fsdgportfolio.netlify.app", url: "https://fsdgportfolio.netlify.app" },
    company: { label: "gworksystems.com", url: "https://gworksystems.com" },
  },

  summary: {
    en: "Senior full-stack engineer with 10+ years across software development, cloud and platform operations, IT systems, data and automation. I take products from an empty repository to production — architecture, backend, frontend, mobile, payments and infrastructure — and build the AI-assisted automation around them. Hands-on with PHP/Laravel, React/TypeScript, Node.js, Python, PostgreSQL, AWS, Azure, Cloudflare, Docker and Terraform, with a habit of written decisions, automated tests and staged, reversible releases. Bilingual English/Spanish, used to remote work with international teams.",
    es: "Ingeniero full-stack senior con más de 10 años en desarrollo de software, operación de plataformas cloud, sistemas de TI, datos y automatización. Llevo productos desde un repositorio vacío hasta producción — arquitectura, backend, frontend, móvil, pagos e infraestructura — y construyo la automatización con IA a su alrededor. Trabajo con PHP/Laravel, React/TypeScript, Node.js, Python, PostgreSQL, AWS, Azure, Cloudflare, Docker y Terraform; documento decisiones, automatizo pruebas y despliego por etapas. Bilingüe inglés/español, con experiencia remota en equipos internacionales.",
  } satisfies L,

  highlights: {
    en: [
      "8 systems documented as full case studies — architecture, workflows, data model — with 1,500+ automated tests",
      "Wompi, PayU and ePayco payments behind one pattern: signed webhooks, idempotency and an append-only ledger",
      "14 client websites live today in healthcare, hospitality, recruitment, finance, education and non-profit",
      "AI-assisted bots and workflow automation in production on Slack, AWS and Cloudflare",
    ],
    es: [
      "8 sistemas documentados como casos de estudio completos — arquitectura, flujos y modelo de datos — con más de 1.500 pruebas automatizadas",
      "Pagos con Wompi, PayU y ePayco bajo un mismo patrón: webhooks firmados, idempotencia y libro contable de solo inserción",
      "14 sitios de clientes en línea hoy en salud, hotelería, reclutamiento, finanzas, educación y sin ánimo de lucro",
      "Bots con IA y automatización de flujos en producción sobre Slack, AWS y Cloudflare",
    ],
  } satisfies LL,

  experience: [
    {
      company: "GWork Systems",
      url: "https://gworksystems.com",
      role: { en: "Founder & Lead Engineer", es: "Fundador e Ingeniero Líder" },
      location: { en: "Medellín · Remote", es: "Medellín · Remoto" },
      start: "2026",
      end: null,
      note: { en: "Own practice — software, AI automation, cloud & security", es: "Firma propia — software, automatización con IA, cloud y seguridad" },
      bullets: {
        en: [
          "Design and build production platforms end to end: a direct-booking hospitality platform (Sedona Scapes), a real-time sports marketplace with an Android app (Cancha), a marketplace rebuild (All Bookings 2.0) and a B2B lead-intelligence engine.",
          "Integrated Wompi, PayU and ePayco behind provider-neutral adapters — hosted checkout, signed and deduplicated webhooks, append-only ledger and reconciliation; no card data touches the platforms.",
          "Made double-bookings and oversold matches impossible at the database level (PostgreSQL EXCLUDE constraints, unique indexes, advisory locks) and backed each system with DB, integration and end-to-end test suites.",
          "Run an AI-augmented delivery process: architecture decision records first, coding agents inside automated gates (types, lint, unit, DB, E2E, accessibility, CSP), human review and staged releases.",
        ],
        es: [
          "Diseño y construyo plataformas de punta a punta: una plataforma de reservas directas para hotelería (Sedona Scapes), un marketplace deportivo en tiempo real con app Android (Cancha), la reconstrucción de un marketplace (All Bookings 2.0) y un motor de inteligencia de leads B2B.",
          "Integré Wompi, PayU y ePayco detrás de adaptadores neutrales — checkout alojado, webhooks firmados y deduplicados, libro contable de solo inserción y conciliación; ningún dato de tarjeta toca las plataformas.",
          "Hice imposibles las reservas dobles y los partidos sobrevendidos desde la base de datos (restricciones EXCLUDE, índices únicos y advisory locks en PostgreSQL) y respaldé cada sistema con pruebas de BD, integración y end-to-end.",
          "Trabajo con un proceso potenciado con IA: decisiones de arquitectura escritas primero, agentes de código dentro de controles automáticos (tipos, lint, unitarias, BD, E2E, accesibilidad, CSP), revisión humana y despliegues por etapas.",
        ],
      },
      stack: ["Next.js", "TypeScript", "Hono", "Cloudflare Workers", "PostgreSQL / PostGIS", "Expo / React Native", "Python", "Laravel"],
    },
    {
      company: "indie.io",
      role: { en: "IT Manager — IT & Internal Systems", es: "IT Manager — TI y Sistemas Internos" },
      location: { en: "Remote", es: "Remoto" },
      start: "2026-06",
      end: "2026-09",
      bullets: {
        en: [
          "Owned internal systems and platform operations across AWS and Cloudflare: internal applications, access, DNS, Workers, infrastructure-as-code and day-to-day technical operations.",
          "Built AI-assisted bots and operational automations for Hive/Slack workflows, integrating LLM/API services, PostgreSQL-backed tools and serverless components for intake, task routing and access lifecycle.",
          "Led staged platform migrations and integrations — including community/Discord workflows and internal tooling — across sandbox, staging and production with Terraform, Docker, GitHub CI/CD, E2E validation, approval gates, audit evidence and rollback plans.",
        ],
        es: [
          "Responsable de los sistemas internos y la operación de plataforma en AWS y Cloudflare: aplicaciones internas, accesos, DNS, Workers, infraestructura como código y operación técnica diaria.",
          "Construí bots con IA y automatizaciones operativas para flujos en Hive/Slack, integrando servicios LLM/API, herramientas sobre PostgreSQL y componentes serverless para recepción de solicitudes, enrutamiento de tareas y ciclo de vida de accesos.",
          "Lideré migraciones e integraciones por etapas — incluidos flujos de comunidad/Discord y herramientas internas — entre sandbox, staging y producción con Terraform, Docker, CI/CD en GitHub, validación E2E, aprobaciones, evidencia de auditoría y planes de rollback.",
        ],
      },
      stack: ["AWS", "Cloudflare", "Terraform", "Docker", "PostgreSQL", "Slack", "LLM APIs", "GitHub Actions"],
    },
    {
      company: "Fiserv",
      role: { en: "Technical Writer & Developer", es: "Technical Writer y Desarrollador" },
      location: { en: "Remote", es: "Remoto" },
      start: "2026-01",
      end: "2026-06",
      bullets: {
        en: [
          "Supported the Vision Next platform with developer-facing technical and API documentation for financial-system workflows.",
          "Analyzed REST APIs with Swagger/OpenAPI, documenting endpoints, authentication, request/response models, status codes and error handling.",
          "Created reusable Markdown/API documentation templates and worked with engineering teams on architecture, integrations, runbooks and developer guidance.",
        ],
        es: [
          "Apoyé la plataforma Vision Next con documentación técnica y de APIs para desarrolladores sobre flujos de sistemas financieros.",
          "Analicé APIs REST con Swagger/OpenAPI, documentando endpoints, autenticación, modelos de request/response, códigos de estado y manejo de errores.",
          "Creé plantillas reutilizables de documentación en Markdown y trabajé con los equipos de ingeniería en arquitectura, integraciones, runbooks y guías para desarrolladores.",
        ],
      },
      stack: ["REST APIs", "Swagger / OpenAPI", "Markdown", "Docs-as-code"],
    },
    {
      company: "Steward",
      role: { en: "Provisioning Manager — IT Infrastructure & Access", es: "Provisioning Manager — Infraestructura de TI y Accesos" },
      location: { en: "Remote", es: "Remoto" },
      start: "2023-11",
      end: "2025-11",
      bullets: {
        en: [
          "Managed IT provisioning and access across Google Workspace, Okta and MDM for macOS and Windows fleets.",
          "Built internal React/Node.js dashboards to monitor resource allocation and supported AWS cloud infrastructure initiatives.",
          "Authored SOPs, trained staff and coordinated provisioning, infrastructure and access-management processes across teams.",
        ],
        es: [
          "Gestioné el aprovisionamiento y los accesos de TI en Google Workspace, Okta y MDM para equipos macOS y Windows.",
          "Construí dashboards internos en React/Node.js para monitorear la asignación de recursos y apoyé iniciativas de infraestructura en AWS.",
          "Escribí SOPs, capacité al personal y coordiné procesos de aprovisionamiento, infraestructura y gestión de accesos entre equipos.",
        ],
      },
      stack: ["Google Workspace", "Okta", "MDM", "React", "Node.js", "AWS"],
    },
    {
      company: "Virtual Latinos",
      url: "https://join.virtuallatinos.com/",
      role: { en: "Full-Stack Developer & Team Lead", es: "Desarrollador Full-Stack y Líder de Equipo" },
      location: { en: "Remote · concurrent project", es: "Remoto · proyecto en paralelo" },
      start: "2025-01",
      end: "2025-06",
      bullets: {
        en: [
          "Led full-stack delivery with React, Redux, TypeScript, Laravel and PostgreSQL for the virtual-assistant management and recruitment platform.",
          "Built and optimized REST APIs and automated operations through HubSpot, Zapier and GoHighLevel — lead pipelines, follow-ups, forms and calendars — reducing manual workload by 40%.",
          "Ran sprint planning, code reviews and mentoring; documented APIs and processes in Confluence, Swagger and Notion.",
          "Turned Figma designs into responsive, WCAG-aware WordPress pages (Elementor, ACF, WooCommerce) tuned for Core Web Vitals.",
        ],
        es: [
          "Lideré el desarrollo full-stack con React, Redux, TypeScript, Laravel y PostgreSQL para la plataforma de gestión y reclutamiento de asistentes virtuales.",
          "Construí y optimicé APIs REST y automaticé operaciones con HubSpot, Zapier y GoHighLevel — pipelines de leads, seguimientos, formularios y calendarios — reduciendo el trabajo manual en un 40%.",
          "Dirigí la planeación de sprints, revisiones de código y mentorías; documenté APIs y procesos en Confluence, Swagger y Notion.",
          "Convertí diseños de Figma en páginas WordPress responsive y accesibles (Elementor, ACF, WooCommerce) optimizadas para Core Web Vitals.",
        ],
      },
      stack: ["React", "Redux", "TypeScript", "Laravel", "PostgreSQL", "HubSpot", "Zapier", "WordPress"],
    },
    {
      company: "U.S.-based staffing company",
      role: { en: "SEO Specialist & Web Developer (Contract)", es: "Especialista SEO y Desarrollador Web (Contrato)" },
      location: { en: "Remote · concurrent project", es: "Remoto · proyecto en paralelo" },
      start: "2024-07",
      end: "2024-10",
      bullets: {
        en: [
          "Delivered SEO-focused WordPress and HTML/CSS/JavaScript sites with schema markup, Google Analytics, Search Console and Meta Pixel conversion tracking.",
          "Built custom plugins for lead automation and CRM integration, and handled server administration (cPanel, Linux), performance and production support.",
        ],
        es: [
          "Entregué sitios WordPress y HTML/CSS/JavaScript orientados a SEO, con schema markup, Google Analytics, Search Console y seguimiento de conversiones con Meta Pixel.",
          "Desarrollé plugins a la medida para automatizar leads e integrar el CRM, y administré servidores (cPanel, Linux), rendimiento y soporte en producción.",
        ],
      },
      stack: ["WordPress", "JavaScript", "Technical SEO", "Google Analytics", "Linux"],
    },
    {
      company: "SouthDesk",
      url: "https://southdesk.net/",
      role: { en: "IT Specialist & Developer", es: "Especialista de TI y Desarrollador" },
      location: { en: "Remote", es: "Remoto" },
      start: "2023-05",
      end: "2023-10",
      bullets: {
        en: [
          "Supported business IT systems and day-to-day operations: user support, systems administration and troubleshooting.",
          "Built and maintained the company's responsive, conversion-focused website alongside other development tasks.",
        ],
        es: [
          "Di soporte a los sistemas de TI y la operación diaria: soporte a usuarios, administración de sistemas y resolución de problemas.",
          "Construí y mantuve el sitio web de la empresa, responsive y enfocado en conversión, junto con otras tareas de desarrollo.",
        ],
      },
      stack: ["IT support", "Systems administration", "WordPress"],
    },
    {
      company: "Abatech",
      role: { en: "IT Specialist & Systems Integrator", es: "Especialista de TI e Integrador de Sistemas" },
      location: { en: "Medellín", es: "Medellín" },
      start: "2021-07",
      end: "2023-04",
      bullets: {
        en: [
          "Managed hybrid infrastructure across Azure and on-premises servers; automated maintenance with Python and Bash.",
          "Led Docker containerization and CI/CD pipeline setup, and implemented cybersecurity protocols and risk assessments.",
          "Built WordPress landing pages and internal portals with forms integrated to external APIs.",
        ],
        es: [
          "Administré infraestructura híbrida entre Azure y servidores locales; automaticé el mantenimiento con Python y Bash.",
          "Lideré la contenerización con Docker y la configuración de pipelines CI/CD, e implementé protocolos de ciberseguridad y análisis de riesgos.",
          "Construí landing pages y portales internos en WordPress con formularios integrados a APIs externas.",
        ],
      },
      stack: ["Azure", "Docker", "CI/CD", "Python", "Bash", "Security"],
    },
    {
      company: "UNIFI BPO",
      role: { en: "Software Analyst, Developer & UX Collaborator", es: "Analista de Software, Desarrollador y Colaborador UX" },
      location: { en: "Medellín", es: "Medellín" },
      start: "2019-04",
      end: "2021-07",
      bullets: {
        en: [
          "Built internal web applications with React, FastAPI and MySQL that improved process efficiency.",
          "Wrote technical requirements and Swagger API documentation, designed UI components with the design team in Figma and trained users on new features.",
        ],
        es: [
          "Desarrollé aplicaciones web internas con React, FastAPI y MySQL que mejoraron la eficiencia de los procesos.",
          "Redacté requerimientos técnicos y documentación de APIs en Swagger, diseñé componentes de UI con el equipo de diseño en Figma y capacité a los usuarios en nuevas funciones.",
        ],
      },
      stack: ["React", "FastAPI", "MySQL", "Swagger", "Figma"],
    },
    {
      company: "Freelance",
      role: { en: "Software Developer & Consultant", es: "Desarrollador de Software y Consultor" },
      location: { en: "Remote", es: "Remoto" },
      start: "2017-02",
      end: "2019-04",
      bullets: {
        en: [
          "Delivered SaaS solutions with React, Node.js, Laravel and MongoDB, integrating Stripe, Twilio and Firebase — from architecture and deployment to user manuals and training.",
          "Built WordPress solutions for small businesses: WooCommerce stores, multilingual corporate sites (WPML), booking systems and custom payment and booking plugins.",
        ],
        es: [
          "Entregué soluciones SaaS con React, Node.js, Laravel y MongoDB, integrando Stripe, Twilio y Firebase — desde la arquitectura y el despliegue hasta manuales y capacitación.",
          "Construí soluciones WordPress para pymes: tiendas WooCommerce, sitios corporativos multilingües (WPML), sistemas de reservas y plugins a la medida de pagos y reservas.",
        ],
      },
      stack: ["React", "Node.js", "Laravel", "MongoDB", "Stripe", "Twilio", "WordPress"],
    },
    {
      company: "Conquistadores Home, La Villa",
      role: { en: "IT Specialist, Full-Stack Developer & Team Lead", es: "Especialista de TI, Desarrollador Full-Stack y Líder de Equipo" },
      location: { en: "Medellín", es: "Medellín" },
      start: "2014-02",
      end: "2017-01",
      bullets: {
        en: [
          "Built custom booking and management systems with Laravel, Bootstrap, JavaScript and MySQL, plus the corporate website with live availability.",
          "Led a small technical team, set coding standards and ran secure server infrastructure with regular backups.",
        ],
        es: [
          "Desarrollé sistemas de reservas y gestión a la medida con Laravel, Bootstrap, JavaScript y MySQL, y el sitio corporativo con disponibilidad en vivo.",
          "Lideré un pequeño equipo técnico, definí estándares de código y administré una infraestructura de servidores segura con copias de respaldo periódicas.",
        ],
      },
      stack: ["Laravel", "MySQL", "Bootstrap", "JavaScript", "WordPress"],
    },
  ] satisfies Job[],

  earlier: [
    {
      company: "Aerolíneas de Antioquia (ADA)",
      role: { en: "Software Analyst & Developer, IT", es: "Analista y Desarrollador de Software, TI" },
      start: "2011-02",
      end: "2013-12",
      line: {
        en: "Internal tools for flight scheduling, passenger management and operational reporting (PHP, C#, SQL Server).",
        es: "Herramientas internas de programación de vuelos, gestión de pasajeros y reportes operativos (PHP, C#, SQL Server).",
      },
    },
    {
      company: "The Charlee Hotels",
      role: { en: "Night Auditor — Systems Manager", es: "Auditor Nocturno — Gestor de Sistemas" },
      start: "2010-01",
      end: "2011-01",
      line: {
        en: "Financial and operational systems, audit-process automation and data integrity.",
        es: "Sistemas financieros y operativos, automatización de auditorías e integridad de datos.",
      },
    },
    {
      company: "Two Cousins Trucking",
      role: { en: "IT Specialist & Front-End Developer", es: "Especialista de TI y Desarrollador Front-End" },
      start: "2008-02",
      end: "2010-01",
      line: {
        en: "Front-end web applications in JavaScript, IT infrastructure and security audits.",
        es: "Aplicaciones web front-end en JavaScript, infraestructura de TI y auditorías de seguridad.",
      },
    },
    {
      company: "Novelty Suites S.A.",
      role: { en: "Night Auditor — Systems", es: "Auditor Nocturno — Sistemas" },
      period: { en: "6 years", es: "6 años" },
      line: {
        en: "Night-audit operations, financial systems and reporting accuracy.",
        es: "Operación de auditoría nocturna, sistemas financieros y exactitud de reportes.",
      },
    },
  ] satisfies EarlierJob[],

  // Portfolio case studies shown on the CV; the slug links to /work/<slug>/.
  projects: [
    {
      slug: "sedona-scapes",
      name: "Sedona Scapes Platform",
      line: {
        en: "Direct-booking platform for a vacation-rental business — reservation engine, guest portal with e-signature, PayU payments, channel sync and an MFA back office. 723 DB + 165 E2E tests.",
        es: "Reservas directas para alquiler vacacional: motor anti-sobreventa, portal de huéspedes con firma electrónica, pagos PayU y back office con MFA. 723 pruebas de BD + 165 E2E.",
      },
    },
    {
      slug: "cancha",
      name: "Cancha",
      line: {
        en: "Real-time football marketplace: Android app (Expo), Hono API on Cloudflare Workers, PostGIS discovery, Wompi split payments and a reliability score.",
        es: "Marketplace de fútbol: app Android (Expo), API Hono en Cloudflare Workers, búsqueda PostGIS y pagos divididos con Wompi.",
      },
    },
    {
      slug: "lead-engine",
      name: "Lead Engine",
      line: {
        en: "Nightly lead sourcing, headless-browser enrichment and A+ to D scoring feeding an enforced CRM pipeline for a tourism company.",
        es: "Captación nocturna de leads, enriquecimiento headless y calificación A+ a D hacia un pipeline de CRM.",
      },
    },
    {
      slug: "all-bookings",
      name: "All Bookings 2.0",
      line: {
        en: "Accommodation marketplace rebuilt from no-code into a typed monorepo: multi-tenant hosts, concurrency-safe bookings, Wompi webhooks and a ledger.",
        es: "Marketplace de alojamiento de no-code a monorepo tipado: multi-tenant, reservas seguras, webhooks Wompi y libro contable.",
      },
    },
    {
      slug: "smart-library",
      name: "Smart Library",
      line: {
        en: "Laravel + React library system with RBAC, Google SSO, an audit trail and a grounded AI assistant — live, with CI/CD.",
        es: "Sistema de biblioteca en Laravel + React con RBAC, Google SSO, auditoría y un asistente de IA fundamentado — en línea, con CI/CD.",
      },
    },
  ],

  skills: [
    { group: { en: "Full-stack", es: "Full-stack" }, items: ["PHP / Laravel / Symfony", "React / Next.js", "TypeScript", "Node.js / Hono", "Python / FastAPI", "React Native / Expo", "REST APIs", "WordPress"] },
    { group: { en: "Cloud & platform", es: "Cloud y plataforma" }, items: ["AWS", "Azure", "Cloudflare Workers / Pages / R2", "Docker", "Terraform", "GitHub Actions / CI/CD"] },
    { group: { en: "Data", es: "Datos" }, items: ["PostgreSQL / PostGIS", "MySQL", "MongoDB", "SQL Server", "Azure Data Factory", "Databricks"] },
    { group: { en: "AI & automation", es: "IA y automatización" }, items: ["LLM API integration", "AI-assisted bots", "Grounded assistants", "Zapier / HubSpot / GoHighLevel", "Scrapers & schedulers"] },
    { group: { en: "Payments & integrations", es: "Pagos e integraciones" }, items: ["Wompi", "PayU", "ePayco", "Stripe", "Webhooks & idempotency", "OAuth / SSO"] },
    { group: { en: "Systems & security", es: "Sistemas y seguridad" }, items: ["Okta", "Google Workspace", "MDM", "RBAC / MFA", "CSP / HSTS", "Risk analysis"] },
    { group: { en: "Delivery", es: "Entrega" }, items: ["Swagger / OpenAPI", "Technical writing", "Agile / Scrum", "Code review", "Mentoring", "Jira / Confluence / Notion"] },
  ],

  languages: [
    { name: { en: "Spanish", es: "Español" }, level: { en: "Native", es: "Nativo" } },
    { name: { en: "English", es: "Inglés" }, level: { en: "Professional (C1)", es: "Profesional (C1)" } },
  ],

  education: [
    {
      title: { en: "Technical Degree in Software Analysis and Development", es: "Técnico en Análisis y Desarrollo de Software" },
      school: "CENSA",
      year: "2022",
    },
    {
      title: { en: "Computer Security Technician (Risk Analysis)", es: "Técnico en Seguridad Informática (Análisis de Riesgos)" },
      school: "Fundación Carlos Slim",
      year: "2021",
    },
  ],

  // `key` marks the short list used on the 2-page CV; the rest appear on the full one.
  certifications: [
    { name: "Web Scraping with Python and XPath", issuer: "Fundación Carlos Slim", year: "2023", key: true },
    { name: "Front End Developer", issuer: "Fundación Carlos Slim", year: "2022", key: true },
    { name: "Cloud Computing Fundamentals", issuer: "Fundación Carlos Slim", year: "2022", key: true },
    { name: "PHP Programming with MySQL Database", issuer: "Politécnico Superior de Colombia", year: "2022", key: true },
    { name: "Database Administrator", issuer: "Fundación Carlos Slim", year: "2021", key: true },
    { name: "Glide: Apps Without Code — Data, Screens and Relationships", issuer: "Fundación Carlos Slim", year: "2024", key: false },
    { name: "Web Assistant", issuer: "Fundación Carlos Slim", year: "2022", key: false },
    { name: "Finder (Cybersecurity / Data Tools)", issuer: "Fundación Carlos Slim", year: "2022", key: false },
    { name: "Data Curator", issuer: "Fundación Carlos Slim", year: "2022", key: false },
    { name: "Web Content Developer", issuer: "Fundación Carlos Slim", year: "2021", key: false },
    { name: "Computer Security Technician", issuer: "Fundación Carlos Slim", year: "2021", key: false },
    { name: "IT Technician", issuer: "Fundación Carlos Slim", year: "2021", key: false },
    { name: "Computer Architecture", issuer: "SENA", year: "2018", key: false },
    { name: "HTML and JavaScript Programming", issuer: "SENA", year: "2018", key: false },
    { name: "Web Design with Macromedia Dreamweaver MX", issuer: "SENA", year: "2018", key: false },
    { name: "C++ Programming Language", issuer: "SENA", year: "2016", key: false },
    { name: "Database Administration in Access", issuer: "SENA", year: "2016", key: false },
  ],
};

export const RESUME_UI = {
  en: {
    resume: "Resume",
    summary: "Profile",
    highlights: "Highlights",
    experience: "Experience",
    earlier: "Earlier experience (2008 – 2013)",
    projects: "Selected projects",
    projectsNote: "Architecture, workflows and data models for each one are in the portfolio.",
    skills: "Skills",
    languages: "Languages",
    education: "Education",
    certifications: "Certifications",
    moreCerts: "Also",
    contact: "Contact",
    present: "Present",
    references: "References available on request.",
    download: "Download PDF",
    downloadAts: "ATS version (PDF)",
    downloadDocx: "Word (.docx)",
    print: "Print",
    toolbarNote: "Same data as the PDFs — updated in one place.",
  },
  es: {
    resume: "Hoja de vida",
    summary: "Perfil",
    highlights: "Logros destacados",
    experience: "Experiencia",
    earlier: "Experiencia anterior (2008 – 2013)",
    projects: "Proyectos destacados",
    projectsNote: "Arquitectura, flujos y modelo de datos de cada uno en el portafolio.",
    skills: "Habilidades",
    languages: "Idiomas",
    education: "Educación",
    certifications: "Certificaciones",
    moreCerts: "Además",
    contact: "Contacto",
    present: "Actualidad",
    references: "Referencias disponibles a solicitud.",
    download: "Descargar PDF",
    downloadAts: "Versión ATS (PDF)",
    downloadDocx: "Word (.docx)",
    print: "Imprimir",
    toolbarNote: "Mismos datos que los PDF — se actualizan en un solo lugar.",
  },
} as const;

const MONTHS: Record<ResumeLocale, string[]> = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  es: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
};

export function formatMonth(value: string, locale: ResumeLocale): string {
  const [year, month] = value.split("-");
  return month ? `${MONTHS[locale][Number(month) - 1]} ${year}` : year;
}

export function formatRange(start: string | undefined, end: string | null | undefined, locale: ResumeLocale): string {
  if (!start) return "";
  const to = end === null ? RESUME_UI[locale].present : end ? formatMonth(end, locale) : "";
  return to ? `${formatMonth(start, locale)} – ${to}` : formatMonth(start, locale);
}

// File names of the generated documents in public/cv/.
export const RESUME_FILES = {
  pdf: { en: "David-Gomez-Resume-EN.pdf", es: "David-Gomez-Hoja-de-Vida-ES.pdf" },
  ats: { en: "David-Gomez-Resume-ATS-EN.pdf", es: "David-Gomez-Hoja-de-Vida-ATS-ES.pdf" },
  docx: { en: "David-Gomez-Resume-EN.docx", es: "David-Gomez-Hoja-de-Vida-ES.docx" },
} as const;
