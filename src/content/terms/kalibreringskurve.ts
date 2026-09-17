import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const kalibreringskurve: PublishedTerm = {
  slug: "kalibreringskurve",
  title: "Kalibreringskurve",
  category: "kalibrering",
  definition: "Et uttrykk for relasjonen mellom et målesystems respons og tilsvarende analyttverdier som er etablert ved kalibrering.",
  aliases: ["standardkurve", "calibration curve", "kalibreringsfunksjon", "kurve", "regresjonslinje"],
  explanation: [
    { kind: "p", text: "Kalibratorer med kjente verdier måles, og responsene brukes til å etablere en matematisk relasjon. En ukjent prøverespons kan deretter kobles til en analyttverdi ved hjelp av denne relasjonen." },
    { kind: "p", text: "Kalibreringsrelasjonen trenger ikke være en rett linje. Modellformen må passe data og formålet, og gyldigheten må vurderes innen det dokumenterte [arbeidsområdet](begrep:arbeidsomrade)." },
  ],
  demo: "kalibreringskurve-punkter",
  depth: {
    title: "Dybde: kalibrering er mer enn å tegne en linje",
    blocks: [
      { kind: "p", text: "VIM beskriver kalibrering som en operasjon i to trinn: først etableres relasjonen mellom referanseverdier og indikasjoner, deretter brukes denne informasjonen til å få et måleresultat fra en indikasjon. Selve kalibreringskurven uttrykker relasjonen, men inneholder ikke alene informasjon om måleusikkerheten." },
      { kind: "p", text: "I analytisk kjemi tilpasses ofte en modell til respons mot analyttnivå. [Linearitet](begrep:linearitet), [vektet regresjon](begrep:vektet) og [konstantledd](begrep:nullpunkt) handler om hvordan denne modellen beskriver kalibreringsdataene." },
      { kind: "p", text: "En kalibreringsmodell bør ikke ekstrapoleres utenfor området der ytelsen er dokumentert. Et godt matematisk fit er heller ikke i seg selv bevis på at hele måleprosedyren er egnet." },
    ],
  },
  sources: [SOURCES.vimCalibration, SOURCES.vimCalibrationCurve, SOURCES.iupacCalibrationFunction, SOURCES.eurachem2025],
  status: "publisert",
};
