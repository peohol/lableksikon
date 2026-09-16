/**
 * Kanonisk adresse for metadata, sitemap og robots.
 *
 * `NEXT_PUBLIC_SITE_URL` settes bare hvis nettstedet får et eget domene. Ellers
 * bruker vi produksjonsdomenet Vercel selv oppgir, som også finnes i
 * forhåndsvisninger, slik at appen er riktig konfigurert uten ekstra oppsett.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/+$/, "");

  const vercelProductionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercelProductionUrl) return `https://${vercelProductionUrl}`;

  return "http://localhost:3000";
}

export const siteUrl = resolveSiteUrl();
