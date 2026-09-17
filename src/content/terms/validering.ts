import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const validering: PublishedTerm = {
  slug: "validering",
  title: "Validering",
  category: "kvalitet",
  definition: "Verifisering der de spesifiserte kravene også er dokumentert som egnet for den tiltenkte bruken.",
  aliases: ["validere", "metodevalidering", "krav", "fitness for purpose"],
  explanation: [
    { kind: "p", text: "Validering svarer på to spørsmål samtidig: Oppfyller metoden kravene vi har satt, og er disse kravene faktisk gode nok for det metoden skal brukes til?" },
    { kind: "p", text: "Derfor må valideringen starte med formålet. En metode kan være utmerket til screening og samtidig utilstrekkelig til kvantitativ rapportering nær en juridisk grense." },
  ],
  demo: "blindprove-typer",
  depth: {
    title: "Dybde: validering er knyttet til tiltenkt bruk",
    blocks: [
      { kind: "p", text: "VIM definerer validering som [verifisering](begrep:verifisering) der de spesifiserte kravene er tilstrekkelige for den tiltenkte bruken. Dermed er validering mer enn å krysse av et fast sett av ytelsesparametere." },
      { kind: "p", text: "Hvilke egenskaper som må undersøkes avhenger av metoden og bruken, men kan omfatte blant annet [presisjon](begrep:presisjon), [skjevhet](begrep:skjevhet), [selektivitet](begrep:selektivitet), arbeidsområde, deteksjons-/kvantifiseringsgrenser og [robusthet](begrep:robusthet)." },
      { kind: "p", text: "Akseptkriteriene bør fastsettes før dataene tolkes og knyttes til hva som kreves for pålitelige beslutninger eller rapportering." },
    ],
  },
  sources: [SOURCES.vim, SOURCES.eurachemValidation],
  status: "publisert",
};
