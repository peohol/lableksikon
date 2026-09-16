import type { PublishedTerm } from "../schema";

export const standardaddisjon: PublishedTerm = {
  slug: "standardaddisjon",
  title: "Standardaddisjon",
  category: "kalibrering",
  definition:
    "Kalibrering inne i prøven selv, ved å tilsette kjente mengder og ekstrapolere tilbake til nullpunktet.",
  aliases: ["addisjon", "tilsetningsmetode", "ekstrapolasjon", "matriks", "spiking"],
  explanation: [
    {
      kind: "p",
      text: "Når prøven selv påvirker målingen, hjelper det ikke å kalibrere i rent vann. Løsningen er å kalibrere inne i prøven: du tilsetter kjente mengder av stoffet i flere porsjoner av samme prøve, og ser hvor mye signalet stiger for hver tilsetning.",
    },
    {
      kind: "p",
      text: "Deretter forlenger du linja bakover til den krysser nullinja. Krysningspunktet forteller hvor mye stoff prøven hadde fra før. Alt skjer i samme [matriks](begrep:matriseeffekt), så matriksens effekt er innebygd i kalibreringen.",
    },
  ],
  demo: "standardaddisjon-steg",
  depth: {
    title: "Dybde: når standardaddisjon er verdt kostnaden",
    blocks: [
      {
        kind: "p",
        text: "Metoden krever flere målinger per prøve og forutsetter at responsen er lineær i hele det tilsatte området. Ekstrapolasjon utenfor målepunktene gjør den også mer sårbar for tilfeldig spredning enn vanlig kalibrering.",
      },
      {
        kind: "p",
        text: "Den brukes derfor der matriksen varierer fra prøve til prøve og isotopmerket [internstandard](begrep:internstandard) ikke finnes — typisk uorganisk analyse i kompliserte prøver.",
      },
    ],
  },
  status: "publisert",
};
