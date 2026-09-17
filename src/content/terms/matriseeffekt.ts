import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const matriseeffekt: PublishedTerm = {
  slug: "matriseeffekt",
  title: "Matriseeffekt",
  category: "prove",
  definition: "Den samlede påvirkningen fra andre komponenter i prøven enn analytten på målingen av analytten.",
  aliases: ["matrix effect", "matriks", "ionesuppresjon", "ioneforsterkning", "suppresjon"],
  explanation: [
    { kind: "p", text: "Blod, urin, jord og mat inneholder mange komponenter som kan endre hvordan analytten ekstraheres, separeres eller registreres. Samme analyttmengde kan derfor gi ulik respons i rent løsemiddel og i en reell prøve." },
    { kind: "p", text: "Hvis én bestemt komponent kan identifiseres som årsaken, omtales den gjerne som en interferent. Matriseeffekt er det bredere begrepet for den samlede påvirkningen fra alt annet i prøven." },
  ],
  demo: "matriseeffekt-matrikser",
  depth: {
    title: "Dybde: additiv og multiplikativ matriseeffekt",
    blocks: [
      { kind: "p", text: "En additiv matriseeffekt påvirker hovedsakelig bakgrunn eller konstantledd, mens en multiplikativ effekt endrer responsens stigning. [Standardaddisjon](begrep:standardaddisjon) kan kompensere en multiplikativ matriseeffekt når forutsetningene er oppfylt." },
      { kind: "p", text: "I LC-MS er ionedemping og ioneforsterkning viktige eksempler, men matriseeffekt er ikke begrenset til ionekilden eller massespektrometri." },
      { kind: "p", text: "Matrikstilpasset kalibrering og en godt egnet [internstandard](begrep:internstandard) kan redusere konsekvensene, men må dokumenteres for den aktuelle analytten og prøvetypen." },
    ],
  },
  sources: [SOURCES.iupacMatrixEffect, SOURCES.eurachem2025],
  status: "publisert",
};
