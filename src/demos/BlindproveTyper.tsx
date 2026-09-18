import { DemonstrationFrame } from "@/components/DemonstrationFrame";
import shared from "./demos.module.css";
import styles from "./BlindproveTyper.module.css";

function Vial({ kind }: { kind: "reagent" | "method" | "matrix" }) {
  return (
    <svg viewBox="0 0 150 135" aria-hidden="true" className={styles.vial}>
      <rect x="49" y="13" width="52" height="9" rx="3" className="svg-label-ink" />
      <path
        d="M54 22v9l-8 14v48c0 18 12 29 29 29s29-11 29-29V45l-8-14v-9"
        className="surface-muted-fill svg-axis"
        strokeWidth="1.5"
      />
      <path d="M48 72h54v21c0 16-11 26-27 26S48 109 48 93Z" className="series-1-fill" opacity=".18" />
      <line x1="48" y1="72" x2="102" y2="72" className="series-1-stroke" strokeWidth="1.5" />

      {kind === "reagent" ? (
        <>
          <path d="M29 32c0 5-4 9-9 9s-9-4-9-9c0-6 9-16 9-16s9 10 9 16Z" className="series-1-fill" opacity=".35" />
          <path d="M139 32c0 5-4 9-9 9s-9-4-9-9c0-6 9-16 9-16s9 10 9 16Z" className="series-1-fill" opacity=".35" />
        </>
      ) : null}

      {kind === "method" ? (
        <>
          <path d="M18 24h25v18H18zM112 22h20v20h-20z" className="svg-hairline" strokeWidth="1.5" />
          <path d="M30 42v12m92-12v12" className="svg-guide" strokeWidth="1.5" />
          <circle cx="58" cy="86" r="2.5" className="series-2-fill" />
          <circle cx="91" cy="99" r="2" className="series-2-fill" />
        </>
      ) : null}

      {kind === "matrix" ? (
        <g className="svg-label-ink" opacity=".55">
          <circle cx="57" cy="84" r="3" />
          <circle cx="68" cy="94" r="2.2" />
          <circle cx="82" cy="82" r="2.5" />
          <circle cx="92" cy="103" r="3.2" />
          <circle cx="72" cy="109" r="1.8" />
          <circle cx="88" cy="91" r="1.8" />
        </g>
      ) : null}
    </svg>
  );
}

/**
 * Statisk illustrasjon: begrepet er en kategori, ikke en variabel. Ingenting å
 * skru på — de tre typene og hva hver av dem fanger opp er hele poenget.
 */
export default function BlindproveTyper() {
  return (
    <DemonstrationFrame
      kind="illustrasjon"
      instruction="Tre blindprøver, tre ting de kan avdekke"
      label="Illustrasjon: tre typer blindprøver"
      afterword="Forskjellen er hva blankprøven inneholder og hvilke deler av analyseforløpet den følger — ikke at én blanktype generelt skal gi mer eller mindre signal enn en annen."
    >
      <div className={shared.columns}>
        <div>
          <Vial kind="reagent" />
          <p className={shared.columnName}>Reagensblank</p>
          <p className={shared.columnText}>
            Bare løsemiddel og reagenser. Fanger opp forurensning i det du tilsetter.
          </p>
        </div>
        <div>
          <Vial kind="method" />
          <p className={shared.columnName}>Metodeblank</p>
          <p className={shared.columnText}>
            Går gjennom hele opparbeidingen. Fanger opp bidrag fra utstyr, reagenser og alle trinn
            på veien.
          </p>
        </div>
        <div>
          <Vial kind="matrix" />
          <p className={shared.columnName}>Matriksblank</p>
          <p className={shared.columnText}>
            Ekte matriks uten analytten. Viser signal og interferens som selve matriksen kan bidra
            med.
          </p>
        </div>
      </div>
    </DemonstrationFrame>
  );
}
