import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const minstekvadrater: PublishedTerm = {
  slug: "minstekvadrater",
  title: "Minste kvadraters metode",
  category: "statistikk",
  definition: "En metode for å estimere modellparametere ved å minimere summen av kvadrerte forskjeller mellom observerte og modellpredikerte verdier.",
  aliases: ["least squares", "OLS", "ordinary least squares", "LS", "kvadratavvik", "residualsum"],
  explanation: [
    { kind: "p", text: "For hvert datapunkt beregnes et residual: observert minus predikert verdi. Residualene kvadreres og summeres, og parameterne velges slik at denne summen blir minst mulig." },
    { kind: "p", text: "Kvadreringen gjør at positive og negative residualer ikke opphever hverandre, og at store avvik får stor innflytelse på tilpasningen." },
  ],
  demo: "minstekvadrater-residualer",
  depth: {
    title: "Dybde: OLS, vekting og modellforutsetninger",
    blocks: [
      { kind: "p", text: "Vanlig minste kvadraters regresjon, OLS, gir alle observasjoner samme vekt og bygger i sin standardform på at feilet ligger i responsvariabelen og har konstant varians gjennom området." },
      { kind: "p", text: "Hvis variansen endres systematisk med nivået, kan [vektet regresjon](begrep:vektet) være mer hensiktsmessig. Da minimeres en vektet sum av kvadrerte residualer i stedet." },
      { kind: "p", text: "Minste kvadraters metode kan brukes både i lineære og ikke-lineære modeller. Den må derfor ikke forveksles med [regresjon](begrep:regresjon) som sådan eller med kravet om at sammenhengen skal være en rett linje." },
    ],
  },
  sources: [SOURCES.iupacLeastSquares, SOURCES.iupacOrdinaryLeastSquares, SOURCES.nistLinearLeastSquares],
  status: "publisert",
};
