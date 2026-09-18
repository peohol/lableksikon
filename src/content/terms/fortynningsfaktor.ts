import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const fortynningsfaktor: PublishedTerm = {
  slug: "fortynningsfaktor",
  title: "Fortynningsfaktor",
  category: "provetaking",
  definition: "Et dimensjonsløst forhold som angir hvor mange ganger konsentrasjonen er redusert ved en fortynning.",
  aliases: ["dilution factor", "DF", "fortynningsgrad", "faktor"],
  explanation: [
    { kind: "p", text: "For en enkel volumfortynning uten analyttap kan fortynningsfaktoren beregnes som sluttvolum delt på volumet av prøvedelen som ble fortynnet. 1,0 mL fortynnet til 10,0 mL gir faktor 10." },
    { kind: "p", text: "Konsentrasjonen målt i sluttløsningen multipliseres da med faktoren for å beregne konsentrasjonen i den opprinnelige løsningen. Ved flere fortynningstrinn multipliseres faktorene med hverandre." },
  ],
  demo: "fortynningsfaktor-regnestykke",
  depth: {
    title: "Dybde: faktor 10 beskriver konsentrasjonsforholdet, ikke en bestemt pipettering",
    blocks: [
      { kind: "p", text: "Samme fortynningsfaktor kan oppnås med ulike volumkombinasjoner. Det avgjørende er forholdet mellom opprinnelig analyttkonsentrasjon og konsentrasjonen etter [fortynning](begrep:fortynning), forutsatt at analyttmengden i aliquoten bevares." },
      { kind: "p", text: "Hvis prosessen også innebærer ekstraksjonstap, oppkonsentrering eller andre volumendringer, må beregningen beskrive hele prøveopparbeidingen. En enkel fortynningsfaktor kan da ikke alene korrigere resultatet." },
    ],
  },
  sources: [SOURCES.iupacTestSolution, SOURCES.iupacSamplePretreatment, SOURCES.eurachem2025],
  status: "publisert",
};