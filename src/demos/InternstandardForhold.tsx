"use client";

import { useState } from "react";

import { DemonstrationFrame } from "@/components/DemonstrationFrame";
import { Verdict } from "./primitives";
import styles from "./InternstandardForhold.module.css";

const ANALYTE = 620;
const STANDARD = 860;
const LOSS = 0.7;

export default function InternstandardForhold() {
  const [spilled, setSpilled] = useState(false);
  const factor = spilled ? LOSS : 1;

  return (
    <DemonstrationFrame
      kind="før og etter"
      instruction="Søl bort en del av prøven"
      label="Demonstrasjon: før og etter tap av prøve"
    >
      <div className={styles.bars}>
        <div className={styles.barColumn}>
          <div
            aria-hidden="true"
            className={`${styles.bar} ${styles.barAnalyte}`}
            style={{ height: `${62 * factor}%` }}
          />
          <span className={styles.barLabel}>
            Stoffet
            <br />
            {Math.round(ANALYTE * factor)} enheter
          </span>
        </div>
        <div className={styles.barColumn}>
          <div
            aria-hidden="true"
            className={`${styles.bar} ${styles.barStandard}`}
            style={{ height: `${86 * factor}%` }}
          />
          <span className={styles.barLabel}>
            Internstandard
            <br />
            {Math.round(STANDARD * factor)} enheter
          </span>
        </div>
        <div className={styles.ratio}>
          <span className="readout-label">Forholdet</span>
          <span className={styles.ratioValue}>0,72</span>
          <span className={styles.ratioNote}>står uendret</span>
        </div>
      </div>
      <button
        type="button"
        aria-pressed={spilled}
        onClick={() => setSpilled((current) => !current)}
        className={`button button-primary ${styles.action}`}
      >
        {spilled ? "Gjenopprett prøven" : "Søl bort 30 % av prøven"}
      </button>
      <Verdict>
        {spilled
          ? "Begge signalene falt med 30 %, men forholdet er uendret — og konsentrasjonen leses av forholdet. Tapet er regnet bort."
          : "Begge søylene er på fullt nivå. Prøv å søle bort en del av prøven."}
      </Verdict>
    </DemonstrationFrame>
  );
}
