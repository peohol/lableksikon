import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const simmodus: PublishedTerm = {
  slug: "simmodus",
  title: "SIM-modus",
  category: "deteksjon",
  definition: "Selected ion monitoring: måling der intensiteten til utvalgte ionetoppsignaler registreres i stedet for et helt massespektrum.",
  aliases: ["SIM", "selected ion monitoring", "selected ions", "ion monitoring"],
  explanation: [
    { kind: "p", text: "I SIM brukes [massespektrometeret](begrep:massespektrometri) til å følge bestemte \\(m/z\\)-områder eller ionetoppsignaler. Dette skiller seg fra fullskanning, der et bredere \\(m/z\\)-område registreres." },
    { kind: "p", text: "Ved å bruke mer måletid på et begrenset antall ioner kan SIM i mange oppsett gi bedre signalstatistikk enn en bred skanning. Gevinsten avhenger av instrument og metode og er ikke en del av selve definisjonen." },
  ],
  demo: "sim-utvalg",
  depth: {
    title: "Dybde: SIM velger ionetoppsignaler, ikke reaksjoner",
    blocks: [
      { kind: "p", text: "SIM beskriver registrering av utvalgte ionetoppsignaler i ett massetrinn. Det skal ikke blandes med [MRM](begrep:mrm), som følger bestemte forløper–produkt-relasjoner gjennom flere stadier av massespektrometri." },
      { kind: "p", text: "Færre overvåkede ioner kan gi mer tid per ion, men samtidig mindre informasjon om resten av massespekteret. Valget er derfor en avveining mellom målrettet måling og bred spektral informasjon." },
    ],
  },
  sources: [SOURCES.iupacSIM],
  status: "publisert",
};