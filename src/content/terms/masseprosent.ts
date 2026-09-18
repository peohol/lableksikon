import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const masseprosent: PublishedTerm = {
  slug: "masseprosent",
  title: "Masseprosent",
  category: "enheter",
  definition: "Massefraksjonen til en bestanddel uttrykt i prosent: 100 % multiplisert med bestanddelens masse dividert med blandingens totale masse.",
  aliases: ["mass percent", "mass fraction percent", "vektprosent", "w/w", "% m/m"],
  explanation: [
    { kind: "p", text: "Har en blanding total masse 100,0 g og 5,0 g av denne massen er analytt, er massefraksjonen 0,050 og masseprosenten 5,0 %. Nevneren er alltid total masse av blandingen." },
    { kind: "p", text: "Derfor gir 5,0 g analytt tilsatt til 100,0 g løsemiddel ikke 5,0 %, men 5,0/105,0 × 100 % ≈ 4,76 %. Det er en vanlig forskjell mellom «andel av totalen» og «mengde tilsatt til noe annet»." },
  ],
  demo: "masseprosent-nevner",
  depth: {
    title: "Dybde: prosent og ppm skalerer samme type brøk",
    blocks: [
      { kind: "p", text: "Massefraksjon er et forhold mellom to masser og er derfor dimensjonsløs. Prosent betyr deler per hundre; for den samme massefraksjonen tilsvarer 1 % 10 000 [ppm](begrep:ppm)." },
      { kind: "p", text: "For å unngå tvetydighet bør selve størrelsen navngis, for eksempel massefraksjon, og prosenttegnet brukes til å uttrykke den numeriske verdien. Det skiller massefraksjon fra for eksempel volumfraksjon og stoffmengdefraksjon." },
    ],
  },
  sources: [SOURCES.iupacMassFraction, SOURCES.bipmSIBrochure],
  status: "publisert",
};
