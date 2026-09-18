import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const provemengde: PublishedTerm = {
  slug: "provemengde",
  title: "Prøvemengde",
  category: "provetaking",
  definition: "Massen eller volumet av prøvemateriale som tas inn i et bestemt trinn av analysen.",
  aliases: ["sample amount", "sample intake", "innveid mengde", "test portion", "prøvevolum"],
  explanation: [
    { kind: "p", text: "Når det gjelder den delen av testprøven som faktisk tas inn i analysen, bruker IUPAC termen test portion: en kjent masse eller et kjent volum som tas for analyse." },
    { kind: "p", text: "For liten prøvemengde kan gjøre uttaket lite representativt i et heterogent materiale. For stor mengde kan på sin side overskride kapasiteten til [ekstraksjon](begrep:ekstraksjon), [oppslutning](begrep:oppslutning), instrument eller kalibreringsområde." },
  ],
  demo: "provemengde-heterogenitet",
  depth: {
    title: "Dybde: minste prøvemengde kan være en del av metodens gyldighet",
    blocks: [
      { kind: "p", text: "IUPAC definerer minimum sample size som den nedre prøvemengden som er fastsatt i dokumentasjonen for en kjemisk analyse. Går man under denne grensen, kan oppgitte ytelsesdata eller sertifiserte egenskapsverdier ikke uten videre antas å gjelde." },
      { kind: "p", text: "Sammenhengen mellom prøvemengde og heterogenitet er grunnen til at [homogenisering](begrep:homogenisering) og tilstrekkelig stor testportion ofte må vurderes samlet." },
    ],
  },
  sources: [SOURCES.iupacTestPortion, SOURCES.iupacMinimumSampleSize, SOURCES.iupacMaterialHomogeneity],
  status: "publisert",
};