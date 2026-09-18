import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const dodvolum: PublishedTerm = {
  slug: "dodvolum",
  title: "Dødvolum",
  category: "separasjon",
  definition: "En tvetydig og frarådet kromatografiterm som ofte brukes om ekstrakolonnevolum, men også feilaktig om andre volum.",
  aliases: ["dead volume", "void volume", "ekstrakolonnevolum", "hold-up volume"],
  explanation: [
    { kind: "p", text: "IUPAC fraråder «dead-volume» fordi ordet brukes inkonsekvent. Strengt tatt skulle det beskrive volum som ikke skylles av mobilfasen, mens det i praksis ofte brukes om ekstrakolonnevolum som mobilfasen faktisk strømmer gjennom." },
    { kind: "p", text: "Hvis man mener volumet eller tiden en ikke-retinert komponent bruker gjennom systemet, er hold-up-volum eller hold-up-tid mer presist. Hvis man mener slanger, injektor og detektor utenfor kolonnen, bør man si ekstrakolonnevolum." },
  ],
  demo: "dodvolum-begreper",
  depth: {
    title: "Dybde: hold-up-volum er ikke det samme som «dødvolum»",
    blocks: [
      { kind: "p", text: "Hold-up-volum VM er knyttet til en komponent som ikke retineres av [stasjonærfasen](begrep:stasjonarfase). Den tilsvarende hold-up-tiden tM inngår når total [retensjonstid](begrep:retensjonstid) deles i en mobilfase-del og en justert retensjonsdel." },
      { kind: "p", text: "Ekstrakolonnevolum kan bidra til ekstra båndspredning og dermed større [toppbredde](begrep:toppbredde). Presis terminologi gjør det tydelig hvilken fysisk del av systemet som diskuteres." },
    ],
  },
  sources: [SOURCES.iupacDeadVolume, SOURCES.iupacHoldUpVolume],
  status: "publisert",
};