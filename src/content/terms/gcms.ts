import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const gcms: PublishedTerm = {
  slug: "gcms",
  title: "GC-MS",
  category: "deteksjon",
  definition: "Koblet teknikk der gasskromatografi separerer prøvekomponentene før de detekteres med et massespektrometer.",
  aliases: ["GC/MS", "gas chromatography mass spectrometry", "GC-MS/MS"],
  explanation: [
    { kind: "p", text: "I GC separeres forbindelser i en gassformig [mobilfase](begrep:mobilfase). Når de eluerer fra kolonnen, går de videre til [massespektrometeret](begrep:massespektrometri), som registrerer \\(m/z\\)-relaterte signaler." },
    { kind: "p", text: "Elektronionisering er svært vanlig i GC-MS og gir ofte reproducerbare, fragmentrike spektre som kan sammenlignes med biblioteker. Men GC-MS som begrep krever ikke én bestemt [ioniseringsmetode](begrep:ionisering)." },
  ],
  demo: "gcms-kobling",
  depth: {
    title: "Dybde: retensjonstid pluss massespektrum",
    blocks: [
      { kind: "p", text: "Et GC-MS-resultat kan kombinere kromatografisk [retensjonstid](begrep:retensjonstid) med spektral informasjon. De to dimensjonene kan sammen gi sterkere identifikasjonsgrunnlag enn hver av dem alene." },
      { kind: "p", text: "Forbindelsen må samtidig være egnet for GC-betingelsene, direkte eller etter derivatisering. Lite flyktige eller termisk ustabile forbindelser er ofte bedre egnet for andre koblinger, som [LC-MS](begrep:lcms)." },
    ],
  },
  sources: [SOURCES.iupacGCMS],
  status: "publisert",
};