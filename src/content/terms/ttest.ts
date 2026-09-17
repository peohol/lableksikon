import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const ttest: PublishedTerm = {
  slug: "ttest",
  title: "t-test",
  category: "statistikk",
  definition: "En familie av hypotesetester som bruker en t-fordeling til å vurdere en middelverdi eller forskjell mellom middelverdier når variansen må estimeres fra dataene.",
  aliases: ["t-test", "Student t-test", "Student", "Welch", "paired t-test", "tosample t-test"],
  explanation: [
    { kind: "p", text: "En én-utvalgs t-test kan sammenligne et [gjennomsnitt](begrep:gjennomsnitt) med en referanseverdi. En to-utvalgs t-test kan sammenligne to middelverdier, og en paret t-test analyserer forskjellene innen matchede par." },
    { kind: "p", text: "Testen vurderer forskjellen relativt til den estimerte tilfeldige variasjonen. En større forskjell, mindre spredning eller flere uavhengige observasjoner gir typisk en større absolutt t-verdi." },
  ],
  demo: "ttest-signal-stoy",
  depth: {
    title: "Dybde: riktig t-test avhenger av design og antakelser",
    blocks: [
      { kind: "p", text: "Uavhengige og parede data krever ulike beregninger. For to uavhengige grupper trenger man heller ikke automatisk anta like varianser; Welch-varianten håndterer ulike varianser og utvalgsstørrelser." },
      { kind: "p", text: "Klassiske t-tester bygger på antakelser om blant annet uavhengighet og omtrentlig normalitet for den relevante tilfeldige komponenten. Robustheten avhenger av design, utvalgsstørrelse og hvor sterkt antakelsene brytes." },
      { kind: "p", text: "Konklusjonen avhenger av valgt [signifikansnivå](begrep:signifikansniva), men et [konfidensintervall](begrep:konfidensintervall) for forskjellen viser samtidig hvilke effektstørrelser dataene er forenlige med." },
    ],
  },
  sources: [SOURCES.nistTTest, SOURCES.nistTwoSampleTTest],
  status: "publisert",
};
