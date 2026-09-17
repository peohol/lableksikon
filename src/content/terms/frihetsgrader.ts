import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const frihetsgrader: PublishedTerm = {
  slug: "frihetsgrader",
  title: "Frihetsgrader",
  category: "statistikk",
  definition: "Antallet uavhengige informasjonsbiter som gjenstår etter at nødvendige modellparametere eller begrensninger er tatt hensyn til.",
  aliases: ["degrees of freedom", "df", "nu", "ν", "n-1", "n − 1"],
  explanation: [
    { kind: "p", text: "Har du n målinger og bruker dem til å estimere ett [gjennomsnitt](begrep:gjennomsnitt), er det n − 1 uavhengige avvik igjen. Derfor har utvalgsvariansen og utvalgsstandardavviket vanligvis n − 1 frihetsgrader." },
    { kind: "p", text: "Frihetsgrader påvirker hvilke sannsynlighetsfordelinger og kritiske verdier som skal brukes i blant annet konfidensintervaller og hypotesetester." },
  ],
  demo: "frihetsgrader-sum",
  depth: {
    title: "Dybde: hvorfor den siste verdien ikke er fri",
    blocks: [
      { kind: "p", text: "Hvis tre avvik fra et beregnet gjennomsnitt skal summere til null, kan to av dem velges fritt, men det tredje bestemmes av de to første. Derfor er frihetsgradene 3 − 1 = 2." },
      { kind: "p", text: "I mer komplekse modeller er hovedideen den samme: antall frihetsgrader reduseres når parametere estimeres fra dataene. For lineær regresjon må for eksempel antallet tilpassede parametere tas med i regnskapet." },
      { kind: "p", text: "Frihetsgrader er altså ikke bare en teknisk korreksjon for [standardavvik](begrep:standardavvik), men en generell beskrivelse av hvor mye uavhengig informasjon som er igjen i et statistisk estimat." },
    ],
  },
  sources: [SOURCES.iupacDegreesFreedom],
  status: "publisert",
};
