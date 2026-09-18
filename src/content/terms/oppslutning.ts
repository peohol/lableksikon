import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const oppslutning: PublishedTerm = {
  slug: "oppslutning",
  title: "Oppslutning",
  category: "provetaking",
  definition: "Kjemisk prøvebehandling der prøven løses opp samtidig som matriksen forenkles før videre analyse.",
  aliases: ["digestion", "syreoppslutning", "mikrobølgeoppslutning", "sample digestion"],
  explanation: [
    { kind: "p", text: "IUPAC definerer digestion i prøveopparbeiding som prøveoppløsning med samtidig matriksforenkling. Syre og varme, ofte i lukkede beholdere eller mikrobølgesystemer, er vanlige hjelpemidler ved elementanalyse." },
    { kind: "p", text: "Oppslutning betyr ikke automatisk at absolutt alt materiale er fullstendig løst. Kravet er at behandlingen gir en løsning og matrikstilstand som er egnet for den aktuelle måleprosedyren." },
  ],
  demo: "oppslutning-matriks",
  depth: {
    title: "Dybde: oppslutning kan både frigjøre analytt og introdusere tap",
    blocks: [
      { kind: "p", text: "Målet kan være å bryte ned organisk materiale, løse mineralfaser eller frigjøre analytt som ellers ikke er tilgjengelig. Reagensvalg, temperatur, trykk og tid må tilpasses prøven og analytten." },
      { kind: "p", text: "Flyktige analytter kan gå tapt, reagenser kan tilføre [kontaminering](begrep:kontaminering), og ufullstendig oppslutning kan gi lav [gjenvinning](begrep:gjenvinning). Blankprøver og relevante kontrollmaterialer er derfor viktige." },
    ],
  },
  sources: [SOURCES.iupacDigestion, SOURCES.iupacSamplePretreatment, SOURCES.eurachemQac2026],
  status: "publisert",
};