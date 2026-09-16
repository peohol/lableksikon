import type { PublishedTerm } from "../schema";

export const deteksjonsgrense: PublishedTerm = {
  slug: "deteksjonsgrense",
  title: "Deteksjonsgrense",
  category: "kalibrering",
  definition: "Den minste mengden som kan skilles sikkert fra instrumentets egen støy.",
  aliases: ["LOD", "støy", "signal-støy", "blank", "ikke påvist", "grense", "hvisking", "LOQ"],
  explanation: [
    {
      kind: "p",
      text: "Alle instrumenter brummer litt, også når prøven er tom. Tenk på en samtale i et rom med vifte: normal tale hører du tydelig, en hvisking forsvinner i viftesuset — selv om hviskingen er der.",
    },
    {
      kind: "p",
      text: "Deteksjonsgrensen er hvor stort signalet må være før vi tør si at stoffet faktisk finnes i prøven. Under grensa er riktig svar «ikke påvist», ikke «null». Hvor lite du kan måle henger derfor sammen med hvor rolig bakgrunnen er, ikke bare med instrumentets følsomhet.",
    },
  ],
  demo: "deteksjonsgrense-stoy",
  depth: {
    title: "Dybde: LOD, LOQ og hvordan grensa fastsettes",
    blocks: [
      {
        kind: "p",
        text: "LOD estimeres oftest fra blankprøver som x̄_blank + 3s_blank, eller fra kalibreringskurvens standardfeil: 3,3 · s_y/b. Kvantifiseringsgrensen LOQ ligger høyere, typisk 10s, fordi det er strengere å oppgi et tall enn å slå fast at noe er der.",
      },
      {
        kind: "p",
        text: "Grensene er egenskaper ved hele metoden: opparbeiding, fortynning og [matriseeffekt](begrep:matriseeffekt) flytter dem. Derfor bør de bestemmes i reell matriks, med [blindprøver](begrep:blindprove) fra samme serie.",
      },
      {
        kind: "p",
        text: "Resultater under LOQ rapporteres som «< LOQ» med grensa oppgitt. Å regne videre på slike tall gir falsk presisjon.",
      },
    ],
  },
  status: "publisert",
};
