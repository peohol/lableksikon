import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const isokratisk: PublishedTerm = {
  slug: "isokratisk",
  title: "Isokratisk eluering",
  category: "separasjon",
  definition: "Eluering der mobilfasens sammensetning holdes konstant gjennom analysen.",
  aliases: ["isokratisk", "isocratic", "isocratic elution"],
  explanation: [
    { kind: "p", text: "Ved isokratisk eluering endres ikke blandingsforholdet i [mobilfasen](begrep:mobilfase) som funksjon av elueringstiden." },
    { kind: "p", text: "Dette kan gi en enkel og stabil metode når analyttene har et håndterbart retensjonsområde. Hvis forbindelsene eluerer over et svært bredt område, kan [gradienteluering](begrep:gradient) være mer hensiktsmessig." },
  ],
  demo: "isokratisk-konstant",
  depth: {
    title: "Dybde: konstant sammensetning, ikke nødvendigvis konstant alt",
    blocks: [
      { kind: "p", text: "Begrepet isokratisk beskriver mobilfasens sammensetning. Det betyr ikke at alle andre parametere automatisk er konstante eller at retensjonstider ikke kan drifte." },
      { kind: "p", text: "Sammenligning av isokratiske og gradientbaserte metoder må derfor gjøres ut fra hele metoden og ønsket separasjon, ikke bare antallet løsemiddelkomponenter." },
    ],
  },
  sources: [SOURCES.iupacIsocraticElution],
  status: "publisert",
};