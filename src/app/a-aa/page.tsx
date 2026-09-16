import type { Metadata } from "next";
import Link from "next/link";

import { AlphabetBar } from "@/components/AlphabetBar";
import { orderedTerms } from "@/content";
import { groupByLetter } from "@/lib/alphabet";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Alle begreper A–Å",
  description: "Alle begreper i Lableksion, sortert alfabetisk.",
  alternates: { canonical: "/a-aa" },
};

export default function AlphabeticalIndexPage() {
  const groups = groupByLetter(orderedTerms);

  return (
    <div className={styles.page}>
      <Link href="/" className="text-link">
        ← Forsiden
      </Link>
      <h1 className={styles.title}>Alle begreper</h1>
      <AlphabetBar available={groups.map((group) => group.letter)} />
      {groups.map((group) => (
        <section key={group.letter} id={group.anchor} className={styles.section}>
          <h2 className={`kicker kicker-accent ${styles.letter}`}>{group.letter}</h2>
          <div className={styles.grid}>
            {group.terms.map((term) => (
              <Link key={term.slug} href={`/begrep/${term.slug}`} className={styles.term}>
                {term.title}
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
