import type { PublishedTerm } from "../schema";

export const opplosning: PublishedTerm = {
  slug: "opplosning",
  title: "Kromatografisk oppløsning",
  category: "separasjon",
  definition: "Hvor godt to nabotopper er skilt fra hverandre.",
  aliases: ["resolution", "R", "toppseparasjon", "overlapp", "platetall", "selektivitet"],
  explanation: [
    {
      kind: "p",
      text: "To stoffer som kommer ut av kolonnen nesten samtidig, gir to topper som delvis ligger oppå hverandre. Tenk på to stemmer som snakker i kor: jo mer de overlapper, jo vanskeligere er det å høre hvem som sier hva.",
    },
    {
      kind: "p",
      text: "Oppløsning er et tall på hvor godt to nabotopper er skilt. Er den for lav, klarer du ikke å måle arealene hver for seg, og resultatet for det ene stoffet blir forurenset av det andre.",
    },
  ],
  demo: "opplosning-topper",
  depth: {
    title: "Dybde: R, platetall og selektivitet",
    blocks: [
      {
        kind: "p",
        text: "Oppløsningen beregnes som R = 2(t₂ − t₁) / (w₁ + w₂), altså avstanden mellom toppene delt på bredden deres. Den kan derfor forbedres på to måter: skyve toppene fra hverandre (selektivitet) eller gjøre dem smalere (platetall).",
      },
      {
        kind: "p",
        text: "I praksis er selektivitet den kraftigste knappen — endret mobilfase eller kolonnekjemi flytter toppene, mens platetall skalerer med kvadratroten av kolonnelengden og koster tid og trykk.",
      },
    ],
  },
  status: "publisert",
};
