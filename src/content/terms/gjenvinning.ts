import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const gjenvinning: PublishedTerm = {
  slug: "gjenvinning",
  title: "Gjenvinning",
  category: "kvalitet",
  definition: "Forholdet mellom analyttmengden eller konsentrasjonsøkningen som måles og den som forventes fra en referanse eller kjent tilsetning.",
  aliases: ["recovery", "utbytte", "tilsetning", "spiking"],
  explanation: [
    { kind: "p", text: "Tilsetter du en kjent mengde analytt til en prøve, kan du undersøke hvor mye av økningen metoden faktisk finner igjen. Finner du igjen 90 av 100 tilsatte enheter, er den observerte gjenvinningen 90 %." },
    { kind: "p", text: "Gjenvinning kan gi informasjon om systematiske effekter i hele eller deler av analyseprosessen, men tolkningen avhenger av forsøksdesignet. Et tilsetningsforsøk erstatter derfor ikke automatisk et egnet referansemateriale." },
  ],
  demo: "standardaddisjon-steg",
  depth: {
    title: "Dybde: gjenvinning og skjevhet er beslektet, men ikke identisk",
    blocks: [
      { kind: "p", text: "I metodevalidering brukes gjenvinningsforsøk ofte når egnede referansematerialer ikke finnes. Resultatet kan uttrykkes som prosent av forventet verdi eller som avvik fra 100 %." },
      { kind: "p", text: "En tilsetning som skjer sent i prøvebehandlingen undersøker ikke nødvendigvis tap som oppstår tidligere. Derfor må det beskrives hvor i prosessen analytten er tilsatt, og hva forsøket faktisk tester." },
      { kind: "p", text: "Data for gjenvinning kan sammen med [intermediær presisjon](begrep:intermediar) brukes i praktiske modeller for [måleusikkerhet](begrep:maleusikkerhet)." },
    ],
  },
  sources: [SOURCES.eurachemValidation, SOURCES.eurachemUncertainty],
  status: "publisert",
};
