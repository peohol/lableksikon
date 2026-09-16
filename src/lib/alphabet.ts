import type { PublishedTerm } from "@/content";

export const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅ".split("");

/**
 * Ankernavn per bokstav. Æ/Ø/Å translittereres til ae/oe/aa slik at de får
 * egne anker som ikke kolliderer med A og O.
 */
export function anchorFor(letter: string): string {
  const key = letter
    .toLowerCase()
    .replaceAll("æ", "ae")
    .replaceAll("ø", "oe")
    .replaceAll("å", "aa");
  return `bok-${key}`;
}

export interface LetterGroup {
  letter: string;
  anchor: string;
  terms: PublishedTerm[];
}

/** Grupperer begrepene på forbokstav, sortert med `localeCompare("nb")`. */
export function groupByLetter(terms: PublishedTerm[]): LetterGroup[] {
  const groups = new Map<string, PublishedTerm[]>();
  for (const term of terms) {
    const letter = term.title.charAt(0).toUpperCase();
    const bucket = groups.get(letter);
    if (bucket) bucket.push(term);
    else groups.set(letter, [term]);
  }
  return ALPHABET.filter((letter) => groups.has(letter)).map((letter) => ({
    letter,
    anchor: anchorFor(letter),
    terms: (groups.get(letter) ?? [])
      .slice()
      .sort((a, b) => a.title.localeCompare(b.title, "nb")),
  }));
}
