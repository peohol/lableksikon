import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const deteksjonsgrense: PublishedTerm = {
  slug: "deteksjonsgrense",
  title: "Deteksjonsgrense",
  category: "kalibrering",
  definition: "Et lavt analyttnivå der metoden, med definerte sannsynligheter for falskt positivt og falskt negativt svar, kan skille tilstedeværelse fra fravær.",
  aliases: ["LOD", "limit of detection", "deteksjon", "signal-støy", "blank", "påvisningsgrense"],
  explanation: [
    { kind: "p", text: "Ved svært lave nivåer overlapper resultatfordelingen for prøver med analytt og for prøver uten analytt. En deteksjonsgrense må derfor knyttes til hvor stor risiko man aksepterer for å hevde analytt når den ikke er der, og for å overse analytt som faktisk er der." },
    { kind: "p", text: "Dette er en egenskap ved hele måleprosedyren, ikke bare instrumentet. Blankvariasjon, prøveopparbeiding, [matriseeffekt](begrep:matriseeffekt) og valgt statistisk tilnærming påvirker grensen." },
  ],
  demo: "deteksjonsgrense-stoy",
  depth: {
    title: "Dybde: LOD, LOQ og hvorfor én formel ikke passer alle metoder",
    blocks: [
      { kind: "p", text: "VIM definerer deteksjonsgrensen gjennom to feilrisikoer: sannsynligheten for falskt å hevde tilstedeværelse og sannsynligheten for falskt å hevde fravær. Eurachem beskriver flere praktiske måter å estimere grensen på avhengig av datagrunnlag og metode." },
      { kind: "p", text: "Signal-støy-forhold rundt 3 og faktorer som 3 eller 3,3 ganger et standardavvik brukes i enkelte konvensjoner, men er ikke en universell definisjon av LOD. Tilsvarende er «10 ganger standardavviket» en vanlig heuristikk for kvantifiseringsgrense, ikke en naturkonstant." },
      { kind: "p", text: "Hvordan resultater under en kvantifiserings- eller rapporteringsgrense skal rapporteres og brukes videre, avhenger av formål, regelverk og laboratoriets beslutningsregler." },
    ],
  },
  sources: [SOURCES.vimDetectionLimit, SOURCES.eurachem2025],
  status: "publisert",
};
