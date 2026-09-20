import { DemonstrationFrame } from "@/components/DemonstrationFrame";
import { MathFormula } from "@/components/MathFormula";
import { comma, mean, relativeStandardDeviation, sampleStandardDeviation } from "@/lib/statistics";
import shared from "./demos.module.css";
import styles from "./StandardavvikFormel.module.css";

const TERMS = [
  {
    symbol: "x_i - \\bar{x}",
    text: "Avstanden fra hver enkelt måling til gjennomsnittet.",
  },
  {
    symbol: "(\\ldots)^2",
    text: "Kvadreringen fjerner fortegnet, så avvik over og under ikke utligner hverandre.",
  },
  {
    symbol: "n - 1",
    text: "Antall frihetsgrader. Én går tapt fordi gjennomsnittet er regnet ut fra samme data.",
  },
  {
    symbol: "\\sqrt{\\;}",
    text: "Kvadratroten fører resultatet tilbake til samme enhet som målingene.",
  },
];

/** Måleserien er den eneste kilden: alle tallene under regnes ut av den. */
export const MEASUREMENTS = [10.2, 10.4, 10.1, 10.5, 10.3, 10.3];

/** Søylehøydene skalerer serien inn i plottflata, med litt luft i hver ende. */
const LOWEST = Math.min(...MEASUREMENTS);
const HIGHEST = Math.max(...MEASUREMENTS);

function barHeight(value: number): number {
  if (HIGHEST === LOWEST) return 50;
  return 18 + ((value - LOWEST) / (HIGHEST - LOWEST)) * 64;
}

/** Uttrykket er begrepet: hvert ledd har en grunn til å være der. */
export default function StandardavvikFormel() {
  const average = mean(MEASUREMENTS);
  const standardDeviation = sampleStandardDeviation(MEASUREMENTS);
  const rsd = relativeStandardDeviation(MEASUREMENTS);
  const averageTex = comma(average, 2).replace(",", "{,}");
  const standardDeviationTex = comma(standardDeviation, 2).replace(",", "{,}");
  const rsdTex = comma(rsd, 1).replace(",", "{,}");

  return (
    <DemonstrationFrame
      kind="formel"
      instruction="Hvert ledd forklart"
      label="Demonstrasjon: formelen for standardavvik"
    >
      <p className="visually-hidden">
        Standardavviket s er kvadratroten av summen av kvadrerte avvik fra gjennomsnittet, delt på n
        minus 1.
      </p>
      <div className={styles.formula} aria-hidden="true">
        <MathFormula tex="s = \\sqrt{\\frac{\\sum_i (x_i - \\bar{x})^2}{n - 1}}" />
      </div>

      <dl className={styles.terms}>
        {TERMS.map((term) => (
          <div key={term.symbol}>
            <dt className={styles.symbol}><MathFormula tex={term.symbol} /></dt>
            <dd className={styles.explanation}>{term.text}</dd>
          </div>
        ))}
      </dl>

      <div className={`${shared.rule} ${styles.example}`}>
        <p className={shared.caption}>
          {MEASUREMENTS.length} målinger: {MEASUREMENTS.map((value) => comma(value, 1)).join(" · ")}{" "}
          mg/L
        </p>
        <div className={styles.bars} aria-hidden="true">
          {MEASUREMENTS.map((value, index) => (
            <div
              key={index}
              className={styles.bar}
              style={{ height: `${barHeight(value)}%` }}
            />
          ))}
        </div>
        <p className={styles.result}>
          <MathFormula tex={`\\bar{x} = ${averageTex}\\,\\mathrm{mg/L} \\quad s = ${standardDeviationTex}\\,\\mathrm{mg/L} \\quad \\mathrm{RSD} = ${rsdTex}\\,\\%`} />
        </p>
      </div>
    </DemonstrationFrame>
  );
}
