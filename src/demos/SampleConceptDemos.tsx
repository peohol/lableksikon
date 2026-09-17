import { DemonstrationFrame } from "@/components/DemonstrationFrame";
import shared from "./demos.module.css";
import styles from "./SampleConceptDemos.module.css";

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

export function IonesuppresjonDemo() {
  return (
    <DemonstrationFrame kind="sammenligning" instruction="Sammenlign samme analyttmengde i ren løsning og i en matriks som hemmer ioniseringen." label="Ionesuppresjon gir lavere respons ved samme analyttmengde" afterword="Analyttmengden er den samme, men ioniseringseffektiviteten faller i matriksen.">
      <ValueRows rows={[{ label: "Ren løsning", values: "10 ng/mL → signal 100" }, { label: "Matriks", values: "10 ng/mL → signal 62" }]} />
    </DemonstrationFrame>
  );
}

export function IoneforsterkningDemo() {
  return (
    <DemonstrationFrame kind="sammenligning" instruction="Sammenlign samme analyttmengde når matriksen øker ioniseringseffektiviteten." label="Ioneforsterkning gir høyere respons ved samme analyttmengde" afterword="Et sterkere signal betyr ikke at prøven inneholder mer analytt.">
      <ValueRows rows={[{ label: "Ren løsning", values: "10 ng/mL → signal 100" }, { label: "Matriks", values: "10 ng/mL → signal 138" }]} />
    </DemonstrationFrame>
  );
}

export function InterferensDemo() {
  return (
    <DemonstrationFrame kind="sammenligning" instruction="Se hvordan en interferent kan endre signalet systematisk." label="Interferens endrer analyttsignalet" afterword="Interferens kan både øke og redusere målesignalet; poenget er at en annen komponent påvirker resultatet systematisk.">
      <div className={styles.columns}>
        <div><span className={styles.cardTitle}>Analytt alene</span><strong className={styles.signal}>100</strong></div>
        <div><span className={styles.cardTitle}>+ interferent A</span><strong className={styles.signal}>128</strong></div>
        <div><span className={styles.cardTitle}>+ interferent B</span><strong className={styles.signal}>74</strong></div>
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
  return (
    <DemonstrationFrame kind="stegvis" instruction="Se hvordan materiale fra en høy prøve kan følge med til den neste." label="Carry-over som eksempel på krysskontaminering" afterword="Instrumentell carry-over er én type krysskontaminering; overføring kan også skje tidligere i arbeidsflyten.">
      <ValueRows rows={[{ label: "Prøve A", values: "1000" }, { label: "Blank etter A", values: "12" }, { label: "Neste blank", values: "2" }]} />
    </DemonstrationFrame>
  );
}

export function BakgrunnssignalDemo() {
  return (
    <DemonstrationFrame kind="sammenligning" instruction="Skill et stabilt bakgrunnsnivå fra tilfeldig variasjon rundt nivået." label="Bakgrunnssignal og støy er forskjellige størrelser" afterword="Bakgrunnen kan ligge over null selv når analytten ikke bidrar; støy er variasjonen rundt dette nivået.">
      <ValueRows rows={[{ label: "Bakgrunnsnivå", values: "ca. 8 responsenheter" }, { label: "Tilfeldig støy", values: "typisk ±1 rundt bakgrunnen" }, { label: "Analytt + bakgrunn", values: "ca. 48 responsenheter" }]} />
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

export function ProvelagringDemo() {
  return (
    <DemonstrationFrame kind="sammenligning" instruction="Se hvordan tid og temperatur kan endre en prøves målbare analyttnivå." label="Prøvelagring påvirker prøvens integritet" afterword="Riktig lagring er analytt- og matriksavhengig; tallene her illustrerer prinsippet, ikke en universell stabilitetsregel.">
      <ValueRows rows={[{ label: "Start", values: "100 %" }, { label: "Validert kjølig lagring", values: "98 % etter 48 t" }, { label: "Uegnet varm lagring", values: "74 % etter 48 t" }]} />
    </DemonstrationFrame>
  );
}
