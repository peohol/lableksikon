import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const maleusikkerhet: PublishedTerm = {
  slug: "maleusikkerhet",
  title: "Måleusikkerhet",
  category: "kvalitet",
  definition:
    "En ikke-negativ parameter som beskriver spredningen av verdier som, ut fra informasjonen man har, med rimelighet kan tilordnes målestørrelsen.",
  aliases: [
    "usikkerhet",
    "intervall",
    "usikkerhetsbudsjett",
    "pluss minus",
    "slark",
    "grenseverdi",
    "dekningsfaktor",
  ],
  explanation: [
    {
      kind: "p",
      text: "Et måleresultat er ikke et perfekt punkt på tallinja. Måleusikkerhet beskriver hvor stor spredning det er rimelig å knytte til verdien vi tilordner det vi prøver å måle, gitt all informasjonen vi har om måleprosessen.",
    },
    {
      kind: "p",
      text: "Bidrag kan komme fra blant annet kalibrering, prøveopparbeiding, referansematerialer, [presisjon](begrep:presisjon) og systematiske effekter. Usikkerhet betyr derfor ikke at «den sanne verdien med en bestemt sannsynlighet ligger i intervallet»; den beskriver kvaliteten på kunnskapen om målestørrelsen.",
    },
  ],
  demo: "usikkerhetsbudsjett",
  depth: {
    title: "Dybde: standardusikkerhet, kombinert usikkerhet og utvidet usikkerhet",
    blocks: [
      {
        kind: "p",
        text: "Standard måleusikkerhet er måleusikkerhet uttrykt som et standardavvik. Når flere uavhengige standardusikkerhetsbidrag inngår i en modell, kombineres de typisk ved kvadratisk summering. Korrelasjoner må tas hensyn til dersom bidragene ikke er uavhengige.",
      },
      {
        kind: "p",
        text: "[Utvidet måleusikkerhet](begrep:utvidet) fås ved å multiplisere kombinert standardusikkerhet med en [dekningsfaktor](begrep:dekningsfaktor). Dekningsfaktoren velges ut fra ønsket dekningssannsynlighet og den aktuelle sannsynlighetsfordelingen; k = 2 gir ofte omtrent 95 % dekning når en normaltilnærming er rimelig.",
      },
      {
        kind: "p",
        text: "Et usikkerhetsbudsjett dokumenterer hvilke bidrag som er tatt med, hvordan de er estimert og hvordan de er kombinert. I rutineanalytikk kan data fra intermediær presisjon og gjenvinning være et praktisk grunnlag for å estimere viktige deler av usikkerheten.",
      },
    ],
  },
  sources: [SOURCES.vim, SOURCES.gum, SOURCES.eurachemUncertainty],
  status: "publisert",
};
