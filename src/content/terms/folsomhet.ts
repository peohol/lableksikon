import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const folsomhet: PublishedTerm = {
  slug: "folsomhet",
  title: "Følsomhet",
  category: "kvalitet",
  definition: "Forholdet mellom endringen i målesystemets indikasjon og den tilsvarende endringen i verdien som måles.",
  aliases: ["sensitivitet", "sensitivity", "stigningstall", "slope"],
  explanation: [
    { kind: "p", text: "Følsomhet sier hvor mye signalet endrer seg når analyttnivået endrer seg. På en lineær kalibreringskurve tilsvarer dette i praksis kurvens stigningstall." },
    { kind: "p", text: "Stor følsomhet betyr at en liten endring i konsentrasjon gir en stor signalendring. Det betyr ikke automatisk lav deteksjonsgrense, fordi bakgrunnsstøy og variasjon også spiller inn." },
  ],
  demo: "linearitet-kurve",
  depth: {
    title: "Dybde: følsomhet må ikke forveksles med deteksjonsevne",
    blocks: [
      { kind: "p", text: "VIM definerer følsomhet som endringen i indikasjon delt på den tilsvarende endringen i verdien som måles. Følsomheten kan variere med nivået dersom responsen ikke er lineær." },
      { kind: "p", text: "En bratt kalibreringskurve gir høy følsomhet, men deteksjonsevnen bestemmes også av variasjonen i blank- og lavnivåsignaler. Derfor kan to metoder med samme følsomhet ha ulik deteksjonsgrense." },
      { kind: "p", text: "Følsomhet er heller ikke det samme som [selektivitet](begrep:selektivitet): den ene beskriver signalendring per endring i analyttnivå, den andre beskriver motstand mot forstyrrende påvirkning fra andre størrelser." },
    ],
  },
  sources: [SOURCES.vim, SOURCES.eurachemValidation],
  status: "publisert",
};
