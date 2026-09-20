import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const nullpunkt: PublishedTerm = {
  slug: "nullpunkt",
  title: "Nullpunkt og konstantledd",
  category: "kalibrering",
  definition: "I en lineær kalibreringsmodell er konstantleddet den forventede responsen når analyttverdien er null.",
  aliases: ["intercept", "y-intercept", "konstantledd", "skjæringspunkt", "nullpunkt", "blankrespons"],
  explanation: [
    { kind: "p", text: "I modellen \\(y = a + bx\\) står bare \\(a\\) igjen når \\(x = 0\\). Et ikke-null konstantledd kan gjenspeile bakgrunnssignal, blankbidrag eller andre systematiske trekk ved målesystemet, men kan også være påvirket av tilfeldig variasjon i kalibreringsdataene." },
    { kind: "p", text: "Ordet «nullpunkt» er tvetydig: i matematikk betyr det ofte verdien av \\(x\\) der \\(y = 0\\). I kalibreringssammenheng brukes det noen ganger om responsen ved \\(x = 0\\). Derfor er «konstantledd» eller «skjæring med responsaksen» mer presist." },
  ],
  demo: "nullpunkt-skjaring",
  depth: {
    title: "Dybde: hvorfor en kurve ikke skal tvinges gjennom null uten grunn",
    blocks: [
      { kind: "p", text: "Å sette \\(a = 0\\) reduserer antall modellparametere, men påfører samtidig en sterk antakelse: forventet respons skal være nøyaktig null når analyttverdien er null. Denne antakelsen må begrunnes faglig og støttes av data." },
      { kind: "p", text: "[Blindprøver](begrep:blindprove) kan gi informasjon om bakgrunn og blankbidrag, men en blankrespons er ikke nødvendigvis identisk med regresjonsmodellens estimerte konstantledd." },
      { kind: "p", text: "Valg av konstantledd påvirker særlig tilbakeberegning ved lave nivåer. Derfor bør residualer og ytelse nær [kvantifiseringsgrensen](begrep:kvantifiseringsgrense) vurderes når modellen fastsettes." },
    ],
  },
  sources: [SOURCES.iupacCalibrationFunction, SOURCES.eurachem2025],
  status: "publisert",
};
