import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const kontrollkort: PublishedTerm = {
  slug: "kontrollkort",
  title: "Kontrollkort",
  category: "kvalitet",
  definition: "En tidsserie av kontrollresultater med senterlinje og statistiske kontrollgrenser, brukt til å oppdage endringer i en måleprosess.",
  aliases: ["control chart", "Shewhart", "kontrollgrense", "trend", "QC"],
  explanation: [
    { kind: "p", text: "En kontrollprøve kan være god i dag og dårlig neste måned. Derfor er enkeltsvaret mindre informativt enn utviklingen over tid. Et kontrollkort gjør denne utviklingen synlig." },
    { kind: "p", text: "Punkter utenfor kontrollgrenser eller bestemte ikke-tilfeldige mønstre kan varsle at prosessen har endret seg. Da undersøker laboratoriet årsaken før problemet får påvirke mange prøver." },
  ],
  demo: "kontrollkort-serie",
  depth: {
    title: "Dybde: kontrollgrenser er ikke spesifikasjonsgrenser",
    blocks: [
      { kind: "p", text: "Et Shewhart-kort beskriver statistisk stabilitet ved hjelp av en senterlinje og øvre og nedre kontrollgrenser beregnet fra prosessens variasjon eller en etablert modell. Grensene handler om prosessatferd over tid." },
      { kind: "p", text: "Aksept- eller spesifikasjonsgrenser svarer på et annet spørsmål: om et resultat oppfyller et krav. De bør derfor ikke forveksles med kontrollgrensene, selv om begge kan vises i samme kvalitetsarbeid." },
    ],
  },
  sources: [SOURCES.nistControlChart, SOURCES.eurachem2025],
  status: "publisert",
};
