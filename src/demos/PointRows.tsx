import styles from "./PointRows.module.css";

export type PointTone = "accent" | "warning";

export interface PointRow {
  label: string;
  values: number[];
  tones?: PointTone[];
}

export interface PointMarker {
  value: number;
  tone?: PointTone;
  dashed?: boolean;
}

const clampPercent = (value: number) => Math.min(100, Math.max(0, value));

const percent = (value: number, min: number, max: number) =>
  clampPercent(((value - min) / (max - min)) * 100);

const label = (value: number) => String(value).replace(".", ",");

/**
 * Felles visuell byggestein for punktbaserte demonstrasjoner.
 * Selve plottet er dekorativt; tall og tolkning ligger alltid i tekst ved siden av.
 */
export function PointRows({
  rows,
  min,
  max,
  markers = [],
}: {
  rows: PointRow[];
  min: number;
  max: number;
  markers?: PointMarker[];
}) {
  return (
    <div className={styles.plot} aria-hidden="true">
      {rows.map((row) => (
        <div key={row.label} className={styles.row}>
          <span className={styles.rowLabel}>{row.label}</span>
          <div className={styles.track}>
            <span className={styles.axis} />
            {markers.map((marker, index) => (
              <span
                key={`${marker.value}-${index}`}
                className={`${styles.marker} ${
                  marker.tone === "warning" ? styles.markerWarning : styles.markerAccent
                } ${marker.dashed ? styles.markerDashed : ""}`}
                style={{ left: `${percent(marker.value, min, max)}%` }}
              />
            ))}
            {row.values.map((value, index) => (
              <span
                key={`${value}-${index}`}
                className={`${styles.point} ${
                  row.tones?.[index] === "warning" ? styles.pointWarning : styles.pointAccent
                }`}
                style={{
                  left: `${percent(value, min, max)}%`,
                  top: `${50 + ((index % 3) - 1) * 18}%`,
                }}
              />
            ))}
          </div>
        </div>
      ))}
      <div className={styles.scale} aria-hidden="true">
        <span>{label(min)}</span>
        <span>{label(max)}</span>
      </div>
    </div>
  );
}
