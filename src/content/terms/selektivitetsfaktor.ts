import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const selektivitetsfaktor: PublishedTerm = {
  slug: "selektivitetsfaktor",
  title: "Separasjonsfaktor (α)",
  category: "separasjon",
  definition: "Forholdet mellom den justerte retensjonen til to nabotopper, ordnet slik at α er større enn 1.",
  aliases: ["selektivitetsfaktor", "separation factor", "separation coefficient", "alpha", "α", "selectivity"],
  explanation: [
    { kind: "p", text: "Separasjonsfaktoren sammenligner hvor mye to komponenter holdes igjen utover hold-up-tiden. Når topp 2 er mest retinert, kan α uttrykkes som k₂/k₁ eller tR₂′/tR₁′." },
    { kind: "p", text: "\\(\\alpha = 1\\) betyr ingen retensjonsforskjell mellom forbindelsene. Jo mer \\(\\alpha\\) avviker fra 1, desto større er potensialet for å skille dem, men [kromatografisk oppløsning](begrep:opplosning) avhenger også av retensjon og [toppbredde](begrep:toppbredde)." },
  ],
  demo: "separasjonsfaktor-forhold",
  depth: {
    title: "Dybde: hvorfor «selektivitetsfaktor» er et problematisk navn",
    blocks: [
      { kind: "p", text: "IUPAC anbefaler betegnelsen separation factor og oppgir at «selectivity» også har vært brukt om α, men fraråder denne betegnelsen. Her brukes derfor «separasjonsfaktor» som hovednavn, mens «selektivitetsfaktor» beholdes som søkealias." },
      { kind: "p", text: "Endringer i [stasjonærfase](begrep:stasjonarfase), [mobilfase](begrep:mobilfase), temperatur eller andre betingelser kan endre α og dermed også [elueringsrekkefølgen](begrep:elueringsrekkefolge)." },
    ],
  },
  sources: [SOURCES.iupacSeparationFactor],
  status: "publisert",
};