/** Rene regnefunksjoner som demonstrasjonene deler. Ingen DOM, lett å teste. */

export interface LineFit {
  intercept: number;
  slope: number;
  predicted: number[];
  r2: number;
}

/** Minste kvadraters tilpasning av y mot indeks 0…n−1. */
export function fitLine(ys: number[]): LineFit {
  const n = ys.length;
  const meanX = (n - 1) / 2;
  const meanY = ys.reduce((sum, y) => sum + y, 0) / n;
  let sxy = 0;
  let sxx = 0;
  ys.forEach((y, index) => {
    sxy += (index - meanX) * (y - meanY);
    sxx += (index - meanX) * (index - meanX);
  });
  const slope = sxy / sxx;
  const intercept = meanY - slope * meanX;
  const predicted = ys.map((_, index) => intercept + slope * index);
  let ssr = 0;
  let sst = 0;
  ys.forEach((y, index) => {
    ssr += (y - (predicted[index] as number)) ** 2;
    sst += (y - meanY) ** 2;
  });
  return { intercept, slope, predicted, r2: sst === 0 ? 1 : 1 - ssr / sst };
}

export const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

/** Norsk tallformat: komma som desimalskilletegn. */
export const comma = (value: number, decimals: number) =>
  value.toFixed(decimals).replace(".", ",");

/** Gjennomsnittet av en måleserie. */
export function mean(values: number[]): number {
  if (values.length === 0) return Number.NaN;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

/**
 * Utvalgsstandardavviket s, altså med n − 1 frihetsgrader. Det er dette
 * standardavviket laboratoriet regner ut fra en måleserie.
 */
export function sampleStandardDeviation(values: number[]): number {
  const n = values.length;
  if (n < 2) return Number.NaN;
  const average = mean(values);
  const sumOfSquares = values.reduce((sum, value) => sum + (value - average) ** 2, 0);
  return Math.sqrt(sumOfSquares / (n - 1));
}

/** Relativt standardavvik i prosent: s / x̄ · 100. */
export function relativeStandardDeviation(values: number[]): number {
  const average = mean(values);
  if (average === 0) return Number.NaN;
  return (sampleStandardDeviation(values) / average) * 100;
}
