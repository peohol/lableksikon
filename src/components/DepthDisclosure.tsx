import styles from "./DepthDisclosure.module.css";

/**
 * Én dybde-disclosure per side, lukket som standard. Bygget på native
 * `<details>`/`<summary>`: tastaturbetjening og tilstandsannonsering kommer
 * fra plattformen, og innholdet er tilgjengelig også uten JavaScript.
 */
export function DepthDisclosure({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <details className={styles.details}>
      <summary className={styles.summary}>
        <span aria-hidden="true" className={styles.marker} />
        <span className={styles.title}>{title}</span>
      </summary>
      <div className={styles.content}>{children}</div>
    </details>
  );
}
