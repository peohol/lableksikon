import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const mrm: PublishedTerm = {
  slug: "mrm",
  title: "MRM",
  category: "deteksjon",
  definition: "Multiple reaction monitoring: selected reaction monitoring anvendt på flere produkt-ioner fra ett eller flere valgte forløperioner.",
  aliases: ["multiple reaction monitoring", "SRM", "selected reaction monitoring", "transition", "overgang"],
  explanation: [
    { kind: "p", text: "I selected reaction monitoring (SRM) registreres bestemte produkt-ioner som stammer fra valgte forløperioner gjennom to eller flere stadier av [massespektrometri](begrep:massespektrometri). MRM er IUPAC-navnet når SRM anvendes på flere produkt-ioner fra ett eller flere forløperioner." },
    { kind: "p", text: "I kvantitativ LC-MS/MS omtales en kombinasjon av forløper-m/z og produkt-m/z ofte som en overgang. Seleksjon både før og etter [fragmentering](begrep:fragmentering) kan gi høy analytisk selektivitet." },
  ],
  demo: "mrm-overganger",
  depth: {
    title: "Dybde: MRM og SRM er nært beslektet, men ikke identiske definisjoner",
    blocks: [
      { kind: "p", text: "I praksis brukes MRM og SRM til dels om hverandre, særlig for triple-kvadrupolmetoder. IUPAC skiller dem terminologisk: SRM beskriver den valgte reaksjonen, mens MRM er anvendelse av SRM på flere produkt-ioner eller forløperioner." },
      { kind: "p", text: "En overgang er ikke automatisk unik for ett stoff. Identifikasjon og kvantifisering krever at hele metoden – blant annet kromatografi, ioneforhold og kvalitetskriterier – er tilstrekkelig selektiv." },
    ],
  },
  sources: [SOURCES.iupacMRM, SOURCES.iupacSRM, SOURCES.iupacMSMS],
  status: "publisert",
};