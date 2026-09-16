import type { PublishedTerm } from "../schema";

export const linearitet: PublishedTerm = {
  slug: "linearitet",
  title: "Linearitet",
  category: "kalibrering",
  definition: "Hvor godt målesignalet følger en rett linje når konsentrasjonen øker.",
  aliases: ["kurve", "regresjon", "R²", "residualer", "metning", "rett linje", "kalibreringskurve"],
  explanation: [
    {
      kind: "p",
      text: "Dobler du mengden stoff, bør signalet også dobles. Er det slik i hele området du bruker, er metoden lineær der — og da kan konsentrasjonen leses rett av kalibreringskurven.",
    },
    {
      kind: "p",
      text: "I praksis flater kurven ofte ut i toppen. Detektoren blir mettet, og to ganske ulike høye konsentrasjoner gir nesten samme signal. Da må prøven fortynnes ned i området der linja fortsatt er rett, ellers blir høye verdier systematisk underrapportert.",
    },
  ],
  demo: "linearitet-kurve",
  depth: {
    title: "Dybde: regresjon, residualer og hvorfor R² ikke er nok",
    blocks: [
      {
        kind: "p",
        text: "Kalibreringen tilpasses vanligvis med minste kvadraters metode, y = a + bx. R² sier bare hvor mye av variasjonen modellen forklarer, og en tydelig krum kurve kan fortsatt gi R² over 0,99. Derfor vurderes linearitet på residualplottet: tilfeldig spredning rundt null er greit, et systematisk buemønster er ikke.",
      },
      {
        kind: "p",
        text: "Arbeidsområdet er den delen av kurven der linja faktisk gjelder, nedad begrenset av [deteksjonsgrense](begrep:deteksjonsgrense) og oppad av metning.",
      },
      {
        kind: "p",
        text: "Når spredningen øker med konsentrasjonen, vekter ulik varians de høye punktene for tungt; vektet regresjon (1/x eller 1/x²) gir bedre treff i nedre del av området.",
      },
    ],
  },
  status: "publisert",
};
