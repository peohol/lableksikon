"use client";

import { useState } from "react";

import { DemonstrationFrame } from "@/components/DemonstrationFrame";
import { comma } from "@/lib/statistics";
import { Readout, Slider, Verdict } from "./primitives";
import shared from "./demos.module.css";
import styles from "./DeteksjonsgrenseStoy.module.css";

/** Pedagogisk S/N-illustrasjon. S/N = 3 og 10 er konvensjoner her, ikke universelle LOD/LOQ-definisjoner. */
const NOISE_SEEDS = [
  0.42, 0.81, 0.13, 0.67, 0.29, 0.94, 0.55, 0.07, 0.73, 0.36, 0.88, 0.21, 0.61, 0.48, 0.97, 0.15,
  0.79, 0.33, 0.58, 0.05, 0.86, 0.44, 0.69, 0.11, 0.92, 0.26, 0.63, 0.38, 0.75, 0.18, 0.83, 0.51,
  0.09, 0.71, 0.31, 0.65, 0.23, 0.87, 0.41, 0.57,
];
const PEAK_INDEX = 19;
const PEAK_HEIGHT = 100;

export default function DeteksjonsgrenseStoy() {
  const [noise, setNoise] = useState(20);
  const bars = NOISE_SEEDS.map((seed, index) => {
    const distance = index - PEAK_INDEX;
    const peak = PEAK_HEIGHT * Math.exp(-(distance * distance) / 3.4);
    return Math.max(1.5, peak + seed * noise * 0.8);
  });
  const snr = PEAK_HEIGHT / Math.max(2.5, noise * 0.8);
  const snrLabel = comma(snr, 1);
  const belowLimit = snr < 3;
  const verdict =
    snr >= 10
      ? "Toppen er godt over støyen i denne illustrasjonen."
      : snr >= 3
        ? "Toppen kan skilles fra støyen etter illustrasjonens S/N-kriterium."
        : "Under grensa i denne illustrasjonen: S/N-kriteriet er ikke lenger oppfylt.";

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Skru opp støyen og se hvordan signal-støy-forholdet faller"
      label="Pedagogisk demonstrasjon av signal mot støy"
      afterword="S/N = 3 brukes her for å vise prinsippet. Reell LOD skal bestemmes med en definert, validert tilnærming for den aktuelle metoden."
    >
      <div className={`chart-surface ${styles.chart}`} aria-hidden="true">
        {bars.map((height, index) => <div key={index} className={styles.bar} style={{ height: `${height}%` }} />)}
      </div>
      <Slider label="Støynivå i bakgrunnen" valueText={`Signal-støy-forhold ${snrLabel}`} value={noise} onChange={setNoise} ends={["rolig bakgrunn", "mye støy"]} />
      <div className={`${shared.row} ${shared.rule}`}>
        <Readout label="illustrativ grense: S/N = 3" value={`S/N = ${snrLabel}`} size="small" />
      </div>
      <Verdict tone={belowLimit ? "warning" : "normal"}>{verdict}</Verdict>
    </DemonstrationFrame>
  );
}
