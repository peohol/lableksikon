import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const bakgrunnssignal: PublishedTerm = {
  slug: "bakgrunnssignal",
  title: "Bakgrunnssignal",
  category: "prove",
  definition: "Indikasjon fra et sammenlignbart system eller materiale der analytten ikke er til stede, eller ikke bidrar til indikasjonen.",
  aliases: ["background indication", "blank indication", "baseline", "bakgrunn", "grunnlinje"],
  explanation: [
    { kind: "p", text: "Et målesystem kan gi respons selv uten analyttbidrag. Responsen kan komme fra matriks, reagenser, optikk, elektronikk eller andre deler av målekjeden." },
    { kind: "p", text: "Bakgrunnssignal er ikke det samme som tilfeldig støy. Bakgrunnen kan ha et stabilt gjennomsnittsnivå, mens støy beskriver tilfeldige variasjoner rundt et nivå." },
  ],
  demo: "bakgrunnssignal-nivaa",
  depth: {
    title: "Dybde: blankindikasjon, bakgrunn og korreksjon",
    blocks: [
      { kind: "p", text: "VIM bruker «blank indication» og «background indication» som samme konsept. IUPAC anbefaler i analytisk kjemi å skille et generelt bakgrunnssignal fra blankindikasjon som uttrykkelig kommer fra et [blankmateriale](begrep:blindprove)." },
      { kind: "p", text: "En bakgrunnskorreksjon er bare gyldig dersom bakgrunnen måles på en måte som er relevant for prøven og er tilstrekkelig stabil. Et feil representert bakgrunnssignal kan skape ny skjevhet i stedet for å fjerne den." },
      { kind: "p", text: "Bakgrunnens nivå og variasjon kan være viktig nær [deteksjonsgrensen](begrep:deteksjonsgrense) og [kvantifiseringsgrensen](begrep:kvantifiseringsgrense)." },
    ],
  },
  sources: [SOURCES.vimBackgroundIndication, SOURCES.iupacBackgroundIndication, SOURCES.iupacBlank],
  status: "publisert",
};
