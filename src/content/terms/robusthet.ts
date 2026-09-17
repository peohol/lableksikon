import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const robusthet: PublishedTerm = {
  slug: "robusthet",
  title: "Robusthet",
  category: "kvalitet",
  definition: "Hvor lite metodens ytelse påvirkes av små, bevisste variasjoner i metodebetingelser som kan oppstå i normal bruk.",
  aliases: ["ruggedness", "robustness", "tåler", "variasjon"],
  explanation: [
    { kind: "p", text: "En robust metode tåler små realistiske variasjoner uten at resultatet endrer seg uakseptabelt. Det kan for eksempel være en liten endring i temperatur, ekstraksjonstid eller mobilfasesammensetning." },
    { kind: "p", text: "Robusthet testes bevisst: man varierer relevante faktorer innenfor et realistisk område og ser om metodeytelsen fortsatt oppfyller kravene." },
  ],
  demo: "linearitet-kurve",
  depth: {
    title: "Dybde: robusthet undersøker følsomhet for metodebetingelser",
    blocks: [
      { kind: "p", text: "Robusthetsstudier bør ta utgangspunkt i faktorer som faktisk kan variere i rutinen og som plausibelt kan påvirke resultatet. Målet er ikke å stresse metoden vilkårlig, men å avdekke kritiske betingelser." },
      { kind: "p", text: "Flere faktorer kan undersøkes systematisk i et forsøksdesign. Det gjør det mulig å skille faktorer med reell effekt fra variasjon som metoden tåler." },
      { kind: "p", text: "Resultatet brukes både i [validering](begrep:validering) og til å fastsette praktiske toleranser i metodebeskrivelsen." },
    ],
  },
  sources: [SOURCES.eurachemValidation],
  status: "publisert",
};
