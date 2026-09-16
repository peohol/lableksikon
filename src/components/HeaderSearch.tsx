"use client";

import { useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { MATCH_LABEL, resultCountLabel, search, type SearchEntry } from "@/lib/search";
import styles from "./SearchField.module.css";

const MAX_DROPDOWN_HITS = 8;

/**
 * Kompakt søk i headeren. Viser en dropdown med de mest relevante treffene og
 * en vei videre til hele resultatlista på forsiden. Skriver til samme
 * søketilstand som hovedsøket: `/?q=…`.
 */
export function HeaderSearch({
  entries,
  termCount,
}: {
  entries: SearchEntry[];
  termCount: number;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(-1);
  const listId = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  const trimmed = query.trim();
  const hits = trimmed.length > 0 ? search(query, entries) : [];
  const shown = hits.slice(0, MAX_DROPDOWN_HITS);
  const open = trimmed.length > 0;

  const goToTerm = (slug: string) => {
    setQuery("");
    setActive(-1);
    router.push(`/begrep/${slug}`);
  };

  const goToAllResults = () => {
    const q = trimmed;
    setQuery("");
    setActive(-1);
    router.push(`/?q=${encodeURIComponent(q)}`);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      setQuery("");
      setActive(-1);
      return;
    }
    if (!open || shown.length === 0) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((index) => (index + 1) % shown.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((index) => (index <= 0 ? shown.length - 1 : index - 1));
    } else if (event.key === "Enter") {
      event.preventDefault();
      const hit = shown[active >= 0 ? active : 0];
      if (hit) goToTerm(hit.slug);
    }
  };

  const activeOption = active >= 0 && shown[active] ? `${listId}-${active}` : undefined;

  return (
    <div className={`${styles.field} ${styles.compact}`}>
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          setActive(-1);
        }}
        onKeyDown={onKeyDown}
        placeholder={`Søk i ${termCount} begreper`}
        aria-label="Søk etter begrep"
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={activeOption}
        autoComplete="off"
        className={`${styles.input} ${styles.inputCompact}`}
      />
      {open ? (
        <div className={styles.dropdown}>
          <div className={styles.dropdownCount}>
            {resultCountLabel(hits.length, hits.length)}
          </div>
          <ul id={listId} role="listbox" aria-label="Søketreff" style={{ margin: 0, padding: 0 }}>
            {shown.map((hit, index) => (
              <li
                key={hit.slug}
                id={`${listId}-${index}`}
                role="option"
                aria-selected={index === active}
                className={`${styles.option} ${index === active ? styles.optionActive : ""}`}
                onMouseDown={(event) => {
                  event.preventDefault();
                  goToTerm(hit.slug);
                }}
              >
                <span className={styles.optionTitle}>{hit.title}</span>
                <span className={styles.optionMeta}>
                  {hit.categoryName}
                  {MATCH_LABEL[hit.reason]}
                </span>
              </li>
            ))}
          </ul>
          {hits.length > MAX_DROPDOWN_HITS ? (
            <button type="button" className={styles.dropdownFooter} onClick={goToAllResults}>
              Se alle treff på forsiden →
            </button>
          ) : null}
          {hits.length === 0 ? <div className={styles.dropdownEmpty}>Ingen treff</div> : null}
        </div>
      ) : null}
    </div>
  );
}
