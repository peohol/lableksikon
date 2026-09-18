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

  it("har unike slugger på tvers av publiserte og aktive utkast", () => {
    const slugs = [...orderedTerms, ...draftTerms].map((term) => term.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("gir hvert publisert begrep en demonstrasjon som finnes i registeret", () => {
    for (const term of orderedTerms) expect(DEMO_IDS).toContain(term.demo);
  });

  it("gir hvert publisert begrep minst én gyldig fagkilde", () => {
    for (const term of orderedTerms) {
      expect(term.sources.length).toBeGreaterThan(0);
      for (const source of term.sources) expect(() => new URL(source.url)).not.toThrow();
    }
  });

  it("lar definisjonen finnes bare ett sted", () => {
    const term = getTerm("presisjon");
    expect(term?.definition).toBe("Hvor godt gjentatte målinger stemmer overens med hverandre under spesifiserte betingelser.");
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

  it("gir hvert begrep en beskrivende dybdetittel", () => {
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
    const counted = publishedCategories.reduce((sum, category) => sum + termsInCategory(category.slug).length, 0);
    expect(counted).toBe(orderedTerms.length);
  });

  it("har komplett kategori for kalibrering og kontroll", () => {
    expect(termsInCategory("kalibrering")).toHaveLength(16);
  });

  it("har komplett kategori for prøven og omgivelsene", () => {
    expect(termsInCategory("prove")).toHaveLength(9);
  });

  it("har komplett kategori for statistikk og beregning", () => {
    expect(termsInCategory("statistikk")).toHaveLength(14);
  });

  it("har komplett kategori for separasjon", () => {
    expect(termsInCategory("separasjon")).toHaveLength(13);
  });

  it("har komplett kategori for deteksjon og måleprinsipp", () => {
    expect(termsInCategory("deteksjon")).toHaveLength(12);
  });

  it("har komplett kategori for prøvetaking og opparbeiding", () => {
    expect(termsInCategory("provetaking")).toHaveLength(10);
  });

  it("har komplett kategori for kvalitetssikring", () => {
    expect(termsInCategory("kvalitetssikring").map((term) => term.slug)).toEqual([
      "akkreditering",
      "ringtest",
      "srm",
      "standardmetode",
      "avviksbehandling",
      "internkontroll",
      "revisjonsspor",
    ]);
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
    for (const term of orderedTerms) if (seen.at(-1) !== term.category) seen.push(term.category);
    expect(seen).toEqual(categoryOrder);
  });

  it("er sirkulær: siste begrep leder til det første", () => {
    const first = orderedTerms[0]!;
    const last = orderedTerms.at(-1)!;
    expect(getNeighbours(last.slug)?.next.slug).toBe(first.slug);
    expect(getNeighbours(first.slug)?.previous.slug).toBe(last.slug);
  });

  it("krysser kategorigrenser etter siste kvalitetsbegrep", () => {
    const neighbours = getNeighbours("noyaktighet");
    expect(neighbours?.next.slug).toBe("kalibreringskurve");
    expect(neighbours?.next.category).not.toBe("kvalitet");
  });

  it("krysser kategorigrenser gjennom publiserte kategorier", () => {
    expect(getNeighbours("kontrollprove")?.next.slug).toBe("matriseeffekt");
    expect(getNeighbours("provelagring")?.next.slug).toBe("gjennomsnitt");
    expect(getNeighbours("uteligger")?.next.slug).toBe("mobilfase");
    expect(getNeighbours("injeksjonsvolum")?.next.slug).toBe("signalstoy");
    expect(getNeighbours("ledningsevne")?.next.slug).toBe("representativ");
    expect(getNeighbours("fortynningsfaktor")?.next.slug).toBe("akkreditering");
    expect(getNeighbours("revisjonsspor")?.next.slug).toBe("presisjon");
  });

  it("gir riktig posisjon i kategorien", () => {
    expect(positionInCategory("presisjon")).toEqual({ index: 1, total: 18 });
    expect(positionInCategory("noyaktighet")).toEqual({ index: 18, total: 18 });
    expect(positionInCategory("kalibreringskurve")).toEqual({ index: 1, total: 16 });
    expect(positionInCategory("kontrollprove")).toEqual({ index: 16, total: 16 });
    expect(positionInCategory("matriseeffekt")).toEqual({ index: 1, total: 9 });
    expect(positionInCategory("provelagring")).toEqual({ index: 9, total: 9 });
    expect(positionInCategory("gjennomsnitt")).toEqual({ index: 1, total: 14 });
    expect(positionInCategory("standardavvik")).toEqual({ index: 4, total: 14 });
    expect(positionInCategory("uteligger")).toEqual({ index: 14, total: 14 });
    expect(positionInCategory("mobilfase")).toEqual({ index: 1, total: 13 });
    expect(positionInCategory("opplosning")).toEqual({ index: 11, total: 13 });
    expect(positionInCategory("injeksjonsvolum")).toEqual({ index: 13, total: 13 });
    expect(positionInCategory("signalstoy")).toEqual({ index: 1, total: 12 });
    expect(positionInCategory("mrm")).toEqual({ index: 6, total: 12 });
    expect(positionInCategory("ledningsevne")).toEqual({ index: 12, total: 12 });
    expect(positionInCategory("representativ")).toEqual({ index: 1, total: 10 });
    expect(positionInCategory("ekstraksjon")).toEqual({ index: 5, total: 10 });
    expect(positionInCategory("fortynningsfaktor")).toEqual({ index: 10, total: 10 });
    expect(positionInCategory("akkreditering")).toEqual({ index: 1, total: 7 });
    expect(positionInCategory("revisjonsspor")).toEqual({ index: 7, total: 7 });
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
    expect(related).toContain("maleusikkerhet");
    expect(related).toContain("noyaktighet");
    expect(related).not.toContain("presisjon");
    expect(getRelatedSlugs("maleusikkerhet")).toContain("presisjon");
  });
});
