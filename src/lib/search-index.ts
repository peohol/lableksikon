import { categoryName, orderedTerms } from "@/content";
import type { SearchEntry } from "./search";

/**
 * Bygger den lille indeksen søket trenger. Bare feltene som faktisk brukes i
 * treffvisningen sendes til klienten — dybdetekster og demonstrasjoner blir
 * igjen på serveren.
 */
export function buildSearchIndex(): SearchEntry[] {
  return orderedTerms.map((term) => ({
    slug: term.slug,
    title: term.title,
    definition: term.definition,
    categoryName: categoryName(term.category),
    aliases: term.aliases,
  }));
}
