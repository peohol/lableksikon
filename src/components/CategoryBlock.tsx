import Link from "next/link";

import type { Category, PublishedTerm } from "@/content";
import { termCountLabel } from "@/lib/labels";
import styles from "./CategoryBlock.module.css";

const MAX_VISIBLE_TERMS = 5;

/**
 * Én kategori på forsiden: overskrift med antall, kategoriens spørsmål, maks
 * fem begrepsnavn, og en vei til kategorisiden når det finnes flere.
 * Overskriften lenker til kategorisiden, slik at siden også er nåbar for
 * kategorier med fem eller færre begreper.
 */
export function CategoryBlock({
  category,
  terms,
}: {
  category: Category;
  terms: PublishedTerm[];
}) {
  const visible = terms.slice(0, MAX_VISIBLE_TERMS);
  const hasMore = terms.length > MAX_VISIBLE_TERMS;

  return (
    <section className={styles.block} aria-labelledby={`kategori-${category.slug}`}>
      <h2 className={styles.heading} id={`kategori-${category.slug}`}>
        <Link href={`/kategori/${category.slug}`} className={`kicker kicker-accent ${styles.name}`}>
          {category.name}
        </Link>
        <span className={`kicker ${styles.count}`}>{termCountLabel(terms.length)}</span>
      </h2>
      <p className={`lead ${styles.gloss}`}>{category.gloss}</p>
      <ul className={styles.list}>
        {visible.map((term) => (
          <li key={term.slug}>
            <Link href={`/begrep/${term.slug}`} className={styles.termRow}>
              <span className={styles.termTitle}>{term.title}</span>
            </Link>
          </li>
        ))}
      </ul>
      {hasMore ? (
        <Link href={`/kategori/${category.slug}`} className={`text-link ${styles.more}`}>
          Alle {terms.length} i {category.name.toLowerCase()} →
        </Link>
      ) : null}
    </section>
  );
}
