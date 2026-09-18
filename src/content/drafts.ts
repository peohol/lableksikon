import type { DraftTerm } from "./schema";

/**
 * Redaksjonell kø for begreper som ennå ikke har komplett, publiseringsklart innhold.
 *
 * Alle begrepene fra den opprinnelige designprototypen er nå faglig gjennomgått
 * og publisert. Nye utkast kan legges til her senere uten å bli eksponert offentlig.
 */
export const draftTerms: DraftTerm[] = [];
