"use client";

import { useState } from "react";

import { DemonstrationFrame } from "@/components/DemonstrationFrame";
import { MathFormula } from "@/components/MathFormula";
import { comma } from "@/lib/statistics";
import { Chip, ChipGroup, Readout, Slider, Verdict } from "./primitives";
import shared from "./demos.module.css";
import styles from "./DetectionConceptDemos.module.css";

const texNumber = (value: number, digits = 1) =>
  comma(value, digits).replace(",", "{,}");

function gaussian(x: number, center: number, fwhm: number, height: number) {
  return height * Math.exp(-4 * Math.log(2) * ((x - center) / fwhm) ** 2);
}

function tracePath(
  points: Array<{ x: number; y: number }>,
) {
  return points
    .map((point, index) =>
      (index === 0 ? "M" : "L") + point.x.toFixed(1) + " " + point.y.toFixed(1),
    )
    .join(" ");
}

function chromatogramPath(
  peaks: Array<{ center: number; fwhm: number; height: number }>,
  baseline = 150,
) {
  const points = Array.from({ length: 161 }, (_, index) => {
    const x = 55 + (420 * index) / 160;
    const signal = peaks.reduce(
      (sum, peak) => sum + gaussian(x, peak.center, peak.fwhm, peak.height),
      0,
    );
    return { x, y: baseline - signal };
  });
  return tracePath(points);
}

function Spectrum({
  peaks,
  selected,
  baseline = 190,
}: {
  peaks: Array<{ mass: number; intensity: number }>;
  selected?: number[];
  baseline?: number;
}) {
  const masses = peaks.map((peak) => peak.mass);
  const minMass = Math.min(...masses) - 10;
  const maxMass = Math.max(...masses) + 10;
  const xFor = (mass: number) => 55 + ((mass - minMass) / (maxMass - minMass)) * 420;

  return (
    <svg viewBox="0 0 520 220" className={shared.svg} aria-hidden="true">
      <line x1="55" y1={baseline} x2="475" y2={baseline} className={styles.axis} />
      {peaks.map((peak) => {
        const isSelected = !selected || selected.includes(peak.mass);
        return (
          <line
            key={peak.mass}
            x1={xFor(peak.mass)}
            y1={baseline}
            x2={xFor(peak.mass)}
            y2={baseline - peak.intensity}
            className={isSelected ? styles.spectrumPeak : styles.spectrumPeakMuted}
          />
        );
      })}
    </svg>
  );
}

export function SignalStoyDemo() {
  const [noise, setNoise] = useState(10);
  const signalHeight = 90;
  const snr = signalHeight / noise;
  const points = Array.from({ length: 161 }, (_, index) => {
    const x = 55 + (420 * index) / 160;
    const deterministicNoise =
      noise *
      (0.58 * Math.sin(index * 1.71) +
        0.27 * Math.sin(index * 0.43 + 1.2) +
        0.15 * Math.sin(index * 2.83 + 0.4));
    const peak = gaussian(x, 285, 46, signalHeight);
    return { x, y: 170 - deterministicNoise - peak };
  });

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Øk støynivået og se den samme analytttoppen bli vanskeligere å skille fra bakgrunnsvariasjonen."
      label="Samme signal med ulik bakgrunnsstøy"
      afterword="Signal-støy-forhold må alltid tolkes sammen med hvordan signal og støy er definert og beregnet. Denne demoen bruker et enkelt illustrativt forhold mellom fast signalhøyde og valgt støyamplitude."
    >
      <div className={shared.stack}>
        <svg viewBox="0 0 520 230" className={shared.svg} aria-hidden="true">
          <line x1="55" y1="170" x2="475" y2="170" className={styles.referenceLine} />
          <path d={tracePath(points)} className={styles.signalTrace} />
        </svg>
        <div className={shared.row}>
          <Readout label="Fast illustrert signalhøyde" value={<MathFormula tex="S = 90" />} size="small" />
          <Readout label="Støyamplitude" value={<MathFormula tex={"N = " + texNumber(noise, 0)} />} size="small" />
          <Readout label="Illustrert signal/støy" value={<MathFormula tex={"S/N = " + texNumber(snr, 1)} />} size="small" tone={snr < 5 ? "warning" : "normal"} />
        </div>
        <Verdict tone={snr < 5 ? "warning" : "normal"} reserve={2.8}>
          {snr < 5
            ? "Toppen er nå lite fremtredende mot den illustrerte støyen."
            : "Toppen skiller seg tydeligere fra den illustrerte bakgrunnsvariasjonen."}
        </Verdict>
        <Slider
          label="Støyamplitude i signaltracen"
          valueText={"støyamplitude " + comma(noise, 0) + "; illustrert signal-støy-forhold " + comma(snr, 1)}
          value={noise}
          onChange={setNoise}
          min={2}
          max={30}
          step={2}
          ends={["lite støy", "mye støy"]}
        />
      </div>
    </DemonstrationFrame>
  );
}

export function MassespektrometriDemo() {
  const stages = [
    { name: "Ionekilde", text: "Nøytrale eller allerede ladde arter omdannes til gassfaseioner som instrumentet kan styre." },
    { name: "Masseanalysator", text: "Ioner separeres eller filtreres etter masse-til-ladning." },
    { name: "Detektor", text: "Ioner som når detektoren omdannes til et målbart elektrisk signal." },
    { name: "Spektrum", text: "Signalintensitet vises mot masse-til-ladning." },
  ] as const;
  const [stage, setStage] = useState(0);

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Velg et instrumenttrinn og se hvilken funksjon det har i veien fra prøve til massespektrum."
      label="Massespektrometri som en kjede fra ionedannelse til spektrum"
      afterword="Instrumentarkitekturen varierer mellom teknologier. Figuren viser de grunnleggende funksjonene, ikke én bestemt instrumentmodell."
    >
      <div className={shared.stack}>
        <svg viewBox="0 0 620 190" className={shared.svg} aria-hidden="true">
          {stages.map((item, index) => {
            const x = 30 + index * 150;
            return (
              <g key={item.name}>
                <rect
                  x={x}
                  y="62"
                  width="118"
                  height="62"
                  rx="10"
                  className={index === stage ? styles.stageActive : styles.stageBox}
                />
                {index < stages.length - 1 ? (
                  <path d={"M" + (x + 120) + " 93 L" + (x + 145) + " 93"} className={styles.flowArrow} />
                ) : null}
              </g>
            );
          })}
        </svg>
        <ChipGroup label="Trinn i massespektrometeret">
          {stages.map((item, index) => (
            <Chip
              key={item.name}
              variant="choice"
              pressed={stage === index}
              onClick={() => setStage(index)}
            >
              {item.name}
            </Chip>
          ))}
        </ChipGroup>
        <Readout label={stages[stage].name} value={stages[stage].text} size="small" />
      </div>
    </DemonstrationFrame>
  );
}

export function IoniseringDemo() {
  const [mode, setMode] = useState<"positive" | "negative">("positive");
  const ionTex = mode === "positive" ? "[M+H]^+" : "[M-H]^-";

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Bytt mellom positiv og negativ ionemodus og se hvilket eksempelion som sendes videre til massespektrometeret."
      label="Ionisering gjør analytten tilgjengelig som ladde arter"
      afterword="Protonering og deprotonering er vanlige eksempler, men hvilke ioner som faktisk dannes avhenger av ioniseringsmetoden, løsemiddelet og molekylets kjemi."
    >
      <div className={shared.stack}>
        <svg viewBox="0 0 520 190" className={shared.svg} aria-hidden="true">
          <circle cx="105" cy="95" r="28" className={styles.neutralMolecule} />
          <path d="M145 95 L220 95" className={styles.flowArrow} />
          <rect x="220" y="55" width="105" height="80" rx="16" className={styles.ionSource} />
          <path d="M325 95 L400 95" className={styles.flowArrow} />
          <circle cx="430" cy="95" r="29" className={mode === "positive" ? styles.positiveIon : styles.negativeIon} />
          <text x="101" y="100" className={styles.svgLabel}>M</text>
          <text x="423" y="100" className={styles.svgLabel}>{mode === "positive" ? "+" : "−"}</text>
        </svg>
        <ChipGroup label="Ionemodus">
          <Chip variant="choice" pressed={mode === "positive"} onClick={() => setMode("positive")}>Positiv</Chip>
          <Chip variant="choice" pressed={mode === "negative"} onClick={() => setMode("negative")}>Negativ</Chip>
        </ChipGroup>
        <Readout label="Eksempelion" value={<MathFormula tex={ionTex} />} size="small" />
        <Verdict reserve={2.8}>
          Den nøytrale arten til venstre blir representert av et ladet eksempelion til høyre; først da kan elektriske felt styre ionet i massespektrometeret.
        </Verdict>
      </div>
    </DemonstrationFrame>
  );
}

export function FragmenteringDemo() {
  const [energy, setEnergy] = useState(25);
  const precursor = Math.max(8, 112 - energy * 2);
  const product182 = Math.min(100, 18 + energy * 1.75);
  const product154 = Math.max(6, Math.min(95, (energy - 10) * 2.1));
  const peaks = [
    { mass: 154, intensity: product154 },
    { mass: 182, intensity: product182 },
    { mass: 300, intensity: precursor },
  ];
  const dominant = product182 >= product154 && product182 >= precursor ? 182 : product154 >= precursor ? 154 : 300;

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Øk den illustrative kollisjonsenergien og se forløperionet avta mens produkt-ioner blir mer fremtredende."
      label="Fragmentering kobler et forløperion til et mønster av produkt-ioner"
      afterword="Kurvene er pedagogiske, ikke en virkelig kollisjonsenergioptimalisering. Fragmenteringsmønsteret er molekyl- og instrumentavhengig, og høyere energi gir ikke nødvendigvis monotont mer av hvert produkt-ion."
    >
      <div className={shared.stack}>
        <svg viewBox="0 0 520 130" className={shared.svg} aria-hidden="true">
          <circle cx="90" cy="65" r="27" className={styles.precursorIon} />
          <path d="M120 65 L215 65" className={styles.flowArrow} />
          <circle cx="250" cy="65" r="30" className={styles.collisionCell} />
          <path d="M280 65 L360 42" className={styles.flowArrow} />
          <path d="M280 65 L360 88" className={styles.flowArrow} />
          <circle cx="400" cy="42" r="21" className={styles.productIon} />
          <circle cx="400" cy="88" r="17" className={styles.productIonSecondary} />
        </svg>
        <Spectrum peaks={peaks} />
        <div className={shared.row}>
          <Readout label="Forløper" value={<MathFormula tex="m/z = 300" />} size="small" />
          <Readout label="Mest intens i illustrasjonen" value={<MathFormula tex={"m/z = " + dominant} />} size="small" />
          <Readout label="Kollisjonsenergi" value={<MathFormula tex={texNumber(energy, 0) + "\\,\\mathrm{eV}"} />} size="small" />
        </div>
        <Slider
          label="Illustrativ kollisjonsenergi"
          valueText={"kollisjonsenergi " + comma(energy, 0) + " elektronvolt; mest intens topp masse-til-ladning " + dominant}
          value={energy}
          onChange={setEnergy}
          min={10}
          max={50}
          step={2}
          ends={["mild fragmentering", "kraftigere fragmentering"]}
        />
      </div>
    </DemonstrationFrame>
  );
}

const simPeaks = [
  { mass: 73, intensity: 38 },
  { mass: 91, intensity: 72 },
  { mass: 105, intensity: 42 },
  { mass: 121, intensity: 95 },
  { mass: 147, intensity: 54 },
  { mass: 165, intensity: 83 },
  { mass: 193, intensity: 68 },
  { mass: 221, intensity: 35 },
];

export function SimDemo() {
  const [mode, setMode] = useState<"full" | "sim">("full");
  const selected = [121, 165, 193];

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Bytt mellom fullskanning og målrettet ionemonitorering."
      label="SIM fokuserer datainnsamlingen på utvalgte ioner"
      afterword="SIM følger valgte masse-til-ladning-signaler i ett massetrinn. Det er konseptuelt forskjellig fra en forløper–produkt-overgang i tandem-massespektrometri."
    >
      <div className={shared.stack}>
        <Spectrum peaks={simPeaks} selected={mode === "sim" ? selected : undefined} />
        <ChipGroup label="Innsamlingsmodus">
          <Chip variant="choice" pressed={mode === "full"} onClick={() => setMode("full")}>Fullskanning</Chip>
          <Chip variant="choice" pressed={mode === "sim"} onClick={() => setMode("sim")}>SIM</Chip>
        </ChipGroup>
        <Readout
          label={mode === "sim" ? "Monitorerte ioner" : "Registrert masseområde"}
          value={
            mode === "sim"
              ? <MathFormula tex={"m/z = 121,\\ 165,\\ 193"} />
              : <MathFormula tex={"50 \\le m/z \\le 250"} />
          }
          size="small"
        />
        <Verdict reserve={2.8}>
          {mode === "sim"
            ? "Bare de tre valgte signalene fremheves som monitorerte i illustrasjonen; øvrige masser er ikke målet for denne innsamlingen."
            : "Fullskanningen viser hele det illustrerte spekteret og gir bredere spektral informasjon."}
        </Verdict>
      </div>
    </DemonstrationFrame>
  );
}

export function MrmDemo() {
  const [product, setProduct] = useState<182 | 154>(182);
  const productTex = "300 \\rightarrow " + product;

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Velg hvilket produkt-ion Q3 skal følge etter at Q1 har valgt samme forløperion."
      label="MRM følger en bestemt forløper–produkt-overgang gjennom to masseseleksjoner"
      afterword="En MRM-overgang er ikke nødvendigvis unik for ett stoff. Selektiviteten oppstår gjennom kombinasjonen av kromatografi, forløpervalg, fragmentering og produktvalg."
    >
      <div className={shared.stack}>
        <svg viewBox="0 0 640 190" className={shared.svg} aria-hidden="true">
          <rect x="30" y="58" width="125" height="72" rx="12" className={styles.analyzerBox} />
          <path d="M155 94 L220 94" className={styles.flowArrow} />
          <rect x="220" y="48" width="150" height="92" rx="16" className={styles.collisionCellBox} />
          <path d="M370 94 L435 94" className={styles.flowArrow} />
          <rect x="435" y="58" width="125" height="72" rx="12" className={styles.analyzerBox} />
          <circle cx="92" cy="94" r="18" className={styles.precursorIon} />
          <circle cx="497" cy="94" r={product === 182 ? 19 : 16} className={styles.productIon} />
        </svg>
        <ChipGroup label="MRM-overgang">
          <Chip variant="choice" pressed={product === 182} onClick={() => setProduct(182)}>Produkt 182</Chip>
          <Chip variant="choice" pressed={product === 154} onClick={() => setProduct(154)}>Produkt 154</Chip>
        </ChipGroup>
        <div className={shared.row}>
          <Readout label="Q1 velger" value={<MathFormula tex="m/z = 300" />} size="small" />
          <Readout label="Overgang" value={<MathFormula tex={productTex} />} size="small" />
          <Readout label="Q3 velger" value={<MathFormula tex={"m/z = " + product} />} size="small" />
        </div>
      </div>
    </DemonstrationFrame>
  );
}

export function MasseopplosningDemo() {
  const [width, setWidth] = useState(0.012);
  const centerA = 500.0;
  const centerB = 500.02;
  const minMass = 499.95;
  const maxMass = 500.07;
  const xFor = (mass: number) => 55 + ((mass - minMass) / (maxMass - minMass)) * 420;
  const widthPx = (width / (maxMass - minMass)) * 420;
  const resolvingPower = 500 / width;
  const pathA = chromatogramPath(
    [{ center: xFor(centerA), fwhm: widthPx, height: 115 }],
    190,
  );
  const pathB = chromatogramPath(
    [{ center: xFor(centerB), fwhm: widthPx, height: 100 }],
    190,
  );
  const visiblyMerged = width >= 0.024;

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Endre toppbredden ved samme nominelle masse og se to nærliggende massetopper gå fra tydelige til overlappende."
      label="Smalere massetopper gir større resolving power"
      afterword="Resolving power må oppgis sammen med definisjonen av toppbredden. Her brukes bredde ved halv høyde som illustrativt mål for delta m."
    >
      <div className={shared.stack}>
        <svg viewBox="0 0 520 225" className={shared.svg} aria-hidden="true">
          <line x1="55" y1="190" x2="475" y2="190" className={styles.axis} />
          <path d={pathA} className={styles.massPeakA} />
          <path d={pathB} className={styles.massPeakB} />
        </svg>
        <div className={shared.row}>
          <Readout label="Toppbredde ved halv høyde" value={<MathFormula tex={"\\Delta m = " + texNumber(width, 3)} />} size="small" />
          <Readout label="Resolving power ved masse 500" value={<MathFormula tex={"m/\\Delta m \\approx " + texNumber(resolvingPower, 0)} />} size="small" />
        </div>
        <Verdict tone={visiblyMerged ? "warning" : "normal"} reserve={2.8}>
          {visiblyMerged
            ? "De to toppene overlapper kraftig i denne illustrasjonen og fremstår mindre tydelig som separate masser."
            : "De to nærliggende massetoppene fremstår tydeligere som separate når toppbredden reduseres."}
        </Verdict>
        <Slider
          label="Massetoppens bredde ved halv høyde"
          valueText={"delta m " + comma(width, 3) + "; resolving power omtrent " + comma(resolvingPower, 0)}
          value={width}
          onChange={setWidth}
          min={0.005}
          max={0.04}
          step={0.001}
          ends={["smale topper", "brede topper"]}
        />
      </div>
    </DemonstrationFrame>
  );
}

function CoupledMsDemo({ mode }: { mode: "lc" | "gc" }) {
  const [peak, setPeak] = useState<"A" | "B">("A");
  const isLc = mode === "lc";
  const chromatogramPeaks = isLc
    ? [
        { center: 175, fwhm: 38, height: 78 },
        { center: 355, fwhm: 46, height: 108 },
      ]
    : [
        { center: 155, fwhm: 30, height: 72 },
        { center: 360, fwhm: 34, height: 110 },
      ];
  const spectra =
    peak === "A"
      ? isLc
        ? [
            { mass: 151, intensity: 35 },
            { mass: 302, intensity: 100 },
            { mass: 325, intensity: 42 },
          ]
        : [
            { mass: 43, intensity: 62 },
            { mass: 77, intensity: 100 },
            { mass: 105, intensity: 70 },
          ]
      : isLc
        ? [
            { mass: 184, intensity: 50 },
            { mass: 356, intensity: 100 },
            { mass: 379, intensity: 38 },
          ]
        : [
            { mass: 51, intensity: 45 },
            { mass: 91, intensity: 100 },
            { mass: 119, intensity: 76 },
          ];

  const basePeak = spectra.reduce((best, item) =>
    item.intensity > best.intensity ? item : best,
  );

  return (
    <div className={shared.stack}>
      <svg viewBox="0 0 520 185" className={shared.svg} aria-hidden="true">
        <line x1="55" y1="150" x2="475" y2="150" className={styles.axis} />
        <path d={chromatogramPath(chromatogramPeaks, 150)} className={styles.signalTrace} />
        <circle cx={peak === "A" ? chromatogramPeaks[0].center : chromatogramPeaks[1].center} cy="35" r="7" className={styles.selectionMarker} />
      </svg>
      <ChipGroup label={isLc ? "Valgt LC-topp" : "Valgt GC-topp"}>
        <Chip variant="choice" pressed={peak === "A"} onClick={() => setPeak("A")}>Topp A</Chip>
        <Chip variant="choice" pressed={peak === "B"} onClick={() => setPeak("B")}>Topp B</Chip>
      </ChipGroup>
      <Readout
        label="Valgt kromatografisk signal"
        value={
          <span>
            Topp {peak} · base peak <MathFormula tex={"m/z = " + basePeak.mass} />
          </span>
        }
        size="small"
      />
      <Spectrum peaks={spectra} baseline={185} />
      <Verdict reserve={2.8}>
        Når {isLc ? "LC-" : "GC-"}toppen byttes, oppdateres massespekteret under. Retensjonstid og spektral informasjon er to ulike dimensjoner som kobles i samme analyse.
      </Verdict>
    </div>
  );
}

export function LcmsDemo() {
  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Velg en kromatografisk topp og se massespekteret for akkurat det elueringsområdet."
      label="LC-MS kobler væskekromatografisk separasjon til massespektral informasjon"
      afterword="Spektrene er skjematiske. I reelle LC-MS-data avhenger ionemønsteret blant annet av ioniseringskilde, addukter, ladningstilstand og instrumentinnstillinger."
    >
      <CoupledMsDemo mode="lc" />
    </DemonstrationFrame>
  );
}

export function GcmsDemo() {
  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Velg en GC-topp og se at hvert elueringsområde kan ha sitt eget massespektrum."
      label="GC-MS kobler gasskromatografisk retensjon til massespektral informasjon"
      afterword="Spektrene er skjematiske og EI-lignende, ikke biblioteksspektra for bestemte forbindelser."
    >
      <CoupledMsDemo mode="gc" />
    </DemonstrationFrame>
  );
}

export function UvdetektorDemo() {
  const [transmission, setTransmission] = useState(50);
  const fraction = transmission / 100;
  const absorbance = -Math.log10(fraction);

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Reduser transmisjonen gjennom målecellen og se den transmitterte lysstrålen svekkes mens absorbansen øker."
      label="UV-deteksjon kobler transmisjon til absorbans logaritmisk"
      afterword="Illustrasjonen viser definisjonen av absorbans. Kvantitativ sammenheng mellom absorbans og konsentrasjon krever i tillegg at Beer–Lambert-betingelsene er tilstrekkelig oppfylt."
    >
      <div className={shared.stack}>
        <svg viewBox="0 0 540 190" className={shared.svg} aria-hidden="true">
          <line x1="40" y1="95" x2="205" y2="95" className={styles.beamIn} />
          <rect x="205" y="48" width="120" height="94" rx="10" className={styles.uvCell} />
          <line
            x1="325"
            y1="95"
            x2="500"
            y2="95"
            className={styles.beamOut}
            style={{ opacity: 0.18 + fraction * 0.82, strokeWidth: 3 + fraction * 7 }}
          />
        </svg>
        <div className={shared.row}>
          <Readout label="Transmisjon" value={<MathFormula tex={"T = " + texNumber(fraction, 2)} />} size="small" />
          <Readout label="Absorbans" value={<MathFormula tex={"A = -\\log_{10}(T) = " + texNumber(absorbance, 3)} />} size="small" />
        </div>
        <Slider
          label="Transmisjon gjennom UV-cellen"
          valueText={"transmisjon " + comma(transmission, 0) + " prosent; absorbans " + comma(absorbance, 3)}
          value={transmission}
          onChange={setTransmission}
          min={10}
          max={100}
          step={5}
          ends={["lav transmisjon", "høy transmisjon"]}
        />
      </div>
    </DemonstrationFrame>
  );
}

export function FidDemo() {
  const [load, setLoad] = useState(5);
  const signal = load * 12;

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Øk den illustrative mengden organisk analytt som når flammen og se det elektriske signalet øke."
      label="FID omdanner ionedannelse i flammen til en målbar strøm"
      afterword="Responsen er kjemiavhengig; demoen er ikke en påstand om at FID-signal alltid er proporsjonalt med totalt karbonatomtall. Det sentrale er at eluaten forbrennes og ladningsbærere samles som strøm."
    >
      <div className={shared.stack}>
        <svg viewBox="0 0 520 230" className={shared.svg} aria-hidden="true">
          <path d="M65 165 L220 165" className={styles.gcLine} />
          <path d="M245 175 C215 130 235 88 260 48 C285 88 305 130 275 175 Z" className={styles.flame} />
          <line x1="335" y1="65" x2="335" y2="170" className={styles.collector} />
          {Array.from({ length: Math.max(2, Math.round(load)) }, (_, index) => (
            <circle
              key={index}
              cx={285 + (index % 3) * 14}
              cy={145 - Math.floor(index / 3) * 20}
              r="5"
              className={styles.chargeCarrier}
            />
          ))}
          <rect x="390" y={175 - signal} width="55" height={signal} className={styles.signalBar} />
        </svg>
        <div className={shared.row}>
          <Readout label="Illustrert analyttbelastning" value={<MathFormula tex={texNumber(load, 0)} />} size="small" />
          <Readout label="Relativt FID-signal" value={<MathFormula tex={texNumber(signal, 0)} />} size="small" />
        </div>
        <Slider
          label="Illustrert analyttmengde inn i FID-flammen"
          valueText={"illustrert analyttmengde " + comma(load, 0) + "; relativt signal " + comma(signal, 0)}
          value={load}
          onChange={setLoad}
          min={1}
          max={10}
          step={1}
          ends={["lite eluat", "mer eluat"]}
        />
      </div>
    </DemonstrationFrame>
  );
}

export function LedningsevneDemo() {
  const [background, setBackground] = useState(4);
  const analyteContribution = 3.5;
  const peakConductivity = background + analyteContribution;
  const relativeChange = (analyteContribution / background) * 100;
  const yFor = (value: number) => 210 - (value / 16) * 150;
  const baselineY = yFor(background);
  const peakY = yFor(peakConductivity);
  const trace = Array.from({ length: 141 }, (_, index) => {
    const x = 55 + (420 * index) / 140;
    const bump = gaussian(x, 300, 58, baselineY - peakY);
    return { x, y: baselineY - bump };
  });

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Øk bakgrunnsledningsevnen og se samme absolutte analyttbidrag utgjøre en mindre relativ endring fra eluentsignalet."
      label="Ledningsevnedeteksjon måler analyttsignalet oppå en ionisk bakgrunn"
      afterword="Alle ioner kan bidra til ledningsevnen. Eluentsammensetning, eventuell suppressorteknologi og kromatografisk separasjon avgjør hvordan analyttendringen fremtrer i praksis."
    >
      <div className={shared.stack}>
        <svg viewBox="0 0 520 245" className={shared.svg} aria-hidden="true">
          <line x1="55" y1="210" x2="475" y2="210" className={styles.axis} />
          <line x1="55" y1={baselineY} x2="475" y2={baselineY} className={styles.backgroundLine} />
          <path d={tracePath(trace)} className={styles.conductivityTrace} />
          <rect x="270" y="28" width="60" height="36" rx="12" className={styles.ionZone} />
        </svg>
        <div className={shared.row}>
          <Readout label="Bakgrunn" value={<MathFormula tex={texNumber(background, 1)} />} size="small" />
          <Readout label="Toppsignal" value={<MathFormula tex={texNumber(peakConductivity, 1)} />} size="small" />
          <Readout label="Relativ økning" value={<MathFormula tex={texNumber(relativeChange, 0) + "\\,\\%"} />} size="small" />
        </div>
        <Verdict reserve={2.8}>
          Det absolutte analyttbidraget er konstant i demoen. Når bakgrunnen øker, blir den samme endringen mindre relativt til basislinjen.
        </Verdict>
        <Slider
          label="Bakgrunnsledningsevne"
          valueText={"bakgrunn " + comma(background, 1) + "; relativ analyttøkning " + comma(relativeChange, 0) + " prosent"}
          value={background}
          onChange={setBackground}
          min={1}
          max={12}
          step={0.5}
          ends={["lav bakgrunn", "høy bakgrunn"]}
        />
      </div>
    </DemonstrationFrame>
  );
}
