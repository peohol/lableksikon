import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const gjennomsnitt: PublishedTerm = {
  slug: "gjennomsnitt",
  title: "Gjennomsnitt",
  category: "statistikk",
  definition: "Summen av observasjonene dividert på antallet observasjoner.",
  aliases: ["arithmetic mean", "mean", "middelverdi", "snitt", "x-strek", "x̄"],
  explanation: [
    { kind: "p", text: "Gjennomsnittet samler en måleserie i ett sentralt tall. For verdiene 9, 10 og 11 er gjennomsnittet (9 + 10 + 11) / 3 = 10." },
    { kind: "p", text: "Gjennomsnittet bruker størrelsen på alle observasjonene og påvirkes derfor av ekstreme verdier. [Medianen](begrep:median) er ofte mindre følsom for slike observasjoner." },
  ],
  demo: "gjennomsnitt-balanse",
  depth: {
    title: "Dybde: utvalg, populasjon og robuste sentralmål",
    blocks: [
      { kind: "p", text: "Et utvalgsgjennomsnitt x̄ brukes ofte til å estimere en ukjent populasjonsmiddelverdi μ. Hvor presist estimatet er, avhenger blant annet av antall observasjoner og spredningen i dataene." },
      { kind: "p", text: "Ved symmetriske data uten sterke ekstremverdier beskriver gjennomsnittet ofte sentrum godt. Ved skjeve fordelinger eller [uteliggere](begrep:uteligger) kan median eller andre robuste mål beskrive en typisk verdi bedre." },
      { kind: "p", text: "Gjennomsnitt alene sier ingenting om spredningen. To datasett kan ha samme gjennomsnitt og svært forskjellig [standardavvik](begrep:standardavvik)." },
    ],
  },
  sources: [SOURCES.iupacArithmeticMean, SOURCES.nistMeasuresLocation],
  status: "publisert",
};
