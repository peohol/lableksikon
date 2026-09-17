import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const arbeidsomrade: PublishedTerm = {
  slug: "arbeidsomrade",
  title: "Arbeidsområde",
  category: "kalibrering",
  definition: "Intervallet av analyttverdier der målesystemet, under definerte betingelser, gir måleresultater med akseptabel måleusikkerhet.",
  aliases: ["working interval", "working range", "måleområde", "range", "gyldighetsområde"],
  explanation: [
    { kind: "p", text: "Arbeidsområdet forteller hvor lave og høye analyttverdier metoden er dokumentert å håndtere godt nok. Det er et ytelsesområde for måleresultater, ikke bare området der instrumentet klarer å vise et signal." },
    { kind: "p", text: "IUPAC knytter den nedre og øvre grensen til [kvantifiseringsgrensene](begrep:kvantifiseringsgrense). Den nedre grensen skal ikke forveksles med [deteksjonsgrensen](begrep:deteksjonsgrense)." },
  ],
  demo: "arbeidsomrade-grenser",
  depth: {
    title: "Dybde: arbeidsområde er bredere enn lineært område",
    blocks: [
      { kind: "p", text: "Et [lineært](begrep:linearitet) intervall beskriver modellatferd, mens arbeidsområdet beskriver hvor måleresultatet er egnet. En metode kan derfor ha et arbeidsområde som ikke er lineært dersom en annen kalibreringsmodell fungerer tilfredsstillende." },
      { kind: "p", text: "Ved validering må ytelsen vurderes gjennom hele området. Relevante størrelser kan blant annet være presisjon, skjevhet, måleusikkerhet, selektivitet og kalibreringsmodellens egnethet." },
      { kind: "p", text: "Prøvefortynning eller konsentrering kan utvide hvilke opprinnelige prøvenivåer laboratoriet kan håndtere, men det endrer ikke automatisk instrumentets eller måleprosedyrenes dokumenterte arbeidsområde." },
    ],
  },
  sources: [SOURCES.iupacWorkingInterval, SOURCES.eurachem2025],
  status: "publisert",
};
