import Link from "next/link";

import styles from "./TermListItem.module.css";

/**
 * Klikkbar rad i en liste. `detailed` viser kicker, tittel og definisjon
 * (søketreff og kategoriside); `compact` viser bare tittelen (A–Å).
 * Definisjonen kommer alltid fra begrepet selv.
 */
export function TermListItem({
  slug,
  title,
  definition,
  kicker,
  variant = "detailed",
}: {
  slug: string;
  title: string;
  definition?: string;
  kicker?: React.ReactNode;
  variant?: "compact" | "detailed";
}) {
  return (
    <Link
      href={`/begrep/${slug}`}
      className={variant === "compact" ? styles.compact : styles.detailed}
    >
      {kicker ? <span className={`kicker kicker-accent ${styles.kicker}`}>{kicker}</span> : null}
      <span className={styles.title}>{title}</span>
      {variant === "detailed" && definition ? (
        <span className={styles.definition}>{definition}</span>
      ) : null}
    </Link>
  );
}
