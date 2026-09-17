import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const kontrollprove: PublishedTerm = {
  slug: "kontrollprove",
  title: "Kontrollprøve",
  category: "kalibrering",
  definition: "Et kontrollmateriale med forventet eller tildelt verdi som analyseres for å overvåke om måleprosedyren fortsetter å yte som forventet.",
  aliases: ["QC", "quality control sample", "kontrollmateriale", "QC sample", "kontroll"],
  explanation: [
    { kind: "p", text: "En kontrollprøve behandles som en prøve og sammenlignes med forhåndsdefinerte krav. Formålet er å oppdage endringer som [drift](begrep:drift), skjevhet eller økt tilfeldig variasjon før ukjente prøver rapporteres." },
    { kind: "p", text: "Kontrollen bør så langt som praktisk mulig gi informasjon som er uavhengig av [kalibreringen](begrep:kalibreringskurve). Hvis nøyaktig samme løsning brukes både til å kalibrere og kontrollere, kan enkelte feil passere ubemerket." },
  ],
  demo: "kontrollprove-vakt",
  depth: {
    title: "Dybde: kontrollprøve, kalibrator og kontrollkort",
    blocks: [
      { kind: "p", text: "En kalibrator etablerer relasjonen mellom respons og referanseverdi. En kontrollprøve undersøker om systemet etter kalibrering leverer resultater som møter et krav. Rollene er derfor forskjellige selv om materialene kan ligne." },
      { kind: "p", text: "Resultater fra en stabil kontrollprøve over tid kan legges inn i et [kontrollkort](begrep:kontrollkort). Kontrollgrenser i et slikt kort beskriver prosessens statistiske oppførsel og skal ikke uten videre forveksles med metodens akseptgrenser." },
      { kind: "p", text: "Antall nivåer, frekvens og akseptkriterier bør bestemmes av metode, risiko, serielengde og krav til resultatene; det finnes ikke én universell QC-oppskrift for alle analyser." },
    ],
  },
  sources: [SOURCES.eurachemQac2016, SOURCES.eurachem2025],
  status: "publisert",
};
