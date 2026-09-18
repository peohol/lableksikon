import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const srm: PublishedTerm = {
  slug: "srm",
  title: "Sertifisert referansemateriale",
  category: "kvalitetssikring",
  definition: "Referansemateriale ledsaget av autoritativ dokumentasjon som angir én eller flere sertifiserte egenskapsverdier med tilhørende måleusikkerhet og metrologisk sporbarhet.",
  aliases: ["CRM", "certified reference material", "referansemateriale", "sertifikat", "sertifisert verdi"],
  explanation: [
    { kind: "p", text: "Et sertifisert referansemateriale, ofte forkortet CRM, har en eller flere egenskapsverdier som er fastsatt ved dokumenterte prosedyrer og oppgitt sammen med relevant usikkerhet og [metrologisk sporbarhet](begrep:sporbarhet)." },
    { kind: "p", text: "CRM kan blant annet brukes som kalibrator, til vurdering av [systematisk skjevhet](begrep:skjevhet) eller som kontrollmateriale. Materialet er bare egnet når den sertifiserte egenskapen, matriksen og bruksområdet passer til oppgaven." },
  ],
  demo: "srm-sertifikat",
  depth: {
    title: "Dybde: sertifikatet definerer hva som faktisk er sertifisert",
    blocks: [
      { kind: "p", text: "Det er ikke nok at et materiale selges som «referanse». For et CRM skal autoritativ dokumentasjon angi hvilke egenskapsverdier som er sertifisert og beskrive grunnlaget, inkludert usikkerhet og sporbarhet for disse verdiene." },
      { kind: "p", text: "Sertifiseringen gjelder bestemte egenskaper under angitte betingelser. Et CRM kan derfor være svært godt karakterisert for én analytt eller egenskap uten at alle andre egenskaper ved materialet er sertifisert." },
    ],
  },
  sources: [SOURCES.iupacCertifiedReferenceMaterial, SOURCES.iupacReferenceMaterialCertificate, SOURCES.eurachemQac2026],
  status: "publisert",
};
