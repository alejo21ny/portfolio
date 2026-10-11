import type { NextConfig } from "next";

// Static export — this site has no server-side features (no auth, no DB,
// no API routes), so it deploys as plain static files to GitHub Pages,
// Netlify or Cloudflare Pages with no adapter required.
//
// NEXT_PUBLIC_BASE_PATH is set only by the GitHub Pages workflow, which serves
// the site under /portfolio; every other host serves it from the root.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || undefined;

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
