import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const verifisering: PublishedTerm = {
  slug: "verifisering",
  title: "Verifisering",
  category: "kvalitet",
  definition: "Fremskaffelse av objektiv evidens for at spesifiserte krav er oppfylt.",
  aliases: ["verification", "verifisere", "krav", "metodeinnføring"],
  explanation: [
    { kind: "p", text: "Når et laboratorium tar i bruk en etablert metode, er spørsmålet ofte ikke om hele metoden skal utvikles og valideres på nytt, men om de relevante kravene faktisk oppfylles under lokale forhold." },
    { kind: "p", text: "Det er en typisk bruk av verifisering. Begrepet er likevel bredere: kjernen er dokumentert, objektiv evidens for at spesifiserte krav er oppfylt." },
  ],
  demo: "verifisering-krav",
  depth: {
    title: "Dybde: forskjellen mellom verifisering og validering",
    blocks: [
      { kind: "p", text: "[Validering](begrep:validering) er en særskilt form for verifisering der man også har vurdert at kravene er passende for den tiltenkte bruken. Derfor er ikke all verifisering validering." },
      { kind: "p", text: "Omfanget av lokal verifisering bør bestemmes av metode, endringer, risiko, anvendelsesområde og hvilke ytelsesdata som allerede finnes. «Standardmetode» betyr ikke at laboratoriet kan hoppe over å vise at relevante krav oppfylles lokalt." },
    ],
  },
  sources: [SOURCES.vimVerification, SOURCES.vimValidation, SOURCES.eurachem2025],
  status: "publisert",
};
