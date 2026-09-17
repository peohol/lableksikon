import type { Source } from "./schema";

/** Autoritative hovedkilder som kan gjenbrukes på tvers av begreper. */
export const SOURCES = {
  vim: {
    title: "International Vocabulary of Metrology (VIM), 3rd edition",
    organization: "JCGM / BIPM",
    url: "https://doi.org/10.59161/JCGM200-2012",
    note: "Normativ hovedkilde for metrologisk terminologi.",
  },
  gum: {
    title: "Guide to the Expression of Uncertainty in Measurement (GUM)",
    organization: "JCGM / BIPM",
    url: "https://doi.org/10.59161/JCGM100-2008E",
    note: "Grunnlag for uttrykk og beregning av måleusikkerhet.",
  },
  eurachemValidation: {
    title: "The Fitness for Purpose of Analytical Methods – A Laboratory Guide to Method Validation and Related Topics, 3rd ed. (2025)",
    organization: "Eurachem",
    url: "https://www.eurachem.org/index.php/publications/guides/mv",
    note: "Hovedkilde for validering og ytelsesegenskaper ved analytiske metoder.",
  },
  eurachemUncertainty: {
    title: "Evaluation of measurement uncertainty from in-house precision and recovery data (2026)",
    organization: "Eurachem/CITAC",
    url: "https://doi.org/10.56526/2026.0005",
    note: "Praktisk veiledning for måleusikkerhet basert på intern presisjon og gjenvinning.",
  },
} as const satisfies Record<string, Source>;
