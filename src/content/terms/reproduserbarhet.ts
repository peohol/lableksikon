import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const reproduserbarhet: PublishedTerm = {
  slug: "reproduserbarhet",
  title: "Reproduserbarhet",
  category: "kvalitet",
  definition: "Presisjon målt under reproduserbarhetsbetingelser, typisk med ulike laboratorier, operatører og målesystemer.",
  aliases: ["between-lab", "ringtest", "reproducibility"],
  explanation: [
    { kind: "p", text: "Reproduserbarhet undersøker hvor godt resultatene stemmer overens når målingen flyttes ut av ett laboratorium. Da kan både sted, operatører og utstyr være forskjellige." },
    { kind: "p", text: "Det er derfor en annen presisjonsbetingelse enn [repeterbarhet](begrep:repeterbarhet) og [intermediær presisjon](begrep:intermediar), ikke bare «mer av det samme»." },
  ],
  demo: "presisjon-spredning",
  depth: {
    title: "Dybde: reproduserbarhetsbetingelser",
    blocks: [
      { kind: "p", text: "VIM beskriver reproduserbarhetsbetingelser som målinger på samme eller lignende objekter med ulike steder, operatører og målesystemer. Ulike måleprosedyrer kan også inngå." },
      { kind: "p", text: "Som for all [presisjon](begrep:presisjon) må man beskrive hvilke betingelser som faktisk er endret eller holdt faste. Reproduserbarhet er dermed alltid knyttet til en spesifisert forsøksramme." },
      { kind: "p", text: "Sammenligninger mellom laboratorier og egnethetsprøving kan gi informasjon om variasjon på dette nivået, men formålet med den konkrete studien avgjør hvordan resultatet skal tolkes." },
    ],
  },
  sources: [SOURCES.vim, SOURCES.eurachemValidation],
  status: "publisert",
};
