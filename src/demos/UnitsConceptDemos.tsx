"use client";

import { useState } from "react";

import { DemonstrationFrame } from "@/components/DemonstrationFrame";
import { MathFormula } from "@/components/MathFormula";
import { comma } from "@/lib/statistics";
import { Chip, ChipGroup, Readout, Slider, Verdict } from "./primitives";
import shared from "./demos.module.css";
import styles from "./UnitsConceptDemos.module.css";

const texNumber = (value: number, digits = 1) =>
  comma(value, digits).replace(",", "{,}");

const derivedUnits = {
  Pa: {
    label: "pascal",
    tex: "\\mathrm{Pa}=\\mathrm{kg}\\,\\mathrm{m}^{-1}\\,\\mathrm{s}^{-2}",
    ingredients: ["kg", "m", "s"],
    description: "Trykk bygges fra masse, lengde og tid.",
  },
  J: {
    label: "joule",
    tex: "\\mathrm{J}=\\mathrm{kg}\\,\\mathrm{m}^{2}\\,\\mathrm{s}^{-2}",
    ingredients: ["kg", "m", "s"],
    description: "Energi bruker de samme baseenhetene, men med en annen kombinasjon.",
  },
  V: {
    label: "volt",
    tex: "\\mathrm{V}=\\mathrm{kg}\\,\\mathrm{m}^{2}\\,\\mathrm{s}^{-3}\\,\\mathrm{A}^{-1}",
    ingredients: ["kg", "m", "s", "A"],
    description: "Elektrisk potensial kobler også inn ampere.",
  },
} as const;

export function SiSystemDemo() {
  const [unit, setUnit] = useState<keyof typeof derivedUnits>("Pa");
  const selected = derivedUnits[unit];
  const baseUnits = ["s", "m", "kg", "A", "K", "mol", "cd"];

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Velg en avledet SI-enhet og se hvilke baseenheter som inngår som byggesteiner."
      label="SI kobler sju baseenheter til et stort system av avledede enheter"
      afterword="Figuren viser enhetsalgebra, ikke definisjonen av SI-konstantene. Siden 2019 er SI definert ved fastsatte verdier for sju definerende konstanter."
    >
      <div className={shared.stack}>
        <div className={styles.baseGrid} aria-label="De sju SI-baseenhetene">
          {baseUnits.map((base) => (
            <div
              key={base}
              className={
                selected.ingredients.includes(base as never)
                  ? styles.baseUnitActive
                  : styles.baseUnit
              }
            >
              <MathFormula tex={base === "mol" ? "\\mathrm{mol}" : "\\mathrm{" + base + "}"} />
            </div>
          ))}
        </div>
        <div className={styles.unitArrow} aria-hidden="true">↓</div>
        <div className={styles.derivedCard}>
          <strong>{selected.label}</strong>
          <MathFormula tex={selected.tex} display />
        </div>
        <ChipGroup label="Avledet SI-enhet">
          <Chip variant="choice" pressed={unit === "Pa"} onClick={() => setUnit("Pa")}>Pa</Chip>
          <Chip variant="choice" pressed={unit === "J"} onClick={() => setUnit("J")}>J</Chip>
          <Chip variant="choice" pressed={unit === "V"} onClick={() => setUnit("V")}>V</Chip>
        </ChipGroup>
        <Verdict reserve={2.8}>{selected.description}</Verdict>
      </div>
    </DemonstrationFrame>
  );
}

export function MolmasseDemo() {
  const [amount, setAmount] = useState(0.25);
  const molarMass = 40;
  const mass = amount * molarMass;
  const fill = 24 + amount * 170;

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Endre stoffmengden mens molmassen holdes fast og se massen følge direkte."
      label="Molmassen er koblingen mellom stoffmengde og masse"
      afterword="Molmasse er masse per stoffmengde. Den numeriske verdien avhenger av hvilke enheter som brukes; her brukes g/mol."
    >
      <div className={shared.stack}>
        <svg viewBox="0 0 520 250" className={shared.svg} aria-hidden="true">
          <path d="M180 35 L340 35 L320 220 L200 220 Z" className={styles.vesselOutline} />
          <rect x="204" y={220 - fill} width="112" height={fill} rx="8" className={styles.substanceFill} />
          <line x1="365" y1="65" x2="365" y2="215" className={styles.scaleLine} />
          <circle cx="365" cy={215 - mass * 8} r="9" className={styles.scaleMarker} />
        </svg>
        <div className={shared.row}>
          <Readout label="Molmasse" value={<MathFormula tex="M=40{,}0\\,\\mathrm{g/mol}" />} size="small" />
          <Readout label="Stoffmengde" value={<MathFormula tex={"n=" + texNumber(amount, 2) + "\\,\\mathrm{mol}"} />} size="small" />
          <Readout label="Masse" value={<MathFormula tex={"m=nM=" + texNumber(mass, 1) + "\\,\\mathrm{g}"} />} size="small" />
        </div>
        <Slider
          label="Stoffmengde for molmasseillustrasjonen"
          valueText={"stoffmengde " + comma(amount, 2) + " mol; masse " + comma(mass, 1) + " gram"}
          value={amount}
          onChange={setAmount}
          min={0.05}
          max={0.5}
          step={0.05}
          ends={["lite stoff", "mer stoff"]}
        />
      </div>
    </DemonstrationFrame>
  );
}

export function MolaritetDemo() {
  const [volume, setVolume] = useState(0.5);
  const amount = 0.1;
  const concentration = amount / volume;
  const liquidHeight = 45 + volume * 245;
  const dotRows = Math.max(1, Math.round(amount * 100));

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Endre sluttvolumet med samme stoffmengde og se konsentrasjonen og partikkeltettheten endres."
      label="Stoffmengdekonsentrasjon bruker den ferdige løsningens volum"
      afterword="Demoen holder stoffmengden fast. Nevneren i c=n/V er sluttvolumet av løsningen, ikke mengden løsemiddel som ble tilsatt før tillaging."
    >
      <div className={shared.stack}>
        <svg viewBox="0 0 520 280" className={shared.svg} aria-hidden="true">
          <path d="M165 35 L355 35 L330 245 L190 245 Z" className={styles.vesselOutline} />
          <rect x="194" y={245 - liquidHeight} width="132" height={liquidHeight} rx="8" className={styles.solutionFill} />
          {Array.from({ length: dotRows }, (_, index) => (
            <circle
              key={index}
              cx={215 + (index % 5) * 23}
              cy={232 - (index % 2) * 22 - Math.floor(index / 5) * 8}
              r="6"
              className={styles.soluteDot}
            />
          ))}
        </svg>
        <div className={shared.row}>
          <Readout label="Stoffmengde" value={<MathFormula tex="n=0{,}100\\,\\mathrm{mol}" />} size="small" />
          <Readout label="Sluttvolum" value={<MathFormula tex={"V=" + texNumber(volume, 2) + "\\,\\mathrm{L}"} />} size="small" />
          <Readout label="Konsentrasjon" value={<MathFormula tex={"c=n/V=" + texNumber(concentration, 3) + "\\,\\mathrm{mol/L}"} />} size="small" />
        </div>
        <Slider
          label="Sluttvolum i molaritetsillustrasjonen"
          valueText={"sluttvolum " + comma(volume, 2) + " liter; konsentrasjon " + comma(concentration, 3) + " mol per liter"}
          value={volume}
          onChange={setVolume}
          min={0.25}
          max={1}
          step={0.05}
          ends={["lite sluttvolum", "stort sluttvolum"]}
        />
      </div>
    </DemonstrationFrame>
  );
}

export function MasseprosentDemo() {
  const [analyteMass, setAnalyteMass] = useState(5);
  const solventMass = 100;
  const total = analyteMass + solventMass;
  const percent = (analyteMass / total) * 100;
  const analyteShare = (analyteMass / total) * 100;

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Endre analyttmassen mens løsemiddelmassen holdes fast og se både telleren og totalmassen endres."
      label="Masseprosent bruker total masse som nevner"
      afterword="Når 5 g analytt tilsettes 100 g løsemiddel, er totalmassen 105 g. Derfor blir massefraksjonen 5/105 og ikke 5/100."
    >
      <div className={shared.stack}>
        <div className={styles.stackBar} aria-label="Stablet masse av analytt og løsemiddel">
          <div className={styles.analyteSegment} style={{ width: String(analyteShare) + "%" }} />
          <div className={styles.solventSegment} style={{ width: String(100 - analyteShare) + "%" }} />
        </div>
        <div className={shared.row}>
          <Readout label="Analytt" value={<MathFormula tex={texNumber(analyteMass, 1) + "\\,\\mathrm{g}"} />} size="small" />
          <Readout label="Løsemiddel" value={<MathFormula tex="100{,}0\\,\\mathrm{g}" />} size="small" />
          <Readout label="Total masse" value={<MathFormula tex={texNumber(total, 1) + "\\,\\mathrm{g}"} />} size="small" />
          <Readout label="Masseprosent" value={<MathFormula tex={"w=\\frac{" + texNumber(analyteMass, 1) + "}{" + texNumber(total, 1) + "}\\cdot100\\%=" + texNumber(percent, 2) + "\\%"} />} size="small" />
        </div>
        <Slider
          label="Analyttmasse i masseprosentillustrasjonen"
          valueText={"analyttmasse " + comma(analyteMass, 1) + " gram; total masse " + comma(total, 1) + " gram; masseprosent " + comma(percent, 2)}
          value={analyteMass}
          onChange={setAnalyteMass}
          min={1}
          max={50}
          step={1}
          ends={["lite analytt", "mer analytt"]}
        />
      </div>
    </DemonstrationFrame>
  );
}

export function PpmDemo() {
  const [depth, setDepth] = useState<1 | 2 | 3>(3);
  const denominator = depth === 1 ? 100 : depth === 2 ? 10000 : 1000000;
  const label = depth === 1 ? "1 %" : depth === 2 ? "100 ppm" : "1 ppm";
  const tex = depth === 1 ? "10^{-2}" : depth === 2 ? "10^{-4}" : "10^{-6}";

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Zoom trinnvis inn i én hundredel av én hundredel av én hundredel i stedet for å tegne én million enkeltpunkter."
      label="1 ppm er én milliondel — et dimensjonsløst forhold på 10⁻⁶"
      afterword="ppm må alltid knyttes til hvilken fraksjon som menes. 1 mg/kg er 1 ppm som massefraksjon, men 1 mg/L er en massekonsentrasjon og er ikke generelt det samme som 1 ppm."
    >
      <div className={shared.stack}>
        <div className={styles.zoomChain} aria-label="Tre zoomnivåer som viser forholdet fra én hundredel til én milliondel">
          {[1, 2, 3].map((level) => (
            <div key={level} className={level <= depth ? styles.zoomPanelActive : styles.zoomPanel}>
              <div className={styles.miniGrid} aria-hidden="true">
                {Array.from({ length: 100 }, (_, index) => (
                  <span key={index} className={index === 0 ? styles.highlightCell : styles.gridCell} />
                ))}
              </div>
              <span className={styles.zoomCaption}>
                {level === 1 ? "1 av 100" : level === 2 ? "1 av 10 000" : "1 av 1 000 000"}
              </span>
            </div>
          ))}
        </div>
        <ChipGroup label="Zoomdybde for ppm">
          <Chip variant="choice" pressed={depth === 1} onClick={() => setDepth(1)}>1 %</Chip>
          <Chip variant="choice" pressed={depth === 2} onClick={() => setDepth(2)}>100 ppm</Chip>
          <Chip variant="choice" pressed={depth === 3} onClick={() => setDepth(3)}>1 ppm</Chip>
        </ChipGroup>
        <div className={shared.row}>
          <Readout label="Valgt forhold" value={label} size="small" />
          <Readout label="Brøk" value={<MathFormula tex={"1/" + denominator} />} size="small" />
          <Readout label="Ti-potens" value={<MathFormula tex={tex} />} size="small" />
        </div>
        <Verdict reserve={2.8}>
          Hvert ekstra zoomtrinn velger én hundredel av det forrige området. Tre slike trinn gir 1/100³ = 1/1 000 000.
        </Verdict>
      </div>
    </DemonstrationFrame>
  );
}
