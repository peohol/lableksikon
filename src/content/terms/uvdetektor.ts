import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const uvdetektor: PublishedTerm = {
  slug: "uvdetektor",
  title: "UV-detektor",
  category: "deteksjon",
  definition: "Kromatografisk detektor som registrerer hvor mye ultrafiolett eller synlig lys som absorberes av komponenter i eluaten.",
  aliases: ["UV", "UV/VIS", "absorbansdetektor", "DAD", "PDA", "diode array"],
  explanation: [
    { kind: "p", text: "En UV-detektor sender lys gjennom en gjennomstrømningscelle og sammenligner innkommende og transmittert stråling. Responsen uttrykkes vanligvis som absorbans, \\(A = \\log_{10}(P_0/P)\\)." },
    { kind: "p", text: "Bare forbindelser som absorberer ved den valgte bølgelengden gir direkte respons. En diode-array- eller PDA-detektor kan registrere flere bølgelengder eller et spektrum, mens en enklere detektor kan følge én eller noen få bølgelengder." },
  ],
  demo: "uvdetektor-absorbans",
  depth: {
    title: "Dybde: absorbans er ikke det samme som absorbert lysandel",
    blocks: [
      { kind: "p", text: "Absorbans er logaritmen av forholdet mellom innkommende og transmittert strålingsstyrke, ikke bare prosentandelen lys som forsvinner. Det gjør Beer–Lambert-sammenhengen lineær under egnede betingelser." },
      { kind: "p", text: "Begrepet «UV-detektor» er praktisk laboratorieterminologi. IUPAC beskriver mer generelt en kromatografisk detektor som en sensor som responderer på komponenter i eluaten, og nevner ultrafiolett spektrometer som eksempel." },
    ],
  },
  sources: [SOURCES.iupacChromDetector, SOURCES.iupacAbsorbance],
  status: "publisert",
};