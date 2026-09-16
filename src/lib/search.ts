import { normalize, tokenize, tokenMatches } from "./norwegian";

/**
 * Søkemodellen. Rangeringen er låst i handoffen (2.3):
 *   1) tittel starter med søkestrengen
 *   2) tittel inneholder den
 *   3) treff på synonym/beslektet ord
 *   4) treff i definisjonen
 * Innen samme nivå sorteres alfabetisk med `localeCompare("nb")`.
 */
export type MatchReason = "tittel-start" | "tittel" | "alias" | "definisjon";

const LEVEL: Record<MatchReason, number> = {
  "tittel-start": 0,
  tittel: 1,
  alias: 2,
  definisjon: 3,
};

/** Treffårsak slik den vises i kickeren. Direkte treff i tittelen forklares ikke. */
export const MATCH_LABEL: Record<MatchReason, string> = {
  "tittel-start": "",
  tittel: "",
  alias: " · treff på beslektet ord",
  definisjon: " · treff i definisjonen",
};

export interface SearchEntry {
  slug: string;
  title: string;
  definition: string;
  categoryName: string;
  aliases: string[];
}

export interface SearchHit extends SearchEntry {
  reason: MatchReason;
  /** Aliaset som utløste treffet, når det var et aliastreff. */
  matchedAlias?: string;
}

interface IndexedEntry extends SearchEntry {
  normTitle: string;
  titleTokens: string[];
  normDefinition: string;
  definitionTokens: string[];
  normAliases: { source: string; text: string; tokens: string[] }[];
}

export function indexEntry(entry: SearchEntry): IndexedEntry {
  return {
    ...entry,
    normTitle: normalize(entry.title),
    titleTokens: tokenize(entry.title),
    normDefinition: normalize(entry.definition),
    definitionTokens: tokenize(entry.definition),
    normAliases: entry.aliases.map((alias) => ({
      source: alias,
      text: normalize(alias),
      tokens: tokenize(alias),
    })),
  };
}

const everyQueryTokenMatches = (queryTokens: string[], tokens: string[]): boolean =>
  queryTokens.every((queryToken) => tokens.some((token) => tokenMatches(queryToken, token)));

/**
 * Norske sammensetninger skrives ofte feilaktig med mellomrom («standard
 * avvik»). Derfor prøves også ordene satt sammen, på samme nivå som resten —
 * rangeringen er uendret.
 */
const compactForm = (queryTokens: string[]): string | undefined =>
  queryTokens.length > 1 ? queryTokens.join("") : undefined;

function match(
  entry: IndexedEntry,
  query: string,
  queryTokens: string[],
  compact: string | undefined,
): SearchHit | undefined {
  const base = {
    slug: entry.slug,
    title: entry.title,
    definition: entry.definition,
    categoryName: entry.categoryName,
    aliases: entry.aliases,
  };

  const firstTitleToken = entry.titleTokens[0];
  if (
    entry.normTitle.startsWith(query) ||
    (compact !== undefined && entry.normTitle.startsWith(compact)) ||
    (queryTokens.length === 1 &&
      firstTitleToken !== undefined &&
      tokenMatches(queryTokens[0] as string, firstTitleToken)) ||
    (compact !== undefined &&
      firstTitleToken !== undefined &&
      tokenMatches(compact, firstTitleToken))
  ) {
    return { ...base, reason: "tittel-start" };
  }

  if (
    entry.normTitle.includes(query) ||
    (compact !== undefined && entry.normTitle.includes(compact)) ||
    everyQueryTokenMatches(queryTokens, entry.titleTokens) ||
    (compact !== undefined && everyQueryTokenMatches([compact], entry.titleTokens))
  ) {
    return { ...base, reason: "tittel" };
  }

  for (const alias of entry.normAliases) {
    if (
      alias.text.includes(query) ||
      (compact !== undefined && alias.text.includes(compact)) ||
      everyQueryTokenMatches(queryTokens, alias.tokens) ||
      (compact !== undefined && everyQueryTokenMatches([compact], alias.tokens))
    ) {
      return { ...base, reason: "alias", matchedAlias: alias.source };
    }
  }

  if (
    entry.normDefinition.includes(query) ||
    (compact !== undefined && entry.normDefinition.includes(compact)) ||
    everyQueryTokenMatches(queryTokens, entry.definitionTokens) ||
    (compact !== undefined && everyQueryTokenMatches([compact], entry.definitionTokens))
  ) {
    return { ...base, reason: "definisjon" };
  }

  return undefined;
}

/**
 * Søker gjennom indeksen. Rekkefølgen er nivå først, deretter alfabetisk.
 * Tom eller for kort streng gir ingen treff i stedet for alt.
 */
export function search(query: string, entries: SearchEntry[]): SearchHit[] {
  const normalized = normalize(query).trim();
  if (normalized.length === 0) return [];
  const queryTokens = tokenize(query);
  if (queryTokens.length === 0) return [];
  const compact = compactForm(queryTokens);

  const hits: SearchHit[] = [];
  for (const entry of entries) {
    const indexed = "normTitle" in entry ? (entry as IndexedEntry) : indexEntry(entry);
    const hit = match(indexed, normalized, queryTokens, compact);
    if (hit) hits.push(hit);
  }

  return hits.sort(
    (a, b) => LEVEL[a.reason] - LEVEL[b.reason] || a.title.localeCompare(b.title, "nb"),
  );
}

/** Teller over resultatlista, lest opp med `aria-live="polite"`. */
export function resultCountLabel(total: number, shown: number): string {
  if (total === 0) return "Ingen treff";
  if (total === 1) return "1 treff";
  if (total > shown) return `${total} treff — viser de ${shown} mest relevante`;
  return `${total} treff`;
}
