import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const interferens: PublishedTerm = {
  slug: "interferens",
  title: "Interferens",
  category: "prove",
  definition: "Systematisk påvirkning av målesignalet fra andre komponenter i prøven, slik at signalet ikke bare representerer analytten.",
  aliases: ["interference", "interferent", "forstyrrelse", "concomitant", "overlapp"],
  explanation: [
    { kind: "p", text: "En interferent kan gi ekstra signal, dempe analyttsignalet eller påvirke målingen på annen systematisk måte. Derfor er interferens mer enn bare en topp som ligger oppå analyttoppen." },
    { kind: "p", text: "IUPAC beskriver en interferent som en matrikskomponent som representerer en påvirkningsstørrelse. Når en bestemt komponent kan identifiseres som årsaken, er det mer presist å snakke om interferens enn om den samlede [matriseeffekten](begrep:matriseeffekt)." },
  ],
  demo: "interferens-signal",
  depth: {
    title: "Dybde: interferens kan ligne analytten eller virke indirekte",
    blocks: [
      { kind: "p", text: "Noen interferenter produserer et signal som måleprosedyren ikke klarer å skille fra analytten. Andre endrer kjemi, ionisering, ekstraksjon eller instrumentrespons og påvirker signalet gjennom en annen mekanisme." },
      { kind: "p", text: "God [selektivitet](begrep:selektivitet) betyr at analyttresultatet i tilstrekkelig grad kan bestemmes uavhengig av relevante interferenter. Derfor bør interferenser undersøkes med realistiske prøver og plausible ledsagerstoffer." },
      { kind: "p", text: "En interferens er systematisk i den forstand at tilstedeværelsen av interferenten påvirker målingen på en reproduserbar måte under de aktuelle betingelsene; tilfeldig instrumentstøy er et annet fenomen." },
    ],
  },
  sources: [SOURCES.iupacInterference, SOURCES.iupacInterferent, SOURCES.iupacMatrixEffect],
  status: "publisert",
};
