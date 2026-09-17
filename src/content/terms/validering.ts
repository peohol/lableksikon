import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const validering: PublishedTerm = {
  slug: "validering",
  title: "Validering",
  category: "kvalitet",
  definition: "Verifisering der de spesifiserte kravene også er dokumentert som hensiktsmessige for den tiltenkte bruken.",
  aliases: ["validation", "metodevalidering", "fitness for purpose", "formål"],
  explanation: [
    { kind: "p", text: "Validering starter med spørsmålet «hva skal metoden brukes til?». Først når bruken er tydelig, kan man velge hvilke egenskaper som må undersøkes og hvor gode de må være." },
    { kind: "p", text: "En metode for screening trenger ikke nødvendigvis samme ytelse som en metode som skal tallfeste nær en juridisk grense. Valideringen dokumenterer både kravene og evidensen for at metoden er egnet til sitt konkrete formål." },
  ],
  demo: "validering-formal",
  depth: {
    title: "Dybde: fitness for purpose fremfor en fast sjekkliste",
    blocks: [
      { kind: "p", text: "VIM definerer validering som [verifisering](begrep:verifisering) der de spesifiserte kravene er adekvate for en tiltenkt bruk. Derfor finnes det ikke én universell liste med valideringsforsøk som passer alle metoder." },
      { kind: "p", text: "Eurachem anbefaler å velge relevante ytelseskarakteristika ut fra formålet, for eksempel selektivitet, presisjon, riktighet, arbeidsområde, deteksjonsevne, robusthet og måleusikkerhet." },
    ],
  },
  sources: [SOURCES.vimValidation, SOURCES.eurachem2025],
  status: "publisert",
};
