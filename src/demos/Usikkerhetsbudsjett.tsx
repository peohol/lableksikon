"use client";

import { useState } from "react";

import { DemonstrationFrame } from "@/components/DemonstrationFrame";
import { MathFormula } from "@/components/MathFormula";
import { Chip, ChipGroup, Verdict } from "./primitives";
import shared from "./demos.module.css";
import styles from "./Usikkerhetsbudsjett.module.css";

const CONTRIBUTIONS = [
  { name: "Repeterbarhet", percent: 4.0 },
  { name: "Kalibreringskurve", percent: 4.5 },
  { name: "Opparbeiding", percent: 13.0 },
  { name: "Temperatur", percent: 0.9 },
];
const RESULT = 0.42;
const LIMIT = 0.5;
const AXIS_MAX = 0.7;
const comma = (value: number, decimals: number) => value.toFixed(decimals).replace(".", ",");
const position = (value: number) => `${(value / AXIS_MAX) * 100}%`;

export default function Usikkerhetsbudsjett() {
  const [enabled, setEnabled] = useState([true, true, false, false]);
  const combined = Math.sqrt(CONTRIBUTIONS.reduce((sum, contribution, index) => sum + (enabled[index] ? contribution.percent ** 2 : 0), 0));
  const expanded = 2 * combined;
  const absolute = (RESULT * expanded) / 100;
  const absoluteTex = comma(absolute, 3).replace(",", "{,}");
  const expandedTex = comma(expanded, 1).replace(",", "{,}");
  const crosses = RESULT + absolute >= LIMIT;
  const verdict = combined === 0
    ? "Uten bidrag er svaret et punkt uten slark — det finnes ikke i praksis."
    : crosses
      ? "Intervallet krysser grenseverdien med den forenklede beslutningsregelen i eksemplet."
      : "Hele intervallet ligger under grenseverdien med den forenklede beslutningsregelen i eksemplet.";

  return (
    <DemonstrationFrame kind="interaktiv" instruction="Bygg et forenklet budsjett bidrag for bidrag" label="Pedagogisk demonstrasjon av usikkerhetsbudsjett mot en grenseverdi" afterword="Eksemplet bruker uavhengige relative bidrag, \(k = 2\) og en enkel intervallregel. Virkelige usikkerhetsmodeller og beslutningsregler må tilpasses formålet.">
      <p className={shared.note}>Prøven er målt til <strong className={styles.strong}>0,42 mg/kg</strong>. Grenseverdien er 0,50 mg/kg.</p>
      <div className={styles.chips}>
        <ChipGroup label="Bidrag i usikkerhetsbudsjettet">
          {CONTRIBUTIONS.map((contribution, index) => (
            <Chip key={contribution.name} pressed={enabled[index] ?? false} onClick={() => setEnabled((current) => current.map((on, i) => (i === index ? !on : on)))}>
              {contribution.name} {comma(contribution.percent, 1)} %
            </Chip>
          ))}
        </ChipGroup>
      </div>
      <div className={styles.scale} aria-hidden="true">
        <div className={styles.axis} />
        <div className={styles.interval} style={{ left: position(Math.max(0, RESULT - absolute)), width: `${((2 * absolute) / AXIS_MAX) * 100}%` }} />
        <div className={styles.result} style={{ left: position(RESULT) }} />
        <div className={styles.limit} style={{ left: position(LIMIT) }} />
        <div className={styles.limitLabel} style={{ left: position(LIMIT) }}>grenseverdi 0,50</div>
        <div className={styles.resultLabel} style={{ left: position(RESULT) }}>0,42</div>
      </div>
      <div className={`${shared.row} ${shared.rule}`}>
        <span className={styles.value}><MathFormula tex={`\\pm ${absoluteTex}\\,\\mathrm{mg/kg}`} /></span>
        <span className={shared.caption}>utvidet usikkerhet, <MathFormula tex="k = 2" /> (<MathFormula tex={`${expandedTex}\\,\\%`} />)</span>
      </div>
      <Verdict tone={crosses && combined > 0 ? "warning" : "normal"}>{verdict}</Verdict>
    </DemonstrationFrame>
  );
}
