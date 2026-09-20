import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const lcms: PublishedTerm = {
  slug: "lcms",
  title: "LC-MS",
  category: "deteksjon",
  definition: "Koblet teknikk der væskekromatografi separerer prøvekomponentene før de detekteres med et massespektrometer.",
  aliases: ["LC/MS", "HPLC-MS", "liquid chromatography mass spectrometry", "LC-MS/MS"],
  explanation: [
    { kind: "p", text: "LC-delen fordeler stoffene i tid ved hjelp av [mobilfase](begrep:mobilfase) og [stasjonærfase](begrep:stasjonarfase). Deretter må forbindelsene overføres fra væskestrømmen til gassfaseioner som kan analyseres med [massespektrometri](begrep:massespektrometri)." },
    { kind: "p", text: "Elektrospray og APCI er vanlige grensesnitt, men LC-MS er ikke synonymt med én bestemt [ioniseringsmetode](begrep:ionisering). Valg av kilde og betingelser påvirker respons, ionetyper og matriseeffekter." },
  ],
  demo: "lcms-kobling",
  depth: {
    title: "Dybde: separasjon og deteksjon er to forskjellige trinn",
    blocks: [
      { kind: "p", text: "Kromatografien kan skille forbindelser som ellers ville konkurrert i ionekilden eller gitt overlappende massesignaler. Massespektrometeret tilfører samtidig \\(m/z\\)- og eventuelt fragmentinformasjon." },
      { kind: "p", text: "LC-MS kombinerer derfor ortogonale informasjonskilder, men koblingen fjerner ikke [matriseeffekter](begrep:matriseeffekt) eller [interferenser](begrep:interferens). Metoden må fortsatt valideres som helhet." },
    ],
  },
  sources: [SOURCES.iupacLCMS],
  status: "publisert",
};