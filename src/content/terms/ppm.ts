import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const ppm: PublishedTerm = {
  slug: "ppm",
  title: "ppm",
  category: "enheter",
  definition: "«Parts per million»: en måte å uttrykke en dimensjonsløs relativ verdi på, der 1 ppm betyr én del per million.",
  aliases: ["parts per million", "10^-6", "10⁻⁶", "mg/kg", "µmol/mol", "deler per million"],
  explanation: [
    { kind: "p", text: "ppm sier hvor stor en brøk er, men ikke hvilken type brøk. For en massefraksjon er \\(1\\,\\mathrm{mg/kg} = 1\\,\\mathrm{ppm}\\); for en stoffmengdefraksjon er \\(1\\,\\mathrm{\\mu mol/mol} = 1\\,\\mathrm{ppm}\\)." },
    { kind: "p", text: "mg/L er derimot en massekonsentrasjon, ikke en dimensjonsløs brøk. I fortynnede vannløsninger med tetthet nær 1 kg/L kan mg/L og mg/kg være numerisk omtrent like, men mg/L er ikke generelt det samme som ppm." },
  ],
  demo: "ppm-forhold",
  depth: {
    title: "Dybde: ppm må knyttes til riktig fysisk størrelse",
    blocks: [
      { kind: "p", text: "BIPM beskriver ppm som \\(10^{-6}\\) relativ verdi, analogt med at prosent betyr deler per hundre. Det er derfor tryggere å skrive både størrelsen og enheten, for eksempel massefraksjon 2 mg/kg, enn å bruke ppm alene når sammenhengen kan være tvetydig." },
      { kind: "p", text: "For samme dimensjonsløse brøk er 1 [masseprosent](begrep:masseprosent) = 10 000 ppm. Omregningen gjelder bare når begge tall beskriver samme type fraksjon." },
    ],
  },
  sources: [SOURCES.bipmSIBrochure, SOURCES.iupacMassFraction],
  status: "publisert",
};
