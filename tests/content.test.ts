import { describe, expect, it } from "vitest";

import {
  categories,
  draftTerms,
  getCategory,
  getNeighbours,
  getRelatedSlugs,
  getTerm,
  orderedTerms,
  positionInCategory,
  publishedCategories,
  termsInCategory,
  validateContent,
} from "@/content";
import { conceptLinksIn, parseInline, plainText } from "@/content/richtext";
import { DEMO_IDS } from "@/demos/ids";

describe("innholdsmodellen", () => {
  it("validerer uten problemer", () => {
    expect(validateContent()).toEqual([]);
  });

  it("har unike slugger på tvers av publiserte og utkast", () => {
    const slugs = [...orderedTerms, ...draftTerms].map((term) => term.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("gir hvert publisert begrep en demonstrasjon som finnes i registeret", () => {
    for (const term of orderedTerms) {
      expect(DEMO_IDS).toContain(term.demo);
    }
  });

  it("lar definisjonen finnes bare ett sted", () => {
    // Definisjonen i lister, søk og popover hentes alltid fra begrepets egen post.
    const term = getTerm("presisjon");
    expect(term?.definition).toBe(
      "Hvor likt resultatet blir når samme prøve måles flere ganger under samme betingelser.",
    );
    const explanationText = term?.explanation.map((b) => ("text" in b ? b.text : "")).join(" ");
    expect(explanationText).not.toContain(term?.definition);
  });

  it("peker alle begrepslenker på publiserte begreper", () => {
    const published = new Set(orderedTerms.map((term) => term.slug));
    for (const term of orderedTerms) {
      const links = [...conceptLinksIn(term.explanation), ...conceptLinksIn(term.depth.blocks)];
      for (const slug of links) expect(published).toContain(slug);
    }
  });

  it("gir hvert begrep en dybdetittel som sier hva dybden inneholder", () => {
    for (const term of orderedTerms) {
      expect(term.depth.title.toLowerCase()).not.toBe("les mer");
      expect(term.depth.blocks.length).toBeGreaterThan(0);
    }
  });
});

describe("publiseringsstatus", () => {
  it("eksponerer ingen utkast i den offentlige modellen", () => {
    const publishedSlugs = new Set(orderedTerms.map((term) => term.slug));
    for (const draft of draftTerms) {
      expect(publishedSlugs.has(draft.slug)).toBe(false);
      expect(getTerm(draft.slug)).toBeUndefined();
      expect(getNeighbours(draft.slug)).toBeUndefined();
    }
  });

  it("teller bare publiserte begreper i kategoriene", () => {
    const counted = publishedCategories.reduce(
      (sum, category) => sum + termsInCategory(category.slug).length,
      0,
    );
    expect(counted).toBe(orderedTerms.length);
  });

  it("skjuler kategorier uten publiserte begreper", () => {
    for (const category of categories) {
      const hasTerms = termsInCategory(category.slug).length > 0;
      expect(Boolean(getCategory(category.slug))).toBe(hasTerms);
    }
    expect(publishedCategories.length).toBeLessThan(categories.length);
  });
});

describe("global rekkefølge", () => {
  it("følger kategorirekkefølgen, så rekkefølgen innen kategorien", () => {
    const categoryOrder = publishedCategories.map((category) => category.slug);
    const seen: string[] = [];
    for (const term of orderedTerms) {
      if (seen.at(-1) !== term.category) seen.push(term.category);
    }
    expect(seen).toEqual(categoryOrder);
  });

  it("er sirkulær: siste begrep leder til det første", () => {
    const first = orderedTerms[0]!;
    const last = orderedTerms.at(-1)!;
    expect(getNeighbours(last.slug)?.next.slug).toBe(first.slug);
    expect(getNeighbours(first.slug)?.previous.slug).toBe(last.slug);
  });

  it("krysser kategorigrenser", () => {
    const neighbours = getNeighbours("noyaktighet");
    expect(neighbours?.next.slug).toBe("linearitet");
    expect(neighbours?.next.category).not.toBe("kvalitet");
  });

  it("gir riktig posisjon i kategorien", () => {
    expect(positionInCategory("presisjon")).toEqual({ index: 1, total: 3 });
    expect(positionInCategory("standardavvik")).toEqual({ index: 1, total: 1 });
  });
});

describe("begrepslenker i tekst", () => {
  it("parser inline-lenker til slug og synlig tekst", () => {
    const nodes = parseInline("Se [lineariteten](begrep:linearitet) her.");
    expect(nodes).toEqual([
      { type: "text", value: "Se " },
      { type: "concept", label: "lineariteten", slug: "linearitet" },
      { type: "text", value: " her." },
    ]);
  });

  it("lar den synlige teksten bøyes fritt uten å endre referansen", () => {
    expect(plainText("Se [lineariteten](begrep:linearitet).")).toBe("Se lineariteten.");
  });

  it("utleder relaterte begreper fra lenkene, begge veier", () => {
    const related = getRelatedSlugs("presisjon");
    expect(related).toContain("maleusikkerhet"); // utgående
    expect(related).toContain("noyaktighet");
    expect(related).not.toContain("presisjon");
    expect(getRelatedSlugs("maleusikkerhet")).toContain("presisjon"); // inngående
  });
});
