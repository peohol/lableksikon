import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const repeterbarhet: PublishedTerm = {
  slug: "repeterbarhet",
  title: "Repeterbarhet",
  category: "kvalitet",
  definition: "Presisjon for gjentatte målinger under spesifiserte, mest mulig like forhold over kort tid.",
  aliases: ["repeatability", "within-run", "serie", "korttidspresisjon"],
  explanation: [
    { kind: "p", text: "Når samme prøve analyseres flere ganger i én kort serie med samme prosedyre og målesystem, undersøker vi hvor mye resultatene spriker under repeterbarhetsbetingelser." },
    { kind: "p", text: "Dette er den smaleste formen for [presisjon](begrep:presisjon). Den sier lite om hva som skjer når dag, operatør eller laboratorium endres; da trenger vi [intermediær presisjon](begrep:intermediar) eller [reproduserbarhet](begrep:reproduserbarhet)." },
  ],
  demo: "repeterbarhet-serie",
  depth: {
    title: "Dybde: hvilke forhold som faktisk skal holdes like",
    blocks: [
      { kind: "p", text: "VIM beskriver repeterbarhetsbetingelser som samme måleprosedyre, samme operatører, samme målesystem og samme sted, med gjentatte målinger over kort tid. «Samme dag» er derfor en vanlig praktisk løsning, men ikke selve definisjonen." },
      { kind: "p", text: "Repeterbarhet uttrykkes gjerne som standardavvik eller RSD. Den observerte verdien avhenger av både prøvenivå, forsøksdesign og hvor mange replikater som inngår." },
    ],
  },
  sources: [SOURCES.vimRepeatability, SOURCES.vimPrecision, SOURCES.eurachem2025],
  status: "publisert",
};
