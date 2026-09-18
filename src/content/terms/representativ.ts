import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const representativ: PublishedTerm = {
  slug: "representativ",
  title: "Representativ prøve",
  category: "provetaking",
  definition: "En prøve som, ut fra prøvetakingsplanen, kan forventes å gjenspeile de egenskapene ved målpopulasjonen som undersøkelsen gjelder.",
  aliases: ["representativitet", "representative sample", "uttak", "sampling"],
  explanation: [
    { kind: "p", text: "Representativitet betyr ikke at prøven ligner hele materialet i enhver henseende. Den skal representere den aktuelle analytten eller egenskapen for det definerte formålet og den populasjonen resultatet skal si noe om." },
    { kind: "p", text: "Hvordan prøven tas er derfor en del av måleprosessen. En svært presis analyse kan ikke reparere en prøve som systematisk overser deler av materialet den skulle representere." },
  ],
  demo: "representativ-utvalg",
  depth: {
    title: "Dybde: representativitet bestemmes av prøvetakingsplanen",
    blocks: [
      { kind: "p", text: "IUPAC beskriver en representativ prøve som resultatet av en prøvetakingsplan som kan forventes å gjenspeile de relevante egenskapene i moderpopulasjonen. Tilfeldig prøvetaking kan være riktig i én situasjon, mens stratifisert prøvetaking kan være bedre i en annen." },
      { kind: "p", text: "Eurachem behandler prøvetaking og fysisk prøveopparbeiding som deler av den samlede måleprosessen fordi heterogenitet og uttaksprosedyre kan bidra vesentlig til [måleusikkerheten](begrep:maleusikkerhet)." },
    ],
  },
  sources: [SOURCES.iupacRepresentativeSample, SOURCES.iupacSamplingPlan, SOURCES.eurachemSampling2019],
  status: "publisert",
};