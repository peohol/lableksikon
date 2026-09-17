import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const gjenvinning: PublishedTerm = {
  slug: "gjenvinning",
  title: "Gjenvinning",
  category: "kvalitet",
  definition: "Et forholdstall som beskriver hvor mye av en kjent referanse- eller tilsettingsmengde som gjenfinnes ved målingen.",
  aliases: ["recovery", "spike recovery", "utbytte", "tilsetning", "spiking"],
  explanation: [
    { kind: "p", text: "En vanlig test er å måle prøven, tilsette en kjent mengde analytt og måle på nytt. Hvis økningen i resultat er mindre enn det som ble tilsatt, er spike-gjenvinningen under 100 %." },
    { kind: "p", text: "Gjenvinning brukes til å undersøke mulig [skjevhet](begrep:skjevhet), men ordet brukes om flere ulike størrelser. Det må derfor være tydelig om man mener målt gjenvinning mot en referanse, spike-gjenvinning eller fysisk ekstraksjonsutbytte." },
  ],
  demo: "gjenvinning-spike",
  depth: {
    title: "Dybde: hvorfor «recovery» må kvalifiseres",
    blocks: [
      { kind: "p", text: "IUPAC anbefaler at betydningen oppgis fordi «recovery» brukes både om recovered quantity value ratio og om material recovery. Ved spike-forsøk estimeres målegjenvinning fra endringen etter tilsetting av kjent mengde." },
      { kind: "p", text: "En god spike-gjenvinning beviser ikke alene at metoden er uten skjevhet. Spike kan oppføre seg annerledes enn analytt som allerede er bundet eller fordelt i den opprinnelige prøven." },
    ],
  },
  sources: [SOURCES.iupacRecovery, SOURCES.eurachem2025],
  status: "publisert",
};
