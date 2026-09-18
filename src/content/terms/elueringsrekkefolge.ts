import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const elueringsrekkefolge: PublishedTerm = {
  slug: "elueringsrekkefolge",
  title: "Elueringsrekkefølge",
  category: "separasjon",
  definition: "Rekkefølgen prøvekomponentene kommer ut av det kromatografiske systemet i.",
  aliases: ["elution order", "rekkefølge", "eluerer først"],
  explanation: [
    { kind: "p", text: "Elueringsrekkefølgen følger av hvor sterkt hver komponent holdes igjen under de aktuelle betingelsene. Den er derfor et resultat av metodebetingelsene, ikke en uforanderlig egenskap ved stoffene." },
    { kind: "p", text: "Endring av [stasjonærfase](begrep:stasjonarfase), [mobilfase](begrep:mobilfase), temperatur eller [gradient](begrep:gradient) kan endre rekkefølgen, og to topper kan i noen tilfeller bytte plass." },
  ],
  demo: "elueringsrekkefolge-lop",
  depth: {
    title: "Dybde: rekkefølgen er metodeavhengig",
    blocks: [
      { kind: "p", text: "I en gitt metode kan elueringsrekkefølgen være svært reproduserbar og nyttig for tolkning. Men den bør ikke generaliseres ukritisk til en annen kolonne eller andre betingelser." },
      { kind: "p", text: "Hvis to forbindelser har nesten lik retensjon, kan små endringer i selektivitet være nok til å endre både [separasjonsfaktoren](begrep:selektivitetsfaktor) og hvilken topp som kommer først." },
    ],
  },
  sources: [SOURCES.iupacChromatography, SOURCES.iupacStationaryPhase],
  status: "publisert",
};