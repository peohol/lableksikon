import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const selektivitet: PublishedTerm = {
  slug: "selektivitet",
  title: "Selektivitet",
  category: "kvalitet",
  definition: "Evnen til å bestemme analytten pålitelig i nærvær av andre relevante komponenter som kan påvirke målingen.",
  aliases: ["selectivity", "interferens", "spesifisitet", "forstyrrelse"],
  explanation: [
    { kind: "p", text: "En blodprøve inneholder langt mer enn stoffet vi vil måle. En selektiv metode klarer å gi riktig informasjon om analytten selv når andre forbindelser er til stede." },
    { kind: "p", text: "Hvis en annen komponent bidrar til samme signal eller påvirker analyttens respons, har vi en interferens. Selektivitet må derfor vurderes mot de interferentene og den [matriksen](begrep:matriseeffekt) som faktisk er relevante for bruken." },
  ],
  demo: "selektivitet-interferens",
  depth: {
    title: "Dybde: selektivitet er alltid knyttet til en måleprosedyre",
    blocks: [
      { kind: "p", text: "VIM beskriver selektivitet som en egenskap ved et målesystem brukt med en spesifisert måleprosedyre, slik at verdien for én eller flere målestørrelser oppnås uavhengig av andre relevante størrelser." },
      { kind: "p", text: "I analytisk kjemi vurderes selektivitet blant annet med representative blanker, matrikser, potensielle interferenter og alternative separasjons- eller deteksjonsbetingelser." },
    ],
  },
  sources: [SOURCES.vimSelectivity, SOURCES.eurachem2025],
  status: "publisert",
};
