import type { PublishedTerm } from "../schema";

export const maleusikkerhet: PublishedTerm = {
  slug: "maleusikkerhet",
  title: "Måleusikkerhet",
  category: "kvalitet",
  definition:
    "Et intervall som angir hvor det sanne resultatet med rimelig sikkerhet ligger.",
  aliases: [
    "usikkerhet",
    "intervall",
    "usikkerhetsbudsjett",
    "pluss minus",
    "slark",
    "grenseverdi",
    "dekningsfaktor",
  ],
  explanation: [
    {
      kind: "p",
      text: "Når du veier deg om morgenen, tenker du kanskje «82 kilo, pluss minus en halv». Måleusikkerhet er den samme tanken, bare regnet ut systematisk i stedet for antatt.",
    },
    {
      kind: "p",
      text: "Et analyseresultat er aldri ett eksakt tall. Pipettering, kalibreringskurve, temperatur og [presisjon](begrep:presisjon) bidrar hver med sin lille bit slark. Legger du bidragene sammen, får du et intervall — og først da kan du si om resultatet ligger over eller under en grenseverdi.",
    },
  ],
  demo: "usikkerhetsbudsjett",
  depth: {
    title: "Dybde: budsjett, kombinert usikkerhet og dekningsfaktor",
    blocks: [
      {
        kind: "p",
        text: "Uavhengige bidrag kombineres kvadratisk: u_c = √(u₁² + u₂² + …). Derfor dominerer det største bidraget, og det er der forbedring gir effekt — å halvere et bidrag på 0,9 % endrer nesten ingenting.",
      },
      {
        kind: "p",
        text: "Utvidet usikkerhet U = k · u_c, vanligvis med k = 2, som svarer til omtrent 95 % dekning. Resultatet rapporteres som x ± U med k oppgitt.",
      },
      {
        kind: "p",
        text: "Skjevhet skal korrigeres eller inngå i budsjettet. Bidrag fra [matriseeffekt](begrep:matriseeffekt) er ofte vanskeligst å tallfeste, fordi de varierer fra prøve til prøve.",
      },
    ],
  },
  status: "publisert",
};
