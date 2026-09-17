import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const noyaktighet: PublishedTerm = {
  slug: "noyaktighet",
  title: "Riktighet, presisjon og nøyaktighet",
  category: "kvalitet",
  definition: "Nøyaktighet beskriver hvor nær et måleresultat er den sanne verdien; begrepet henger sammen med både riktighet og presisjon.",
  aliases: ["accuracy", "trueness", "riktighet", "nøyaktig", "true value", "bias"],
  explanation: [
    { kind: "p", text: "Tre ord ligner, men beskriver ikke det samme. [Presisjon](begrep:presisjon) handler om hvor godt gjentatte målinger stemmer overens. Riktighet handler om hvor nær middelverdien av mange målinger ligger en referanseverdi." },
    { kind: "p", text: "Nøyaktighet brukes om hvor nær et enkelt måleresultat er den sanne verdien. VIM understreker at nøyaktighet ikke er en egen tallstørrelse, og at begrepet er knyttet til både presisjon og riktighet." },
  ],
  demo: "riktighet-skiver",
  depth: {
    title: "Dybde: VIM-terminologien og forholdet til skjevhet",
    blocks: [
      { kind: "p", text: "Riktighet er definert for middelverdien av et stort antall gjentatte målinger i forhold til en referanseverdi og er omvendt knyttet til systematisk målefeil. Den uttrykkes derfor ofte gjennom et estimat på [skjevhet](begrep:skjevhet), ikke som «prosent riktighet»." },
      { kind: "p", text: "Høy presisjon alene gir ikke høy nøyaktighet hvis resultatene er systematisk forskjøvet. Omvendt kan et middel ligge nær referansen selv om enkeltmålingene har stor tilfeldig spredning." },
    ],
  },
  sources: [SOURCES.vimAccuracy, SOURCES.vimTrueness, SOURCES.vimPrecision],
  status: "publisert",
};
