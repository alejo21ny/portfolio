import type { Screenshot } from "./types";

// Real screenshots captured from each app running locally (sample data only).
// Kept apart from the project copy so both languages share one list; alt text
// is English and Spanish.
export const SCREENS: Record<string, Screenshot[]> = {
  cancha: [
    { src: "/screens/cancha-match-admin.jpg", device: "mobile", alt: { en: "Match admin: spots, missing goalkeeper, collected payments", es: "Administrar partido: cupos, arquero faltante y recaudo" } },
    { src: "/screens/cancha-lineup.jpg", device: "mobile", alt: { en: "Interactive lineup on the pitch with open positions", es: "Alineación interactiva en la cancha con posiciones libres" } },
    { src: "/screens/cancha-formation.jpg", device: "mobile", alt: { en: "Pick a formation per team", es: "Elegir formación por equipo" } },
    { src: "/screens/cancha-profile.jpg", device: "mobile", alt: { en: "Player card with verified stats and Cancha Score", es: "Tarjeta de jugador con datos verificados y Cancha Score" } },
    { src: "/screens/cancha-profile-edit.jpg", device: "mobile", alt: { en: "Profile: payments, teams, notifications and self-reported info", es: "Perfil: pagos, equipos, notificaciones e información autoreportada" } },
  ],
  "lead-engine": [
    { src: "/screens/leadengine-dashboard.jpg", device: "desktop", alt: { en: "Businesses dashboard: counters, filters and CRM status per lead (sample data)", es: "Panel de empresas: contadores, filtros y estado CRM por lead (datos de ejemplo)" } },
    { src: "/screens/leadengine-detail.jpg", device: "desktop", alt: { en: "Lead detail: contact channels, allowed pipeline moves and notes", es: "Detalle del lead: canales de contacto, movimientos permitidos del pipeline y notas" } },
    { src: "/screens/leadengine-runs.jpg", device: "desktop", alt: { en: "Connectors and run history, with resume on a failed run", es: "Conectores e historial de ejecuciones, con reanudar en una fallida" } },
  ],
  "sedona-scapes": [
    { src: "/screens/sedona-home.jpg", device: "desktop", alt: { en: "Guest site: hero with date search", es: "Sitio de huéspedes: portada con búsqueda por fechas" } },
    { src: "/screens/sedona-property-booking.jpg", device: "desktop", alt: { en: "Property page with amenities and booking panel", es: "Página de propiedad con amenidades y panel de reserva" } },
    { src: "/screens/sedona-checkout.jpg", device: "desktop", alt: { en: "Checkout: guest details with a held quote", es: "Checkout: datos del huésped con cotización retenida" } },
    { src: "/screens/sedona-confirmed.jpg", device: "desktop", alt: { en: "Reservation confirmed after the verified payment webhook", es: "Reserva confirmada tras el webhook de pago verificado" } },
    { src: "/screens/sedona-guest-stays.jpg", device: "desktop", alt: { en: "Guest portal: my stays (email OTP sign-in)", es: "Portal de huéspedes: mis estadías (acceso con OTP)" } },
    { src: "/screens/sedona-admin-dashboard.jpg", device: "desktop", alt: { en: "Admin dashboard: live operations from PostgreSQL", es: "Panel admin: operación en vivo desde PostgreSQL" } },
    { src: "/screens/sedona-admin-reservations.jpg", device: "desktop", alt: { en: "Admin reservations with filters", es: "Reservas en el admin con filtros" } },
    { src: "/screens/sedona-admin-calendar.jpg", device: "desktop", alt: { en: "Availability calendar: reservations, holds and manual blocks", es: "Calendario: reservas, retenciones y bloqueos manuales" } },
    { src: "/screens/sedona-mobile.jpg", device: "mobile", alt: { en: "Guest site on a phone", es: "Sitio de huéspedes en el teléfono" } },
  ],
  "all-bookings": [
    { src: "/screens/allbookings-home.jpg", device: "desktop", alt: { en: "Marketplace home with destination search", es: "Inicio del marketplace con búsqueda por destino" } },
    { src: "/screens/allbookings-stay.jpg", device: "desktop", alt: { en: "Stay detail with gallery and booking panel", es: "Detalle del alojamiento con galería y panel de reserva" } },
    { src: "/screens/allbookings-checkout.jpg", device: "desktop", alt: { en: "Checkout with frozen price breakdown", es: "Checkout con desglose de precio congelado" } },
    { src: "/screens/allbookings-confirmation.jpg", device: "desktop", alt: { en: "Booking confirmed, read from the database", es: "Reserva confirmada, leída desde la base de datos" } },
    { src: "/screens/allbookings-host-calendar.jpg", device: "desktop", alt: { en: "Host calendar", es: "Calendario del anfitrión" } },
    { src: "/screens/allbookings-host-earnings.jpg", device: "desktop", alt: { en: "Host earnings: gross, commission, net and payouts", es: "Ganancias del anfitrión: bruto, comisión, neto y pagos" } },
    { src: "/screens/allbookings-admin-finance.jpg", device: "desktop", alt: { en: "Admin finance: GMV, fees, commissions and payables", es: "Finanzas admin: GMV, tarifas, comisiones y cuentas por pagar" } },
    { src: "/screens/allbookings-admin-property-approvals.jpg", device: "desktop", alt: { en: "Admin property approvals before publishing", es: "Aprobación de propiedades antes de publicar" } },
    { src: "/screens/allbookings-mobile.jpg", device: "mobile", alt: { en: "Marketplace on a phone (installable PWA)", es: "Marketplace en el teléfono (PWA instalable)" } },
  ],
  "digital-concierge": [
    { src: "/screens/concierge-home.jpg", device: "desktop", alt: { en: "Home: natural-language search and a price breakdown card", es: "Inicio: búsqueda en lenguaje natural y desglose de precio" } },
    { src: "/screens/concierge-search.jpg", device: "desktop", alt: { en: "Search results with best match and related services", es: "Resultados con la mejor coincidencia y servicios relacionados" } },
    { src: "/screens/concierge-mobile.jpg", device: "mobile", alt: { en: "Home on a phone", es: "Inicio en el teléfono" } },
  ],
  "gwork-systems": [
    { src: "/screens/website-home.jpg", device: "desktop", alt: { en: "Home page in dark mode", es: "Página de inicio en modo oscuro" } },
    { src: "/screens/website-automate.jpg", device: "desktop", alt: { en: "Automate service page", es: "Página del servicio Automate" } },
    { src: "/screens/website-mobile.jpg", device: "mobile", alt: { en: "Home on a phone", es: "Inicio en el teléfono" } },
  ],
};
