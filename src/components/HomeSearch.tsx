"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { MATCH_LABEL, resultCountLabel, search, type SearchEntry } from "@/lib/search";
import { TermListItem } from "./TermListItem";
import fieldStyles from "./SearchField.module.css";
import styles from "./HomeSearch.module.css";

const MAX_INLINE_HITS = 20;

/**
 * Hovedsøket. Resultatene vises inline på forsiden i stedet for kategoriene,
 * og søketilstanden ligger i URL-en (`/?q=…`) slik at et resultat kan deles.
 * Kategoriene kommer inn som children, servergjengitt.
 */
export function HomeSearch({
  entries,
  children,
}: {
  entries: SearchEntry[];
  children: React.ReactNode;
}) {
  // URL-en er søketilstanden. Feltet leser den, og skriver til den med
  // History API-et — som Next holder `useSearchParams` i takt med. Dermed
  // virker deling, reload og tilbake/fram uten at feltet har en egen kopi.
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";

  const update = (value: string) => {
    const url = new URL(window.location.href);
    if (value.trim().length > 0) url.searchParams.set("q", value);
    else url.searchParams.delete("q");
    window.history.replaceState(null, "", url.toString());
  };

  const trimmed = query.trim();
  const hits = trimmed.length > 0 ? search(query, entries) : [];
  const shown = hits.slice(0, MAX_INLINE_HITS);

  return (
    <>
      <div className={`${fieldStyles.field} ${fieldStyles.hero}`}>
        <label htmlFor="hovedsok" className={fieldStyles.label}>
          Søk
        </label>
        <input
          id="hovedsok"
          type="text"
          value={query}
          onChange={(event) => update(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Escape") update("");
          }}
          placeholder="Begrep, synonym eller et ord du husker"
          autoComplete="off"
          className={`${fieldStyles.input} ${fieldStyles.inputHero}`}
        />
      </div>

      {trimmed.length > 0 ? (
        <div className={styles.results}>
          <p aria-live="polite" className={styles.count}>
            {resultCountLabel(hits.length, MAX_INLINE_HITS)}
          </p>
          {shown.map((hit) => (
            <TermListItem
              key={hit.slug}
              slug={hit.slug}
              title={hit.title}
              definition={hit.definition}
              kicker={`${hit.categoryName}${MATCH_LABEL[hit.reason]}`}
            />
          ))}
          {hits.length === 0 ? (
            <div className={styles.empty}>
              <p className={styles.emptyTitle}>Ingen treff på «{trimmed}».</p>
              <p className={styles.emptyBody}>
                Søket leter også i synonymer og beslektede ord. Prøv et bredere ord, eller bla i
                kategoriene.
              </p>
              <div className={styles.emptyActions}>
                <button
                  type="button"
                  className="button button-primary"
                  onClick={() => update("")}
                >
                  Vis alle kategorier
                </button>
                <Link href="/a-aa" className="button button-secondary">
                  Alle begreper A–Å
                </Link>
              </div>
            </div>
          ) : null}
        </div>
      ) : (
        children
      )}
    </>
  );
}
