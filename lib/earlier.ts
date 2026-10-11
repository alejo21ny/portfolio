// Smaller public builds, shown as a compact list under the main case studies.
// Take-home assessments are described without the hiring company's name.
export type EarlierProject = {
  name: { en: string; es: string };
  summary: { en: string; es: string };
  tags: string[];
  github: string;
  year: string;
};

export const EARLIER: EarlierProject[] = [
  {
    name: { en: "SaaS Portfolio Cleanup (AI-assisted)", es: "Depuración de portafolio SaaS (con IA)" },
    summary: {
      en: "A deterministic Python pipeline that turns messy SaaS, employee and access CSVs into a clean source of truth, a ranked savings list, an access-risk register (departed staff still holding access, apps without SSO) and a management memo.",
      es: "Pipeline determinista en Python que convierte CSV desordenados de SaaS, empleados y accesos en una fuente única de verdad, un ranking de ahorros, un registro de riesgos de acceso (ex empleados con acceso, apps sin SSO) y un memo para la dirección.",
    },
    tags: ["Python", "Data cleaning", "IT operations", "AI-assisted analysis"],
    github: "https://github.com/alejo21ny/tech-test-it-support-manager-ai/tree/submission/david-gomez",
    year: "2026",
  },
  {
    name: { en: "Appointment Status Component", es: "Componente de estado de citas" },
    summary: {
      en: "A typed Vue 3 status badge with unit tests and a Blade-to-Vue island pattern, plus a written code review that flags XSS via v-html, missing keys and accessibility gaps.",
      es: "Badge de estado tipado en Vue 3 con pruebas unitarias y patrón de islas Blade→Vue, más una revisión de código que detecta XSS por v-html, keys faltantes y brechas de accesibilidad.",
    },
    tags: ["Vue 3", "TypeScript", "Vitest", "Laravel Blade"],
    github: "https://github.com/alejo21ny/pryme-practice-assessment",
    year: "2026",
  },
  {
    name: { en: "Education Resources Manager", es: "Gestor de recursos educativos" },
    summary: {
      en: "A WordPress admin plugin with its own table and full CRUD — every query prepared, every mutation nonce- and capability-checked, input sanitised and output escaped.",
      es: "Plugin de administración para WordPress con tabla propia y CRUD completo — consultas preparadas, nonce y permisos en cada cambio, entradas sanitizadas y salidas escapadas.",
    },
    tags: ["PHP", "WordPress", "Repository pattern", "Security"],
    github: "https://github.com/alejo21ny/education-resources-manager",
    year: "2026",
  },
  {
    name: { en: "Emergency Services Landing Page", es: "Landing page de servicios de emergencia" },
    summary: {
      en: "A mobile-first conversion page with full SEO (canonical, Open Graph, JSON-LD LegalService), lazy loading, validated lead form and analytics events.",
      es: "Página de conversión mobile-first con SEO completo (canonical, Open Graph, JSON-LD LegalService), carga diferida, formulario validado y eventos de analítica.",
    },
    tags: ["HTML", "Tailwind CSS", "SEO", "JSON-LD"],
    github: "https://github.com/alejo21ny/qlo-webmaster-test-landingpage",
    year: "2025",
  },
];
