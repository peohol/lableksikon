/**
 * Identifikatorene for demonstrasjonene. Holdes adskilt fra komponentene selv
 * slik at innholdsvalidering kan kjøre uten å laste React-komponenter.
 */
export const DEMO_IDS = [
  "presisjon-spredning",
  "repeterbarhet-serie",
  "intermediar-forhold",
  "reproduserbarhet-lab",
  "riktighet-skiver",
  "skjevhet-referanse",
  "gjenvinning-spike",
  "usikkerhetsbudsjett",
  "utvidet-intervall",
  "dekningsfaktor-k",
  "selektivitet-interferens",
  "spesifisitet-terminologi",
  "folsomhet-stigning",
  "robusthet-variasjon",
  "sporbarhet-kjede",
  "validering-formal",
  "verifisering-krav",
  "kontrollkort-serie",
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
