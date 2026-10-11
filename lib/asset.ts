// Prefixes public/ assets with the deploy base path. GitHub Pages serves this
// repo under /portfolio, Netlify/Cloudflare serve it at the root — the same
// build works for both by setting NEXT_PUBLIC_BASE_PATH (see next.config.ts).
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const asset = (src: string) => `${BASE_PATH}${src}`;
