import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const mobilfase: PublishedTerm = {
  slug: "mobilfase",
  title: "Mobilfase",
  category: "separasjon",
  definition: "Fasen som beveger seg gjennom eller langs den stasjonære fasen og transporterer prøvekomponentene.",
  aliases: ["eluent", "bæregass", "carrier gas", "mobile phase"],
  explanation: [
    { kind: "p", text: "I væskekromatografi er mobilfasen en væske, i gasskromatografi en gass, og i superkritisk væskekromatografi et superkritisk fluid. I elueringskromatografi brukes også ordet eluent." },
    { kind: "p", text: "Hvor raskt et stoff beveger seg, bestemmes av samspillet mellom mobilfasen og [stasjonærfasen](begrep:stasjonarfase). Stoff som foretrekker mobilfasen, transporteres raskere gjennom systemet." },
  ],
  demo: "mobilfase-bevegelse",
  depth: {
    title: "Dybde: transportfasen i kromatografi",
    blocks: [
      { kind: "p", text: "Mobilfasens sammensetning, strømningshastighet, temperatur og andre betingelser kan påvirke retensjon og separasjon. Derfor er mobilfasen en del av den kromatografiske metoden, ikke bare et transportmedium." },
      { kind: "p", text: "I [gradienteluering](begrep:gradient) endres mobilfasens sammensetning under analysen. Ved [isokratisk eluering](begrep:isokratisk) holdes den konstant." },
    ],
  },
  sources: [SOURCES.iupacMobilePhase],
  status: "publisert",
};