import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const selektivitet: PublishedTerm = {
  slug: "selektivitet",
  title: "Selektivitet",
  category: "kvalitet",
  definition: "I hvilken grad et målesystem eller en analytisk metode kan bestemme analytten uten at andre stoffer eller egenskaper gir et relevant forstyrrende bidrag.",
  aliases: ["selectivity", "interferens", "spesifisitet"],
  explanation: [
    { kind: "p", text: "En selektiv metode skiller signalet fra analytten godt nok fra signaler som kommer fra andre stoffer i prøven. Det avgjørende er ikke at ingen andre stoffer påvirker systemet, men at påvirkningen ikke ødelegger bestemmelsen." },
    { kind: "p", text: "Selektivitet kan undersøkes ved å analysere blanke matrikser, potensielle interferenter, nedbrytningsprodukter og prøver med relevante samtidige stoffer." },
  ],
  demo: "matriseeffekt-matrikser",
  depth: {
    title: "Dybde: selektivitet er knyttet til det som faktisk skal bestemmes",
    blocks: [
      { kind: "p", text: "Selektivitet er alltid knyttet til en bestemt måleoppgave. En metode kan være tilstrekkelig selektiv i én matriks eller ved ett konsentrasjonsnivå, men utilstrekkelig i en annen sammenheng." },
      { kind: "p", text: "I kromatografi og massespektrometri kan både separasjon, retensjon, ioneforhold og valgte overganger bidra til selektiviteten. Ingen enkelt teknikk gjør metoden automatisk selektiv." },
      { kind: "p", text: "Begrepet [spesifisitet](begrep:spesifisitet) brukes ofte om en yttergrense der responsen kan tilskrives én analytt entydig; i analytisk kjemi er selektivitet vanligvis det mer praktiske begrepet." },
    ],
  },
  sources: [SOURCES.vim, SOURCES.eurachemValidation],
  status: "publisert",
};
