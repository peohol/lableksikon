import dynamic from "next/dynamic";

import type { DemoId } from "./ids";

const qualityDemo = <T extends keyof typeof import("./QualityConceptDemos")>(name: T) =>
  dynamic(() => import("./QualityConceptDemos").then((module) => module[name]));

/** Kobler et begrep til sin demonstrasjon. */
const demos = {
  "presisjon-spredning": dynamic(() => import("./PresisjonSpredning")),
  "repeterbarhet-serie": qualityDemo("RepeterbarhetDemo"),
  "intermediar-forhold": qualityDemo("IntermediarDemo"),
  "reproduserbarhet-lab": qualityDemo("ReproduserbarhetDemo"),
  "riktighet-skiver": dynamic(() => import("./RiktighetSkiver")),
  "skjevhet-referanse": qualityDemo("SkjevhetDemo"),
  "gjenvinning-spike": qualityDemo("GjenvinningDemo"),
  usikkerhetsbudsjett: dynamic(() => import("./Usikkerhetsbudsjett")),
  "utvidet-intervall": qualityDemo("UtvidetUsikkerhetDemo"),
  "dekningsfaktor-k": qualityDemo("DekningsfaktorDemo"),
  "selektivitet-interferens": qualityDemo("SelektivitetDemo"),
  "spesifisitet-terminologi": qualityDemo("SpesifisitetDemo"),
  "folsomhet-stigning": qualityDemo("FolsomhetDemo"),
  "robusthet-variasjon": qualityDemo("RobusthetDemo"),
  "sporbarhet-kjede": qualityDemo("SporbarhetDemo"),
  "validering-formal": qualityDemo("ValideringDemo"),
  "verifisering-krav": qualityDemo("VerifiseringDemo"),
  "kontrollkort-serie": qualityDemo("KontrollkortDemo"),
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
