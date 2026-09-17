import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const spesifisitet: PublishedTerm = {
  slug: "spesifisitet",
  title: "Spesifisitet",
  category: "kvalitet",
  definition: "Et sektoravhengig uttrykk som ofte brukes om selektivitet eller svært høy selektivitet; betydningen må derfor presiseres.",
  aliases: ["specificity", "analytical specificity", "selektivitet", "spesifikk"],
  explanation: [
    { kind: "p", text: "Det er fristende å lære at spesifisitet betyr «måler bare én analytt». Problemet er at fagområder bruker ordet forskjellig, og en slik absolutt definisjon blir misvisende." },
    { kind: "p", text: "IUPAC og Eurachem foretrekker [selektivitet](begrep:selektivitet) som det generelle analytiske begrepet. I enkelte sektorer brukes «spesifisitet» fortsatt som synonym eller om særlig sterk selektivitet. Derfor bør teksten eller standarden man følger definere hva som menes." },
  ],
  demo: "spesifisitet-terminologi",
  depth: {
    title: "Dybde: hvorfor terminologien varierer",
    blocks: [
      { kind: "p", text: "Eurachems metodevalideringsguide peker uttrykkelig på at noen sektorer, blant annet legemiddelområdet, bruker «specificity» eller «analytical specificity», mens guiden følger IUPAC og bruker «selectivity»." },
      { kind: "p", text: "Ved validering er det viktigere å beskrive hvilke interferenter metoden er prøvd mot og hvilke akseptkriterier som gjelder, enn å anta at ordet «spesifikk» alene dokumenterer egenskapen." },
    ],
  },
  sources: [SOURCES.eurachem2025, SOURCES.iupacMetrology2021],
  status: "publisert",
};
