import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const internstandard: PublishedTerm = {
  slug: "internstandard",
  title: "Internstandard",
  category: "kalibrering",
  definition: "Et stoff som tilsettes i kjent mengde og brukes som intern referanse for identifikasjon eller kvantifisering av analytten.",
  aliases: ["internal standard", "IS", "isotopmerket", "responsforhold", "surrogate"],
  explanation: [
    { kind: "p", text: "Hvis analytt og internstandard påvirkes på samme måte av en variasjonskilde, kan forholdet mellom signalene være mer stabilt enn analyttsignalet alene. Kvantitativ respons beregnes derfor ofte som analyttsignal dividert på internstandardsignal og brukes videre i [kalibreringen](begrep:kalibreringskurve)." },
    { kind: "p", text: "Internstandarden må velges og tilsettes slik at den faktisk følger de variasjonene man ønsker å korrigere for. En internstandard som tilsettes etter prøveopparbeidingen kan for eksempel ikke korrigere for tap som allerede har skjedd." },
  ],
  demo: "internstandard-forhold",
  depth: {
    title: "Dybde: isotopmerkede standarder og begrensningene ved korreksjonen",
    blocks: [
      { kind: "p", text: "I kvantitativ massespektrometri er en isotopmerket variant av analytten ofte den foretrukne surrogate internstandarden fordi kjemisk oppførsel, retensjon og ionisering ligner analytten tett." },
      { kind: "p", text: "Korreksjonen er bare så god som samsvaret. Hvis [matriseeffekt](begrep:matriseeffekt), ekstraksjon eller nedbrytning påvirker analytt og internstandard forskjellig, kan responsforholdet fortsatt være skjevt." },
      { kind: "p", text: "Når en [responsfaktor](begrep:responsfaktor) eller relativ respons brukes, må den være dokumentert under de aktuelle betingelsene; internstandardisering gjør ikke responsforholdet til en universell konstant." },
    ],
  },
  sources: [SOURCES.iupacInternalStandard, SOURCES.iupacSurrogateInternalStandard, SOURCES.eurachem2025],
  status: "publisert",
};
