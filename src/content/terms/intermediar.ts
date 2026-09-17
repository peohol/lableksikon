import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const intermediar: PublishedTerm = {
  slug: "intermediar",
  title: "Intermediær presisjon",
  category: "kvalitet",
  definition: "Presisjon innen samme laboratorium over lengre tid, der enkelte betingelser som dag, kalibrering, operatør eller målesystem kan variere.",
  aliases: ["mellomliggende", "between-run", "intermediate precision", "inter-serie"],
  explanation: [
    { kind: "p", text: "Intermediær presisjon spør om metoden fortsatt gir sammenlignbare resultater når hverdagen på laboratoriet får variere litt: ny dag, ny kalibrering eller en annen operatør, men fortsatt samme laboratorium og samme måleprosedyre." },
    { kind: "p", text: "Den ligger derfor mellom [repeterbarhet](begrep:repeterbarhet), som holder nesten alt fast, og [reproduserbarhet](begrep:reproduserbarhet), som omfatter ulike laboratorier." },
  ],
  demo: "presisjon-spredning",
  depth: {
    title: "Dybde: hvilke betingelser kan variere",
    blocks: [
      { kind: "p", text: "VIM krever samme måleprosedyre og samme sted, men åpner for endringer som nye kalibreringer, kalibratorer, operatører og målesystemer over et lengre tidsrom." },
      { kind: "p", text: "Hvilke faktorer som faktisk er endret må beskrives. Et tall for intermediær presisjon uten informasjon om betingelsene er derfor ufullstendig." },
      { kind: "p", text: "I rutineanalytikk er intermediær presisjon ofte særlig nyttig fordi den fanger opp mer av den normale laboratorievariasjonen enn repeterbarhet og kan inngå i vurdering av [måleusikkerhet](begrep:maleusikkerhet)." },
    ],
  },
  sources: [SOURCES.vim, SOURCES.eurachemValidation, SOURCES.eurachemUncertainty],
  status: "publisert",
};
