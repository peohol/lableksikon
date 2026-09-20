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

export function GjenvinningDemo() {
  return (
    <DemonstrationFrame
      kind="formel"
      instruction="Følg hva som skjer når en kjent mengde analytt tilsettes prøven."
      label="Spike recovery beregnet fra før- og ettermåling"
      afterword="Her er spike recovery \((98-80)/20 = 90\,\%\). Ordet recovery brukes også om andre størrelser."
    >
      <div className={styles.formulaLine}>
        <span>Før: 80</span><span>+ spike: 20</span><span>målt etter: 98</span><strong>90 %</strong>
      </div>
    </DemonstrationFrame>
  );
}

export function UtvidetUsikkerhetDemo() {
  return (
    <DemonstrationFrame
      kind="formel"
      instruction="Se hvordan standardusikkerhet blir til utvidet usikkerhet."
      label="Utvidet måleusikkerhet fra kombinert standardusikkerhet"
      afterword="\(k = 2\) gir ofte omtrent 95 % dekning, men bare under passende fordelingsforutsetninger."
    >
      <div className={styles.formulaLine}><span>{"\\(u_c = 1{,}5\\)"}</span><span>{"\\(k = 2\\)"}</span><strong>{"\\(U = 3{,}0\\)"}</strong><span>{"\\(100 \\pm 3\\)"}</span></div>
    </DemonstrationFrame>
  );
}

export function DekningsfaktorDemo() {
  return (
    <DemonstrationFrame
      kind="sammenligning"
      instruction="Sammenlign intervallet når samme standardusikkerhet multipliseres med ulike \(k\)."
      label="Dekningsfaktor og intervallbredde"
      afterword="Større \(k\) gir et bredere intervall; ønsket dekning og sannsynlighetsfordeling bestemmer passende \(k\)."
    >
      <ValueRows rows={[{ label: "\\(k = 1\\)", values: "98,5 ├──── 100 ────┤ 101,5" }, { label: "\\(k = 2\\)", values: "97,0 ├──────── 100 ────────┤ 103,0" }]} />
    </DemonstrationFrame>
  );
}

export function SelektivitetDemo() {
  return (
    <DemonstrationFrame
      kind="sammenligning"
      instruction="Se om analyttsignalet kan bestemmes uten at interferenten endrer svaret."
      label="Selektiv måling i nærvær av interferent"
      afterword="Selektivitet handler om hvor uavhengig analyttresultatet er av andre relevante komponenter."
    >
      <div className={styles.columns}>
        <div><span className={styles.cardTitle}>Bare analytt</span><strong className={styles.signal}>100</strong></div>
        <div><span className={styles.cardTitle}>Analytt + interferent</span><strong className={styles.signal}>101</strong></div>
        <div><span className={styles.cardTitle}>Dårlig selektiv metode</span><strong className={styles.signal}>132</strong></div>
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
  return (
    <DemonstrationFrame
      kind="sammenligning"
      instruction="Sammenlign hvor mye signalet endres for samme konsentrasjonsendring."
      label="Følsomhet som stigningstall"
      afterword="Brattere respons betyr høyere følsomhet; det er ikke det samme som lav deteksjonsgrense."
    >
      <svg viewBox="0 0 420 220" className={shared.svg} role="img" aria-label="To rette linjer med ulik stigning">
        <line x1="45" y1="180" x2="390" y2="180" className={styles.axis} />
        <line x1="45" y1="180" x2="45" y2="25" className={styles.axis} />
        <line x1="45" y1="170" x2="360" y2="80" className={styles.lineMuted} />
        <line x1="45" y1="170" x2="300" y2="30" className={styles.lineAccent} />
        <text x="305" y="28" className={styles.svgText}>høy følsomhet</text>
        <text x="300" y="105" className={styles.svgText}>lav følsomhet</text>
      </svg>
    </DemonstrationFrame>
  );
}

export function RobusthetDemo() {
  return (
    <DemonstrationFrame
      kind="sammenligning"
      instruction="Gjør små, tilsiktede metodeendringer og se om resultatet holder seg akseptabelt."
      label="Robusthet ved små endringer i driftsbetingelser"
      afterword="Robusthet vurderes mot på forhånd definerte ytelseskrav, ikke mot at resultatet er helt uendret."
    >
      <ValueRows rows={[{ label: "Standard", values: "100,0" }, { label: "pH +0,2", values: "99,6" }, { label: "Flow −5 %", values: "100,4" }, { label: "Kolonne +2 °C", values: "99,8" }]} />
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
  const points = [104, 98, 101, 103, 99, 105, 102, 100, 101, 112];
  return (
    <DemonstrationFrame
      kind="illustrasjon"
      instruction="Følg kontrollresultater over tid og se etter signal om at prosessen har endret seg."
      label="Shewhart-lignende kontrollkort med ett punkt utenfor kontrollgrensen"
      afterword="Kontrollgrenser beskriver prosessens statistiske stabilitet og er ikke det samme som spesifikasjons- eller akseptgrenser."
    >
      <svg viewBox="0 0 520 230" className={shared.svg} role="img" aria-label="Kontrollkort med senterlinje, øvre og nedre kontrollgrense og ti punkter">
        <line x1="45" y1="115" x2="490" y2="115" className={styles.lineAccent} />
        <line x1="45" y1="45" x2="490" y2="45" className={styles.limit} />
        <line x1="45" y1="185" x2="490" y2="185" className={styles.limit} />
        {points.map((value, index) => {
          const x = 55 + index * 46;
          const y = 115 - (value - 100) * 8;
          return <circle key={`${value}-${index}`} cx={x} cy={y} r="6" className={value > 108 ? styles.pointWarning : styles.point} />;
        })}
      </svg>
    </DemonstrationFrame>
  );
}
