import { DemonstrationFrame } from "@/components/DemonstrationFrame";
import shared from "./demos.module.css";
import styles from "./RiktighetSkiver.module.css";

const BOARDS = [
  {
    name: "Presis, men ikke riktig",
    text: "Liten spredning, systematisk skjevhet. Gjentak avslører ingenting.",
    dotClass: "series-1-fill",
    dots: [
      [102, 40],
      [110, 48],
      [99, 50],
      [107, 36],
    ],
  },
  {
    name: "Riktig i snitt, men upresis",
    text: "Gjennomsnittet treffer, men et enkelt resultat kan ligge langt unna.",
    dotClass: "series-2-fill",
    dots: [
      [40, 44],
      [96, 92],
      [68, 66],
      [58, 102],
    ],
  },
  {
    name: "Nøyaktig",
    text: "Både samlet og på rett sted. Det er dette nøyaktighet betyr.",
    dotClass: "svg-label-ink",
    dots: [
      [66, 66],
      [74, 72],
      [68, 76],
      [76, 63],
    ],
  },
] as const;

/** Statisk sammenligning: skillet mellom de tre begrepene er selve innholdet. */
export default function RiktighetSkiver() {
  return (
    <DemonstrationFrame
      kind="sammenligning"
      instruction="Tre skiver, tre tilstander"
      label="Sammenligning: presisjon, riktighet og nøyaktighet"
    >
      <div className={shared.columns}>
        {BOARDS.map((board) => (
          <div key={board.name}>
            <svg viewBox="0 0 140 140" aria-hidden="true" className={styles.board}>
              <circle cx="70" cy="70" r="62" className="surface-muted-fill svg-hairline" />
              <circle cx="70" cy="70" r="40" className="surface-fill svg-hairline" />
              <circle cx="70" cy="70" r="19" className="surface-muted-fill svg-axis" />
              <g className={`${board.dotClass} stroke-surface`}>
                {board.dots.map(([cx, cy]) => (
                  <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="5" />
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
            Presisjon: gjentatte målinger. Riktighet: referansemateriale. Nøyaktighet: begge sett
            sammen.
          </dd>
        </div>
        <div>
          <dt className="readout-label">Uttrykkes som</dt>
          <dd className={styles.summaryText}>
            Presisjon: s eller RSD. Riktighet: skjevhet i prosent. Nøyaktighet: som regel ikke ett
            tall.
          </dd>
        </div>
      </dl>
    </DemonstrationFrame>
  );
}
