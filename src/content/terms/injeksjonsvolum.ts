import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const injeksjonsvolum: PublishedTerm = {
  slug: "injeksjonsvolum",
  title: "Injeksjonsvolum",
  category: "separasjon",
  definition: "Volumet av prøveløsning som introduseres i det kromatografiske systemet ved en injeksjon.",
  aliases: ["injection volume", "injeksjon", "sample volume", "µL"],
  explanation: [
    { kind: "p", text: "Injeksjonsvolumet bestemmer hvor stor væske- eller gassplugg som introduseres i systemet. Det må passe kolonnen, prøveoppløsningen og deteksjonsbehovet." },
    { kind: "p", text: "Et for stort volum kan blant annet påvirke [toppbredde](begrep:toppbredde), toppform og [kromatografisk oppløsning](begrep:opplosning). Effekten avhenger av metoden og av hvordan prøveoppløsningen passer med startbetingelsene." },
  ],
  demo: "injeksjonsvolum-plugg",
  depth: {
    title: "Dybde: mer prøve er ikke alltid bedre kromatografi",
    blocks: [
      { kind: "p", text: "Større injeksjonsvolum kan øke mengden analytt som når detektoren, men kan samtidig introdusere mer båndspredning eller overbelastning. Derfor må volumet vurderes mot både følsomhet og separasjonsytelse." },
      { kind: "p", text: "Farmakopékrav tillater i mange sammenhenger endring av injeksjonsvolum bare når systemegnethet fortsatt er tilfredsstillende; ved økning må blant annet linearitet og oppløsning forbli tilfredsstillende." },
    ],
  },
  sources: [SOURCES.uspChromatographyInjection],
  status: "publisert",
};