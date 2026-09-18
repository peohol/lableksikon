import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const platetall: PublishedTerm = {
  slug: "platetall",
  title: "Platetall",
  category: "separasjon",
  definition: "Et dimensjonsløst mål på kromatografisk kolonneeffektivitet beregnet fra retensjon og toppbredde.",
  aliases: ["plate number", "theoretical plates", "teoretiske plater", "N", "kolonneeffektivitet"],
  explanation: [
    { kind: "p", text: "Platetallet N blir høyere når en topp er smal i forhold til hvor lenge den er retinert. Det brukes derfor som et mål på hvor lite båndspredning systemet gir." },
    { kind: "p", text: "Formelen avhenger av om [toppbredden](begrep:toppbredde) måles ved basis, halv høyde eller som standardavvik. Verdier kan ikke sammenlignes ukritisk hvis beregningsmåten er forskjellig." },
  ],
  demo: "platetall-bredde",
  depth: {
    title: "Dybde: N og antakelsen om gaussiske topper",
    blocks: [
      { kind: "p", text: "For en symmetrisk gaussisk topp er vanlige uttrykk N = 16(tR/wb)² og N = 5,545(tR/wh)². IUPAC understreker at disse uttrykkene bygger på en gaussisk toppmodell." },
      { kind: "p", text: "Observerte topper påvirkes også av ekstrakolonne-båndspredning. Et målt platetall er derfor ikke alltid en ren egenskap ved kolonnematerialet alene." },
    ],
  },
  sources: [SOURCES.iupacPlateNumber],
  status: "publisert",
};