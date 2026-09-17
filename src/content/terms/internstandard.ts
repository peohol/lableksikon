import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const internstandard: PublishedTerm = {
  slug: "internstandard",
  title: "Internstandard",
  category: "kalibrering",
  definition:
    "Et stoff som tilsettes i kjent mengde og brukes som intern referanse for å kompensere for variasjon i prøvebehandling og måling.",
  aliases: ["IS", "isotopmerket", "tilsetning", "forhold", "ratio", "tap"],
  explanation: [
    {
      kind: "p",
      text: "Tenk at du skal måle hvor mye saft det er i et glass, men søler litt på veien til vekta. Tilsetter du en kjent mengde av et annet stoff som følger prøven på omtrent samme måte, kan forholdet mellom analytt og internstandard gjøre målingen mindre følsom for slike variasjoner.",
    },
    {
      kind: "p",
      text: "Internstandarden følger helst analytten gjennom så mye som mulig av prøveopparbeidingen og målingen. Man bruker ofte responsforholdet analytt/internstandard i stedet for analyttsignalet alene.",
    },
  ],
  demo: "internstandard-forhold",
  depth: {
    title: "Dybde: valg av internstandard og begrensninger",
    blocks: [
      {
        kind: "p",
        text: "En god internstandard oppfører seg mest mulig som analytten gjennom relevante trinn, men kan måles separat. I massespektrometri er en egnet isotopmerket analog ofte særlig nyttig fordi kjemiske egenskaper og retensjon ligner analyttens.",
      },
      {
        kind: "p",
        text: "Tilsetningstidspunktet bestemmer hvilke variasjoner internstandarden kan korrigere for. Tilsettes den etter ekstraksjon, kan den ikke kompensere for analytttap som skjedde under ekstraksjonen.",
      },
      {
        kind: "p",
        text: "Kompensasjonen er bare god når analytt og internstandard påvirkes tilstrekkelig likt. Ulik retensjon eller ulik [matriseeffekt](begrep:matriseeffekt) kan gjøre forholdskorreksjonen ufullstendig.",
      },
    ],
  },
  sources: [SOURCES.iupacAnalytical, SOURCES.eurachemValidation],
  status: "publisert",
};
