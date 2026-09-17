import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const linearitet: PublishedTerm = {
  slug: "linearitet",
  title: "Linearitet",
  category: "kalibrering",
  definition: "I hvilken grad en lineær modell beskriver sammenhengen mellom analyttnivå og målerespons innen et angitt område.",
  aliases: ["linearity", "kurve", "regresjon", "R²", "residualer", "kalibreringskurve"],
  explanation: [
    { kind: "p", text: "En lineær kalibrering betyr at like endringer i konsentrasjon gir like endringer i forventet respons. Responsen trenger ikke gå gjennom null, så «dobbel konsentrasjon gir dobbelt signal» gjelder bare i særtilfellet der konstantleddet er null." },
    { kind: "p", text: "Det viktige er om den valgte kalibreringsmodellen beskriver data godt nok i området metoden skal brukes. Krumning, metning eller andre systematiske avvik kan gjøre en rett linje uegnet." },
  ],
  demo: "linearitet-kurve",
  depth: {
    title: "Dybde: residualer, R² og valg av regresjonsmodell",
    blocks: [
      { kind: "p", text: "Et høyt R² er ikke i seg selv dokumentasjon på linearitet. Residualer, tilbakeberegnede kalibratorer og faglig relevante akseptkriterier gir mer direkte informasjon om hvor modellen avviker." },
      { kind: "p", text: "Dersom variansen endrer seg med nivået, kan vektet regresjon være hensiktsmessig. Valget av vekter, for eksempel 1/x eller 1/x², bør begrunnes med data og modellatferd fremfor å brukes automatisk." },
      { kind: "p", text: "Et validert arbeidsområde avgrenses av mer enn linearitet alene; presisjon, skjevhet og kvantifiseringsevne må også være tilstrekkelige i området." },
    ],
  },
  sources: [SOURCES.eurachem2025],
  status: "publisert",
};
