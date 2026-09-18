import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const ekstraksjon: PublishedTerm = {
  slug: "ekstraksjon",
  title: "Ekstraksjon",
  category: "provetaking",
  definition: "Overføring av analytten fra prøvens opprinnelige matriks til en annen fase som er egnet for videre behandling eller måling.",
  aliases: ["extraction", "utvinning", "væske-væske", "SPE", "solvent extraction"],
  explanation: [
    { kind: "p", text: "Ekstraksjon brukes blant annet for å skille analytten fra komponenter som kan forstyrre målingen, og for å gjøre analytten tilgjengelig i en fase som passer den videre analysen." },
    { kind: "p", text: "Væske-væske-ekstraksjon fordeler stoffet mellom to ikke-blandbare væskefaser. Andre ekstraksjoner kan bruke en fast sorbent, en væske mot et fast materiale eller andre prinsipper. «Ekstraksjon» er derfor et samlebegrep, ikke én enkelt prosedyre." },
  ],
  demo: "ekstraksjon-faseoverforing",
  depth: {
    title: "Dybde: ekstraksjon handler om fordeling, ikke automatisk full gjenvinning",
    blocks: [
      { kind: "p", text: "Mengden analytt som flyttes avhenger blant annet av likevekter, fasevolumer, pH, ioniseringstilstand og antall ekstraksjonstrinn. En ekstraksjon kan derfor gi mindre enn 100 % [gjenvinning](begrep:gjenvinning) uten at prosedyren nødvendigvis er ubrukelig." },
      { kind: "p", text: "Ekstraksjonen kan også endre [matriseeffekten](begrep:matriseeffekt) ved å fjerne eller samtidig ekstrahere andre komponenter. Det er den samlede metodeytelsen som avgjør om opparbeidingen er egnet." },
    ],
  },
  sources: [SOURCES.iupacSolventExtraction, SOURCES.iupacLiquidLiquidExtraction, SOURCES.iupacSamplePretreatment],
  status: "publisert",
};