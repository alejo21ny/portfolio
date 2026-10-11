// Client websites delivered before the platform work, carried over from the
// previous portfolio. Each one is a live production site.
type L = { en: string; es: string };

export type ClientSite = {
  name: string;
  url: string;
  industry: L;
  summary: L;
  tags: string[];
};

export const CLIENT_SITES: ClientSite[] = [
  {
    name: "Virtual Latinos",
    url: "https://join.virtuallatinos.com/",
    industry: { en: "Recruitment", es: "Reclutamiento" },
    summary: {
      en: "Recruitment platform with full backend work: API endpoints, HubSpot integration, PostgreSQL/MySQL and WordPress customization.",
      es: "Plataforma de reclutamiento con backend completo: endpoints de API, integración con HubSpot, PostgreSQL/MySQL y WordPress a la medida.",
    },
    tags: ["Backend APIs", "HubSpot", "PostgreSQL / MySQL", "WordPress"],
  },
  {
    name: "ICBD Holdings",
    url: "https://www.icbdholdings.com/",
    industry: { en: "Investment", es: "Inversiones" },
    summary: {
      en: "Corporate platform for an investment company — WordPress backend, financial reporting section and performance tuning.",
      es: "Plataforma corporativa para una firma de inversión — backend en WordPress, sección de reportes financieros y optimización de rendimiento.",
    },
    tags: ["WordPress", "Backend", "Performance"],
  },
  {
    name: "ABA Centers",
    url: "https://www.abacenters.com/",
    industry: { en: "Healthcare", es: "Salud" },
    summary: {
      en: "Healthcare site for an ABA therapy provider with appointment flows and SEO.",
      es: "Sitio de salud para un centro de terapia ABA con flujos de citas y SEO.",
    },
    tags: ["WordPress", "Healthcare", "SEO"],
  },
  {
    name: "Gatehouse Treatment",
    url: "https://www.gatehousetreatment.com/",
    industry: { en: "Healthcare", es: "Salud" },
    summary: {
      en: "Treatment-center website with admissions lead generation, educational resources and advanced SEO.",
      es: "Sitio de centro de tratamiento con captación de admisiones, recursos educativos y SEO avanzado.",
    },
    tags: ["WordPress", "Lead generation", "SEO"],
  },
  {
    name: "MatCare Clinics",
    url: "https://www.matcareclinics.com/",
    industry: { en: "Healthcare", es: "Salud" },
    summary: {
      en: "Clinic website with patient-facing services and appointment scheduling.",
      es: "Sitio de clínicas con servicios para pacientes y agendamiento de citas.",
    },
    tags: ["WordPress", "Healthcare", "Scheduling"],
  },
  {
    name: "Exact Billing",
    url: "https://www.exactbilling.com/",
    industry: { en: "Billing services", es: "Facturación" },
    summary: {
      en: "Website for a billing-management company, built around service pages and lead capture.",
      es: "Sitio para una empresa de gestión de facturación, centrado en servicios y captación de clientes.",
    },
    tags: ["WordPress", "Responsive", "Automation"],
  },
  {
    name: "AdminOps",
    url: "https://adminops.com/",
    industry: { en: "Operations services", es: "Servicios operativos" },
    summary: {
      en: "Website for an administrative-operations company, with performance and backend work.",
      es: "Sitio para una empresa de operaciones administrativas, con trabajo de rendimiento y backend.",
    },
    tags: ["WordPress", "Performance", "Backend"],
  },
  {
    name: "SouthDesk",
    url: "https://southdesk.net/",
    industry: { en: "Remote teams", es: "Equipos remotos" },
    summary: {
      en: "Website for a remote-staffing company, responsive and conversion-focused.",
      es: "Sitio para una empresa de personal remoto, responsive y enfocado en conversión.",
    },
    tags: ["WordPress", "Responsive"],
  },
  {
    name: "EE Hoteles",
    url: "https://eehoteles.com/",
    industry: { en: "Hospitality", es: "Hotelería" },
    summary: {
      en: "Hotel group website with booking integration and conversion optimization.",
      es: "Sitio de grupo hotelero con integración de reservas y optimización de conversión.",
    },
    tags: ["WordPress", "Booking", "SEO"],
  },
  {
    name: "Novelty Suites Hotel",
    url: "https://eehoteles.com/novelty-suites-hotel/",
    industry: { en: "Hospitality", es: "Hotelería" },
    summary: {
      en: "Hotel property site with rooms and reservations.",
      es: "Sitio de hotel con habitaciones y reservas.",
    },
    tags: ["WordPress", "Booking"],
  },
  {
    name: "Affinity Aparta Hotel",
    url: "https://eehoteles.com/affinity-aparta-hotel/",
    industry: { en: "Hospitality", es: "Hotelería" },
    summary: {
      en: "Extended-stay apartment-hotel site with booking.",
      es: "Sitio de aparta-hotel para estadías largas con reservas.",
    },
    tags: ["WordPress", "Booking"],
  },
  {
    name: "MHSC",
    url: "https://mhscol.com/",
    industry: { en: "Education", es: "Educación" },
    summary: {
      en: "Education website with programs and course information.",
      es: "Sitio educativo con programas e información de cursos.",
    },
    tags: ["WordPress", "Education"],
  },
  {
    name: "The Charlee",
    url: "https://www.thecharlee.com/",
    industry: { en: "Corporate", es: "Corporativo" },
    summary: {
      en: "Corporate website with business information and contact management.",
      es: "Sitio corporativo con información del negocio y gestión de contactos.",
    },
    tags: ["WordPress", "Corporate"],
  },
  {
    name: "Steward Colombia",
    url: "https://stewardcolombia.org/",
    industry: { en: "Non-profit", es: "Sin ánimo de lucro" },
    summary: {
      en: "Non-profit website with donations and community outreach.",
      es: "Sitio de organización sin ánimo de lucro con donaciones y trabajo comunitario.",
    },
    tags: ["WordPress", "Donations"],
  },
];

// The creative side, shown in About.
export const ARTIST = {
  name: "Dalej El Medallón",
  links: [
    { label: "YouTube", url: "https://www.youtube.com/c/DalejElMedall%C3%B3n" },
    { label: "Instagram", url: "https://www.instagram.com/dalejelmedallon" },
    { label: "Facebook", url: "https://www.facebook.com/dalejelmedallon" },
  ],
};
