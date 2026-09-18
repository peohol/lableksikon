import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const ionisering: PublishedTerm = {
  slug: "ionisering",
  title: "Ionisering",
  category: "deteksjon",
  definition: "Dannelse av ett eller flere ioner fra nøytrale eller allerede ladde kjemiske arter.",
  aliases: ["ionization", "ESI", "APCI", "EI", "ionekilde"],
  explanation: [
    { kind: "p", text: "Ionisering gjør kjemiske arter elektrisk ladde slik at de kan manipuleres og måles i et [massespektrometer](begrep:massespektrometri). Det finnes mange ioniseringsmetoder, og de passer til ulike prøver og analytttyper." },
    { kind: "p", text: "ESI og APCI brukes ofte sammen med [LC-MS](begrep:lcms), mens elektronionisering er vanlig i [GC-MS](begrep:gcms). Metoden påvirker hvilke ioner som dannes, ladningstilstandene og hvor mye [fragmentering](begrep:fragmentering) som skjer." },
  ],
  demo: "ionisering-ladning",
  depth: {
    title: "Dybde: ionisering er ikke én bestemt mekanisme",
    blocks: [
      { kind: "p", text: "Et ion kan dannes ved blant annet elektronoverføring, protonering, deprotonering, adduktdannelse eller andre prosesser. Derfor skal «ionisering» ikke leses som synonymt med bare én kilde, som elektrospray." },
      { kind: "p", text: "Ioniseringseffektiviteten kan påvirkes av andre stoffer i prøven. Dette er bakgrunnen for [ionesuppresjon](begrep:ionesuppresjon) og ioneforsterkning som viktige [matriseeffekter](begrep:matriseeffekt) i LC-MS." },
    ],
  },
  sources: [SOURCES.iupacIonization, SOURCES.iupacMassSpectrometer],
  status: "publisert",
};