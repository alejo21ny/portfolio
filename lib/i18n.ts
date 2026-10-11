import type { Project, Workflow } from "./types";
import { PROJECTS } from "./projects";
import { PROJECTS_ES } from "./projects.es";

export type Locale = "en" | "es";
export const LOCALES: Locale[] = ["en", "es"];

// English lives at the root, Spanish under /es — so existing links keep working.
export const localePath = (locale: Locale, path = "/") => (locale === "en" ? path : `/es${path}`);

export const getProjects = (locale: Locale): Project[] => (locale === "es" ? PROJECTS_ES : PROJECTS);
export const getProject = (locale: Locale, slug: string) => getProjects(locale).find((p) => p.slug === slug);

type Card = { title: string; body: string };

type Dict = {
  htmlLang: string;
  meta: { title: string; description: string };
  role: string;
  statement: string;
  badge: string;
  nav: { href: string; label: string }[];
  switchTo: { label: string; short: string };
  theme: { light: string; dark: string };
  menu: string;
  hero: { primary: string; secondary: string };
  stats: { systems: string; tests: string; clients: string; years: string };
  categories: Record<Project["category"], string>;
  systemMap: { center: [string, string]; nodes: [string, string][]; aria: string };
  work: { eyebrow: string; title: string; intro: string; earlier: string; earlierIntro: string };
  card: { cta: string; privateRepo: string; source: string; live: string };
  clients: { eyebrow: string; title: string; intro: string; visit: string };
  payments: { eyebrow: string; title: string; intro: string; shipped: string; inProgress: string; usedIn: string; flow: Workflow };
  process: { eyebrow: string; title: string; intro: string; workflow: Workflow; principles: Card[] };
  expertise: { eyebrow: string; title: string; groups: { title: string; icon: string; items: string[] }[] };
  about: { eyebrow: string; title: string; paragraphs: string[]; gwork: [string, string]; artist: [string, string]; workOnTitle: string; workOn: string[] };
  contact: { eyebrow: string; title: string; intro: string; email: string; website: string; whatsapp: string };
  footer: { rights: string };
  caseStudy: {
    back: string;
    toc: Record<"overview" | "screens" | "architecture" | "workflows" | "dataModel" | "ai" | "stack", string>;
    overviewEyebrow: string;
    overviewTitle: string;
    problem: string;
    built: string;
    screensEyebrow: string;
    screensTitle: string;
    archEyebrow: string;
    archTitle: string;
    keyConnections: string;
    flowsEyebrow: string;
    flowsTitle: string;
    dataEyebrow: string;
    dataTitle: string;
    relationships: string;
    aiEyebrow: string;
    aiTitle: string;
    engineering: string;
    stackEyebrow: string;
    stackTitle: string;
    next: string;
    visit: string;
    source: string;
    privateRepo: string;
    legend: Record<"user" | "auto" | "ai" | "data" | "external" | "guard", string>;
  };
};

const EN: Dict = {
  htmlLang: "en",
  meta: {
    title: "David Gomez | Senior Full-Stack Engineer & AI Automation Specialist",
    description:
      "Senior full-stack engineer building production platforms, booking and payment engines, mobile apps and AI-assisted automation — with architecture, workflows and data models for every project.",
  },
  role: "Senior Full-Stack Engineer & AI Automation Specialist",
  statement:
    "I design and build production platforms end to end — booking and payment engines, mobile marketplaces, data pipelines and AI-assisted automation — from architecture to deploy.",
  badge: "Full-stack · AI automation · Cloud — Medellín, CO",
  nav: [
    { href: "#work", label: "Work" },
    { href: "#payments", label: "Payments" },
    { href: "#clients", label: "Clients" },
    { href: "#process", label: "Process" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
    { href: "resume/", label: "Resume" },
  ],
  switchTo: { label: "Ver en español", short: "ES" },
  theme: { light: "Switch to light theme", dark: "Switch to dark theme" },
  menu: "Open navigation menu",
  hero: { primary: "See the work", secondary: "Get in touch" },
  stats: {
    systems: "systems with full case studies",
    tests: "automated tests across them",
    clients: "client websites in production",
    years: "years in software & cloud",
  },
  categories: { Product: "Product", Platform: "Platform", Integration: "Integration", Automation: "Automation", Web: "Web" },
  systemMap: {
    center: ["Engineering", "core"],
    nodes: [
      ["Products", "marketplaces · booking"],
      ["AI & Agents", "assistants · LLM tools"],
      ["Automation", "scrapers · schedulers"],
      ["Integrations", "CRM · payments · APIs"],
      ["Data", "Postgres · PostGIS"],
      ["Cloud & Edge", "Cloudflare · Docker · CI"],
    ],
    aria: "Diagram: products, AI agents, automation, integrations, data and cloud connected to one engineering core",
  },
  work: {
    eyebrow: "Selected work",
    title: "Systems I've designed and built",
    intro:
      "Every case study shows the architecture, the real workflows and the data model — drawn from the code, not from a pitch deck.",
    earlier: "More projects",
    earlierIntro: "Earlier and smaller builds — each links to its source.",
  },
  card: { cta: "Case study, diagrams & workflows", privateRepo: "private repo", source: "Source", live: "Live" },
  clients: {
    eyebrow: "Client websites",
    title: "Production sites for real businesses",
    intro: "WordPress and custom web work for healthcare, hospitality, recruitment, finance, education and non-profits — all live today.",
    visit: "Visit site",
  },
  payments: {
    eyebrow: "Payments",
    title: "Payment integrations, done the safe way",
    intro: "Wompi, PayU, ePayco — and Bold next for Sedona Scapes. Different providers, one pattern: money only moves on a verified, idempotent webhook.",
    shipped: "Integrated",
    inProgress: "In progress",
    usedIn: "Used in",
    flow: {
      title: "One pattern for every gateway",
      summary: "Provider-neutral adapters keep checkout, confirmation and accounting identical whichever gateway a client picks.",
      steps: [
        { label: "Quote & hold", detail: "price frozen, inventory held", kind: "guard" },
        { label: "Hosted checkout", detail: "Wompi · PayU · Bold · ePayco", kind: "external" },
        { label: "Signed webhook", detail: "signature / checksum verified", kind: "guard" },
        { label: "Idempotent apply", detail: "deduped per provider event", kind: "auto" },
        { label: "Ledger & reconciliation", detail: "append-only, mismatches flagged", kind: "data" },
        { label: "Confirmation", detail: "guest / player notified", kind: "user" },
      ],
    },
  },
  process: {
    eyebrow: "How I build",
    title: "AI-augmented, production-minded",
    intro:
      "I use AI coding agents every day — inside a process where architecture is written down first, every change passes automated gates, and a human owns every merge and every deploy.",
    workflow: {
      title: "AI-augmented delivery, human-owned decisions",
      summary: "AI agents multiply output; written decisions, automated gates and human review keep it production-grade.",
      steps: [
        { label: "Discovery & audit", detail: "current-state audit, written scope", kind: "user" },
        { label: "Architecture & ADRs", detail: "decisions recorded before code", kind: "user" },
        { label: "Agent-assisted build", detail: "coding agents work against repo rules", kind: "ai" },
        { label: "Automated gates", detail: "types, lint, unit, DB, E2E, a11y, CSP", kind: "guard" },
        { label: "Human review", detail: "every change read and owned", kind: "user" },
        { label: "Staged release", detail: "staging first, gated production", kind: "auto" },
      ],
    },
    principles: [
      {
        title: "The database is the last line of defence",
        body: "Double-bookings and oversold matches are made impossible with EXCLUDE constraints, unique indexes and advisory locks — not just checked in application code.",
      },
      {
        title: "Only a verified webhook moves money",
        body: "Payment confirmations come from signed, deduplicated provider events cross-checked against a snapshot. A redirect page never counts as success.",
      },
      {
        title: "Idempotent by default",
        body: "Imports, syncs, scrapers and notifications can all re-run safely — keyed on external ids and idempotency keys, resumable from a cursor.",
      },
      {
        title: "AI where it is grounded",
        body: "Assistants answer from real rows behind a read-only tool surface and a swappable provider. No invented data, no unscoped write access.",
      },
      {
        title: "Fail closed",
        body: "Apps refuse to boot with dev harnesses, sandbox providers or weak database TLS in production. Deploys need an explicit target.",
      },
      {
        title: "Decisions on paper",
        body: "Architecture decision records, phase plans and runbooks live next to the code, so the next engineer — or agent — knows why, not just what.",
      },
    ],
  },
  expertise: {
    eyebrow: "Capabilities",
    title: "Expertise",
    groups: [
      { title: "Full-Stack Engineering", icon: "</>", items: ["React", "Next.js", "TypeScript", "PHP / Laravel", "Python / FastAPI", "Node.js", "React Native / Expo"] },
      { title: "AI & Automation", icon: "◇", items: ["LLM APIs & provider abstractions", "Grounded assistants", "Tool / function patterns", "AI-assisted delivery (agents)", "Scrapers & enrichment", "Schedulers & background jobs"] },
      { title: "Cloud & Platform", icon: "☁", items: ["Cloudflare Workers / Pages / R2 / KV", "AWS", "Azure", "Docker", "Terraform", "GitHub Actions"] },
      { title: "Data & Backend", icon: "▤", items: ["PostgreSQL / PostGIS", "Drizzle / SQLAlchemy / Eloquent", "Neon", "Azure Data Factory", "Databricks", "PySpark"] },
      { title: "Payments & Integrations", icon: "⇄", items: ["Wompi", "PayU", "ePayco", "Bold", "HubSpot", "Google OAuth", "Webhooks & idempotency", "Push (Expo / FCM)"] },
      { title: "Security & Reliability", icon: "⛨", items: ["CSP / HSTS", "OTP + TOTP MFA", "RBAC", "Rate limiting", "Audit trails", "Fail-closed config"] },
      { title: "WordPress & CMS", icon: "W", items: ["Custom themes & plugins", "WordPress backend", "Custom tables & REST", "Booking & forms", "Performance tuning"] },
      { title: "SEO & Growth", icon: "↗", items: ["Technical SEO", "JSON-LD / Open Graph", "Consent-aware analytics", "Lead generation", "Social media ads"] },
    ],
  },
  about: {
    eyebrow: "About",
    title: "About David",
    paragraphs: [
      "Based in Medellín, Colombia. 15+ years across software, cloud, internal systems, data and automation — and seven years founding and running my own hospitality business. Bilingual — English / Spanish.",
      "A senior hands-on engineer who takes products from a blank repo to production: architecture, backend, frontend, mobile, payments, infrastructure and the automation around them.",
    ],
    gwork: ["I also run ", ", a practice for software, AI automation, cloud and digital security."],
    artist: ["Outside of code I'm also a music artist — ", " — producing music, video and social campaigns."],
    workOnTitle: "What I work on",
    workOn: [
      "Production web & mobile products",
      "AI assistants & automation",
      "Booking, marketplace & payment engines",
      "API & system integrations",
      "Cloud platforms on the edge",
      "Data engineering",
      "Identity, access & security",
    ],
  },
  contact: {
    eyebrow: "Get in touch",
    title: "Let's build something real",
    intro:
      "Open to senior and lead roles, and to projects in full-stack engineering, AI-assisted automation, and cloud/platform work. Private repositories can be walked through on a call.",
    email: "Email me",
    website: "GWork Systems",
    whatsapp: "WhatsApp",
  },
  footer: { rights: "All rights reserved." },
  caseStudy: {
    back: "← All work",
    toc: { overview: "Overview", screens: "Screens", architecture: "Architecture", workflows: "Workflows", dataModel: "Data model", ai: "AI", stack: "Stack" },
    overviewEyebrow: "Overview",
    overviewTitle: "Problem → solution",
    problem: "The problem",
    built: "What I built",
    screensEyebrow: "Screens",
    screensTitle: "The product, running",
    archEyebrow: "System design",
    archTitle: "Architecture",
    keyConnections: "Key connections",
    flowsEyebrow: "How it works",
    flowsTitle: "Workflows & pipelines",
    dataEyebrow: "Database",
    dataTitle: "Data model",
    relationships: "Relationships",
    aiEyebrow: "AI boundary",
    aiTitle: "Where AI earns its keep",
    engineering: "Engineering",
    stackEyebrow: "Tooling",
    stackTitle: "Stack",
    next: "Next case study",
    visit: "Visit live site ↗",
    source: "View source ↗",
    privateRepo: "Private repository — walkthrough on request",
    legend: { user: "Person", auto: "Automation", ai: "AI / LLM", data: "Data store", external: "External API", guard: "Safety gate" },
  },
};

const ES: Dict = {
  htmlLang: "es",
  meta: {
    title: "David Gómez | Ingeniero Full-Stack Senior y especialista en automatización con IA",
    description:
      "Ingeniero full-stack senior que construye plataformas en producción, motores de reservas y pagos, apps móviles y automatización con IA — con arquitectura, flujos y modelo de datos de cada proyecto.",
  },
  role: "Ingeniero Full-Stack Senior y especialista en automatización con IA",
  statement:
    "Diseño y construyo plataformas de punta a punta — motores de reservas y pagos, marketplaces móviles, pipelines de datos y automatización con IA — desde la arquitectura hasta el despliegue.",
  badge: "Full-stack · Automatización con IA · Cloud — Medellín, CO",
  nav: [
    { href: "#work", label: "Proyectos" },
    { href: "#payments", label: "Pagos" },
    { href: "#clients", label: "Clientes" },
    { href: "#process", label: "Proceso" },
    { href: "#about", label: "Sobre mí" },
    { href: "#contact", label: "Contacto" },
    { href: "resume/", label: "Hoja de vida" },
  ],
  switchTo: { label: "View in English", short: "EN" },
  theme: { light: "Cambiar a tema claro", dark: "Cambiar a tema oscuro" },
  menu: "Abrir menú de navegación",
  hero: { primary: "Ver proyectos", secondary: "Contactarme" },
  stats: {
    systems: "sistemas con caso de estudio completo",
    tests: "pruebas automatizadas entre ellos",
    clients: "sitios de clientes en producción",
    years: "años en software y cloud",
  },
  categories: { Product: "Producto", Platform: "Plataforma", Integration: "Integración", Automation: "Automatización", Web: "Web" },
  systemMap: {
    center: ["Ingeniería", "núcleo"],
    nodes: [
      ["Productos", "marketplaces · reservas"],
      ["IA y Agentes", "asistentes · tools LLM"],
      ["Automatización", "scrapers · schedulers"],
      ["Integraciones", "CRM · pagos · APIs"],
      ["Datos", "Postgres · PostGIS"],
      ["Cloud y Edge", "Cloudflare · Docker · CI"],
    ],
    aria: "Diagrama: productos, agentes de IA, automatización, integraciones, datos y cloud conectados a un núcleo de ingeniería",
  },
  work: {
    eyebrow: "Proyectos destacados",
    title: "Sistemas que he diseñado y construido",
    intro:
      "Cada caso de estudio muestra la arquitectura, los flujos reales y el modelo de datos — sacados del código, no de una presentación.",
    earlier: "Más proyectos",
    earlierIntro: "Proyectos anteriores y más pequeños — cada uno enlaza a su código.",
  },
  card: { cta: "Caso de estudio, diagramas y flujos", privateRepo: "repo privado", source: "Código", live: "En vivo" },
  clients: {
    eyebrow: "Sitios de clientes",
    title: "Sitios en producción para negocios reales",
    intro: "WordPress y desarrollo web a la medida para salud, hotelería, reclutamiento, finanzas, educación y organizaciones sin ánimo de lucro — todos en línea hoy.",
    visit: "Ver sitio",
  },
  payments: {
    eyebrow: "Pagos",
    title: "Integraciones de pago, hechas de forma segura",
    intro: "Wompi, PayU, ePayco — y Bold próximamente para Sedona Scapes. Distintos proveedores, un solo patrón: el dinero solo se mueve con un webhook verificado e idempotente.",
    shipped: "Integrado",
    inProgress: "En curso",
    usedIn: "Usado en",
    flow: {
      title: "Un patrón para cada pasarela",
      summary: "Adaptadores neutrales de proveedor mantienen igual el checkout, la confirmación y la contabilidad, sin importar la pasarela que elija el cliente.",
      steps: [
        { label: "Cotizar y retener", detail: "precio congelado, inventario retenido", kind: "guard" },
        { label: "Checkout alojado", detail: "Wompi · PayU · Bold · ePayco", kind: "external" },
        { label: "Webhook firmado", detail: "firma / checksum verificado", kind: "guard" },
        { label: "Aplicación idempotente", detail: "deduplicado por evento", kind: "auto" },
        { label: "Libro contable y conciliación", detail: "append-only, diferencias marcadas", kind: "data" },
        { label: "Confirmación", detail: "huésped / jugador notificado", kind: "user" },
      ],
    },
  },
  process: {
    eyebrow: "Cómo construyo",
    title: "Potenciado con IA, pensado para producción",
    intro:
      "Uso agentes de programación con IA todos los días — dentro de un proceso donde la arquitectura se escribe primero, cada cambio pasa controles automáticos y una persona es dueña de cada merge y cada despliegue.",
    workflow: {
      title: "Entrega potenciada con IA, decisiones humanas",
      summary: "Los agentes multiplican la capacidad; las decisiones escritas, los controles automáticos y la revisión humana mantienen el nivel de producción.",
      steps: [
        { label: "Descubrimiento y auditoría", detail: "auditoría del estado actual, alcance escrito", kind: "user" },
        { label: "Arquitectura y ADRs", detail: "decisiones registradas antes del código", kind: "user" },
        { label: "Desarrollo con agentes", detail: "agentes que siguen las reglas del repo", kind: "ai" },
        { label: "Controles automáticos", detail: "tipos, lint, unitarias, BD, E2E, a11y, CSP", kind: "guard" },
        { label: "Revisión humana", detail: "cada cambio leído y asumido", kind: "user" },
        { label: "Lanzamiento por etapas", detail: "staging primero, producción con control", kind: "auto" },
      ],
    },
    principles: [
      {
        title: "La base de datos es la última defensa",
        body: "Las reservas dobles y los partidos sobrevendidos son imposibles gracias a restricciones EXCLUDE, índices únicos y advisory locks — no solo validaciones en el código.",
      },
      {
        title: "Solo un webhook verificado mueve dinero",
        body: "Los pagos se confirman con eventos firmados y deduplicados del proveedor, comparados contra un snapshot. Una página de redirección nunca cuenta como éxito.",
      },
      {
        title: "Idempotente por defecto",
        body: "Importaciones, sincronizaciones, scrapers y notificaciones se pueden re-ejecutar sin riesgo — con ids externos y llaves de idempotencia, reanudables desde un cursor.",
      },
      {
        title: "IA con fundamento",
        body: "Los asistentes responden con datos reales detrás de herramientas de solo lectura y un proveedor intercambiable. Sin datos inventados ni escritura sin control.",
      },
      {
        title: "Fallar de forma segura",
        body: "Las apps se niegan a arrancar en producción con herramientas de desarrollo, proveedores sandbox o TLS débil hacia la base de datos. Cada despliegue exige un destino explícito.",
      },
      {
        title: "Decisiones por escrito",
        body: "Los registros de decisiones de arquitectura, planes por fase y runbooks viven junto al código, para que el siguiente ingeniero — o agente — sepa el porqué, no solo el qué.",
      },
    ],
  },
  expertise: {
    eyebrow: "Capacidades",
    title: "Experiencia",
    groups: [
      { title: "Ingeniería Full-Stack", icon: "</>", items: ["React", "Next.js", "TypeScript", "PHP / Laravel", "Python / FastAPI", "Node.js", "React Native / Expo"] },
      { title: "IA y Automatización", icon: "◇", items: ["APIs de LLM y abstracción de proveedores", "Asistentes con fundamento", "Patrones de tools / funciones", "Entrega asistida por agentes", "Scrapers y enriquecimiento", "Schedulers y procesos en segundo plano"] },
      { title: "Cloud y Plataforma", icon: "☁", items: ["Cloudflare Workers / Pages / R2 / KV", "AWS", "Azure", "Docker", "Terraform", "GitHub Actions"] },
      { title: "Datos y Backend", icon: "▤", items: ["PostgreSQL / PostGIS", "Drizzle / SQLAlchemy / Eloquent", "Neon", "Azure Data Factory", "Databricks", "PySpark"] },
      { title: "Pagos e Integraciones", icon: "⇄", items: ["Wompi", "PayU", "ePayco", "Bold", "HubSpot", "Google OAuth", "Webhooks e idempotencia", "Push (Expo / FCM)"] },
      { title: "Seguridad y Confiabilidad", icon: "⛨", items: ["CSP / HSTS", "OTP + TOTP MFA", "RBAC", "Rate limiting", "Auditoría", "Configuración fail-closed"] },
      { title: "WordPress y CMS", icon: "W", items: ["Temas y plugins a la medida", "Backend en WordPress", "Tablas propias y REST", "Reservas y formularios", "Optimización de rendimiento"] },
      { title: "SEO y Crecimiento", icon: "↗", items: ["SEO técnico", "JSON-LD / Open Graph", "Analítica con consentimiento", "Generación de leads", "Publicidad en redes"] },
    ],
  },
  about: {
    eyebrow: "Sobre mí",
    title: "Sobre David",
    paragraphs: [
      "Vivo en Medellín, Colombia. Más de 15 años en software, cloud, sistemas internos, datos y automatización — y siete años fundando y dirigiendo mi propio negocio hotelero. Bilingüe — inglés / español.",
      "Ingeniero senior que pone las manos en el código y lleva productos desde un repo vacío hasta producción: arquitectura, backend, frontend, móvil, pagos, infraestructura y la automatización alrededor.",
    ],
    gwork: ["También dirijo ", ", una firma de software, automatización con IA, cloud y seguridad digital."],
    artist: ["Fuera del código también soy artista musical — ", " — con producción musical, video y campañas en redes."],
    workOnTitle: "En qué trabajo",
    workOn: [
      "Productos web y móviles en producción",
      "Asistentes de IA y automatización",
      "Motores de reservas, marketplaces y pagos",
      "Integraciones de APIs y sistemas",
      "Plataformas cloud en el edge",
      "Ingeniería de datos",
      "Identidad, acceso y seguridad",
    ],
  },
  contact: {
    eyebrow: "Contacto",
    title: "Construyamos algo real",
    intro:
      "Abierto a roles senior y de liderazgo, y a proyectos de ingeniería full-stack, automatización con IA y cloud. Los repositorios privados se pueden revisar en una llamada.",
    email: "Escríbeme",
    website: "GWork Systems",
    whatsapp: "WhatsApp",
  },
  footer: { rights: "Todos los derechos reservados." },
  caseStudy: {
    back: "← Todos los proyectos",
    toc: { overview: "Resumen", screens: "Pantallas", architecture: "Arquitectura", workflows: "Flujos", dataModel: "Modelo de datos", ai: "IA", stack: "Stack" },
    overviewEyebrow: "Resumen",
    overviewTitle: "Problema → solución",
    problem: "El problema",
    built: "Lo que construí",
    screensEyebrow: "Pantallas",
    screensTitle: "El producto, funcionando",
    archEyebrow: "Diseño del sistema",
    archTitle: "Arquitectura",
    keyConnections: "Conexiones clave",
    flowsEyebrow: "Cómo funciona",
    flowsTitle: "Flujos y pipelines",
    dataEyebrow: "Base de datos",
    dataTitle: "Modelo de datos",
    relationships: "Relaciones",
    aiEyebrow: "Límite de la IA",
    aiTitle: "Dónde la IA aporta de verdad",
    engineering: "Ingeniería",
    stackEyebrow: "Herramientas",
    stackTitle: "Stack",
    next: "Siguiente caso de estudio",
    visit: "Ver sitio en vivo ↗",
    source: "Ver código ↗",
    privateRepo: "Repositorio privado — recorrido disponible a solicitud",
    legend: { user: "Persona", auto: "Automatización", ai: "IA / LLM", data: "Datos", external: "API externa", guard: "Control de seguridad" },
  },
};

export const DICT: Record<Locale, Dict> = { en: EN, es: ES };
export type { Dict };
