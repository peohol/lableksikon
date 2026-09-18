import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const ledningsevne: PublishedTerm = {
  slug: "ledningsevne",
  title: "Ledningsevnedetektor",
  category: "deteksjon",
  definition: "Detektor som registrerer endringer i en løsnings elektriske ledningsevne når ioniske komponenter passerer målecellen.",
  aliases: ["konduktivitet", "conductivity detector", "conductometric detector", "ionekromatografi"],
  explanation: [
    { kind: "p", text: "Elektrisk ledningsevne avhenger av hvilke ioner som finnes i løsningen og konsentrasjonene deres. En ledningsevnedetektor kan derfor registrere ioniske prøvekomponenter som endringer relativt til mobilfasens bakgrunn." },
    { kind: "p", text: "Detektortypen er særlig vanlig i ionekromatografi. Suppresjon kan brukes for å redusere bakgrunnsledningsevnen eller endre analyttresponsen, men suppressor er ikke en del av selve definisjonen av konduktometrisk deteksjon." },
  ],
  demo: "ledningsevne-celle",
  depth: {
    title: "Dybde: målesignalet kommer fra alle ledende ioner",
    blocks: [
      { kind: "p", text: "Konduktometri er i utgangspunktet ikke molekylspesifikk: alle ioner i målecellen kan bidra til ledningsevnen. Kromatografisk separasjon og kjemien i eluaten er derfor avgjørende for selektiviteten." },
      { kind: "p", text: "Temperatur påvirker ionemobilitet og dermed ledningsevne. Stabil temperatur og kontrollert mobilfase er derfor viktige for en stabil grunnlinje." },
    ],
  },
  sources: [SOURCES.iupacConductometry, SOURCES.iupacChromDetector],
  status: "publisert",
};