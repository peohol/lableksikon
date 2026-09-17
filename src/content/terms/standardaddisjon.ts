import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const standardaddisjon: PublishedTerm = {
  slug: "standardaddisjon",
  title: "Standardaddisjon",
  category: "kalibrering",
  definition: "En måleprosedyre der responsen måles i prøven både uten og med én eller flere kjente tilsetninger av analyttstandard.",
  aliases: ["standard addition", "addisjon", "tilsetningsmetode", "ekstrapolasjon", "spiking"],
  explanation: [
    { kind: "p", text: "Prøven deles i porsjoner, og kjente analyttmengder tilsettes noen av dem. Fordi alle porsjonene inneholder samme prøvegrunnlag, kan responsøkningen brukes til å estimere hvor mye analytt som var der fra før." },
    { kind: "p", text: "Standardaddisjon kan korrigere en multiplikativ [matriseeffekt](begrep:matriseeffekt) når modellforutsetningene holder. Den korrigerer ikke automatisk alle typer interferens eller andre systematiske feil." },
  ],
  demo: "standardaddisjon-steg",
  depth: {
    title: "Dybde: modellforutsetninger og ekstrapolasjon",
    blocks: [
      { kind: "p", text: "I den vanlige lineære varianten tilpasses respons mot tilsatt mengde og den opprinnelige analyttmengden utledes ved ekstrapolasjon. Linearitet og likeverdige prøveporsjoner er derfor sentrale forutsetninger." },
      { kind: "p", text: "Metoden krever flere målinger per prøve og kan gi større statistisk usikkerhet enn en godt tilpasset ekstern kalibrering. Den er særlig nyttig når responsens stigning påvirkes av den enkelte prøvens matriks." },
    ],
  },
  sources: [SOURCES.iupacStandardAddition, SOURCES.eurachem2025],
  status: "publisert",
};
