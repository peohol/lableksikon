import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const kontrollkort: PublishedTerm = {
  slug: "kontrollkort",
  title: "Kontrollkort",
  category: "kvalitet",
  definition: "En tidsordnet graf med en sentrallinje og statistiske grenser som brukes til å oppdage endringer i en prosess utover forventet tilfeldig variasjon.",
  aliases: ["shewhart", "kontrollgrense", "trend", "quality control chart"],
  explanation: [
    { kind: "p", text: "Et kontrollkort viser kontrollresultater i den rekkefølgen de oppstår. Så lenge variasjonen ser ut som forventet tilfeldig variasjon, ligger prosessen statistisk stabilt." },
    { kind: "p", text: "En enkelt verdi utenfor en kontrollgrense kan være et alarmsignal, men mønstre innenfor grensene — som langvarig drift eller mange punkter på samme side av midtlinjen — kan også tyde på at prosessen har endret seg." },
  ],
  demo: "standardavvik-formel",
  depth: {
    title: "Dybde: kontrollgrenser er ikke det samme som akseptgrenser",
    blocks: [
      { kind: "p", text: "Kontrollgrenser beregnes fra den statistiske variasjonen i en stabil prosess og brukes til å oppdage særskilte årsaker til variasjon. De er derfor ikke det samme som medisinske, juridiske eller analytiske akseptgrenser." },
      { kind: "p", text: "Shewhart-kort er én familie av kontrollkort. Andre kort kan være bedre når man vil oppdage små, vedvarende skift eller håndtere andre datatyper." },
      { kind: "p", text: "For laboratorier brukes kontrollkort ofte til å følge kontrollprøver over tid og kan bidra til å avdekke endringer i [presisjon](begrep:presisjon) eller [skjevhet](begrep:skjevhet)." },
    ],
  },
  sources: [SOURCES.isoControlCharts],
  status: "publisert",
};
