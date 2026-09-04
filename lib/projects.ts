export type Project = {
  slug: string;
  name: string;
  label: string;
  summary: string;
  tags: string[];
  github: string;
  live?: string;
};

// Source of truth for each project's summary/tags is that project's own
// README — nothing here is invented or measured independently.
export const PROJECTS: Project[] = [
  {
    slug: "smart-library",
    name: "Smart Library",
    label: "Production Full-Stack Application",
    summary:
      "A real library management system — catalog, borrow/return, role-based access, an event-driven audit trail, and a grounded natural-language assistant that never invents a book.",
    tags: [
      "Laravel",
      "React",
      "TypeScript",
      "PostgreSQL",
      "Docker",
      "Google SSO",
      "RBAC",
      "CI/CD",
    ],
    github: "https://github.com/alejo21ny/smart-library-challenge",
    live: "https://smart-library-zsh8.onrender.com",
  },
  {
    slug: "hubspot-portal-sync",
    name: "HubSpot Portal Sync",
    label: "API & Integration Engineering",
    summary:
      "Idempotent sync of a custom HubSpot object between two portals, keyed by an external identifier so re-running it never creates duplicates.",
    tags: [
      "Node.js",
      "HubSpot API",
      "Idempotency",
      "Retry/Backoff",
      "42 tests",
      "GitHub Actions",
    ],
    github: "https://github.com/alejo21ny/hubspot-portal-sync-assessment",
  },
];
