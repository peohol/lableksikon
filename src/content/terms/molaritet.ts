import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const molaritet: PublishedTerm = {
  slug: "molaritet",
  title: "Molaritet",
  category: "enheter",
  definition: "Tradisjonell betegnelse for stoffmengdekonsentrasjon: stoffmengden av en bestanddel dividert med blandingens volum.",
  aliases: ["amount concentration", "stoffmengdekonsentrasjon", "molar concentration", "mol/L", "mol l-1", "mol dm-3"],
  explanation: [
    { kind: "p", text: "En løsning som inneholder 0,100 mol av et stoff i et sluttvolum på 0,500 L, har stoffmengdekonsentrasjonen 0,200 mol/L. Nevneren er volumet av den ferdige blandingen, ikke volumet av løsemiddelet før stoffet tilsettes." },
    { kind: "p", text: "IUPAC bruker stoffmengdekonsentrasjon (amount concentration) som hovedterm og omtaler molarity som en eldre eller alternativ betegnelse. Mol/L er vanlig i laboratoriet; den koherente SI-enheten er mol/m³." },
  ],
  demo: "molaritet-forhold",
  depth: {
    title: "Dybde: volumet gjør molaritet temperaturavhengig",
    blocks: [
      { kind: "p", text: "Stoffmengden endres ikke når en lukket løsning varmes moderat opp, men volumet kan gjøre det. Derfor kan stoffmengdekonsentrasjonen endres med temperaturen selv om mengden analytt er den samme." },
      { kind: "p", text: "Ved tillaging fra fast stoff brukes [molmassen](begrep:molmasse) til å regne innveid masse om til stoffmengde før løsningen bringes til ønsket sluttvolum." },
    ],
  },
  sources: [SOURCES.iupacAmountConcentration, SOURCES.iupacMolarity],
  status: "publisert",
};
