import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const utvidet: PublishedTerm = {
  slug: "utvidet",
  title: "Utvidet måleusikkerhet",
  category: "kvalitet",
  definition: "Kombinert standardusikkerhet multiplisert med en dekningsfaktor for å gi et bredere usikkerhetsintervall.",
  aliases: ["expanded uncertainty", "U", "k=2", "utvidet usikkerhet", "dekningsintervall"],
  explanation: [
    { kind: "p", text: "Standardusikkerheten uttrykker usikkerhet på omtrent samme skala som ett standardavvik. Når et resultat skal rapporteres med et intervall med høyere ønsket dekning, multipliseres den kombinerte standardusikkerheten med [dekningsfaktoren](begrep:dekningsfaktor)." },
    { kind: "p", text: "Resultatet kan for eksempel uttrykkes som \\(100 \\pm 3\\) når \\(U = 3\\). Hvilken dekning dette svarer til, må oppgis eller kunne utledes fra hvordan \\(k\\) er valgt." },
  ],
  demo: "utvidet-intervall",
  depth: {
    title: "Dybde: \\(U = k\\,u_c\\) og hvorfor \\(k = 2\\) ikke er magisk",
    blocks: [
      { kind: "p", text: "VIM definerer utvidet måleusikkerhet som kombinert standardusikkerhet multiplisert med en faktor større enn én. Faktoren velges ut fra ønsket dekningssannsynlighet og den aktuelle sannsynlighetsfordelingen." },
      { kind: "p", text: "\\(k = 2\\) gir ofte omtrent 95 % dekning når den relevante fordelingen kan behandles som tilnærmet normal og frihetsgradene er tilstrekkelige. Det er ikke en universell identitet mellom \\(k = 2\\) og 95 %." },
    ],
  },
  sources: [SOURCES.vimExpandedUncertainty, SOURCES.vimCoverageFactor, SOURCES.vimUncertainty],
  status: "publisert",
};
