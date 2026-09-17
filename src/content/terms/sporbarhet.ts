import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const sporbarhet: PublishedTerm = {
  slug: "sporbarhet",
  title: "Metrologisk sporbarhet",
  category: "kvalitet",
  definition: "En egenskap ved et måleresultat der resultatet kan relateres til en referanse gjennom en dokumentert, ubrutt kjede av kalibreringer som hver bidrar til måleusikkerheten.",
  aliases: ["traceability", "sporbarhet", "kjede", "si-enhet"],
  explanation: [
    { kind: "p", text: "Sporbarhet betyr at du kan følge måleresultatet bakover gjennom en dokumentert kjede av kalibreringer til en definert referanse. Hvert ledd i kjeden har sin egen [måleusikkerhet](begrep:maleusikkerhet)." },
    { kind: "p", text: "Referansen kan være en SI-enhet, et referansemateriale eller en referanseprosedyre. Sporbarhet sier hvor resultatet er forankret — ikke at resultatet automatisk er godt nok for formålet." },
  ],
  demo: "usikkerhetsbudsjett",
  depth: {
    title: "Dybde: sporbarhet krever mer enn et sertifikat",
    blocks: [
      { kind: "p", text: "VIM krever en dokumentert og ubrutt kalibreringskjede. Det er derfor ikke tilstrekkelig at et instrument en gang er kalibrert; forbindelsen mellom det aktuelle resultatet og referansen må være etablert." },
      { kind: "p", text: "Hvert kalibreringsledd bidrar til usikkerheten. Sporbarhet uten oppgitt eller vurdert måleusikkerhet er derfor ufullstendig metrologisk informasjon." },
      { kind: "p", text: "Metrologisk sporbarhet må ikke forveksles med prøvesporbarhet eller dokumenthistorikk. De beskriver andre typer sporbarhet." },
    ],
  },
  sources: [SOURCES.vim, SOURCES.gum],
  status: "publisert",
};
