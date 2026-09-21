"use client";

import { useState } from "react";

import { DemonstrationFrame } from "@/components/DemonstrationFrame";
import { MathFormula } from "@/components/MathFormula";
import { comma } from "@/lib/statistics";
import { Chip, ChipGroup, Readout, Slider, Verdict } from "./primitives";
import shared from "./demos.module.css";
import styles from "./SampleConceptDemos.module.css";

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

function gaussian(x: number, center: number, width: number, amplitude: number) {
  return amplitude * Math.exp(-0.5 * ((x - center) / width) ** 2);
}

function signalPath(
  responseAt: (x: number) => number,
  yMax: number,
  samples = 80,
  left = 45,
  right = 475,
  top = 28,
  bottom = 185,
) {
  return Array.from({ length: samples + 1 }, (_, index) => {
    const domainX = (index / samples) * 10;
    const px = left + (domainX / 10) * (right - left);
    const py = bottom - (responseAt(domainX) / yMax) * (bottom - top);
    return (index === 0 ? "M " : "L ") + px.toFixed(1) + " " + py.toFixed(1);
  }).join(" ");
}

function miniPeakPath(amplitude: number, yMax: number) {
  return signalPath(
    (x) => gaussian(x, 5, 0.72, amplitude),
    yMax,
    48,
    12,
    148,
    16,
    112,
  );
}

function IonizationEffectDemo({ mode }: { mode: "suppression" | "enhancement" }) {
  const [effect, setEffect] = useState(38);
  const referenceResponse = 100;
  const matrixResponse =
    mode === "suppression"
      ? referenceResponse * (1 - effect / 100)
      : referenceResponse * (1 + effect / 100);
  const signedEffect = mode === "suppression" ? -effect : effect;
  const maximumResponse = mode === "suppression" ? 120 : 190;
  const title = mode === "suppression" ? "Ionesuppresjon" : "Ioneforsterkning";
  const sliderLabel =
    mode === "suppression" ? "Grad av ionesuppresjon" : "Grad av ioneforsterkning";
  const verdict =
    effect < 10
      ? "Matriksen påvirker ioniseringen lite i denne illustrasjonen."
      : mode === "suppression"
        ? "Analyttmengden er uendret, men matriksen reduserer ioniseringseffektiviteten og dermed signalet."
        : "Analyttmengden er uendret, men matriksen øker ioniseringseffektiviteten og dermed signalet.";

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction={
        mode === "suppression"
          ? "Øk suppressjonen og se samme analyttmengde gi et mindre målesignal."
          : "Øk forsterkningen og se samme analyttmengde gi et større målesignal."
      }
      label={title + " ved konstant analyttmengde"}
      afterword="Matriseeffekt handler her om respons per analyttmengde. Et endret signal betyr derfor ikke i seg selv at prøven inneholder mer eller mindre analytt."
    >
      <div className={shared.stack}>
        <svg viewBox="0 0 520 215" className={shared.svg} aria-hidden="true">
          <line x1="45" y1="185" x2="475" y2="185" className={styles.axis} />
          <path
            d={signalPath(
              (x) => gaussian(x, 5, 0.72, referenceResponse),
              maximumResponse,
            )}
            className={styles.traceReference}
          />
          <path
            d={signalPath(
              (x) => gaussian(x, 5, 0.72, matrixResponse),
              maximumResponse,
            )}
            className={styles.traceAccent}
          />
          <text x="380" y="207" className={styles.svgText}>retensjonstid</text>
        </svg>
        <div className={styles.legend}>
          <span className={styles.legendItem}>
            <span className={styles.legendReference} />
            ren løsning
          </span>
          <span className={styles.legendItem}>
            <span className={styles.legendAccent} />
            matriks
          </span>
        </div>
        <div className={shared.row}>
          <Readout
            label="Analyttmengde"
            value={<MathFormula tex="c = 10\\,\\mathrm{ng/mL}" />}
            size="small"
          />
          <Readout
            label="Respons i matriks"
            value={<MathFormula tex={"I = " + texNumber(matrixResponse, 0)} />}
            size="small"
          />
          <Readout
            label="Matriseeffekt"
            value={
              <MathFormula
                tex={
                  "\\mathrm{ME} = " +
                  (signedEffect > 0 ? "+" : "") +
                  texNumber(signedEffect, 0) +
                  "\\,\\%"
                }
              />
            }
            size="small"
          />
        </div>
        <Verdict reserve={3}>{verdict}</Verdict>
        <Slider
          label={sliderLabel}
          valueText={
            comma(effect, 0) +
            " prosent; matriserespons " +
            comma(matrixResponse, 0)
          }
          value={effect}
          onChange={setEffect}
          min={0}
          max={mode === "suppression" ? 70 : 80}
          step={2}
          ends={["liten effekt", "stor effekt"]}
        />
      </div>
    </DemonstrationFrame>
  );
}

export function IonesuppresjonDemo() {
  return <IonizationEffectDemo mode="suppression" />;
}

export function IoneforsterkningDemo() {
  return <IonizationEffectDemo mode="enhancement" />;
}

export function InterferensDemo() {
  const [overlap, setOverlap] = useState(45);
  const analyteCenter = 5;
  const interferentCenter = 7.5 - (overlap / 100) * 2.5;
  const interferentAmplitude = 70;
  const contribution = gaussian(analyteCenter, interferentCenter, 0.65, interferentAmplitude);
  const apparentResponse = 100 + contribution;

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Øk overlappen og se interferenten bevege seg inn mot analyttsignalet."
      label="Interferens som et fremmed signal som bidrar ved analyttens målepunkt"
      afterword="Illustrasjonen viser signaloverlapp som én mulig interferensmekanisme. I virkelige metoder kan interferens også oppstå gjennom andre kjemiske eller instrumentelle mekanismer."
    >
      <div className={shared.stack}>
        <svg viewBox="0 0 520 215" className={shared.svg} aria-hidden="true">
          <line x1="45" y1="185" x2="475" y2="185" className={styles.axis} />
          <path
            d={signalPath((x) => gaussian(x, analyteCenter, 0.55, 100), 180)}
            className={styles.traceReference}
          />
          <path
            d={signalPath(
              (x) => gaussian(x, interferentCenter, 0.65, interferentAmplitude),
              180,
            )}
            className={styles.traceWarning}
          />
          <path
            d={signalPath(
              (x) =>
                gaussian(x, analyteCenter, 0.55, 100) +
                gaussian(x, interferentCenter, 0.65, interferentAmplitude),
              180,
            )}
            className={styles.traceAccent}
          />
          <line x1="260" y1="28" x2="260" y2="185" className={styles.markerLine} />
          <text x="268" y="40" className={styles.svgText}>analyttens målepunkt</text>
          <text x="380" y="207" className={styles.svgText}>retensjonstid</text>
        </svg>
        <div className={styles.legend}>
          <span className={styles.legendItem}><span className={styles.legendReference} />analytt</span>
          <span className={styles.legendItem}><span className={styles.legendWarning} />interferent</span>
          <span className={styles.legendItem}><span className={styles.legendAccent} />observert sum</span>
        </div>
        <div className={shared.row}>
          <Readout
            label="Interferentens bidrag ved analyttpunktet"
            value={<MathFormula tex={"I_{\\mathrm{int}} = " + texNumber(contribution, 1)} />}
            size="small"
          />
          <Readout
            label="Tilsynelatende analyttsignal"
            value={<MathFormula tex={"I_{\\mathrm{obs}} = " + texNumber(apparentResponse, 1)} />}
            size="small"
          />
        </div>
        <Verdict tone={contribution > 20 ? "warning" : "normal"} reserve={3}>
          {contribution < 5
            ? "Interferenten er godt nok separert i denne illustrasjonen til å bidra lite ved analyttens målepunkt."
            : contribution < 20
              ? "Interferenten gir et synlig ekstra bidrag ved analyttens målepunkt."
              : "Sterk signaloverlapp gjør at analyttresponsen ville bli tydelig overvurdert uten tilstrekkelig selektivitet."}
        </Verdict>
        <Slider
          label="Overlapp mellom interferent og analytt"
          valueText={
            comma(overlap, 0) +
            " prosent overlapp; ekstra bidrag " +
            comma(contribution, 1)
          }
          value={overlap}
          onChange={setOverlap}
          min={0}
          max={100}
          step={2}
          ends={["separert", "full overlap"]}
        />
      </div>
    </DemonstrationFrame>
  );
}

const NOISE_PATTERN = [
  -0.4, 0.3, -0.7, 0.6, -0.1, 0.8, -0.5, 0.2, -0.9, 0.4,
  0.1, -0.3, 0.7, -0.6, 0.5, -0.2, 0.9, -0.8, 0.2, -0.4,
  0.6, -0.1, 0.3, -0.7, 0.8, -0.2, 0.4, -0.5, 0.1, 0.7,
  -0.6, 0.2, -0.3, 0.5, -0.8, 0.9, -0.4, 0.1, 0.6, -0.2,
] as const;

export function BakgrunnssignalDemo() {
  const [baseline, setBaseline] = useState(8);
  const [noise, setNoise] = useState(1);
  const values = NOISE_PATTERN.map((offset) => baseline + offset * noise);
  const minimum = 0;
  const maximum = 25;
  const path = values
    .map((value, index) => {
      const px = 45 + (index / (values.length - 1)) * 430;
      const py = 185 - ((value - minimum) / (maximum - minimum)) * 145;
      return (index === 0 ? "M " : "L ") + px.toFixed(1) + " " + py.toFixed(1);
    })
    .join(" ");
  const baselineY = 185 - ((baseline - minimum) / (maximum - minimum)) * 145;

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Endre bakgrunnsnivå og støy hver for seg og se at de påvirker signalkurven på forskjellige måter."
      label="Bakgrunnssignal som nivå, støy som variasjon rundt nivået"
      afterword="Et stabilt bakgrunnsbidrag kan ligge over null uten å være støy. Støy beskriver den tilfeldige variasjonen rundt det lokale bakgrunnsnivået."
    >
      <div className={shared.stack}>
        <svg viewBox="0 0 520 215" className={shared.svg} aria-hidden="true">
          <line x1="45" y1="185" x2="475" y2="185" className={styles.axis} />
          <line x1="45" y1={baselineY} x2="475" y2={baselineY} className={styles.traceReference} />
          <path d={path} className={styles.traceAccent} data-background-trace />
          <text x="380" y="207" className={styles.svgText}>måletid</text>
        </svg>
        <div className={shared.row}>
          <Readout
            label="Bakgrunnsnivå"
            value={<MathFormula tex={"B = " + texNumber(baseline, 1)} />}
            size="small"
          />
          <Readout
            label="Støyamplitude"
            value={<MathFormula tex={"A_{\\mathrm{støy}} = " + texNumber(noise, 1)} />}
            size="small"
          />
        </div>
        <Verdict reserve={3}>
          Bakgrunnsslideren flytter hele tracen opp og ned. Støyslideren endrer hvor mye signalet varierer rundt den stiplede bakgrunnslinjen.
        </Verdict>
        <Slider
          label="Bakgrunnsnivå i signalkurven"
          valueText={"bakgrunn " + comma(baseline, 1)}
          value={baseline}
          onChange={setBaseline}
          min={0}
          max={20}
          step={1}
          ends={["nær null", "høy bakgrunn"]}
        />
        <Slider
          label="Tilfeldig støy i signalkurven"
          valueText={"støyamplitude " + comma(noise, 1)}
          value={noise}
          onChange={setNoise}
          min={0}
          max={5}
          step={0.5}
          ends={["ingen støy", "stor støy"]}
        />
      </div>
    </DemonstrationFrame>
  );
}

export function KontamineringDemo() {
  return (
    <DemonstrationFrame kind="stegvis" instruction="Følg mulige steder uønsket materiale kan komme inn i prøven." label="Mulige kilder til kontaminering" afterword="Blanktyper og arbeidsflyt brukes til å lokalisere hvor et uventet bidrag kommer inn.">
      <Flow items={["Reagens eller beholder", "Prøveopparbeiding", "Instrument eller miljø", "Uventet signal i prøve eller blank"]} />
    </DemonstrationFrame>
  );
}

export function KrysskontamineringDemo() {
  const [carryover, setCarryover] = useState(12);
  const highSample = 100;
  const blankSignal = highSample * (carryover / 100);
  const nextTrueSignal = 20;
  const nextCarryover = highSample * (carryover / 100) ** 2;
  const nextObserved = nextTrueSignal + nextCarryover;

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Endre carry-over-andelen og se restsignalet vandre videre fra en høy prøve til blank og neste prøve."
      label="Krysskontaminering som avtakende restsignal mellom påfølgende analyser"
      afterword="Dette er en forenklet carry-over-modell: samme fraksjon av restmaterialet blir igjen til neste injeksjon. Reelle mønstre må undersøkes empirisk for instrument og metode."
    >
      <div className={shared.stack}>
        <div className={styles.peakPanels}>
          <div className={styles.peakPanel}>
            <span className={styles.cardTitle}>Høy prøve A</span>
            <svg viewBox="0 0 160 125" className={shared.svg} aria-hidden="true">
              <line x1="12" y1="112" x2="148" y2="112" className={styles.axis} />
              <path d={miniPeakPath(highSample, 110)} className={styles.traceAccent} />
            </svg>
            <MathFormula tex={"I_A = " + texNumber(highSample, 0)} />
          </div>
          <div className={styles.peakPanel}>
            <span className={styles.cardTitle}>Blank etter A</span>
            <svg viewBox="0 0 160 125" className={shared.svg} aria-hidden="true">
              <line x1="12" y1="112" x2="148" y2="112" className={styles.axis} />
              <path d={miniPeakPath(blankSignal, 110)} className={styles.traceWarning} />
            </svg>
            <MathFormula tex={"I_{\\mathrm{blank}} = " + texNumber(blankSignal, 1)} />
          </div>
          <div className={styles.peakPanel}>
            <span className={styles.cardTitle}>Neste prøve</span>
            <svg viewBox="0 0 160 125" className={shared.svg} aria-hidden="true">
              <line x1="12" y1="112" x2="148" y2="112" className={styles.axis} />
              <path d={miniPeakPath(nextTrueSignal, 110)} className={styles.traceReference} />
              <path d={miniPeakPath(nextObserved, 110)} className={styles.traceAccent} />
            </svg>
            <MathFormula tex={"I_{\\mathrm{obs}} = " + texNumber(nextObserved, 2)} />
          </div>
        </div>
        <div className={shared.row}>
          <Readout
            label="Restsignal i blank"
            value={<MathFormula tex={texNumber(blankSignal, 1)} />}
            size="small"
          />
          <Readout
            label="Ekstra bidrag i neste prøve"
            value={<MathFormula tex={"\\Delta I = " + texNumber(nextCarryover, 2)} />}
            size="small"
          />
        </div>
        <Verdict tone={carryover >= 5 ? "warning" : "normal"} reserve={3}>
          {carryover === 0
            ? "Uten carry-over gir blanken ikke restsignal, og neste prøve påvirkes ikke av prøve A."
            : "Restmateriale fra den høye prøven gir først signal i blanken og kan deretter legge et mindre, men systematisk bidrag til neste prøve."}
        </Verdict>
        <Slider
          label="Carry-over-andel mellom injeksjoner"
          valueText={
            comma(carryover, 0) +
            " prosent; blanksignal " +
            comma(blankSignal, 1) +
            "; ekstra i neste prøve " +
            comma(nextCarryover, 2)
          }
          value={carryover}
          onChange={setCarryover}
          min={0}
          max={20}
          step={1}
          ends={["ingen carry-over", "stor carry-over"]}
        />
      </div>
    </DemonstrationFrame>
  );
}

export function MatriksblankDemo() {
  return (
    <DemonstrationFrame kind="sammenligning" instruction="Sammenlign hva en løsemiddelblank og en matriksblank kan avsløre." label="Matriksblank fanger bidrag som ikke finnes i ren løsning" afterword="En matriksblank inkluderer prøvens øvrige komponenter og kan derfor avdekke bakgrunn eller interferens som en løsemiddelblank overser.">
      <div className={styles.columns}>
        <div><span className={styles.cardTitle}>Løsemiddelblank</span><p className={shared.note}>Fanger bidrag fra løsemiddel og instrument.</p></div>
        <div><span className={styles.cardTitle}>Matriksblank</span><p className={shared.note}>Fanger i tillegg relevante matriksbidrag.</p></div>
      </div>
    </DemonstrationFrame>
  );
}

type StorageTemperature = "cold" | "room" | "warm";

const STORAGE = {
  cold: { label: "4 °C", halfLife: 240, legend: "kjølig" },
  room: { label: "20 °C", halfLife: 96, legend: "romtemperatur" },
  warm: { label: "35 °C", halfLife: 36, legend: "varmt" },
} as const;

function remainingPercent(timeHours: number, halfLife: number) {
  return 100 * 2 ** (-timeHours / halfLife);
}

function storagePath(halfLife: number) {
  const samples = 60;
  return Array.from({ length: samples + 1 }, (_, index) => {
    const time = (index / samples) * 168;
    const remaining = remainingPercent(time, halfLife);
    const px = 45 + (time / 168) * 430;
    const py = 185 - (remaining / 100) * 145;
    return (index === 0 ? "M " : "L ") + px.toFixed(1) + " " + py.toFixed(1);
  }).join(" ");
}

export function ProvelagringDemo() {
  const [timeHours, setTimeHours] = useState(48);
  const [temperature, setTemperature] = useState<StorageTemperature>("cold");
  const selected = STORAGE[temperature];
  const remaining = remainingPercent(timeHours, selected.halfLife);
  const markerX = 45 + (timeHours / 168) * 430;
  const markerY = 185 - (remaining / 100) * 145;

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Velg temperatur og lagringstid og følg hvordan den samme startmengden utvikler seg langs tre illustrerte stabilitetskurver."
      label="Prøvelagring som temperatur- og tidsavhengig tap av målbar analytt"
      afterword="Kurvene er pedagogiske eksempler med valgte halveringstider, ikke universelle stabilitetsdata. Virkelig stabilitet må dokumenteres for analytt, matriks, beholder og lagringsbetingelser."
    >
      <div className={shared.stack}>
        <svg viewBox="0 0 520 220" className={shared.svg} aria-hidden="true">
          <line x1="45" y1="185" x2="475" y2="185" className={styles.axis} />
          <line x1="45" y1="185" x2="45" y2="35" className={styles.axis} />
          <path d={storagePath(STORAGE.cold.halfLife)} className={styles.storageCold} />
          <path d={storagePath(STORAGE.room.halfLife)} className={styles.storageRoom} />
          <path d={storagePath(STORAGE.warm.halfLife)} className={styles.storageWarm} />
          <line x1={markerX} y1="35" x2={markerX} y2="185" className={styles.markerLine} />
          <circle cx={markerX} cy={markerY} r="7" className={styles.point} />
          <text x="405" y="210" className={styles.svgText}>tid</text>
          <text x="52" y="30" className={styles.svgText}>gjenværende analytt</text>
        </svg>
        <div className={styles.legend}>
          <span className={styles.legendItem}><span className={styles.legendCold} />4 °C</span>
          <span className={styles.legendItem}><span className={styles.legendRoom} />20 °C</span>
          <span className={styles.legendItem}><span className={styles.legendWarm} />35 °C</span>
        </div>
        <ChipGroup label="Temperaturkurve for avlesning">
          {(Object.keys(STORAGE) as StorageTemperature[]).map((key) => (
            <Chip
              key={key}
              variant="choice"
              pressed={temperature === key}
              onClick={() => setTemperature(key)}
            >
              {STORAGE[key].label}
            </Chip>
          ))}
        </ChipGroup>
        <div className={shared.row}>
          <Readout
            label="Valgt lagringstid"
            value={<MathFormula tex={"t = " + texNumber(timeHours, 0) + "\\,\\mathrm{h}"} />}
            size="small"
          />
          <Readout
            label="Illustrert gjenværende analytt"
            value={<MathFormula tex={"C_t/C_0 = " + texNumber(remaining, 1) + "\\,\\%"} />}
            size="small"
          />
        </div>
        <Verdict reserve={3}>
          Ved {selected.legend} lagring viser denne illustrasjonen {comma(remaining, 1)} % gjenværende analytt etter {comma(timeHours, 0)} timer.
        </Verdict>
        <Slider
          label="Lagringstid i stabilitetsillustrasjonen"
          valueText={
            comma(timeHours, 0) +
            " timer; " +
            comma(remaining, 1) +
            " prosent gjenværende ved " +
            selected.label
          }
          value={timeHours}
          onChange={setTimeHours}
          min={0}
          max={168}
          step={12}
          ends={["start", "7 døgn"]}
        />
      </div>
    </DemonstrationFrame>
  );
}
