import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const korrelasjon: PublishedTerm = {
  slug: "korrelasjon",
  title: "Korrelasjonskoeffisient",
  category: "statistikk",
  definition: "Pearsons korrelasjonskoeffisient r er et tall mellom −1 og 1 som beskriver styrken og retningen på en lineær sammenheng mellom to størrelser.",
  aliases: ["correlation coefficient", "Pearson r", "korrelasjon", "r", "samvariasjon"],
  explanation: [
    { kind: "p", text: "Pearsons r nær +1 betyr sterk positiv lineær samvariasjon, r nær −1 sterk negativ lineær samvariasjon, og r nær 0 liten lineær samvariasjon." },
    { kind: "p", text: "r nær 0 utelukker ikke en sterk ikke-lineær sammenheng. Korrelasjon beskriver heller ikke i seg selv årsakssammenheng." },
  ],
  demo: "korrelasjon-monstre",
  depth: {
    title: "Dybde: \\(r\\), \\(R^2\\) og hvorfor grafen fortsatt er nødvendig",
    blocks: [
      { kind: "p", text: "Korrelasjonskoeffisienten standardiserer samvariasjonen med spredningen i x og y. Dermed er den enhetsløs og uendret ved lineær skalering av variablene." },
      { kind: "p", text: "Ved enkel lineær [regresjon](begrep:regresjon) med konstantledd er \\(R^2 = r^2\\), men dette gjør ikke \\(r\\) eller \\(R^2\\) til en generell test av modellens egnethet. Residualer og modellforutsetninger må fortsatt vurderes." },
      { kind: "p", text: "En enkelt [uteligger](begrep:uteligger) kan endre r kraftig. Derfor bør et spredningsplott alltid vurderes sammen med koeffisienten." },
    ],
  },
  sources: [SOURCES.iupacCorrelationCoefficient],
  status: "publisert",
};
