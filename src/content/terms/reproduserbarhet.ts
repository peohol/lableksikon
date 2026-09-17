import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const reproduserbarhet: PublishedTerm = {
  slug: "reproduserbarhet",
  title: "Reproduserbarhet",
  category: "kvalitet",
  definition: "Presisjon under reproduserbarhetsbetingelser, der målinger blant annet utføres ved ulike laboratorier.",
  aliases: ["reproducibility", "between-lab", "mellomlaboratorium", "ringtest"],
  explanation: [
    { kind: "p", text: "Når flere laboratorier måler samme eller sammenlignbart materiale under definerte reproduserbarhetsbetingelser, får vi et mål på hvor godt resultatene stemmer overens på tvers av steder." },
    { kind: "p", text: "Reproduserbarhet omfatter flere mulige variasjonskilder enn [repeterbarhet](begrep:repeterbarhet). Spredningen blir ofte større i praksis, men det er ikke en definisjonsmessig regel at den alltid må være større." },
  ],
  demo: "reproduserbarhet-lab",
  depth: {
    title: "Dybde: hva reproduserbarhetsbetingelser innebærer",
    blocks: [
      { kind: "p", text: "VIM knytter reproduserbarhet til presisjon under betingelser med ulike steder, operatører og målesystemer, og bemerker at målesystemene kan bruke ulike måleprosedyrer. Betingelsene og forsøksdesignet må beskrives for at et reproduserbarhetsestimat skal kunne tolkes." },
      { kind: "p", text: "Mellomlaboratoriestudier og egnethetsprøving kan gi data om slik variasjon, men formål og statistisk design avgjør hvilket presisjonsmål som faktisk kan estimeres." },
    ],
  },
  sources: [SOURCES.vimReproducibilityCondition, SOURCES.vimReproducibility, SOURCES.eurachem2025],
  status: "publisert",
};
