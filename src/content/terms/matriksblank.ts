import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const matriksblank: PublishedTerm = {
  slug: "matriksblank",
  title: "Matriksblank",
  category: "prove",
  definition: "Et blankmateriale som består av samme eller relevant prøvematriks, med ingen eller så lite som mulig av analytten som undersøkes.",
  aliases: ["matrix blank", "blank matrix", "analyttfri matriks", "blankmatriks", "matrix-free analyte"],
  explanation: [
    { kind: "p", text: "En matriksblank skal etterligne prøvens øvrige innhold uten at analytten selv bidrar vesentlig. Den kan derfor vise signaler og [interferenser](begrep:interferens) som en ren løsemiddelblank ikke fanger opp." },
    { kind: "p", text: "IUPAC omtaler «matrix blank» som én type blankmateriale. Det er ikke alltid mulig å skaffe en perfekt analyttfri matriks; da må laboratoriet dokumentere hvordan bakgrunn eller endogent analyttnivå håndteres." },
  ],
  demo: "matriksblank-sammenligning",
  depth: {
    title: "Dybde: matriksblank, løsemiddelblank og spiket blank",
    blocks: [
      { kind: "p", text: "En løsemiddelblank kan avdekke bidrag fra instrument og løsemiddel, mens en matriksblank i tillegg inkluderer matrikskomponenter. En prosedyreblank kan på sin side være laget for å følge hele prøveopparbeidingen." },
      { kind: "p", text: "Når analytt tilsettes en matriksblank, blir materialet en spiket eller fortified blank. Slike prøver kan blant annet brukes til å undersøke [gjenvinning](begrep:gjenvinning), presisjon og deler av matriseeffekten." },
      { kind: "p", text: "Matriksblanker brukes også ved [matrikstilpasset kalibrering](begrep:matrikstilpasset), men den tilgjengelige blankmatriksen må være representativ for de virkelige prøvene." },
    ],
  },
  sources: [SOURCES.iupacBlank, SOURCES.eurachem2025],
  status: "publisert",
};
