import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const opplosning: PublishedTerm = {
  slug: "opplosning",
  title: "Kromatografisk oppløsning",
  category: "separasjon",
  definition: "Et mål på hvor godt to nabotopper er separert i forhold til toppbreddene.",
  aliases: ["resolution", "Rs", "toppseparasjon", "peak resolution", "overlapp"],
  explanation: [
    { kind: "p", text: "To forbindelser kan ha ulike [retensjonstider](begrep:retensjonstid) og likevel gi topper som overlapper betydelig. Oppløsningen beskriver derfor både avstanden mellom toppene og hvor brede de er." },
    { kind: "p", text: "Bedre separasjon kan oppnås ved å øke retensjonsforskjellen, redusere [toppbredden](begrep:toppbredde) eller begge deler. [Separasjonsfaktoren](begrep:selektivitetsfaktor) beskriver retensjonsforskjellen mellom to nabotopper, men er ikke alene et mål på oppløsning." },
  ],
  demo: "opplosning-topper",
  depth: {
    title: "Dybde: Rs, toppbredde og tommelfingerregler",
    blocks: [
      { kind: "p", text: "For toppbredder målt ved basis uttrykkes peak resolution vanligvis som \\(R_s = \\frac{2(t_{R,2}-t_{R,1})}{w_1+w_2}\\). Samme retensjonsforskjell gir altså dårligere oppløsning når toppene blir bredere." },
      { kind: "p", text: "Rs rundt 1,5 omtales ofte som omtrent baseline-separasjon for to sammenlignbare, nær-gaussiske topper, men dette er en tommelfingerregel — ikke en universell kvalitetsgrense eller garanti for korrekt kvantifisering. Kravet må passe formålet, toppformen og metoden." },
    ],
  },
  sources: [SOURCES.iupacPeakResolution],
  status: "publisert",
};
