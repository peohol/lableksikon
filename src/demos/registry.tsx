import dynamic from "next/dynamic";

import type { DemoId } from "./ids";

/**
 * Kobler et begrep til sin demonstrasjon. Hver demonstrasjon er en egen
 * komponent med fri indre layout; det felles er `DemonstrationFrame`,
 * grunnkontrollene, typografien og tilgjengeligheten.
 *
 * Lastes dynamisk slik at en begrepsside bare henter sin egen demonstrasjon.
 */
const demos = {
  "presisjon-spredning": dynamic(() => import("./PresisjonSpredning")),
  usikkerhetsbudsjett: dynamic(() => import("./Usikkerhetsbudsjett")),
  "riktighet-skiver": dynamic(() => import("./RiktighetSkiver")),
  "linearitet-kurve": dynamic(() => import("./LinearitetKurve")),
  "deteksjonsgrense-stoy": dynamic(() => import("./DeteksjonsgrenseStoy")),
  "internstandard-forhold": dynamic(() => import("./InternstandardForhold")),
  "standardaddisjon-steg": dynamic(() => import("./StandardaddisjonSteg")),
  "blindprove-typer": dynamic(() => import("./BlindproveTyper")),
  "matriseeffekt-matrikser": dynamic(() => import("./MatriseeffektMatrikser")),
  "standardavvik-formel": dynamic(() => import("./StandardavvikFormel")),
  "opplosning-topper": dynamic(() => import("./OpplosningTopper")),
} as const satisfies Record<DemoId, unknown>;

/** Rendrer demonstrasjonen et begrep viser til. */
export function TermDemonstration({ demo }: { demo: DemoId }) {
  const Demo = demos[demo];
  return <Demo />;
}
