import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const ekstern: PublishedTerm = {
  slug: "ekstern",
  title: "Ekstern kalibrering",
  category: "kalibrering",
  definition: "Kalibrering der kalibratorene fremstilles og måles separat fra den ukjente prøven, og den etablerte kalibreringsrelasjonen deretter brukes på prøveresponsen.",
  aliases: ["external calibration", "ekstern standard", "standardserie", "external standard calibration"],
  explanation: [
    { kind: "p", text: "Ved ekstern kalibrering lager man en separat serie med kjente analyttnivåer. Serien brukes til å etablere en [kalibreringskurve](begrep:kalibreringskurve), og prøvens respons settes inn i denne relasjonen." },
    { kind: "p", text: "«Ekstern» betyr først og fremst at kalibratorene er separate fra den ukjente prøven. Det betyr ikke nødvendigvis at de må være matriksfrie; [matrikstilpasset kalibrering](begrep:matrikstilpasset) er en form for ekstern kalibrering." },
  ],
  demo: "ekstern-kalibrering-separat",
  depth: {
    title: "Dybde: forutsetningen om sammenlignbar respons",
    blocks: [
      { kind: "p", text: "Ekstern kalibrering forutsetter at forholdet mellom analyttnivå og respons i kalibratorene er relevant for prøvene. Forskjeller i prøveopparbeiding, ekstraksjon eller [matriseeffekt](begrep:matriseeffekt) kan bryte denne forutsetningen." },
      { kind: "p", text: "En [internstandard](begrep:internstandard) kan redusere virkningen av enkelte variasjonskilder, mens matrikstilpasning eller [standardaddisjon](begrep:standardaddisjon) kan være aktuelle når responsen påvirkes av matriksen." },
      { kind: "p", text: "Valget mellom kalibreringsstrategier bør derfor bestemmes av valideringsdata og prøvematerialet, ikke av at én strategi alltid er prinsipielt bedre." },
    ],
  },
  sources: [SOURCES.iupacExternalCalibration, SOURCES.eurachem2025],
  status: "publisert",
};
