import type { Metadata } from "next";
import localFont from "next/font/local";

import { Header } from "@/components/Header";
import { SkipLink } from "@/components/SkipLink";
import { buildSearchIndex } from "@/lib/search-index";
import { siteUrl } from "@/lib/site";
import { orderedTerms } from "@/content";

import "./globals.css";

// Skriftene er selvhostet, se src/fonts/README.md.
const newsreader = localFont({
  src: [
    { path: "../fonts/newsreader-latin-wght-normal.woff2", weight: "300 600", style: "normal" },
    { path: "../fonts/newsreader-latin-wght-italic.woff2", weight: "300 600", style: "italic" },
  ],
  display: "swap",
  variable: "--font-newsreader",
  fallback: ["Georgia", "serif"],
  adjustFontFallback: "Times New Roman",
});

const plexSans = localFont({
  src: [{ path: "../fonts/ibm-plex-sans-latin-wght-normal.woff2", weight: "400 600", style: "normal" }],
  display: "swap",
  variable: "--font-plex-sans",
  fallback: ["system-ui", "sans-serif"],
  adjustFontFallback: "Arial",
});

const siteDescription =
  "Et pedagogisk oppslagsverk for begreper i analytisk kjemi: kort definisjon, hverdagslig forklaring, demonstrasjon og teknisk dybde.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Lableksion — begrepene i analytisk kjemi, forklart",
    template: "%s — Lableksion",
  },
  description: siteDescription,
  openGraph: {
    type: "website",
    locale: "nb_NO",
    siteName: "Lableksion",
    title: "Lableksion — begrepene i analytisk kjemi, forklart",
    description: siteDescription,
    url: "/",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nb" className={`${newsreader.variable} ${plexSans.variable}`}>
      <body>
        <SkipLink />
        <Header searchIndex={buildSearchIndex()} termCount={orderedTerms.length} />
        <main id="innhold">{children}</main>
      </body>
    </html>
  );
}
