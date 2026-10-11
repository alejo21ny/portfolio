import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { PROJECTS } from "@/lib/projects";

// Required for `output: "export"` — otherwise Next treats this route as
// dynamic and fails the static build.
export const dynamic = "force-static";

const entry = (path: string, priority: number): MetadataRoute.Sitemap[number] => ({
  url: `${SITE_URL}${path}`,
  changeFrequency: "monthly",
  priority,
  alternates: { languages: { en: `${SITE_URL}${path}`, es: `${SITE_URL}/es${path}` } },
});

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/resume/", ...PROJECTS.map((p) => `/work/${p.slug}/`)];
  return paths.flatMap((path, i) => {
    const en = entry(path, i === 0 ? 1 : 0.8);
    return [en, { ...en, url: `${SITE_URL}/es${path}` }];
  });
}
