import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const revisjonsspor: PublishedTerm = {
  slug: "revisjonsspor",
  title: "Revisjonsspor",
  category: "kvalitetssikring",
  definition: "Dokumentert spor som gjør relevante data- og dokumentendringer etterprøvbare, slik at man kan rekonstruere hva som ble gjort, av hvem og når.",
  aliases: ["audit trail", "endringslogg", "sporbar logg", "data integrity", "endringshistorikk"],
  explanation: [
    { kind: "p", text: "Et revisjonsspor bevarer historikken bak et resultat eller dokument i stedet for bare siste versjon. Det gjør det mulig å undersøke hvem som opprettet eller endret informasjon, tidspunktet og – når systemet krever det – begrunnelsen for endringen." },
    { kind: "p", text: "Dette er særlig viktig i elektroniske systemer, der data kan bearbeides, overføres og korrigeres uten synlige pennestrøk. Tilgangskontroll og beskyttelse mot uautoriserte endringer er derfor en del av samme datakontroll." },
  ],
  demo: "revisjonsspor-historikk",
  depth: {
    title: "Dybde: sporbar endring er noe annet enn metrologisk sporbarhet",
    blocks: [
      { kind: "p", text: "Revisjonsspor handler om dokument- og dataintegritet: å kunne følge handlinger og endringer i et system. [Metrologisk sporbarhet](begrep:sporbarhet) handler derimot om å relatere et måleresultat til en referanse gjennom en dokumentert ubrutt kalibreringskjede." },
      { kind: "p", text: "Hvilke hendelser som må logges og hvor detaljert, avhenger av system, risiko og gjeldende krav. Et godt revisjonsspor skal gjøre relevante endringer etterprøvbare uten å åpne for at historikken selv kan endres umerket." },
    ],
  },
  sources: [SOURCES.eurachemQac2026],
  status: "publisert",
};
