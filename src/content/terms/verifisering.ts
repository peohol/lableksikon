import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const verifisering: PublishedTerm = {
  slug: "verifisering",
  title: "Verifisering",
  category: "kvalitet",
  definition: "Dokumentasjon med objektive bevis på at et gitt system, materiale eller en måleprosedyre oppfyller spesifiserte krav.",
  aliases: ["verifisere", "innføring", "verification", "krav"],
  explanation: [
    { kind: "p", text: "Verifisering spør om noe faktisk oppfyller kravene som allerede er satt. For en innført analysemetode kan det for eksempel være å vise at laboratoriet oppnår den presisjonen og det måleområdet som er spesifisert." },
    { kind: "p", text: "[Validering](begrep:validering) går ett steg videre: der må også selve kravene være egnet for den tiltenkte bruken." },
  ],
  demo: "blindprove-typer",
  depth: {
    title: "Dybde: verifisering er ikke det samme som validering eller kalibrering",
    blocks: [
      { kind: "p", text: "VIM definerer verifisering som fremleggelse av objektivt bevis på at spesifiserte krav er oppfylt. Det som verifiseres kan være blant annet en måleprosedyre, et materiale eller et målesystem." },
      { kind: "p", text: "Verifisering må ikke forveksles med kalibrering. Kalibrering etablerer sammenhengen mellom indikasjoner og referanseverdier; verifisering undersøker om spesifiserte krav er oppfylt." },
      { kind: "p", text: "Ikke enhver verifisering er en [validering](begrep:validering). Først når kravene også er vist å være passende for den tiltenkte bruken, er VIMs definisjon av validering oppfylt." },
    ],
  },
  sources: [SOURCES.vim, SOURCES.eurachemValidation],
  status: "publisert",
};
