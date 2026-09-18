import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const haledannelse: PublishedTerm = {
  slug: "haledannelse",
  title: "Haledannelse",
  category: "separasjon",
  definition: "Asymmetri der den bakre siden av en kromatografisk topp avtar slakere enn den fremre siden stiger.",
  aliases: ["tailing", "peak tailing", "hale", "asymmetri"],
  explanation: [
    { kind: "p", text: "En halende topp er ikke symmetrisk: fronten er brattere enn baksiden relativt til grunnlinjen. Dette kan gjøre integrasjon og separasjon fra en etterfølgende topp vanskeligere." },
    { kind: "p", text: "Haledannelse kan ha flere årsaker, blant annet uheldige analytt–overflate-interaksjoner, overbelastning eller problemer utenfor selve kolonnen. Toppformen må tolkes i kontekst." },
  ],
  demo: "haledannelse-form",
  depth: {
    title: "Dybde: asymmetri er mer enn toppbredde",
    blocks: [
      { kind: "p", text: "To topper kan ha samme nominelle [toppbredde](begrep:toppbredde) og likevel ha ulik symmetri. Derfor beskriver bredde og hale forskjellige egenskaper ved toppformen." },
      { kind: "p", text: "Forskjellige standarder og programvarer kan beregne asymmetri eller tailing factor på ulike måter. En tallverdi må derfor knyttes til definisjonen som faktisk er brukt." },
    ],
  },
  sources: [SOURCES.iupacTailing],
  status: "publisert",
};