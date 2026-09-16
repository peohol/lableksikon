/**
 * Identifikatorene for demonstrasjonene. Holdes adskilt fra komponentene selv
 * slik at innholdsvalidering kan kjøre uten å laste React-komponenter.
 * Ny demonstrasjon: legg id her, og registrer komponenten i `registry.tsx`.
 */
export const DEMO_IDS = [
  "presisjon-spredning",
  "usikkerhetsbudsjett",
  "riktighet-skiver",
  "linearitet-kurve",
  "deteksjonsgrense-stoy",
  "internstandard-forhold",
  "standardaddisjon-steg",
  "blindprove-typer",
  "matriseeffekt-matrikser",
  "standardavvik-formel",
  "opplosning-topper",
] as const;

export type DemoId = (typeof DEMO_IDS)[number];
