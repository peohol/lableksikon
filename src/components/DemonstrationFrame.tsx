import styles from "./DemonstrationFrame.module.css";

/** Typeetiketten i figcaption. Låst vokabular fra handoffen (2.14). */
export type DemonstrationKind =
  | "illustrasjon"
  | "interaktiv"
  | "interaktiv, stor"
  | "før og etter"
  | "sammenligning"
  | "stegvis"
  | "formel";

/**
 * Den ytre rammen rundt enhver demonstrasjon. Rammen, typeetiketten og
 * handlingsanvisningen er felles; alt innenfor bestemmes av begrepet.
 *
 * `width` velger spalte i begrepssidens grid, slik at en bred demonstrasjon
 * kan strekke seg utenfor lesespalten uten at teksten flytter seg.
 *
 * Handoffen ber om `role="group"` med `aria-label`. ARIA in HTML tillater ikke
 * den rollen på `<figure>`, og figure har allerede grupperende semantikk, så
 * navnet legges på figuren selv i stedet for å overstyre rollen.
 */
export function DemonstrationFrame({
  kind,
  instruction,
  label,
  width = "text",
  afterword,
  children,
}: {
  kind: DemonstrationKind;
  instruction: string;
  label: string;
  width?: "text" | "wide" | "extra-wide";
  afterword?: string;
  children: React.ReactNode;
}) {
  const widthClass =
    width === "wide" ? styles.wide : width === "extra-wide" ? styles.extraWide : styles.text;

  return (
    <figure aria-label={label} className={`${styles.frame} ${widthClass}`}>
      <figcaption className={styles.caption}>
        <span className="kicker">Demonstrasjon · {kind}</span>
        <span className={styles.instruction}>{instruction}</span>
      </figcaption>
      <div className={styles.content}>{children}</div>
      {afterword ? <p className={`lead ${styles.afterword}`}>{afterword}</p> : null}
    </figure>
  );
}
