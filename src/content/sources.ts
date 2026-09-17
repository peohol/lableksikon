import type { Source } from "./schema";

const EURACHEM_2025 =
  "https://www.eurachem.org/images/stories/Guides/pdf/MV_guide_3rd_ed_V1_EN.pdf";

/** Autoritative fagkilder som kan gjenbrukes mellom begreper. */
export const SOURCES = {
  vimAccuracy: { title: "JCGM VIM — Measurement accuracy", url: "https://jcgm.bipm.org/vim/en/2.13.html", locator: "VIM 2.13" },
  vimTrueness: { title: "JCGM VIM — Measurement trueness", url: "https://jcgm.bipm.org/vim/en/2.14.html", locator: "VIM 2.14" },
  vimPrecision: { title: "JCGM VIM — Measurement precision", url: "https://jcgm.bipm.org/vim/en/2.15.html", locator: "VIM 2.15" },
  vimBias: { title: "JCGM VIM — Measurement bias", url: "https://jcgm.bipm.org/vim/en/2.18.html", locator: "VIM 2.18" },
  vimRepeatability: { title: "JCGM VIM — Measurement repeatability", url: "https://jcgm.bipm.org/vim/en/2.21.html", locator: "VIM 2.21" },
  vimIntermediatePrecision: { title: "JCGM VIM — Intermediate measurement precision", url: "https://jcgm.bipm.org/vim/en/2.23.html", locator: "VIM 2.23" },
  vimReproducibility: { title: "JCGM VIM — Measurement reproducibility", url: "https://jcgm.bipm.org/vim/en/2.25.html", locator: "VIM 2.25" },
  vimUncertainty: { title: "JCGM VIM — Measurement uncertainty", url: "https://jcgm.bipm.org/vim/en/2.26.html", locator: "VIM 2.26" },
  vimExpandedUncertainty: { title: "JCGM VIM — Expanded measurement uncertainty", url: "https://jcgm.bipm.org/vim/en/2.35.html", locator: "VIM 2.35" },
  vimCoverageFactor: { title: "JCGM VIM — Coverage factor", url: "https://jcgm.bipm.org/vim/en/2.38.html", locator: "VIM 2.38" },
  vimTraceability: { title: "JCGM VIM — Metrological traceability", url: "https://jcgm.bipm.org/vim/en/2.41.html", locator: "VIM 2.41" },
  vimVerification: { title: "JCGM VIM — Verification", url: "https://jcgm.bipm.org/vim/en/2.44.html", locator: "VIM 2.44" },
  vimValidation: { title: "JCGM VIM — Validation", url: "https://jcgm.bipm.org/vim/en/2.45.html", locator: "VIM 2.45" },
  vimSensitivity: { title: "JCGM VIM — Sensitivity of a measuring system", url: "https://jcgm.bipm.org/vim/en/4.12.html", locator: "VIM 4.12" },
  vimSelectivity: { title: "JCGM VIM — Selectivity of a measuring system", url: "https://jcgm.bipm.org/vim/en/4.13.html", locator: "VIM 4.13" },
  vimDetectionLimit: { title: "JCGM VIM — Detection limit", url: "https://jcgm.bipm.org/vim/en/4.18.html", locator: "VIM 4.18" },
  eurachem2025: { title: "Eurachem — The Fitness for Purpose of Analytical Methods, 3rd ed. (2025)", url: EURACHEM_2025 },
  iupacMetrology2021: { title: "IUPAC Recommendations — Metrological and quality concepts in analytical chemistry", url: "https://doi.org/10.1515/pac-2019-0819" },
  iupacRecovery: { title: "IUPAC Gold Book — Recovered quantity value ratio", url: "https://goldbook.iupac.org/terms/view/08039" },
  iupacBlank: { title: "IUPAC Gold Book — Blank material", url: "https://goldbook.iupac.org/terms/view/08010" },
  iupacInternalStandard: { title: "IUPAC Gold Book — Internal standard", url: "https://goldbook.iupac.org/terms/view/I03108" },
  iupacSurrogateInternalStandard: { title: "IUPAC Gold Book — Surrogate internal standard", url: "https://goldbook.iupac.org/terms/view/12589" },
  iupacStandardAddition: { title: "IUPAC Gold Book — Measurement procedure with standard addition", url: "https://goldbook.iupac.org/terms/view/08030" },
  iupacMatrixEffect: { title: "IUPAC Gold Book — Matrix effect", url: "https://goldbook.iupac.org/terms/view/M03759" },
  iupacPeakResolution: { title: "IUPAC Gold Book — Peak resolution in chromatography", url: "https://goldbook.iupac.org/terms/view/P04465" },
  nistStandardDeviation: { title: "NIST/SEMATECH e-Handbook — Measures of Scale", url: "https://www.itl.nist.gov/div898/handbook/eda/section3/eda356.htm" },
  nistControlChart: { title: "NIST/SEMATECH e-Handbook — Shewhart control chart", url: "https://www.itl.nist.gov/div898/handbook/mpc/section2/mpc221.htm" },
} as const satisfies Record<string, Source>;
