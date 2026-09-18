import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const fortynning: PublishedTerm = {
  slug: "fortynning",
  title: "Fortynning",
  category: "provetaking",
  definition: "Tilsetting av løsemiddel eller fortynningsmedium slik at konsentrasjonen av analytten blir lavere.",
  aliases: ["dilution", "dilusjon", "fortynne"],
  explanation: [
    { kind: "p", text: "Ved en ideell enkel fortynning endres volumet, mens analyttmengden i den overførte delen bevares. Konsentrasjonen faller derfor i forhold til hvor mye sluttvolumet økes." },
    { kind: "p", text: "Fortynning kan bringe prøven inn i metodens [arbeidsområde](begrep:arbeidsomrade), redusere enkelte [matriseeffekter](begrep:matriseeffekt) og gjøre viskøse eller konsentrerte prøver mer håndterlige." },
  ],
  demo: "fortynning-volum",
  depth: {
    title: "Dybde: fortynning reduserer både analytt- og matrikskonsentrasjon",
    blocks: [
      { kind: "p", text: "En ti ganger volumfortynning gir ideelt én tidel av den opprinnelige analyttkonsentrasjonen. Resultatet fra den fortynnede løsningen må derfor korrigeres med riktig [fortynningsfaktor](begrep:fortynningsfaktor) når den opprinnelige prøven skal rapporteres." },
      { kind: "p", text: "Fortynning kan redusere absolutte matrikskonsentrasjoner, men den garanterer ikke at alle matriseeffekter forsvinner. Følsomheten for analytten reduseres samtidig fordi mindre analytt finnes per volum." },
    ],
  },
  sources: [SOURCES.iupacSamplePretreatment, SOURCES.iupacTestSolution],
  status: "publisert",
};