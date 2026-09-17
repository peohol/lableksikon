import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const repeterbarhet: PublishedTerm = {
  slug: "repeterbarhet",
  title: "Repeterbarhet",
  category: "kvalitet",
  definition: "Presisjon målt under repeterbarhetsbetingelser: samme prosedyre, operatør, målesystem og sted, over kort tid.",
  aliases: ["within-run", "serie", "gjentak", "repeatability"],
  explanation: [
    { kind: "p", text: "Repeterbarhet er den trangeste formen for [presisjon](begrep:presisjon). Du holder nesten alt likt og spør hvor mye resultatene likevel spriker." },
    { kind: "p", text: "Hvis samme prøve analyseres flere ganger i samme serie av samme person på samme instrument, er spredningen først og fremst et mål på korttidsvariasjonen i metoden." },
  ],
  demo: "presisjon-spredning",
  depth: {
    title: "Dybde: hva som må være likt",
    blocks: [
      { kind: "p", text: "VIM beskriver repeterbarhetsbetingelser som samme måleprosedyre, samme operatør, samme målesystem, samme driftsbetingelser og samme sted, med gjentatte målinger på samme eller lignende objekter over kort tid." },
      { kind: "p", text: "Repeterbarhet uttrykkes vanligvis som standardavvik eller variasjonskoeffisient under disse betingelsene. Den er derfor ikke en universell egenskap ved metoden; betingelsene må være angitt." },
      { kind: "p", text: "Når dager, kalibreringer eller operatører får variere innen samme laboratorium, undersøker man i stedet [intermediær presisjon](begrep:intermediar)." },
    ],
  },
  sources: [SOURCES.vim, SOURCES.eurachemValidation],
  status: "publisert",
};
