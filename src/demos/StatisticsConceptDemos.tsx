"use client";

import { useState } from "react";

import { DemonstrationFrame } from "@/components/DemonstrationFrame";
import { MathFormula } from "@/components/MathFormula";
import {
  comma,
  mean,
  median,
  sampleStandardDeviation,
  sampleVariance,
} from "@/lib/statistics";
import { PointRows } from "./PointRows";
import { Readout, Slider, Verdict } from "./primitives";
import shared from "./demos.module.css";
import styles from "./StatisticsConceptDemos.module.css";

function ValueRows({ rows }: { rows: Array<{ label: string; values: string }> }) {
  return <div className={styles.valueRows}>{rows.map((row) => <div key={row.label} className={styles.valueRow}><span className={styles.rowLabel}>{row.label}</span><span className={styles.rowValues}>{row.values}</span></div>)}</div>;
}

function Flow({ items }: { items: string[] }) {
  return <ol className={styles.flow}>{items.map((item, index) => <li key={item} className={styles.flowItem}><span className={styles.flowNumber}>{index + 1}</span><span>{item}</span></li>)}</ol>;
}

const texNumber = (value: number, decimals: number) =>
  comma(value, decimals).replace(",", "{,}");

export function GjennomsnittDemo() {
  const [movingPoint, setMovingPoint] = useState(12);
  const values = [2, 4, 6, 8, movingPoint];
  const average = mean(values);

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Flytt én observasjon og se balansepunktet følge etter."
      label="Gjennomsnitt som balansepunkt på en tallinje"
      afterword="Alle observasjonene påvirker gjennomsnittet. Hvor langt et punkt flyttes betyr derfor noe, ikke bare rekkefølgen."
    >
      <div className={shared.stack}>
        <PointRows rows={[{ label: "Fem observasjoner", values }]} min={0} max={20} markers={[{ value: average }]} />
        <Readout
          label="Gjennomsnitt"
          value={<MathFormula tex={`\\bar{x} = ${texNumber(average, 1)}`} />}
          size="small"
        />
        <Verdict reserve={2.8}>
          Flytter du det siste punktet mot høyre, flytter gjennomsnittet seg samme vei fordi hele avstanden inngår i beregningen.
        </Verdict>
        <Slider
          label="Plassering av den femte observasjonen"
          valueText={`Femte observasjon ${movingPoint}`}
          value={movingPoint}
          onChange={setMovingPoint}
          min={8}
          max={18}
          ends={["nær de andre", "langt til høyre"]}
        />
      </div>
    </DemonstrationFrame>
  );
}

export function MedianDemo() {
  const [extreme, setExtreme] = useState(14);
  const values = [2, 4, 7, 9, extreme];
  const average = mean(values);
  const middle = median(values);

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Dra ytterpunktet utover og sammenlign median med gjennomsnitt."
      label="Medianen står stille når en ytterverdi flyttes"
      afterword="Medianen bestemmes av rangeringen. Gjennomsnittet bruker derimot avstanden til alle observasjonene."
    >
      <div className={shared.stack}>
        <PointRows
          rows={[{ label: "Sorterte data", values }]}
          min={0}
          max={32}
          markers={[
            { value: average },
            { value: middle, tone: "warning", dashed: true },
          ]}
        />
        <p className={shared.caption}>Heltrukken linje: gjennomsnitt · stiplet linje: median</p>
        <div className={shared.row}>
          <Readout
            label="Gjennomsnitt"
            value={<MathFormula tex={`\\bar{x} = ${texNumber(average, 1)}`} />}
            size="small"
          />
          <Readout
            label="Median"
            value={<MathFormula tex={`\\tilde{x} = ${texNumber(middle, 1)}`} />}
            size="small"
          />
        </div>
        <Verdict reserve={2.8}>
          Medianen blir {comma(middle, 1)} hele veien, mens gjennomsnittet trekkes mot ytterpunktet.
        </Verdict>
        <Slider
          label="Plassering av den største observasjonen"
          valueText={`Største observasjon ${extreme}`}
          value={extreme}
          onChange={setExtreme}
          min={9}
          max={30}
          ends={["rett utenfor midten", "svært langt ute"]}
        />
      </div>
    </DemonstrationFrame>
  );
}

export function VariansDemo() {
  const [movingPoint, setMovingPoint] = useState(12);
  const values = [8, 9, 10, movingPoint];
  const average = mean(values);
  const variance = sampleVariance(values);
  const squares = values.map((value) => (value - average) ** 2);
  const largestSquare = Math.max(...squares, 0.01);

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Flytt ett punkt og se avvikene og de kvadrerte bidragene vokse."
      label="Varians bygget av kvadrerte avvik fra gjennomsnittet"
      afterword="Her vises utvalgsvariansen med \(n-1\) i nevneren. Store avvik får stor vekt fordi de kvadreres."
    >
      <div className={shared.stack}>
        <PointRows rows={[{ label: "Fire observasjoner", values }]} min={7} max={19} markers={[{ value: average }]} />
        <div className={styles.squareBlock}>
          <span className={styles.squareTitle}>Kvadrerte avvik fra gjennomsnittet</span>
          <div className={styles.squareBars} aria-hidden="true">
            {squares.map((square, index) => (
              <div key={index} className={styles.squareRow}>
                <span
                  className={`${styles.squareBar} ${index === values.length - 1 ? styles.squareBarWarning : ""}`}
                  style={{ width: `${Math.max(4, (square / largestSquare) * 100)}%` }}
                />
              </div>
            ))}
          </div>
        </div>
        <div className={shared.row}>
          <Readout
            label="Gjennomsnitt"
            value={<MathFormula tex={`\\bar{x} = ${texNumber(average, 2)}`} />}
            size="small"
          />
          <Readout
            label="Utvalgsvarians"
            value={<MathFormula tex={`s^2 = ${texNumber(variance, 2)}`} />}
            size="small"
          />
        </div>
        <Verdict reserve={2.8}>
          Når ett punkt flyttes langt bort, vokser både avviket og det kvadrerte bidraget uforholdsmessig mye.
        </Verdict>
        <Slider
          label="Plassering av den fjerde observasjonen"
          valueText={`Fjerde observasjon ${movingPoint}, varians ${comma(variance, 2)}`}
          value={movingPoint}
          onChange={setMovingPoint}
          min={10}
          max={18}
          ends={["nær resten", "langt fra resten"]}
        />
      </div>
    </DemonstrationFrame>
  );
}

export function NormalfordelingDemo() {
  return <DemonstrationFrame kind="sammenligning" instruction="Se hvor mye av en normalfordeling som ligger nær middelverdien." label="68–95–99,7-regelen for normalfordelingen" afterword="Prosentene gjelder en idealisert normalfordeling, ikke alle klokkeformede datasett."><ValueRows rows={[{ label: "\\(\\mu \\pm 1\\sigma\\)", values: "ca. 68,3 %" }, { label: "\\(\\mu \\pm 2\\sigma\\)", values: "ca. 95,4 %" }, { label: "\\(\\mu \\pm 3\\sigma\\)", values: "ca. 99,7 %" }]} /></DemonstrationFrame>;
}

export function FrihetsgraderDemo() {
  return <DemonstrationFrame kind="stegvis" instruction="Lås gjennomsnittet og se hvorfor siste avvik bestemmes av de andre." label="Tre observasjoner og to frihetsgrader" afterword="Når summen av avvik skal være null, er bare \(n - 1\) av avvikene uavhengige."><Flow items={["Tre observasjoner", "Gjennomsnittet estimeres", "To avvik kan variere fritt", "Det tredje må få summen til null"]} /></DemonstrationFrame>;
}

export function KonfidensintervallDemo() {
  return <DemonstrationFrame kind="sammenligning" instruction="Tenk deg at samme studie gjentas mange ganger." label="Konfidensnivå som langsiktig dekningsandel" afterword="Ved en korrekt 95 %-metode vil omtrent 95 av 100 intervaller dekke den sanne parameteren over mange gjentakelser."><ValueRows rows={[{ label: "100 nye utvalg", values: "100 nye intervaller" }, { label: "Forventet dekning", values: "omtrent 95 dekker parameteren" }, { label: "Ett ferdig intervall", values: "dekker eller dekker ikke" }]} /></DemonstrationFrame>;
}

export function SignifikansnivaDemo() {
  return <DemonstrationFrame kind="sammenligning" instruction="Se \\(\\alpha\\) som en på forhånd valgt feilrate for testprosedyren." label="Signifikansnivå og type-I-feil" afterword="\\(\\alpha = 0{,}05\\) betyr ikke at nullhypotesen har 5 % sannsynlighet for å være sann."><ValueRows rows={[{ label: "Før data", values: "velg \\(\\alpha = 0{,}05\\)" }, { label: "Hvis \\(H_0\\) er sann", values: "inntil 5 % langsiktig forkastningsrate" }, { label: "Etter data", values: "sammenlign \\(p\\) med \\(\\alpha\\)" }]} /></DemonstrationFrame>;
}

export function TTestDemo() {
  return <DemonstrationFrame kind="formel" instruction="Sammenlign observert forskjell med standardfeilen." label="t-verdi som signal relativt til estimert tilfeldig variasjon" afterword="Stor absolutt t-verdi betyr at forskjellen er stor relativt til den estimerte standardfeilen."><ValueRows rows={[{ label: "Forskjell", values: "2,0" }, { label: "Standardfeil", values: "0,5" }, { label: "\\(t\\)", values: "\\(2{,}0/0{,}5 = 4{,}0\\)" }]} /></DemonstrationFrame>;
}

export function FTestDemo() {
  return <DemonstrationFrame kind="formel" instruction="Sammenlign to varianser som et forhold." label="F-statistikk som variansforhold" afterword="Et forhold nær 1 passer bedre med like varianser enn et forhold langt fra 1; kritiske grenser avhenger av frihetsgrader og \\(\\alpha\\)."><ValueRows rows={[{ label: "Varians A", values: "4" }, { label: "Varians B", values: "2" }, { label: "\\(F\\)", values: "\\(4/2 = 2\\)" }]} /></DemonstrationFrame>;
}

export function RegresjonDemo() {
  return <DemonstrationFrame kind="stegvis" instruction="Følg veien fra datapunkter til modell og residualer." label="Regresjon som modellering av respons" afterword="En god modell vurderes ikke bare etter hvor nær linjen ser ut til å ligge punktene."><Flow items={["Observer x og y", "Velg modellform", "Estimer parametere", "Undersøk residualer og prediksjoner"]} /></DemonstrationFrame>;
}

export function MinsteKvadraterDemo() {
  return <DemonstrationFrame kind="formel" instruction="Se hvordan residualene blir til én størrelse som skal minimeres." label="Minste kvadrater minimerer summen av residualkvadrater" afterword="Store residualer får ekstra stor innflytelse fordi de kvadreres."><ValueRows rows={[{ label: "Residualer", values: "−1 · +2 · −1" }, { label: "Kvadrater", values: "1 · 4 · 1" }, { label: "Sum", values: "6 — modellen velges for å gjøre denne minst mulig" }]} /></DemonstrationFrame>;
}

export function KorrelasjonDemo() {
  return <DemonstrationFrame kind="sammenligning" instruction="Sammenlign lineære mønstre med ulike retninger." label="Pearsons r beskriver lineær samvariasjon" afterword="\(r\) nær 0 betyr liten lineær sammenheng, men kan skjule et tydelig ikke-lineært mønster."><div className={styles.columns}><div><span className={styles.cardTitle}>Positiv</span><strong className={styles.signal}>{"\\(r \\approx +0{,}9\\)"}</strong></div><div><span className={styles.cardTitle}>Ingen lineær</span><strong className={styles.signal}>{"\\(r \\approx 0\\)"}</strong></div><div><span className={styles.cardTitle}>Negativ</span><strong className={styles.signal}>{"\\(r \\approx -0{,}9\\)"}</strong></div></div></DemonstrationFrame>;
}

export function UteliggerDemo() {
  const [movingPoint, setMovingPoint] = useState(13);
  const values = [9, 9.5, 10, 10.5, movingPoint];
  const average = mean(values);
  const middle = median(values);
  const sd = sampleStandardDeviation(values);
  const isFar = movingPoint >= 18;

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Flytt ett punkt bort fra resten og se hvilke sammendrag som følger etter."
      label="Mulig uteligger og påvirkning på statistiske sammendrag"
      afterword="Et avvikende punkt er ikke automatisk en feil. Demonstrasjonen viser påvirkning, ikke en regel for sletting."
    >
      <div className={shared.stack}>
        <PointRows
          rows={[{
            label: "Fem observasjoner",
            values,
            tones: values.map((_, index) => index === values.length - 1 && isFar ? "warning" : "accent"),
          }]}
          min={8}
          max={32}
          markers={[
            { value: average },
            { value: middle, tone: "warning", dashed: true },
          ]}
        />
        <p className={shared.caption}>Heltrukken linje: gjennomsnitt · stiplet linje: median</p>
        <div className={shared.row}>
          <Readout
            label="Gjennomsnitt"
            value={<MathFormula tex={`\\bar{x} = ${texNumber(average, 1)}`} />}
            size="small"
          />
          <Readout
            label="Median"
            value={<MathFormula tex={`\\tilde{x} = ${texNumber(middle, 1)}`} />}
            size="small"
          />
          <Readout
            label="Standardavvik"
            value={<MathFormula tex={`s = ${texNumber(sd, 1)}`} />}
            size="small"
          />
        </div>
        <Verdict tone={isFar ? "warning" : "normal"} reserve={3}>
          {isFar
            ? "Punktet ligger nå markert langt fra resten. Gjennomsnitt og standardavvik trekkes kraftig, mens medianen endres lite."
            : "Punktet ligger fortsatt forholdsvis nær resten. Flytt det videre og se påvirkningen øke."}
        </Verdict>
        <Slider
          label="Plassering av den mulige uteliggeren"
          valueText={`Siste observasjon ${movingPoint}`}
          value={movingPoint}
          onChange={setMovingPoint}
          min={11}
          max={30}
          ends={["nær datasettet", "langt fra datasettet"]}
        />
      </div>
    </DemonstrationFrame>
  );
}
