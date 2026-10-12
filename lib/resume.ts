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
  // Localized company label when it is a description rather than a name.
  companyL?: L;
  url?: string;
  role: L;
  location: L;
  start: string;
  end: string | null;
  note?: L;
  // Shown instead of the computed date range when exact months aren't known.
  period?: L;
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
    en: "Senior Full-Stack Developer & Technical Lead · Cloud, Platforms & AI Automation",
    es: "Desarrollador Full-Stack Senior y Líder Técnico · Cloud, Plataformas y Automatización IA",
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
    en: "Senior full-stack developer and technical lead with 15+ years in software and IT — and 20+ years of work that includes founding and running my own hospitality business. I take products from an empty repository to production — architecture, backend, frontend, mobile, payments and infrastructure — and build the AI-assisted automation around them. Hands-on with PHP/Laravel, React/TypeScript, Node.js, Python, PostgreSQL, AWS, Azure, Cloudflare, Docker and Terraform. Having run a business end to end, I build with operations, customers and margins in mind. Bilingual English/Spanish, used to remote work with international teams.",
    es: "Desarrollador full-stack senior y líder técnico con más de 15 años en software y TI — y más de 20 años de trayectoria que incluye fundar y dirigir mi propio negocio hotelero. Llevo productos desde un repositorio vacío hasta producción — arquitectura, backend, frontend, móvil, pagos e infraestructura — y construyo la automatización con IA a su alrededor. Trabajo con PHP/Laravel, React/TypeScript, Node.js, Python, PostgreSQL, AWS, Azure, Cloudflare, Docker y Terraform. Haber dirigido un negocio me hace construir pensando en la operación y el cliente. Bilingüe inglés/español.",
  } satisfies L,

  highlights: {
    en: [
      "Founded and ran a 7-property hospitality business (2013 – 2020): operations, brand, marketing, finance and its own booking system",
      "8 systems documented as full case studies — architecture, workflows, data model — with 1,500+ automated tests",
      "Wompi, PayU and ePayco payments behind one pattern: signed webhooks, idempotency and an append-only ledger",
      "AI-assisted bots and workflow automation in production on Slack, AWS and Cloudflare",
    ],
    es: [
      "Fundé y dirigí un negocio hotelero de 7 propiedades (2013 – 2020): operación, marca, marketing, finanzas y su propio sistema de reservas",
      "8 sistemas documentados como casos de estudio completos — arquitectura, flujos y modelo de datos — con más de 1.500 pruebas automatizadas",
      "Pagos con Wompi, PayU y ePayco bajo un mismo patrón: webhooks firmados, idempotencia y libro contable de solo inserción",
      "Bots con IA y automatización de flujos en producción sobre Slack, AWS y Cloudflare",
    ],
  } satisfies LL,

  experience: [
    {
      company: "GWork Systems",
      url: "https://gworksystems.com",
      role: { en: "Founder & Technical Lead", es: "Fundador y Líder Técnico" },
      location: { en: "Medellín · Remote", es: "Medellín · Remoto" },
      start: "2026",
      end: null,
      note: { en: "Own practice — software, AI automation, cloud & security", es: "Firma propia — software, automatización con IA, cloud y seguridad" },
      bullets: {
        en: [
          "Design and build production platforms end to end: a direct-booking hospitality platform (Sedona Scapes), a real-time sports marketplace with an Android app (Cancha), a marketplace rebuild (All Bookings 2.0) and a B2B lead-intelligence engine.",
          "Integrated Wompi, PayU and ePayco behind provider-neutral adapters — hosted checkout, signed and deduplicated webhooks, append-only ledger and reconciliation; no card data touches the platforms.",
          "Run an AI-augmented delivery process: architecture decision records first, coding agents inside automated gates (types, lint, unit, DB, E2E, accessibility, CSP), human review and staged releases.",
        ],
        es: [
          "Diseño y construyo plataformas de punta a punta: una plataforma de reservas directas para hotelería (Sedona Scapes), un marketplace deportivo en tiempo real con app Android (Cancha), la reconstrucción de un marketplace (All Bookings 2.0) y un motor de inteligencia de leads B2B.",
          "Integré Wompi, PayU y ePayco detrás de adaptadores neutrales — checkout alojado, webhooks firmados y deduplicados, libro contable de solo inserción y conciliación; ningún dato de tarjeta toca las plataformas.",
          "Trabajo con un proceso potenciado con IA: decisiones de arquitectura escritas primero, agentes de código dentro de controles automáticos (tipos, lint, unitarias, BD, E2E, accesibilidad, CSP), revisión humana y despliegues por etapas.",
        ],
      },
      stack: ["Next.js", "TypeScript", "Hono", "Cloudflare Workers", "PostgreSQL / PostGIS", "Expo / React Native", "Python", "Laravel"],
    },
    {
      company: "indie.io",
      role: { en: "IT Manager — IT & Internal Systems", es: "IT Manager — TI y Sistemas Internos" },
      location: { en: "Remote", es: "Remoto" },
      start: "2026-05",
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
      company: "Major Media",
      role: { en: "Full-Stack Developer — WordPress (Contract)", es: "Desarrollador Full-Stack — WordPress (Contrato)" },
      location: { en: "Remote · concurrent project", es: "Remoto · proyecto en paralelo" },
      start: "2026",
      end: "2026",
      period: { en: "2026 · several months", es: "2026 · varios meses" },
      bullets: {
        en: [
          "Full-stack development for an agency's client sites: custom WordPress themes and plugins, integrations, performance and maintenance.",
        ],
        es: [
          "Desarrollo full-stack para los sitios de clientes de una agencia: temas y plugins de WordPress a la medida, integraciones, rendimiento y mantenimiento.",
        ],
      },
      stack: [],
    },
    {
      company: "Fiserv",
      role: { en: "Full-Stack Developer & API Technical Writer", es: "Desarrollador Full-Stack y Technical Writer de APIs" },
      location: { en: "Remote", es: "Remoto" },
      start: "2026-01",
      end: "2026-04",
      bullets: {
        en: [
          "Supported the Vision Next platform with developer-facing technical and API documentation for financial-system workflows.",
          "Analyzed REST APIs with Swagger/OpenAPI, documenting endpoints, authentication, request/response models, status codes and error handling.",
        ],
        es: [
          "Apoyé la plataforma Vision Next con documentación técnica y de APIs para desarrolladores sobre flujos de sistemas financieros.",
          "Analicé APIs REST con Swagger/OpenAPI, documentando endpoints, autenticación, modelos de request/response, códigos de estado y manejo de errores.",
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
        ],
        es: [
          "Lideré el desarrollo full-stack con React, Redux, TypeScript, Laravel y PostgreSQL para la plataforma de gestión y reclutamiento de asistentes virtuales.",
          "Construí y optimicé APIs REST y automaticé operaciones con HubSpot, Zapier y GoHighLevel — pipelines de leads, seguimientos, formularios y calendarios — reduciendo el trabajo manual en un 40%.",
          "Dirigí la planeación de sprints, revisiones de código y mentorías; documenté APIs y procesos en Confluence, Swagger y Notion.",
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
      stack: [],
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
      stack: [],
    },
    {
      company: "Abatech",
      role: { en: "IT Specialist & Systems Integrator", es: "Especialista de TI e Integrador de Sistemas" },
      location: { en: "Medellín", es: "Medellín" },
      start: "2022-07",
      end: "2023-04",
      bullets: {
        en: [
          "Managed hybrid infrastructure across Azure and on-premises servers; automated maintenance with Python and Bash.",
          "Led Docker containerization and CI/CD pipeline setup, and implemented cybersecurity protocols and risk assessments.",
        ],
        es: [
          "Administré infraestructura híbrida entre Azure y servidores locales; automaticé el mantenimiento con Python y Bash.",
          "Lideré la contenerización con Docker y la configuración de pipelines CI/CD, e implementé protocolos de ciberseguridad y análisis de riesgos.",
        ],
      },
      stack: ["Azure", "Docker", "CI/CD", "Python", "Bash", "Security"],
    },
    {
      company: "Freelance & contract projects",
      companyL: { en: "Freelance & contract projects", es: "Proyectos freelance y por contrato" },
      role: { en: "Full-Stack Developer & DBA", es: "Desarrollador Full-Stack y DBA" },
      location: { en: "Remote · concurrent", es: "Remoto · en paralelo" },
      start: "2022-01",
      end: "2023-02",
      bullets: {
        en: [
          "Adage LATAM — SQL Server development and database administration.",
          "All Bookings — full-stack development of the original accommodation marketplace (later rebuilt as All Bookings 2.0).",
          "Admin Ops — front-end and WordPress development as web team lead (adminops.com).",
        ],
        es: [
          "Adage LATAM — desarrollo en SQL Server y administración de bases de datos.",
          "All Bookings — desarrollo full-stack del marketplace de alojamiento original (luego reconstruido como All Bookings 2.0).",
          "Admin Ops — desarrollo front-end y WordPress como líder del equipo web (adminops.com).",
        ],
      },
      stack: [],
    },
    {
      company: "UNIFI BPO",
      role: { en: "Software Analyst, Developer & UX Collaborator", es: "Analista de Software, Desarrollador y Colaborador UX" },
      location: { en: "Medellín", es: "Medellín" },
      start: "2021-10",
      end: "2022-06",
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
      company: "Solvo Global",
      role: { en: "System Analyst", es: "Analista de Sistemas" },
      location: { en: "Medellín", es: "Medellín" },
      start: "2021-04",
      end: "2021-09",
      note: { en: "Assigned to CarNow, a U.S. company", es: "Asignado a CarNow, empresa de EE. UU." },
      bullets: {
        en: [
          "Set up and supported the systems of a U.S. client starting operations in Medellín: accounts, equipment, software and bilingual day-to-day user support.",
        ],
        es: [
          "Monté y soporté los sistemas de un cliente estadounidense que iniciaba operaciones en Medellín: cuentas, equipos, software y soporte bilingüe diario a usuarios.",
        ],
      },
      stack: [],
    },
    {
      company: "The Charlee Hotel",
      url: "https://www.thecharlee.com/",
      role: { en: "Night Manager", es: "Gerente Nocturno" },
      location: { en: "El Poblado, Medellín", es: "El Poblado, Medellín" },
      start: "2020-09",
      end: "2021-03",
      bullets: {
        en: [
          "Ran overnight operations of a boutique hotel as it reopened after the lockdowns: front desk, night audit, guest service, security and the hotel's systems.",
        ],
        es: [
          "Dirigí la operación nocturna de un hotel boutique en su reapertura tras las cuarentenas: recepción, auditoría nocturna, servicio al huésped, seguridad y los sistemas del hotel.",
        ],
      },
      stack: [],
    },
    {
      company: "Own hospitality business",
      companyL: { en: "Own hospitality business", es: "Negocio hotelero propio" },
      role: { en: "Founder & General Manager", es: "Fundador y Gerente General" },
      location: { en: "Medellín", es: "Medellín" },
      start: "2013-10",
      end: "2020-03",
      note: { en: "Own business — closed when the pandemic shut down tourism", es: "Negocio propio — cerró cuando la pandemia paralizó el turismo" },
      bullets: {
        en: [
          "Founded and ran a short-term-rental and hotel operation with seven properties: Apartahotel Santo Tomás, Hotel La Castellana, Nutibara Home, Calasanz Home, Hostería Villa Claudia, Tu Apartamento and Conquistadores Home.",
          "Owned the whole business: operations, staff, finance and administration, brand and marketing, and distribution on Airbnb and Booking.com.",
          "Built the in-house booking and property-management system (Laravel, Bootstrap, JavaScript, MySQL) and the websites with live availability; ran the servers, backups and IT.",
          "In parallel, delivered web projects for small businesses: WooCommerce stores, multilingual WordPress sites (WPML) and integrations with Stripe, Twilio and Firebase.",
        ],
        es: [
          "Fundé y dirigí una operación de alquiler temporal y hotelería con siete propiedades: Apartahotel Santo Tomás, Hotel La Castellana, Nutibara Home, Calasanz Home, Hostería Villa Claudia, Tu Apartamento y Conquistadores Home.",
          "Responsable de todo el negocio: operación, personal, finanzas, marca, marketing y distribución en Airbnb y Booking.com.",
          "Desarrollé el sistema propio de reservas y gestión de propiedades (Laravel, Bootstrap, JavaScript, MySQL) y los sitios web con disponibilidad en vivo; administré servidores, respaldos y TI.",
          "En paralelo, entregué proyectos web para pymes: tiendas WooCommerce, sitios WordPress multilingües (WPML) e integraciones con Stripe, Twilio y Firebase.",
        ],
      },
      stack: ["Laravel", "MySQL", "JavaScript", "WordPress", "Airbnb / Booking.com", "Operations", "Marketing"],
    },
    {
      company: "Aerolínea de Antioquia (ADA)",
      role: { en: "Software Developer & IT — .NET", es: "Desarrollador de Software y TI — .NET" },
      location: { en: "Medellín", es: "Medellín" },
      start: "2011-02",
      end: "2013-06",
      bullets: {
        en: [
          "Developed and maintained the airline's ticket and route sales system in .NET (C#) and SQL Server, and fixed back-end data inconsistencies in ticket sales.",
          "Integrated sales with the DMS accounting system and built internal tools for operational reporting.",
          "Provided IT support: user help desk, equipment installation and troubleshooting.",
        ],
        es: [
          "Desarrollé y mantuve el sistema de venta de tiquetes y trayectos de la aerolínea en .NET (C#) y SQL Server, y corregí inconsistencias de datos en el backend de ventas.",
          "Integré las ventas con el sistema contable DMS y construí herramientas internas de reportes operativos.",
          "Di soporte de TI: mesa de ayuda a usuarios, instalación de equipos y solución de fallas.",
        ],
      },
      stack: ["C#", ".NET", "SQL Server", "DMS integration", "IT support"],
    },
  ] satisfies Job[],

  earlier: [
    {
      company: "Agenciauto",
      role: { en: "Systems Support", es: "Soporte de Sistemas" },
      start: "2013-07",
      end: "2013-09",
      line: {
        en: "IT and systems support.",
        es: "Soporte de TI y sistemas.",
      },
    },
    {
      company: "Affinity / EE Hoteles",
      role: { en: "Receptionist → Night Auditor → Front Desk Manager", es: "Recepcionista → Auditor Nocturno → Jefe de Recepción" },
      start: "2005",
      end: "2011",
      line: {
        en: "Six years across the group's properties (Affinity, Alcázar de Oviedo, Rodeo, Novelty Suites), then night audit at Comfort Suites Laureles, San Joaquín, Sky Plus Best Western and Poblado Plaza.",
        es: "Sedes Affinity, Alcázar de Oviedo, Rodeo y Novelty Suites; luego auditoría en Comfort Suites, San Joaquín, Sky Plus Best Western y Poblado Plaza.",
      },
    },
    {
      company: "Two Cousins Trucking Corp.",
      role: { en: "Office Manager — New York", es: "Gerente de Oficina — Nueva York" },
      start: "2003-01",
      end: "2005-06",
      line: {
        en: "Office administration, billing and office systems for a New York trucking company.",
        es: "Administración, facturación y sistemas de oficina de una transportadora en Nueva York.",
      },
    },
  ] as EarlierJob[],

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
    { group: { en: "Business & operations", es: "Negocio y operación" }, items: ["General management", "Hotel operations", "Airbnb / Booking.com", "Team leadership", "Brand & marketing", "Administration & finance"] },
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
    earlier: "Earlier experience (2003 – 2013)",
    projects: "Selected projects",
    projectsNote: "Architecture, workflows and data models for each one are in the portfolio.",
    skills: "Skills",
    languages: "Languages",
    education: "Education",
    certifications: "Certifications",
    moreCerts: (n: number) => `+${n} more (SENA, Fundación Carlos Slim) — full list in the ATS and Word versions.`,
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
    earlier: "Experiencia anterior (2003 – 2013)",
    projects: "Proyectos destacados",
    projectsNote: "Arquitectura, flujos y modelo de datos de cada uno en el portafolio.",
    skills: "Habilidades",
    languages: "Idiomas",
    education: "Educación",
    certifications: "Certificaciones",
    moreCerts: (n: number) => `+${n} más (SENA, Fundación Carlos Slim) — lista completa en las versiones ATS y Word.`,
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

export const jobCompany = (job: Job, locale: ResumeLocale) => job.companyL?.[locale] ?? job.company;

export const jobPeriod = (job: Job, locale: ResumeLocale) => job.period?.[locale] ?? formatRange(job.start, job.end, locale);

// File names of the generated documents in public/cv/.
export const RESUME_FILES = {
  pdf: { en: "David-Gomez-Resume-EN.pdf", es: "David-Gomez-Hoja-de-Vida-ES.pdf" },
  ats: { en: "David-Gomez-Resume-ATS-EN.pdf", es: "David-Gomez-Hoja-de-Vida-ATS-ES.pdf" },
  docx: { en: "David-Gomez-Resume-EN.docx", es: "David-Gomez-Hoja-de-Vida-ES.docx" },
} as const;
