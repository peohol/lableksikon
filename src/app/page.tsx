import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";

import { CategoryBlock } from "@/components/CategoryBlock";
import { HomeSearch } from "@/components/HomeSearch";
import { orderedTerms, publishedCategories, termsInCategory } from "@/content";
import { buildSearchIndex } from "@/lib/search-index";
import styles from "./page.module.css";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const searchIndex = buildSearchIndex();

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Begrepene i analytisk kjemi, forklart så enkelt som mulig.</h1>
      <p className={styles.intro}>
        Hvert begrep har en kort definisjon, en hverdagslig forklaring, en demonstrasjon du kan
        pille på — og teknisk dybde hvis du vil ha den.
      </p>

      <Suspense>
        <HomeSearch entries={searchIndex}>
          <div className={styles.grid}>
            {publishedCategories.map((category) => (
              <CategoryBlock
                key={category.slug}
                category={category}
                terms={termsInCategory(category.slug)}
              />
            ))}
          </div>
          <div className={styles.allRow}>
            <Link href="/a-aa" className={`text-link ${styles.allLink}`}>
              Alle {orderedTerms.length} begreper, A–Å →
            </Link>
          </div>
        </HomeSearch>
      </Suspense>
    </div>
  );
}
