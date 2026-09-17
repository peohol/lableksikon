import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const presisjon: PublishedTerm = {
  slug: "presisjon",
  title: "Presisjon",
  category: "kvalitet",
  definition:
    "Hvor godt gjentatte måleresultater stemmer overens med hverandre under angitte målebetingelser.",
  aliases: ["spredning", "gjentak", "RSD", "standardavvik", "pilkast", "repeterbarhet"],
  explanation: [
    {
      kind: "p",
      text: "Tenk på pilkast. Presisjon handler om hvor tett pilene sitter samlet, ikke om de treffer blinken. Sitter alle pilene tett i samme hjørne av skiva, er kastene presise — men ikke nødvendigvis nøyaktige.",
    },
    {
      kind: "p",
      text: "På laben betyr det at gjentatte målinger kan gi svært like tall selv om resultatene har en systematisk [skjevhet](begrep:skjevhet). Hvor nær et måleresultat ligger en referanseverdi, hører til [riktighet og nøyaktighet](begrep:noyaktighet).",
    },
  ],
  demo: "presisjon-spredning",
  depth: {
    title: "Dybde: standardavvik, RSD og presisjonsbetingelser",
    blocks: [
      {
        kind: "p",
        text: "Presisjon uttrykkes numerisk ved mål på upresisjon, typisk standardavvik, varians eller variasjonskoeffisient (RSD/CV). Et estimat av presisjon er selv usikkert når det bygger på få observasjoner, så antall replikater må tilpasses formålet med undersøkelsen.",
      },
      {
        kind: "p",
        text: "Presisjon gir bare mening når betingelsene er angitt. [Repeterbarhet](begrep:repeterbarhet) gjelder korte tidsintervaller under like betingelser. [Intermediær presisjon](begrep:intermediar) tillater variasjon innen samme laboratorium, mens [reproduserbarhet](begrep:reproduserbarhet) gjelder målinger under ulike laboratoriebetingelser.",
      },
      {
        kind: "p",
        text: "Presisjonsdata er ofte et viktig bidrag ved vurdering av [måleusikkerhet](begrep:maleusikkerhet), men presisjon alene beskriver ikke systematiske effekter.",
      },
    ],
  },
  sources: [SOURCES.vim, SOURCES.eurachemValidation],
  status: "publisert",
};
