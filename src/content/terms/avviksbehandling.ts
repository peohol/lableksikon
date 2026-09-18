import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const avviksbehandling: PublishedTerm = {
  slug: "avviksbehandling",
  title: "Avviksbehandling",
  category: "kvalitetssikring",
  definition: "Styrt håndtering av arbeid eller resultater som ikke oppfyller krav, fra avgrensning og konsekvensvurdering til nødvendige korrigeringer, korrigerende tiltak og dokumentasjon.",
  aliases: ["nonconforming work", "avvik", "korrigerende tiltak", "corrective action", "feilhåndtering"],
  explanation: [
    { kind: "p", text: "Når et avvik oppdages, må laboratoriet først få kontroll på situasjonen: identifisere hva som er berørt, vurdere om arbeid eller rapporterte resultater kan være påvirket, og gjøre nødvendige umiddelbare korrigeringer." },
    { kind: "p", text: "Hvis avviket kan gjenta seg eller viser et underliggende problem, må årsaken undersøkes og korrigerende tiltak rettes mot denne. Poenget er ikke bare å «fikse tallet», men å hindre at samme problem skjer igjen." },
  ],
  demo: "avviksbehandling-steg",
  depth: {
    title: "Dybde: korreksjon og korrigerende tiltak er ikke det samme",
    blocks: [
      { kind: "p", text: "En korreksjon håndterer den konkrete feilen her og nå, for eksempel å stoppe en analyseserie eller rette en dokumentert feil. Et korrigerende tiltak retter seg mot årsaken til avviket for å redusere risikoen for gjentakelse." },
      { kind: "p", text: "God avviksbehandling omfatter også vurdering av tidligere arbeid som kan være berørt, tydelig ansvar, dokumentasjon og oppfølging av om tiltakene faktisk virker. Omfanget bør stå i forhold til risikoen." },
    ],
  },
  sources: [SOURCES.eurachemQac2026],
  status: "publisert",
};
