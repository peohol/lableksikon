import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const massespektrometri: PublishedTerm = {
  slug: "massespektrometri",
  title: "Massespektrometri",
  category: "deteksjon",
  definition: "Analyse av gassfaseioner ved å skille eller karakterisere dem etter masse-til-ladning-forholdet og registrere ionenes intensitet.",
  aliases: ["MS", "mass spectrometry", "m/z", "massespektrometer"],
  explanation: [
    { kind: "p", text: "Et massespektrometer arbeider med ioner, ikke nøytrale molekyler. Prøvekomponentene må derfor først gjennom [ionisering](begrep:ionisering), før ionene separeres eller analyseres etter \\(m/z\\) og registreres." },
    { kind: "p", text: "Et massespektrum viser intensitet som funksjon av \\(m/z\\). Fordi både masse og ladning inngår, er \\(m/z\\) ikke det samme som molekylmasse; et dobbeltladet ion opptrer for eksempel ved omtrent halv \\(m/z\\) sammenlignet med et tilsvarende enkeltladet ion." },
  ],
  demo: "massespektrometri-kjede",
  depth: {
    title: "Dybde: fra molekyl til massespektrum",
    blocks: [
      { kind: "p", text: "Den klassiske arbeidskjeden er ionekilde → masseanalysator → detektor. Ulike instrumenttyper realiserer disse trinnene forskjellig, men felles er at en måler ioner og deres \\(m/z\\)-relaterte respons." },
      { kind: "p", text: "I tandem-massespektrometri kan bestemte ioner velges, [fragmenteres](begrep:fragmentering) og produkt-ionene analyseres videre. Dette gir mer struktur- og identitetsinformasjon enn et enkelt \\(m/z\\)-signal alene." },
    ],
  },
  sources: [SOURCES.iupacMassSpectrometry, SOURCES.iupacMassSpectrometer, SOURCES.iupacMSMS],
  status: "publisert",
};