import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const ftest: PublishedTerm = {
  slug: "ftest",
  title: "F-test for to varianser",
  category: "statistikk",
  definition: "En hypotesetest som sammenligner to populasjonsvarianser ved hjelp av forholdet mellom to utvalgsvarianser og en F-fordeling.",
  aliases: ["F-test", "F test", "variance ratio", "varianstest", "F-fordeling"],
  explanation: [
    { kind: "p", text: "Teststatistikken er et forhold mellom to [varianser](begrep:varians). Hvis populasjonsvariansene er like, forventes forholdet å ligge nær det som er typisk for en F-fordeling med de aktuelle frihetsgradene." },
    { kind: "p", text: "F-testen kan brukes ensidig eller tosidig avhengig av spørsmålet. En tosidig test undersøker om variansene er forskjellige i noen retning." },
  ],
  demo: "ftest-variansforhold",
  depth: {
    title: "Dybde: testen er følsom for ikke-normalitet",
    blocks: [
      { kind: "p", text: "Den klassiske F-testen for likhet mellom to varianser forutsetter uavhengige utvalg fra [normalfordelte](begrep:normalfordeling) populasjoner og er kjent for å være følsom for avvik fra normalitet." },
      { kind: "p", text: "Når normalitetsantakelsen er tvilsom, finnes mer robuste alternativer som Levenes test. Valg av test bør derfor bestemmes av datagenereringen og analysespørsmålet, ikke bare av at to standardavvik skal sammenlignes." },
      { kind: "p", text: "Som andre hypotesetester gir F-testen en beslutningsregel ved et valgt [signifikansnivå](begrep:signifikansniva); den sier ikke hvor viktig en eventuell forskjell er i praksis." },
    ],
  },
  sources: [SOURCES.nistFTest],
  status: "publisert",
};
