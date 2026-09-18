import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const molmasse: PublishedTerm = {
  slug: "molmasse",
  title: "Molmasse",
  category: "enheter",
  definition: "Massen av et stoff dividert med stoffmengden, M = m/n.",
  aliases: ["molar mass", "g/mol", "kg/mol", "molvekt"],
  explanation: [
    { kind: "p", text: "Molmassen forteller hvor stor masse som svarer til én bestemt stoffmengde. Hvis M = 40,0 g/mol, har 0,250 mol en masse på 10,0 g." },
    { kind: "p", text: "SI-enheten er kg/mol, mens g/mol er svært vanlig i kjemi. Molmassen gjør det mulig å regne mellom masse og stoffmengde, og er derfor sentral når løsninger med kjent [molaritet](begrep:molaritet) skal lages fra en innveid masse." },
  ],
  demo: "molmasse-forhold",
  depth: {
    title: "Dybde: enheten er en del av størrelsen",
    blocks: [
      { kind: "p", text: "IUPAC definerer molmasse som masse dividert med stoffmengde. Den er altså en fysisk størrelse med enhet, ikke bare et tall knyttet til en kjemisk formel." },
      { kind: "p", text: "I g/mol får molmassen ofte samme numeriske verdi som relativ molekylmasse for et veldefinert molekyl, men størrelsene er ikke identiske: relativ molekylmasse er dimensjonsløs, mens molmasse har enhet." },
    ],
  },
  sources: [SOURCES.iupacMolarMass, SOURCES.bipmSI],
  status: "publisert",
};
