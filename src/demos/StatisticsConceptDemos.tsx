"use client";

import { useState } from "react";

import { DemonstrationFrame } from "@/components/DemonstrationFrame";
import { MathFormula } from "@/components/MathFormula";
import {
  comma,
  fitLine,
  mean,
  median,
  sampleStandardDeviation,
  sampleVariance,
} from "@/lib/statistics";
import { PointRows } from "./PointRows";
import { Chip, ChipGroup, Readout, Slider, Verdict } from "./primitives";
import shared from "./demos.module.css";
import styles from "./StatisticsConceptDemos.module.css";

const texNumber = (value: number, decimals: number) =>
  comma(value, decimals).replace(",", "{,}");

function normalPdf(value: number, meanValue = 0, sd = 1) {
  const z = (value - meanValue) / sd;
  return Math.exp(-0.5 * z * z) / (sd * Math.sqrt(2 * Math.PI));
}

function erfApprox(value: number) {
  const sign = value < 0 ? -1 : 1;
  const x = Math.abs(value);
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;
  const t = 1 / (1 + p * x);
  const y =
    1 -
    (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) *
      t *
      Math.exp(-x * x);
  return sign * y;
}

function normalCdf(value: number) {
  return 0.5 * (1 + erfApprox(value / Math.sqrt(2)));
}

function inverseNormalCdf(probability: number) {
  let low = -5;
  let high = 5;
  for (let index = 0; index < 60; index += 1) {
    const middle = (low + high) / 2;
    if (normalCdf(middle) < probability) low = middle;
    else high = middle;
  }
  return (low + high) / 2;
}

function normalCurvePath(sd: number) {
  return Array.from({ length: 121 }, (_, index) => {
    const value = -6 + index * 0.1;
    const x = 40 + ((value + 6) / 12) * 440;
    const y = 180 - normalPdf(value, 0, sd) * 220;
    return (index === 0 ? "M" : "L") + x.toFixed(1) + " " + y.toFixed(1);
  }).join(" ");
}

function normalAreaPath(sd: number, multiple: number) {
  const start = -multiple * sd;
  const end = multiple * sd;
  const points = Array.from({ length: 81 }, (_, index) => {
    const value = start + (index / 80) * (end - start);
    const x = 40 + ((value + 6) / 12) * 440;
    const y = 180 - normalPdf(value, 0, sd) * 220;
    return "L" + x.toFixed(1) + " " + y.toFixed(1);
  }).join(" ");
  const left = 40 + ((start + 6) / 12) * 440;
  const right = 40 + ((end + 6) / 12) * 440;
  return "M" + left.toFixed(1) + " 180 " + points + " L" + right.toFixed(1) + " 180 Z";
}

function standardNormalCurvePath() {
  return Array.from({ length: 121 }, (_, index) => {
    const value = -4 + index / 15;
    const x = 40 + ((value + 4) / 8) * 440;
    const y = 180 - normalPdf(value) * 300;
    return (index === 0 ? "M" : "L") + x.toFixed(1) + " " + y.toFixed(1);
  }).join(" ");
}

function standardNormalTailPath(critical: number, side: "left" | "right") {
  const start = side === "left" ? -4 : critical;
  const end = side === "left" ? -critical : 4;
  const points = Array.from({ length: 61 }, (_, index) => {
    const value = start + (index / 60) * (end - start);
    const x = 40 + ((value + 4) / 8) * 440;
    const y = 180 - normalPdf(value) * 300;
    return "L" + x.toFixed(1) + " " + y.toFixed(1);
  }).join(" ");
  const left = 40 + ((start + 4) / 8) * 440;
  const right = 40 + ((end + 4) / 8) * 440;
  return "M" + left.toFixed(1) + " 180 " + points + " L" + right.toFixed(1) + " 180 Z";
}

function logGamma(value: number): number {
  const coefficients = [
    676.5203681218851,
    -1259.1392167224028,
    771.3234287776531,
    -176.6150291621406,
    12.507343278686905,
    -0.13857109526572012,
    0.000009984369578019572,
    0.00000015056327351493116,
  ];
  if (value < 0.5) {
    return Math.log(Math.PI) - Math.log(Math.sin(Math.PI * value)) - logGamma(1 - value);
  }
  const z = value - 1;
  let x = 0.9999999999998099;
  coefficients.forEach((coefficient, index) => {
    x += coefficient / (z + index + 1);
  });
  const t = z + coefficients.length - 0.5;
  return (
    0.5 * Math.log(2 * Math.PI) +
    (z + 0.5) * Math.log(t) -
    t +
    Math.log(x)
  );
}

function studentTPdf(value: number, degreesOfFreedom: number) {
  const logCoefficient =
    logGamma((degreesOfFreedom + 1) / 2) -
    logGamma(degreesOfFreedom / 2) -
    0.5 * Math.log(degreesOfFreedom * Math.PI);
  return (
    Math.exp(logCoefficient) *
    (1 + (value * value) / degreesOfFreedom) ** (-(degreesOfFreedom + 1) / 2)
  );
}

function twoSidedTPValue(tValue: number, degreesOfFreedom: number) {
  const upper = Math.min(Math.abs(tValue), 12);
  if (upper === 0) return 1;
  const steps = 400;
  const width = upper / steps;
  let sum = studentTPdf(0, degreesOfFreedom) + studentTPdf(upper, degreesOfFreedom);
  for (let index = 1; index < steps; index += 1) {
    sum += (index % 2 === 0 ? 2 : 4) * studentTPdf(index * width, degreesOfFreedom);
  }
  const integral = (width / 3) * sum;
  return Math.min(1, Math.max(0, 2 * (0.5 - integral)));
}

function pearsonCorrelation(xs: number[], ys: number[]) {
  const meanX = mean(xs);
  const meanY = mean(ys);
  let numerator = 0;
  let sumX = 0;
  let sumY = 0;
  xs.forEach((x, index) => {
    const dx = x - meanX;
    const dy = (ys[index] as number) - meanY;
    numerator += dx * dy;
    sumX += dx * dx;
    sumY += dy * dy;
  });
  return numerator / Math.sqrt(sumX * sumY);
}


export function GjennomsnittDemo() {
  const [movingPoint, setMovingPoint] = useState(12);
  const values = [2, 4, 6, 8, movingPoint];
  const average = mean(values);

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Flytt én observasjon og se balansepunktet følge etter."
      label="Gjennomsnitt som balansepunkt på en tallinje"
      afterword="Alle observasjonene påvirker gjennomsnittet. Hvor langt et punkt flyttes betyr derfor noe, ikke bare rekkefølgen."
    >
      <div className={shared.stack}>
        <PointRows rows={[{ label: "Fem observasjoner", values }]} min={0} max={20} markers={[{ value: average }]} />
        <Readout
          label="Gjennomsnitt"
          value={<MathFormula tex={`\\bar{x} = ${texNumber(average, 1)}`} />}
          size="small"
        />
        <Verdict reserve={2.8}>
          Flytter du det siste punktet mot høyre, flytter gjennomsnittet seg samme vei fordi hele avstanden inngår i beregningen.
        </Verdict>
        <Slider
          label="Plassering av den femte observasjonen"
          valueText={`Femte observasjon ${movingPoint}`}
          value={movingPoint}
          onChange={setMovingPoint}
          min={8}
          max={18}
          ends={["nær de andre", "langt til høyre"]}
        />
      </div>
    </DemonstrationFrame>
  );
}

export function MedianDemo() {
  const [extreme, setExtreme] = useState(14);
  const values = [2, 4, 7, 9, extreme];
  const average = mean(values);
  const middle = median(values);

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Dra ytterpunktet utover og sammenlign median med gjennomsnitt."
      label="Medianen står stille når en ytterverdi flyttes"
      afterword="Medianen bestemmes av rangeringen. Gjennomsnittet bruker derimot avstanden til alle observasjonene."
    >
      <div className={shared.stack}>
        <PointRows
          rows={[{ label: "Sorterte data", values }]}
          min={0}
          max={32}
          markers={[
            { value: average },
            { value: middle, tone: "warning", dashed: true },
          ]}
        />
        <p className={shared.caption}>Heltrukken linje: gjennomsnitt · stiplet linje: median</p>
        <div className={shared.row}>
          <Readout
            label="Gjennomsnitt"
            value={<MathFormula tex={`\\bar{x} = ${texNumber(average, 1)}`} />}
            size="small"
          />
          <Readout
            label="Median"
            value={<MathFormula tex={`\\tilde{x} = ${texNumber(middle, 1)}`} />}
            size="small"
          />
        </div>
        <Verdict reserve={2.8}>
          Medianen blir {comma(middle, 1)} hele veien, mens gjennomsnittet trekkes mot ytterpunktet.
        </Verdict>
        <Slider
          label="Plassering av den største observasjonen"
          valueText={`Største observasjon ${extreme}`}
          value={extreme}
          onChange={setExtreme}
          min={9}
          max={30}
          ends={["rett utenfor midten", "svært langt ute"]}
        />
      </div>
    </DemonstrationFrame>
  );
}

export function VariansDemo() {
  const [movingPoint, setMovingPoint] = useState(12);
  const values = [8, 9, 10, movingPoint];
  const average = mean(values);
  const variance = sampleVariance(values);
  const squares = values.map((value) => (value - average) ** 2);
  const largestSquare = Math.max(...squares, 0.01);

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Flytt ett punkt og se avvikene og de kvadrerte bidragene vokse."
      label="Varians bygget av kvadrerte avvik fra gjennomsnittet"
      afterword="Her vises utvalgsvariansen med \(n-1\) i nevneren. Store avvik får stor vekt fordi de kvadreres."
    >
      <div className={shared.stack}>
        <PointRows rows={[{ label: "Fire observasjoner", values }]} min={7} max={19} markers={[{ value: average }]} />
        <div className={styles.squareBlock}>
          <span className={styles.squareTitle}>Kvadrerte avvik fra gjennomsnittet</span>
          <div className={styles.squareBars} aria-hidden="true">
            {squares.map((square, index) => (
              <div key={index} className={styles.squareRow}>
                <span
                  className={`${styles.squareBar} ${index === values.length - 1 ? styles.squareBarWarning : ""}`}
                  style={{ width: `${Math.max(4, (square / largestSquare) * 100)}%` }}
                />
              </div>
            ))}
          </div>
        </div>
        <div className={shared.row}>
          <Readout
            label="Gjennomsnitt"
            value={<MathFormula tex={`\\bar{x} = ${texNumber(average, 2)}`} />}
            size="small"
          />
          <Readout
            label="Utvalgsvarians"
            value={<MathFormula tex={`s^2 = ${texNumber(variance, 2)}`} />}
            size="small"
          />
        </div>
        <Verdict reserve={2.8}>
          Når ett punkt flyttes langt bort, vokser både avviket og det kvadrerte bidraget uforholdsmessig mye.
        </Verdict>
        <Slider
          label="Plassering av den fjerde observasjonen"
          valueText={`Fjerde observasjon ${movingPoint}, varians ${comma(variance, 2)}`}
          value={movingPoint}
          onChange={setMovingPoint}
          min={10}
          max={18}
          ends={["nær resten", "langt fra resten"]}
        />
      </div>
    </DemonstrationFrame>
  );
}

export function NormalfordelingDemo() {
  const [sd, setSd] = useState(1);
  const x = (value: number) => 40 + ((value + 6) / 12) * 440;

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Endre standardavviket og se fordelingen bli smalere eller bredere."
      label="Normalfordeling med ett, to og tre standardavvik rundt middelverdien"
      afterword="Arealandelene 68,3 %, 95,4 % og 99,7 % gjelder en idealisert normalfordeling. Når standardavviket endres, flyttes grensene, mens andelene innen samme antall standardavvik er de samme."
    >
      <div className={shared.stack}>
        <svg viewBox="0 0 520 210" className={shared.svg} aria-hidden="true">
          <path d={normalAreaPath(sd, 3)} className={styles.normalBand3} />
          <path d={normalAreaPath(sd, 2)} className={styles.normalBand2} />
          <path d={normalAreaPath(sd, 1)} className={styles.normalBand1} />
          <path d={normalCurvePath(sd)} className={styles.distributionCurve} data-normal-curve="true" />
          <line x1="40" y1="180" x2="480" y2="180" className={styles.axis} />
          <line x1={x(0)} y1="38" x2={x(0)} y2="185" className={styles.meanLine} />
          {[1, 2, 3].flatMap((multiple) =>
            [-1, 1].map((sign) => (
              <line
                key={multiple + "-" + sign}
                x1={x(sign * multiple * sd)}
                y1="165"
                x2={x(sign * multiple * sd)}
                y2="188"
                className={styles.sigmaGuide}
              />
            )),
          )}
        </svg>
        <div className={shared.row}>
          <Readout label="Standardavvik" value={<MathFormula tex={"\\sigma = " + texNumber(sd, 1)} />} size="small" />
          <Readout label="Innen ett standardavvik" value={<MathFormula tex="68{,}3\\,\\%" />} size="small" />
          <Readout label="Innen to standardavvik" value={<MathFormula tex="95{,}4\\,\\%" />} size="small" />
          <Readout label="Innen tre standardavvik" value={<MathFormula tex="99{,}7\\,\\%" />} size="small" />
        </div>
        <Slider
          label="Standardavvik i normalfordelingen"
          valueText={"standardavvik " + comma(sd, 1)}
          value={sd}
          onChange={setSd}
          min={0.7}
          max={2}
          step={0.1}
          ends={["smal fordeling", "bred fordeling"]}
        />
      </div>
    </DemonstrationFrame>
  );
}

export function FrihetsgraderDemo() {
  const [firstDeviation, setFirstDeviation] = useState(-1);
  const [secondDeviation, setSecondDeviation] = useState(1.5);
  const average = 10;
  const thirdDeviation = -firstDeviation - secondDeviation;
  const values = [
    average + firstDeviation,
    average + secondDeviation,
    average + thirdDeviation,
  ];
  const deviationText = (value: number) =>
    value === 0
      ? "0"
      : (value > 0 ? "pluss " : "minus ") + comma(Math.abs(value), 1);

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Flytt de to første avvikene. Det tredje må følge etter fordi gjennomsnittet holdes fast."
      label="Tre observasjoner med to frie avvik når gjennomsnittet er estimert"
      afterword="Når gjennomsnittet er beregnet fra de samme tre observasjonene, må avvikene summere til null. Derfor kan bare to av tre avvik velges uavhengig."
    >
      <div className={shared.stack}>
        <PointRows
          rows={[{ label: "Tre observasjoner", values }]}
          min={5}
          max={15}
          markers={[{ value: average }]}
        />
        <div className={shared.row}>
          <Readout label="Første avvik" value={<MathFormula tex={"d_1 = " + texNumber(firstDeviation, 1)} />} size="small" />
          <Readout label="Andre avvik" value={<MathFormula tex={"d_2 = " + texNumber(secondDeviation, 1)} />} size="small" />
          <Readout label="Tredje avvik følger" value={<MathFormula tex={"d_3 = " + texNumber(thirdDeviation, 1)} />} size="small" />
          <Readout label="Sum av avvik" value={<MathFormula tex="d_1+d_2+d_3=0" />} size="small" />
        </div>
        <Verdict reserve={3}>
          Du kan endre de to første avvikene uavhengig. Det tredje blir automatisk {deviationText(thirdDeviation)} for å bevare samme gjennomsnitt.
        </Verdict>
        <Slider
          label="Første frie avvik"
          valueText={deviationText(firstDeviation)}
          value={firstDeviation}
          onChange={setFirstDeviation}
          min={-2}
          max={2}
          step={0.5}
          ends={["negativt avvik", "positivt avvik"]}
        />
        <Slider
          label="Andre frie avvik"
          valueText={deviationText(secondDeviation)}
          value={secondDeviation}
          onChange={setSecondDeviation}
          min={-2}
          max={2}
          step={0.5}
          ends={["negativt avvik", "positivt avvik"]}
        />
      </div>
    </DemonstrationFrame>
  );
}

export function KonfidensintervallDemo() {
  const [sampleSize, setSampleSize] = useState(30);
  const trueValue = 100;
  const populationSd = 6;
  const standardError = populationSd / Math.sqrt(sampleSize);
  const halfWidth = 1.96 * standardError;
  const zOffsets = [
    -1.45, -0.82, 0.31, 1.12, -0.24,
    0.74, -1.08, 0.16, 1.54, -0.63,
    0.92, -1.71, 0.48, 1.28, -0.11,
    0.57, -1.22, 0.05, 2.2, -0.39,
  ];
  const intervals = zOffsets.map((z) => {
    const center = trueValue + z * standardError;
    return {
      center,
      lower: center - halfWidth,
      upper: center + halfWidth,
      containsTruth: Math.abs(z) <= 1.96,
    };
  });
  const covered = intervals.filter((interval) => interval.containsTruth).length;
  const x = (value: number) => 40 + ((value - 92) / 16) * 440;

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Øk utvalgsstørrelsen og se alle intervallene bli smalere rundt sine estimater."
      label="Tjue gjentatte 95-prosentintervaller mot én sann parameterverdi"
      afterword="I denne faste illustrasjonen dekker 19 av 20 intervaller den sanne parameteren. Ett bestemt 95-prosentintervall har ikke 95 % sannsynlighet for å inneholde en fast parameter; 95 % beskriver metodens langsiktige dekning."
    >
      <div className={shared.stack}>
        <svg viewBox="0 0 520 245" className={shared.svg} aria-hidden="true">
          <line x1={x(trueValue)} y1="10" x2={x(trueValue)} y2="232" className={styles.truthLine} />
          {intervals.map((interval, index) => {
            const y = 17 + index * 11;
            return (
              <g key={index}>
                <line
                  x1={x(interval.lower)}
                  y1={y}
                  x2={x(interval.upper)}
                  y2={y}
                  className={interval.containsTruth ? styles.intervalLine : styles.intervalMiss}
                  data-ci-interval={index === 0 ? "first" : undefined}
                />
                <circle
                  cx={x(interval.center)}
                  cy={y}
                  r="3.5"
                  className={interval.containsTruth ? styles.intervalPoint : styles.intervalPointMiss}
                />
              </g>
            );
          })}
        </svg>
        <div className={shared.row}>
          <Readout label="Utvalgsstørrelse" value={<MathFormula tex={"n = " + sampleSize} />} size="small" />
          <Readout label="Halv intervallbredde" value={<MathFormula tex={"1{,}96\\,SE = " + texNumber(halfWidth, 2)} />} size="small" />
          <Readout label="Dekker sann verdi i illustrasjonen" value={<MathFormula tex={covered + "/20 = 95\\,\\%"} />} size="small" />
        </div>
        <Verdict reserve={3}>
          Når utvalgsstørrelsen øker, faller standardfeilen og intervallene blir smalere. Det ene intervallet som bommer, viser at korrekt metode ikke betyr at hvert enkelt intervall treffer.
        </Verdict>
        <Slider
          label="Utvalgsstørrelse for konfidensintervallene"
          valueText={"n " + sampleSize + "; halv intervallbredde " + comma(halfWidth, 2)}
          value={sampleSize}
          onChange={setSampleSize}
          min={10}
          max={100}
          step={10}
          ends={["mindre utvalg", "større utvalg"]}
        />
      </div>
    </DemonstrationFrame>
  );
}

export function SignifikansnivaDemo() {
  const [alpha, setAlpha] = useState(0.05);
  const critical = inverseNormalCdf(1 - alpha / 2);
  const x = (value: number) => 40 + ((value + 4) / 8) * 440;

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Endre signifikansnivået og se forkastningsområdene i begge haler vokse eller krympe."
      label="Tosidig signifikansnivå som markerte haler under en nullfordeling"
      afterword="Signifikansnivået er en på forhånd valgt langsiktig type-I-feilrate for testprosedyren når nullhypotesen er sann og modellforutsetningene holder. Det er ikke sannsynligheten for at nullhypotesen er sann."
    >
      <div className={shared.stack}>
        <svg viewBox="0 0 520 210" className={shared.svg} aria-hidden="true">
          <path d={standardNormalTailPath(critical, "left")} className={styles.rejectionArea} />
          <path d={standardNormalTailPath(critical, "right")} className={styles.rejectionArea} />
          <path d={standardNormalCurvePath()} className={styles.distributionCurve} />
          <line x1="40" y1="180" x2="480" y2="180" className={styles.axis} />
          <line x1={x(-critical)} y1="48" x2={x(-critical)} y2="185" className={styles.criticalLine} />
          <line x1={x(critical)} y1="48" x2={x(critical)} y2="185" className={styles.criticalLine} />
        </svg>
        <div className={shared.row}>
          <Readout label="Signifikansnivå" value={<MathFormula tex={"\\alpha = " + texNumber(alpha, 2)} />} size="small" />
          <Readout label="Hver hale" value={<MathFormula tex={"\\alpha/2 = " + texNumber(alpha / 2, 3)} />} size="small" />
          <Readout label="Kritiske z-grenser" value={<MathFormula tex={"z = \\pm " + texNumber(critical, 2)} />} size="small" />
        </div>
        <Verdict reserve={3}>
          Høyere signifikansnivå gjør de kritiske grensene mindre ekstreme og forkastningsområdene større.
        </Verdict>
        <Slider
          label="Signifikansnivå alfa"
          valueText={"alfa " + comma(alpha, 2) + "; kritisk z pluss/minus " + comma(critical, 2)}
          value={alpha}
          onChange={setAlpha}
          min={0.01}
          max={0.1}
          step={0.01}
          ends={["strengere grense", "større forkastningsområde"]}
        />
      </div>
    </DemonstrationFrame>
  );
}

export function TTestDemo() {
  const [difference, setDifference] = useState(1);
  const offsets = [-1.3, -0.6, -0.2, 0.3, 0.7, 1.1];
  const groupA = offsets.map((offset) => 10 + offset);
  const groupB = offsets.map((offset) => 10 + difference + offset);
  const meanA = mean(groupA);
  const meanB = mean(groupB);
  const varianceA = sampleVariance(groupA);
  const varianceB = sampleVariance(groupB);
  const nA = groupA.length;
  const nB = groupB.length;
  const componentA = varianceA / nA;
  const componentB = varianceB / nB;
  const standardError = Math.sqrt(componentA + componentB);
  const tValue = (meanB - meanA) / standardError;
  const degreesOfFreedom =
    (componentA + componentB) ** 2 /
    (componentA ** 2 / (nA - 1) + componentB ** 2 / (nB - 1));
  const pValue = twoSidedTPValue(tValue, degreesOfFreedom);
  const pTex =
    pValue < 0.001
      ? "p < 0{,}001"
      : "p = " + texNumber(pValue, 3);

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Flytt gruppemiddel B mens spredningen i begge grupper holdes uendret."
      label="To grupper der t-verdien vokser når middelverdiene skilles"
      afterword="Illustrasjonen bruker en tosidig Welch t-test. P-verdien er sannsynligheten, under nullhypotesen og modellforutsetningene, for et minst like ekstremt testresultat; den er ikke sannsynligheten for at nullhypotesen er sann."
    >
      <div className={shared.stack}>
        <PointRows
          rows={[
            { label: "Gruppe A", values: groupA },
            { label: "Gruppe B", values: groupB },
          ]}
          min={8}
          max={15}
          markers={[
            { value: meanA },
            { value: meanB, tone: "warning", dashed: true },
          ]}
        />
        <p className={shared.caption}>Heltrukken linje: middelverdi A · stiplet linje: middelverdi B</p>
        <div className={shared.row}>
          <Readout label="Forskjell i middelverdi" value={<MathFormula tex={"\\Delta\\bar{x} = " + texNumber(meanB - meanA, 2)} />} size="small" />
          <Readout label="t-verdi" value={<MathFormula tex={"t = " + texNumber(tValue, 2)} />} size="small" />
          <Readout label="Tosidig p-verdi" value={<MathFormula tex={pTex} />} size="small" />
        </div>
        <Verdict reserve={3}>
          Når forskjellen mellom gruppene øker uten at spredningen øker, blir teststatistikken større i absoluttverdi og p-verdien mindre.
        </Verdict>
        <Slider
          label="Forskjell mellom gruppemidlene"
          valueText={"forskjell " + comma(difference, 1) + "; t " + comma(tValue, 2) + "; p " + comma(pValue, 3)}
          value={difference}
          onChange={setDifference}
          min={0}
          max={3}
          step={0.1}
          ends={["samme middelverdi", "tydelig atskilte middelverdier"]}
        />
      </div>
    </DemonstrationFrame>
  );
}

export function FTestDemo() {
  const [spreadB, setSpreadB] = useState(1.4);
  const offsets = [-1.2, -0.5, 0, 0.5, 1.2];
  const groupA = offsets.map((offset) => 10 + offset);
  const groupB = offsets.map((offset) => 10 + offset * spreadB);
  const varianceA = sampleVariance(groupA);
  const varianceB = sampleVariance(groupB);
  const fValue = varianceB / varianceA;

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Endre spredningen i gruppe B mens middelverdien holdes den samme."
      label="F-statistikk som et synlig forhold mellom to utvalgsvarianser"
      afterword="Her er gruppe B lagt i telleren og gruppe A i nevneren. Om et observert F-forhold er uvanlig under en nullhypotese om like varianser, avhenger også av frihetsgrader, testretning og valgt signifikansnivå."
    >
      <div className={shared.stack}>
        <PointRows
          rows={[
            { label: "Gruppe A", values: groupA },
            { label: "Gruppe B", values: groupB },
          ]}
          min={6.5}
          max={13.5}
          markers={[{ value: 10 }]}
        />
        <div className={shared.row}>
          <Readout label="Varians A" value={<MathFormula tex={"s_A^2 = " + texNumber(varianceA, 2)} />} size="small" />
          <Readout label="Varians B" value={<MathFormula tex={"s_B^2 = " + texNumber(varianceB, 2)} />} size="small" />
          <Readout label="Variansforhold" value={<MathFormula tex={"F = \\frac{s_B^2}{s_A^2} = " + texNumber(fValue, 2)} />} size="small" />
        </div>
        <Verdict reserve={3}>
          Når spredningen i B er lik A, ligger F nær 1. Når B blir bredere eller smalere, flytter variansforholdet seg bort fra 1.
        </Verdict>
        <Slider
          label="Relativ spredning i gruppe B"
          valueText={"spredningsfaktor " + comma(spreadB, 1) + "; F " + comma(fValue, 2)}
          value={spreadB}
          onChange={setSpreadB}
          min={0.5}
          max={2.5}
          step={0.1}
          ends={["smalere enn A", "bredere enn A"]}
        />
      </div>
    </DemonstrationFrame>
  );
}

export function RegresjonDemo() {
  const [movingY, setMovingY] = useState(6.2);
  const values = [1.2, 2.1, 3.2, 4, 5.1, movingY];
  const fit = fitLine(values);
  const x = (index: number) => 55 + index * 80;
  const y = (value: number) => 190 - (value / 10) * 155;

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Flytt det siste datapunktet og se både regresjonslinjen og residualene endres."
      label="Lineær regresjon med synlige residualer fra punktene til den tilpassede linjen"
      afterword="Regresjonslinjen er minste-kvadraters tilpasning av respons mot punktindeks i dette eksemplet. En høy R-kvadratverdi alene dokumenterer ikke at modellen er riktig; residualmønster og modellforutsetninger må også vurderes."
    >
      <div className={shared.stack}>
        <svg viewBox="0 0 520 220" className={shared.svg} aria-hidden="true">
          <line x1="55" y1="190" x2="475" y2="190" className={styles.axis} />
          <line x1="55" y1="190" x2="55" y2="30" className={styles.axis} />
          {values.map((value, index) => (
            <line
              key={"r-" + index}
              x1={x(index)}
              y1={y(value)}
              x2={x(index)}
              y2={y(fit.predicted[index] as number)}
              className={styles.residualLine}
            />
          ))}
          <line
            x1={x(0)}
            y1={y(fit.predicted[0] as number)}
            x2={x(5)}
            y2={y(fit.predicted[5] as number)}
            className={styles.regressionLine}
          />
          {values.map((value, index) => (
            <circle
              key={"p-" + index}
              cx={x(index)}
              cy={y(value)}
              r="6"
              className={index === values.length - 1 ? styles.scatterPointWarning : styles.scatterPoint}
            />
          ))}
        </svg>
        <div className={shared.row}>
          <Readout label="Stigningstall" value={<MathFormula tex={"b_1 = " + texNumber(fit.slope, 2)} />} size="small" />
          <Readout label="Forklaringsgrad" value={<MathFormula tex={"R^2 = " + texNumber(fit.r2, 3)} />} size="small" />
        </div>
        <Verdict reserve={3}>
          Residualene er de vertikale avstandene fra hvert punkt til linjen. Når ett punkt flyttes, endres både linjen og residualmønsteret.
        </Verdict>
        <Slider
          label="Høyde på det siste regresjonspunktet"
          valueText={"siste respons " + comma(movingY, 1) + "; stigningstall " + comma(fit.slope, 2)}
          value={movingY}
          onChange={setMovingY}
          min={3}
          max={9}
          step={0.2}
          ends={["trekker linjen ned", "trekker linjen opp"]}
        />
      </div>
    </DemonstrationFrame>
  );
}

export function MinsteKvadraterDemo() {
  const [candidateSlope, setCandidateSlope] = useState(0.7);
  const values = [1.1, 2.2, 2.7, 4.1, 5, 6.2];
  const optimal = fitLine(values);
  const meanX = (values.length - 1) / 2;
  const meanY = mean(values);
  const candidateIntercept = meanY - candidateSlope * meanX;
  const candidatePredicted = values.map((_, index) => candidateIntercept + candidateSlope * index);
  const candidateSse = values.reduce(
    (sum, value, index) => sum + (value - (candidatePredicted[index] as number)) ** 2,
    0,
  );
  const optimalSse = values.reduce(
    (sum, value, index) => sum + (value - (optimal.predicted[index] as number)) ** 2,
    0,
  );
  const nearMinimum = Math.abs(candidateSlope - optimal.slope) <= 0.06;
  const x = (index: number) => 55 + index * 80;
  const y = (value: number) => 190 - (value / 7.5) * 155;

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Endre stigningstallet på kandidatlinjen og se residualene og summen av residualkvadratene endres."
      label="Minste kvadrater som søk etter linjen med lavest samlet residualkvadrat"
      afterword="Kandidatlinjen holdes gjennom datasettets tyngdepunkt mens stigningstallet endres. For lineær regresjon med konstantledd ligger minste SSE ved OLS-løsningen."
    >
      <div className={shared.stack}>
        <svg viewBox="0 0 520 220" className={shared.svg} aria-hidden="true">
          <line x1="55" y1="190" x2="475" y2="190" className={styles.axis} />
          <line x1="55" y1="190" x2="55" y2="30" className={styles.axis} />
          {values.map((value, index) => (
            <line
              key={"ls-r-" + index}
              x1={x(index)}
              y1={y(value)}
              x2={x(index)}
              y2={y(candidatePredicted[index] as number)}
              className={styles.residualLine}
            />
          ))}
          <line
            x1={x(0)}
            y1={y(optimal.predicted[0] as number)}
            x2={x(5)}
            y2={y(optimal.predicted[5] as number)}
            className={styles.optimalLine}
          />
          <line
            x1={x(0)}
            y1={y(candidatePredicted[0] as number)}
            x2={x(5)}
            y2={y(candidatePredicted[5] as number)}
            className={styles.candidateLine}
          />
          {values.map((value, index) => (
            <circle key={index} cx={x(index)} cy={y(value)} r="6" className={styles.scatterPoint} />
          ))}
        </svg>
        <p className={shared.caption}>Heltrukken linje: kandidaten du styrer · stiplet linje: OLS-minimum</p>
        <div className={shared.row}>
          <Readout label="Kandidatens stigningstall" value={<MathFormula tex={"b_1 = " + texNumber(candidateSlope, 2)} />} size="small" />
          <Readout label="Residualkvadratsum" value={<MathFormula tex={"SSE = " + texNumber(candidateSse, 2)} />} size="small" />
          <Readout label="Minste SSE" value={<MathFormula tex={"SSE_{\\min} = " + texNumber(optimalSse, 2)} />} size="small" />
        </div>
        <Verdict reserve={3}>
          {nearMinimum
            ? "Kandidatlinjen ligger nå nær minste-kvadraters løsning, og SSE er nær minimum."
            : "Flytt stigningstallet mot den stiplede linjen. Residualene krymper samlet og SSE faller mot minimum."}
        </Verdict>
        <Slider
          label="Stigningstall for kandidatlinjen"
          valueText={"stigningstall " + comma(candidateSlope, 2) + "; SSE " + comma(candidateSse, 2)}
          value={candidateSlope}
          onChange={setCandidateSlope}
          min={0.4}
          max={1.6}
          step={0.05}
          ends={["for flat linje", "for bratt linje"]}
        />
      </div>
    </DemonstrationFrame>
  );
}

export function KorrelasjonDemo() {
  const [pattern, setPattern] = useState<"positive" | "u" | "negative">("positive");
  const xs = [0, 1, 2, 3, 4, 5];
  const series = {
    positive: [1, 1.8, 2.9, 3.7, 5.1, 5.8],
    u: [6, 3, 1, 1, 3, 6],
    negative: [6, 5.1, 4.2, 3.1, 2, 1],
  };
  const ys = series[pattern];
  const correlation = pearsonCorrelation(xs, ys);
  const x = (value: number) => 55 + value * 80;
  const y = (value: number) => 190 - (value / 7) * 150;

  const verdict =
    pattern === "u"
      ? "Her er sammenhengen tydelig U-formet, men den lineære korrelasjonen er omtrent null. Pearsons r kan derfor ikke brukes som generell test for «ingen sammenheng»."
      : pattern === "positive"
        ? "Punktene følger en tydelig stigende lineær retning, og Pearsons r ligger nær +1."
        : "Punktene følger en tydelig fallende lineær retning, og Pearsons r ligger nær −1.";

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Bytt mellom tre mønstre og sammenlign punktskyen med Pearsons korrelasjonskoeffisient."
      label="Korrelasjon viser lineær samvariasjon, ikke all mulig sammenheng"
      afterword="Pearsons r beskriver retning og styrke på lineær samvariasjon. En verdi nær null kan derfor forekomme selv når to variabler har en sterk, men ikke-lineær relasjon."
    >
      <div className={shared.stack}>
        <svg viewBox="0 0 520 220" className={shared.svg} aria-hidden="true">
          <line x1="55" y1="190" x2="475" y2="190" className={styles.axis} />
          <line x1="55" y1="190" x2="55" y2="30" className={styles.axis} />
          {xs.map((value, index) => (
            <circle
              key={value}
              cx={x(value)}
              cy={y(ys[index] as number)}
              r="7"
              className={styles.correlationPoint}
            />
          ))}
        </svg>
        <ChipGroup label="Mønster i punktskyen">
          <Chip variant="choice" pressed={pattern === "positive"} onClick={() => setPattern("positive")}>Positiv lineær</Chip>
          <Chip variant="choice" pressed={pattern === "u"} onClick={() => setPattern("u")}>U-formet</Chip>
          <Chip variant="choice" pressed={pattern === "negative"} onClick={() => setPattern("negative")}>Negativ lineær</Chip>
        </ChipGroup>
        <Readout
          label="Pearsons korrelasjonskoeffisient"
          value={<MathFormula tex={"r = " + texNumber(correlation, 3)} />}
          size="small"
        />
        <Verdict reserve={3.2}>{verdict}</Verdict>
      </div>
    </DemonstrationFrame>
  );
}

export function UteliggerDemo() {
  const [movingPoint, setMovingPoint] = useState(13);
  const values = [9, 9.5, 10, 10.5, movingPoint];
  const average = mean(values);
  const middle = median(values);
  const sd = sampleStandardDeviation(values);
  const isFar = movingPoint >= 18;

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Flytt ett punkt bort fra resten og se hvilke sammendrag som følger etter."
      label="Mulig uteligger og påvirkning på statistiske sammendrag"
      afterword="Et avvikende punkt er ikke automatisk en feil. Demonstrasjonen viser påvirkning, ikke en regel for sletting."
    >
      <div className={shared.stack}>
        <PointRows
          rows={[{
            label: "Fem observasjoner",
            values,
            tones: values.map((_, index) => index === values.length - 1 && isFar ? "warning" : "accent"),
          }]}
          min={8}
          max={32}
          markers={[
            { value: average },
            { value: middle, tone: "warning", dashed: true },
          ]}
        />
        <p className={shared.caption}>Heltrukken linje: gjennomsnitt · stiplet linje: median</p>
        <div className={shared.row}>
          <Readout
            label="Gjennomsnitt"
            value={<MathFormula tex={`\\bar{x} = ${texNumber(average, 1)}`} />}
            size="small"
          />
          <Readout
            label="Median"
            value={<MathFormula tex={`\\tilde{x} = ${texNumber(middle, 1)}`} />}
            size="small"
          />
          <Readout
            label="Standardavvik"
            value={<MathFormula tex={`s = ${texNumber(sd, 1)}`} />}
            size="small"
          />
        </div>
        <Verdict tone={isFar ? "warning" : "normal"} reserve={3}>
          {isFar
            ? "Punktet ligger nå markert langt fra resten. Gjennomsnitt og standardavvik trekkes kraftig, mens medianen endres lite."
            : "Punktet ligger fortsatt forholdsvis nær resten. Flytt det videre og se påvirkningen øke."}
        </Verdict>
        <Slider
          label="Plassering av den mulige uteliggeren"
          valueText={`Siste observasjon ${movingPoint}`}
          value={movingPoint}
          onChange={setMovingPoint}
          min={11}
          max={30}
          ends={["nær datasettet", "langt fra datasettet"]}
        />
      </div>
    </DemonstrationFrame>
  );
}
