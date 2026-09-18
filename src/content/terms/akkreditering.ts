import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const akkreditering: PublishedTerm = {
  slug: "akkreditering",
  title: "Akkreditering",
  category: "kvalitetssikring",
  definition: "Tredjepartsbekreftelse som formelt viser at et laboratorium har kompetanse til å utføre spesifiserte oppgaver innen et definert akkrediteringsomfang.",
  aliases: ["accreditation", "ISO 17025", "ISO/IEC 17025", "akkreditert", "akkrediteringsomfang"],
  explanation: [
    { kind: "p", text: "Akkreditering gjelder ikke automatisk alt laboratoriet gjør. Den gis for et definert omfang av aktiviteter etter vurdering av blant annet personell, utstyr, metoder, kvalitetssystem og hvordan arbeidet styres." },
    { kind: "p", text: "For prøvings- og kalibreringslaboratorier brukes vanligvis ISO/IEC 17025 som kompetansegrunnlag. Akkreditering er dermed mer enn et dokumentert kvalitetssystem: vurderingen omfatter også teknisk kompetanse for aktivitetene som inngår i omfanget." },
  ],
  demo: "akkreditering-omfang",
  depth: {
    title: "Dybde: akkreditering gjelder et spesifisert omfang",
    blocks: [
      { kind: "p", text: "IUPAC beskriver laboratorieakkreditering som en tredjepartsattestasjon som formelt demonstrerer kompetanse til bestemte samsvarsvurderingsoppgaver. Eurachem understreker tilsvarende at akkrediteringen knyttes til spesifiserte aktiviteter, ikke til laboratoriet uten avgrensning." },
      { kind: "p", text: "Et akkreditert laboratorium kan derfor ha både aktiviteter innenfor og utenfor akkrediteringsomfanget. Når et resultat omtales som akkreditert, må den aktuelle aktiviteten faktisk være omfattet av akkrediteringen." },
    ],
  },
  sources: [SOURCES.iupacLaboratoryAccreditation, SOURCES.eurachemQac2026],
  status: "publisert",
};
