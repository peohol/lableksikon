import dynamic from "next/dynamic";

import type { DemoId } from "./ids";

const RepeterbarhetDemo = dynamic(() =>
  import("./QualityConceptDemos").then((module) => module.RepeterbarhetDemo),
);
const IntermediarDemo = dynamic(() =>
  import("./QualityConceptDemos").then((module) => module.IntermediarDemo),
);
const ReproduserbarhetDemo = dynamic(() =>
  import("./QualityConceptDemos").then((module) => module.ReproduserbarhetDemo),
);
const SkjevhetDemo = dynamic(() =>
  import("./QualityConceptDemos").then((module) => module.SkjevhetDemo),
);
const GjenvinningDemo = dynamic(() =>
  import("./QualityConceptDemos").then((module) => module.GjenvinningDemo),
);
const UtvidetUsikkerhetDemo = dynamic(() =>
  import("./QualityConceptDemos").then((module) => module.UtvidetUsikkerhetDemo),
);
const DekningsfaktorDemo = dynamic(() =>
  import("./QualityConceptDemos").then((module) => module.DekningsfaktorDemo),
);
const SelektivitetDemo = dynamic(() =>
  import("./QualityConceptDemos").then((module) => module.SelektivitetDemo),
);
const SpesifisitetDemo = dynamic(() =>
  import("./QualityConceptDemos").then((module) => module.SpesifisitetDemo),
);
const FolsomhetDemo = dynamic(() =>
  import("./QualityConceptDemos").then((module) => module.FolsomhetDemo),
);
const RobusthetDemo = dynamic(() =>
  import("./QualityConceptDemos").then((module) => module.RobusthetDemo),
);
const SporbarhetDemo = dynamic(() =>
  import("./QualityConceptDemos").then((module) => module.SporbarhetDemo),
);
const ValideringDemo = dynamic(() =>
  import("./QualityConceptDemos").then((module) => module.ValideringDemo),
);
const VerifiseringDemo = dynamic(() =>
  import("./QualityConceptDemos").then((module) => module.VerifiseringDemo),
);
const KontrollkortDemo = dynamic(() =>
  import("./QualityConceptDemos").then((module) => module.KontrollkortDemo),
);

const KalibreringskurveDemo = dynamic(() =>
  import("./CalibrationConceptDemos").then((module) => module.KalibreringskurveDemo),
);
const KvantifiseringsgrenseDemo = dynamic(() =>
  import("./CalibrationConceptDemos").then((module) => module.KvantifiseringsgrenseDemo),
);
const ResponsfaktorDemo = dynamic(() =>
  import("./CalibrationConceptDemos").then((module) => module.ResponsfaktorDemo),
);
const ArbeidsomradeDemo = dynamic(() =>
  import("./CalibrationConceptDemos").then((module) => module.ArbeidsomradeDemo),
);
const EttpunktskalibreringDemo = dynamic(() =>
  import("./CalibrationConceptDemos").then((module) => module.EttpunktskalibreringDemo),
);
const VektetRegresjonDemo = dynamic(() =>
  import("./CalibrationConceptDemos").then((module) => module.VektetRegresjonDemo),
);
const NullpunktDemo = dynamic(() =>
  import("./CalibrationConceptDemos").then((module) => module.NullpunktDemo),
);
const DriftDemo = dynamic(() =>
  import("./CalibrationConceptDemos").then((module) => module.DriftDemo),
);
const KontrollproveDemo = dynamic(() =>
  import("./CalibrationConceptDemos").then((module) => module.KontrollproveDemo),
);
const EksternKalibreringDemo = dynamic(() =>
  import("./CalibrationConceptDemos").then((module) => module.EksternKalibreringDemo),
);
const MatrikstilpassetKalibreringDemo = dynamic(() =>
  import("./CalibrationConceptDemos").then((module) => module.MatrikstilpassetKalibreringDemo),
);

const IonesuppresjonDemo = dynamic(() =>
  import("./SampleConceptDemos").then((module) => module.IonesuppresjonDemo),
);
const IoneforsterkningDemo = dynamic(() =>
  import("./SampleConceptDemos").then((module) => module.IoneforsterkningDemo),
);
const InterferensDemo = dynamic(() =>
  import("./SampleConceptDemos").then((module) => module.InterferensDemo),
);
const BakgrunnssignalDemo = dynamic(() =>
  import("./SampleConceptDemos").then((module) => module.BakgrunnssignalDemo),
);
const MatriksblankDemo = dynamic(() =>
  import("./SampleConceptDemos").then((module) => module.MatriksblankDemo),
);
const KontamineringDemo = dynamic(() =>
  import("./SampleConceptDemos").then((module) => module.KontamineringDemo),
);
const KrysskontamineringDemo = dynamic(() =>
  import("./SampleConceptDemos").then((module) => module.KrysskontamineringDemo),
);
const ProvelagringDemo = dynamic(() =>
  import("./SampleConceptDemos").then((module) => module.ProvelagringDemo),
);

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
  "standardavvik-formel": dynamic(() => import("./StandardavvikFormel")),
  "opplosning-topper": dynamic(() => import("./OpplosningTopper")),
} as const satisfies Record<DemoId, React.ComponentType>;

/** Rendrer demonstrasjonen et begrep viser til. */
export function TermDemonstration({ demo }: { demo: DemoId }) {
  const Demo = demos[demo];
  return <Demo />;
}
