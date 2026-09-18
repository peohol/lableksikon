import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const gradient: PublishedTerm = {
  slug: "gradient",
  title: "Gradienteluering",
  category: "separasjon",
  definition: "Eluering der mobilfasens sammensetning endres kontinuerlig eller trinnvis under analysen.",
  aliases: ["gradient", "gradient elution", "gradientprogram"],
  explanation: [
    { kind: "p", text: "En gradient brukes ofte når prøvekomponentene har svært ulik retensjon. Mobilfasen kan starte med betingelser som holder igjen de tidlige forbindelsene og gradvis endres slik at sterkt retinerte forbindelser eluerer innen rimelig tid." },
    { kind: "p", text: "Gradienten kan endre både [retensjonstidene](begrep:retensjonstid), [elueringsrekkefølgen](begrep:elueringsrekkefolge) og toppformen. Den må derfor beskrives som en del av metoden." },
  ],
  demo: "gradient-program",
  depth: {
    title: "Dybde: sammensetningen endres med tiden",
    blocks: [
      { kind: "p", text: "IUPAC-definisjonen omfatter både kontinuerlige og trinnvise endringer i mobilfasens sammensetning. Ordet sier ikke i seg selv hvilken komponent som økes eller hvordan kurven ser ut." },
      { kind: "p", text: "Gradienteluering står i kontrast til [isokratisk eluering](begrep:isokratisk), der sammensetningen holdes konstant gjennom elueringen." },
    ],
  },
  sources: [SOURCES.iupacGradientElution],
  status: "publisert",
};