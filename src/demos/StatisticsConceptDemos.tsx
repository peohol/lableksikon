import { DemonstrationFrame } from "@/components/DemonstrationFrame";
import styles from "./StatisticsConceptDemos.module.css";

function ValueRows({ rows }: { rows: Array<{ label: string; values: string }> }) {
  return <div className={styles.valueRows}>{rows.map((row) => <div key={row.label} className={styles.valueRow}><span className={styles.rowLabel}>{row.label}</span><span className={styles.rowValues}>{row.values}</span></div>)}</div>;
}

function Flow({ items }: { items: string[] }) {
  return <ol className={styles.flow}>{items.map((item, index) => <li key={item} className={styles.flowItem}><span className={styles.flowNumber}>{index + 1}</span><span>{item}</span></li>)}</ol>;
}

export function GjennomsnittDemo() {
  return <DemonstrationFrame kind="formel" instruction="Fordel totalsummen likt på alle observasjonene." label="Gjennomsnitt som balanseringspunkt" afterword="\(9 + 10 + 11 = 30\), og \(30/3 = 10\)."><ValueRows rows={[{ label: "Data", values: "9 · 10 · 11" }, { label: "Sum", values: "30" }, { label: "Gjennomsnitt", values: "10" }]} /></DemonstrationFrame>;
}

export function MedianDemo() {
  return <DemonstrationFrame kind="sammenligning" instruction="Sorter verdiene og finn midten." label="Median med og uten ekstremverdi" afterword="Ekstremverdien flytter gjennomsnittet mye mer enn medianen."><ValueRows rows={[{ label: "Data", values: "2 · 4 · 7 · 9 · 30" }, { label: "Median", values: "7" }, { label: "Gjennomsnitt", values: "10,4" }]} /></DemonstrationFrame>;
}

export function VariansDemo() {
  return <DemonstrationFrame kind="formel" instruction="Se hvordan avvik fra gjennomsnittet kvadreres før de summeres." label="Varians bygges av kvadrerte avvik" afterword="Kvadrering gjør alle bidrag positive og gir store avvik større innflytelse."><ValueRows rows={[{ label: "Data", values: "8 · 10 · 12; \\(\\bar{x} = 10\\)" }, { label: "Avvik", values: "−2 · 0 · +2" }, { label: "Kvadrater", values: "4 · 0 · 4" }]} /></DemonstrationFrame>;
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
  return <DemonstrationFrame kind="sammenligning" instruction="Se hvordan én ekstrem observasjon kan påvirke ulike sammendrag." label="En mulig uteligger er ikke automatisk en feil" afterword="Punktet skal undersøkes, ikke automatisk slettes."><ValueRows rows={[{ label: "Data", values: "9 · 10 · 10 · 11 · 30" }, { label: "Gjennomsnitt", values: "14,0" }, { label: "Median", values: "10" }]} /></DemonstrationFrame>;
}
