import type { Category } from "./schema";

/**
 * Kategorirekkefølgen er redaksjonell og fast — ikke alfabetisk, ikke etter
 * størrelse. Den bestemmer både forsidens grid og den globale
 * forrige/neste-rekkefølgen.
 */
export const categories = [
  {
    slug: "kvalitet",
    name: "Kvalitet i måling",
    gloss: "Hvor mye kan vi stole på tallet?",
  },
  {
    slug: "kalibrering",
    name: "Kalibrering og kontroll",
    gloss: "Hvordan blir et signal til en konsentrasjon?",
  },
  {
    slug: "prove",
    name: "Prøven og omgivelsene",
    gloss: "Hva gjør prøven med selve målingen?",
  },
  {
    slug: "statistikk",
    name: "Statistikk og beregning",
    gloss: "Regnestykkene bak resultatet.",
  },
  {
    slug: "separasjon",
    name: "Separasjon",
    gloss: "Å skille stoffene fra hverandre før de måles.",
  },
  {
    slug: "deteksjon",
    name: "Deteksjon og måleprinsipp",
    gloss: "Hvordan signalet i det hele tatt oppstår.",
  },
  {
    slug: "provetaking",
    name: "Prøvetaking og opparbeiding",
    gloss: "Alt som skjer før instrumentet.",
  },
  {
    slug: "kvalitetssikring",
    name: "Kvalitetssikring",
    gloss: "Hvordan laboratoriet viser at det holder mål.",
  },
  {
    slug: "enheter",
    name: "Enheter og referansemateriale",
    gloss: "Tallene og det de måles mot.",
  },
  {
    slug: "feilkilder",
    name: "Feilkilder",
    gloss: "Når noe faktisk går galt.",
  },
] as const satisfies readonly Category[];

export type CategorySlug = (typeof categories)[number]["slug"];
