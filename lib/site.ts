// Single configuration point for the production URL. Set NEXT_PUBLIC_SITE_URL
// once a real domain is chosen; everything that needs an absolute URL
// (canonical, Open Graph, sitemap, robots, JSON-LD) reads from here instead
// of hardcoding a guessed domain.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://davidgomez.dev";

export const SITE = {
  name: "David Gomez",
  title: "David Gomez | Senior Full-Stack Developer & AI Automation Specialist",
  role: "Senior Full-Stack Developer & AI Automation Specialist",
  tagline: "Cloud · APIs · AI Agents · Data · Platform Automation",
  statement:
    "I build production software, cloud platforms, API integrations and AI-assisted automation.",
  description:
    "Senior full-stack developer specializing in AI-assisted automation, cloud platforms, and API integrations — production software built with Laravel, React, TypeScript, Node.js, and modern cloud infrastructure.",
  location: "Medellín, Colombia",
  email: "alejo21ny@hotmail.com",
  github: "https://github.com/alejo21ny",
  linkedin: "https://www.linkedin.com/in/dgomezbuiles",
} as const;

export const NAV = [
  { href: "#home", label: "Home" },
  { href: "#work", label: "Work" },
  { href: "#expertise", label: "Expertise" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
] as const;
