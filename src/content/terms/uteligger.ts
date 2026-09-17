import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const uteligger: PublishedTerm = {
  slug: "uteligger",
  title: "Uteligger",
  category: "statistikk",
  definition: "En observasjon som avviker markert fra de øvrige observasjonene eller fra det mønsteret en valgt statistisk modell beskriver.",
  aliases: ["outlier", "avviker", "ekstremverdi", "Grubbs", "anomalous observation"],
  explanation: [
    { kind: "p", text: "En verdi langt fra resten kan skyldes feil, tilfeldig variasjon, en annen datagenererende prosess eller et reelt og interessant fenomen. «Uteligger» betyr derfor ikke automatisk «feilmåling»." },
    { kind: "p", text: "Før en observasjon fjernes bør årsaken undersøkes og eventuelle eksklusjonsregler være faglig begrunnet. Å slette et punkt bare fordi det påvirker resultatet er ikke en gyldig statistisk begrunnelse." },
  ],
  demo: "uteligger-punkt",
  depth: {
    title: "Dybde: identifisering, testing og robuste analyser",
    blocks: [
      { kind: "p", text: "Formelle uteliggertester bygger på bestemte antakelser om datadistribusjonen. Grubbs' test er for eksempel beregnet for én uteligger i data som er omtrent [normalfordelte](begrep:normalfordeling)." },
      { kind: "p", text: "Hvis en mistenkt uteligger ikke kan dokumenteres som feil, kan robuste metoder eller sensitivitetsanalyser være bedre enn automatisk eksklusjon. [Medianen](begrep:median) påvirkes for eksempel mindre enn [gjennomsnittet](begrep:gjennomsnitt)." },
      { kind: "p", text: "I regresjon kan en observasjon være uvanlig i respons, i forklaringsvariabelen eller ha stor innflytelse på modellen. Derfor er «langt fra de andre» ikke én universell matematisk regel." },
    ],
  },
  sources: [SOURCES.nistOutliers],
  status: "publisert",
};
