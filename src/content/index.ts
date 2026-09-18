import { categories } from "./categories";
import { draftTerms as prototypeDraftTerms } from "./drafts";
import { publishedTerms } from "./terms";
import { conceptLinksIn } from "./richtext";
import {
  categorySchema,
  draftTermSchema,
  publishedTermSchema,
  type Category,
  type PublishedTerm,
} from "./schema";

export type { Block, Category, DraftTerm, PublishedTerm, Source } from "./schema";
export { parseInline, plainText } from "./richtext";

/**
 * `drafts.ts` er den aktive redaksjonelle køen. Utkast publiseres aldri i
 * søk, kategorier eller begrepsnavigasjon. Slugger som allerede er publisert
 * filtreres defensivt bort slik at et foreldet utkast ikke kan eksponeres.
 */
const publishedSlugs = new Set(publishedTerms.map((term) => term.slug));
export const draftTerms = prototypeDraftTerms.filter((term) => !publishedSlugs.has(term.slug));

export interface ContentProblem {
  where: string;
  message: string;
}

/** Validerer hele innholdslaget ved modullasting. */
export function validateContent(): ContentProblem[] {
  const problems: ContentProblem[] = [];
  const report = (where: string, message: string) => problems.push({ where, message });

  const categorySlugs = new Set<string>();
  for (const category of categories) {
    const parsed = categorySchema.safeParse(category);
    if (!parsed.success) {
      report(`kategori ${category.slug}`, parsed.error.issues.map((i) => i.message).join("; "));
      continue;
    }
    if (categorySlugs.has(category.slug)) report(`kategori ${category.slug}`, "duplisert slug");
    categorySlugs.add(category.slug);
  }

  const seenSlugs = new Map<string, string>();

  for (const term of publishedTerms) {
    const where = `begrep ${term.slug}`;
    const parsed = publishedTermSchema.safeParse(term);
    if (!parsed.success) {
      report(where, parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; "));
      continue;
    }
    if (seenSlugs.has(term.slug)) report(where, `slug finnes også i ${seenSlugs.get(term.slug)}`);
    seenSlugs.set(term.slug, "publiserte begreper");
    if (!categorySlugs.has(term.category)) report(where, `ukjent kategori «${term.category}»`);

    const links = [...conceptLinksIn(term.explanation), ...conceptLinksIn(term.depth.blocks)];
    for (const slug of links) {
      if (slug === term.slug) report(where, "begrepslenke peker på begrepet selv");
      else if (!publishedSlugs.has(slug)) {
        report(where, `begrepslenke peker på «${slug}», som ikke er publisert`);
      }
    }
  }

  for (const term of draftTerms) {
    const where = `utkast ${term.slug}`;
    const parsed = draftTermSchema.safeParse(term);
    if (!parsed.success) {
      report(where, parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; "));
      continue;
    }
    if (seenSlugs.has(term.slug)) report(where, `slug finnes også i ${seenSlugs.get(term.slug)}`);
    seenSlugs.set(term.slug, "utkast");
    if (!categorySlugs.has(term.category)) report(where, `ukjent kategori «${term.category}»`);
  }

  return problems;
}

const problems = validateContent();
if (problems.length > 0) {
  throw new Error(
    "Ugyldig innhold i Lableksion:\n" +
      problems.map((p) => `  · ${p.where}: ${p.message}`).join("\n"),
  );
}

const byCategory = new Map<string, PublishedTerm[]>(
  categories.map((category) => [
    category.slug,
    publishedTerms.filter((term) => term.category === category.slug),
  ]),
);

export const orderedTerms: PublishedTerm[] = categories.flatMap(
  (category) => byCategory.get(category.slug) ?? [],
);

const termBySlug = new Map(orderedTerms.map((term) => [term.slug, term]));

export const publishedCategories: Category[] = categories.filter(
  (category) => (byCategory.get(category.slug) ?? []).length > 0,
);

export function getCategory(slug: string): Category | undefined {
  return publishedCategories.find((category) => category.slug === slug);
}

export function getTerm(slug: string): PublishedTerm | undefined {
  return termBySlug.get(slug);
}

export function termsInCategory(slug: string): PublishedTerm[] {
  return byCategory.get(slug) ?? [];
}

export function categoryName(slug: string): string {
  return categories.find((category) => category.slug === slug)?.name ?? slug;
}

export interface Position {
  index: number;
  total: number;
}

export function positionInCategory(slug: string): Position | undefined {
  const term = getTerm(slug);
  if (!term) return undefined;
  const siblings = termsInCategory(term.category);
  return { index: siblings.findIndex((t) => t.slug === slug) + 1, total: siblings.length };
}

export interface Neighbours {
  previous: PublishedTerm;
  next: PublishedTerm;
}

export function getNeighbours(slug: string): Neighbours | undefined {
  const index = orderedTerms.findIndex((term) => term.slug === slug);
  if (index === -1) return undefined;
  const count = orderedTerms.length;
  return {
    previous: orderedTerms[(index - 1 + count) % count] as PublishedTerm,
    next: orderedTerms[(index + 1) % count] as PublishedTerm,
  };
}

export function getRelatedSlugs(slug: string): string[] {
  const term = getTerm(slug);
  if (!term) return [];
  const outgoing = new Set([
    ...conceptLinksIn(term.explanation),
    ...conceptLinksIn(term.depth.blocks),
  ]);
  const incoming = orderedTerms
    .filter((other) => {
      if (other.slug === slug) return false;
      return [...conceptLinksIn(other.explanation), ...conceptLinksIn(other.depth.blocks)].includes(slug);
    })
    .map((other) => other.slug);
  return [...new Set([...outgoing, ...incoming])].filter((s) => s !== slug).sort();
}

export { categories };
