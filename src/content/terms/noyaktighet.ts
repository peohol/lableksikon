import type { PublishedTerm } from "../schema";

export const noyaktighet: PublishedTerm = {
  slug: "noyaktighet",
  title: "Riktighet, presisjon og nøyaktighet",
  category: "kvalitet",
  definition:
    "Tre nærliggende begreper: presisjon er hvor samlet målingene er, riktighet er om de ligger rundt den sanne verdien, og nøyaktighet er begge egenskapene sett sammen.",
  aliases: ["accuracy", "trueness", "riktighet", "skjevhet", "bias", "nøyaktig"],
  explanation: [
    {
      kind: "p",
      text: "Tre ord som ofte brukes om hverandre, men som betyr tre forskjellige ting. Pilkast igjen: presisjon er hvor tett pilene sitter, riktighet er om de sitter rundt blinken, og nøyaktighet er begge samtidig.",
    },
    {
      kind: "p",
      text: "Skillet er praktisk, ikke pedantisk: [presisjon](begrep:presisjon) fikser du ved å gjenta og stramme opp rutinene, mens riktighet må avdekkes med referansemateriale eller ringtest. Gjentatte målinger alene avslører den aldri.",
    },
  ],
  demo: "riktighet-skiver",
  depth: {
    title: "Dybde: terminologien i ISO 5725 og VIM",
    blocks: [
      {
        kind: "p",
        text: "I ISO-terminologien er nøyaktighet (accuracy) samlebegrepet, satt sammen av riktighet (trueness) og presisjon. Dagligtalen bruker «nøyaktig» om begge deler, og det er der forvirringen oppstår.",
      },
      {
        kind: "p",
        text: "Riktighet uttrykkes som skjevhet, altså forskjellen mellom forventet middelverdi og en referanseverdi. Den kan korrigeres for, men korreksjonen har sin egen usikkerhet, som må inn i [budsjettet for måleusikkerhet](begrep:maleusikkerhet).",
      },
    ],
  },
  status: "publisert",
};
