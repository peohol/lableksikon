import Link from "next/link";

import type { SearchEntry } from "@/lib/search";
import { HeaderSearch } from "./HeaderSearch";
import { ThemeSetting } from "./ThemeSetting";
import styles from "./Header.module.css";

/**
 * Sticky topp med ordmerke og kompakt søk. Ingen annen navigasjon —
 * kategoriene finnes på forsiden og i kickeren på hver begrepsside.
 */
export function Header({
  searchIndex,
  termCount,
}: {
  searchIndex: SearchEntry[];
  termCount: number;
}) {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.brandRow}>
          <Link href="/" className={styles.wordmark}>
            Lableksion
          </Link>
          <ThemeSetting />
        </div>
        <HeaderSearch entries={searchIndex} termCount={termCount} />
      </div>
    </header>
  );
}
