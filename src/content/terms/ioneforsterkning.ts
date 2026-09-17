import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const ioneforsterkning: PublishedTerm = {
  slug: "ioneforsterkning",
  title: "Ioneforsterkning",
  category: "prove",
  definition: "Økt ioniseringseffektivitet for en forbindelse fordi en annen forbindelse er til stede.",
  aliases: ["ion enhancement", "ionization enhancement", "ioneforsterking", "matrix enhancement", "LC-MS", "ESI"],
  explanation: [
    { kind: "p", text: "Matrikskomponenter kan gjøre at analytten gir sterkere signal enn den ville gjort i en enklere løsning ved samme mengde. Resultatet kan da bli for høyt dersom kalibreringen ikke gjenspeiler effekten." },
    { kind: "p", text: "Ioneforsterkning er, som [ionesuppresjon](begrep:ionesuppresjon), en form for [matriseeffekt](begrep:matriseeffekt) knyttet til ionisering. Retningen er motsatt, men problemet er det samme: responsen avhenger av mer enn analyttmengden alene." },
  ],
  demo: "ioneforsterkning-respons",
  depth: {
    title: "Dybde: samme analyttmengde kan gi sterkere respons",
    blocks: [
      { kind: "p", text: "IUPAC definerer ioneforsterkning som økt ioniseringseffektivitet i nærvær av en annen forbindelse. Effekten er særlig kjent ved elektrosprayionisering, men er ikke begrenset til én instrumentplattform." },
      { kind: "p", text: "En høy respons er derfor ikke nødvendigvis et tegn på bedre analytisk følsomhet. Dersom responsøkningen varierer mellom prøver, kan den i stedet øke skjevhet og variasjon." },
      { kind: "p", text: "Tiltak vurderes på samme måte som ved ionsuppresjon: separasjon, prøveopparbeiding, matrikstilpasset kalibrering og en representativ internstandard må dokumenteres for den aktuelle metoden." },
    ],
  },
  sources: [SOURCES.iupacIonEnhancement, SOURCES.iupacMatrixEffect, SOURCES.eurachem2025],
  status: "publisert",
};
