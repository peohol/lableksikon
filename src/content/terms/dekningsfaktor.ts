import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const dekningsfaktor: PublishedTerm = {
  slug: "dekningsfaktor",
  title: "Dekningsfaktor",
  category: "kvalitet",
  definition: "Et tall større enn én som kombinert standard måleusikkerhet multipliseres med for å få utvidet måleusikkerhet.",
  aliases: ["k", "coverage factor", "faktor", "k=2"],
  explanation: [
    { kind: "p", text: "Dekningsfaktoren k bestemmer hvor mye den kombinerte standardusikkerheten skaleres opp når man rapporterer [utvidet måleusikkerhet](begrep:utvidet)." },
    { kind: "p", text: "k = 2 brukes ofte fordi det under vanlige forutsetninger gir et dekningsintervall på omtrent 95 %. Men riktig k avhenger av fordelingen og ønsket dekningssannsynlighet." },
  ],
  demo: "usikkerhetsbudsjett",
  depth: {
    title: "Dybde: k velges ut fra ønsket dekning",
    blocks: [
      { kind: "p", text: "VIM definerer dekningsfaktor som et tall større enn én som multipliseres med kombinert standardusikkerhet for å få utvidet usikkerhet." },
      { kind: "p", text: "Ved en tilnærmet normal fordeling og tilstrekkelige frihetsgrader brukes ofte k ≈ 2 for omtrent 95 % dekning. Ved få frihetsgrader eller andre fordelinger kan en annen faktor være nødvendig." },
      { kind: "p", text: "Dekningsintervall må ikke forveksles med et klassisk statistisk konfidensintervall; VIM skiller uttrykkelig mellom begrepene." },
    ],
  },
  sources: [SOURCES.vim, SOURCES.gum],
  status: "publisert",
};
