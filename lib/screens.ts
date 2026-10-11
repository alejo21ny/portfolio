import type { Screenshot } from "./types";

// Real screenshots captured from each app running locally (sample data only).
// Kept apart from the project copy so both languages share one list; alt text
// is English and Spanish.
export const SCREENS: Record<string, Screenshot[]> = {
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
