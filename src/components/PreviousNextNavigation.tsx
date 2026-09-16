import Link from "next/link";

import { categoryName, type PublishedTerm } from "@/content";
import styles from "./PreviousNextNavigation.module.css";

/**
 * Global, sirkulær bla-navigasjon. Kategoribytte annonseres alltid i etiketten,
 * slik at det er tydelig når man forlater kategorien.
 */
export function PreviousNextNavigation({
  current,
  previous,
  next,
}: {
  current: PublishedTerm;
  previous: PublishedTerm;
  next: PublishedTerm;
}) {
  const crossing = (term: PublishedTerm) =>
    term.category === current.category ? "" : ` · ${categoryName(term.category)}`;

  return (
    <nav aria-label="Bla mellom begreper" className={styles.nav}>
      <Link href={`/begrep/${previous.slug}`} className={styles.previous}>
        <span className={styles.label}>← Forrige{crossing(previous)}</span>
        <span className={styles.title}>{previous.title}</span>
      </Link>
      <Link href={`/begrep/${next.slug}`} className={styles.next}>
        <span className={styles.label}>Neste{crossing(next)} →</span>
        <span className={styles.title}>{next.title}</span>
      </Link>
    </nav>
  );
}
