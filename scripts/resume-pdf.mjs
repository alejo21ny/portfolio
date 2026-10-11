// Renders the résumé pages of the static export (out/) to PDF with headless
// Chromium, writing public/cv/*.pdf. Run after `npm run build`:
//
//   npm run build && npm run resume:pdf
//
// Set CHROMIUM_PATH to use a specific Chromium; otherwise Playwright's own
// browser lookup applies.
import { createServer } from "node:http";
import { readFile, stat, mkdir } from "node:fs/promises";
import { extname, join, resolve } from "node:path";
import { chromium } from "playwright-core";
import { RESUME, RESUME_FILES } from "../lib/resume.ts";

const OUT = resolve("out");
const DEST = resolve("public/cv");
const TYPES = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".jpg": "image/jpeg", ".png": "image/png", ".svg": "image/svg+xml", ".woff2": "font/woff2", ".ico": "image/x-icon", ".json": "application/json", ".txt": "text/plain" };

async function resolveFile(urlPath) {
  let p = join(OUT, decodeURIComponent(urlPath.split("?")[0]));
  if ((await stat(p).catch(() => null))?.isDirectory()) p = join(p, "index.html");
  return p;
}

const server = createServer(async (req, res) => {
  try {
    const file = await resolveFile(req.url ?? "/");
    res.writeHead(200, { "content-type": TYPES[extname(file)] ?? "application/octet-stream" });
    res.end(await readFile(file));
  } catch {
    res.writeHead(404).end();
  }
});
await new Promise((ok) => server.listen(0, "127.0.0.1", ok));
const origin = `http://127.0.0.1:${server.address().port}`;

const jobs = [
  { path: "/resume/", file: RESUME_FILES.pdf.en, label: "Resume" },
  { path: "/es/resume/", file: RESUME_FILES.pdf.es, label: "Hoja de vida" },
  { path: "/resume/ats/", file: RESUME_FILES.ats.en, label: "Resume" },
  { path: "/es/resume/ats/", file: RESUME_FILES.ats.es, label: "Hoja de vida" },
];

await mkdir(DEST, { recursive: true });
const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
try {
  const page = await browser.newPage();
  for (const job of jobs) {
    await page.goto(`${origin}${job.path}`, { waitUntil: "networkidle" });
    // Paper is always light, whatever the site's default theme is.
    await page.evaluate(() => document.documentElement.setAttribute("data-theme", "light"));
    await page.emulateMedia({ media: "print", colorScheme: "light" });
    await page.pdf({
      path: join(DEST, job.file),
      preferCSSPageSize: true,
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: "<span></span>",
      footerTemplate: `<div style="width:100%;font-size:8px;color:#71717a;font-family:sans-serif;padding:0 48px;display:flex;justify-content:space-between"><span>${RESUME.name} · ${job.label}</span><span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>`,
      tagged: true,
      outline: true,
    });
    console.log(`✓ public/cv/${job.file}`);
  }
} finally {
  await browser.close();
  server.close();
}
