import type { PublishedTerm } from "../schema";

import { presisjon } from "./presisjon";
import { repeterbarhet } from "./repeterbarhet";
import { intermediar } from "./intermediar";
import { reproduserbarhet } from "./reproduserbarhet";
import { noyaktighet } from "./noyaktighet";
import { skjevhet } from "./skjevhet";
import { gjenvinning } from "./gjenvinning";
import { robusthet } from "./robusthet";
import { selektivitet } from "./selektivitet";
import { spesifisitet } from "./spesifisitet";
import { sporbarhet } from "./sporbarhet";
import { validering } from "./validering";
import { verifisering } from "./verifisering";
import { maleusikkerhet } from "./maleusikkerhet";
import { utvidet } from "./utvidet";
import { dekningsfaktor } from "./dekningsfaktor";
import { kontrollkort } from "./kontrollkort";
import { folsomhet } from "./folsomhet";
import { linearitet } from "./linearitet";
import { deteksjonsgrense } from "./deteksjonsgrense";
import { internstandard } from "./internstandard";
import { standardaddisjon } from "./standardaddisjon";
import { blindprove } from "./blindprove";
import { matriseeffekt } from "./matriseeffekt";
import { standardavvik } from "./standardavvik";
import { opplosning } from "./opplosning";

/**
 * Alle publiserte begreper. Rekkefølgen i denne lista er den redaksjonelle
 * rekkefølgen innen hver kategori; kategoriene rekkefølge kommer fra
 * `categories.ts`. Sammen gir de den globale forrige/neste-rekkefølgen.
 *
 * Nytt begrep: lag en fil i denne mappa og legg det til her.
 */
export const publishedTerms: PublishedTerm[] = [
  // Kvalitet i måling
  presisjon,
  repeterbarhet,
  intermediar,
  reproduserbarhet,
  noyaktighet,
  skjevhet,
  gjenvinning,
  robusthet,
  selektivitet,
  spesifisitet,
  sporbarhet,
  validering,
  verifisering,
  maleusikkerhet,
  utvidet,
  dekningsfaktor,
  kontrollkort,
  folsomhet,
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
