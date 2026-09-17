import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const dekningsfaktor: PublishedTerm = {
  slug: "dekningsfaktor",
  title: "Dekningsfaktor",
  category: "kvalitet",
  definition: "Et tall større enn én som multipliseres med kombinert standardusikkerhet for å få utvidet måleusikkerhet.",
  aliases: ["coverage factor", "k", "k-faktor", "dekningssannsynlighet"],
  explanation: [
    { kind: "p", text: "Tenk på k som en breddeknapp. Samme standardusikkerhet gir et smalere intervall med k = 1 enn med k = 2." },
    { kind: "p", text: "Men k velges ikke bare fordi et bestemt tall er vanlig. Ønsket dekningssannsynlighet og formen på usikkerhetsfordelingen bestemmer hvilken faktor som er passende for [utvidet måleusikkerhet](begrep:utvidet)." },
  ],
  demo: "dekningsfaktor-k",
  depth: {
    title: "Dybde: dekning, fordeling og effektive frihetsgrader",
    blocks: [
      { kind: "p", text: "For en tilnærmet normal fordeling med godt kjent standardusikkerhet vil k nær 2 ofte brukes for omtrent 95 % dekning. Ved få effektive frihetsgrader kan en t-fordeling kreve en større faktor for samme dekning." },
      { kind: "p", text: "Rapportering bør derfor angi både U og k, og når det er relevant også ønsket dekningssannsynlighet og hvordan faktoren er bestemt." },
    ],
  },
  sources: [SOURCES.vimCoverageFactor, SOURCES.vimExpandedUncertainty],
  status: "publisert",
};
