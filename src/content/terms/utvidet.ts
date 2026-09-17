import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const utvidet: PublishedTerm = {
  slug: "utvidet",
  title: "Utvidet måleusikkerhet",
  category: "kvalitet",
  definition: "Kombinert standard måleusikkerhet multiplisert med en dekningsfaktor større enn én.",
  aliases: ["U", "expanded uncertainty", "k=2", "dekningsnivå"],
  explanation: [
    { kind: "p", text: "Standardusikkerhet uttrykkes som et standardavvik. Når resultatet skal rapporteres med et bredere dekningsintervall, multipliseres den kombinerte standardusikkerheten med en [dekningsfaktor](begrep:dekningsfaktor). Produktet kalles utvidet måleusikkerhet." },
    { kind: "p", text: "Skrives resultatet for eksempel som 100 ± 6 med k = 2, er 6 den utvidede usikkerheten. Hva intervallet faktisk dekker avhenger av fordelingen og hvordan k er valgt." },
  ],
  demo: "usikkerhetsbudsjett",
  depth: {
    title: "Dybde: fra standardusikkerhet til dekningsintervall",
    blocks: [
      { kind: "p", text: "VIM definerer utvidet måleusikkerhet som produktet av kombinert standardusikkerhet og en faktor større enn én. Faktoren er [dekningsfaktoren](begrep:dekningsfaktor)." },
      { kind: "p", text: "Dekningsfaktoren avhenger av sannsynlighetsfordelingen til resultatstørrelsen og valgt dekningssannsynlighet. Derfor er k = 2 ikke en universell garanti for nøyaktig 95 % dekning, selv om det ofte gir omtrent dette under vanlige normaltilnærminger." },
      { kind: "p", text: "Ved rapportering bør både U og k oppgis, og om nødvendig også hvilken dekningssannsynlighet eller beregningsmetode som er brukt." },
    ],
  },
  sources: [SOURCES.vim, SOURCES.gum, SOURCES.eurachemUncertainty],
  status: "publisert",
};
