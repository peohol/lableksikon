import { DemonstrationFrame } from "@/components/DemonstrationFrame";
import styles from "./DetectionConceptDemos.module.css";

function Rows({ rows }: { rows: Array<{ label: string; value: string }> }) {
  return (
    <div className={styles.rows}>
      {rows.map((row) => (
        <div className={styles.row} key={row.label}>
          <span className={styles.label}>{row.label}</span>
          <span className={styles.value}>{row.value}</span>
        </div>
      ))}
    </div>
  );
}

function Flow({ items }: { items: string[] }) {
  return (
    <ol className={styles.flow}>
      {items.map((item, index) => (
        <li key={item}>
          <span aria-hidden="true">{index + 1}</span>
          {item}
        </li>
      ))}
    </ol>
  );
}

export function SignalStoyDemo() {
  return (
    <DemonstrationFrame
      kind="formel"
      instruction="Sammenlign samme signal med to støynivåer."
      label="Signal-støy-forholdet avhenger av både signal og støy"
      afterword="Hvilken praktisk S/N-verdi programvaren viser, avhenger også av hvordan signal og støy er beregnet."
    >
      <Rows
        rows={[
          { label: "Signaleffekt", value: "100 vilkårlige enheter" },
          { label: "Støyeffekt: eksempel A", value: "4 → forhold 25" },
          { label: "Støyeffekt: eksempel B", value: "25 → forhold 4" },
        ]}
      />
    </DemonstrationFrame>
  );
}

export function MassespektrometriDemo() {
  return (
    <DemonstrationFrame
      kind="stegvis"
      instruction="Følg ionet fra prøve til massespektrum."
      label="Hovedtrinnene i et massespektrometer"
      afterword="Instrumentdesign varierer, men ionisering, m/z-analyse og registrering er grunnleggende funksjoner."
    >
      <Flow items={["Prøve", "Ionekilde", "Masseanalysator", "Detektor", "Massespektrum"]} />
    </DemonstrationFrame>
  );
}

export function IoniseringDemo() {
  return (
    <DemonstrationFrame
      kind="sammenligning"
      instruction="Se hvordan en nøytral art kan bli målbar som ion."
      label="Ionisering lager ladde arter"
      afterword="Hvilke ioner som faktisk dannes, avhenger av ioniseringsmetoden og molekylet."
    >
      <Rows
        rows={[
          { label: "Nøytral art", value: "M" },
          { label: "Positivt eksempel", value: "[M + H]⁺" },
          { label: "Negativt eksempel", value: "[M − H]⁻" },
        ]}
      />
    </DemonstrationFrame>
  );
}

export function FragmenteringDemo() {
  return (
    <DemonstrationFrame
      kind="stegvis"
      instruction="Følg et valgt ion når det dissosierer."
      label="Fragmentering av et forløperion"
      afterword="Det registrerte produkt-ionet bærer ladning; et annet fragment kan være nøytralt og derfor ikke registreres direkte."
    >
      <Flow items={["Forløperion velges", "Energi tilføres", "Binding brytes", "Produkt-ion registreres"]} />
    </DemonstrationFrame>
  );
}

export function SimDemo() {
  return (
    <DemonstrationFrame
      kind="sammenligning"
      instruction="Sammenlign bred skanning med målrettet ionemonitorering."
      label="SIM følger utvalgte ionetoppsignaler"
      afterword="SIM velger m/z-signaler i ett massetrinn; det er ikke det samme som å følge en forløper–produkt-overgang."
    >
      <Rows
        rows={[
          { label: "Fullskanning", value: "m/z 50–500" },
          { label: "SIM", value: "m/z 121, 165 og 193" },
          { label: "Informasjon", value: "målrettet i stedet for bred spektral registrering" },
        ]}
      />
    </DemonstrationFrame>
  );
}

export function MrmDemo() {
  return (
    <DemonstrationFrame
      kind="stegvis"
      instruction="Følg en typisk forløper–produkt-overgang."
      label="MRM kombinerer ioneseleksjon, fragmentering og ny seleksjon"
      afterword="MRM innebærer flere slike SRM-observasjoner; en overgang er ikke nødvendigvis unik for ett stoff."
    >
      <Flow items={["Forløper m/z 300 velges", "Ion fragmenteres", "Produkt m/z 182 velges", "Overgangen registreres"]} />
    </DemonstrationFrame>
  );
}

export function MasseopplosningDemo() {
  return (
    <DemonstrationFrame
      kind="formel"
      instruction="Hold m/z lik og sammenlign to definerte toppbredder."
      label="Mindre Δm gir større numerisk resolving power når m/Δm brukes"
      afterword="Tallet er først sammenlignbart når kriteriet for Δm er spesifisert."
    >
      <Rows
        rows={[
          { label: "m/z", value: "500" },
          { label: "Δm = 0,010", value: "m/Δm = 50 000" },
          { label: "Δm = 0,005", value: "m/Δm = 100 000" },
        ]}
      />
    </DemonstrationFrame>
  );
}

export function LcmsDemo() {
  return (
    <DemonstrationFrame
      kind="stegvis"
      instruction="Se hvordan separasjon og deteksjon kobles."
      label="LC-MS: væskekromatografi før massespektrometri"
      afterword="LC og MS bidrar med ulike typer informasjon og må fungere som én samlet metode."
    >
      <Flow items={["LC-injeksjon", "Kromatografisk separasjon", "Ionisering ved grensesnittet", "m/z-analyse"]} />
    </DemonstrationFrame>
  );
}

export function GcmsDemo() {
  return (
    <DemonstrationFrame
      kind="stegvis"
      instruction="Se hvordan GC-separasjonen møter massespektrometeret."
      label="GC-MS: gasskromatografi før massespektrometri"
      afterword="Retensjonstid og massespektrum kan sammen gi mer identifikasjonsinformasjon enn hver dimensjon alene."
    >
      <Flow items={["Prøven introduseres i GC", "Komponentene separeres", "Eluatet ioniseres", "Massespektrum registreres"]} />
    </DemonstrationFrame>
  );
}

export function UvdetektorDemo() {
  return (
    <DemonstrationFrame
      kind="formel"
      instruction="Sammenlign innkommende og transmittert lys."
      label="UV-deteksjon bygger på absorbans"
      afterword="Absorbans er logaritmisk; 50 % og 10 % transmisjon gir derfor ikke absorbans på henholdsvis 0,5 og 0,9."
    >
      <Rows
        rows={[
          { label: "Formel", value: "A = log₁₀(P₀/P)" },
          { label: "P/P₀ = 0,50", value: "A ≈ 0,301" },
          { label: "P/P₀ = 0,10", value: "A = 1,000" },
        ]}
      />
    </DemonstrationFrame>
  );
}

export function FidDemo() {
  return (
    <DemonstrationFrame
      kind="stegvis"
      instruction="Følg eluaten gjennom en FID."
      label="FID gjør flammens ladningsbærere om til elektrisk strøm"
      afterword="Detektoren er destruktiv: forbindelsen forbrennes under registreringen."
    >
      <Flow items={["GC-eluat", "Hydrogen/luft-flamme", "Ladningsbærere dannes", "Elektrisk strøm måles"]} />
    </DemonstrationFrame>
  );
}

export function LedningsevneDemo() {
  return (
    <DemonstrationFrame
      kind="sammenligning"
      instruction="Se hva målecellen registrerer når en ionisk sone passerer."
      label="Ledningsevnedeteksjon registrerer endring mot mobilfasens bakgrunn"
      afterword="Alle ioner kan bidra til ledningsevnen; kromatografien og eluentsystemet gir den analytiske selektiviteten."
    >
      <Rows
        rows={[
          { label: "Før toppen", value: "stabil bakgrunnsledningsevne" },
          { label: "Analyttsone", value: "ionsammensetningen endres" },
          { label: "Detektorsignal", value: "ledningsevnen endres" },
        ]}
      />
    </DemonstrationFrame>
  );
}
