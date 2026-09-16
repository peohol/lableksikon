/**
 * Normalisering og lettvekts stemming for norsk søk.
 *
 * Søket skal finne begrepet enten brukeren skriver «måleusikkerheten»,
 * «maleusikkerhet» eller «usikkerhet». Derfor normaliseres æ/ø/å og
 * diakritiske tegn bort, og ordene reduseres til en grovt felles form.
 */

/** Små bokstaver, æ→ae, ø→o, å→a, diakritiske tegn fjernet. */
export function normalize(input: string): string {
  return input
    .toLowerCase()
    .replaceAll("æ", "ae")
    .replaceAll("ø", "o")
    .replaceAll("å", "a")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .normalize("NFC");
}

/** Deler normalisert tekst i ord. Tall og bindestrek beholdes som skilletegn. */
export function tokenize(input: string): string[] {
  return normalize(input)
    .split(/[^a-z0-9²³]+/)
    .filter((token) => token.length > 0);
}

/**
 * Endelser som fjernes, lengste først. Utvalget følger de vanlige norske
 * bøynings- og bestemtformene (Snowball-aktig, men bevisst enkelt).
 */
const SUFFIXES = [
  "hetenes",
  "hetene",
  "heten",
  "heter",
  "hets",
  "het",
  "endes",
  "ende",
  "ande",
  "enes",
  "edes",
  "ene",
  "ede",
  "ens",
  "ets",
  "ane",
  "ers",
  "ast",
  "en",
  "et",
  "er",
  "es",
  "as",
  "ar",
  "e",
  "a",
];

const MIN_STEM_LENGTH = 4;
const S_ENDING = /[bcdfghjlmnoprtvyz]$/;

function stemOnce(token: string): string {
  for (const suffix of SUFFIXES) {
    if (token.length - suffix.length >= MIN_STEM_LENGTH && token.endsWith(suffix)) {
      return token.slice(0, -suffix.length);
    }
  }
  if (token.length > MIN_STEM_LENGTH && token.endsWith("s")) {
    const stem = token.slice(0, -1);
    if (S_ENDING.test(stem)) return stem;
  }
  return token;
}

/**
 * Formene et ord kan gjenkjennes på. Stemmingen kjøres to ganger fordi
 * bestemt form ofte ligger utenpå en avledningsendelse
 * («lineariteten» → «linearitet» → «linearit»).
 */
export function variantsOf(token: string): Set<string> {
  const first = stemOnce(token);
  const second = stemOnce(first);
  return new Set([token, first, second]);
}

/** Sant når to ord deler minst én form. */
export function sameWord(a: string, b: string): boolean {
  const variants = variantsOf(b);
  for (const variant of variantsOf(a)) {
    if (variants.has(variant)) return true;
  }
  return false;
}

/** Prefikssøk med bøyningstoleranse: «kalib» og «kurver» treffer «kurve». */
export function tokenMatches(query: string, token: string): boolean {
  if (token.startsWith(query)) return true;
  if (query.length < 3) return false;
  return sameWord(query, token);
}
