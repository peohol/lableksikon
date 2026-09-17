import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const sporbarhet: PublishedTerm = {
  slug: "sporbarhet",
  title: "Metrologisk sporbarhet",
  category: "kvalitet",
  definition: "Egenskapen at et måleresultat kan knyttes til en referanse gjennom en dokumentert, ubrutt kalibreringskjede der hvert ledd bidrar til usikkerheten.",
  aliases: ["traceability", "metrologisk sporbarhet", "kalibreringskjede", "SI"],
  explanation: [
    { kind: "p", text: "Tallet på skjermen står ikke alene. Kalibratoren har en verdi, den verdien bygger på en referanse, og referansen kan igjen være knyttet videre til en høyere referanse eller en definert enhet." },
    { kind: "p", text: "Når hele denne kjeden er dokumentert og usikkerheten følger med gjennom leddene, kan resultatet være metrologisk sporbart. Sporbarhet er derfor noe annet enn bare å kunne finne igjen prøven eller dokumentene." },
  ],
  demo: "sporbarhet-kjede",
  depth: {
    title: "Dybde: hva sporbarhet ikke garanterer",
    blocks: [
      { kind: "p", text: "VIM understreker at hvert kalibreringsledd i kjeden bidrar til [måleusikkerheten](begrep:maleusikkerhet). Referansen kan være en definisjon av en enhet, en måleprosedyre eller en målestandard." },
      { kind: "p", text: "Sporbarhet alene garanterer verken at usikkerheten er liten nok for formålet eller at det ikke er gjort feil. Det er én nødvendig del av et troverdig måleresultat, ikke et komplett kvalitetsstempel." },
    ],
  },
  sources: [SOURCES.vimTraceability],
  status: "publisert",
};
