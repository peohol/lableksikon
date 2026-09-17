import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const krysskontaminering: PublishedTerm = {
  slug: "krysskontaminering",
  title: "Krysskontaminering",
  category: "prove",
  definition: "Uønsket overføring av materiale fra én prøve, løsning, beholder eller arbeidsprosess til en annen.",
  aliases: ["cross-contamination", "cross contamination", "carry-over", "carryover", "overslag", "overføring"],
  explanation: [
    { kind: "p", text: "Krysskontaminering oppstår når materiale som hører hjemme ett sted, følger med til et annet. Det kan skje ved felles utstyr, sprut, aerosoler, feil pipettering, urene overflater eller sekvensiell instrumentanalyse." },
    { kind: "p", text: "Instrumentell carry-over er én type krysskontaminering: materiale fra en foregående prøve eller reaksjon overføres til den neste. Men krysskontaminering er bredere og kan oppstå lenge før prøven når instrumentet." },
  ],
  demo: "krysskontaminering-sekvens",
  depth: {
    title: "Dybde: carry-over er bare én mekanisme",
    blocks: [
      { kind: "p", text: "IUPAC bruker carry-over om overføring av prøve- eller reagensmateriale mellom beholdere eller reaksjonsblandinger. I en analysesekvens kan en prøve med svært høy konsentrasjon derfor påvirke prøven som analyseres etterpå." },
      { kind: "p", text: "Krysskontaminering kan også skje under prøvetaking, opparbeiding og lagring. Risikoen må derfor vurderes gjennom hele kjeden, ikke bare i autosampleren." },
      { kind: "p", text: "Sekvensblinder, vasketrinn og analyser av høy-lav-serier kan avdekke instrumentell carry-over, mens fysisk separasjon og arbeidsrutiner er sentrale for å forebygge bredere krysskontaminering." },
    ],
  },
  sources: [SOURCES.iupacCarryOver, SOURCES.eurachemQac2026],
  status: "publisert",
};
