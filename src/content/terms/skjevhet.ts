import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const skjevhet: PublishedTerm = {
  slug: "skjevhet",
  title: "Skjevhet",
  category: "kvalitet",
  definition: "Et estimat av systematisk målefeil: hvor mye måleresultater i gjennomsnitt avviker fra en egnet referanseverdi.",
  aliases: ["bias", "systematisk", "feil", "riktighet"],
  explanation: [
    { kind: "p", text: "Hvis en metode konsekvent måler litt for høyt eller litt for lavt, har den skjevhet. Gjentatte målinger kan være svært [presise](begrep:presisjon) og likevel alle ligge på feil side av referanseverdien." },
    { kind: "p", text: "Skjevhet vurderes derfor ved å sammenligne mot en egnet referanse, for eksempel et sertifisert referansemateriale, en referansemetode eller et kjent tilsatt nivå når det er faglig forsvarlig." },
  ],
  demo: "riktighet-skiver",
  depth: {
    title: "Dybde: bias er et estimat av systematisk feil",
    blocks: [
      { kind: "p", text: "VIM definerer measurement bias som et estimat av systematisk målefeil. Skjevhet kan uttrykkes absolutt eller relativt, men tallet avhenger av hvilken referanse og hvilke betingelser som brukes." },
      { kind: "p", text: "Riktighet er et kvalitativt begrep, mens skjevhet er et numerisk mål som kan brukes til å beskrive manglende riktighet. De to bør derfor ikke brukes som synonymer." },
      { kind: "p", text: "Dersom en kjent systematisk effekt korrigeres, må usikkerheten i korreksjonen fortsatt tas med i vurderingen av [måleusikkerhet](begrep:maleusikkerhet)." },
    ],
  },
  sources: [SOURCES.vim, SOURCES.eurachemValidation, SOURCES.eurachemUncertainty],
  status: "publisert",
};
