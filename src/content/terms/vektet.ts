import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const vektet: PublishedTerm = {
  slug: "vektet",
  title: "Vektet regresjon",
  category: "kalibrering",
  definition: "Regresjon der observasjoner gis ulik vekt i modelltilpasningen, vanligvis for å ta hensyn til at variansen ikke er konstant gjennom kalibreringsområdet.",
  aliases: ["weighted regression", "weighted least squares", "WLS", "1/x", "1/x²", "heteroskedastisitet"],
  explanation: [
    { kind: "p", text: "Vanlig minste kvadraters regresjon behandler punktene som om de har samme feilvarians. I mange analytiske metoder øker spredningen med analyttnivået, slik at høye kalibratorer ellers kan få uforholdsmessig stor innflytelse." },
    { kind: "p", text: "Vekter som 1/x eller 1/x² brukes ofte, men de er modellvalg og ikke standardfasit. Valget bør bygge på hvordan variansen faktisk endrer seg, og på hvordan modellen presterer i hele [arbeidsområdet](begrep:arbeidsomrade)." },
  ],
  demo: "vektet-regresjon-vekter",
  depth: {
    title: "Dybde: vekter skal beskrive presisjonen i dataene",
    blocks: [
      { kind: "p", text: "Ved vektet minste kvadraters regresjon får mer presise observasjoner større innflytelse og mindre presise observasjoner mindre. Teoretisk er vekter som er omvendt proporsjonale med variansen optimale når variansstrukturen er kjent." },
      { kind: "p", text: "I praksis estimeres vektene. Dårlige estimater eller et tilfeldig valg mellom 1/x og 1/x² kan forverre modellen. Residualer og tilbakeberegnede kalibratorer bør undersøkes gjennom hele området." },
      { kind: "p", text: "Vekting endrer ikke om den valgte funksjonsformen i [kalibreringskurven](begrep:kalibreringskurve) er riktig. En tydelig krum sammenheng blir ikke lineær bare fordi regresjonen vektes." },
    ],
  },
  sources: [SOURCES.nistWeightedLeastSquares, SOURCES.eurachem2025],
  status: "publisert",
};
