"use client";

import { useState } from "react";

import { DemonstrationFrame } from "@/components/DemonstrationFrame";
import { MathFormula } from "@/components/MathFormula";
import { Readout, Slider, Verdict } from "./primitives";
import shared from "./demos.module.css";
import styles from "./PresisjonSpredning.module.css";

/** Seks faste skudd som bare sprer seg — klyngen flytter seg aldri mot blinken. */
const SHOTS = [
  [-0.7, -0.5],
  [0.6, -0.8],
  [0.9, 0.4],
  [-0.4, 0.8],
  [0.2, -0.2],
  [-0.9, 0.2],
] as const;

const format = (value: number) => value.toFixed(1).replace(".", ",");

export default function PresisjonSpredning() {
  const [spread, setSpread] = useState(26);

  const amplitude = 2 + spread * 0.3;
  const rsd = 0.4 + spread * 0.115;
  const rsdLabel = format(rsd);
  const rsdTex = rsdLabel.replace(",", "{,}");
  const verdict =
    rsd < 2
      ? "Målingene er svært presise: gjentak gir praktisk talt samme tall."
      : rsd < 6
        ? "Akseptabel presisjon for mange rutinemetoder."
        : "For dårlig presisjon: gjentak av samme prøve gir ulike svar.";

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Skru på spredningen og se RSD følge etter"
      label="Demonstrasjon: spredning i gjentatte målinger"
    >
      <div className={`${shared.split} ${shared.splitCenter}`}>
        <div className={styles.target}>
          <svg viewBox="0 0 200 200" aria-hidden="true" className={shared.svg}>
            <circle cx="100" cy="100" r="88" className="surface-muted-fill svg-hairline" />
            <circle cx="100" cy="100" r="66" className="surface-fill svg-hairline" />
            <circle cx="100" cy="100" r="44" className="surface-muted-fill svg-hairline" />
            <circle cx="100" cy="100" r="22" className="surface-fill svg-axis" />
            <line x1="100" y1="12" x2="100" y2="188" className="svg-guide" />
            <line x1="12" y1="100" x2="188" y2="100" className="svg-guide" />
            <circle cx="100" cy="100" r="3" className="svg-label-ink" />
          </svg>
          {SHOTS.map(([dx, dy], index) => (
            <span
              key={index}
              aria-hidden="true"
              className={styles.shot}
              style={{ left: `${62 + dx * amplitude}%`, top: `${30 + dy * amplitude}%` }}
            />
          ))}
        </div>
        <div className={shared.readingCol}>
          <Readout label="Seks gjentatte målinger av samme prøve" value={<MathFormula tex={`\\mathrm{RSD} = ${rsdTex}\\,\\%`} />} />
          <Verdict reserve={3.2}>{verdict}</Verdict>
          <div>
            <Slider
              label="Spredning mellom målingene"
              valueText={`RSD ${rsdLabel} prosent`}
              value={spread}
              onChange={setSpread}
              ends={["tett samlet", "spredt"]}
            />
          </div>
          <p className={`lead ${styles.afterword}`}>
            Legg merke til at klyngen aldri flytter seg inn mot blinken. Presisjon sier ingenting om
            det.
          </p>
        </div>
      </div>
    </DemonstrationFrame>
  );
}
