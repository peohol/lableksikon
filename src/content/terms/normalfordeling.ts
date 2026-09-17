import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const normalfordeling: PublishedTerm = {
  slug: "normalfordeling",
  title: "Normalfordeling",
  category: "statistikk",
  definition: "En symmetrisk, unimodal sannsynlighetsfordeling bestemt av middelverdien μ og standardavviket σ.",
  aliases: ["normal distribution", "Gauss", "Gaussian", "klokkekurve", "bell curve"],
  explanation: [
    { kind: "p", text: "Normalfordelingen har én topp og er symmetrisk rundt middelverdien. Omtrent 68 % av fordelingen ligger innenfor ±1 standardavvik, 95 % innenfor omtrent ±2 og 99,7 % innenfor omtrent ±3." },
    { kind: "p", text: "At et histogram ser klokkeformet ut er ikke i seg selv bevis på normalfordeling. Fordelingsantakelser bør vurderes i lys av datamengde, grafikk og formålet med analysen." },
  ],
  demo: "normalfordeling-spredning",
  depth: {
    title: "Dybde: data, residualer og sentralgrenseteoremet",
    blocks: [
      { kind: "p", text: "Mange klassiske statistiske metoder bruker en normalitetsantakelse, men det er ofte feilledd eller residualer som forutsettes normalfordelt — ikke nødvendigvis selve rådataene." },
      { kind: "p", text: "Sentralgrenseteoremet forklarer hvorfor fordelingen til et [gjennomsnitt](begrep:gjennomsnitt) kan nærme seg normalfordeling når utvalgsstørrelsen øker, selv om enkeltobservasjonene ikke er normalfordelte." },
      { kind: "p", text: "[t-test](begrep:ttest), klassisk [F-test](begrep:ftest) og enkelte tester for [uteliggere](begrep:uteligger) bygger på fordelingsantakelser som bør kontrolleres før resultatene tolkes." },
    ],
  },
  sources: [SOURCES.nistNormalDistribution],
  status: "publisert",
};
