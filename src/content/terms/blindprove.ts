import type { PublishedTerm } from "../schema";

export const blindprove: PublishedTerm = {
  slug: "blindprove",
  title: "Blindprøve",
  category: "kalibrering",
  definition:
    "En prøve uten analytten, som viser hva metoden gir når svaret skal være ingenting.",
  aliases: ["blank", "nullprøve", "reagensblank", "metodeblank", "matriksblank"],
  explanation: [
    {
      kind: "p",
      text: "En blindprøve er en prøve du vet ikke inneholder stoffet du leter etter. Den går gjennom nøyaktig samme behandling som de virkelige prøvene, og forteller deg hva instrumentet svarer når svaret skal være ingenting.",
    },
    {
      kind: "p",
      text: "Får blindprøven et signal, kommer det fra utstyret, reagensene eller lokalet — ikke fra prøven. Det er derfor det finnes flere typer, og hvilken du velger bestemmer hva du faktisk får kontrollert.",
    },
  ],
  demo: "blindprove-typer",
  depth: {
    title: "Dybde: blankkorreksjon og blankverdiens plass i grensene",
    blocks: [
      {
        kind: "p",
        text: "Blankverdien trekkes fra prøvesignalet når bidraget er stabilt og kjent. Er den ustabil, er spredningen i blankene viktigere enn nivået: det er nettopp s_blank som setter [deteksjonsgrensen](begrep:deteksjonsgrense).",
      },
      {
        kind: "p",
        text: "Blindprøver kjøres med i hver analyseserie, ikke bare ved validering, og resultatene føres på kontrollkort slik at en gradvis økning oppdages før den ødelegger en serie.",
      },
    ],
  },
  status: "publisert",
};
