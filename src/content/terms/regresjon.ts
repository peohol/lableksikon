import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const regresjon: PublishedTerm = {
  slug: "regresjon",
  title: "Regresjon",
  category: "statistikk",
  definition: "Statistisk modellering av hvordan en responsvariabel henger sammen med én eller flere forklaringsvariabler.",
  aliases: ["regression", "lineær regresjon", "linear regression", "modelltilpasning", "prediction"],
  explanation: [
    { kind: "p", text: "Regresjon brukes til å beskrive, estimere eller predikere hvordan y endrer seg når x endrer seg. En rett linje er ett vanlig eksempel, men regresjonsmodeller kan også ha andre funksjonsformer." },
    { kind: "p", text: "[Minste kvadraters metode](begrep:minstekvadrater) er en vanlig måte å estimere modellparametere på. Den er en beregningsregel, mens regresjon er den bredere modelleringsoppgaven." },
  ],
  demo: "regresjon-modell",
  depth: {
    title: "Dybde: modellen er mer enn en linje gjennom punkter",
    blocks: [
      { kind: "p", text: "En regresjonsmodell består av en systematisk del og et feilledd. Antakelser om uavhengighet, varians og modellform må passe dataene dersom standardfeil, tester og intervaller skal tolkes på vanlig måte." },
      { kind: "p", text: "Residualer — observerte minus predikerte verdier — er sentrale for å undersøke om modellen viser krumning, heteroskedastisitet, [uteliggere](begrep:uteligger) eller andre systematiske avvik." },
      { kind: "p", text: "En sterk [korrelasjon](begrep:korrelasjon) betyr ikke at én bestemt regresjonsmodell er riktig, og regresjon alene etablerer ikke årsakssammenheng." },
    ],
  },
  sources: [SOURCES.iupacRegressionAnalysis, SOURCES.nistLinearLeastSquares, SOURCES.iupacLeastSquares],
  status: "publisert",
};
