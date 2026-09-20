import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const signifikansniva: PublishedTerm = {
  slug: "signifikansniva",
  title: "Signifikansnivå",
  category: "statistikk",
  definition: "En forhåndsvalgt grense for sannsynligheten for å forkaste nullhypotesen når den faktisk er sann, under modellforutsetningene for testen.",
  aliases: ["significance level", "alpha", "α", "0,05", "5 %", "type I error"],
  explanation: [
    { kind: "p", text: "Velger man \\(\\alpha = 0{,}05\\), aksepterer testprosedyren en langsiktig risiko på opptil 5 % for type-I-feil når nullhypotesen er sann og forutsetningene holder." },
    { kind: "p", text: "Signifikansnivået er ikke det samme som p-verdien. \\(\\alpha\\) velges før analysen; p-verdien beregnes fra dataene og sammenlignes ofte med \\(\\alpha\\)." },
  ],
  demo: "signifikansniva-hale",
  depth: {
    title: "Dybde: statistisk signifikans er ikke praktisk betydning",
    blocks: [
      { kind: "p", text: "Et resultat kan være statistisk signifikant selv om forskjellen er liten og uten praktisk betydning, særlig ved store utvalg. Omvendt kan en viktig effekt være dårlig bestemt i et lite utvalg." },
      { kind: "p", text: "Valg av \\(\\alpha\\) bør derfor skilles fra vurdering av effektstørrelse, [konfidensintervall](begrep:konfidensintervall), måleusikkerhet og faglige beslutningsgrenser." },
      { kind: "p", text: "Å observere p < 0,05 betyr heller ikke at det er mindre enn 5 % sannsynlighet for at nullhypotesen er sann. p-verdien er beregnet under antakelsen om at nullhypotesen er sann." },
    ],
  },
  sources: [SOURCES.nistSignificance, SOURCES.iupacConfidenceLevel],
  status: "publisert",
};
