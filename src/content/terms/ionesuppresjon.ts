import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const ionesuppresjon: PublishedTerm = {
  slug: "ionesuppresjon",
  title: "Ionesuppresjon",
  category: "prove",
  definition: "Redusert ioniseringseffektivitet for en art fordi en annen art er til stede.",
  aliases: ["ion suppression", "ionization suppression", "ionedemping", "LC-MS", "ESI"],
  explanation: [
    { kind: "p", text: "I LC-MS kan komponenter som eluerer samtidig med analytten gjøre at en mindre andel av analyttmolekylene blir til målbare ioner. Da blir signalet lavere selv om analyttmengden er den samme." },
    { kind: "p", text: "Ionesuppresjon er en spesifikk type [matriseeffekt](begrep:matriseeffekt) i ionekilden. Den er særlig viktig ved elektrosprayionisering, men kan også forekomme ved andre ioniseringsmetoder." },
  ],
  demo: "ionesuppresjon-respons",
  depth: {
    title: "Dybde: hvorfor signalet dempes",
    blocks: [
      { kind: "p", text: "Mekanismen kan blant annet involvere konkurranse om dråpeoverflate, ladning og ioniseringsprosesser. Hvilken mekanisme som dominerer avhenger av ionekilde, analytt, matriks og kromatografisk separasjon." },
      { kind: "p", text: "En egnet [internstandard](begrep:internstandard) kan redusere konsekvensen dersom analytt og internstandard undertrykkes omtrent likt. [Matrikstilpasset kalibrering](begrep:matrikstilpasset) eller bedre prøveopparbeiding og separasjon kan også være aktuelle tiltak." },
      { kind: "p", text: "Ionesuppresjon bør undersøkes ved metodevalidering og ved relevante endringer i prøvetype, fordi graden kan variere betydelig mellom matrikser og mellom enkeltprøver." },
    ],
  },
  sources: [SOURCES.iupacIonSuppression, SOURCES.iupacMatrixEffect, SOURCES.eurachem2025],
  status: "publisert",
};
