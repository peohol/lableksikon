import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const signalstoy: PublishedTerm = {
  slug: "signalstoy",
  title: "Signal-støy-forhold",
  category: "deteksjon",
  definition: "Forholdet mellom signalets styrke og styrken til bakgrunnsstøyen, beregnet etter en angitt konvensjon.",
  aliases: ["S/N", "SNR", "signal-to-noise", "støy"],
  explanation: [
    { kind: "p", text: "IUPAC definerer signal-støy-forholdet som signalets effekt delt på støyens effekt. Når signal og støy måles som amplituder under samme betingelser, brukes ofte et tilsvarende forhold mellom RMS-amplitudene." },
    { kind: "p", text: "I analytiske instrumenter finnes flere praktiske algoritmer for å anslå signal og støy. Derfor er et oppgitt S/N-tall bare sammenlignbart når målemetode, tidsvindu, filtrering og øvrige innstillinger er kjent." },
  ],
  demo: "signalstoy-forhold",
  depth: {
    title: "Dybde: S/N er ikke en universell topphøydeformel",
    blocks: [
      { kind: "p", text: "I kromatografi omtales S/N ofte som forholdet mellom en topp og lokal grunnlinjestøy, men programvarer kan bruke topphøyde, peak-to-peak-støy, RMS-støy eller andre definisjoner. Tallet er derfor metodeavhengig." },
      { kind: "p", text: "S/N kan være nyttig nær metodens [deteksjonsgrense](begrep:deteksjonsgrense), men en bestemt S/N-verdi er ikke i seg selv en universell definisjon av deteksjons- eller kvantifiseringsgrensen." },
    ],
  },
  sources: [SOURCES.iupacSignalNoise],
  status: "publisert",
};