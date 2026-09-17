import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const blindprove: PublishedTerm = {
  slug: "blindprove",
  title: "Blindprøve",
  category: "kalibrering",
  definition: "Et blankmateriale med ingen eller så lite som mulig av analytten, brukt til å undersøke signalet som oppstår uten analyttbidrag.",
  aliases: ["blank", "blank material", "nullprøve", "reagensblank", "metodeblank", "matriksblank"],
  explanation: [
    { kind: "p", text: "En blank skal vise hva måleprosedyren bidrar med når analytten ikke skal bidra til signalet. Avhengig av hva du vil undersøke, kan blanken bestå av løsemiddel, reagenser, [analyttfri matriks](begrep:matriksblank) eller materiale som går gjennom hele prosedyren." },
    { kind: "p", text: "Et signal i blanken kan skyldes bakgrunn, kontaminering, reagenser eller deler av prosessen. Derfor er «blank» ikke én prøveoppskrift, men en familie av kontroller med ulike formål." },
  ],
  demo: "blindprove-typer",
  depth: {
    title: "Dybde: blanktyper, blankkorreksjon og deteksjon",
    blocks: [
      { kind: "p", text: "IUPAC skiller blant annet mellom løsemiddelblank, reagensblank, matriksblank, prosedyreblank og instrumentblank. Hvilken som er relevant avhenger av hvor i målekjeden man vil lete etter bidrag." },
      { kind: "p", text: "Blankkorreksjon bør bygge på en forstått og tilstrekkelig stabil blankrespons. Blankens variasjon er også sentral i flere tilnærminger til [deteksjonsgrense](begrep:deteksjonsgrense) og [kvantifiseringsgrense](begrep:kvantifiseringsgrense)." },
      { kind: "p", text: "Hvor ofte blanker skal analyseres og hvilke akseptkriterier som gjelder, bestemmes av metode, risiko og kvalitetsprosedyre; det finnes ikke én universell regel om at alle blanktyper skal inngå i hver serie." },
    ],
  },
  sources: [SOURCES.iupacBlank, SOURCES.eurachem2025],
  status: "publisert",
};
