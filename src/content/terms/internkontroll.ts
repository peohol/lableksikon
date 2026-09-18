import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const internkontroll: PublishedTerm = {
  slug: "internkontroll",
  title: "Internkontroll",
  category: "kvalitetssikring",
  definition: "Laboratoriets løpende interne kvalitetskontroll for å overvåke at måleprosessen forblir under kontroll og at resultater er pålitelige nok til å frigis.",
  aliases: ["internal quality control", "IQC", "intern kvalitetskontroll", "QC", "quality control"],
  explanation: [
    { kind: "p", text: "Internkontroll skjer mens metoden er i rutinebruk. Laboratoriet kan blant annet analysere [kontrollprøver](begrep:kontrollprove), blanker og duplikater og følge resultatene over tid for å oppdage drift, økt spredning, kontaminering eller andre endringer." },
    { kind: "p", text: "Kontrollopplegget må passe til risikoen og metoden. En stabil analyse med store serier kan kreve et annet opplegg enn en sjelden analyse med høy konsekvens ved feil." },
  ],
  demo: "internkontroll-lopende",
  depth: {
    title: "Dybde: internkontroll og ekstern kompetanseprøving utfyller hverandre",
    blocks: [
      { kind: "p", text: "IUPAC definerer internal quality control kort som kvalitetskontroll innen et spesifisert laboratorium. Eurachem utdyper at formålet er kontinuerlig overvåking av aktiviteter og måleresultater slik at laboratoriet kan avgjøre om resultater er pålitelige nok til å frigis." },
      { kind: "p", text: "Et [kontrollkort](begrep:kontrollkort) kan gjøre langsomme endringer synlige, mens en [ringtest](begrep:ringtest) gir en uavhengig sammenligning utenfra. Ingen av delene erstatter den andre." },
    ],
  },
  sources: [SOURCES.iupacInternalQualityControl, SOURCES.eurachemQac2026],
  status: "publisert",
};
