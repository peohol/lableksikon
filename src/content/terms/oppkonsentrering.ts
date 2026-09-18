import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const oppkonsentrering: PublishedTerm = {
  slug: "oppkonsentrering",
  title: "Oppkonsentrering",
  category: "provetaking",
  definition: "Prøveopparbeiding som øker analyttkonsentrasjonen i løsningen eller fasen som skal måles.",
  aliases: ["preconcentration", "berikelse", "inndamping", "enrichment"],
  explanation: [
    { kind: "p", text: "Oppkonsentrering kan for eksempel skje ved at analytten samles fra et stort prøvevolum og elueres i et mindre volum, eller ved at løsemiddel fjernes før prøven rekonstitueres." },
    { kind: "p", text: "Hensikten er ofte å gjøre analytten lettere å måle nær [deteksjonsgrensen](begrep:deteksjonsgrense). Men også interferenser kan bli konsentrert, og analytten kan gå tapt under prosessen." },
  ],
  demo: "oppkonsentrering-volum",
  depth: {
    title: "Dybde: høyere konsentrasjon er ikke det samme som høyere gjenvinning",
    blocks: [
      { kind: "p", text: "Hvis samme analyttmengde ender i et mindre sluttvolum, øker konsentrasjonen selv om analyttmengden ikke øker. Omvendt kan en prosedyre gi betydelig oppkonsentrering samtidig som noe analytt tapes." },
      { kind: "p", text: "Oppkonsentrering må derfor vurderes separat fra [gjenvinning](begrep:gjenvinning). Begge kan påvirke signalet, men beskriver forskjellige egenskaper ved opparbeidingen." },
    ],
  },
  sources: [SOURCES.iupacSamplePretreatment, SOURCES.eurachem2025],
  status: "publisert",
};