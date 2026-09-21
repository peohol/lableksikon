"use client";

import { useState } from "react";

import { DemonstrationFrame } from "@/components/DemonstrationFrame";
import { MathFormula } from "@/components/MathFormula";
import { comma, relativeStandardDeviation, sampleStandardDeviation } from "@/lib/statistics";
import { PointRows } from "./PointRows";
import { Chip, ChipGroup, Readout, Slider, Verdict } from "./primitives";
import shared from "./demos.module.css";
import styles from "./CalibrationConceptDemos.module.css";

const texNumber = (value: number, decimals: number) =>
  comma(value, decimals).replace(",", "{,}");

function weightedLineFit(xs: number[], ys: number[], weights: number[]) {
  const weightSum = weights.reduce((sum, weight) => sum + weight, 0);
  const meanX = xs.reduce((sum, value, index) => sum + value * (weights[index] as number), 0) / weightSum;
  const meanY = ys.reduce((sum, value, index) => sum + value * (weights[index] as number), 0) / weightSum;
  let numerator = 0;
  let denominator = 0;
  xs.forEach((value, index) => {
    const weight = weights[index] as number;
    numerator += weight * (value - meanX) * ((ys[index] as number) - meanY);
    denominator += weight * (value - meanX) ** 2;
  });
  const slope = numerator / denominator;
  const intercept = meanY - slope * meanX;
  return {
    slope,
    intercept,
    predicted: xs.map((value) => intercept + slope * value),
  };
}

function ValueRows({ rows }: { rows: Array<{ label: string; values: string }> }) {
  return (
    <div className={styles.valueRows}>
      {rows.map((row) => (
        <div key={row.label} className={styles.valueRow}>
          <span className={styles.rowLabel}>{row.label}</span>
          <span className={styles.rowValues}>{row.values}</span>
        </div>
      ))}
    </div>
  );
}

function Flow({ items }: { items: string[] }) {
  return (
    <ol className={styles.flow}>
      {items.map((item, index) => (
        <li key={item} className={styles.flowItem}>
          <span className={styles.flowNumber}>{index + 1}</span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  );
}

export function KalibreringskurveDemo() {
  const [unknownResponse, setUnknownResponse] = useState(120);
  const intercept = 20;
  const slope = 1.6;
  const calibratorLevels = [10, 30, 50, 70, 90];
  const estimatedLevel = (unknownResponse - intercept) / slope;
  const x = (value: number) => 55 + (value / 100) * 420;
  const y = (value: number) => 200 - (value / 200) * 165;

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Endre responsen til den ukjente prøven og følg projeksjonen via kalibreringslinjen til et estimert analyttnivå."
      label="Kalibreringskurven brukt til å omsette ukjent respons til analyttnivå"
      afterword="Eksemplet bruker en lineær relasjon innen kalibratorområdet. En ukjent prøve bør ikke uten videre ekstrapoleres utenfor området der kalibreringsmodellen er dokumentert."
    >
      <div className={shared.stack}>
        <svg viewBox="0 0 520 230" className={shared.svg} aria-hidden="true">
          <line x1="55" y1="200" x2="475" y2="200" className={styles.axis} />
          <line x1="55" y1="200" x2="55" y2="28" className={styles.axis} />
          <line x1={x(0)} y1={y(intercept)} x2={x(100)} y2={y(intercept + slope * 100)} className={styles.lineAccent} />
          {calibratorLevels.map((level) => {
            const response = intercept + slope * level;
            return <circle key={level} cx={x(level)} cy={y(response)} r="6" className={styles.point} />;
          })}
          <line x1="55" y1={y(unknownResponse)} x2={x(estimatedLevel)} y2={y(unknownResponse)} className={styles.guideLine} />
          <line x1={x(estimatedLevel)} y1={y(unknownResponse)} x2={x(estimatedLevel)} y2="200" className={styles.guideLine} />
          <circle cx={x(estimatedLevel)} cy={y(unknownResponse)} r="7" className={styles.pointWarning} />
        </svg>
        <div className={shared.row}>
          <Readout label="Kalibreringsmodell" value={<MathFormula tex="y = 20 + 1{,}6x" />} size="small" />
          <Readout label="Ukjent respons" value={<MathFormula tex={"y = " + texNumber(unknownResponse, 0)} />} size="small" />
          <Readout label="Estimert analyttnivå" value={<MathFormula tex={"\\hat{x} = " + texNumber(estimatedLevel, 1)} />} size="small" />
        </div>
        <Verdict reserve={3}>
          Den horisontale hjelpelinjen finner kalibreringslinjen; den vertikale projeksjonen viser hvilket analyttnivå som svarer til prøvens respons.
        </Verdict>
        <Slider
          label="Respons for ukjent prøve"
          valueText={"respons " + comma(unknownResponse, 0) + "; estimert analyttnivå " + comma(estimatedLevel, 1)}
          value={unknownResponse}
          onChange={setUnknownResponse}
          min={40}
          max={160}
          step={2}
          ends={["lav respons", "høy respons"]}
        />
      </div>
    </DemonstrationFrame>
  );
}

export function KvantifiseringsgrenseDemo() {
  const [concentration, setConcentration] = useState(8);
  const rawOffsets = [-1.4, -1, -0.6, -0.2, 0.2, 0.6, 1, 1.4];
  const offsetSd = sampleStandardDeviation(rawOffsets);
  const offsets = rawOffsets.map((value) => value / offsetSd);
  const targetCv = 40 / Math.sqrt(concentration);
  const replicates = offsets.map(
    (offset) => concentration * (1 + (offset * targetCv) / 100),
  );
  const cv = relativeStandardDeviation(replicates);
  const relativeReplicates = replicates.map((value) => (value / concentration) * 100);
  const precisionCriterion = 10;
  const meetsCriterion = cv <= precisionCriterion;
  const illustrativeLoq = 16;

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Øk konsentrasjonen og se den relative spredningen mellom replikatene krympe."
      label="Kvantifiseringsgrense bestemt av et eksplisitt presisjonskrav"
      afterword="Her brukes et illustrativt krav om CV høyst 10 %, slik at modellen får LOQ ved nivå 16. I en virkelig metode må ytelseskravet, datagrunnlaget og hvordan LOQ fastsettes være faglig begrunnet."
    >
      <div className={shared.stack}>
        <PointRows
          rows={[{ label: "Replikater som prosent av valgt nivå", values: relativeReplicates }]}
          min={50}
          max={150}
          markers={[{ value: 100 }]}
        />
        <div className={shared.row}>
          <Readout label="Valgt nivå" value={<MathFormula tex={"c = " + texNumber(concentration, 0)} />} size="small" />
          <Readout
            label="Relativt standardavvik"
            value={<MathFormula tex={"CV = " + texNumber(cv, 1) + "\\,\\%"} />}
            size="small"
            tone={meetsCriterion ? "normal" : "warning"}
          />
          <Readout label="Illustrert krav" value={<MathFormula tex="CV \\le 10\\,\\%" />} size="small" />
          <Readout label="Illustrert LOQ" value={<MathFormula tex={"c = " + illustrativeLoq} />} size="small" />
        </div>
        <Verdict tone={meetsCriterion ? "normal" : "warning"} reserve={3}>
          {meetsCriterion
            ? "Ved dette nivået er det valgte presisjonskravet oppfylt i illustrasjonen."
            : "Ved dette nivået er den relative spredningen fortsatt for stor til å oppfylle det valgte kvantifiseringskravet."}
        </Verdict>
        <Slider
          label="Konsentrasjon i LOQ-illustrasjonen"
          valueText={"konsentrasjon " + comma(concentration, 0) + "; CV " + comma(cv, 1) + " prosent"}
          value={concentration}
          onChange={setConcentration}
          min={4}
          max={30}
          step={1}
          ends={["lavt nivå", "høyere nivå"]}
        />
      </div>
    </DemonstrationFrame>
  );
}

export function ResponsfaktorDemo() {
  const [amount, setAmount] = useState(10);
  const factorA = 50;
  const factorB = 30;
  const responseA = factorA * amount;
  const responseB = factorB * amount;
  const x = (value: number) => 55 + (value / 20) * 420;
  const y = (value: number) => 195 - (value / 1100) * 155;

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Endre analyttmengden og sammenlign signalet fra to forbindelser med ulik responsfaktor."
      label="To responslinjer viser ulikt signal per analyttmengde"
      afterword="Responsfaktorene i eksemplet er konstante og lineære. I et virkelig målesystem er responsfaktoren knyttet til analytt, instrument, metode og betingelser."
    >
      <div className={shared.stack}>
        <svg viewBox="0 0 520 225" className={shared.svg} aria-hidden="true">
          <line x1="55" y1="195" x2="475" y2="195" className={styles.axis} />
          <line x1="55" y1="195" x2="55" y2="30" className={styles.axis} />
          <line x1={x(0)} y1={y(0)} x2={x(20)} y2={y(factorA * 20)} className={styles.lineAccent} />
          <line x1={x(0)} y1={y(0)} x2={x(20)} y2={y(factorB * 20)} className={styles.lineWarningDashed} />
          <line x1={x(amount)} y1="195" x2={x(amount)} y2={y(responseA)} className={styles.guideLine} />
          <circle cx={x(amount)} cy={y(responseA)} r="7" className={styles.point} />
          <circle cx={x(amount)} cy={y(responseB)} r="7" className={styles.pointWarningOutline} />
        </svg>
        <p className={shared.caption}>Heltrukken linje: analytt A · stiplet linje: analytt B</p>
        <div className={shared.row}>
          <Readout label="Respons A" value={<MathFormula tex={"y_A = " + texNumber(responseA, 0)} />} size="small" />
          <Readout label="Respons B" value={<MathFormula tex={"y_B = " + texNumber(responseB, 0)} />} size="small" />
          <Readout label="Responsfaktor A" value={<MathFormula tex="RF_A = y_A/x = 50" />} size="small" />
          <Readout label="Responsfaktor B" value={<MathFormula tex="RF_B = y_B/x = 30" />} size="small" />
        </div>
        <Verdict reserve={3}>
          Samme analyttmengde gir høyere signal for A. Forholdet mellom responsfaktorene er 1,67 i hele den lineære illustrasjonen.
        </Verdict>
        <Slider
          label="Analyttmengde for responsfaktor"
          valueText={"analyttmengde " + comma(amount, 0) + "; respons A " + comma(responseA, 0) + "; respons B " + comma(responseB, 0)}
          value={amount}
          onChange={setAmount}
          min={2}
          max={20}
          step={1}
          ends={["lav mengde", "høy mengde"]}
        />
      </div>
    </DemonstrationFrame>
  );
}

export function ArbeidsomradeDemo() {
  const [level, setLevel] = useState(60);
  const lower = 20;
  const upper = 100;
  const cv = 8 + Math.max(0, lower - level) * 0.2;
  const absoluteBias = 3 + Math.max(0, level - upper) * 0.2;
  const withinRange = level >= lower && level <= upper;
  const x = (value: number) => 45 + (value / 120) * 430;

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Flytt analyttnivået og se om de illustrerte ytelseskravene er oppfylt akkurat der."
      label="Arbeidsområdet som området der flere ytelseskrav er oppfylt samtidig"
      afterword="Grensene og kravene er illustrative. Et virkelig arbeidsområde må dokumenteres ut fra metodens relevante ytelsesegenskaper gjennom området; linearitet alene er ikke nok."
    >
      <div className={shared.stack}>
        <svg viewBox="0 0 520 150" className={shared.svg} aria-hidden="true">
          <line x1="45" y1="85" x2="475" y2="85" className={styles.axis} />
          <rect x={x(lower)} y="66" width={x(upper) - x(lower)} height="38" rx="6" className={styles.rangeBand} />
          <line x1={x(lower)} y1="55" x2={x(lower)} y2="115" className={styles.rangeBoundary} />
          <line x1={x(upper)} y1="55" x2={x(upper)} y2="115" className={styles.rangeBoundary} />
          <line x1={x(level)} y1="42" x2={x(level)} y2="122" className={withinRange ? styles.levelPointer : styles.levelPointerWarning} />
          <circle cx={x(level)} cy="85" r="7" className={withinRange ? styles.point : styles.pointWarning} />
        </svg>
        <div className={shared.row}>
          <Readout label="Illustrert LLOQ" value={<MathFormula tex={String(lower)} />} size="small" />
          <Readout label="Illustrert ULOQ" value={<MathFormula tex={String(upper)} />} size="small" />
          <Readout label="Presisjon ved valgt nivå" value={<MathFormula tex={"CV = " + texNumber(cv, 1) + "\\,\\%"} />} size="small" tone={level < lower ? "warning" : "normal"} />
          <Readout label="Absolutt skjevhet ved valgt nivå" value={<MathFormula tex={"|bias| = " + texNumber(absoluteBias, 1) + "\\,\\%"} />} size="small" tone={level > upper ? "warning" : "normal"} />
        </div>
        <Verdict tone={withinRange ? "normal" : "warning"} reserve={3}>
          {withinRange
            ? "Det valgte nivået ligger i det illustrerte arbeidsområdet, der begge ytelseskravene er oppfylt."
            : level < lower
              ? "Nivået ligger under det illustrerte arbeidsområdet; presisjonskravet er ikke lenger oppfylt."
              : "Nivået ligger over det illustrerte arbeidsområdet; kravet til skjevhet er ikke lenger oppfylt."}
        </Verdict>
        <Slider
          label="Analyttnivå i arbeidsområdet"
          valueText={"nivå " + comma(level, 0) + "; " + (withinRange ? "innenfor arbeidsområdet" : "utenfor arbeidsområdet")}
          value={level}
          onChange={setLevel}
          min={0}
          max={120}
          step={5}
          ends={["lavt nivå", "høyt nivå"]}
        />
      </div>
    </DemonstrationFrame>
  );
}

export function EttpunktskalibreringDemo() {
  return (
    <DemonstrationFrame
      kind="sammenligning"
      instruction="Sammenlign hva ett kalibreringspunkt kan fastsette med hva en flerpunktserie kan undersøke."
      label="Ettpunktskalibrering mot flerpunktkalibrering"
      afterword="Ett punkt kan være tilstrekkelig når kalibreringsfunksjonens form og stabilitet er dokumentert på annen måte; det betyr ikke automatisk at linjen skal tvinges gjennom null."
    >
      <ValueRows
        rows={[
          { label: "Ett punkt", values: "forankrer responsen ved ett kjent nivå" },
          { label: "Flere punkter", values: "viser også modellatferd og avvik gjennom området" },
        ]}
      />
    </DemonstrationFrame>
  );
}

export function VektetRegresjonDemo() {
  const [weighting, setWeighting] = useState<"none" | "1/x" | "1/x2">("none");
  const xs = [1, 2, 4, 8, 12, 16];
  const ys = [11, 20, 42, 78, 132, 185];
  const weights = xs.map((value) =>
    weighting === "none" ? 1 : weighting === "1/x" ? 1 / value : 1 / (value * value),
  );
  const fit = weightedLineFit(xs, ys, weights);
  const residuals = ys.map((value, index) => value - (fit.predicted[index] as number));
  const x = (value: number) => 55 + (value / 16) * 410;
  const y = (value: number) => 200 - (value / 200) * 165;
  const weightingTex = weighting === "none" ? "1" : weighting === "1/x" ? "1/x" : "1/x^2";

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Bytt vekting og se hvordan linjen flyttes når lave nivåer får større statistisk vekt."
      label="Heteroskedastiske kalibreringsdata med uvektet, 1/x og 1/x²-tilpasning"
      afterword="Vekting bør velges ut fra variansstrukturen og dokumenteres, ikke etter hvilken linje som ser penest ut. Eksemplet viser mekanismen, ikke en universell anbefaling om én vektingsfunksjon."
    >
      <div className={shared.stack}>
        <svg viewBox="0 0 520 230" className={shared.svg} aria-hidden="true">
          <line x1="55" y1="200" x2="475" y2="200" className={styles.axis} />
          <line x1="55" y1="200" x2="55" y2="28" className={styles.axis} />
          {xs.map((value, index) => (
            <line
              key={"wr-" + value}
              x1={x(value)}
              y1={y(ys[index] as number)}
              x2={x(value)}
              y2={y(fit.predicted[index] as number)}
              className={styles.residualLine}
            />
          ))}
          <line
            x1={x(0)}
            y1={y(fit.intercept)}
            x2={x(16)}
            y2={y(fit.intercept + fit.slope * 16)}
            className={styles.lineAccent}
          />
          {xs.map((value, index) => (
            <circle key={value} cx={x(value)} cy={y(ys[index] as number)} r="6" className={styles.point} />
          ))}
        </svg>
        <ChipGroup label="Vekting i regresjonen">
          <Chip variant="choice" pressed={weighting === "none"} onClick={() => setWeighting("none")}>Uvektet</Chip>
          <Chip variant="choice" pressed={weighting === "1/x"} onClick={() => setWeighting("1/x")}>1/x</Chip>
          <Chip variant="choice" pressed={weighting === "1/x2"} onClick={() => setWeighting("1/x2")}>1/x²</Chip>
        </ChipGroup>
        <div className={shared.row}>
          <Readout label="Vektfunksjon" value={<MathFormula tex={"w = " + weightingTex} />} size="small" />
          <Readout label="Konstantledd" value={<MathFormula tex={"a = " + texNumber(fit.intercept, 2)} />} size="small" />
          <Readout label="Stigningstall" value={<MathFormula tex={"b = " + texNumber(fit.slope, 2)} />} size="small" />
          <Readout label="Residual ved laveste nivå" value={<MathFormula tex={"e_1 = " + texNumber(residuals[0] as number, 2)} />} size="small" />
        </div>
        <Verdict reserve={3}>
          Når vekten flyttes mot lave nivåer, trekkes linjen nærmere disse punktene. Det reduserer residualen ved den laveste kalibratoren, men kan øke residualer høyt i området.
        </Verdict>
      </div>
    </DemonstrationFrame>
  );
}

export function NullpunktDemo() {
  const [intercept, setIntercept] = useState(15);
  const slope = 1.5;
  const x = (value: number) => 55 + (value / 100) * 420;
  const y = (value: number) => 195 - ((value + 30) / 220) * 155;

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Endre konstantleddet og sammenlign den frie linjen med samme stigningstall tvunget gjennom null."
      label="Konstantleddet er skjæringen med responsaksen når analyttnivået er null"
      afterword="Et konstantledd som avviker fra null kan skyldes blant annet bakgrunn, blankbidrag eller modelltilpasning. Å tvinge linjen gjennom null er en modellrestriksjon som må begrunnes."
    >
      <div className={shared.stack}>
        <svg viewBox="0 0 520 225" className={shared.svg} aria-hidden="true">
          <line x1="55" y1={y(0)} x2="475" y2={y(0)} className={styles.axis} />
          <line x1="55" y1="200" x2="55" y2="28" className={styles.axis} />
          <line x1={x(0)} y1={y(0)} x2={x(100)} y2={y(slope * 100)} className={styles.forcedZeroLine} />
          <line x1={x(0)} y1={y(intercept)} x2={x(100)} y2={y(intercept + slope * 100)} className={styles.lineAccent} />
          <circle cx={x(0)} cy={y(intercept)} r="7" className={styles.pointWarning} />
        </svg>
        <p className={shared.caption}>Heltrukken linje: fri konstant · stiplet linje: tvunget gjennom null</p>
        <div className={shared.row}>
          <Readout label="Fri modell" value={<MathFormula tex={"y = " + texNumber(intercept, 0) + " + 1{,}5x"} />} size="small" />
          <Readout label="Konstantledd" value={<MathFormula tex={"a = " + texNumber(intercept, 0)} />} size="small" />
          <Readout label="Tvunget nullmodell" value={<MathFormula tex="y = 1{,}5x" />} size="small" />
        </div>
        <Verdict reserve={3}>
          {intercept === 0
            ? "Når konstantleddet er null, faller den frie modellen sammen med linjen som er tvunget gjennom null."
            : "Når konstantleddet ikke er null, gir tvungen nullmodell en systematisk annen linje over hele området."}
        </Verdict>
        <Slider
          label="Konstantledd i kalibreringsmodellen"
          valueText={"konstantledd " + comma(intercept, 0)}
          value={intercept}
          onChange={setIntercept}
          min={-20}
          max={30}
          step={5}
          ends={["negativ skjæring", "positiv skjæring"]}
        />
      </div>
    </DemonstrationFrame>
  );
}

export function DriftDemo() {
  const [driftRate, setDriftRate] = useState(0.6);
  const noise = [0.2, -0.3, 0.1, -0.2, 0.3, -0.1, 0.1, -0.2];
  const points = noise.map((offset, index) => 100 + driftRate * index + offset);
  const totalDrift = driftRate * (points.length - 1);
  const x = (index: number) => 70 + index * 55;
  const y = (value: number) => 190 - ((value - 96) / 16) * 150;

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Endre drifthastigheten og se den systematiske tidsutviklingen skille seg fra den lille tilfeldige variasjonen."
      label="Kontrollsignal over tid med fast tilfeldig støy og variabel drift"
      afterword="Drift er en tidsavhengig systematisk endring i indikasjonen. Tilfeldig variasjon kan ligge oppå trenden, men er ikke det samme som drift."
    >
      <div className={shared.stack}>
        <svg viewBox="0 0 520 225" className={shared.svg} aria-hidden="true">
          <line x1="45" y1="190" x2="490" y2="190" className={styles.axis} />
          <line x1="45" y1="190" x2="45" y2="28" className={styles.axis} />
          <line x1={x(0)} y1={y(100)} x2={x(7)} y2={y(100 + totalDrift)} className={styles.driftTrend} />
          {points.map((value, index) => (
            <circle key={index} cx={x(index)} cy={y(value)} r="6" className={styles.animatedPoint} />
          ))}
        </svg>
        <div className={shared.row}>
          <Readout label="Drift per måling" value={<MathFormula tex={texNumber(driftRate, 1)} />} size="small" />
          <Readout label="Systematisk endring gjennom serien" value={<MathFormula tex={"\\Delta = " + texNumber(totalDrift, 1)} />} size="small" />
        </div>
        <Verdict reserve={3}>
          {driftRate === 0
            ? "Uten påført drift ligger bare den faste tilfeldige variasjonen igjen rundt samme nivå."
            : "Den systematiske komponenten flytter signalet gradvis gjennom serien, mens små tilfeldige avvik ligger rundt trendlinjen."}
        </Verdict>
        <Slider
          label="Drifthastighet gjennom analyseserien"
          valueText={"drift " + comma(driftRate, 1) + " per måling; total systematisk endring " + comma(totalDrift, 1)}
          value={driftRate}
          onChange={setDriftRate}
          min={0}
          max={1.5}
          step={0.1}
          ends={["ingen drift", "tydelig drift"]}
        />
      </div>
    </DemonstrationFrame>
  );
}

export function KontrollproveDemo() {
  return (
    <DemonstrationFrame
      kind="stegvis"
      instruction="Følg hvordan en uavhengig kontrollprøve brukes til å overvåke en analyseserie."
      label="Kontrollprøve brukt som uavhengig kvalitetskontroll"
      afterword="Kontrollprøven bør gi informasjon som ikke bare gjentar kalibreringsinformasjonen; den brukes til å oppdage om systemet har endret seg."
    >
      <Flow
        items={[
          "Kalibrer serien",
          "Analyser kontrollprøven",
          "Sammenlign med kontrollkrav",
          "Godta, undersøk eller stopp serien",
        ]}
      />
    </DemonstrationFrame>
  );
}

export function EksternKalibreringDemo() {
  return (
    <DemonstrationFrame
      kind="stegvis"
      instruction="Se at kalibratorene tilberedes og måles separat fra den ukjente prøven."
      label="Ekstern kalibrering med separat kalibratorserie"
      afterword="Ekstern kalibrering forutsetter at kalibratorenes responsforhold er representativt for prøvene; matriseeffekter kan bryte denne forutsetningen."
    >
      <Flow
        items={[
          "Lag separate kalibratorer",
          "Mål kalibratorserien",
          "Etabler kalibreringsrelasjonen",
          "Bruk relasjonen på prøveresponsen",
        ]}
      />
    </DemonstrationFrame>
  );
}

export function MatrikstilpassetKalibreringDemo() {
  const [matrixResponse, setMatrixResponse] = useState(75);
  const trueLevel = 70;
  const solventSlope = 1;
  const matrixSlope = matrixResponse / 100;
  const sampleResponse = trueLevel * matrixSlope;
  const estimateWithSolvent = sampleResponse / solventSlope;
  const relativeBias = ((estimateWithSolvent - trueLevel) / trueLevel) * 100;
  const x = (value: number) => 55 + (value / 100) * 420;
  const y = (value: number) => 195 - (value / 100) * 155;

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Endre matriseeffekten og se hvorfor en matrikstilpasset kalibreringslinje kan følge prøveresponsen bedre enn en løsemiddelkurve."
      label="Løsemiddelkalibrering og matrikstilpasset kalibrering ved samme sanne analyttnivå"
      afterword="Illustrasjonen viser en ren slope-effekt. Virkelige matriseeffekter kan være mer komplekse, og matrikstilpasning forutsetter at kalibratormatrisen er tilstrekkelig representativ for prøvene."
    >
      <div className={shared.stack}>
        <svg viewBox="0 0 520 225" className={shared.svg} aria-hidden="true">
          <line x1="55" y1="195" x2="475" y2="195" className={styles.axis} />
          <line x1="55" y1="195" x2="55" y2="30" className={styles.axis} />
          <line x1={x(0)} y1={y(0)} x2={x(100)} y2={y(100)} className={styles.lineAccent} />
          <line x1={x(0)} y1={y(0)} x2={x(100)} y2={y(100 * matrixSlope)} className={styles.lineWarningDashed} />
          <line x1={x(trueLevel)} y1="195" x2={x(trueLevel)} y2={y(sampleResponse)} className={styles.guideLine} />
          <line x1={x(estimateWithSolvent)} y1={y(sampleResponse)} x2={x(trueLevel)} y2={y(sampleResponse)} className={styles.guideLine} />
          <circle cx={x(trueLevel)} cy={y(sampleResponse)} r="7" className={styles.pointWarningOutline} />
          <circle cx={x(estimateWithSolvent)} cy={y(sampleResponse)} r="6" className={styles.point} />
        </svg>
        <p className={shared.caption}>Heltrukken linje: løsemiddel · stiplet linje: prøve og matrikstilpasset standard</p>
        <div className={shared.row}>
          <Readout label="Respons i matriks relativt til løsemiddel" value={<MathFormula tex={texNumber(matrixResponse, 0) + "\\,\\%"} />} size="small" />
          <Readout label="Sant analyttnivå" value={<MathFormula tex={String(trueLevel)} />} size="small" />
          <Readout label="Estimert med løsemiddelkurve" value={<MathFormula tex={"\\hat{x} = " + texNumber(estimateWithSolvent, 1)} />} size="small" />
          <Readout label="Relativ skjevhet" value={<MathFormula tex={texNumber(relativeBias, 1) + "\\,\\%"} />} size="small" tone={matrixResponse < 95 ? "warning" : "normal"} />
        </div>
        <Verdict reserve={3}>
          {matrixResponse === 100
            ? "Når responsen er den samme i matriks og løsemiddel, faller kurvene sammen."
            : "Hvis prøven vurderes mot løsemiddelkurven, blir nivået underestimert i denne suppressjonsillustrasjonen. Matrikstilpassede standarder følger i stedet samme responsforhold som prøven."}
        </Verdict>
        <Slider
          label="Matriksrespons relativt til løsemiddel"
          valueText={"matriksrespons " + comma(matrixResponse, 0) + " prosent; estimert nivå med løsemiddelkurve " + comma(estimateWithSolvent, 1)}
          value={matrixResponse}
          onChange={setMatrixResponse}
          min={60}
          max={100}
          step={5}
          ends={["sterk suppressjon", "ingen slope-effekt"]}
        />
      </div>
    </DemonstrationFrame>
  );
}
