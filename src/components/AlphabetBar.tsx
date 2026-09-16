"use client";

import { useEffect, useRef } from "react";

import { ALPHABET, anchorFor } from "@/lib/alphabet";
import styles from "./AlphabetBar.module.css";

/**
 * Sticky bokstavbar rett under headeren. Headeren og baren kan begge vokse i
 * høyde når innholdet wrapper, så offsetene måles fra faktisk høyde i stedet
 * for å være konstanter.
 */
export function AlphabetBar({ available }: { available: string[] }) {
  const barRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    const header = document.querySelector("header");
    if (!bar) return;

    const root = document.documentElement;
    const measure = () => {
      if (header) root.style.setProperty("--header-height", `${header.offsetHeight}px`);
      root.style.setProperty("--letterbar-height", `${bar.offsetHeight}px`);
    };

    measure();
    const observer = new ResizeObserver(measure);
    if (header) observer.observe(header);
    observer.observe(bar);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const has = new Set(available);

  return (
    <nav ref={barRef} aria-label="Hopp til bokstav" className={styles.bar}>
      {ALPHABET.map((letter) =>
        has.has(letter) ? (
          <a key={letter} href={`#${anchorFor(letter)}`} className={styles.letter}>
            {letter}
          </a>
        ) : (
          <span key={letter} aria-hidden="true" className={`${styles.letter} ${styles.empty}`}>
            {letter}
          </span>
        ),
      )}
    </nav>
  );
}
