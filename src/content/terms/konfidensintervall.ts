import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const konfidensintervall: PublishedTerm = {
  slug: "konfidensintervall",
  title: "Konfidensintervall",
  category: "statistikk",
  definition: "Et intervall beregnet med en metode som ved gjentatt prøvetaking vil dekke den aktuelle populasjonsparameteren med en angitt andel av tilfellene, for eksempel 95 %.",
  aliases: ["confidence interval", "CI", "KI", "95 %", "confidence limits", "konfidensgrenser"],
  explanation: [
    { kind: "p", text: "Et 95 % konfidensintervall er knyttet til metoden som lager intervallet: dersom forsøket gjentas mange ganger under samme modellforutsetninger, vil omtrent 95 % av intervallene dekke den sanne parameteren." },
    { kind: "p", text: "Etter at ett bestemt intervall er beregnet, er parameteren enten innenfor eller utenfor intervallet. I klassisk frekventistisk statistikk sier man derfor ikke at dette ferdige intervallet har 95 % sannsynlighet for å inneholde parameteren." },
  ],
  demo: "konfidensintervall-repetisjon",
  depth: {
    title: "Dybde: bredde, utvalgsstørrelse og t-fordeling",
    blocks: [
      { kind: "p", text: "For et intervall rundt et [gjennomsnitt](begrep:gjennomsnitt) blir intervallet vanligvis smalere når antall uavhengige observasjoner øker, og bredere når [standardavviket](begrep:standardavvik) er større." },
      { kind: "p", text: "Når populasjonens standardavvik er ukjent, brukes ofte en t-fordeling med passende [frihetsgrader](begrep:frihetsgrader). Ved få observasjoner gir dette bredere intervaller enn en normaltilnærming." },
      { kind: "p", text: "Konfidensnivået 1 − α er komplementært til [signifikansnivået](begrep:signifikansniva) α for tilsvarende tosidige tester, men et konfidensintervall gir ofte mer informasjon enn bare en ja/nei-beslutning." },
    ],
  },
  sources: [SOURCES.nistConfidenceIntervals, SOURCES.iupacConfidenceLevel, SOURCES.iupacConfidenceLimits],
  status: "publisert",
};
