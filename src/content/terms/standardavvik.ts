import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const standardavvik: PublishedTerm = {
  slug: "standardavvik",
  title: "Standardavvik",
  category: "statistikk",
  definition: "Et mål på spredningen i data, uttrykt i samme enhet som observasjonene.",
  aliases: ["standard deviation", "s", "sigma", "σ", "spredning", "RSD"],
  explanation: [
    { kind: "p", text: "Standardavviket oppsummerer hvor mye observasjonene sprer seg rundt [gjennomsnittet](begrep:gjennomsnitt). Liten spredning gir lite standardavvik; stor spredning gir stort." },
    { kind: "p", text: "Standardavviket er kvadratroten av [variansen](begrep:varians), slik at svaret får samme enhet som de opprinnelige målingene." },
  ],
  demo: "standardavvik-formel",
  depth: {
    title: "Dybde: utvalgsstandardavvik, frihetsgrader og pooling",
    blocks: [
      { kind: "h3", text: "Utvalg og n − 1" },
      { kind: "p", text: "For et utvalg beregnes s vanligvis som kvadratroten av summen av kvadrerte avvik dividert på n − 1. Når gjennomsnittet er estimert fra de samme dataene, er én [frihetsgrad](begrep:frihetsgrader) brukt." },
      { kind: "h3", text: "Hvor sikkert er s?" },
      { kind: "p", text: "Et standardavvik fra få replikater er selv usikkert. Flere sammenlignbare serier kan gi et mer stabilt estimat dersom variansinformasjonen kombineres med riktige frihetsgrader." },
      { kind: "h3", text: "Forholdet til presisjon" },
      { kind: "p", text: "Standardavvik er ett vanlig tallfestingsmål for [presisjon](begrep:presisjon). Det beskriver spredning, ikke [systematisk skjevhet](begrep:skjevhet), og relativt standardavvik blir vanskelig å tolke når middelverdien ligger nær null." },
    ],
  },
  sources: [SOURCES.nistStandardDeviation],
  status: "publisert",
};
