"use client";

import { useMemo, useState } from "react";

import { DemonstrationFrame } from "@/components/DemonstrationFrame";
import { MathFormula } from "@/components/MathFormula";
import { comma } from "@/lib/statistics";
import { Chip, ChipGroup, Readout, Slider, Verdict } from "./primitives";
import shared from "./demos.module.css";
import styles from "./SamplePreparationConceptDemos.module.css";

const texNumber = (value: number, digits = 1) =>
  comma(value, digits).replace(",", "{,}");

const population = [
  3, 4, 5, 5, 6, 7, 8, 9,
  4, 5, 6, 7, 8, 9, 10, 12,
  5, 6, 7, 8, 10, 12, 14, 16,
  6, 7, 8, 10, 12, 14, 17, 19,
  7, 8, 9, 11, 14, 17, 20, 23,
];

function mean(values: number[]) {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function dots(
  count: number,
  className: string,
  offsetX = 0,
  offsetY = 0,
  columns = 5,
) {
  return Array.from({ length: count }, (_, index) => (
    <circle
      key={index}
      cx={offsetX + 16 + (index % columns) * 22}
      cy={offsetY + 16 + Math.floor(index / columns) * 22}
      r="6"
      className={className}
    />
  ));
}

export function RepresentativDemo() {
  const [strategy, setStrategy] = useState<"local" | "distributed">("local");
  const local = [0, 1, 8, 9, 16, 17];
  const distributed = [2, 7, 12, 19, 28, 39];
  const selected = strategy === "local" ? local : distributed;
  const trueMean = mean(population);
  const sampleMean = mean(selected.map((index) => population[index]!));
  const bias = sampleMean - trueMean;

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Bytt mellom et lokalt uttak og et uttak fordelt over hele det heterogene partiet."
      label="Hvor du tar prøven kan være viktigere enn hvor presist du analyserer den"
      afterword="Representativitet gjelder en definert målpopulasjon og egenskap. Et laboratorieresultat kan være analytisk presist og likevel beskrive partiet dårlig dersom uttaket er skjevt."
    >
      <div className={shared.stack}>
        <svg viewBox="0 0 520 300" className={shared.svg} aria-hidden="true">
          {population.map((value, index) => {
            const col = index % 8;
            const row = Math.floor(index / 8);
            const x = 60 + col * 50;
            const y = 45 + row * 48;
            const isSelected = selected.includes(index);
            return (
              <g key={index}>
                <rect
                  x={x}
                  y={y}
                  width="38"
                  height="34"
                  rx="7"
                  className={value >= 12 ? styles.richCell : styles.leanCell}
                />
                {isSelected ? (
                  <rect
                    x={x - 4}
                    y={y - 4}
                    width="46"
                    height="42"
                    rx="9"
                    className={styles.sampleOutline}
                  />
                ) : null}
              </g>
            );
          })}
        </svg>
        <ChipGroup label="Prøvetakingsstrategi">
          <Chip variant="choice" pressed={strategy === "local"} onClick={() => setStrategy("local")}>Lokalt uttak</Chip>
          <Chip variant="choice" pressed={strategy === "distributed"} onClick={() => setStrategy("distributed")}>Fordelt uttak</Chip>
        </ChipGroup>
        <div className={shared.row}>
          <Readout label="Middelverdi i hele illustrerte partiet" value={<MathFormula tex={texNumber(trueMean, 1)} />} size="small" />
          <Readout label="Middelverdi i uttaket" value={<MathFormula tex={texNumber(sampleMean, 1)} />} size="small" />
          <Readout label="Avvik fra partiet" value={<MathFormula tex={texNumber(bias, 1)} />} size="small" tone={Math.abs(bias) > 2 ? "warning" : "normal"} />
        </div>
        <Verdict tone={Math.abs(bias) > 2 ? "warning" : "normal"} reserve={3}>
          {strategy === "local"
            ? "Det lokale uttaket dekker bare ett hjørne av den heterogene flaten og kan derfor gi et skjevt bilde av hele partiet."
            : "Det fordelte uttaket fanger flere deler av den illustrerte heterogeniteten og ligger nærmere partiets samlede middelverdi."}
        </Verdict>
      </div>
    </DemonstrationFrame>
  );
}

export function DelproveDemo() {
  return (
    <DemonstrationFrame
      kind="illustrasjon"
      instruction="Følg hvordan samme prøvemateriale reduseres gjennom laboratorieprøve, testprøve og testportion."
      label="En delprøve er en definert del av en større prøve"
      afterword="Hvert reduksjonstrinn kan introdusere uttaksfeil. Derfor må blanding og delingsprosedyre være egnet til materialets heterogenitet og den aktuelle prøvemengden."
    >
      <div className={shared.stack}>
        <svg viewBox="0 0 650 245" className={shared.svg} role="img" aria-label="Tre beholdere med gradvis mindre prøvemengde fra laboratorieprøve til testportion">
          <rect x="35" y="55" width="190" height="130" rx="16" className={styles.sampleContainer} />
          {dots(30, styles.sampleParticle, 50, 70, 6)}
          <path d="M235 120 L285 120" className={styles.arrow} />
          <rect x="295" y="75" width="140" height="95" rx="14" className={styles.sampleContainer} />
          {dots(15, styles.sampleParticle, 305, 84, 5)}
          <path d="M445 120 L490 120" className={styles.arrow} />
          <rect x="500" y="92" width="105" height="62" rx="12" className={styles.sampleContainer} />
          {dots(6, styles.sampleParticle, 505, 96, 3)}
        </svg>
        <div className={styles.stageLabels} aria-hidden="true">
          <span>Laboratorieprøve</span>
          <span>Testprøve</span>
          <span>Testportion</span>
        </div>
      </div>
    </DemonstrationFrame>
  );
}

export function HomogeniseringDemo() {
  const [mixing, setMixing] = useState(40);
  const initial = [2, 15, 4, 19];
  const target = mean(initial);
  const values = initial.map((value) => value + (target - value) * (mixing / 100));
  const spread = Math.max(...values) - Math.min(...values);

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Øk homogeniseringsgraden og se fire like store delprøver nærme seg samme sammensetning."
      label="Homogenisering reduserer forskjeller mellom like store uttak"
      afterword="Homogenitet er alltid knyttet til en egenskap, prøvestørrelse og skala. En prøve kan være homogen for én analytt eller porsjonsstørrelse, men ikke for en annen."
    >
      <div className={shared.stack}>
        <div className={styles.barChart} aria-hidden="true">
          {values.map((value, index) => (
            <div key={index} className={styles.barColumn}>
              <div className={styles.sampleBar} style={{ height: String(24 + value * 6) + "px" }} />
              <span>{index + 1}</span>
            </div>
          ))}
        </div>
        <div className={shared.row}>
          {values.map((value, index) => (
            <Readout key={index} label={"Delprøve " + (index + 1)} value={<MathFormula tex={texNumber(value, 1)} />} size="small" />
          ))}
          <Readout label="Maks–min" value={<MathFormula tex={texNumber(spread, 1)} />} size="small" tone={spread > 5 ? "warning" : "normal"} />
        </div>
        <Slider
          label="Homogeniseringsgrad i illustrasjonen"
          valueText={"homogeniseringsgrad " + comma(mixing, 0) + " prosent; spenn mellom delprøver " + comma(spread, 1)}
          value={mixing}
          onChange={setMixing}
          min={0}
          max={100}
          step={5}
          ends={["heterogen", "jevnt blandet"]}
        />
      </div>
    </DemonstrationFrame>
  );
}

export function EkstraksjonDemo() {
  const [recovery, setRecovery] = useState(65);
  const totalDots = 20;
  const extracted = Math.round((recovery / 100) * totalDots);
  const remaining = totalDots - extracted;

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Endre hvor stor andel av analytten som overføres til ekstraksjonsfasen."
      label="Ekstraksjon flytter analytt mellom faser — den trenger ikke være fullstendig"
      afterword="Hvor stor andel som overføres bestemmes av kjemi, fasevolumer og prosedyre. God kvantitativ analyse krever ikke nødvendigvis 100 % ekstraksjon dersom gjenvinningen er tilstrekkelig, stabil og håndtert i metoden."
    >
      <div className={shared.stack}>
        <svg viewBox="0 0 520 300" className={shared.svg} aria-hidden="true">
          <rect x="130" y="35" width="260" height="210" rx="22" className={styles.extractionVessel} />
          <rect x="145" y="55" width="230" height="78" rx="8" className={styles.organicPhase} />
          <rect x="145" y="133" width="230" height="92" rx="8" className={styles.matrixPhase} />
          {dots(extracted, styles.analyteExtracted, 160, 62, 7)}
          {dots(remaining, styles.analyteRemaining, 160, 145, 7)}
          <line x1="145" y1="133" x2="375" y2="133" className={styles.phaseBoundary} />
        </svg>
        <div className={shared.row}>
          <Readout label="I ekstrakt" value={<MathFormula tex={texNumber(recovery, 0) + "\\,\\%"} />} size="small" />
          <Readout label="Igjen i opprinnelig fase" value={<MathFormula tex={texNumber(100 - recovery, 0) + "\\,\\%"} />} size="small" />
        </div>
        <Slider
          label="Illustrert ekstraksjonsgjenvinning"
          valueText={"ekstrahert " + comma(recovery, 0) + " prosent; igjen " + comma(100 - recovery, 0) + " prosent"}
          value={recovery}
          onChange={setRecovery}
          min={20}
          max={100}
          step={5}
          ends={["lite overført", "nesten alt overført"]}
        />
      </div>
    </DemonstrationFrame>
  );
}

export function OppkonsentreringDemo() {
  const [finalVolume, setFinalVolume] = useState(4);
  const amount = 10;
  const concentration = amount / finalVolume;
  const fillHeight = 28 + finalVolume * 11;

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Reduser sluttvolumet mens analyttmengden holdes konstant."
      label="Oppkonsentrering øker konsentrasjonen ved å samle samme mengde i mindre volum"
      afterword="Oppkonsentreringsfaktor beskriver volumendringen. Den må holdes adskilt fra gjenvinning: analytt kan samtidig gå tapt under opparbeidingen."
    >
      <div className={shared.stack}>
        <svg viewBox="0 0 520 260" className={shared.svg} aria-hidden="true">
          <path d="M185 35 L335 35 L315 225 L205 225 Z" className={styles.flaskOutline} />
          <rect x="208" y={225 - fillHeight} width="104" height={fillHeight} rx="8" className={styles.solutionFill} />
          {dots(10, styles.analyteDot, 215, Math.max(78, 206 - fillHeight), 5)}
        </svg>
        <div className={shared.row}>
          <Readout label="Analyttmengde" value={<MathFormula tex={"m = 10\\,\\mathrm{ng}"} />} size="small" />
          <Readout label="Sluttvolum" value={<MathFormula tex={"V = " + texNumber(finalVolume, 1) + "\\,\\mathrm{mL}"} />} size="small" />
          <Readout label="Konsentrasjon" value={<MathFormula tex={"c = m/V = " + texNumber(concentration, 2) + "\\,\\mathrm{ng/mL}"} />} size="small" />
        </div>
        <Slider
          label="Sluttvolum ved oppkonsentrering"
          valueText={"sluttvolum " + comma(finalVolume, 1) + " milliliter; konsentrasjon " + comma(concentration, 2) + " nanogram per milliliter"}
          value={finalVolume}
          onChange={setFinalVolume}
          min={1}
          max={10}
          step={0.5}
          ends={["lite volum", "stort volum"]}
        />
      </div>
    </DemonstrationFrame>
  );
}

export function FortynningDemo() {
  const [finalVolume, setFinalVolume] = useState(10);
  const startConcentration = 100;
  const amount = startConcentration * 1;
  const newConcentration = amount / finalVolume;
  const dilutionFactor = finalVolume;
  const fillHeight = 45 + finalVolume * 7;

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Øk sluttvolumet etter at samme 1,0 mL aliquot er tatt ut."
      label="Fortynning bevarer ideelt analyttmengden i aliquoten, men senker konsentrasjonen"
      afterword="Demoen antar ideell volumetrisk fortynning og ingen analyttap. Reelle prosedyrer må bruke egnede volumetriske operasjoner og ta hensyn til metodens krav."
    >
      <div className={shared.stack}>
        <svg viewBox="0 0 520 280" className={shared.svg} aria-hidden="true">
          <path d="M185 35 L335 35 L315 235 L205 235 Z" className={styles.flaskOutline} />
          <rect x="208" y={235 - fillHeight} width="104" height={fillHeight} rx="8" className={styles.solutionFill} />
          {dots(10, styles.analyteDot, 215, Math.max(72, 216 - fillHeight), 5)}
        </svg>
        <div className={shared.row}>
          <Readout label="Aliquot" value={<MathFormula tex={"1{,}0\\,\\mathrm{mL},\\quad 100\\,\\mu\\mathrm{g/mL}"} />} size="small" />
          <Readout label="Fortynningsfaktor" value={<MathFormula tex={"F = " + texNumber(dilutionFactor, 1)} />} size="small" />
          <Readout label="Ny konsentrasjon" value={<MathFormula tex={"c_2 = " + texNumber(newConcentration, 1) + "\\,\\mu\\mathrm{g/mL}"} />} size="small" />
        </div>
        <Slider
          label="Sluttvolum ved fortynning"
          valueText={"sluttvolum " + comma(finalVolume, 0) + " milliliter; fortynningsfaktor " + comma(dilutionFactor, 1) + "; ny konsentrasjon " + comma(newConcentration, 1)}
          value={finalVolume}
          onChange={setFinalVolume}
          min={2}
          max={20}
          step={1}
          ends={["mindre fortynnet", "mer fortynnet"]}
        />
      </div>
    </DemonstrationFrame>
  );
}

export function FortynningsfaktorDemo() {
  const [aliquot, setAliquot] = useState(2);
  const finalVolume = 20;
  const measured = 3;
  const factor = finalVolume / aliquot;
  const original = measured * factor;
  const aliquotWidth = 22 + aliquot * 18;

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Endre aliquotvolumet som fortynnes til samme sluttvolum og se korreksjonsfaktoren endres."
      label="Fortynningsfaktoren kobler målt konsentrasjon tilbake til den opprinnelige"
      afterword="For ett ideelt fortynningstrinn er faktoren sluttvolum delt på aliquotvolum. Ved flere påfølgende trinn multipliseres de enkelte faktorene."
    >
      <div className={shared.stack}>
        <svg viewBox="0 0 560 230" className={shared.svg} aria-hidden="true">
          <rect x="55" y="80" width={aliquotWidth} height="58" rx="12" className={styles.aliquotBlock} />
          <path d="M180 110 L285 110" className={styles.arrow} />
          <path d="M315 42 L455 42 L438 190 L332 190 Z" className={styles.flaskOutline} />
          <rect x="337" y="80" width="96" height="105" rx="8" className={styles.solutionFill} />
        </svg>
        <div className={shared.row}>
          <Readout label="Aliquot" value={<MathFormula tex={texNumber(aliquot, 1) + "\\,\\mathrm{mL}"} />} size="small" />
          <Readout label="Sluttvolum" value={<MathFormula tex={"20{,}0\\,\\mathrm{mL}"} />} size="small" />
          <Readout label="Faktor" value={<MathFormula tex={"F = V_2/V_1 = " + texNumber(factor, 2)} />} size="small" />
          <Readout label="Opprinnelig ved målt 3,0 mg/L" value={<MathFormula tex={"c_0 = 3{,}0F = " + texNumber(original, 1) + "\\,\\mathrm{mg/L}"} />} size="small" />
        </div>
        <Slider
          label="Aliquotvolum for fortynningsfaktoren"
          valueText={"aliquot " + comma(aliquot, 1) + " milliliter; fortynningsfaktor " + comma(factor, 2) + "; opprinnelig konsentrasjon " + comma(original, 1) + " milligram per liter"}
          value={aliquot}
          onChange={setAliquot}
          min={1}
          max={5}
          step={0.5}
          ends={["liten aliquot", "stor aliquot"]}
        />
      </div>
    </DemonstrationFrame>
  );
}

export function FiltreringDemo() {
  const [analyteForm, setAnalyteForm] = useState<"dissolved" | "particle">("dissolved");

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Bytt mellom en oppløst og en partikkelbundet analytt og se hvor analytten havner etter filtrering."
      label="Filtrering skiller etter hva som passerer filteret — og kan derfor også skille analytten fra prøven"
      afterword="Et filter fjerner ikke bare partikler. Dersom målestørrelsen omfatter partikkelbundet analytt, eller analytten adsorberes til filteret, kan filtrering endre det som faktisk måles."
    >
      <div className={shared.stack}>
        <svg viewBox="0 0 560 300" className={shared.svg} aria-hidden="true">
          <rect x="90" y="35" width="170" height="95" rx="14" className={styles.sourceVessel} />
          {dots(10, styles.largeParticle, 105, 50, 5)}
          {dots(8, analyteForm === "particle" ? styles.analyteBound : styles.analyteDot, 115, 53, 4)}
          <path d="M175 130 L235 185" className={styles.arrow} />
          <rect x="200" y="180" width="160" height="12" rx="5" className={styles.filterMembrane} />
          {dots(6, styles.retainedParticle, 215, 145, 6)}
          {analyteForm === "dissolved" ? dots(8, styles.analyteDot, 225, 205, 4) : null}
          <path d="M215 200 L345 200 L330 275 L230 275 Z" className={styles.filtrateVessel} />
        </svg>
        <ChipGroup label="Analyttform">
          <Chip variant="choice" pressed={analyteForm === "dissolved"} onClick={() => setAnalyteForm("dissolved")}>Oppløst</Chip>
          <Chip variant="choice" pressed={analyteForm === "particle"} onClick={() => setAnalyteForm("particle")}>Partikkelbundet</Chip>
        </ChipGroup>
        <Verdict tone={analyteForm === "particle" ? "warning" : "normal"} reserve={3}>
          {analyteForm === "dissolved"
            ? "Den oppløste analytten følger filtratet i illustrasjonen, mens større partikler holdes tilbake."
            : "Den partikkelbundne analytten holdes nå tilbake sammen med partiklene. Filtratet representerer derfor ikke total analyttmengde i utgangsprøven."}
        </Verdict>
      </div>
    </DemonstrationFrame>
  );
}

export function OppslutningDemo() {
  const [digestion, setDigestion] = useState(35);
  const solidCount = Math.max(0, Math.round(12 * (1 - digestion / 100)));
  const dissolvedCount = Math.round(12 * (digestion / 100));

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Øk oppslutningsgraden og se fast matriks erstattes av en mer ensartet måleløsning."
      label="Oppslutning forenkler matriksen slik at analytten kan måles i en egnet løsning"
      afterword="Oppslutning betyr ikke nødvendigvis at absolutt alt fast stoff må forsvinne. Kravet er at prosedyren frigjør målestørrelsen og gir en løsning som er egnet for den videre målingen."
    >
      <div className={shared.stack}>
        <svg viewBox="0 0 520 280" className={shared.svg} aria-hidden="true">
          <path d="M150 35 L370 35 L340 240 L180 240 Z" className={styles.digestionVessel} />
          <rect x="185" y="112" width="150" height="120" rx="10" className={styles.digestSolution} />
          {dots(solidCount, styles.solidChunk, 200, 135, 4)}
          {dots(dissolvedCount, styles.dissolvedIon, 205, 120, 5)}
        </svg>
        <div className={shared.row}>
          <Readout label="Illustrert oppslutningsgrad" value={<MathFormula tex={texNumber(digestion, 0) + "\\,\\%"} />} size="small" />
          <Readout label="Faste matriksfragmenter" value={<MathFormula tex={String(solidCount)} />} size="small" />
        </div>
        <Slider
          label="Oppslutningsgrad i illustrasjonen"
          valueText={"oppslutningsgrad " + comma(digestion, 0) + " prosent; faste matriksfragmenter " + solidCount}
          value={digestion}
          onChange={setDigestion}
          min={0}
          max={100}
          step={5}
          ends={["kompleks fast prøve", "forenklet måleløsning"]}
        />
      </div>
    </DemonstrationFrame>
  );
}

export function ProvemengdeDemo() {
  const [sampleSize, setSampleSize] = useState(12);
  const relativeSamplingUncertainty = 100 / Math.sqrt(sampleSize);
  const selected = useMemo(() => population.slice(0, sampleSize), [sampleSize]);
  const selectedMean = mean(selected);
  const trueMean = mean(population);

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Øk antall illustrerte partikler i uttaket og se hvordan flere deler av heterogeniteten blir med."
      label="Større prøvemengde kan dempe uttaksvariasjon i heterogent materiale"
      afterword="Sammenhengen er kun pedagogisk: faktisk prøvetakingsusikkerhet avhenger av partikkelstørrelse, segregasjon, analyttfordeling og prøvetakingsdesign. Større prøve er ikke automatisk representativ dersom uttaksstedet er skjevt."
    >
      <div className={shared.stack}>
        <svg viewBox="0 0 520 280" className={shared.svg} aria-hidden="true">
          {selected.map((value, index) => {
            const x = 55 + (index % 10) * 42;
            const y = 45 + Math.floor(index / 10) * 44;
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r={7 + value / 8}
                className={value >= 12 ? styles.richParticle : styles.sampleParticle}
              />
            );
          })}
        </svg>
        <div className={shared.row}>
          <Readout label="Partikler i uttaket" value={<MathFormula tex={String(sampleSize)} />} size="small" />
          <Readout label="Middel i uttaket" value={<MathFormula tex={texNumber(selectedMean, 1)} />} size="small" />
          <Readout label="Middel i hele partiet" value={<MathFormula tex={texNumber(trueMean, 1)} />} size="small" />
          <Readout label="Illustrert 1/√n-skala" value={<MathFormula tex={"100/\\sqrt{n} = " + texNumber(relativeSamplingUncertainty, 1) + "\\,\\%"} />} size="small" />
        </div>
        <Slider
          label="Prøvemengde målt som antall illustrerte partikler"
          valueText={"utvalgsstørrelse " + sampleSize + " partikler; illustrert én over kvadratroten av n " + comma(relativeSamplingUncertainty, 1) + " prosent"}
          value={sampleSize}
          onChange={setSampleSize}
          min={5}
          max={40}
          step={1}
          ends={["lite uttak", "større uttak"]}
        />
      </div>
    </DemonstrationFrame>
  );
}
