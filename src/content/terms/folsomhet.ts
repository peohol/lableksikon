import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const folsomhet: PublishedTerm = {
  slug: "folsomhet",
  title: "Følsomhet",
  category: "kvalitet",
  definition: "Endringen i målesignal eller indikasjon delt på den tilsvarende endringen i verdien som måles.",
  aliases: ["sensitivity", "sensitivitet", "stigningstall", "slope", "respons"],
  explanation: [
    { kind: "p", text: "Hvis konsentrasjonen øker med 1 µmol/L og signalet øker mye, er systemet mer følsomt enn hvis signalet bare endres litt. På en rett kalibreringskurve tilsvarer dette stigningstallet." },
    { kind: "p", text: "Høy følsomhet betyr ikke automatisk lav [deteksjonsgrense](begrep:deteksjonsgrense). Deteksjon av små mengder avhenger også av bakgrunn, variasjon og hvordan grensen defineres." },
  ],
  demo: "folsomhet-stigning",
  depth: {
    title: "Dybde: lokal følsomhet og forskjellen fra deteksjonsevne",
    blocks: [
      { kind: "p", text: "VIM definerer følsomhet som endring i indikasjon dividert på tilsvarende endring i målt størrelse. Dersom responsfunksjonen er krum, kan følsomheten derfor variere med nivået." },
      { kind: "p", text: "Begrepet bør ikke brukes som et løst synonym for «kan måle veldig lite». Et system kan ha bratt respons, men samtidig så mye støy eller variasjon at små mengder ikke kan påvises pålitelig." },
    ],
  },
  sources: [SOURCES.vimSensitivity, SOURCES.eurachem2025],
  status: "publisert",
};
