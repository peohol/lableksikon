import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const sienheter: PublishedTerm = {
  slug: "sienheter",
  title: "SI-enheter",
  category: "enheter",
  definition: "Enhetene i Det internasjonale enhetssystemet (SI), det internasjonalt avtalte målesystemet som er definert ved fastsatte verdier av sju definerende konstanter.",
  aliases: ["SI", "Système international", "International System of Units", "baseenheter", "avledede enheter"],
  explanation: [
    { kind: "p", text: "SI har sju baseenheter: sekund (s), meter (m), kilogram (kg), ampere (A), kelvin (K), mol (mol) og candela (cd). Andre SI-enheter kan uttrykkes som produkter av potenser av disse baseenhetene." },
    { kind: "p", text: "I dagens SI er det de sju definerende konstantene som er selve fundamentet. Baseenhetene er fortsatt den praktiske strukturen vi bruker når vi skriver og kombinerer enheter." },
  ],
  demo: "si-system",
  depth: {
    title: "Dybde: SI er mer enn de sju baseenhetene",
    blocks: [
      { kind: "p", text: "Avledede enheter som pascal (Pa), joule (J) og volt (V) er også SI-enheter. De kan uttrykkes ved baseenhetene uten ekstra numeriske faktorer." },
      { kind: "p", text: "Noen mye brukte enheter er ikke SI-enheter, men er godtatt for bruk sammen med SI. Liter er et viktig laboratorieeksempel. Derfor er mol/L vanlig i kjemi selv om den koherente SI-enheten for stoffmengdekonsentrasjon er mol/m³." },
    ],
  },
  sources: [SOURCES.bipmSI, SOURCES.bipmSIBrochure],
  status: "publisert",
};
