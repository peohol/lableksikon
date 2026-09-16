"use client";

import { useState } from "react";

import { DemonstrationFrame } from "@/components/DemonstrationFrame";
import { StepIndicator, Verdict } from "./primitives";
import shared from "./demos.module.css";
import styles from "./StandardaddisjonSteg.module.css";

const STEPS = [
  {
    name: "Del opp prøven",
    text: "Fire like porsjoner av samme prøve. Alle har det samme ukjente innholdet fra før.",
  },
  {
    name: "Tilsett kjente mengder",
    text: "Porsjon 1 får ingenting, de neste får stadig mer av en standardløsning med kjent konsentrasjon.",
  },
  {
    name: "Mål alle",
    text: "Signalet stiger jevnt med tilsatt mengde. Stigningen forteller hvor følsom metoden er i denne matriksen.",
  },
  {
    name: "Ekstrapoler til null",
    text: "Forleng linja bakover til den krysser nullinja. Avstanden bortover til krysningspunktet er prøvens eget innhold.",
  },
];

const POINTS = [
  [120, 170],
  [196, 122],
  [272, 74],
  [348, 26],
] as const;

const CROSSING_X = 72;

export default function StandardaddisjonSteg() {
  const [step, setStep] = useState(0);
  const current = STEPS[step] as (typeof STEPS)[number];

  const dots = step === 0 ? POINTS.slice(0, 1) : POINTS;
  const showLine = step >= 2;
  const showExtrapolation = step >= 3;

  return (
    <DemonstrationFrame
      kind="stegvis"
      instruction={`Steg ${step + 1} av ${STEPS.length}: ${current.name}`}
      label="Demonstrasjon: standardaddisjon steg for steg"
    >
      <StepIndicator
        label="Stegene i standardaddisjon"
        steps={STEPS.map((entry) => entry.name)}
        current={step}
        onSelect={setStep}
      />

      <div className={`${shared.split} ${styles.body}`}>
        <div className={shared.figureCol}>
          <svg viewBox="0 0 360 240" aria-hidden="true" className={shared.svg}>
            <line x1="120" y1="200" x2="348" y2="200" className="svg-axis" />
            <line x1="120" y1="200" x2="120" y2="16" className="svg-axis" />
            <line x1="20" y1="200" x2="120" y2="200" className="svg-guide" />
            <text x="234" y="228" className="svg-label" textAnchor="middle">
              tilsatt mengde standard
            </text>
            {showLine ? (
              <polyline
                points={POINTS.map(([x, y]) => `${x},${y}`).join(" ")}
                className="series-1-stroke"
                strokeWidth="2.5"
              />
            ) : null}
            {showExtrapolation ? (
              <polyline
                points={`120,170 ${CROSSING_X},200`}
                className="series-2-stroke"
                strokeWidth="2"
                strokeDasharray="6 5"
              />
            ) : null}
            {dots.map(([x, y]) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r="5" className="series-1-fill" />
            ))}
            {showExtrapolation ? (
              <>
                <circle cx={CROSSING_X} cy="200" r="6" className="series-2-fill" />
                <text x={CROSSING_X} y="222" className="svg-label svg-label-warning" textAnchor="middle">
                  prøvens innhold
                </text>
              </>
            ) : null}
          </svg>
        </div>

        <div className={styles.text}>
          <Verdict reserve={7}>{current.text}</Verdict>
          <div className={styles.actions}>
            <button
              type="button"
              className={`button button-secondary ${styles.action}`}
              onClick={() => setStep((index) => (index + STEPS.length - 1) % STEPS.length)}
            >
              ← Forrige steg
            </button>
            <button
              type="button"
              className={`button button-primary ${styles.action}`}
              onClick={() => setStep((index) => (index + 1) % STEPS.length)}
            >
              Neste steg →
            </button>
          </div>
        </div>
      </div>
    </DemonstrationFrame>
  );
}
