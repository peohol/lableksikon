import type { PublishedTerm } from "../schema";

import { presisjon } from "./presisjon";
import { repeterbarhet } from "./repeterbarhet";
import { intermediar } from "./intermediar";
import { reproduserbarhet } from "./reproduserbarhet";
import { skjevhet } from "./skjevhet";
import { gjenvinning } from "./gjenvinning";
import { maleusikkerhet } from "./maleusikkerhet";
import { utvidet } from "./utvidet";
import { dekningsfaktor } from "./dekningsfaktor";
import { selektivitet } from "./selektivitet";
import { spesifisitet } from "./spesifisitet";
import { folsomhet } from "./folsomhet";
import { robusthet } from "./robusthet";
import { sporbarhet } from "./sporbarhet";
import { validering } from "./validering";
import { verifisering } from "./verifisering";
import { kontrollkort } from "./kontrollkort";
import { noyaktighet } from "./noyaktighet";
import { linearitet } from "./linearitet";
import { deteksjonsgrense } from "./deteksjonsgrense";
import { internstandard } from "./internstandard";
import { standardaddisjon } from "./standardaddisjon";
import { blindprove } from "./blindprove";
import { matriseeffekt } from "./matriseeffekt";
import { standardavvik } from "./standardavvik";
import { opplosning } from "./opplosning";

/** Alle publiserte begreper i redaksjonell rekkefølge innen hver kategori. */
export const publishedTerms: PublishedTerm[] = [
  // Kvalitet i måling: fra spredning via systematiske effekter og usikkerhet
  // til kvalitetssystemets løpende kontroll. Nøyaktighet avslutter som syntese.
  presisjon,
  repeterbarhet,
  intermediar,
  reproduserbarhet,
  skjevhet,
  gjenvinning,
  maleusikkerhet,
  utvidet,
  dekningsfaktor,
  selektivitet,
  spesifisitet,
  folsomhet,
  robusthet,
  sporbarhet,
  validering,
  verifisering,
  kontrollkort,
  noyaktighet,
  // Kalibrering og kontroll
  linearitet,
  deteksjonsgrense,
  internstandard,
  standardaddisjon,
  blindprove,
  // Prøven og omgivelsene
  matriseeffekt,
  // Statistikk og beregning
  standardavvik,
  // Separasjon
  opplosning,
];
