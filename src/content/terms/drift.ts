import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const drift: PublishedTerm = {
  slug: "drift",
  title: "Drift",
  category: "kalibrering",
  definition: "En kontinuerlig eller trinnvis endring over tid i instrumentets indikasjon som skyldes endringer i instrumentets metrologiske egenskaper.",
  aliases: ["instrumental drift", "signaldrift", "glidning", "ustabilitet", "time drift"],
  explanation: [
    { kind: "p", text: "Hvis den samme stabile prøven gir gradvis høyere eller lavere respons gjennom en analyseserie, kan instrumentell drift være en forklaring. VIM presiserer at drift ikke skyldes en reell endring i størrelsen som måles eller en kjent påvirkningsstørrelse." },
    { kind: "p", text: "Drift kan endre [kalibreringsrelasjonen](begrep:kalibreringskurve) etter at den ble etablert. Kalibratorer, [kontrollprøver](begrep:kontrollprove), internstandarder og passende sekvensdesign kan brukes til å oppdage eller håndtere slik endring." },
  ],
  demo: "drift-tidsserie",
  depth: {
    title: "Dybde: drift, stabilitet og korreksjon",
    blocks: [
      { kind: "p", text: "VIM skiller instrumentell drift fra stabilitet: stabilitet er instrumentets evne til å holde metrologiske egenskaper konstante over tid, mens drift beskriver selve tidsendringen i indikasjonen." },
      { kind: "p", text: "En korreksjon for drift er bare forsvarlig dersom tidsutviklingen kan estimeres pålitelig. Interpolasjon mellom kalibratorer eller kontrollpunkter kan fungere i noen metoder, men kan skjule brå feil dersom modellen ikke passer hendelsesforløpet." },
      { kind: "p", text: "Drift bør derfor skilles fra tilfeldig [presisjon](begrep:presisjon), fra [matriseeffekt](begrep:matriseeffekt) og fra endringer i selve prøven." },
    ],
  },
  sources: [SOURCES.vimInstrumentalDrift, SOURCES.eurachemQac2016],
  status: "publisert",
};
