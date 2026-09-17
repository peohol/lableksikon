import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const responsfaktor: PublishedTerm = {
  slug: "responsfaktor",
  title: "Responsfaktor",
  category: "kalibrering",
  definition: "Forholdet mellom målerespons og analyttmengde eller -konsentrasjon under spesifiserte målebetingelser.",
  aliases: ["response factor", "RF", "RRF", "relative response factor", "respons per konsentrasjon"],
  explanation: [
    { kind: "p", text: "Hvis 10 enheter analytt gir respons 500, er responsfaktoren i den enkle formen 500/10 = 50 responsenheter per analyttenhet. Verdien avhenger av instrument, metodebetingelser, analytt og eventuelt matriks." },
    { kind: "p", text: "Ved [internstandard](begrep:internstandard) brukes ofte et responsforhold mellom analytt og internstandard. En relativ responsfaktor beskriver da hvordan to stoffer responderer forskjellig under de samme betingelsene." },
  ],
  demo: "responsfaktor-forhold",
  depth: {
    title: "Dybde: forhold, stigningstall og når responsfaktoren varierer",
    blocks: [
      { kind: "p", text: "For en lineær modell som går gjennom origo, er respons per analyttnivå konstant og tilsvarer modellens stigningstall. Har modellen et ikke-null [konstantledd](begrep:nullpunkt), vil det enkle forholdet respons/x variere med nivået." },
      { kind: "p", text: "Responsfaktorer bør derfor brukes innen den kalibreringsmodellen og det [arbeidsområdet](begrep:arbeidsomrade) de er dokumentert for. De er ikke universelle stoffkonstanter." },
      { kind: "p", text: "I kromatografi og massespektrometri kan responsfaktorer være nyttige for å sammenligne detektorrespons eller korrigere mot en standard, men en full [kalibreringskurve](begrep:kalibreringskurve) gir mer informasjon om modellatferden gjennom området." },
    ],
  },
  sources: [SOURCES.eurachem2025, SOURCES.iupacMetrology2021],
  status: "publisert",
};
