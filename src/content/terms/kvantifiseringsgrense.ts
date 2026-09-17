import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const kvantifiseringsgrense: PublishedTerm = {
  slug: "kvantifiseringsgrense",
  title: "Kvantifiseringsgrense",
  category: "kalibrering",
  definition: "En nedre eller øvre analyttverdi ved kanten av arbeidsområdet der måleprosedyren fortsatt oppfyller et definert krav til egnet kvantifisering.",
  aliases: ["LOQ", "LLOQ", "ULOQ", "limit of quantification", "quantification limit", "kvantiteringsgrense"],
  explanation: [
    { kind: "p", text: "Kvantifiseringsgrensen knyttes til et krav som er relevant for formålet, for eksempel [presisjon](begrep:presisjon) eller [måleusikkerhet](begrep:maleusikkerhet). I praksis brukes «LOQ» ofte om den nedre grensen, men IUPAC beskriver både nedre og øvre kvantifiseringsgrense." },
    { kind: "p", text: "[Deteksjonsgrensen](begrep:deteksjonsgrense) svarer på om analytt kan skilles fra fravær med definerte feilrisikoer. LOQ svarer på om tallfestingen er god nok etter et valgt ytelseskrav. De to grensene er derfor ikke det samme." },
  ],
  demo: "kvantifiseringsgrense-krav",
  depth: {
    title: "Dybde: hvorfor LOQ ikke er én universell formel",
    blocks: [
      { kind: "p", text: "IUPAC definerer LOQ gjennom «fitness for purpose». Et krav kan for eksempel være et maksimum for repeterbarhetsstandardavvik eller måleusikkerhet. Valget må dokumenteres slik at grensen kan forstås og sammenlignes." },
      { kind: "p", text: "En faktor som 10 ganger standardavviket til en blank eller en prøve med lav tilsetning brukes ofte som estimat for nedre LOQ, men faktoren er en konvensjon og ikke selve definisjonen." },
      { kind: "p", text: "Nedre og øvre LOQ avgrenser [arbeidsområdet](begrep:arbeidsomrade). En intern rapporteringsgrense eller beslutningsgrense kan av praktiske eller regulatoriske grunner ligge et annet sted." },
    ],
  },
  sources: [SOURCES.iupacQuantificationLimit, SOURCES.iupacWorkingInterval, SOURCES.eurachem2025],
  status: "publisert",
};
