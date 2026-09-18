import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const stasjonarfase: PublishedTerm = {
  slug: "stasjonarfase",
  title: "Stasjonærfase",
  category: "separasjon",
  definition: "Den fasen i et kromatografisk system som ligger fast mens mobilfasen beveger seg forbi.",
  aliases: ["stationary phase", "sorbent", "kolonnemateriale", "C18"],
  explanation: [
    { kind: "p", text: "Stasjonærfasen kan være et fast stoff, en gel eller en væske som er fordelt på, bundet til eller immobilisert på et fast materiale." },
    { kind: "p", text: "Prøvekomponentene vekselvirker ulikt med stasjonærfasen og [mobilfasen](begrep:mobilfase). Disse forskjellene gjør at komponentene får ulik [retensjonstid](begrep:retensjonstid) og kan separeres." },
  ],
  demo: "stasjonarfase-fordeling",
  depth: {
    title: "Dybde: hvorfor stasjonærfasen skaper selektivitet",
    blocks: [
      { kind: "p", text: "Kjemien og strukturen til stasjonærfasen bestemmer hvilke vekselvirkninger som er tilgjengelige. Eksempler er hydrofobe, polare, ioniske og størrelsesavhengige mekanismer." },
      { kind: "p", text: "Et bytte av stasjonærfase kan derfor endre både [elueringsrekkefølgen](begrep:elueringsrekkefolge) og [separasjonsfaktoren](begrep:selektivitetsfaktor), selv om instrument og analyttblanding ellers er de samme." },
    ],
  },
  sources: [SOURCES.iupacStationaryPhase, SOURCES.iupacChromatography],
  status: "publisert",
};