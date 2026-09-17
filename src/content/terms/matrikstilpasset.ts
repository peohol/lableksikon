import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const matrikstilpasset: PublishedTerm = {
  slug: "matrikstilpasset",
  title: "Matrikstilpasset kalibrering",
  category: "kalibrering",
  definition: "Ekstern kalibrering der kalibratorene fremstilles i analyttfri eller egnet representativ matriks for å ligne prøvene og redusere systematisk matriseeffekt.",
  aliases: ["matrix-matched calibration", "matrix matched", "matrikskalibrering", "matrix-matched standards"],
  explanation: [
    { kind: "p", text: "Hvis samme analyttmengde gir ulik respons i løsemiddel og i prøve, kan kalibratorer i tilsvarende matriks gjøre kalibreringsresponsen mer representativ for prøvene. Dette er særlig aktuelt ved tydelig [matriseeffekt](begrep:matriseeffekt)." },
    { kind: "p", text: "IUPAC beskriver matrikstilpasset kalibrering som [ekstern kalibrering](begrep:ekstern) der standardene lages i analyttfri matriks. I praksis må laboratoriet vurdere hvor godt den tilgjengelige blankmatriksen faktisk representerer de virkelige prøvene." },
  ],
  demo: "matrikstilpasset-kalibrering-matriks",
  depth: {
    title: "Dybde: matrikstilpasning reduserer, men garanterer ikke, samsvar",
    blocks: [
      { kind: "p", text: "Matrikser varierer mellom individer, prøvetyper og loter. En enkelt blankmatriks kan derfor ha en annen matriseeffekt enn en bestemt prøve, selv om materialtypen er den samme." },
      { kind: "p", text: "Når analytten finnes naturlig i all tilgjengelig matriks, kan en ekte analyttfri blank være vanskelig å skaffe. Alternative strategier kan være simulert matriks, blankkorreksjon, [standardaddisjon](begrep:standardaddisjon) eller andre validerte korreksjonsmodeller." },
      { kind: "p", text: "Matrikstilpasning erstatter heller ikke behovet for å kontrollere selektivitet, gjenvinning og relevante prøveopparbeidingseffekter." },
    ],
  },
  sources: [SOURCES.iupacMatrixMatchedCalibration, SOURCES.eurachem2025],
  status: "publisert",
};
