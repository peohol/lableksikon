import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const homogenisering: PublishedTerm = {
  slug: "homogenisering",
  title: "Homogenisering",
  category: "provetaking",
  definition: "Bearbeiding som gjør fordelingen av relevante komponenter eller egenskaper mer ensartet i prøven før en mindre del tas ut.",
  aliases: ["homogenization", "blanding", "maling", "mixing"],
  explanation: [
    { kind: "p", text: "Homogenisering kan innebære blanding, maling, knusing eller andre operasjoner. Målet er ikke nødvendigvis at materialet blir identisk overalt, men at variasjonen mellom aktuelle [delprøver](begrep:delprove) blir liten nok for formålet." },
    { kind: "p", text: "Hvor homogen prøven må være avhenger av analytten og størrelsen på delen som analyseres. Et materiale kan være homogent for én egenskap og samtidig heterogent for en annen." },
  ],
  demo: "homogenisering-fordeling",
  depth: {
    title: "Dybde: mindre partikler kan redusere uttaksvariasjon — men også skape nye feil",
    blocks: [
      { kind: "p", text: "IUPAC knytter nødvendig partikkelstørrelse til størrelsen på testportionen og hvor mange partikler som må inngå for at delene skal være tilstrekkelig like. Derfor kan finmaling være viktig ved faste, heterogene materialer." },
      { kind: "p", text: "Bearbeiding kan samtidig gi tap av flyktige komponenter, varmeutvikling, kontaminering fra utstyr eller segregasjon av partikler. Homogenisering må derfor inngå i metodevalideringen, ikke behandles som et risikofritt fortrinn." },
    ],
  },
  sources: [SOURCES.iupacHomogeneity, SOURCES.iupacMaterialHomogeneity, SOURCES.iupacMixing, SOURCES.iupacMilling],
  status: "publisert",
};