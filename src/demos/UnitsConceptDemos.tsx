"use client";

import { useState } from "react";

import { DemonstrationFrame } from "@/components/DemonstrationFrame";
import { MathFormula } from "@/components/MathFormula";
import { comma } from "@/lib/statistics";
import { Chip, ChipGroup, Readout, Slider } from "./primitives";
import shared from "./demos.module.css";
import styles from "./UnitsConceptDemos.module.css";

const texNumber = (value: number, digits = 1) =>
  comma(value, digits).replace(",", "{,}");

const derivedUnits = {
  pa: {
    name: "pascal",
    symbol: "\\mathrm{Pa}",
    tex: "\\mathrm{kg}\\,\\mathrm{m}^{-1}\\,\\mathrm{s}^{-2}",
    active: ["kg", "m", "s"],
  },
  j: {
    name: "joule",
    symbol: "\\mathrm{J}",
    tex: "\\mathrm{kg}\\,\\mathrm{m}^{2}\\,\\mathrm{s}^{-2}",
    active: ["kg", "m", "s"],
  },
  c: {
    name: "coulomb",
    symbol: "\\mathrm{C}",
    tex: "\\mathrm{A}\\,\\mathrm{s}",
    active: ["A", "s"],
  },
} as const;

export function SiSystemDemo() {
  const [unit, setUnit] = useState<keyof typeof derivedUnits>("pa");
  const selected = derivedUnits[unit];
  const bases = ["s", "m", "kg", "A", "K", "mol", "cd"];

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Velg en avledet SI-enhet og se hvilke baseenheter den bygges av."
      label="SI-enheter kan bygges systematisk fra de sju baseenhetene"
      afterword="SI omfatter baseenheter og koherente avledede enheter. Siden 2019 er systemet definert gjennom fastsatte verdier for sju definerende konstanter."
    >
      <div className={shared.stack}>
        <div className={styles.baseGrid} aria-label="SI-baseenheter">
          {bases.map((base) => (
            <div
              key={base}
              role="group"
              aria-label={base + (selected.active.some((active) => active === base) ? " brukes i valgt avledet enhet" : " brukes ikke i valgt avledet enhet")}
              className={selected.active.some((active) => active === base) ? styles.baseTileActive : styles.baseTile}
            >
              <MathFormula tex={"\\mathrm{" + base + "}"} />
            </div>
          ))}
        </div>
        <div className={styles.compositionArrow} aria-hidden="true">↓</div>
        <Readout
          label={"Avledet enhet: " + selected.name}
          value={<MathFormula tex={selected.symbol + " = " + selected.tex} />}
          size="small"
        />
        <ChipGroup label="Avledet SI-enhet">
          <Chip variant="choice" pressed={unit === "pa"} onClick={() => setUnit("pa")}>Pa</Chip>
          <Chip variant="choice" pressed={unit === "j"} onClick={() => setUnit("j")}>J</Chip>
          <Chip variant="choice" pressed={unit === "c"} onClick={() => setUnit("c")}>C</Chip>
        </ChipGroup>
      </div>
    </DemonstrationFrame>
  );
}

export function MolmasseDemo() {
  const [amount, setAmount] = useState(0.25);
  const molarMass = 40;
  const mass = amount * molarMass;
  const dotCount = Math.max(2, Math.round(amount * 20));

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Endre stoffmengden mens molmassen holdes fast og se massen følge direkte."
      label="Molmasse kobler stoffmengde til masse"
      afterword="Molmasse er masse delt på stoffmengde. Når molmassen er kjent, følger massen lineært av stoffmengden."
    >
      <div className={shared.stack}>
        <svg viewBox="0 0 520 230" className={shared.svg} aria-hidden="true">
          <rect x="65" y="150" width="390" height="20" rx="10" className={styles.balanceBeam} />
          <circle cx="165" cy="150" r="42" className={styles.molePan} />
          <circle cx="355" cy="150" r="42" className={styles.massPan} />
          {Array.from({ length: dotCount }, (_, index) => (
            <circle
              key={index}
              cx={135 + (index % 5) * 15}
              cy={125 + Math.floor(index / 5) * 15}
              r="4"
              className={styles.amountDot}
            />
          ))}
          <rect x="327" y={142 - mass * 2.2} width="56" height={Math.max(10, mass * 2.2)} rx="6" className={styles.massBlock} />
        </svg>
        <div className={shared.row}>
          <Readout label="Molmasse" value={<MathFormula tex={"M = 40{,}0\\,\\mathrm{g/mol}"} />} size="small" />
          <Readout label="Stoffmengde" value={<MathFormula tex={"n = " + texNumber(amount, 2) + "\\,\\mathrm{mol}"} />} size="small" />
          <Readout label="Masse" value={<MathFormula tex={"m = nM = " + texNumber(mass, 1) + "\\,\\mathrm{g}"} />} size="small" />
        </div>
        <Slider
          label="Stoffmengde i molmasseillustrasjonen"
          valueText={"stoffmengde " + comma(amount, 2) + " mol; masse " + comma(mass, 1) + " gram"}
          value={amount}
          onChange={setAmount}
          min={0.1}
          max={1}
          step={0.05}
          ends={["mindre stoffmengde", "større stoffmengde"]}
        />
      </div>
    </DemonstrationFrame>
  );
}

export function MolaritetDemo() {
  const [volume, setVolume] = useState(0.5);
  const amount = 0.1;
  const concentration = amount / volume;
  const liquidHeight = 35 + volume * 75;

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Endre sluttvolumet mens stoffmengden holdes fast."
      label="Stoffmengdekonsentrasjon er stoffmengde per sluttvolum"
      afterword="Nevneren er den ferdige løsningens volum. Samme stoffmengde gir lavere konsentrasjon når sluttvolumet økes."
    >
      <div className={shared.stack}>
        <svg viewBox="0 0 520 280" className={shared.svg} aria-hidden="true">
          <path d="M185 35 L335 35 L315 235 L205 235 Z" className={styles.beakerOutline} />
          <rect x="210" y={232 - liquidHeight} width="100" height={liquidHeight} rx="8" className={styles.solution} />
          {Array.from({ length: 12 }, (_, index) => (
            <circle
              key={index}
              cx={223 + (index % 4) * 24}
              cy={220 - (index % Math.max(1, Math.floor(liquidHeight / 28))) * 24}
              r="5"
              className={styles.soluteDot}
            />
          ))}
        </svg>
        <div className={shared.row}>
          <Readout label="Stoffmengde" value={<MathFormula tex={"n = 0{,}100\\,\\mathrm{mol}"} />} size="small" />
          <Readout label="Sluttvolum" value={<MathFormula tex={"V = " + texNumber(volume, 2) + "\\,\\mathrm{L}"} />} size="small" />
          <Readout label="Konsentrasjon" value={<MathFormula tex={"c = n/V = " + texNumber(concentration, 3) + "\\,\\mathrm{mol/L}"} />} size="small" />
        </div>
        <Slider
          label="Sluttvolum for stoffmengdekonsentrasjon"
          valueText={"sluttvolum " + comma(volume, 2) + " liter; konsentrasjon " + comma(concentration, 3) + " mol per liter"}
          value={volume}
          onChange={setVolume}
          min={0.25}
          max={2}
          step={0.05}
          ends={["lite volum", "stort volum"]}
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
  const analyteFraction = (analyteMass / total) * 100;

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Endre analyttmassen mens løsemiddelmassen holdes fast, og følg både teller og total masse."
      label="Masseprosent bruker total blandingsmasse som nevner"
      afterword="Når analytt tilsettes løsemiddel, er nevneren summen av begge massene; den er ikke lik løsemiddelmassen alene."
    >
      <div className={shared.stack}>
        <div className={styles.compositionBar} aria-hidden="true">
          <div className={styles.analyteSegment} style={{ width: String(analyteFraction) + "%" }} />
          <div className={styles.solventSegment} style={{ width: String(100 - analyteFraction) + "%" }} />
        </div>
        <div className={shared.row}>
          <Readout label="Analytt" value={<MathFormula tex={texNumber(analyteMass, 1) + "\\,\\mathrm{g}"} />} size="small" />
          <Readout label="Løsemiddel" value={<MathFormula tex={"100{,}0\\,\\mathrm{g}"} />} size="small" />
          <Readout label="Total masse" value={<MathFormula tex={texNumber(total, 1) + "\\,\\mathrm{g}"} />} size="small" />
          <Readout label="Masseprosent" value={<MathFormula tex={"w = " + texNumber(percent, 2) + "\\,\\%"} />} size="small" />
        </div>
        <Slider
          label="Analyttmasse i masseprosentblandingen"
          valueText={"analyttmasse " + comma(analyteMass, 1) + " gram; masseprosent " + comma(percent, 2)}
          value={analyteMass}
          onChange={setAnalyteMass}
          min={1}
          max={30}
          step={1}
          ends={["lite analytt", "mer analytt"]}
        />
      </div>
    </DemonstrationFrame>
  );
}

export function PpmDemo() {
  const levels = [
    { label: "1 av 100", exponent: 2, fraction: "10^{-2}" },
    { label: "1 av 10 000", exponent: 4, fraction: "10^{-4}" },
    { label: "1 av 1 000 000", exponent: 6, fraction: "10^{-6}" },
  ] as const;

  return (
    <DemonstrationFrame
      kind="illustrasjon"
      instruction="Følg tre påfølgende hundregangers zoomnivåer til én milliondel."
      label="ppm er en dimensjonsløs relativ størrelse på én milliondel"
      afterword="ppm angir én milliondel av den aktuelle dimensjonsløse fraksjonen. Massekonsentrasjon i milligram per liter er derimot ikke generelt det samme."
    >
      <div className={styles.zoomLadder} role="img" aria-label="Tre zoomnivåer fra én av hundre til én av én million">
        {levels.map((level) => (
          <div key={level.exponent} className={styles.zoomLevel}>
            <div className={styles.miniGrid} aria-hidden="true">
              {Array.from({ length: 100 }, (_, index) => (
                <span key={index} className={index === 0 ? styles.zoomCellActive : styles.zoomCell} />
              ))}
            </div>
            <strong>{level.label}</strong>
            <MathFormula tex={level.fraction} />
          </div>
        ))}
      </div>
      <div className={shared.row}>
        <Readout label="Massefraksjon" value={<MathFormula tex={"1\\,\\mathrm{mg/kg} = 1\\,\\mathrm{ppm}"} />} size="small" />
        <Readout label="Stoffmengdefraksjon" value={<MathFormula tex={"1\\,\\mu\\mathrm{mol/mol} = 1\\,\\mathrm{ppm}"} />} size="small" />
        <Readout label="Massekonsentrasjon" value={<MathFormula tex={"1\\,\\mathrm{mg/L} \\ne 1\\,\\mathrm{ppm}\\ \\text{generelt}"} />} size="small" tone="warning" />
      </div>
    </DemonstrationFrame>
  );
}
