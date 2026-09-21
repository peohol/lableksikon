"use client";

import { useState } from "react";

import { DemonstrationFrame } from "@/components/DemonstrationFrame";
import { MathFormula } from "@/components/MathFormula";
import { comma } from "@/lib/statistics";
import { Chip, ChipGroup, Readout, Slider, Verdict } from "./primitives";
import shared from "./demos.module.css";
import styles from "./SeparationConceptDemos.module.css";

const texNumber = (value: number, digits = 1) =>
  comma(value, digits).replace(",", "{,}");

function gaussianPath(
  center: number,
  fwhm: number,
  height: number,
  baseline = 200,
  start = 55,
  end = 475,
) {
  const points = Array.from({ length: 121 }, (_, index) => {
    const x = start + ((end - start) * index) / 120;
    const exponent = -4 * Math.log(2) * ((x - center) / fwhm) ** 2;
    const y = baseline - height * Math.exp(exponent);
    return [x, y] as const;
  });
  return points
    .map(([x, y], index) => (index === 0 ? "M" : "L") + x.toFixed(1) + " " + y.toFixed(1))
    .join(" ");
}

function asymmetricPeakPath(
  center: number,
  leftFwhm: number,
  rightFwhm: number,
  height: number,
  baseline = 200,
) {
  const points = Array.from({ length: 121 }, (_, index) => {
    const x = 55 + (420 * index) / 120;
    const width = x <= center ? leftFwhm : rightFwhm;
    const exponent = -4 * Math.log(2) * ((x - center) / width) ** 2;
    const y = baseline - height * Math.exp(exponent);
    return [x, y] as const;
  });
  return points
    .map(([x, y], index) => (index === 0 ? "M" : "L") + x.toFixed(1) + " " + y.toFixed(1))
    .join(" ");
}

function chromatogramPath(
  peaks: Array<{ center: number; fwhm: number; height: number }>,
  baseline = 200,
) {
  const points = Array.from({ length: 181 }, (_, index) => {
    const x = 55 + (420 * index) / 180;
    const signal = peaks.reduce(
      (sum, peak) =>
        sum +
        peak.height *
          Math.exp(-4 * Math.log(2) * ((x - peak.center) / peak.fwhm) ** 2),
      0,
    );
    return [x, baseline - signal] as const;
  });
  return points
    .map(([x, y], index) => (index === 0 ? "M" : "L") + x.toFixed(1) + " " + y.toFixed(1))
    .join(" ");
}

export function MobilfaseDemo() {
  const [mode, setMode] = useState<"lc" | "gc" | "sfc">("lc");
  const description =
    mode === "lc" ? "væske / eluent" : mode === "gc" ? "gass / bæregass" : "superkritisk fluid";

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Bytt kromatografitype og se at transportfasen fortsatt er den delen som beveger analyttene gjennom systemet."
      label="Mobilfasen som den bevegelige transportfasen i kromatografi"
      afterword="Mobilfasen er væske i væskekromatografi, gass i gasskromatografi og et superkritisk fluid i superkritisk fluidkromatografi. Rollen som transportfase er den samme."
    >
      <div className={shared.stack}>
        <svg viewBox="0 0 520 170" className={shared.svg} aria-hidden="true">
          <rect x="85" y="55" width="350" height="62" rx="30" className={styles.columnTube} />
          {Array.from({ length: 8 }, (_, index) => (
            <circle
              key={index}
              cx={105 + index * 45}
              cy={86}
              r={mode === "gc" ? 5 : mode === "sfc" ? 7 : 9}
              className={styles.mobileParticle}
              style={{ animationDelay: String(index * -0.18) + "s" }}
            />
          ))}
          <circle cx="195" cy="86" r="11" className={styles.zoneA} />
          <circle cx="300" cy="86" r="11" className={styles.zoneB} />
          <path d="M445 86 L475 86 M464 76 L475 86 L464 96" className={styles.flowArrow} />
        </svg>
        <ChipGroup label="Kromatografitype">
          <Chip variant="choice" pressed={mode === "lc"} onClick={() => setMode("lc")}>LC</Chip>
          <Chip variant="choice" pressed={mode === "gc"} onClick={() => setMode("gc")}>GC</Chip>
          <Chip variant="choice" pressed={mode === "sfc"} onClick={() => setMode("sfc")}>SFC</Chip>
        </ChipGroup>
        <Readout label="Mobilfase i valgt system" value={description} size="small" />
        <Verdict reserve={2.8}>
          De to analyttsonene flyttes med strømmen; forskjeller i retensjon oppstår fordi stoffene samtidig vekselvirker ulikt med stasjonærfasen.
        </Verdict>
      </div>
    </DemonstrationFrame>
  );
}

export function StasjonarfaseDemo() {
  const [interaction, setInteraction] = useState(55);
  const positionA = 385;
  const positionB = 385 - interaction * 2.35;
  const relativeDelay = (positionA - positionB) / 2.35;

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Øk stoff Bs relative vekselvirkning med stasjonærfasen og se sonen bli holdt lenger tilbake."
      label="Ulik vekselvirkning med stasjonærfasen gir ulik fremdrift og retensjon"
      afterword="Figuren er en mekanistisk illustrasjon, ikke en fysisk simulering. Retensjon skyldes gjentatt fordeling eller vekselvirkning mellom mobil og stasjonær fase."
    >
      <div className={shared.stack}>
        <svg viewBox="0 0 520 190" className={shared.svg} aria-hidden="true">
          <rect x="55" y="40" width="420" height="100" rx="10" className={styles.columnBed} />
          {Array.from({ length: 14 }, (_, index) => (
            <circle
              key={index}
              cx={75 + (index % 7) * 62}
              cy={65 + Math.floor(index / 7) * 50}
              r="7"
              className={styles.stationarySite}
            />
          ))}
          <line x1="75" y1="92" x2="450" y2="92" className={styles.flowGuide} />
          <circle cx={positionA} cy="78" r="13" className={styles.zoneA} />
          <circle cx={positionB} cy="107" r="13" className={styles.zoneB} />
          <text x={positionA - 4} y="82" className={styles.zoneLabel}>A</text>
          <text x={positionB - 4} y="111" className={styles.zoneLabel}>B</text>
        </svg>
        <div className={shared.row}>
          <Readout label="Stoff A" value="svakere retinert" size="small" />
          <Readout label="Stoff B" value={interaction === 0 ? "samme fremdrift som A" : "holdes mer tilbake"} size="small" />
        </div>
        <Verdict reserve={2.8}>
          {interaction === 0
            ? "Når den relative forskjellen i vekselvirkning fjernes, beveger A og B seg like langt i illustrasjonen."
            : "Sterkere vekselvirkning med stasjonærfasen gjør at B tilbringer mindre av tiden i den bevegelige fasen og derfor ligger etter A."}
        </Verdict>
        <Slider
          label="Relativ vekselvirkning med stasjonærfasen for stoff B"
          valueText={"relativ vekselvirkning " + comma(interaction, 0) + " prosent; illustrert forsinkelse " + comma(relativeDelay, 0)}
          value={interaction}
          onChange={setInteraction}
          min={0}
          max={100}
          step={5}
          ends={["samme som A", "mye sterkere"]}
        />
      </div>
    </DemonstrationFrame>
  );
}

export function RetensjonstidDemo() {
  const [retentionTime, setRetentionTime] = useState(2.4);
  const holdUpTime = 0.6;
  const adjusted = retentionTime - holdUpTime;
  const timeX = (time: number) => 55 + (time / 5.5) * 420;
  const peakX = timeX(retentionTime);

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Flytt toppmaksimum og se retensjonstid og justert retensjonstid endres mot en fast hold-up-tid."
      label="Retensjonstid måles fra injeksjon til toppmaksimum"
      afterword="Retensjonstiden inkluderer tiden en ikke-retinert forbindelse bruker gjennom systemet. Justert retensjonstid trekker denne hold-up-tiden fra."
    >
      <div className={shared.stack}>
        <svg viewBox="0 0 520 235" className={shared.svg} aria-hidden="true">
          <line x1="55" y1="200" x2="475" y2="200" className={styles.axis} />
          <path d={gaussianPath(peakX, 42, 125)} className={styles.chromatogram} />
          <line x1={timeX(holdUpTime)} y1="40" x2={timeX(holdUpTime)} y2="205" className={styles.referenceLine} />
          <line x1={peakX} y1="70" x2={peakX} y2="205" className={styles.measureLine} />
          <circle cx="55" cy="200" r="5" className={styles.injectionPoint} />
        </svg>
        <div className={shared.row}>
          <Readout label="Hold-up-tid" value={<MathFormula tex={"t_M = 0{,}60\\,\\mathrm{min}"} />} size="small" />
          <Readout label="Retensjonstid" value={<MathFormula tex={"t_R = " + texNumber(retentionTime, 2) + "\\,\\mathrm{min}"} />} size="small" />
          <Readout label="Justert retensjonstid" value={<MathFormula tex={"t'_R = " + texNumber(adjusted, 2) + "\\,\\mathrm{min}"} />} size="small" />
        </div>
        <Verdict reserve={2.8}>
          Toppmaksimum definerer den illustrerte retensjonstiden; avstanden fra hold-up-markøren til toppmaksimum svarer til den justerte retensjonstiden.
        </Verdict>
        <Slider
          label="Retensjonstid for analytttoppen"
          valueText={"retensjonstid " + comma(retentionTime, 2) + " minutter; justert retensjonstid " + comma(adjusted, 2) + " minutter"}
          value={retentionTime}
          onChange={setRetentionTime}
          min={1}
          max={5}
          step={0.1}
          ends={["tidlig topp", "sen topp"]}
        />
      </div>
    </DemonstrationFrame>
  );
}

export function GradientDemo() {
  const [endStrong, setEndStrong] = useState(70);
  const startStrong = 10;
  const strength = (endStrong - startStrong) / 60;
  const lateShift = strength * 115;
  const middleShift = strength * 45;
  const peaks = [
    { center: 145, fwhm: 34, height: 70 },
    { center: 310 - middleShift, fwhm: 38, height: 92 },
    { center: 430 - lateShift, fwhm: 42, height: 110 },
  ];

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Endre hvor sterk mobilfasen blir mot slutten, og se særlig de sent eluerende toppene flytte seg."
      label="Gradientprogram og kromatogram vist samtidig"
      afterword="Illustrasjonen viser prinsippet: økende elueringsstyrke kan redusere retensjonen til sterkt retinerte forbindelser. Nøyaktig effekt avhenger av analytt, kjemi og gradientprogram."
    >
      <div className={shared.stack}>
        <svg viewBox="0 0 520 330" className={shared.svg} aria-hidden="true">
          <line x1="55" y1="130" x2="475" y2="130" className={styles.axis} />
          <line x1="55" y1="130" x2="55" y2="25" className={styles.axis} />
          <line x1="55" y1={120 - startStrong} x2="475" y2={120 - endStrong} className={styles.gradientLine} />
          <line x1="55" y1="300" x2="475" y2="300" className={styles.axis} />
          <path d={chromatogramPath(peaks, 300)} className={styles.chromatogram} />
        </svg>
        <div className={shared.row}>
          <Readout label="Start" value={<MathFormula tex={"10\\,\\%"} />} size="small" />
          <Readout label="Slutt" value={<MathFormula tex={texNumber(endStrong, 0) + "\\,\\%"} />} size="small" />
        </div>
        <Verdict reserve={2.8}>
          Når gradienten blir sterkere, flyttes den siste toppen mest mot kortere retensjon i denne illustrasjonen, mens den tidlige toppen endres lite.
        </Verdict>
        <Slider
          label="Andel sterk komponent ved slutten av gradienten"
          valueText={"sluttandel sterk komponent " + comma(endStrong, 0) + " prosent"}
          value={endStrong}
          onChange={setEndStrong}
          min={30}
          max={90}
          step={5}
          ends={["slak gradient", "sterk gradient"]}
        />
      </div>
    </DemonstrationFrame>
  );
}

export function IsokratiskDemo() {
  return (
    <DemonstrationFrame
      kind="illustrasjon"
      instruction="Sammenlign den flate sammensetningslinjen med kromatogrammet under."
      label="Isokratisk eluering med konstant mobilfasesammensetning"
      afterword="Isokratisk betyr at mobilfasesammensetningen holdes konstant gjennom separasjonen. Det sier ikke at alle andre metodeparametere er konstante."
    >
      <div className={shared.stack}>
        <svg viewBox="0 0 520 300" className={shared.svg} role="img" aria-label="Flat mobilfasesammensetning over tid og tre kromatografiske topper under">
          <line x1="55" y1="115" x2="475" y2="115" className={styles.axis} />
          <line x1="55" y1="115" x2="55" y2="25" className={styles.axis} />
          <line x1="55" y1="70" x2="475" y2="70" className={styles.isocraticLine} />
          <line x1="55" y1="270" x2="475" y2="270" className={styles.axis} />
          <path
            d={chromatogramPath([
              { center: 150, fwhm: 34, height: 60 },
              { center: 290, fwhm: 42, height: 90 },
              { center: 415, fwhm: 48, height: 105 },
            ], 270)}
            className={styles.chromatogram}
          />
        </svg>
        <Readout label="Mobilfasesammensetning" value={<MathFormula tex={"A = 40\\,\\%,\\quad B = 60\\,\\%"} />} size="small" />
      </div>
    </DemonstrationFrame>
  );
}

export function ElueringsrekkefolgeDemo() {
  const [selectivity, setSelectivity] = useState(-35);
  const centerB = 320 + selectivity;
  const centerC = 320 - selectivity;
  const order = centerB < centerC ? "A → B → C" : centerC < centerB ? "A → C → B" : "A → B/C";

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Endre den relative selektiviteten mellom B og C og se at elueringsrekkefølgen kan byttes."
      label="Elueringsrekkefølgen avhenger av separasjonsbetingelsene"
      afterword="Et stoff har ikke én universell plass i elueringsrekkefølgen. Kolonnekjemi, mobilfase, temperatur og andre betingelser kan endre den relative retensjonen."
    >
      <div className={shared.stack}>
        <svg viewBox="0 0 520 235" className={shared.svg} aria-hidden="true">
          <line x1="55" y1="200" x2="475" y2="200" className={styles.axis} />
          <path
            d={chromatogramPath([
              { center: 145, fwhm: 34, height: 70 },
              { center: centerB, fwhm: 40, height: 95 },
              { center: centerC, fwhm: 40, height: 80 },
            ])}
            className={styles.chromatogram}
          />
          <text x="140" y="118" className={styles.peakLabel}>A</text>
          <text x={centerB - 5} y="90" className={styles.peakLabel}>B</text>
          <text x={centerC - 5} y="105" className={styles.peakLabel}>C</text>
        </svg>
        <Readout label="Illustrert rekkefølge" value={order} size="small" />
        <Verdict reserve={2.8}>
          {selectivity === 0
            ? "B og C faller sammen i illustrasjonen: uten tilstrekkelig selektivitetsforskjell kan de ikke skilles som to topper."
            : "Når den relative retensjonen endres nok, bytter B og C plass. Rekkefølgen er derfor en egenskap ved analyttene under de valgte betingelsene."}
        </Verdict>
        <Slider
          label="Relativ selektivitet mellom stoff B og C"
          valueText={"selektivitetsforskyvning " + comma(selectivity, 0) + "; rekkefølge " + order}
          value={selectivity}
          onChange={setSelectivity}
          min={-65}
          max={65}
          step={5}
          ends={["B før C", "C før B"]}
        />
      </div>
    </DemonstrationFrame>
  );
}

export function ToppbreddeDemo() {
  const [fwhm, setFwhm] = useState(48);
  const center = 270;
  const height = 125;
  const baselineWidth = fwhm * (4 / 2.35482);

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Endre toppbredden og følg både bredden ved halv høyde og den Gaussian-baserte basisbredden."
      label="Samme kromatografiske topp kan beskrives med flere breddekonvensjoner"
      afterword="For en ideell Gaussian-topp er basisbredden definert fra standardavvik og omtrent 1,70 ganger bredden ved halv høyde. Reelle topper kan avvike fra denne formen."
    >
      <div className={shared.stack}>
        <svg viewBox="0 0 520 245" className={shared.svg} aria-hidden="true">
          <line x1="55" y1="205" x2="475" y2="205" className={styles.axis} />
          <path d={gaussianPath(center, fwhm, height, 205)} className={styles.chromatogram} />
          <line x1={center - fwhm / 2} y1="142.5" x2={center + fwhm / 2} y2="142.5" className={styles.measureLine} />
          <line x1={center - baselineWidth / 2} y1="205" x2={center + baselineWidth / 2} y2="205" className={styles.baselineMeasure} />
        </svg>
        <div className={shared.row}>
          <Readout label="Bredde ved halv høyde" value={<MathFormula tex={"w_h = " + texNumber(fwhm / 100, 2) + "\\,\\mathrm{min}"} />} size="small" />
          <Readout label="Illustrert basisbredde" value={<MathFormula tex={"w_b \\approx " + texNumber(baselineWidth / 100, 2) + "\\,\\mathrm{min}"} />} size="small" />
        </div>
        <Slider
          label="Bredde ved halv høyde for kromatografisk topp"
          valueText={"bredde ved halv høyde " + comma(fwhm / 100, 2) + " minutter"}
          value={fwhm}
          onChange={setFwhm}
          min={24}
          max={90}
          step={3}
          ends={["smal topp", "bred topp"]}
        />
      </div>
    </DemonstrationFrame>
  );
}

export function HaledannelseDemo() {
  const [tailing, setTailing] = useState(25);
  const center = 235;
  const leftWidth = 42;
  const rightWidth = leftWidth * (1 + tailing / 55);
  const widthRatio = rightWidth / leftWidth;

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Øk haledannelsen og se baksiden av hovedtoppen strekkes mot en fast nabotopp."
      label="Haledannelse gjør den bakre toppsiden mer langstrakt enn fronten"
      afterword="Dette er en formillustrasjon og bruker ikke et bestemt farmakopé- eller systemegnethetsmål for tailing. Slike mål har egne definerte måleregler."
    >
      <div className={shared.stack}>
        <svg viewBox="0 0 520 235" className={shared.svg} aria-hidden="true">
          <line x1="55" y1="200" x2="475" y2="200" className={styles.axis} />
          <path d={asymmetricPeakPath(center, leftWidth, rightWidth, 125)} className={styles.chromatogram} />
          <path d={gaussianPath(375, 44, 80)} className={styles.neighborPeak} />
          <line x1={center} y1="55" x2={center} y2="205" className={styles.referenceLine} />
        </svg>
        <div className={shared.row}>
          <Readout label="Illustrert halegrad" value={<MathFormula tex={texNumber(tailing, 0) + "\\,\\%"} />} size="small" />
          <Readout label="Illustrert bakside/front-forhold" value={<MathFormula tex={texNumber(widthRatio, 2)} />} size="small" />
        </div>
        <Verdict reserve={2.8}>
          {tailing === 0
            ? "Hovedtoppen er symmetrisk i illustrasjonen."
            : "Den bakre siden er nå bredere enn fronten og strekker signalet mot nabotoppen, noe som kan forringe integrasjon og separasjon."}
        </Verdict>
        <Slider
          label="Grad av haledannelse"
          valueText={"illustrert halegrad " + comma(tailing, 0) + " prosent"}
          value={tailing}
          onChange={setTailing}
          min={0}
          max={100}
          step={5}
          ends={["symmetrisk", "kraftig hale"]}
        />
      </div>
    </DemonstrationFrame>
  );
}

export function PlatetallDemo() {
  const [baseWidth, setBaseWidth] = useState(0.5);
  const retentionTime = 5;
  const plateCount = 16 * (retentionTime / baseWidth) ** 2;
  const fwhmPixels = (baseWidth / 1.69864) * 90;

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Gjør toppen smalere mens retensjonstiden holdes fast og se platetallet øke."
      label="Høyere platetall tilsvarer en smalere topp ved samme retensjonstid"
      afterword="Illustrasjonen bruker basisbreddeformelen for en Gaussian-lignende topp. Bruk av bredde ved halv høyde krever den tilsvarende formelen med en annen konstant."
    >
      <div className={shared.stack}>
        <svg viewBox="0 0 520 235" className={shared.svg} aria-hidden="true">
          <line x1="55" y1="200" x2="475" y2="200" className={styles.axis} />
          <path d={gaussianPath(360, fwhmPixels, 125)} className={styles.chromatogram} />
          <line x1={360 - fwhmPixels * 0.84932} y1="200" x2={360 + fwhmPixels * 0.84932} y2="200" className={styles.baselineMeasure} />
        </svg>
        <div className={shared.row}>
          <Readout label="Retensjonstid" value={<MathFormula tex={"t_R = 5{,}0\\,\\mathrm{min}"} />} size="small" />
          <Readout label="Basisbredde" value={<MathFormula tex={"w_b = " + texNumber(baseWidth, 2) + "\\,\\mathrm{min}"} />} size="small" />
          <Readout label="Platetall" value={<MathFormula tex={"N = 16(t_R/w_b)^2 = " + texNumber(plateCount, 0)} />} size="small" />
        </div>
        <Verdict reserve={2.8}>
          Når retensjonstiden er fast, øker platetallet kvadratisk når basisbredden blir mindre.
        </Verdict>
        <Slider
          label="Basisbredde for platetallsillustrasjonen"
          valueText={"basisbredde " + comma(baseWidth, 2) + " minutter; platetall " + comma(plateCount, 0)}
          value={baseWidth}
          onChange={setBaseWidth}
          min={0.2}
          max={0.8}
          step={0.05}
          ends={["smal topp", "bred topp"]}
        />
      </div>
    </DemonstrationFrame>
  );
}

export function SeparasjonsfaktorDemo() {
  const [alpha, setAlpha] = useState(1.25);
  const holdUp = 1;
  const k1 = 2;
  const k2 = alpha * k1;
  const retention1 = holdUp * (1 + k1);
  const retention2 = holdUp * (1 + k2);
  const timeX = (time: number) => 55 + (time / 6) * 420;

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Endre separasjonsfaktoren og se den andre retinerte toppen flytte seg relativt til den første."
      label="Separasjonsfaktor beskriver forholdet mellom retensjonsfaktorene til to topper"
      afterword="Separasjonsfaktoren beskriver relativ retensjon, men bestemmer ikke alene kromatografisk oppløsning; toppeffektivitet og retensjonsnivå spiller også inn."
    >
      <div className={shared.stack}>
        <svg viewBox="0 0 520 235" className={shared.svg} aria-hidden="true">
          <line x1="55" y1="200" x2="475" y2="200" className={styles.axis} />
          <line x1={timeX(holdUp)} y1="55" x2={timeX(holdUp)} y2="205" className={styles.referenceLine} />
          <path d={gaussianPath(timeX(retention1), 40, 100)} className={styles.chromatogram} />
          <path d={gaussianPath(timeX(retention2), 40, 88)} className={styles.neighborPeak} />
        </svg>
        <div className={shared.row}>
          <Readout label="Første retensjonsfaktor" value={<MathFormula tex="k_1 = 2{,}00" />} size="small" />
          <Readout label="Andre retensjonsfaktor" value={<MathFormula tex={"k_2 = " + texNumber(k2, 2)} />} size="small" />
          <Readout label="Separasjonsfaktor" value={<MathFormula tex={"\\alpha = k_2/k_1 = " + texNumber(alpha, 2)} />} size="small" />
        </div>
        <Verdict reserve={2.8}>
          {alpha < 1.1
            ? "Retensjonsfaktorene er svært like, så toppene ligger nær hverandre i denne illustrasjonen."
            : "Når forholdet mellom retensjonsfaktorene øker, flyttes den andre toppen senere relativt til den første."}
        </Verdict>
        <Slider
          label="Separasjonsfaktor alfa"
          valueText={"separasjonsfaktor " + comma(alpha, 2)}
          value={alpha}
          onChange={setAlpha}
          min={1.05}
          max={2}
          step={0.05}
          ends={["nesten lik retensjon", "stor retensjonsforskjell"]}
        />
      </div>
    </DemonstrationFrame>
  );
}

export function DodvolumDemo() {
  const [focus, setFocus] = useState<"holdUp" | "extra">("holdUp");

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Velg hvilken størrelse du mener og se hvilken del av væskebanen som faktisk markeres."
      label="Begrepet dødvolum kan skjule ulike volum i et kromatografisk system"
      afterword="IUPAC fraråder den tvetydige termen «dødvolum». Bruk hold-up-volum når du mener mobilfasevolumet knyttet til ikke-retinert transport, og ekstrakolonnevolum når du mener volum utenfor kolonnen."
    >
      <div className={shared.stack}>
        <svg viewBox="0 0 520 180" className={shared.svg} aria-hidden="true">
          <rect x="75" y="73" width="75" height="30" rx="8" className={focus === "extra" ? styles.focusSegment : styles.systemSegment} />
          <rect x="150" y="55" width="220" height="66" rx="12" className={focus === "holdUp" ? styles.focusSegment : styles.columnBed} />
          <rect x="370" y="73" width="75" height="30" rx="8" className={focus === "extra" ? styles.focusSegment : styles.systemSegment} />
          <line x1="45" y1="88" x2="475" y2="88" className={styles.flowGuide} />
        </svg>
        <ChipGroup label="Volumbegrep">
          <Chip variant="choice" pressed={focus === "holdUp"} onClick={() => setFocus("holdUp")}>Hold-up-volum</Chip>
          <Chip variant="choice" pressed={focus === "extra"} onClick={() => setFocus("extra")}>Ekstrakolonnevolum</Chip>
        </ChipGroup>
        <Verdict reserve={3}>
          {focus === "holdUp"
            ? "Kolonnen er markert: hold-up-volumet knyttes til volumet av mobilfase som svarer til transporten av en ikke-retinert forbindelse gjennom kolonnen."
            : "Områdene før og etter kolonnen er markert: slanger, injektorforbindelser og detektorvolum kan bidra til ekstrakolonnevolum."}
        </Verdict>
      </div>
    </DemonstrationFrame>
  );
}

export function InjeksjonsvolumDemo() {
  const [volume, setVolume] = useState(5);
  const plugWidth = 18 + volume * 2.2;
  const peakWidth = 34 + volume * 2.2;
  const height = Math.min(130, 45 + volume * 5);
  const overloaded = volume > 12;

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Øk injeksjonsvolumet og se prøvepluggen, signalmengden og toppbredden endres samtidig."
      label="Større injeksjonsvolum kan øke signalet, men også spre og overbelaste båndet"
      afterword="Tallene og overlastgrensen er pedagogiske. Egnet injeksjonsvolum må bestemmes for den konkrete kolonnen, løsemiddelstyrken, prøven og metodens systemegnethetskrav."
    >
      <div className={shared.stack}>
        <svg viewBox="0 0 520 300" className={shared.svg} aria-hidden="true">
          <rect x="75" y="45" width="370" height="55" rx="12" className={styles.columnTube} />
          <rect x="90" y="58" width={plugWidth} height="29" rx="8" className={overloaded ? styles.samplePlugWarning : styles.samplePlug} />
          <line x1="55" y1="270" x2="475" y2="270" className={styles.axis} />
          <path d={gaussianPath(300, peakWidth, height, 270)} className={overloaded ? styles.warningPeak : styles.chromatogram} />
        </svg>
        <div className={shared.row}>
          <Readout label="Illustrert injeksjonsvolum" value={<MathFormula tex={texNumber(volume, 0) + "\\,\\mu\\mathrm{L}"} />} size="small" />
          <Readout label="Relativ toppbredde" value={<MathFormula tex={texNumber(peakWidth, 0)} />} size="small" tone={overloaded ? "warning" : "normal"} />
        </div>
        <Verdict tone={overloaded ? "warning" : "normal"} reserve={3}>
          {overloaded
            ? "Den store prøvepluggen gir nå tydelig båndspredning i illustrasjonen. Mer injisert prøve er ikke automatisk bedre separasjon."
            : "Signalbidraget øker med injeksjonen, mens toppbredden fortsatt er moderat i denne pedagogiske illustrasjonen."}
        </Verdict>
        <Slider
          label="Injeksjonsvolum"
          valueText={"injeksjonsvolum " + comma(volume, 0) + " mikroliter; relativ toppbredde " + comma(peakWidth, 0)}
          value={volume}
          onChange={setVolume}
          min={1}
          max={20}
          step={1}
          ends={["liten prøveplugg", "stor prøveplugg"]}
        />
      </div>
    </DemonstrationFrame>
  );
}
