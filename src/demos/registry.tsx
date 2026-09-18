import dynamic from "next/dynamic";

import type { DemoId } from "./ids";

const RepeterbarhetDemo = dynamic(() => import("./QualityConceptDemos").then((m) => m.RepeterbarhetDemo));
const IntermediarDemo = dynamic(() => import("./QualityConceptDemos").then((m) => m.IntermediarDemo));
const ReproduserbarhetDemo = dynamic(() => import("./QualityConceptDemos").then((m) => m.ReproduserbarhetDemo));
const SkjevhetDemo = dynamic(() => import("./QualityConceptDemos").then((m) => m.SkjevhetDemo));
const GjenvinningDemo = dynamic(() => import("./QualityConceptDemos").then((m) => m.GjenvinningDemo));
const UtvidetUsikkerhetDemo = dynamic(() => import("./QualityConceptDemos").then((m) => m.UtvidetUsikkerhetDemo));
const DekningsfaktorDemo = dynamic(() => import("./QualityConceptDemos").then((m) => m.DekningsfaktorDemo));
const SelektivitetDemo = dynamic(() => import("./QualityConceptDemos").then((m) => m.SelektivitetDemo));
const SpesifisitetDemo = dynamic(() => import("./QualityConceptDemos").then((m) => m.SpesifisitetDemo));
const FolsomhetDemo = dynamic(() => import("./QualityConceptDemos").then((m) => m.FolsomhetDemo));
const RobusthetDemo = dynamic(() => import("./QualityConceptDemos").then((m) => m.RobusthetDemo));
const SporbarhetDemo = dynamic(() => import("./QualityConceptDemos").then((m) => m.SporbarhetDemo));
const ValideringDemo = dynamic(() => import("./QualityConceptDemos").then((m) => m.ValideringDemo));
const VerifiseringDemo = dynamic(() => import("./QualityConceptDemos").then((m) => m.VerifiseringDemo));
const KontrollkortDemo = dynamic(() => import("./QualityConceptDemos").then((m) => m.KontrollkortDemo));

const KalibreringskurveDemo = dynamic(() => import("./CalibrationConceptDemos").then((m) => m.KalibreringskurveDemo));
const KvantifiseringsgrenseDemo = dynamic(() => import("./CalibrationConceptDemos").then((m) => m.KvantifiseringsgrenseDemo));
const ResponsfaktorDemo = dynamic(() => import("./CalibrationConceptDemos").then((m) => m.ResponsfaktorDemo));
const ArbeidsomradeDemo = dynamic(() => import("./CalibrationConceptDemos").then((m) => m.ArbeidsomradeDemo));
const EttpunktskalibreringDemo = dynamic(() => import("./CalibrationConceptDemos").then((m) => m.EttpunktskalibreringDemo));
const VektetRegresjonDemo = dynamic(() => import("./CalibrationConceptDemos").then((m) => m.VektetRegresjonDemo));
const NullpunktDemo = dynamic(() => import("./CalibrationConceptDemos").then((m) => m.NullpunktDemo));
const DriftDemo = dynamic(() => import("./CalibrationConceptDemos").then((m) => m.DriftDemo));
const KontrollproveDemo = dynamic(() => import("./CalibrationConceptDemos").then((m) => m.KontrollproveDemo));
const EksternKalibreringDemo = dynamic(() => import("./CalibrationConceptDemos").then((m) => m.EksternKalibreringDemo));
const MatrikstilpassetKalibreringDemo = dynamic(() => import("./CalibrationConceptDemos").then((m) => m.MatrikstilpassetKalibreringDemo));

const IonesuppresjonDemo = dynamic(() => import("./SampleConceptDemos").then((m) => m.IonesuppresjonDemo));
const IoneforsterkningDemo = dynamic(() => import("./SampleConceptDemos").then((m) => m.IoneforsterkningDemo));
const InterferensDemo = dynamic(() => import("./SampleConceptDemos").then((m) => m.InterferensDemo));
const BakgrunnssignalDemo = dynamic(() => import("./SampleConceptDemos").then((m) => m.BakgrunnssignalDemo));
const MatriksblankDemo = dynamic(() => import("./SampleConceptDemos").then((m) => m.MatriksblankDemo));
const KontamineringDemo = dynamic(() => import("./SampleConceptDemos").then((m) => m.KontamineringDemo));
const KrysskontamineringDemo = dynamic(() => import("./SampleConceptDemos").then((m) => m.KrysskontamineringDemo));
const ProvelagringDemo = dynamic(() => import("./SampleConceptDemos").then((m) => m.ProvelagringDemo));

const GjennomsnittDemo = dynamic(() => import("./StatisticsConceptDemos").then((m) => m.GjennomsnittDemo));
const MedianDemo = dynamic(() => import("./StatisticsConceptDemos").then((m) => m.MedianDemo));
const VariansDemo = dynamic(() => import("./StatisticsConceptDemos").then((m) => m.VariansDemo));
const NormalfordelingDemo = dynamic(() => import("./StatisticsConceptDemos").then((m) => m.NormalfordelingDemo));
const FrihetsgraderDemo = dynamic(() => import("./StatisticsConceptDemos").then((m) => m.FrihetsgraderDemo));
const KonfidensintervallDemo = dynamic(() => import("./StatisticsConceptDemos").then((m) => m.KonfidensintervallDemo));
const SignifikansnivaDemo = dynamic(() => import("./StatisticsConceptDemos").then((m) => m.SignifikansnivaDemo));
const TTestDemo = dynamic(() => import("./StatisticsConceptDemos").then((m) => m.TTestDemo));
const FTestDemo = dynamic(() => import("./StatisticsConceptDemos").then((m) => m.FTestDemo));
const RegresjonDemo = dynamic(() => import("./StatisticsConceptDemos").then((m) => m.RegresjonDemo));
const MinsteKvadraterDemo = dynamic(() => import("./StatisticsConceptDemos").then((m) => m.MinsteKvadraterDemo));
const KorrelasjonDemo = dynamic(() => import("./StatisticsConceptDemos").then((m) => m.KorrelasjonDemo));
const UteliggerDemo = dynamic(() => import("./StatisticsConceptDemos").then((m) => m.UteliggerDemo));

const MobilfaseDemo = dynamic(() => import("./SeparationConceptDemos").then((m) => m.MobilfaseDemo));
const StasjonarfaseDemo = dynamic(() => import("./SeparationConceptDemos").then((m) => m.StasjonarfaseDemo));
const RetensjonstidDemo = dynamic(() => import("./SeparationConceptDemos").then((m) => m.RetensjonstidDemo));
const GradientDemo = dynamic(() => import("./SeparationConceptDemos").then((m) => m.GradientDemo));
const IsokratiskDemo = dynamic(() => import("./SeparationConceptDemos").then((m) => m.IsokratiskDemo));
const ElueringsrekkefolgeDemo = dynamic(() => import("./SeparationConceptDemos").then((m) => m.ElueringsrekkefolgeDemo));
const ToppbreddeDemo = dynamic(() => import("./SeparationConceptDemos").then((m) => m.ToppbreddeDemo));
const HaledannelseDemo = dynamic(() => import("./SeparationConceptDemos").then((m) => m.HaledannelseDemo));
const PlatetallDemo = dynamic(() => import("./SeparationConceptDemos").then((m) => m.PlatetallDemo));
const SeparasjonsfaktorDemo = dynamic(() => import("./SeparationConceptDemos").then((m) => m.SeparasjonsfaktorDemo));
const DodvolumDemo = dynamic(() => import("./SeparationConceptDemos").then((m) => m.DodvolumDemo));
const InjeksjonsvolumDemo = dynamic(() => import("./SeparationConceptDemos").then((m) => m.InjeksjonsvolumDemo));

const SignalStoyDemo = dynamic(() => import("./DetectionConceptDemos").then((m) => m.SignalStoyDemo));
const MassespektrometriDemo = dynamic(() => import("./DetectionConceptDemos").then((m) => m.MassespektrometriDemo));
const IoniseringDetectionDemo = dynamic(() => import("./DetectionConceptDemos").then((m) => m.IoniseringDemo));
const FragmenteringDemo = dynamic(() => import("./DetectionConceptDemos").then((m) => m.FragmenteringDemo));
const SimDemo = dynamic(() => import("./DetectionConceptDemos").then((m) => m.SimDemo));
const MrmDemo = dynamic(() => import("./DetectionConceptDemos").then((m) => m.MrmDemo));
const MasseopplosningDemo = dynamic(() => import("./DetectionConceptDemos").then((m) => m.MasseopplosningDemo));
const LcmsDemo = dynamic(() => import("./DetectionConceptDemos").then((m) => m.LcmsDemo));
const GcmsDemo = dynamic(() => import("./DetectionConceptDemos").then((m) => m.GcmsDemo));
const UvdetektorDemo = dynamic(() => import("./DetectionConceptDemos").then((m) => m.UvdetektorDemo));
const FidDemo = dynamic(() => import("./DetectionConceptDemos").then((m) => m.FidDemo));
const LedningsevneDemo = dynamic(() => import("./DetectionConceptDemos").then((m) => m.LedningsevneDemo));

const RepresentativDemo = dynamic(() => import("./SamplePreparationConceptDemos").then((m) => m.RepresentativDemo));
const DelproveDemo = dynamic(() => import("./SamplePreparationConceptDemos").then((m) => m.DelproveDemo));
const HomogeniseringDemo = dynamic(() => import("./SamplePreparationConceptDemos").then((m) => m.HomogeniseringDemo));
const EkstraksjonDemo = dynamic(() => import("./SamplePreparationConceptDemos").then((m) => m.EkstraksjonDemo));
const OppkonsentreringDemo = dynamic(() => import("./SamplePreparationConceptDemos").then((m) => m.OppkonsentreringDemo));
const FortynningDemo = dynamic(() => import("./SamplePreparationConceptDemos").then((m) => m.FortynningDemo));
const FortynningsfaktorDemo = dynamic(() => import("./SamplePreparationConceptDemos").then((m) => m.FortynningsfaktorDemo));
const FiltreringDemo = dynamic(() => import("./SamplePreparationConceptDemos").then((m) => m.FiltreringDemo));
const OppslutningDemo = dynamic(() => import("./SamplePreparationConceptDemos").then((m) => m.OppslutningDemo));
const ProvemengdeDemo = dynamic(() => import("./SamplePreparationConceptDemos").then((m) => m.ProvemengdeDemo));

/** Kobler et begrep til sin demonstrasjon. */
const demos = {
  "presisjon-spredning": dynamic(() => import("./PresisjonSpredning")),
  "repeterbarhet-serie": RepeterbarhetDemo,
  "intermediar-forhold": IntermediarDemo,
  "reproduserbarhet-lab": ReproduserbarhetDemo,
  "riktighet-skiver": dynamic(() => import("./RiktighetSkiver")),
  "skjevhet-referanse": SkjevhetDemo,
  "gjenvinning-spike": GjenvinningDemo,
  usikkerhetsbudsjett: dynamic(() => import("./Usikkerhetsbudsjett")),
  "utvidet-intervall": UtvidetUsikkerhetDemo,
  "dekningsfaktor-k": DekningsfaktorDemo,
  "selektivitet-interferens": SelektivitetDemo,
  "spesifisitet-terminologi": SpesifisitetDemo,
  "folsomhet-stigning": FolsomhetDemo,
  "robusthet-variasjon": RobusthetDemo,
  "sporbarhet-kjede": SporbarhetDemo,
  "validering-formal": ValideringDemo,
  "verifisering-krav": VerifiseringDemo,
  "kontrollkort-serie": KontrollkortDemo,
  "linearitet-kurve": dynamic(() => import("./LinearitetKurve")),
  "deteksjonsgrense-stoy": dynamic(() => import("./DeteksjonsgrenseStoy")),
  "internstandard-forhold": dynamic(() => import("./InternstandardForhold")),
  "standardaddisjon-steg": dynamic(() => import("./StandardaddisjonSteg")),
  "blindprove-typer": dynamic(() => import("./BlindproveTyper")),
  "kalibreringskurve-punkter": KalibreringskurveDemo,
  "kvantifiseringsgrense-krav": KvantifiseringsgrenseDemo,
  "responsfaktor-forhold": ResponsfaktorDemo,
  "arbeidsomrade-grenser": ArbeidsomradeDemo,
  "ettpunktskalibrering-ankring": EttpunktskalibreringDemo,
  "vektet-regresjon-vekter": VektetRegresjonDemo,
  "nullpunkt-skjaring": NullpunktDemo,
  "drift-tidsserie": DriftDemo,
  "kontrollprove-vakt": KontrollproveDemo,
  "ekstern-kalibrering-separat": EksternKalibreringDemo,
  "matrikstilpasset-kalibrering-matriks": MatrikstilpassetKalibreringDemo,
  "matriseeffekt-matrikser": dynamic(() => import("./MatriseeffektMatrikser")),
  "ionesuppresjon-respons": IonesuppresjonDemo,
  "ioneforsterkning-respons": IoneforsterkningDemo,
  "interferens-signal": InterferensDemo,
  "bakgrunnssignal-nivaa": BakgrunnssignalDemo,
  "matriksblank-sammenligning": MatriksblankDemo,
  "kontaminering-kilde": KontamineringDemo,
  "krysskontaminering-sekvens": KrysskontamineringDemo,
  "provelagring-betingelser": ProvelagringDemo,
  "gjennomsnitt-balanse": GjennomsnittDemo,
  "median-sortering": MedianDemo,
  "varians-kvadrater": VariansDemo,
  "standardavvik-formel": dynamic(() => import("./StandardavvikFormel")),
  "normalfordeling-spredning": NormalfordelingDemo,
  "frihetsgrader-sum": FrihetsgraderDemo,
  "konfidensintervall-repetisjon": KonfidensintervallDemo,
  "signifikansniva-hale": SignifikansnivaDemo,
  "ttest-signal-stoy": TTestDemo,
  "ftest-variansforhold": FTestDemo,
  "regresjon-modell": RegresjonDemo,
  "minstekvadrater-residualer": MinsteKvadraterDemo,
  "korrelasjon-monstre": KorrelasjonDemo,
  "uteligger-punkt": UteliggerDemo,
  "mobilfase-bevegelse": MobilfaseDemo,
  "stasjonarfase-fordeling": StasjonarfaseDemo,
  "retensjonstid-tidslinje": RetensjonstidDemo,
  "gradient-program": GradientDemo,
  "isokratisk-konstant": IsokratiskDemo,
  "elueringsrekkefolge-lop": ElueringsrekkefolgeDemo,
  "toppbredde-mal": ToppbreddeDemo,
  "haledannelse-form": HaledannelseDemo,
  "platetall-bredde": PlatetallDemo,
  "separasjonsfaktor-forhold": SeparasjonsfaktorDemo,
  "dodvolum-begreper": DodvolumDemo,
  "injeksjonsvolum-plugg": InjeksjonsvolumDemo,
  "opplosning-topper": dynamic(() => import("./OpplosningTopper")),
  "signalstoy-forhold": SignalStoyDemo,
  "massespektrometri-kjede": MassespektrometriDemo,
  "ionisering-ladning": IoniseringDetectionDemo,
  "fragmentering-spalting": FragmenteringDemo,
  "sim-utvalg": SimDemo,
  "mrm-overganger": MrmDemo,
  "masseopplosning-topper": MasseopplosningDemo,
  "lcms-kobling": LcmsDemo,
  "gcms-kobling": GcmsDemo,
  "uvdetektor-absorbans": UvdetektorDemo,
  "fid-flamme": FidDemo,
  "ledningsevne-celle": LedningsevneDemo,
  "representativ-utvalg": RepresentativDemo,
  "delprove-splitting": DelproveDemo,
  "homogenisering-fordeling": HomogeniseringDemo,
  "ekstraksjon-faseoverforing": EkstraksjonDemo,
  "oppkonsentrering-volum": OppkonsentreringDemo,
  "fortynning-volum": FortynningDemo,
  "fortynningsfaktor-regnestykke": FortynningsfaktorDemo,
  "filtrering-fraksjoner": FiltreringDemo,
  "oppslutning-matriks": OppslutningDemo,
  "provemengde-heterogenitet": ProvemengdeDemo,
} as const satisfies Record<DemoId, React.ComponentType>;

/** Rendrer demonstrasjonen et begrep viser til. */
export function TermDemonstration({ demo }: { demo: DemoId }) {
  const Demo = demos[demo];
  return <Demo />;
}
