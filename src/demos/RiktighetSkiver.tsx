import { DemonstrationFrame } from "@/components/DemonstrationFrame";
import shared from "./demos.module.css";
import styles from "./RiktighetSkiver.module.css";

const BOARDS = [
  {
    name: "Presis, men ikke riktig",
    text: "Liten spredning, systematisk skjevhet. Gjentak avslører ikke skjevheten alene.",
    dotClass: "series-1-fill",
    dots: [
      [101, 39],
      [108, 46],
      [98, 49],
      [105, 34],
      [111, 39],
      [102, 45],
    ],
  },
  {
    name: "Riktig i snitt, men upresis",
    text: "Gjennomsnittet ligger nær sentrum, men enkeltresultater kan ligge langt unna.",
    dotClass: "series-2-fill",
    dots: [
      [38, 43],
      [99, 94],
      [68, 64],
      [56, 104],
      [94, 47],
      [65, 67],
    ],
  },
  {
    name: "Nøyaktig",
    text: "Både liten spredning og liten skjevhet: målingene ligger samlet nær referansen.",
    dotClass: "svg-label-ink",
    dots: [
      [66, 66],
      [74, 71],
      [68, 77],
      [77, 64],
      [72, 68],
      [64, 73],
    ],
  },
] as const;

/** Statisk sammenligning: skillet mellom de tre begrepene er selve innholdet. */
export default function RiktighetSkiver() {
  return (
    <DemonstrationFrame
      kind="sammenligning"
      instruction="Sammenlign hvor målingene ligger, og hvor tett de ligger"
      label="Sammenligning: presisjon, riktighet og nøyaktighet"
    >
      <div className={shared.columns}>
        {BOARDS.map((board) => (
          <div key={board.name}>
            <svg viewBox="0 0 140 140" aria-hidden="true" className={styles.board}>
              <circle cx="70" cy="70" r="62" className="surface-muted-fill svg-hairline" />
              <circle cx="70" cy="70" r="45" className="surface-fill svg-hairline" />
              <circle cx="70" cy="70" r="28" className="surface-muted-fill svg-hairline" />
              <circle cx="70" cy="70" r="12" className="surface-fill svg-axis" />
              <line x1="70" y1="8" x2="70" y2="132" className="svg-guide" />
              <line x1="8" y1="70" x2="132" y2="70" className="svg-guide" />
              <circle cx="70" cy="70" r="2.5" className="svg-label-ink" />
              <g className={`${board.dotClass} stroke-surface`}>
                {board.dots.map(([cx, cy]) => (
                  <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="4.5" strokeWidth="1.5" />
                ))}
              </g>
            </svg>
            <p className={shared.columnName}>{board.name}</p>
            <p className={shared.columnText}>{board.text}</p>
          </div>
        ))}
      </div>
      <dl className={styles.summary}>
        <div>
          <dt className="readout-label">Måles ved</dt>
          <dd className={styles.summaryText}>
            Presisjon: gjentatte målinger. Riktighet: sammenligning med en egnet referanse.
            Nøyaktighet: hvor nær måleresultater ligger den sanne størrelsesverdien.
          </dd>
        </div>
        <div>
          <dt className="readout-label">Uttrykkes som</dt>
          <dd className={styles.summaryText}>
            Presisjon kan beskrives med for eksempel s eller RSD, mens systematisk avvik kan
            beskrives som skjevhet. Nøyaktighet er ikke nødvendigvis ett eget tall.
          </dd>
        </div>
      </dl>
    </DemonstrationFrame>
  );
}
