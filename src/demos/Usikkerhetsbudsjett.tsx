"use client";

import { useState } from "react";

import { DemonstrationFrame } from "@/components/DemonstrationFrame";
import { Chip, ChipGroup, Verdict } from "./primitives";
import shared from "./demos.module.css";
import styles from "./Usikkerhetsbudsjett.module.css";

/** Bidragene i budsjettet, i prosent. Tallene er pedagogiske, ikke fasit. */
const CONTRIBUTIONS = [
  { name: "Repeterbarhet", percent: 2.5 },
  { name: "Kalibreringskurve", percent: 3.2 },
  { name: "Pipettering", percent: 1.8 },
  { name: "Temperatur", percent: 0.9 },
];

const RESULT = 0.42;
const LIMIT = 0.5;
const AXIS_MAX = 0.7;

const comma = (value: number, decimals: number) =>
  value.toFixed(decimals).replace(".", ",");
const position = (value: number) => `${(value / AXIS_MAX) * 100}%`;

export default function Usikkerhetsbudsjett() {
  const [enabled, setEnabled] = useState([true, true, false, false]);

  const combined = Math.sqrt(
    CONTRIBUTIONS.reduce(
      (sum, contribution, index) =>
        sum + (enabled[index] ? contribution.percent * contribution.percent : 0),
      0,
    ),
  );
  const expanded = 2 * combined;
  const absolute = (RESULT * expanded) / 100;
  const crosses = RESULT + absolute >= LIMIT;

  const verdict =
    combined === 0
      ? "Uten bidrag er svaret et punkt uten slark — det finnes ikke i praksis."
      : crosses
        ? "Intervallet krysser grenseverdien. Du kan ikke slå fast at prøven er under grensa."
        : "Hele intervallet ligger under grenseverdien. Konklusjonen holder.";

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Bygg budsjettet bidrag for bidrag"
      label="Demonstrasjon: usikkerhetsbudsjett mot en grenseverdi"
    >
      <p className={shared.note}>
        Prøven er målt til <strong className={styles.strong}>0,42 mg/kg</strong>. Grenseverdien er
        0,50 mg/kg. Slå på bidragene som gjelder for metoden.
      </p>

      <div className={styles.chips}>
        <ChipGroup label="Bidrag i usikkerhetsbudsjettet">
          {CONTRIBUTIONS.map((contribution, index) => (
            <Chip
              key={contribution.name}
              pressed={enabled[index] ?? false}
              onClick={() =>
                setEnabled((current) =>
                  current.map((on, i) => (i === index ? !on : on)),
                )
              }
            >
              {contribution.name} {comma(contribution.percent, 1)} %
            </Chip>
          ))}
        </ChipGroup>
      </div>

      <div className={styles.scale} aria-hidden="true">
        <div className={styles.axis} />
        <div
          className={styles.interval}
          style={{
            left: position(Math.max(0, RESULT - absolute)),
            width: `${((2 * absolute) / AXIS_MAX) * 100}%`,
          }}
        />
        <div className={styles.result} style={{ left: position(RESULT) }} />
        <div className={styles.limit} style={{ left: position(LIMIT) }} />
        <div className={styles.limitLabel} style={{ left: position(LIMIT) }}>
          grenseverdi 0,50
        </div>
        <div className={styles.resultLabel} style={{ left: position(RESULT) }}>
          0,42
        </div>
      </div>

      <div className={`${shared.row} ${shared.rule}`}>
        <span className={styles.value}>± {comma(absolute, 3)} mg/kg</span>
        <span className={shared.caption}>
          utvidet usikkerhet, k = 2 ({comma(expanded, 1)} %)
        </span>
      </div>
      <Verdict tone={crosses && combined > 0 ? "warning" : "normal"}>
        {verdict}
      </Verdict>
    </DemonstrationFrame>
  );
}
