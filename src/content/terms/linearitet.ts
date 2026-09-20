import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const linearitet: PublishedTerm = {
  slug: "linearitet",
  title: "Linearitet",
  category: "kalibrering",
  definition: "I hvilken grad den valgte kalibreringsmodellen beskriver kalibreringsdataene uten systematiske avvik innen et angitt område.",
  aliases: ["linearity", "calibration linearity", "kurve", "regresjon", "R²", "residualer", "kalibreringskurve"],
  explanation: [
    { kind: "p", text: "Begrepet brukes litt ulikt. IUPAC skiller mellom linearitet i et målesystem og «linearity of calibration». For en kalibrering er kjernen hvor godt observerte kalibratorresponser stemmer med responsene som den valgte [kalibreringsfunksjonen](begrep:kalibreringskurve) predikerer." },
    { kind: "p", text: "Ordet er historisk: kalibreringsmodellen kan også være ikke-lineær. Derfor bør man undersøke residualer og modelltilpasning i stedet for å anta at en rett linje alltid er riktig." },
  ],
  demo: "linearitet-kurve",
  depth: {
    title: "Dybde: residualer, \\(R^2\\) og valg av regresjonsmodell",
    blocks: [
      { kind: "p", text: "Et høyt \\(R^2\\) er ikke i seg selv dokumentasjon på god kalibreringslinearitet. Residualer, tilbakeberegnede kalibratorer og faglig relevante akseptkriterier gir mer direkte informasjon om hvor modellen avviker." },
      { kind: "p", text: "Dersom variansen endrer seg med nivået, kan [vektet regresjon](begrep:vektet) være hensiktsmessig. Valget av vekter, for eksempel \\(1/x\\) eller \\(1/x^2\\), bør begrunnes med data og modellatferd fremfor å brukes automatisk." },
      { kind: "p", text: "Et validert [arbeidsområde](begrep:arbeidsomrade) avgrenses av mer enn modelltilpasning alene; presisjon, skjevhet og kvantifiseringsevne må også være tilstrekkelige i området." },
    ],
  },
  sources: [SOURCES.iupacLinearityCalibration, SOURCES.iupacLinearitySystem, SOURCES.eurachem2025],
  status: "publisert",
};
