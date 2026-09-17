import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const ettpunkts: PublishedTerm = {
  slug: "ettpunkts",
  title: "Ettpunktskalibrering",
  category: "kalibrering",
  definition: "En kalibreringsstrategi der én kalibrator brukes til å fastsette eller kontrollere en kalibreringsrelasjon ved ett kjent analyttnivå.",
  aliases: ["single-point calibration", "ett punkt", "énpunktskalibrering", "single level"],
  explanation: [
    { kind: "p", text: "Ettpunktskalibrering bruker mindre informasjon i den aktuelle analyseserien enn en flerpunktkalibrering. Derfor må formen på [kalibreringskurven](begrep:kalibreringskurve) og metodens stabilitet være dokumentert på annen måte dersom ett punkt skal være tilstrekkelig." },
    { kind: "p", text: "Det er ikke en del av definisjonen at en lineær modell må tvinges gjennom null. Et eventuelt [konstantledd](begrep:nullpunkt) må håndteres i samsvar med den dokumenterte modellen." },
  ],
  demo: "ettpunktskalibrering-ankring",
  depth: {
    title: "Dybde: når ett punkt kan være forsvarlig",
    blocks: [
      { kind: "p", text: "Eurachem beskriver at ett kalibreringspunkt kan være tilstrekkelig i et dokumentert lineært område når hensikten er å etablere eller kontrollere stigningstallet. Før rutinebruk må linearitet, område og relevant varians være undersøkt." },
      { kind: "p", text: "Ettpunktskalibrering er derfor ikke en snarvei rundt validering. Risikoen øker dersom responsen drifter, konstantleddet endrer seg, matriseeffekter varierer eller prøvene ligger langt fra kalibratornivået." },
      { kind: "p", text: "[Kontrollprøver](begrep:kontrollprove) kan gi uavhengig informasjon om at rutineserien fortsatt oppfører seg som forventet, men de erstatter ikke dokumentasjon av selve kalibreringsstrategien." },
    ],
  },
  sources: [SOURCES.vimCalibration, SOURCES.eurachem2025],
  status: "publisert",
};
