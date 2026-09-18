import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const oppkonsentrering: PublishedTerm = {
  slug: "oppkonsentrering",
  title: "Oppkonsentrering",
  category: "provetaking",
  definition: "Prøveopparbeiding som øker forholdet mellom analytten og matriksen, ofte også analyttkonsentrasjonen i løsningen som skal måles.",
  aliases: ["preconcentration", "berikelse", "inndamping", "enrichment"],
  explanation: [
    { kind: "p", text: "IUPAC definerer preconcentration som en prosess der forholdet mellom sporbestanddelen og hovedmatriksen øker. Det kan for eksempel skje ved at analytten samles fra et stort prøvevolum og elueres i et mindre volum, eller ved at matrikskomponenter fjernes." },
    { kind: "p", text: "Hensikten er ofte å gjøre analytten lettere å måle nær [deteksjonsgrensen](begrep:deteksjonsgrense). Men også interferenser kan bli konsentrert, og analytten kan gå tapt under prosessen." },
  ],
  demo: "oppkonsentrering-volum",
  depth: {
    title: "Dybde: høyere konsentrasjon er ikke det samme som høyere gjenvinning",
    blocks: [
      { kind: "p", text: "Ved absolutt oppkonsentrering kan samme analyttmengde overføres til mindre masse eller volum slik at konsentrasjonen øker. Relativ oppkonsentrering kan i stedet hovedsakelig redusere matriksen. Omvendt kan en prosedyre gi god oppkonsentrering samtidig som noe analytt tapes." },
      { kind: "p", text: "Oppkonsentrering må derfor vurderes separat fra [gjenvinning](begrep:gjenvinning). Begge kan påvirke signalet, men beskriver forskjellige egenskaper ved opparbeidingen." },
    ],
  },
  sources: [SOURCES.iupacPreconcentration, SOURCES.iupacAbsolutePreconcentration, SOURCES.iupacSamplePretreatment],
  status: "publisert",
};