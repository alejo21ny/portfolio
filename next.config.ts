import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export — this site has no server-side features (no auth, no DB,
  // no API routes), so it deploys as plain static files to Cloudflare Pages
  // or Netlify with no adapter required.
  output: "export",
};

export default nextConfig;
