import type { PublishedTerm } from "../schema";

export const matriseeffekt: PublishedTerm = {
  slug: "matriseeffekt",
  title: "Matriseeffekt",
  category: "prove",
  definition: "Når alt det andre i prøven endrer signalet for stoffet vi måler.",
  aliases: ["matriks", "ionesuppresjon", "blod", "jord", "plasma", "suppresjon", "suppe"],
  explanation: [
    {
      kind: "p",
      text: "Samme mengde salt smaker sterkere i et glass vann enn i en tykk suppe. På laben er «suppa» matriksen — blod, jord, avløpsvann — og den kan både dempe og forsterke signalet.",
    },
    {
      kind: "p",
      text: "Da stemmer ikke en kalibrering laget i rent vann lenger. Kurven kan se fin ut, [lineariteten](begrep:linearitet) kan være god, og resultatet likevel være systematisk for lavt eller for høyt.",
    },
  ],
  demo: "matriseeffekt-matrikser",
  depth: {
    title: "Dybde: ionesuppresjon, standardaddisjon og matrikstilpasset kalibrering",
    blocks: [
      {
        kind: "p",
        text: "I LC-MS er ionesuppresjon den vanligste formen: medeluerende komponenter konkurrerer om ladning i ionekilden og demper analyttsignalet. Effekten tallfestes ved å sammenligne respons i postkolonne-tilsatt matriks med respons i rent løsemiddel.",
      },
      {
        kind: "p",
        text: "Mottiltakene er å kalibrere i matriks, å bruke [standardaddisjon](begrep:standardaddisjon), eller å fjerne interferentene med bedre opprensing. Isotopmerket [internstandard](begrep:internstandard) er mest robust.",
      },
      {
        kind: "p",
        text: "Matriseeffekten varierer mellom prøver av samme type, og bidrar derfor både med skjevhet og med økt [måleusikkerhet](begrep:maleusikkerhet).",
      },
    ],
  },
  status: "publisert",
};
