"use client";

import { useRef, useState } from "react";

import { DemonstrationFrame } from "@/components/DemonstrationFrame";
import { clamp, comma, fitLine } from "@/lib/statistics";
import { Readout, Slider, Verdict } from "./primitives";
import shared from "./demos.module.css";
import styles from "./LinearitetKurve.module.css";

const BEND_AMOUNT = [0, 1, 4, 12, 26, 46];
const X_POSITIONS = BEND_AMOUNT.map((_, index) => 70 + index * 64);
const VIEWBOX_HEIGHT = 300;

export default function LinearitetKurve() {
  const [bend, setBend] = useState(0);
  const svgRef = useRef<SVGSVGElement>(null);
  const dragging = useRef(false);

  const ys = BEND_AMOUNT.map((amount, index) => 220 - 36 * index + bend * amount);
  const fit = fitLine(ys);
  const r2 = comma(fit.r2, 4);
  const percent = Math.round(bend * 100);

  const maxResidual = Math.max(
    6,
    ...ys.map((y, index) => Math.abs(y - (fit.predicted[index] as number))),
  );

  const verdict =
    bend < 0.12
      ? "Punktene ligger på linja, og residualene spretter tilfeldig rundt null. Metoden er lineær i dette området."
      : bend < 0.45
        ? "R² ser fortsatt fint ut, men residualene begynner å danne en bue. Det er et tidlig varsel."
        : "Tydelig metning i toppen. Høye prøver må fortynnes, ellers rapporteres de for lavt — selv med høy R².";

  const bendFromPointer = (clientY: number) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const y = ((clientY - rect.top) / rect.height) * VIEWBOX_HEIGHT;
    setBend(clamp((y - 60) / 96, 0, 1));
  };

  const fitY = (xPixel: number) => fit.intercept + fit.slope * ((xPixel - 70) / 64);

  return (
    <DemonstrationFrame
      kind="interaktiv, stor"
      instruction="Dra det øverste punktet, eller bruk slideren"
      label="Demonstrasjon: kalibreringskurve som bøyer av"
      width="wide"
    >
      <div className={shared.split}>
        <div className={styles.plot}>
          <svg
            ref={svgRef}
            viewBox="0 0 420 300"
            aria-hidden="true"
            className={styles.svg}
            onPointerDown={(event) => {
              dragging.current = true;
              event.currentTarget.setPointerCapture(event.pointerId);
              bendFromPointer(event.clientY);
            }}
            onPointerMove={(event) => {
              if (dragging.current) bendFromPointer(event.clientY);
            }}
            onPointerUp={(event) => {
              dragging.current = false;
              event.currentTarget.releasePointerCapture(event.pointerId);
            }}
            onPointerCancel={() => {
              dragging.current = false;
            }}
          >
            <line x1="52" y1="252" x2="404" y2="252" className="svg-axis" />
            <line x1="52" y1="252" x2="52" y2="24" className="svg-axis" />
            <text
              x="228"
              y="286"
              className="svg-label"
              textAnchor="middle"
            >
              konsentrasjon
            </text>
            <text
              x="20"
              y="140"
              className="svg-label"
              textAnchor="middle"
              transform="rotate(-90 20 140)"
            >
              signal
            </text>
            <line
              x1="52"
              y1={fitY(52).toFixed(1)}
              x2="404"
              y2={fitY(404).toFixed(1)}
              className="series-2-stroke"
              strokeWidth="1.5"
              strokeDasharray="6 5"
            />
            <polyline
              points={X_POSITIONS.map((x, index) => `${x},${(ys[index] as number).toFixed(1)}`).join(" ")}
              className="series-1-stroke"
              strokeWidth="2.5"
            />
            {X_POSITIONS.map((x, index) => (
              <circle key={x} cx={x} cy={(ys[index] as number).toFixed(1)} r="5" className="series-1-fill" />
            ))}
            <circle
              cx={X_POSITIONS[5]}
              cy={(ys[5] as number).toFixed(1)}
              r="14"
              className="series-ink-stroke"
              strokeWidth="1.5"
            />
            <text
              x={(X_POSITIONS[5] as number) - 46}
              y={((ys[5] as number) - 2).toFixed(1)}
              className="svg-label svg-label-ink"
            >
              dra
            </text>
          </svg>
          <Slider
            label="Avbøying av kalibreringskurven"
            valueText={`Avbøying ${percent} prosent, R² ${r2}`}
            value={percent}
            onChange={(value) => setBend(value / 100)}
            ends={["rett linje", "full metning"]}
          />
        </div>

        <div className={shared.readingCol}>
          <Readout label="Best tilpassede rette linje" value={`R² = ${r2}`} size="small" />
          <div>
            <span className={shared.caption}>Residualer</span>
            <div className={styles.residuals} aria-hidden="true">
              {ys.map((y, index) => {
                const deviation = ((y - (fit.predicted[index] as number)) / maxResidual) * 100;
                return (
                  <div key={index} className={styles.residualColumn}>
                    <div className={styles.residualUp}>
                      <div
                        className={styles.residualBar}
                        style={{ height: `${deviation < 0 ? Math.min(100, -deviation) : 0}%` }}
                      />
                    </div>
                    <div className={styles.residualDown}>
                      <div
                        className={styles.residualBar}
                        style={{ height: `${deviation > 0 ? Math.min(100, deviation) : 0}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <Verdict reserve={4.4}>{verdict}</Verdict>
        </div>
      </div>
    </DemonstrationFrame>
  );
}
