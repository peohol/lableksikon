import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const spesifisitet: PublishedTerm = {
  slug: "spesifisitet",
  title: "Spesifisitet",
  category: "kvalitet",
  definition: "Et strengt tilfelle av selektivitet der responsen kan tilskrives analytten entydig i den aktuelle måleoppgaven.",
  aliases: ["specificity", "selektiv", "entydig"],
  explanation: [
    { kind: "p", text: "Spesifisitet brukes når man vil uttrykke at signalet er entydig knyttet til analytten. I praksis er full spesifisitet sjelden nødvendig eller dokumenterbar, og [selektivitet](begrep:selektivitet) er ofte et mer presist ord." },
    { kind: "p", text: "En metode kan altså være godt egnet selv om den ikke er absolutt spesifikk, så lenge andre komponenter ikke påvirker resultatet i relevant grad." },
  ],
  demo: "matriseeffekt-matrikser",
  depth: {
    title: "Dybde: hvorfor selektivitet ofte er det bedre begrepet",
    blocks: [
      { kind: "p", text: "I analytisk metodevalidering vurderes vanligvis om metoden kan bestemme analytten pålitelig i nærvær av de interferentene som faktisk forventes. Dette er en vurdering av selektivitet." },
      { kind: "p", text: "Å kalle en metode spesifikk kan gi inntrykk av at ingen mulig annen forbindelse kan gi respons. En slik absolutt påstand er ofte sterkere enn dataene tillater." },
      { kind: "p", text: "Bruk derfor spesifisitet når entydighet faktisk er dokumentert og nødvendig; ellers beskrives den praktiske ytelsen bedre som [selektivitet](begrep:selektivitet)." },
    ],
  },
  sources: [SOURCES.eurachemValidation],
  status: "publisert",
};
