import { DemonstrationFrame } from "@/components/DemonstrationFrame";
import styles from "./QualityConceptDemos.module.css";

function Rows({ rows }: { rows: Array<{ label: string; value: string }> }) {
  return (
    <div className={styles.valueRows}>
      {rows.map((row) => (
        <div key={row.label} className={styles.valueRow}>
          <span className={styles.rowLabel}>{row.label}</span>
          <span className={styles.rowValues}>{row.value}</span>
        </div>
      ))}
    </div>
  );
}

export function SiSystemDemo() {
  return (
    <DemonstrationFrame
      kind="sammenligning"
      instruction="Se hvordan baseenhetene danner byggesteiner for andre SI-enheter."
      label="SI fra baseenheter til avledede enheter"
      afterword="SI er hele systemet av baseenheter og avledede enheter; siden 2019 er systemet definert gjennom sju fastsatte konstanter."
    >
      <Rows rows={[
        { label: "Baseenheter", value: "s · m · kg · A · K · mol · cd" },
        { label: "Avledet eksempel", value: "\\(\\mathrm{Pa}=\\mathrm{kg}\\,\\mathrm{m}^{-1}\\,\\mathrm{s}^{-2}\\)" },
        { label: "Molmasse", value: "kg/mol" },
        { label: "Stoffmengdekonsentrasjon", value: "\\(\\mathrm{mol/m^3}\\)" },
      ]} />
    </DemonstrationFrame>
  );
}

export function MolmasseDemo() {
  return (
    <DemonstrationFrame
      kind="formel"
      instruction="Bruk molmassen som koblingen mellom stoffmengde og masse."
      label="Molmasse som forholdet mellom masse og stoffmengde"
      afterword="\(M = m/n\). Kjenner du to av størrelsene, kan den tredje beregnes."
    >
      <div className={styles.formulaLine}>
        <span>\(M = 40{,}0\,\mathrm{g/mol}\)</span>
        <span>\(n = 0{,}250\,\mathrm{mol}\)</span>
        <strong>\(m = 10{,}0\,\mathrm{g}\)</strong>
      </div>
    </DemonstrationFrame>
  );
}

export function MolaritetDemo() {
  return (
    <DemonstrationFrame
      kind="formel"
      instruction="Del stoffmengden på sluttvolumet av blandingen."
      label="Stoffmengdekonsentrasjon beregnet fra stoffmengde og sluttvolum"
      afterword="Nevneren er den ferdige løsningens volum, ikke volumet av løsemiddel før tillaging."
    >
      <div className={styles.formulaLine}>
        <span>\(n = 0{,}100\,\mathrm{mol}\)</span>
        <span>\(V = 0{,}500\,\mathrm{L}\)</span>
        <strong>\(c = 0{,}200\,\mathrm{mol/L}\)</strong>
      </div>
    </DemonstrationFrame>
  );
}

export function MasseprosentDemo() {
  return (
    <DemonstrationFrame
      kind="sammenligning"
      instruction="Sammenlign to regnestykker som bruker ulik nevner."
      label="Masseprosent bruker total masse som nevner"
      afterword="5 g analytt pluss 100 g løsemiddel gir totalt 105 g og derfor omtrent 4,76 %, ikke 5 %."
    >
      <Rows rows={[
        { label: "5 g av 100 g totalt", value: "\\(5/100 \\times 100\\,\\% = 5{,}00\\,\\%\\)" },
        { label: "5 g + 100 g løsemiddel", value: "\\(5/105 \\times 100\\,\\% = 4{,}76\\,\\%\\)" },
      ]} />
    </DemonstrationFrame>
  );
}

export function PpmDemo() {
  return (
    <DemonstrationFrame
      kind="sammenligning"
      instruction="Se hva 1 ppm betyr for ulike dimensjonsløse fraksjoner — og hva det ikke betyr."
      label="ppm som \(10^{-6}\) relativ verdi"
      afterword="ppm må knyttes til hvilken fraksjon som menes. mg/L er en konsentrasjon og er ikke generelt ppm."
    >
      <Rows rows={[
        { label: "Massefraksjon", value: "\\(1\\,\\mathrm{mg/kg} = 1\\,\\mathrm{ppm}\\)" },
        { label: "Stoffmengdefraksjon", value: "\\(1\\,\\mathrm{\\mu mol/mol} = 1\\,\\mathrm{ppm}\\)" },
        { label: "Volumfraksjon", value: "\\(1\\,\\mathrm{\\mu L/L} = 1\\,\\mathrm{ppm}\\)" },
        { label: "Massekonsentrasjon", value: "\\(1\\,\\mathrm{mg/L} \\ne 1\\,\\mathrm{ppm}\\) generelt" },
      ]} />
    </DemonstrationFrame>
  );
}
