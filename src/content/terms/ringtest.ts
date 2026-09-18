import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const ringtest: PublishedTerm = {
  slug: "ringtest",
  title: "Ringtest",
  category: "kvalitetssikring",
  definition: "I laboratoriepraksis: en mellomlaboratoriesammenligning der deltakernes prestasjon vanligvis vurderes mot forhåndsfastsatte kriterier, altså kompetanseprøving.",
  aliases: ["proficiency testing", "PT", "kompetanseprøving", "sammenlignende prøving", "interlaboratory comparison", "ILC"],
  explanation: [
    { kind: "p", text: "Flere laboratorier mottar samme eller sammenlignbart prøvingsmateriale og analyserer det uavhengig. Resultatene sammenlignes etter et definert opplegg, slik at laboratoriet får en ekstern vurdering av hvordan det presterer." },
    { kind: "p", text: "«Ringtest» brukes ofte uformelt om kompetanseprøving. Teknisk er ikke enhver mellomlaboratoriesammenligning en kompetanseprøving: ved proficiency testing vurderes deltakernes prestasjon mot forhåndsfastsatte kriterier." },
  ],
  demo: "ringtest-sammenligning",
  depth: {
    title: "Dybde: ekstern kontroll erstatter ikke intern kontroll",
    blocks: [
      { kind: "p", text: "IUPAC definerer proficiency testing som vurdering av en deltakers prestasjon i en mellomlaboratoriesammenligning mot forhåndsfastsatte kriterier. Kvantitative ordninger kan blant annet bruke z-, z′-, ζ- eller Eₙ-skår, avhengig av opplegget." },
      { kind: "p", text: "Kompetanseprøving gir et periodisk, uavhengig blikk utenfra. Den erstatter ikke [internkontroll](begrep:internkontroll), som følger metodeytelsen fortløpende mellom slike eksterne vurderinger." },
    ],
  },
  sources: [SOURCES.iupacProficiencyTesting, SOURCES.eurachemQac2026],
  status: "publisert",
};
