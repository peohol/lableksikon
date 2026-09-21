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
  return (
    <DemonstrationFrame
      kind="illustrasjon"
      instruction="Følg hvordan kjente kalibratorer etablerer sammenhengen mellom nivå og respons."
      label="Kalibreringskurve med fem kalibratorer og en tilpasset linje"
      afterword="Kurven uttrykker relasjonen mellom respons og analyttnivå; en måleverdi krever i tillegg at denne relasjonen brukes på ukjent respons."
    >
      <svg
        viewBox="0 0 520 250"
        className={shared.svg}
        role="img"
        aria-label="Fem kalibreringspunkter langs en stigende kalibreringslinje"
      >
        <line x1="55" y1="205" x2="485" y2="205" className={styles.axis} />
        <line x1="55" y1="205" x2="55" y2="30" className={styles.axis} />
        <line x1="70" y1="190" x2="460" y2="52" className={styles.lineAccent} />
        {[
          [90, 183],
          [170, 156],
          [250, 128],
          [330, 100],
          [430, 66],
        ].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="7" className={styles.point} />
        ))}
        <text x="395" y="230" className={styles.svgText}>analyttnivå</text>
        <text x="62" y="24" className={styles.svgText}>respons</text>
      </svg>
    </DemonstrationFrame>
  );
}

export function KvantifiseringsgrenseDemo() {
  return (
    <DemonstrationFrame
      kind="sammenligning"
      instruction="Sammenlign det å kunne oppdage analytt med det å kunne tallfeste den godt nok til formålet."
      label="Forskjellen mellom deteksjon og kvantifisering ved lave nivåer"
      afterword="LOQ bestemmes av et ytelseskrav, for eksempel presisjon eller måleusikkerhet, og er derfor ikke automatisk ti ganger blankens standardavvik."
    >
      <ValueRows
        rows={[
          { label: "Under LOD", values: "signal kan ikke skilles pålitelig fra blank" },
          {
            label: "Mellom LOD og LOQ",
            values: "tilstedeværelse kan være påvisbar, men tallverdien er ikke god nok",
          },
          { label: "Ved/over LOQ", values: "definert krav til kvantifisering er oppfylt" },
        ]}
      />
    </DemonstrationFrame>
  );
}

export function ResponsfaktorDemo() {
  return (
    <DemonstrationFrame
      kind="formel"
      instruction="Se hvordan respons per analyttnivå kan sammenlignes mellom to forbindelser."
      label="Responsfaktor som respons per analyttnivå"
      afterword="En responsfaktor er knyttet til det aktuelle målesystemet og betingelsene; ulike analytter kan gi ulik respons ved samme mengde."
    >
      <div className={styles.formulaLine}>
        <span>A: \(500/10 = 50\)</span>
        <span>B: \(300/10 = 30\)</span>
        <strong>A responderer 1,67 ganger sterkere</strong>
      </div>
    </DemonstrationFrame>
  );
}

export function ArbeidsomradeDemo() {
  return (
    <DemonstrationFrame
      kind="illustrasjon"
      instruction="Se området der metoden samtidig oppfyller de definerte kravene til måleresultatet."
      label="Arbeidsområde mellom nedre og øvre kvantifiseringsgrense"
      afterword="Et arbeidsområde bestemmes av egnet ytelse i området, ikke bare av at kalibreringspunktene kan trekkes gjennom en rett linje."
    >
      <div className={styles.rangeWrap}>
        <div className={styles.rangeLabels}>
          <span>LLOQ</span>
          <span>arbeidsområde</span>
          <span>ULOQ</span>
        </div>
        <div className={styles.rangeBar}>
          <span className={styles.rangeActive} />
        </div>
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
  return (
    <DemonstrationFrame
      kind="sammenligning"
      instruction="Se hvordan vekting endrer hvor mye ulike kalibratornivåer påvirker tilpasningen."
      label="Uvektet og vektet regresjon ved økende varians"
      afterword="Ved heteroskedastisitet kan passende vekting hindre at høye nivåer dominerer tilpasningen; vektene må velges og dokumenteres ut fra data."
    >
      <ValueRows
        rows={[
          { label: "Uvektet", values: "alle punkter får samme statistiske vekt" },
          { label: "\\(1/x\\)", values: "lave nivåer får større vekt enn høye" },
          { label: "\\(1/x^2\\)", values: "forskjellen i vekt blir enda sterkere" },
        ]}
      />
    </DemonstrationFrame>
  );
}

export function NullpunktDemo() {
  return (
    <DemonstrationFrame
      kind="illustrasjon"
      instruction="Se hvor en lineær kalibreringsmodell skjærer responsaksen når analyttnivået er null."
      label="Konstantledd i en lineær kalibreringsmodell"
      afterword="Et ikke-null konstantledd kan skyldes bakgrunn, blankbidrag eller modelltilpasning. Det skal ikke uten begrunnelse settes lik null."
    >
      <div className={styles.formulaLine}>
        <strong>\(y = a + bx\)</strong>
        <span>\(x = 0 \Rightarrow y = a\)</span>
        <span>\(a\) — konstantledd / skjæring</span>
      </div>
    </DemonstrationFrame>
  );
}

export function DriftDemo() {
  const points = [101, 102, 103, 104, 105, 107, 108, 109];
  return (
    <DemonstrationFrame
      kind="illustrasjon"
      instruction="Følg samme kontrollsignal gjennom en analyseserie."
      label="Gradvis instrumentell drift over tid"
      afterword="Drift er en tidsavhengig endring i instrumentets indikasjon som skyldes endringer i instrumentets metrologiske egenskaper, ikke en reell endring i prøven."
    >
      <svg
        viewBox="0 0 520 220"
        className={shared.svg}
        role="img"
        aria-label="Punkter som gradvis stiger gjennom analyseserien"
      >
        <line x1="45" y1="180" x2="490" y2="180" className={styles.axis} />
        <line x1="45" y1="180" x2="45" y2="25" className={styles.axis} />
        {points.map((value, index) => (
          <circle
            key={`${value}-${index}`}
            cx={70 + index * 55}
            cy={165 - (value - 100) * 12}
            r="6"
            className={styles.point}
          />
        ))}
        <line x1="70" y1="153" x2="455" y2="57" className={styles.lineAccent} />
      </svg>
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
  return (
    <DemonstrationFrame
      kind="sammenligning"
      instruction="Sammenlign kalibratorer i løsemiddel med kalibratorer laget i analyttfri prøvematriks."
      label="Matrikstilpasset kalibrering som mottiltak mot matriseeffekt"
      afterword="Matrikstilpasning kan redusere systematisk forskjell mellom kalibrator og prøve, men krever en egnet analyttfri eller på annen måte representativ matriks."
    >
      <div className={styles.columns}>
        <div>
          <span className={styles.cardTitle}>Løsemiddel</span>
          <strong className={styles.signal}>100</strong>
          <p className={shared.note}>respons ved kjent nivå</p>
        </div>
        <div>
          <span className={styles.cardTitle}>Prøvematriks</span>
          <strong className={styles.signal}>72</strong>
          <p className={shared.note}>samme nivå, men matrise undertrykker responsen</p>
        </div>
        <div>
          <span className={styles.cardTitle}>Matrikstilpasset standard</span>
          <strong className={styles.signal}>73</strong>
          <p className={shared.note}>kalibratoren etterligner prøveeffekten</p>
        </div>
      </div>
    </DemonstrationFrame>
  );
}
