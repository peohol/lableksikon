import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const intermediar: PublishedTerm = {
  slug: "intermediar",
  title: "Intermediær presisjon",
  category: "kvalitet",
  definition: "Presisjon innen samme laboratorium når relevante forhold, som dag, operatør eller utstyr, får variere.",
  aliases: ["intermediate precision", "mellomliggende presisjon", "between-run", "within-lab"],
  explanation: [
    { kind: "p", text: "En metode kan være svært stabil i én analyseserie og likevel variere mer gjennom en vanlig arbeidsuke. Intermediær presisjon prøver å fange nettopp denne normale variasjonen innen laboratoriet." },
    { kind: "p", text: "Forsøket legges derfor opp slik at relevante faktorer varierer, for eksempel dager og operatører. Det er bredere enn [repeterbarhet](begrep:repeterbarhet), men omfatter ikke forskjeller mellom laboratorier slik [reproduserbarhet](begrep:reproduserbarhet) gjør." },
  ],
  demo: "intermediar-forhold",
  depth: {
    title: "Dybde: mellom korttidsserie og laboratorier",
    blocks: [
      { kind: "p", text: "Hvilke forhold som varieres, skal oppgis. VIM nevner blant annet kalibrering, operatør, målesystem og tid som mulige forhold innen samme sted." },
      { kind: "p", text: "Intermediær presisjon er ofte mer representativ for den tilfeldige variasjonen i rutinedrift enn et rent repeterbarhetsforsøk, men resultatet avhenger av at forsøket faktisk dekker de variasjonskildene laboratoriet møter." },
    ],
  },
  sources: [SOURCES.vimIntermediatePrecision, SOURCES.eurachem2025],
  status: "publisert",
};
