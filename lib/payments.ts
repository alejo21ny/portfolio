// Payment gateways integrated across the projects. Every integration follows
// the same pattern: hosted checkout, signed webhook, idempotent apply, ledger.
type L = { en: string; es: string };

export type PaymentIntegration = {
  gateway: string;
  status: "shipped" | "in-progress";
  projects: { name: string; href?: string }[];
  summary: L;
  points: { en: string[]; es: string[] };
  link?: { label: L; url: string };
};

export const PAYMENTS: PaymentIntegration[] = [
  {
    gateway: "Wompi",
    status: "shipped",
    projects: [
      { name: "Cancha", href: "/work/cancha/" },
      { name: "All Bookings 2.0", href: "/work/all-bookings/" },
    ],
    summary: {
      en: "Split payments for pickup matches and marketplace bookings with commissions.",
      es: "Pagos divididos para partidos y reservas de marketplace con comisiones.",
    },
    points: {
      en: ["Signed Web Checkout URL — no card data in the app", "Checksum-verified webhook, idempotent per event", "Append-only ledger: gross, fees, commission, payable"],
      es: ["URL de Web Checkout firmada — sin datos de tarjeta en la app", "Webhook verificado por checksum, idempotente por evento", "Libro contable append-only: bruto, tarifas, comisión, por pagar"],
    },
  },
  {
    gateway: "PayU",
    status: "shipped",
    projects: [{ name: "Sedona Scapes", href: "/work/sedona-scapes/" }],
    summary: {
      en: "WebCheckout for direct hotel reservations behind a provider-neutral adapter.",
      es: "WebCheckout para reservas directas detrás de un adaptador neutral de proveedor.",
    },
    points: {
      en: ["Signed auto-submit checkout form", "Webhook is the only authority that confirms a reservation", "Amount + currency cross-checked; mismatches open a reconciliation issue"],
      es: ["Formulario de checkout firmado", "El webhook es la única autoridad que confirma una reserva", "Monto y moneda verificados; las diferencias abren una conciliación"],
    },
  },
  {
    gateway: "Bold",
    status: "in-progress",
    projects: [{ name: "Sedona Scapes", href: "/work/sedona-scapes/" }],
    summary: {
      en: "Next provider for Sedona Scapes, plugged into the same PaymentProvider interface.",
      es: "Siguiente proveedor para Sedona Scapes, conectado a la misma interfaz PaymentProvider.",
    },
    points: {
      en: ["Same obligation / attempt model", "Same verified-webhook confirmation path", "Swappable per property without touching booking logic"],
      es: ["Mismo modelo de obligación / intento", "Misma confirmación por webhook verificado", "Intercambiable por propiedad sin tocar la lógica de reservas"],
    },
  },
  {
    gateway: "ePayco",
    status: "shipped",
    projects: [{ name: "Glide web app" }],
    summary: {
      en: "Custom web app with ePayco checkout, built with JavaScript and secure parameter handling.",
      es: "Web app a la medida con checkout de ePayco, en JavaScript y con manejo seguro de parámetros.",
    },
    points: {
      en: ["ePayco API integration", "Secure parameter handling", "Embedded in a Glide app"],
      es: ["Integración con la API de ePayco", "Manejo seguro de parámetros", "Integrada en una app de Glide"],
    },
    link: { label: { en: "Open app", es: "Abrir app" }, url: "https://go.glideapps.com/play/QAW5wqjGBXvjTSyLUtuL" },
  },
];
