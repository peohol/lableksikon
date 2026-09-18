import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const delprove: PublishedTerm = {
  slug: "delprove",
  title: "Delprøve",
  category: "provetaking",
  definition: "En mindre del av en prøve som er valgt ut eller framkommet ved deling for videre prøvetaking eller analyse.",
  aliases: ["subsample", "subprøve", "sample of a sample", "deling"],
  explanation: [
    { kind: "p", text: "IUPAC bruker subsample både om en «prøve av en prøve» og, i enkelte sammenhenger, om en enhet i et flertrinns prøvetakingsopplegg. Betydningen må derfor være tydelig i metoden." },
    { kind: "p", text: "Når en liten delprøve tas fra et heterogent materiale, kan sammensetningen avvike fra resten. [Homogenisering](begrep:homogenisering), riktig delingsteknikk og tilstrekkelig [prøvemengde](begrep:provemengde) kan redusere denne variasjonen." },
  ],
  demo: "delprove-splitting",
  depth: {
    title: "Dybde: hver deling kan tilføre ny prøvetakingsusikkerhet",
    blocks: [
      { kind: "p", text: "Prøven kan reduseres i flere trinn: fra feltprøve til laboratorieprøve, videre til testprøve og til slutt en testportion som faktisk behandles kjemisk. Hvert uttak må være egnet til å bevare representativiteten for måleformålet." },
      { kind: "p", text: "IUPAC skiller delprøve fra testportion. En testportion er den kjente massen eller det kjente volumet av testprøven som tas inn i selve analysen." },
    ],
  },
  sources: [SOURCES.iupacSubsample, SOURCES.iupacSample, SOURCES.iupacTestPortion, SOURCES.eurachemSampling2019],
  status: "publisert",
};