import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const deteksjonsgrense: PublishedTerm = {
  slug: "deteksjonsgrense",
  title: "Deteksjonsgrense",
  category: "kalibrering",
  definition: "Den laveste målte verdien som kan påvises med en angitt sannsynlighet for falskt positivt og falskt negativt resultat under spesifiserte målebetingelser.",
  aliases: ["LOD", "støy", "signal-støy", "blank", "ikke påvist", "grense", "hvisking", "LOQ"],
  explanation: [
    {
      kind: "p",
      text: "Nær null overlapper signalene fra prøver uten analytt og prøver med svært lite analytt. Deteksjonsgrensen beskriver hvor langt opp fra denne bakgrunnen du må før metoden kan skille tilstedeværelse fra fravær med en definert feilrisiko.",
    },
    {
      kind: "p",
      text: "Det er derfor misvisende å tenke på LOD som et magisk punkt der alt under er «null» og alt over er sikkert påvist. Grensen avhenger av hvordan påvisningsregelen er definert, variasjonen ved lave nivåer og hvilke feilrater man aksepterer.",
    },
  ],
  demo: "deteksjonsgrense-stoy",
  depth: {
    title: "Dybde: LOD, beslutningsgrense og kvantifisering",
    blocks: [
      {
        kind: "p",
        text: "Enkle tommelfingerregler som 3s eller 3,3s/b brukes i noen sammenhenger, men de er ikke universelle definisjoner av deteksjonsgrensen. En faglig vurdering bør angi hvordan grensen er estimert og hvilke statistiske forutsetninger som ligger bak.",
      },
      {
        kind: "p",
        text: "Deteksjon og kvantifisering er forskjellige spørsmål. En prøve kan inneholde nok analytt til at tilstedeværelse kan påvises, men fortsatt for lite til at konsentrasjonen kan tallfestes med akseptabel [presisjon](begrep:presisjon) og [skjevhet](begrep:skjevhet).",
      },
      {
        kind: "p",
        text: "Grensen gjelder hele måleprosedyren, ikke bare instrumentet. Prøveopparbeiding, blankbidrag og [matriseeffekt](begrep:matriseeffekt) kan derfor påvirke den vesentlig.",
      },
    ],
  },
  sources: [SOURCES.vim, SOURCES.eurachemValidation],
  status: "publisert",
};
