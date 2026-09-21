"use client";

import { useState } from "react";

import { DemonstrationFrame } from "@/components/DemonstrationFrame";
import { MathFormula } from "@/components/MathFormula";
import { comma } from "@/lib/statistics";
import { Chip, ChipGroup, Readout, Slider, Verdict } from "./primitives";
import shared from "./demos.module.css";
import styles from "./CalibrationConceptDemos.module.css";

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

function texNumber(value: number, digits = 1) {
  return comma(value, digits).replace(",", "{,}");
}

function percent(value: number, max: number) {
  return String((value / max) * 100) + "%";
}

type WeightedPoint = { x: number; y: number };
type Weighting = "none" | "1/x" | "1/x2";

function weightedFit(points: WeightedPoint[], weighting: Weighting) {
  const weight = (x: number) => {
    if (weighting === "1/x") return 1 / x;
    if (weighting === "1/x2") return 1 / (x * x);
    return 1;
  };

  const sumW = points.reduce((sum, point) => sum + weight(point.x), 0);
  const meanX = points.reduce((sum, point) => sum + weight(point.x) * point.x, 0) / sumW;
  const meanY = points.reduce((sum, point) => sum + weight(point.x) * point.y, 0) / sumW;
  const numerator = points.reduce(
    (sum, point) => sum + weight(point.x) * (point.x - meanX) * (point.y - meanY),
    0,
  );
  const denominator = points.reduce(
    (sum, point) => sum + weight(point.x) * (point.x - meanX) ** 2,
    0,
  );
  const slope = numerator / denominator;
  const intercept = meanY - slope * meanX;
  return { slope, intercept };
}

export function KalibreringskurveDemo() {
  const [unknownResponse, setUnknownResponse] = useState(118);
  const estimate = (unknownResponse - 20) / 2;
  const x = (level: number) => 55 + (level / 100) * 420;
  const y = (response: number) => 205 - (response / 240) * 165;
  const calibrators = [10, 30, 50, 70, 90];

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Endre responsen til den ukjente prøven og følg projeksjonen via kalibreringslinjen til estimert analyttnivå."
      label="Kalibreringskurven brukes til å oversette en ukjent respons til et estimert analyttnivå"
      afterword="Kalibratorene etablerer relasjonen mellom respons og nivå. Den ukjente responsen projiseres på den tilpassede modellen; modellen må være gyldig i området der prøven tolkes."
    >
      <div className={shared.stack}>
        <svg viewBox="0 0 520 250" className={shared.svg} aria-hidden="true">
          <line x1="55" y1="205" x2="485" y2="205" className={styles.axis} />
          <line x1="55" y1="205" x2="55" y2="30" className={styles.axis} />
          <line x1={x(0)} y1={y(20)} x2={x(100)} y2={y(220)} className={styles.lineAccent} />
          {calibrators.map((level) => (
            <circle
              key={level}
              cx={x(level)}
              cy={y(20 + 2 * level)}
              r="6"
              className={styles.point}
            />
          ))}
          <line x1="55" y1={y(unknownResponse)} x2={x(estimate)} y2={y(unknownResponse)} className={styles.projection} />
          <line x1={x(estimate)} y1={y(unknownResponse)} x2={x(estimate)} y2="205" className={styles.projection} />
          <circle cx={x(estimate)} cy={y(unknownResponse)} r="8" className={styles.unknownPoint} />
          <text x="392" y="232" className={styles.svgText}>analyttnivå</text>
          <text x="62" y="24" className={styles.svgText}>respons</text>
        </svg>
        <div className={shared.row}>
          <Readout
            label="Kalibreringsmodell"
            value={<MathFormula tex={"y = 20 + 2x"} />}
            size="small"
          />
          <Readout
            label="Estimert nivå"
            value={<MathFormula tex={"\\hat{x} = " + texNumber(estimate, 1) + "\\,\\mathrm{mg/L}"} />}
            size="small"
          />
        </div>
        <Verdict reserve={3}>
          En respons på {comma(unknownResponse, 0)} tilsvarer i denne illustrasjonen omtrent {comma(estimate, 1)} mg/L.
        </Verdict>
        <Slider
          label="Respons fra den ukjente prøven"
          valueText={"respons " + comma(unknownResponse, 0) + "; estimert nivå " + comma(estimate, 1) + " mg/L"}
          value={unknownResponse}
          onChange={setUnknownResponse}
          min={40}
          max={220}
          step={10}
          ends={["lav respons", "høy respons"]}
        />
      </div>
    </DemonstrationFrame>
  );
}

export function KvantifiseringsgrenseDemo() {
  const [concentration, setConcentration] = useState(4);
  const cv = 50 / Math.sqrt(concentration);
  const loq = 7;
  const offsets = [-1.15, -0.72, -0.28, 0.05, 0.36, 0.74, 1.08];
  const recoveries = offsets.map((offset) => 100 + offset * cv);
  const x = (recovery: number) => 45 + ((recovery - 40) / 120) * 430;
  const meets = concentration >= loq;

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Øk konsentrasjonen og se replikaene samle seg rundt målverdien mens den relative variasjonen faller."
      label="Kvantifiseringsgrensen som laveste illustrerte nivå som oppfyller et presisjonskrav"
      afterword="Her er LOQ pedagogisk definert som første heltallsnivå der illustrert CV er høyst 20 %. Virkelige LOQ-kriterier må fastsettes og dokumenteres for den aktuelle metoden."
    >
      <div className={shared.stack}>
        <svg viewBox="0 0 520 180" className={shared.svg} aria-hidden="true">
          <line x1="45" y1="95" x2="475" y2="95" className={styles.axis} />
          <line x1={x(100)} y1="32" x2={x(100)} y2="145" className={styles.lineReference} />
          {recoveries.map((recovery, index) => (
            <circle
              key={index}
              cx={x(recovery)}
              cy={70 + (index % 3) * 24}
              r="7"
              className={meets ? styles.point : styles.pointWarning}
            />
          ))}
          <text x={x(100) + 6} y="28" className={styles.svgText}>100 % recovery</text>
          <text x="45" y="165" className={styles.svgText}>større relativ spredning</text>
          <text x="360" y="165" className={styles.svgText}>tettere replikaer</text>
        </svg>
        <div className={shared.row}>
          <Readout
            label="Illustrert CV"
            value={<MathFormula tex={"\\mathrm{CV} = " + texNumber(cv, 1) + "\\,\\%"} />}
            size="small"
          />
          <Readout
            label="Definert kriterium"
            value={<MathFormula tex={"\\mathrm{CV} \\le 20\\,\\%"} />}
            size="small"
          />
        </div>
        <Verdict tone={meets ? "normal" : "warning"} reserve={3.2}>
          {meets
            ? "Ved dette nivået er det illustrerte presisjonskravet oppfylt. Dette nivået ligger ved eller over den illustrerte LOQ."
            : "Replikaene er fortsatt for variable til det valgte kvantifiseringskravet. Påvisning kan være mulig uten at tallfestingen er god nok."}
        </Verdict>
        <Slider
          label="Konsentrasjonsnivå for LOQ-illustrasjonen"
          valueText={"nivå " + comma(concentration, 0) + "; CV " + comma(cv, 1) + " prosent"}
          value={concentration}
          onChange={setConcentration}
          min={1}
          max={15}
          step={1}
          ends={["svært lavt nivå", "høyere nivå"]}
        />
      </div>
    </DemonstrationFrame>
  );
}

export function ResponsfaktorDemo() {
  const [amount, setAmount] = useState(10);
  const responseA = 50 * amount;
  const responseB = 30 * amount;
  const x = (value: number) => 55 + (value / 20) * 420;
  const y = (value: number) => 205 - (value / 1000) * 165;

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Endre analyttmengden og sammenlign signalene fra to forbindelser med ulike responsfaktorer."
      label="Responsfaktor som stigningstall mellom analyttmengde og signal"
      afterword="Responsfaktoren tilhører det aktuelle målesystemet og betingelsene. Samme analyttmengde kan derfor gi ulike signaler for ulike forbindelser."
    >
      <div className={shared.stack}>
        <svg viewBox="0 0 520 250" className={shared.svg} aria-hidden="true">
          <line x1="55" y1="205" x2="485" y2="205" className={styles.axis} />
          <line x1="55" y1="205" x2="55" y2="30" className={styles.axis} />
          <line x1={x(0)} y1={y(0)} x2={x(20)} y2={y(1000)} className={styles.lineAccent} />
          <line x1={x(0)} y1={y(0)} x2={x(20)} y2={y(600)} className={styles.lineSecondary} />
          <line x1={x(amount)} y1="205" x2={x(amount)} y2={y(responseA)} className={styles.projection} />
          <circle cx={x(amount)} cy={y(responseA)} r="7" className={styles.point} />
          <circle cx={x(amount)} cy={y(responseB)} r="7" className={styles.pointWarning} />
          <text x="385" y="232" className={styles.svgText}>analyttmengde</text>
          <text x="62" y="24" className={styles.svgText}>signal</text>
        </svg>
        <div className={styles.legend}>
          <span className={styles.legendItem}><span className={styles.legendSwatch} />Forbindelse A</span>
          <span className={styles.legendItem}><span className={styles.legendSwatchSecondary} />Forbindelse B</span>
        </div>
        <div className={shared.row}>
          <Readout label="A" value={<MathFormula tex={"RF_A = " + texNumber(responseA / amount, 0)} />} size="small" />
          <Readout label="B" value={<MathFormula tex={"RF_B = " + texNumber(responseB / amount, 0)} />} size="small" />
          <Readout label="Responsforhold" value={<MathFormula tex={"RF_A/RF_B = " + texNumber(50 / 30, 2)} />} size="small" />
        </div>
        <Verdict reserve={3}>
          Ved samme mengde gir A signal {comma(responseA, 0)}, mens B gir {comma(responseB, 0)}. Forskjellen følger linjenes stigningstall.
        </Verdict>
        <Slider
          label="Analyttmengde i responsfaktorillustrasjonen"
          valueText={"mengde " + comma(amount, 0) + "; signal A " + comma(responseA, 0) + "; signal B " + comma(responseB, 0)}
          value={amount}
          onChange={setAmount}
          min={2}
          max={20}
          step={1}
          ends={["liten mengde", "stor mengde"]}
        />
      </div>
    </DemonstrationFrame>
  );
}

export function ArbeidsomradeDemo() {
  const [level, setLevel] = useState(55);
  const lloq = 10;
  const uloq = 100;
  const within = level >= lloq && level <= uloq;
  const cv = level < lloq ? 8 + (lloq - level) * 2.3 : level > uloq ? 8 + (level - uloq) * 0.7 : 8;
  const bias = level < lloq ? 3 + (lloq - level) * 1.3 : level > uloq ? 3 + (level - uloq) * 0.6 : 3;
  const max = 120;

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Flytt analyttnivået gjennom området og se når de illustrerte ytelseskravene samtidig er oppfylt."
      label="Arbeidsområde som intervallet der metoden oppfyller definerte krav"
      afterword="Arbeidsområdet bestemmes av egnet ytelse gjennom intervallet, ikke bare av at kalibreringspunktene kan tilpasses en rett linje."
    >
      <div className={shared.stack}>
        <div className={styles.rangeWrap}>
          <div className={styles.rangeLabels}>
            <span>LLOQ 10</span>
            <span>validert arbeidsområde</span>
            <span>ULOQ 100</span>
          </div>
          <div className={styles.rangeTrack} aria-hidden="true">
            <span
              className={styles.rangeActive}
              style={{ left: percent(lloq, max), right: String(100 - (uloq / max) * 100) + "%" }}
            />
            <span className={styles.rangeMarker} style={{ left: percent(level, max) }} />
          </div>
        </div>
        <div className={styles.performanceGrid}>
          <div className={styles.performanceCard}>
            <span>Illustrert presisjon</span>
            <strong>{comma(cv, 1)} % CV</strong>
          </div>
          <div className={styles.performanceCard}>
            <span>Illustrert absolutt skjevhet</span>
            <strong>{comma(bias, 1)} %</strong>
          </div>
        </div>
        <Verdict tone={within ? "normal" : "warning"} reserve={3}>
          {within
            ? "Nivået ligger innenfor det illustrerte arbeidsområdet, der begge ytelsesmålene holdes stabile."
            : "Nivået ligger utenfor det illustrerte arbeidsområdet. At instrumentet fortsatt gir et signal er ikke det samme som at måleresultatet oppfyller metodekravene."}
        </Verdict>
        <Slider
          label="Analyttnivå gjennom arbeidsområdet"
          valueText={"nivå " + comma(level, 0) + "; " + (within ? "innenfor" : "utenfor") + " arbeidsområdet"}
          value={level}
          onChange={setLevel}
          min={0}
          max={max}
          step={2}
          ends={["under LLOQ", "over ULOQ"]}
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
  const [weighting, setWeighting] = useState<Weighting>("none");
  const points: WeightedPoint[] = [
    { x: 1, y: 2.1 },
    { x: 2, y: 4.2 },
    { x: 4, y: 8.0 },
    { x: 6, y: 11.0 },
    { x: 8, y: 18.0 },
    { x: 10, y: 27.0 },
  ];
  const fit = weightedFit(points, weighting);
  const firstPoint = points[0]!;
  const lowResidual = firstPoint.y - (fit.intercept + fit.slope * firstPoint.x);
  const x = (value: number) => 55 + (value / 10) * 420;
  const y = (value: number) => 205 - (value / 30) * 165;
  const label = weighting === "none" ? "uvektet" : weighting === "1/x" ? "1/x" : "1/x²";

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Bytt vekting og se hvordan den samme heteroskedastiske kalibratorserien gir en annen tilpasset linje og andre residualer."
      label="Vektet regresjon endrer hvor sterkt ulike kalibratornivåer påvirker tilpasningen"
      afterword="Vekting kan være hensiktsmessig når variansen endrer seg med nivået. Valg av vekter må begrunnes i datamønsteret og valideres; en standardvekt er ikke automatisk riktig."
    >
      <div className={shared.stack}>
        <svg viewBox="0 0 520 250" className={shared.svg} aria-hidden="true">
          <line x1="55" y1="205" x2="485" y2="205" className={styles.axis} />
          <line x1="55" y1="205" x2="55" y2="30" className={styles.axis} />
          {points.map((point) => {
            const predicted = fit.intercept + fit.slope * point.x;
            return (
              <line
                key={"r-" + point.x}
                x1={x(point.x)}
                y1={y(point.y)}
                x2={x(point.x)}
                y2={y(predicted)}
                className={styles.residualLine}
              />
            );
          })}
          <line
            x1={x(0)}
            y1={y(fit.intercept)}
            x2={x(10)}
            y2={y(fit.intercept + fit.slope * 10)}
            className={styles.lineAccent}
          />
          {points.map((point) => (
            <circle key={point.x} cx={x(point.x)} cy={y(point.y)} r="6" className={styles.point} />
          ))}
        </svg>
        <ChipGroup label="Vekting i regresjonen">
          <Chip variant="choice" pressed={weighting === "none"} onClick={() => setWeighting("none")}>Uvektet</Chip>
          <Chip variant="choice" pressed={weighting === "1/x"} onClick={() => setWeighting("1/x")}>1/x</Chip>
          <Chip variant="choice" pressed={weighting === "1/x2"} onClick={() => setWeighting("1/x2")}>1/x²</Chip>
        </ChipGroup>
        <div className={shared.row}>
          <Readout
            label="Tilpasset modell"
            value={<MathFormula tex={"y = " + texNumber(fit.intercept, 2) + " + " + texNumber(fit.slope, 2) + "x"} />}
            size="small"
          />
          <Readout
            label="Residual ved laveste nivå"
            value={<MathFormula tex={"e_1 = " + texNumber(lowResidual, 2)} />}
            size="small"
          />
        </div>
        <Verdict reserve={3.2}>
          {label === "uvektet"
            ? "Alle punktene teller likt i tapsfunksjonen, slik at de høye og mer variable nivåene kan få stor innflytelse på linjen."
            : "Med " + label + " får lave nivåer større relativ vekt. Legg merke til at linjen og residualen ved laveste kalibrator endres."}
        </Verdict>
      </div>
    </DemonstrationFrame>
  );
}

export function NullpunktDemo() {
  const [intercept, setIntercept] = useState(20);
  const slope = 10;
  const x = (value: number) => 55 + (value / 10) * 420;
  const y = (value: number) => 205 - ((value + 40) / 200) * 165;

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Endre konstantleddet og se kalibreringslinjen flytte seg parallelt mens stigningstallet holdes fast."
      label="Konstantleddet er modellens respons når analyttnivået er null"
      afterword="Et ikke-null konstantledd kan gjenspeile bakgrunn, blankbidrag eller modelltilpasning. Å tvinge en kalibrering gjennom null krever en faglig og statistisk begrunnelse."
    >
      <div className={shared.stack}>
        <svg viewBox="0 0 520 250" className={shared.svg} aria-hidden="true">
          <line x1="55" y1={y(0)} x2="485" y2={y(0)} className={styles.axis} />
          <line x1="55" y1="205" x2="55" y2="30" className={styles.axis} />
          <line x1={x(0)} y1={y(0)} x2={x(10)} y2={y(100)} className={styles.lineReference} />
          <line x1={x(0)} y1={y(intercept)} x2={x(10)} y2={y(intercept + 100)} className={styles.lineAccent} />
          <circle cx={x(0)} cy={y(intercept)} r="8" className={styles.unknownPoint} />
          <text x="67" y={y(intercept) - 10} className={styles.svgTextStrong}>a</text>
        </svg>
        <div className={styles.legend}>
          <span className={styles.legendItem}><span className={styles.legendSwatch} />fri konstant</span>
          <span className={styles.legendItem}><span className={styles.legendSwatchReference} />tvunget gjennom null</span>
        </div>
        <div className={shared.row}>
          <Readout label="Modell" value={<MathFormula tex={"y = a + 10x"} />} size="small" />
          <Readout label="Konstantledd" value={<MathFormula tex={"a = " + texNumber(intercept, 0)} />} size="small" />
        </div>
        <Verdict reserve={3}>
          {Math.abs(intercept) <= 2
            ? "Den frie modellen skjærer nå nesten i null, men det er et resultat av dataene i illustrasjonen — ikke en forhåndsantakelse."
            : "Den frie modellen har et tydelig ikke-null konstantledd. Den stiplede nulltvangen ville derfor være en annen modell."}
        </Verdict>
        <Slider
          label="Konstantledd i kalibreringsmodellen"
          valueText={"konstantledd " + comma(intercept, 0)}
          value={intercept}
          onChange={setIntercept}
          min={-20}
          max={40}
          step={2}
          ends={["negativ skjæring", "positiv skjæring"]}
        />
      </div>
    </DemonstrationFrame>
  );
}

export function DriftDemo() {
  const [driftRate, setDriftRate] = useState(0.4);
  const noise = [0.1, -0.2, 0.2, -0.1, 0.3, -0.2, 0.1, -0.1];
  const points = noise.map((value, index) => 100 + value + driftRate * index);
  const outside = points.some((value) => value > 103 || value < 97);
  const lastPoint = points[points.length - 1]!;
  const x = (index: number) => 55 + index * 60;
  const y = (value: number) => 190 - ((value - 96) / 9) * 150;
  const polyline = points.map((value, index) => String(x(index)) + "," + String(y(value))).join(" ");

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Øk driftshastigheten og se kontrollsignalene vandre systematisk mens den tilfeldige småstøyen er den samme."
      label="Drift som gradvis tidsavhengig endring i et stabilt kontrollsignal"
      afterword="Drift er en tidsavhengig endring i instrumentets indikasjon eller metrologiske egenskaper. Illustrasjonen skiller den systematiske vandringen fra tilfeldig variasjon rundt hvert punkt."
    >
      <div className={shared.stack}>
        <svg viewBox="0 0 520 220" className={shared.svg} aria-hidden="true">
          <line x1="55" y1="190" x2="485" y2="190" className={styles.axis} />
          <line x1="55" y1="190" x2="55" y2="30" className={styles.axis} />
          <line x1="55" y1={y(100)} x2="475" y2={y(100)} className={styles.lineReference} />
          <line x1="55" y1={y(103)} x2="475" y2={y(103)} className={styles.limitLine} />
          <line x1="55" y1={y(97)} x2="475" y2={y(97)} className={styles.limitLine} />
          <polyline points={polyline} className={styles.lineAccent} />
          {points.map((value, index) => (
            <circle
              key={index}
              cx={x(index)}
              cy={y(value)}
              r="6"
              className={value > 103 || value < 97 ? styles.pointWarning : styles.point}
            />
          ))}
        </svg>
        <div className={shared.row}>
          <Readout
            label="Siste kontrollsignal"
            value={<MathFormula tex={texNumber(lastPoint, 1)} />}
            size="small"
          />
          <Readout
            label="Drift per måling"
            value={<MathFormula tex={texNumber(driftRate, 1)} />}
            size="small"
          />
        </div>
        <Verdict tone={outside ? "warning" : "normal"} reserve={3}>
          {outside
            ? "Den gradvise vandringen har nå ført minst ett kontrollpunkt utenfor de faste illustrerte grensene."
            : driftRate === 0
              ? "Ingen systematisk drift er lagt til; bare den samme lille tilfeldige variasjonen står igjen."
              : "Punktene vandrer gradvis oppover, men ligger foreløpig innenfor de faste illustrerte grensene."}
        </Verdict>
        <Slider
          label="Driftshastighet gjennom analyseserien"
          valueText={"drift " + comma(driftRate, 1) + " per måling; siste signal " + comma(lastPoint, 1)}
          value={driftRate}
          onChange={setDriftRate}
          min={0}
          max={1}
          step={0.1}
          ends={["ingen drift", "rask drift"]}
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
  const [matrixEffect, setMatrixEffect] = useState(72);
  const trueLevel = 10;
  const matrixSlope = matrixEffect / 100;
  const sampleResponse = trueLevel * matrixSlope;
  const solventEstimate = sampleResponse;
  const matrixEstimate = sampleResponse / matrixSlope;
  const x = (value: number) => 55 + (value / 12) * 420;
  const y = (value: number) => 205 - (value / 14) * 165;
  const suppressed = matrixEffect < 95;
  const enhanced = matrixEffect > 105;

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Endre matriseeffekten og sammenlign hva samme prøverespons betyr mot en løsemiddelkurve og en matrikstilpasset kurve."
      label="Matrikstilpasset kalibrering lar kalibratorene følge prøvens responsforhold"
      afterword="Matrikstilpasning kan redusere systematisk forskjell mellom kalibrator og prøve når matriksen er representativ. Den løser ikke alle matriseproblemer og krever egnet analyttfri eller på annen måte representativ matriks."
    >
      <div className={shared.stack}>
        <svg viewBox="0 0 520 250" className={shared.svg} aria-hidden="true">
          <line x1="55" y1="205" x2="485" y2="205" className={styles.axis} />
          <line x1="55" y1="205" x2="55" y2="30" className={styles.axis} />
          <line x1={x(0)} y1={y(0)} x2={x(12)} y2={y(12)} className={styles.lineReference} />
          <line x1={x(0)} y1={y(0)} x2={x(12)} y2={y(12 * matrixSlope)} className={styles.lineAccent} />
          <line x1="55" y1={y(sampleResponse)} x2={x(trueLevel)} y2={y(sampleResponse)} className={styles.projection} />
          <circle cx={x(trueLevel)} cy={y(sampleResponse)} r="8" className={styles.point} />
        </svg>
        <div className={styles.legend}>
          <span className={styles.legendItem}><span className={styles.legendSwatchReference} />løsemiddelkalibrering</span>
          <span className={styles.legendItem}><span className={styles.legendSwatch} />matrikstilpasset kalibrering</span>
        </div>
        <div className={shared.row}>
          <Readout
            label="Tolket mot løsemiddel"
            value={<MathFormula tex={"\\hat{x}_{\\mathrm{solv}} = " + texNumber(solventEstimate, 1)} />}
            size="small"
          />
          <Readout
            label="Tolket mot matriks"
            value={<MathFormula tex={"\\hat{x}_{\\mathrm{matrix}} = " + texNumber(matrixEstimate, 1)} />}
            size="small"
          />
        </div>
        <Verdict reserve={3.2}>
          {suppressed
            ? "Matriksen undertrykker responsen. Løsemiddelkurven ville derfor undervurdere nivået, mens den matrikstilpassede kurven følger prøvens lavere responsfaktor."
            : enhanced
              ? "Matriksen forsterker responsen. Løsemiddelkurven ville derfor overvurdere nivået, mens den matrikstilpassede kurven følger prøvens høyere responsfaktor."
              : "Matriseeffekten er liten i illustrasjonen, så løsemiddel- og matrikstilpasset kalibrering gir nesten samme tolkning."}
        </Verdict>
        <Slider
          label="Matriseeffekt på respons"
          valueText={"matriserespons " + comma(matrixEffect, 0) + " prosent av løsemiddel; løsemiddelestimat " + comma(solventEstimate, 1)}
          value={matrixEffect}
          onChange={setMatrixEffect}
          min={50}
          max={120}
          step={2}
          ends={["sterk suppressjon", "forsterkning"]}
        />
      </div>
    </DemonstrationFrame>
  );
}
