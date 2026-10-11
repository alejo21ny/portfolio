// Single configuration point for the production URL. Set NEXT_PUBLIC_SITE_URL
// once a real domain is chosen; everything that needs an absolute URL
// (canonical, Open Graph, sitemap, robots, JSON-LD) reads from here instead
// of hardcoding a guessed domain.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://fsdgportfolio.netlify.app";

// Locale-independent identity. Copy that changes per language lives in
// lib/i18n.ts.
export const SITE = {
  name: "David Gomez",
  location: "Medellín, Colombia",
  // Routed by Cloudflare Email Routing to David's inbox.
  email: "david@gworksystems.com",
  github: "https://github.com/alejo21ny",
  linkedin: "https://www.linkedin.com/in/dgomezbuiles",
  gwork: "https://gworksystems.com",
} as const;
