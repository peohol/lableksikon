import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const robusthet: PublishedTerm = {
  slug: "robusthet",
  title: "Robusthet",
  category: "kvalitet",
  definition: "Evnen til å opprettholde akseptabel ytelse når små, tilsiktede endringer gjøres i driftsbetingelsene.",
  aliases: ["robustness", "ruggedness", "robust", "små endringer"],
  explanation: [
    { kind: "p", text: "En metode skal ikke kollapse fordi mobilfasens pH blir 0,2 enheter annerledes eller temperaturen avviker litt. Robusthet undersøkes ved å endre slike forhold kontrollert og se om ytelsen fortsatt oppfyller kravene." },
    { kind: "p", text: "Poenget er ikke at resultatet skal være identisk. Poenget er at de realistiske små variasjonene laboratoriet må tåle, ikke skal gjøre metoden uegnet til sitt formål." },
  ],
  demo: "robusthet-variasjon",
  depth: {
    title: "Dybde: robusthet, ruggedness og forsøksdesign",
    blocks: [
      { kind: "p", text: "Terminologien varierer mellom kilder. Eurachem bruker «ruggedness» om evnen til å bevare akseptabel ytelse ved mindre endringer i driftsbetingelser, mens «robustness» ofte brukes om samme eller et nært beslektet konsept." },
      { kind: "p", text: "Faktorene bør velges ut fra kritiske metodeparametere og normal laboratorievariasjon. Et faktorielt forsøksdesign kan undersøke flere små endringer effektivt og avdekke hvilke parametere som faktisk er kritiske." },
    ],
  },
  sources: [SOURCES.eurachem2025],
  status: "publisert",
};
