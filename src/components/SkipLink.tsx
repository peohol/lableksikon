import styles from "./SkipLink.module.css";

/** Først i DOM, synlig ved fokus. Handoff kapittel 5. */
export function SkipLink() {
  return (
    <a href="#innhold" className={styles.skipLink}>
      Hopp til innhold
    </a>
  );
}
