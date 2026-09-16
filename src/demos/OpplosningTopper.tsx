"use client";

import { useState } from "react";

import { DemonstrationFrame } from "@/components/DemonstrationFrame";
import { comma } from "@/lib/statistics";
import { Readout, Slider, Verdict } from "./primitives";
import shared from "./demos.module.css";
import styles from "./OpplosningTopper.module.css";

const WIDTH = 46;
const BASELINE = 258;
const HEIGHT = 105;

const gaussian = (x: number, center: number) =>
  HEIGHT * Math.exp(-((x - center) ** 2) / (2 * WIDTH * WIDTH));

export default function OpplosningTopper() {
  const [separation, setSeparation] = useState(55);

  const fraction = separation / 100;
  const centerA = 420 - 120 * fraction;
  const centerB = 500 + 220 * fraction;

  const xs: number[] = [];
  for (let x = 60; x <= 870; x += 7) xs.push(x);
  const line = (center: number) =>
    xs.map((x) => `${x},${(BASELINE - gaussian(x, center)).toFixed(1)}`).join(" ");
  const sum = xs
    .map((x) => `${x},${(BASELINE - gaussian(x, centerA) - gaussian(x, centerB)).toFixed(1)}`)
    .join(" ");

  const resolution = (centerB - centerA) / (4 * WIDTH);
  const label = comma(resolution, 2);
  const verdict =
    resolution >= 1.5
      ? "Toppene er tilnærmet helt skilt. Arealene kan måles hver for seg."
      : resolution >= 1
        ? "Delvis overlapp. Arealene kan beregnes, men med økt usikkerhet."
        : "Toppene smelter sammen til én. Stoffene kan ikke kvantifiseres hver for seg her.";

  return (
    <DemonstrationFrame
      kind="interaktiv, stor"
      instruction="Skyv toppene fra hverandre"
      label="Demonstrasjon: to kromatografiske topper som skilles"
      width="extra-wide"
    >
      <svg viewBox="0 0 900 300" aria-hidden="true" className={shared.svg}>
        <line x1="40" y1="258" x2="880" y2="258" className="svg-axis" />
        <line x1="40" y1="258" x2="40" y2="20" className="svg-axis" />
        {/* De to stoffene skilles på strektype i tillegg til farge. */}
        <polyline points={line(centerA)} className="series-1-stroke" strokeWidth="1.5" strokeDasharray="6 4" />
        <polyline points={line(centerB)} className="series-2-stroke" strokeWidth="1.5" strokeDasharray="2 4" />
        <polyline points={sum} className="series-ink-stroke" strokeWidth="2.5" />
        <text x={centerA.toFixed(0)} y="36" className="svg-label svg-label-accent" textAnchor="middle">
          stoff A
        </text>
        <text x={centerB.toFixed(0)} y="36" className="svg-label svg-label-warning" textAnchor="middle">
          stoff B
        </text>
        <text x="460" y="286" className="svg-label" textAnchor="middle">
          retensjonstid
        </text>
      </svg>
      <Slider
        label="Avstand mellom toppene"
        valueText={`Oppløsning R ${label}`}
        value={separation}
        onChange={setSeparation}
        ends={["toppene ligger oppå hverandre", "helt skilt"]}
      />
      <div className={`${shared.row} ${shared.rule} ${styles.readouts}`}>
        <Readout label="Oppløsning" value={`R = ${label}`} size="small" />
        <div className={styles.requirement}>
          <span className="readout-label">Krav i de fleste metoder</span>
          <span className={styles.requirementText}>R ≥ 1,5 gir tilnærmet full separasjon</span>
        </div>
        <div className={styles.verdictCol}>
          <Verdict reserve={0}>{verdict}</Verdict>
        </div>
      </div>
    </DemonstrationFrame>
  );
}
