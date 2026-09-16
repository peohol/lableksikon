import { describe, expect, it } from "vitest";

import { MATCH_LABEL, resultCountLabel, search, type SearchEntry } from "@/lib/search";
import { buildSearchIndex } from "@/lib/search-index";
import { normalize, sameWord, tokenize } from "@/lib/norwegian";

const entries: SearchEntry[] = buildSearchIndex();
const slugs = (query: string) => search(query, entries).map((hit) => hit.slug);
const hit = (query: string, slug: string) => search(query, entries).find((h) => h.slug === slug);

describe("normalisering", () => {
  it("gjør æ/ø/å om til ae/o/a og senker bokstaver", () => {
    expect(normalize("Måleusikkerhet")).toBe("maleusikkerhet");
    expect(normalize("BLINDPRØVE")).toBe("blindprove");
    expect(normalize("Særlig")).toBe("saerlig");
  });

  it("fjerner diakritiske tegn", () => {
    expect(normalize("résumé")).toBe("resume");
  });

  it("deler tekst i ord", () => {
    expect(tokenize("Riktighet, presisjon og nøyaktighet")).toEqual([
      "riktighet",
      "presisjon",
      "og",
      "noyaktighet",
    ]);
  });

  it("kjenner igjen norske bøyningsformer", () => {
    expect(sameWord("kurver", "kurve")).toBe(true);
    expect(sameWord("maleusikkerheten", "maleusikkerhet")).toBe(true);
    expect(sameWord("matrikser", "matriks")).toBe(true);
    expect(sameWord("toppene", "topp")).toBe(true);
    expect(sameWord("lineariteten", "linearitet")).toBe(true);
    expect(sameWord("presisjon", "blindprove")).toBe(false);
  });
});

describe("søkerangering", () => {
  it("setter treff der tittelen starter med søkestrengen først", () => {
    const result = search("s", entries);
    expect(result[0]?.reason).toBe("tittel-start");
    expect(result[0]?.slug).toBe("standardaddisjon");
  });

  it("rangerer tittel-start over tittel-inneholder over alias over definisjon", () => {
    const level = { "tittel-start": 0, tittel: 1, alias: 2, definisjon: 3 } as const;
    const levels = search("presisjon", entries).map((h) => level[h.reason]);
    expect(levels[0]).toBe(0);
    // «Riktighet, presisjon og nøyaktighet» inneholder ordet lenger inne i tittelen.
    expect(levels).toContain(1);
    expect(levels).toEqual([...levels].sort((a, b) => a - b));
  });

  it("sorterer alfabetisk innen samme nivå", () => {
    const sameLevel = search("standard", entries).filter((h) => h.reason === "tittel-start");
    const titles = sameLevel.map((h) => h.title);
    expect(titles).toEqual([...titles].sort((a, b) => a.localeCompare(b, "nb")));
  });

  it("finner eksakt begrepsnavn", () => {
    expect(slugs("Blindprøve")[0]).toBe("blindprove");
  });

  it("finner på begynnelsen av begrepsnavnet", () => {
    expect(slugs("linea")[0]).toBe("linearitet");
    expect(slugs("kromato")[0]).toBe("opplosning");
  });

  it("finner på synonym og merker hvorfor", () => {
    const aliasHit = hit("pilkast", "presisjon");
    expect(aliasHit?.reason).toBe("alias");
    expect(MATCH_LABEL[aliasHit!.reason]).toBe(" · treff på beslektet ord");
    expect(hit("LOD", "deteksjonsgrense")?.reason).toBe("alias");
    expect(hit("bias", "noyaktighet")?.reason).toBe("alias");
  });

  it("finner i definisjonen og merker det", () => {
    const definitionHit = hit("nabotopper", "opplosning");
    expect(definitionHit?.reason).toBe("definisjon");
    expect(MATCH_LABEL[definitionHit!.reason]).toBe(" · treff i definisjonen");
  });

  it("håndterer bøyningsformer i søkestrengen", () => {
    expect(slugs("måleusikkerheten")).toContain("maleusikkerhet");
    expect(slugs("kurver")).toContain("linearitet");
    expect(slugs("matrikser")).toContain("matriseeffekt");
    expect(slugs("blindprøver")).toContain("blindprove");
  });

  it("er tolerant for æ/ø/å skrevet uten særtegn", () => {
    expect(slugs("maleusikkerhet")).toContain("maleusikkerhet");
    expect(slugs("blindprove")).toContain("blindprove");
    expect(slugs("noyaktighet")).toContain("noyaktighet");
  });

  it("finner sammensatte begreper skrevet med mellomrom", () => {
    expect(slugs("standard avvik")[0]).toBe("standardavvik");
    expect(slugs("intern standard")[0]).toBe("internstandard");
    expect(slugs("måle usikkerhet")[0]).toBe("maleusikkerhet");
    expect(slugs("matrise effekt")[0]).toBe("matriseeffekt");
    expect(slugs("deteksjons grense")[0]).toBe("deteksjonsgrense");
  });

  it("beholder bøyningstoleranse og æ/ø/å i sammensetninger med mellomrom", () => {
    expect(slugs("standard avviket")).toContain("standardavvik");
    expect(slugs("male usikkerheten")).toContain("maleusikkerhet");
    expect(slugs("blind prøver")).toContain("blindprove");
  });

  it("endrer ikke rangeringen for flerordssøk som ikke er sammensetninger", () => {
    // «Riktighet, presisjon og nøyaktighet» treffer fortsatt på ordene hver for seg.
    const hit = search("riktighet presisjon", entries).find((h) => h.slug === "noyaktighet");
    expect(hit?.reason).toBe("tittel");
  });

  it("er case-insensitivt", () => {
    expect(slugs("PRESISJON")).toEqual(slugs("presisjon"));
  });

  it("gir ingen treff på tom streng", () => {
    expect(search("", entries)).toEqual([]);
    expect(search("   ", entries)).toEqual([]);
  });

  it("gir ingen treff på noe som ikke finnes", () => {
    expect(search("zzz", entries)).toEqual([]);
  });

  it("søker aldri i upubliserte begreper", () => {
    expect(slugs("ringtest")).toEqual([]);
    expect(slugs("akkreditering")).toEqual([]);
  });
});

describe("teller over resultatlista", () => {
  it("formulerer antallet slik spesifikasjonen krever", () => {
    expect(resultCountLabel(0, 20)).toBe("Ingen treff");
    expect(resultCountLabel(1, 20)).toBe("1 treff");
    expect(resultCountLabel(14, 20)).toBe("14 treff");
    expect(resultCountLabel(66, 20)).toBe("66 treff — viser de 20 mest relevante");
  });
});
