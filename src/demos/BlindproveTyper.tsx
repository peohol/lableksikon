import { DemonstrationFrame } from "@/components/DemonstrationFrame";
import shared from "./demos.module.css";
import styles from "./BlindproveTyper.module.css";

/**
 * Statisk illustrasjon: begrepet er en kategori, ikke en variabel. Ingenting å
 * skru på — de tre typene og hva hver av dem fanger opp er hele poenget.
 */
export default function BlindproveTyper() {
  return (
    <DemonstrationFrame
      kind="illustrasjon"
      instruction="Tre blindprøver, tre ting de fanger opp"
      label="Illustrasjon: tre typer blindprøver"
      afterword="Søylene nederst i hver figur antyder hvor mye signal blindprøven typisk gir. Ingen av dem skal gi noe, men de gjør det ofte likevel."
    >
      <div className={shared.columns}>
        <div>
          <svg viewBox="0 0 120 130" aria-hidden="true" className={styles.vial}>
            <path d="M40 16 h40 v58 a20 20 0 0 1 -40 0 Z" className="surface-muted-fill svg-axis" strokeWidth="1.5" />
            <path d="M42 62 h36 a18 18 0 0 1 -36 0 Z" className={`series-1-fill ${styles.liquid}`} />
            <rect x="34" y="10" width="52" height="7" rx="3" className="svg-label-ink" />
            <line x1="20" y1="112" x2="100" y2="112" className="svg-hairline" />
            <rect x="54" y="104" width="12" height="8" className="series-1-fill" />
          </svg>
          <p className={shared.columnName}>Reagensblank</p>
          <p className={shared.columnText}>
            Bare løsemiddel og reagenser. Fanger opp forurensning i det du tilsetter.
          </p>
        </div>
        <div>
          <svg viewBox="0 0 120 130" aria-hidden="true" className={styles.vial}>
            <path d="M40 16 h40 v58 a20 20 0 0 1 -40 0 Z" className="surface-muted-fill svg-axis" strokeWidth="1.5" />
            <path d="M42 56 h36 a18 18 0 0 1 -36 0 Z" className={`series-1-fill ${styles.liquidMore}`} />
            <rect x="34" y="10" width="52" height="7" rx="3" className="svg-label-ink" />
            <path d="M24 30 c8 -10 16 4 24 -4" className="series-2-stroke" strokeWidth="1.5" />
            <line x1="20" y1="112" x2="100" y2="112" className="svg-hairline" />
            <rect x="54" y="98" width="12" height="14" className="series-1-fill" />
          </svg>
          <p className={shared.columnName}>Metodeblank</p>
          <p className={shared.columnText}>
            Går gjennom hele opparbeidingen. Fanger opp alt utstyr og alle trinn på veien.
          </p>
        </div>
        <div>
          <svg viewBox="0 0 120 130" aria-hidden="true" className={styles.vial}>
            <path d="M40 16 h40 v58 a20 20 0 0 1 -40 0 Z" className="surface-muted-fill svg-axis" strokeWidth="1.5" />
            <path d="M42 48 h36 a18 18 0 0 1 -36 0 Z" className={`series-2-fill ${styles.liquidMore}`} />
            <rect x="34" y="10" width="52" height="7" rx="3" className="svg-label-ink" />
            <g className="series-2-fill">
              <circle cx="52" cy="58" r="2.5" />
              <circle cx="66" cy="66" r="2" />
              <circle cx="60" cy="52" r="1.8" />
            </g>
            <line x1="20" y1="112" x2="100" y2="112" className="svg-hairline" />
            <rect x="54" y="92" width="12" height="20" className="series-1-fill" />
          </svg>
          <p className={shared.columnName}>Matriksblank</p>
          <p className={shared.columnText}>
            Ekte matriks uten analytten. Viser hva matriksen selv bidrar med.
          </p>
        </div>
      </div>
    </DemonstrationFrame>
  );
}
