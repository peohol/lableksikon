import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const kontaminering: PublishedTerm = {
  slug: "kontaminering",
  title: "Kontaminering",
  category: "prove",
  definition: "Uønsket tilførsel av analytt eller annet materiale til prøve, blank, reagens eller utstyr som kan påvirke måleresultatet.",
  aliases: ["contamination", "forurensning", "kontaminasjon", "sporstoff"],
  explanation: [
    { kind: "p", text: "Kontaminering kan komme fra beholdere, pipetter, laboratoriemiljø, reagenser, standarder eller tidligere arbeid. Ved sporanalyse kan svært små mengder være nok til å gi målbar feil." },
    { kind: "p", text: "Et uventet signal i en [blank](begrep:blindprove) kan være et tegn på kontaminering, men blanktypen avgjør hvor i prosessen feilen kan lokaliseres. En instrumentblank sier for eksempel lite om kontaminering som oppstår under prøveopparbeidingen." },
  ],
  demo: "kontaminering-kilde",
  depth: {
    title: "Dybde: finn hvor kontamineringen kommer inn",
    blocks: [
      { kind: "p", text: "Kontaminering bør forstås som en prosessfeil, ikke som én bestemt signaltype. Den kan påvirke ukjente prøver, kalibratorer, kontrollmaterialer og blanker og kan derfor både skape falskt høye resultater og skjule andre kvalitetsproblemer." },
      { kind: "p", text: "Eurachem anbefaler at prøver, reagenser og målestandarder lagres og håndteres slik at integriteten bevares og kontaminering unngås. Renhold, arbeidsflyt, separasjon av aktiviteter og passende blanker er vanlige kontrolltiltak." },
      { kind: "p", text: "Når materialet overføres fra én prøve eller prosess til en annen, er [krysskontaminering](begrep:krysskontaminering) et mer spesifikt begrep." },
    ],
  },
  sources: [SOURCES.eurachemQac2026, SOURCES.iupacBlank],
  status: "publisert",
};
