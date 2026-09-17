import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const maleusikkerhet: PublishedTerm = {
  slug: "maleusikkerhet",
  title: "Måleusikkerhet",
  category: "kvalitet",
  definition: "En ikke-negativ parameter som beskriver spredningen i verdier som med tilgjengelig informasjon kan tilordnes størrelsen som måles.",
  aliases: ["measurement uncertainty", "usikkerhet", "usikkerhetsbudsjett", "standardusikkerhet", "U"],
  explanation: [
    { kind: "p", text: "Et måleresultat er ikke fullstendig beskrevet av ett tall alene. Kalibrering, [presisjon](begrep:presisjon), referanser og andre deler av måleprosessen gir informasjon om hvor stor usikkerhet som følger resultatet." },
    { kind: "p", text: "Det er fristende å kalle måleusikkerhet «intervallet der den sanne verdien ligger», men det er for enkelt. Formelt er usikkerheten en parameter som beskriver spredningen av verdier som kan tilordnes målestørrelsen ut fra den informasjonen vi har." },
  ],
  demo: "usikkerhetsbudsjett",
  depth: {
    title: "Dybde: standardusikkerhet, kombinasjon og systematiske effekter",
    blocks: [
      { kind: "p", text: "Usikkerhetsbidrag uttrykkes på en felles standardusikkerhetsskala og kombineres med en modell som tar hensyn til hvordan inngangsstørrelsene påvirker resultatet og om bidragene er korrelerte. Enkel kvadratisk summering gjelder bare i den enkle situasjonen med uavhengige bidrag og passende sensitivitetskoeffisienter." },
      { kind: "p", text: "Kjente systematiske effekter bør korrigeres når det er hensiktsmessig. Usikkerheten i korreksjonen og eventuell restskjevhet må fortsatt vurderes; [skjevhet](begrep:skjevhet) forsvinner ikke ved å kalle den tilfeldig." },
      { kind: "p", text: "Når standardusikkerheten multipliseres med en [dekningsfaktor](begrep:dekningsfaktor), får vi [utvidet måleusikkerhet](begrep:utvidet)." },
    ],
  },
  sources: [SOURCES.vimUncertainty, SOURCES.eurachem2025],
  status: "publisert",
};
