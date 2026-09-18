import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const toppbredde: PublishedTerm = {
  slug: "toppbredde",
  title: "Toppbredde",
  category: "separasjon",
  definition: "En kromatografisk topps utstrekning langs retensjonsaksen, målt etter en spesifisert breddekonvensjon.",
  aliases: ["peak width", "base width", "halvhøyde", "wh", "wb"],
  explanation: [
    { kind: "p", text: "Toppbredde kan blant annet måles ved basis eller ved halv topphøyde. Verdien må derfor alltid forstås sammen med hvilken breddekonvensjon som er brukt." },
    { kind: "p", text: "Smale topper gir høyere [platetall](begrep:platetall) og kan forbedre [kromatografisk oppløsning](begrep:opplosning), alt annet likt." },
  ],
  demo: "toppbredde-mal",
  depth: {
    title: "Dybde: basisbredde og bredde ved halv høyde",
    blocks: [
      { kind: "p", text: "IUPAC beskriver blant annet basisbredde wb og bredde ved halv høyde wh. «Halvbredde» skal ikke brukes som synonym for bredde ved halv høyde, fordi det betegner noe annet." },
      { kind: "p", text: "Bredde påvirkes ikke bare av selve kolonnen. Injeksjon, slanger, detektorvolum og andre ekstrakolonnebidrag kan også gjøre observerte topper bredere." },
    ],
  },
  sources: [SOURCES.iupacPeakWidths],
  status: "publisert",
};