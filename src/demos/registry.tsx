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
  "matriseeffekt-matrikser": dynamic(() => import("./MatriseeffektMatrikser")),
  "standardavvik-formel": dynamic(() => import("./StandardavvikFormel")),
  "opplosning-topper": dynamic(() => import("./OpplosningTopper")),
} as const satisfies Record<DemoId, React.ComponentType>;

/** Rendrer demonstrasjonen et begrep viser til. */
export function TermDemonstration({ demo }: { demo: DemoId }) {
  const Demo = demos[demo];
  return <Demo />;
}
