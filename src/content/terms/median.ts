import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const median: PublishedTerm = {
  slug: "median",
  title: "Median",
  category: "statistikk",
  definition: "Den midterste verdien i sorterte data, eller gjennomsnittet av de to midterste når antallet observasjoner er partall.",
  aliases: ["median", "midtverdi", "50-persentil", "50th percentile"],
  explanation: [
    { kind: "p", text: "Sorter verdiene først. I serien 2, 4, 7, 9, 30 er medianen 7. I serien 2, 4, 7, 9 er medianen (4 + 7) / 2 = 5,5." },
    { kind: "p", text: "Fordi medianen bestemmes av rangeringen og ikke av hvor langt ytterverdiene ligger unna, påvirkes den mindre av [uteliggere](begrep:uteligger) enn [gjennomsnittet](begrep:gjennomsnitt)." },
  ],
  demo: "median-sortering",
  depth: {
    title: "Dybde: robust betyr ikke alltid best",
    blocks: [
      { kind: "p", text: "Medianen er et robust sentralmål og er ofte nyttig ved skjeve data eller ekstreme observasjoner. Det gjør den ikke automatisk bedre enn gjennomsnittet; valget avhenger av fordelingen og hva man ønsker å beskrive." },
      { kind: "p", text: "I symmetriske fordelinger kan gjennomsnitt og median ligge nær hverandre. I en [normalfordeling](begrep:normalfordeling) sammenfaller populasjonens gjennomsnitt og median." },
      { kind: "p", text: "Medianen bevarer mindre informasjon om avstandene mellom observasjonene enn gjennomsnittet og inngår derfor ikke på samme måte i klassiske beregninger av varians og standardfeil." },
    ],
  },
  sources: [SOURCES.iupacMedian, SOURCES.nistMeasuresLocation],
  status: "publisert",
};
