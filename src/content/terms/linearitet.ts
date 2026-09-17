import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const linearitet: PublishedTerm = {
  slug: "linearitet",
  title: "Linearitet",
  category: "kalibrering",
  definition: "Hvor godt målesystemets respons kan beskrives som en lineær funksjon av analyttnivået innen et angitt område.",
  aliases: ["kurve", "regresjon", "R²", "residualer", "metning", "rett linje", "kalibreringskurve"],
  explanation: [
    {
      kind: "p",
      text: "Hvis signalet øker omtrent proporsjonalt når analyttnivået øker, kan sammenhengen ofte beskrives med en rett linje i det aktuelle området. Da kan en lineær kalibreringsmodell brukes til å beregne ukjente nivåer.",
    },
    {
      kind: "p",
      text: "I praksis kan responsen bøye av ved lave eller høye nivåer, for eksempel på grunn av bakgrunnsbidrag eller metning. Da må arbeidsområdet begrenses eller en annen egnet modell brukes.",
    },
  ],
  demo: "linearitet-kurve",
  depth: {
    title: "Dybde: residualer, modellvalg og hvorfor R² ikke er nok",
    blocks: [
      {
        kind: "p",
        text: "Et høyt R² er ikke i seg selv dokumentasjon på linearitet. Et systematisk mønster i residualene kan vise at en lineær modell er feil selv når R² ligger svært nær 1.",
      },
      {
        kind: "p",
        text: "Arbeidsområdet er området der metoden er dokumentert å ha egnet ytelse for formålet. Nedre grense bestemmes derfor ikke automatisk av [deteksjonsgrensen](begrep:deteksjonsgrense); for kvantitativ bruk er blant annet kvantifiseringsevne og krav til presisjon og skjevhet relevante.",
      },
      {
        kind: "p",
        text: "Når variansen endrer seg med nivået, kan vektet regresjon være mer egnet enn uvektet minste kvadraters regresjon. Valg av vekting bør begrunnes ut fra data og modellens ytelse, ikke brukes mekanisk.",
      },
    ],
  },
  sources: [SOURCES.eurachemValidation],
  status: "publisert",
};
