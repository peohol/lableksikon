"use client";

import { useState } from "react";

import { DemonstrationFrame } from "@/components/DemonstrationFrame";
import { MathFormula } from "@/components/MathFormula";
import { comma, mean, relativeStandardDeviation, sampleStandardDeviation } from "@/lib/statistics";
import { PointRows } from "./PointRows";
import { Readout, Slider, Verdict } from "./primitives";
import shared from "./demos.module.css";
import styles from "./QualityConceptDemos.module.css";

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

const OFFSETS = [-1, -0.6, -0.2, 0.2, 0.6, 1] as const;
const SMALL_OFFSETS = [-1, 0, 1] as const;

const scaledSeries = (center: number, amplitude: number, offsets: readonly number[] = OFFSETS) =>
  offsets.map((offset) => center + offset * amplitude);

const texNumber = (value: number, decimals: number) =>
  comma(value, decimals).replace(",", "{,}");

export function RepeterbarhetDemo() {
  const [spread, setSpread] = useState(32);
  const amplitude = 0.08 + spread * 0.016;
  const values = scaledSeries(100, amplitude);
  const sd = sampleStandardDeviation(values);
  const rsd = relativeStandardDeviation(values);

  const verdict =
    rsd < 0.35
      ? "Målingene ligger svært tett i denne korte serien."
      : rsd < 0.9
        ? "Spredningen er synlig, men alle punktene ligger fortsatt nær samme nivå."
        : "Stor korttidsvariasjon gjør at gjentak av samme prøve gir tydelig ulike resultater.";

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Øk den tilfeldige variasjonen og se serien spre seg."
      label="Repeterbarhet som spredning i én kort måleserie"
      afterword="Bare korttidsvariasjonen endres her. Dag, operatør og laboratorium holdes utenfor."
    >
      <div className={shared.stack}>
        <PointRows rows={[{ label: "Samme serie", values }]} min={98} max={102} />
        <div className={shared.row}>
          <Readout
            label="Standardavvik"
            value={<MathFormula tex={`s = ${texNumber(sd, 2)}`} />}
            size="small"
          />
          <Readout
            label="Relativt standardavvik"
            value={<MathFormula tex={`\\mathrm{RSD} = ${texNumber(rsd, 2)}\\,\\%`} />}
            size="small"
          />
        </div>
        <Verdict reserve={2.8}>{verdict}</Verdict>
        <Slider
          label="Tilfeldig variasjon i den korte serien"
          valueText={`RSD ${comma(rsd, 2)} prosent`}
          value={spread}
          onChange={setSpread}
          ends={["tett serie", "stor spredning"]}
        />
      </div>
    </DemonstrationFrame>
  );
}

export function IntermediarDemo() {
  const [betweenSeries, setBetweenSeries] = useState(34);
  const shift = betweenSeries * 0.018;
  const within = 0.22;
  const rows = [
    { label: "Mandag · A", values: scaledSeries(100 - shift * 0.7, within, SMALL_OFFSETS) },
    { label: "Onsdag · B", values: scaledSeries(100 + shift, within, SMALL_OFFSETS) },
    { label: "Fredag · A", values: scaledSeries(100 - shift * 0.2, within, SMALL_OFFSETS) },
  ];
  const all = rows.flatMap((row) => row.values);
  const sd = sampleStandardDeviation(all);

  const verdict =
    betweenSeries < 15
      ? "Seriene ligger nesten oppå hverandre: ekstra variasjon mellom dager og operatører er liten."
      : betweenSeries < 60
        ? "Hver serie er tett, men sentrene ligger forskjellig. Det er variasjon utover repeterbarhet."
        : "Forskjellene mellom seriene dominerer nå den samlede presisjonen i laboratoriet.";

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Flytt seriene fra hverandre uten å endre spredningen innen hver serie."
      label="Intermediær presisjon som variasjon mellom serier i samme laboratorium"
      afterword="Innen-serie-spredningen er konstant. Kontrollen legger bare til variasjon mellom dager og operatører."
    >
      <div className={shared.stack}>
        <PointRows rows={rows} min={97.5} max={102.5} />
        <Readout
          label="Samlet standardavvik for alle ni resultater"
          value={<MathFormula tex={`s = ${texNumber(sd, 2)}`} />}
          size="small"
        />
        <Verdict reserve={3}>{verdict}</Verdict>
        <Slider
          label="Variasjon mellom dager og operatører"
          valueText={`Mellom-serie-forskyvning ${comma(shift, 2)} enheter`}
          value={betweenSeries}
          onChange={setBetweenSeries}
          ends={["seriene overlapper", "ulike serienivåer"]}
        />
      </div>
    </DemonstrationFrame>
  );
}

export function ReproduserbarhetDemo() {
  const [betweenLabs, setBetweenLabs] = useState(38);
  const shift = betweenLabs * 0.025;
  const within = 0.3;
  const rows = [
    { label: "Lab A", values: scaledSeries(100 - shift, within, SMALL_OFFSETS) },
    { label: "Lab B", values: scaledSeries(100 + shift * 0.35, within, SMALL_OFFSETS) },
    { label: "Lab C", values: scaledSeries(100 + shift, within, SMALL_OFFSETS) },
  ];
  const all = rows.flatMap((row) => row.values);
  const sd = sampleStandardDeviation(all);

  const verdict =
    betweenLabs < 15
      ? "Laboratoriene gir nesten samme nivå i denne illustrasjonen."
      : betweenLabs < 55
        ? "Klyngene er tette hver for seg, men laboratorienes nivåer skiller seg."
        : "Mellom-laboratorievariasjonen er nå mye større enn spredningen innen hvert laboratorium.";

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Øk forskjellen mellom laboratoriene og behold presisjonen innen hvert laboratorium."
      label="Reproduserbarhet som variasjon mellom laboratorier"
      afterword="Reproduserbarhet beskriver presisjon under bredere betingelser. Den er ikke definert som «alltid dårligere» enn repeterbarhet."
    >
      <div className={shared.stack}>
        <PointRows rows={rows} min={96.5} max={103.5} />
        <Readout
          label="Samlet standardavvik for laboratoriene"
          value={<MathFormula tex={`s = ${texNumber(sd, 2)}`} />}
          size="small"
        />
        <Verdict reserve={3}>{verdict}</Verdict>
        <Slider
          label="Variasjon mellom laboratorier"
          valueText={`Forskyvning opptil ${comma(shift, 2)} enheter`}
          value={betweenLabs}
          onChange={setBetweenLabs}
          ends={["laboratoriene overlapper", "ulike laboratorienivåer"]}
        />
      </div>
    </DemonstrationFrame>
  );
}

export function SkjevhetDemo() {
  const [bias, setBias] = useState(2);
  const offsets = [-0.45, -0.25, -0.08, 0.08, 0.25, 0.45];
  const values = offsets.map((offset) => 100 + bias + offset);
  const average = mean(values);
  const estimatedBias = average - 100;
  const absoluteBias = Math.abs(estimatedBias);

  const verdict =
    absoluteBias < 0.25
      ? "Middelverdien ligger praktisk talt på referansen i denne illustrasjonen."
      : "Punktene er fortsatt tett samlet, men hele klyngen ligger systematisk forskjøvet fra referansen.";

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Flytt hele måleklyngen uten å endre spredningen."
      label="Systematisk skjevhet som forskyvning fra en referanseverdi"
      afterword="Kontrollen endrer systematisk skjevhet, ikke presisjon. En tett klynge kan derfor fortsatt ligge på feil nivå."
    >
      <div className={shared.stack}>
        <PointRows
          rows={[{ label: "Måleresultater", values }]}
          min={94}
          max={106}
          markers={[{ value: 100, tone: "warning", dashed: true }]}
        />
        <div className={shared.row}>
          <Readout
            label="Referanseverdi"
            value={<MathFormula tex="x_{\\mathrm{ref}} = 100{,}0" />}
            size="small"
          />
          <Readout
            label="Estimert skjevhet"
            value={<MathFormula tex={`\\mathrm{bias} = ${estimatedBias >= 0 ? "+" : ""}${texNumber(estimatedBias, 1)}`} />}
            size="small"
            tone={absoluteBias >= 2 ? "warning" : "normal"}
          />
        </div>
        <Verdict reserve={3}>{verdict}</Verdict>
        <Slider
          label="Systematisk skjevhet"
          valueText={`${bias >= 0 ? "pluss " : "minus "}${comma(Math.abs(bias), 1)} enheter`}
          value={bias}
          onChange={setBias}
          min={-5}
          max={5}
          step={0.5}
          ends={["negativ skjevhet", "positiv skjevhet"]}
        />
      </div>
    </DemonstrationFrame>
  );
}

function gaussianPath(center: number, width: number, height: number) {
  const points = Array.from({ length: 81 }, (_, index) => {
    const x = 45 + index * 5.35;
    const y = 185 - height * Math.exp(-0.5 * ((x - center) / width) ** 2);
    return (index === 0 ? "M" : "L") + x.toFixed(1) + " " + y.toFixed(1);
  });
  return points.join(" ");
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

function normalCoverage(k: number) {
  return erfApprox(k / Math.sqrt(2));
}

function normalCurvePath() {
  return Array.from({ length: 101 }, (_, index) => {
    const z = -3.5 + index * 0.07;
    const x = 40 + ((z + 3.5) / 7) * 440;
    const y = 180 - 125 * Math.exp(-0.5 * z * z);
    return (index === 0 ? "M" : "L") + x.toFixed(1) + " " + y.toFixed(1);
  }).join(" ");
}

function normalAreaPath(k: number) {
  const steps = 80;
  const points = Array.from({ length: steps + 1 }, (_, index) => {
    const z = -k + (index / steps) * 2 * k;
    const x = 40 + ((z + 3.5) / 7) * 440;
    const y = 180 - 125 * Math.exp(-0.5 * z * z);
    return "L" + x.toFixed(1) + " " + y.toFixed(1);
  }).join(" ");
  const left = 40 + ((-k + 3.5) / 7) * 440;
  const right = 40 + ((k + 3.5) / 7) * 440;
  return "M" + left.toFixed(1) + " 180 " + points + " L" + right.toFixed(1) + " 180 Z";
}

export function GjenvinningDemo() {
  const [recovery, setRecovery] = useState(90);
  const before = 80;
  const spike = 20;
  const after = before + (spike * recovery) / 100;
  const missing = 100 - recovery;

  const verdict =
    recovery < 80
      ? "En stor del av den tilsatte mengden kommer ikke tilbake i måleresultatet i denne illustrasjonen."
      : recovery <= 105
        ? "Målingen etter tilsetning følger den tilsatte mengden forholdsvis tett."
        : "Det beregnede gjenvinningsestimatet er over 100 %, som kan skyldes blant annet skjevhet eller matrikseffekter.";

  const barHeight = (value: number) => (value / 110) * 145;

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Endre hvor stor del av den tilsatte mengden som måles igjen."
      label="Spike recovery som synlig forskjell mellom tilsatt og gjenfunnet mengde"
      afterword="Gjenvinning er metode- og matriksavhengig. Et akseptkriterium må fastsettes for den konkrete bruken; figuren viser mekanismen, ikke en universell grense."
    >
      <div className={shared.stack}>
        <svg viewBox="0 0 520 220" className={shared.svg} aria-hidden="true">
          <line x1="45" y1="185" x2="475" y2="185" className={styles.axis} />
          {[
            { x: 85, value: before, className: styles.barMuted },
            { x: 225, value: spike, className: styles.barSpike },
            { x: 365, value: after, className: styles.barAccent },
          ].map((bar) => {
            const height = barHeight(bar.value);
            return (
              <rect
                key={bar.x}
                x={bar.x}
                y={185 - height}
                width="70"
                height={height}
                rx="5"
                className={bar.className}
              />
            );
          })}
        </svg>
        <div className={shared.row}>
          <Readout label="Før tilsetning" value={<MathFormula tex="80" />} size="small" />
          <Readout label="Tilsatt" value={<MathFormula tex="+20" />} size="small" />
          <Readout label="Målt etter" value={<MathFormula tex={texNumber(after, 1)} />} size="small" />
        </div>
        <Readout
          label="Gjenvinning"
          value={<MathFormula tex={"R = \\frac{" + texNumber(after, 1) + " - 80}{20} \\cdot 100\\,\\% = " + texNumber(recovery, 0) + "\\,\\%"} />}
          size="small"
          tone={recovery < 80 || recovery > 105 ? "warning" : "normal"}
        />
        <Verdict reserve={3.2}>{verdict}</Verdict>
        <Slider
          label="Gjenfunnet andel av tilsetningen"
          valueText={comma(recovery, 0) + " prosent gjenvinning; " + comma(missing, 0) + " prosent av tilsetningen mangler"}
          value={recovery}
          onChange={setRecovery}
          min={50}
          max={115}
          step={1}
          ends={["mye mangler", "over 100 %"]}
        />
      </div>
    </DemonstrationFrame>
  );
}

export function UtvidetUsikkerhetDemo() {
  const [coverageFactor, setCoverageFactor] = useState(2);
  const center = 100;
  const standardUncertainty = 1.5;
  const expanded = coverageFactor * standardUncertainty;
  const lower = center - expanded;
  const upper = center + expanded;
  const x = (value: number) => 40 + ((value - 94) / 12) * 440;

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Endre dekningsfaktoren og se intervallet vokse rundt samme måleresultat."
      label="Utvidet måleusikkerhet som intervall rundt et resultat"
      afterword="Sammenhengen \(U = k u_c\) bestemmer bredden. Hvilken dekning intervallet representerer avhenger i tillegg av fordelingsforutsetningene og hvordan \(k\) er valgt."
    >
      <div className={shared.stack}>
        <svg viewBox="0 0 520 180" className={shared.svg} aria-hidden="true">
          <line x1="40" y1="90" x2="480" y2="90" className={styles.axis} />
          <rect
            x={x(lower)}
            y="68"
            width={x(upper) - x(lower)}
            height="44"
            rx="6"
            className={styles.intervalBand}
          />
          <line x1={x(lower)} y1="60" x2={x(lower)} y2="120" className={styles.intervalCap} />
          <line x1={x(upper)} y1="60" x2={x(upper)} y2="120" className={styles.intervalCap} />
          <line x1={x(center)} y1="48" x2={x(center)} y2="132" className={styles.intervalCenter} />
        </svg>
        <div className={shared.row}>
          <Readout label="Kombinert standardusikkerhet" value={<MathFormula tex="u_c = 1{,}5" />} size="small" />
          <Readout label="Utvidet usikkerhet" value={<MathFormula tex={"U = " + texNumber(expanded, 2)} />} size="small" />
        </div>
        <Readout
          label="Rapportert intervall"
          value={<MathFormula tex={"100 \\pm " + texNumber(expanded, 2) + " \\;=\\; [" + texNumber(lower, 2) + ";\\," + texNumber(upper, 2) + "]"} />}
          size="small"
        />
        <Slider
          label="Dekningsfaktor for utvidet måleusikkerhet"
          valueText={"k " + comma(coverageFactor, 1) + "; U " + comma(expanded, 2)}
          value={coverageFactor}
          onChange={setCoverageFactor}
          min={1}
          max={3}
          step={0.1}
          ends={["smalere intervall", "bredere intervall"]}
        />
      </div>
    </DemonstrationFrame>
  );
}

export function DekningsfaktorDemo() {
  const [coverageFactor, setCoverageFactor] = useState(2);
  const coverage = normalCoverage(coverageFactor) * 100;

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Endre \(k\) og se hvor mye av en standard normalfordeling som ligger innenfor intervallet."
      label="Dekningsfaktor som bredde og dekningsareal"
      afterword="Arealet er en normalfordelingsillustrasjon. I reelle usikkerhetsbudsjetter kan passende \(k\) blant annet avhenge av ønsket dekning, effektive frihetsgrader og fordelingsform."
    >
      <div className={shared.stack}>
        <svg viewBox="0 0 520 205" className={shared.svg} aria-hidden="true">
          <path d={normalAreaPath(coverageFactor)} className={styles.coverageArea} />
          <path d={normalCurvePath()} className={styles.distributionCurve} />
          <line x1="40" y1="180" x2="480" y2="180" className={styles.axis} />
        </svg>
        <div className={shared.row}>
          <Readout label="Dekningsfaktor" value={<MathFormula tex={"k = " + texNumber(coverageFactor, 1)} />} size="small" />
          <Readout
            label="Areal i normalillustrasjonen"
            value={<MathFormula tex={"P(|Z| \\le k) \\approx " + texNumber(coverage, 1) + "\\,\\%"} />}
            size="small"
          />
        </div>
        <Slider
          label="Dekningsfaktor k"
          valueText={"k " + comma(coverageFactor, 1) + "; omtrent " + comma(coverage, 1) + " prosent av standard normalfordelingen"}
          value={coverageFactor}
          onChange={setCoverageFactor}
          min={1}
          max={3}
          step={0.1}
          ends={["mindre dekningsareal", "større dekningsareal"]}
        />
      </div>
    </DemonstrationFrame>
  );
}

export function SelektivitetDemo() {
  const [interference, setInterference] = useState(35);
  const analyteCenter = 235;
  const interferentCenter = 285;
  const width = 42;
  const overlapFraction = Math.exp(-0.5 * ((analyteCenter - interferentCenter) / width) ** 2);
  const interferenceAtAnalyte = interference * overlapFraction * 0.45;
  const apparent = 100 + interferenceAtAnalyte;

  const verdict =
    interferenceAtAnalyte < 5
      ? "Interferenten bidrar lite ved analyttposisjonen i denne illustrasjonen."
      : interferenceAtAnalyte < 15
        ? "Interferenten gir et synlig bidrag og flytter det tilsynelatende analyttsignalet."
        : "Interferenten dominerer nå en betydelig del av signalet der analytten måles.";

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Øk interferentsignalet mens analyttmengden holdes konstant."
      label="Selektivitet som evne til å holde analyttsvaret uavhengig av interferenten"
      afterword="Dette er en konseptuell signalillustrasjon, ikke et generelt akseptkriterium. Selektivitet må dokumenteres mot relevante interferenter og den konkrete måleprosedyren."
    >
      <div className={shared.stack}>
        <svg viewBox="0 0 520 220" className={shared.svg} aria-hidden="true">
          <line x1="45" y1="185" x2="475" y2="185" className={styles.axis} />
          <path d={gaussianPath(analyteCenter, width, 115)} className={styles.analyteCurve} />
          <path d={gaussianPath(interferentCenter, width, interference)} className={styles.interferentCurve} />
          <line x1={analyteCenter} y1="42" x2={analyteCenter} y2="185" className={styles.guideLine} />
        </svg>
        <div className={shared.row}>
          <Readout label="Sant analyttsignal" value={<MathFormula tex="100" />} size="small" />
          <Readout
            label="Illustrert interferentbidrag"
            value={<MathFormula tex={"+" + texNumber(interferenceAtAnalyte, 1)} />}
            size="small"
            tone={interferenceAtAnalyte >= 15 ? "warning" : "normal"}
          />
          <Readout
            label="Tilsynelatende signal"
            value={<MathFormula tex={texNumber(apparent, 1)} />}
            size="small"
            tone={interferenceAtAnalyte >= 15 ? "warning" : "normal"}
          />
        </div>
        <Verdict reserve={3}>{verdict}</Verdict>
        <Slider
          label="Styrke på interferentsignalet"
          valueText={comma(interference, 0) + " relative enheter; illustrert bidrag ved analytten " + comma(interferenceAtAnalyte, 1)}
          value={interference}
          onChange={setInterference}
          min={0}
          max={100}
          step={1}
          ends={["ingen interferent", "sterk interferent"]}
        />
      </div>
    </DemonstrationFrame>
  );
}

export function SpesifisitetDemo() {
  return (
    <DemonstrationFrame
      kind="sammenligning"
      instruction="Skill mellom det foretrukne begrepet og sektoravhengig språkbruk."
      label="Terminologien selektivitet og spesifisitet"
      afterword="IUPAC og Eurachem foretrekker selektivitet; «spesifisitet» brukes ulikt mellom fagområder."
    >
      <div className={styles.columns}>
        <div><span className={styles.cardTitle}>Selektivitet</span><p className={shared.note}>Definert måleegenskap: analytten kan bestemmes uavhengig av relevante interferenter.</p></div>
        <div><span className={styles.cardTitle}>Spesifisitet</span><p className={shared.note}>Brukes i noen sektorer som synonym eller om svært høy selektivitet. Betydningen må oppgis.</p></div>
      </div>
    </DemonstrationFrame>
  );
}

export function FolsomhetDemo() {
  const [slope, setSlope] = useState(1.4);
  const deltaX = 40;
  const deltaY = slope * deltaX;
  const x = (concentration: number) => 55 + concentration * 4.6;
  const y = (response: number) => 188 - response * 0.68;
  const lineEndX = x(85);
  const lineEndY = y(slope * 85);
  const x1 = x(20);
  const x2 = x(60);
  const y1 = y(slope * 20);
  const y2 = y(slope * 60);

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Endre stigningstallet og se hvor stor signalendring samme konsentrasjonsendring gir."
      label="Følsomhet som stigningstall på en kalibreringsrespons"
      afterword="Følsomhet er endring i signal per endring i konsentrasjon. Høy følsomhet er ikke det samme som lav deteksjonsgrense."
    >
      <div className={shared.stack}>
        <svg viewBox="0 0 520 220" className={shared.svg} aria-hidden="true">
          <line x1="55" y1="188" x2="485" y2="188" className={styles.axis} />
          <line x1="55" y1="188" x2="55" y2="30" className={styles.axis} />
          <line x1="55" y1="188" x2={lineEndX} y2={lineEndY} className={styles.lineAccent} />
          <line x1={x1} y1={y1} x2={x2} y2={y1} className={styles.deltaGuide} />
          <line x1={x2} y1={y1} x2={x2} y2={y2} className={styles.deltaGuide} />
          <circle cx={x1} cy={y1} r="5" className={styles.point} />
          <circle cx={x2} cy={y2} r="5" className={styles.point} />
        </svg>
        <div className={shared.row}>
          <Readout label="Fast konsentrasjonsendring" value={<MathFormula tex="\\Delta x = 40" />} size="small" />
          <Readout label="Signalendring" value={<MathFormula tex={"\\Delta y = " + texNumber(deltaY, 1)} />} size="small" />
          <Readout label="Følsomhet" value={<MathFormula tex={"S = \\frac{\\Delta y}{\\Delta x} = " + texNumber(slope, 2)} />} size="small" />
        </div>
        <Slider
          label="Stigningstall for kalibreringsresponsen"
          valueText={"stigningstall " + comma(slope, 2) + "; signalendring " + comma(deltaY, 1)}
          value={slope}
          onChange={setSlope}
          min={0.5}
          max={2.5}
          step={0.1}
          ends={["lavere følsomhet", "høyere følsomhet"]}
        />
      </div>
    </DemonstrationFrame>
  );
}

export function RobusthetDemo() {
  const [ph, setPh] = useState(7);
  const response = 100 - 20 * (ph - 7) ** 2;
  const acceptable = response >= 98 && response <= 102;
  const x = (value: number) => 45 + ((value - 6.5) / 1) * 430;
  const y = (value: number) => 185 - ((value - 94) / 9) * 135;
  const curve = Array.from({ length: 41 }, (_, index) => {
    const value = 6.5 + index * 0.025;
    const result = 100 - 20 * (value - 7) ** 2;
    return (index === 0 ? "M" : "L") + x(value).toFixed(1) + " " + y(result).toFixed(1);
  }).join(" ");

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Gjør en liten, tilsiktet pH-endring og se om ytelsen holder seg innenfor det forhåndsdefinerte området."
      label="Robusthet som ytelse rundt en nominell metodeinnstilling"
      afterword="Én parameter er isolert for å gjøre mekanismen synlig. En virkelig robusthetsstudie kan måtte variere flere relevante betingelser og bruke metodebestemte ytelseskrav."
    >
      <div className={shared.stack}>
        <svg viewBox="0 0 520 220" className={shared.svg} aria-hidden="true">
          <rect x="45" y={y(102)} width="430" height={y(98) - y(102)} className={styles.acceptanceBand} />
          <line x1="45" y1="185" x2="475" y2="185" className={styles.axis} />
          <path d={curve} className={styles.lineAccent} />
          <circle
            cx={x(ph)}
            cy={y(response)}
            r="7"
            className={acceptable ? styles.point : styles.pointWarning}
          />
        </svg>
        <div className={shared.row}>
          <Readout label="Metodeinnstilling" value={<MathFormula tex={"\\mathrm{pH} = " + texNumber(ph, 2)} />} size="small" />
          <Readout
            label="Relativ ytelse i illustrasjonen"
            value={<MathFormula tex={texNumber(response, 1) + "\\,\\%"} />}
            size="small"
            tone={acceptable ? "normal" : "warning"}
          />
        </div>
        <Verdict reserve={3}>
          {acceptable
            ? "Denne lille endringen holder den illustrerte ytelsen innenfor det forhåndsdefinerte området 98–102 %."
            : "Ved denne endringen ligger den illustrerte ytelsen utenfor det forhåndsdefinerte området 98–102 %."}
        </Verdict>
        <Slider
          label="pH i robusthetsillustrasjonen"
          valueText={"pH " + comma(ph, 2) + "; relativ ytelse " + comma(response, 1) + " prosent"}
          value={ph}
          onChange={setPh}
          min={6.5}
          max={7.5}
          step={0.05}
          ends={["pH 6,5", "pH 7,5"]}
        />
      </div>
    </DemonstrationFrame>
  );
}

export function SporbarhetDemo() {
  return (
    <DemonstrationFrame
      kind="stegvis"
      instruction="Følg den dokumenterte kjeden bak resultatet."
      label="Metrologisk sporbarhetskjede"
      afterword="Hvert ledd bidrar med måleusikkerhet; en ubrutt kjede gjør ikke i seg selv resultatet feilfritt eller egnet til formålet."
    >
      <Flow items={["Prøveresultat", "Kalibreringsstandard", "Referansemateriale / referanse", "Definert referanse eller SI-enhet"]} />
    </DemonstrationFrame>
  );
}

export function ValideringDemo() {
  return (
    <DemonstrationFrame
      kind="stegvis"
      instruction="Start med bruken metoden skal ha — ikke med testene."
      label="Validering fra tiltenkt bruk til dokumentert egnethet"
      afterword="Validering er formålsstyrt: kravene må både være passende for bruken og dokumentert oppfylt."
    >
      <Flow items={["Definer tiltenkt bruk", "Sett relevante ytelseskrav", "Samle objektiv evidens", "Konkluder om metoden er egnet"]} />
    </DemonstrationFrame>
  );
}

export function VerifiseringDemo() {
  return (
    <DemonstrationFrame
      kind="stegvis"
      instruction="Kontroller at spesifiserte krav faktisk oppfylles i den aktuelle situasjonen."
      label="Verifisering av spesifiserte krav"
      afterword="Verifisering spør om krav er oppfylt; validering spør i tillegg om kravene er riktige for den tiltenkte bruken."
    >
      <Flow items={["Spesifiserte krav", "Lokal gjennomføring og data", "Sammenlign med krav", "Dokumenter oppfylt / ikke oppfylt"]} />
    </DemonstrationFrame>
  );
}

export function KontrollkortDemo() {
  const [levelShift, setLevelShift] = useState(0);
  const baseline = [99.7, 100.4, 99.5, 100.2, 99.8, 100.3, 100.1, 99.6, 100.4, 99.9];
  const points = baseline.map((value, index) => value + (index >= 5 ? levelShift : 0));
  const center = 100;
  const lowerLimit = 97;
  const upperLimit = 103;
  const outside = points.filter((value) => value < lowerLimit || value > upperLimit).length;
  const x = (index: number) => 55 + index * 45;
  const y = (value: number) => 185 - ((value - 94) / 12) * 145;
  const polyline = points.map((value, index) => x(index) + "," + y(value).toFixed(1)).join(" ");

  const verdict =
    outside > 0
      ? outside + " kontrollpunkt ligger utenfor de faste kontrollgrensene i denne illustrasjonen."
      : levelShift >= 1
        ? "Kontrollpunktene etter måling 5 har flyttet seg oppover, selv om de fortsatt ligger innenfor grensene."
        : "Kontrollpunktene varierer rundt senterlinjen uten et påført nivåskift.";

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Legg inn et nivåskift fra måling 6 og se mønsteret endres mens kontrollgrensene står fast."
      label="Kontrollkort som synliggjør stabilitet og nivåskift over tid"
      afterword="Kontrollgrensene er faste i illustrasjonen og beskriver prosessens forventede variasjon. Formelle kontrollkortregler kan i tillegg bruke løp, trender og andre mønstre; disse evalueres ikke her."
    >
      <div className={shared.stack}>
        <svg viewBox="0 0 520 220" className={shared.svg} aria-hidden="true">
          <line x1="45" y1={y(upperLimit)} x2="480" y2={y(upperLimit)} className={styles.controlLimit} />
          <line x1="45" y1={y(center)} x2="480" y2={y(center)} className={styles.controlCenter} />
          <line x1="45" y1={y(lowerLimit)} x2="480" y2={y(lowerLimit)} className={styles.controlLimit} />
          <polyline points={polyline} className={styles.controlSeries} />
          {points.map((value, index) => (
            <circle
              key={index}
              cx={x(index)}
              cy={y(value)}
              r="6"
              className={value < lowerLimit || value > upperLimit ? styles.pointWarning : styles.point}
            />
          ))}
        </svg>
        <div className={shared.row}>
          <Readout label="Senterlinje" value={<MathFormula tex="100" />} size="small" />
          <Readout label="Kontrollgrenser" value={<MathFormula tex="97 \\;\\text{til}\\; 103" />} size="small" />
          <Readout
            label="Punkter utenfor grenser"
            value={<MathFormula tex={String(outside)} />}
            size="small"
            tone={outside > 0 ? "warning" : "normal"}
          />
        </div>
        <Verdict reserve={3}>{verdict}</Verdict>
        <Slider
          label="Nivåskift fra måling 6"
          valueText={"nivåskift " + comma(levelShift, 1) + "; " + outside + " punkt utenfor kontrollgrensene"}
          value={levelShift}
          onChange={setLevelShift}
          min={0}
          max={5}
          step={0.5}
          ends={["ingen nivåendring", "tydelig nivåskift"]}
        />
      </div>
    </DemonstrationFrame>
  );
}

