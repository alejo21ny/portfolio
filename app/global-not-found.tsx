import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = { title: "404 — David Gomez" };

// The site has one root layout per language, so the 404 page brings its own
// <html> (Next's globalNotFound) and speaks both languages.
export default function GlobalNotFound() {
  return (
    <html lang="en" data-theme="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-dvh font-sans antialiased`}>
        <main className="bg-grid flex min-h-dvh flex-col items-center justify-center gap-4 px-4 text-center">
          <p className="font-mono text-sm text-accent">404</p>
          <h1 className="text-3xl font-semibold tracking-tight">Page not found · Página no encontrada</h1>
          <div className="flex gap-3 text-sm">
            <Link href="/" className="rounded-md bg-accent px-4 py-2 font-medium text-accent-foreground">
              Home
            </Link>
            <Link href="/es/" className="rounded-md border border-border px-4 py-2 font-medium">
              Inicio
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
