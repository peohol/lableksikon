"use client";

import { useState } from "react";

import { DemonstrationFrame } from "@/components/DemonstrationFrame";
import { Chip, ChipGroup, Readout, Verdict } from "./primitives";
import shared from "./demos.module.css";
import styles from "./ErrorSourceConceptDemos.module.css";

export function GrovfeilDemo() {
  const [cause, setCause] = useState<"unknown" | "documented">("unknown");
  const values = [99.4, 100.2, 99.8, 100.6, 99.7, 100.1, 100.4, 99.9, 100.3, 135];
  const xFor = (value: number) => 55 + ((value - 95) / 45) * 420;

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Behold det samme ekstreme datapunktet, men bytt hva som faktisk er kjent om årsaken."
      label="Et ekstremt resultat er ikke automatisk en dokumentert grov feil"
      afterword="Et avvikende resultat kan gi mistanke om feil, men klassifikasjonen må bygge på undersøkt årsak. Statistisk avvik alene dokumenterer ikke prøveforbytting, feilregistrering eller annen tabbe."
    >
      <div className={shared.stack}>
        <svg viewBox="0 0 520 230" className={shared.svg} aria-hidden="true">
          <line x1="55" y1="165" x2="475" y2="165" className={styles.axis} />
          <rect x={xFor(98)} y="65" width={xFor(102) - xFor(98)} height="105" className={styles.normalBand} />
          {values.map((value, index) => (
            <circle
              key={index}
              cx={xFor(value)}
              cy={118 + (index % 3) * 16}
              r={index === values.length - 1 ? 10 : 7}
              className={index === values.length - 1 ? styles.outlierPoint : styles.normalPoint}
            />
          ))}
        </svg>
        <ChipGroup label="Hva vet vi om det ekstreme resultatet?">
          <Chip variant="choice" pressed={cause === "unknown"} onClick={() => setCause("unknown")}>
            Årsak ukjent
          </Chip>
          <Chip variant="choice" pressed={cause === "documented"} onClick={() => setCause("documented")}>
            Dokumentert prøveforbytting
          </Chip>
        </ChipGroup>
        <div className={shared.row}>
          <Readout label="Ekstremt resultat" value="135" size="small" />
          <Readout label="Resten av serien" value="omtrent 100" size="small" />
        </div>
        <Verdict tone={cause === "documented" ? "warning" : "normal"} reserve={3.2}>
          {cause === "unknown"
            ? "Punktet er en tydelig uteligger i denne serien, men årsaken er ukjent. Det er derfor ikke grunnlag for å kalle hendelsen en dokumentert grov feil."
            : "Her er prøveforbyttingen faktisk dokumentert. Resultatet er dermed knyttet til en konkret grov feil og må håndteres som avvik."}
        </Verdict>
      </div>
    </DemonstrationFrame>
  );
}
