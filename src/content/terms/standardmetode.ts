import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const standardmetode: PublishedTerm = {
  slug: "standardmetode",
  title: "Standardmetode",
  category: "kvalitetssikring",
  definition: "Her: en analyse- eller målemetode som er beskrevet i en publisert standard og skal følges innenfor standardens angitte bruksområde og betingelser.",
  aliases: ["standard method", "standardisert metode", "ISO-metode", "NS-EN", "normmetode"],
  explanation: [
    { kind: "p", text: "En standardmetode gir en felles, dokumentert prosedyre og kan også angi bruksområde, utstyr, beregninger og forventede ytelsesegenskaper. For empiriske metoder kan selve prosedyren være en del av definisjonen av hva som måles." },
    { kind: "p", text: "At en metode er publisert som standard betyr ikke at laboratoriet kan hoppe over lokal [verifisering](begrep:verifisering). Laboratoriet må fortsatt vise at det kan oppnå relevant ytelse for sin bruk." },
  ],
  demo: "standardmetode-verifisering",
  depth: {
    title: "Dybde: «standardmetode» er et tvetydig ord",
    blocks: [
      { kind: "p", text: "I laboratoriesammenheng brukes «standard method» ofte om en metode publisert i en nasjonal, internasjonal eller sektorspesifikk standard. Eurachem behandler slike metoder som etablerte metoder, men presiserer at egnet validering og lokal ytelse ikke skal tas for gitt." },
      { kind: "p", text: "IUPAC oppgir samtidig «standard method» som et synonym for standard operating procedure (SOP). Derfor bør dokumentasjon alltid gjøre klart om man mener en publisert normmetode eller en lokalt autorisert prosedyre." },
    ],
  },
  sources: [SOURCES.eurachemQac2026, SOURCES.iupacStandardOperatingProcedure],
  status: "publisert",
};
