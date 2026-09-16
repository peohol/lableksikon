import type { PublishedTerm } from "../schema";

import { presisjon } from "./presisjon";
import { maleusikkerhet } from "./maleusikkerhet";
import { noyaktighet } from "./noyaktighet";
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
  maleusikkerhet,
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
