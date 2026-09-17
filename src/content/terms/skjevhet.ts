import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const skjevhet: PublishedTerm = {
  slug: "skjevhet",
  title: "Systematisk skjevhet",
  category: "kvalitet",
  definition: "Et estimat på systematisk målefeil, ofte vurdert som forskjellen mellom middelresultatet og en egnet referanseverdi.",
  aliases: ["bias", "systematisk feil", "trueness", "riktighet"],
  explanation: [
    { kind: "p", text: "Hvis mange gjentatte målinger samler seg rundt 104 når referansen er 100, er problemet ikke først og fremst spredningen. Metoden ligger systematisk forskjøvet." },
    { kind: "p", text: "Skjevhet er nært knyttet til [riktighet](begrep:noyaktighet): liten systematisk feil gir høyere riktighet. En svært [presis](begrep:presisjon) metode kan fortsatt ha betydelig skjevhet." },
  ],
  demo: "skjevhet-referanse",
  depth: {
    title: "Dybde: referanseverdi, korreksjon og usikkerhet",
    blocks: [
      { kind: "p", text: "Skjevhet kan vurderes mot et sertifisert referansemateriale, en referansemetode eller annen egnet referanse. Referanseverdien har selv usikkerhet, og forsøket har tilfeldig variasjon." },
      { kind: "p", text: "Kjent signifikant skjevhet bør normalt forstås og om mulig korrigeres. En korreksjon er ikke eksakt; usikkerheten knyttet til korreksjonen inngår i [måleusikkerheten](begrep:maleusikkerhet)." },
    ],
  },
  sources: [SOURCES.vimBias, SOURCES.vimTrueness, SOURCES.eurachem2025],
  status: "publisert",
};
