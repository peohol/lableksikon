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
import { kalibreringskurve } from "./kalibreringskurve";
import { linearitet } from "./linearitet";
import { arbeidsomrade } from "./arbeidsomrade";
import { deteksjonsgrense } from "./deteksjonsgrense";
import { kvantifiseringsgrense } from "./kvantifiseringsgrense";
import { responsfaktor } from "./responsfaktor";
import { vektet } from "./vektet";
import { nullpunkt } from "./nullpunkt";
import { ettpunkts } from "./ettpunkts";
import { ekstern } from "./ekstern";
import { matrikstilpasset } from "./matrikstilpasset";
import { internstandard } from "./internstandard";
import { standardaddisjon } from "./standardaddisjon";
import { blindprove } from "./blindprove";
import { drift } from "./drift";
import { kontrollprove } from "./kontrollprove";
import { matriseeffekt } from "./matriseeffekt";
import { ionesuppresjon } from "./ionesuppresjon";
import { ioneforsterkning } from "./ioneforsterkning";
import { interferens } from "./interferens";
import { bakgrunnssignal } from "./bakgrunnssignal";
import { matriksblank } from "./matriksblank";
import { kontaminering } from "./kontaminering";
import { krysskontaminering } from "./krysskontaminering";
import { provelagring } from "./provelagring";
import { gjennomsnitt } from "./gjennomsnitt";
import { median } from "./median";
import { varians } from "./varians";
import { standardavvik } from "./standardavvik";
import { normalfordeling } from "./normalfordeling";
import { frihetsgrader } from "./frihetsgrader";
import { konfidensintervall } from "./konfidensintervall";
import { signifikansniva } from "./signifikansniva";
import { ttest } from "./ttest";
import { ftest } from "./ftest";
import { regresjon } from "./regresjon";
import { minstekvadrater } from "./minstekvadrater";
import { korrelasjon } from "./korrelasjon";
import { uteligger } from "./uteligger";
import { mobilfase } from "./mobilfase";
import { stasjonarfase } from "./stasjonarfase";
import { retensjonstid } from "./retensjonstid";
import { gradient } from "./gradient";
import { isokratisk } from "./isokratisk";
import { elueringsrekkefolge } from "./elueringsrekkefolge";
import { toppbredde } from "./toppbredde";
import { haledannelse } from "./haledannelse";
import { platetall } from "./platetall";
import { selektivitetsfaktor } from "./selektivitetsfaktor";
import { opplosning } from "./opplosning";
import { dodvolum } from "./dodvolum";
import { injeksjonsvolum } from "./injeksjonsvolum";
import { signalstoy } from "./signalstoy";
import { massespektrometri } from "./massespektrometri";
import { ionisering } from "./ionisering";
import { fragmentering } from "./fragmentering";
import { simmodus } from "./simmodus";
import { mrm } from "./mrm";
import { masseopplosning } from "./masseopplosning";
import { lcms } from "./lcms";
import { gcms } from "./gcms";
import { uvdetektor } from "./uvdetektor";
import { fid } from "./fid";
import { ledningsevne } from "./ledningsevne";
import { representativ } from "./representativ";
import { delprove } from "./delprove";
import { homogenisering } from "./homogenisering";
import { ekstraksjon } from "./ekstraksjon";
import { oppkonsentrering } from "./oppkonsentrering";
import { fortynning } from "./fortynning";
import { fortynningsfaktor } from "./fortynningsfaktor";
import { filtrering } from "./filtrering";
import { oppslutning } from "./oppslutning";
import { provemengde } from "./provemengde";
import { akkreditering } from "./akkreditering";
import { ringtest } from "./ringtest";
import { srm } from "./srm";
import { standardmetode } from "./standardmetode";
import { avviksbehandling } from "./avviksbehandling";
import { internkontroll } from "./internkontroll";
import { revisjonsspor } from "./revisjonsspor";
import { sienheter } from "./sienheter";
import { molmasse } from "./molmasse";
import { molaritet } from "./molaritet";
import { masseprosent } from "./masseprosent";
import { ppm } from "./ppm";

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
  kalibreringskurve,
  linearitet,
  arbeidsomrade,
  deteksjonsgrense,
  kvantifiseringsgrense,
  responsfaktor,
  vektet,
  nullpunkt,
  ettpunkts,
  ekstern,
  matrikstilpasset,
  internstandard,
  standardaddisjon,
  blindprove,
  drift,
  kontrollprove,
  // Prøven og omgivelsene
  matriseeffekt,
  ionesuppresjon,
  ioneforsterkning,
  interferens,
  bakgrunnssignal,
  matriksblank,
  kontaminering,
  krysskontaminering,
  provelagring,
  // Statistikk og beregning: sentralmål og spredning, deretter fordelinger og
  // inferens, så modellering og til slutt observasjoner som utfordrer modellen.
  gjennomsnitt,
  median,
  varians,
  standardavvik,
  normalfordeling,
  frihetsgrader,
  konfidensintervall,
  signifikansniva,
  ttest,
  ftest,
  regresjon,
  minstekvadrater,
  korrelasjon,
  uteligger,
  // Separasjon: faser og retensjon først, deretter elueringsmåte og rekkefølge,
  // så toppform/effektivitet, selektivitet og samlet oppløsning. Terminologi
  // og injeksjonsbidrag avslutter kategorien.
  mobilfase,
  stasjonarfase,
  retensjonstid,
  gradient,
  isokratisk,
  elueringsrekkefolge,
  toppbredde,
  haledannelse,
  platetall,
  selektivitetsfaktor,
  opplosning,
  dodvolum,
  injeksjonsvolum,
  // Deteksjon og måleprinsipp: fra signalbegreper via massespektrometriens
  // grunntrinn og målrettede modi til koblede teknikker og andre detektorer.
  signalstoy,
  massespektrometri,
  ionisering,
  fragmentering,
  simmodus,
  mrm,
  masseopplosning,
  lcms,
  gcms,
  uvdetektor,
  fid,
  ledningsevne,
  // Prøvetaking og opparbeiding: representativitet og prøvereduksjon først,
  // deretter fysisk og kjemisk behandling fram mot måleklar løsning.
  representativ,
  delprove,
  homogenisering,
  provemengde,
  ekstraksjon,
  filtrering,
  oppslutning,
  oppkonsentrering,
  fortynning,
  fortynningsfaktor,
  // Kvalitetssikring: ytre rammer og sammenligning først, deretter
  // referanser/metode og til slutt avvik, løpende kontroll og dataintegritet.
  akkreditering,
  ringtest,
  srm,
  standardmetode,
  avviksbehandling,
  internkontroll,
  revisjonsspor,
  // Enheter og referansemateriale: SI-rammen først, deretter koblingen mellom
  // masse og stoffmengde, konsentrasjon og til slutt dimensjonsløse fraksjoner.
  sienheter,
  molmasse,
  molaritet,
  masseprosent,
  ppm,
];
