import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const opplosning: PublishedTerm = {
  slug: "opplosning",
  title: "Kromatografisk oppløsning",
  category: "separasjon",
  definition: "Et mål på hvor godt to nabotopper er separert i forhold til toppbreddene.",
  aliases: ["resolution", "Rs", "toppseparasjon", "peak resolution", "overlapp"],
  explanation: [
    { kind: "p", text: "To forbindelser kan ha ulike retensjonstider og likevel gi topper som overlapper så mye at de ikke kan bestemmes uavhengig. Oppløsningen beskriver derfor både avstanden mellom toppene og hvor brede de er." },
    { kind: "p", text: "Bedre separasjon kan oppnås ved å flytte toppene fra hverandre, gjøre dem smalere eller begge deler. Hvilket tiltak som virker best, avhenger av det kromatografiske systemet." },
  ],
  demo: "opplosning-topper",
  depth: {
    title: "Dybde: Rs, toppbredde og tommelfingerregler",
    blocks: [
      { kind: "p", text: "For toppbredder målt ved basis uttrykkes peak resolution vanligvis som Rs = 2(tR₂ − tR₁)/(w₁ + w₂). Samme retensjonsforskjell gir altså dårligere oppløsning når toppene blir bredere." },
      { kind: "p", text: "Rs rundt 1,5 omtales ofte som omtrent baseline-separasjon for to sammenlignbare, nær-gaussiske topper, men det er en tommelfingerregel — ikke en universell kvalitetsgrense. Kravet må passe formålet og toppformen." },
    ],
  },
  sources: [SOURCES.iupacPeakResolution],
  status: "publisert",
};
