import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const varians: PublishedTerm = {
  slug: "varians",
  title: "Varians",
  category: "statistikk",
  definition: "Et mål på spredning basert på gjennomsnittet av kvadrerte avvik fra en middelverdi; standardavviket er kvadratroten av variansen.",
  aliases: ["variance", "s2", "s²", "sigma2", "σ²", "spredningsmål"],
  explanation: [
    { kind: "p", text: "Avvikene fra [gjennomsnittet](begrep:gjennomsnitt) kan være både positive og negative. Ved å kvadrere dem unngår man at de opphever hverandre, og store avvik får større vekt." },
    { kind: "p", text: "Varians får enheten kvadrert, for eksempel \\((\\mathrm{mg/L})^2\\). [Standardavviket](begrep:standardavvik) er derfor ofte enklere å tolke direkte fordi det har samme enhet som dataene." },
  ],
  demo: "varians-kvadrater",
  depth: {
    title: "Dybde: n, n − 1 og hva variansen estimerer",
    blocks: [
      { kind: "p", text: "For en full populasjon kan variansen beskrives som gjennomsnittet av kvadrerte avvik fra populasjonsmiddelverdien. Når en populasjonsvarians estimeres fra et utvalg med et gjennomsnitt beregnet fra de samme dataene, brukes vanligvis n − 1 i nevneren." },
      { kind: "p", text: "n − 1 henger sammen med [frihetsgrader](begrep:frihetsgrader): etter at utvalgsgjennomsnittet er fastlagt, kan ikke alle avvikene fra gjennomsnittet variere uavhengig." },
      { kind: "p", text: "Varians er særlig praktisk matematisk fordi uavhengige variansbidrag kan kombineres på en måte som standardavvik ikke kan ved enkel summering." },
    ],
  },
  sources: [SOURCES.nistStandardDeviation, SOURCES.iupacDegreesFreedom],
  status: "publisert",
};
