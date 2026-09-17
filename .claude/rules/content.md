---
paths:
  - "src/content/**"
---

# Innholdsmodellen

- **Ett begrep er én post** under `src/content/terms/`, registrert i
  `terms/index.ts`. Rekkefølgen der er den redaksjonelle rekkefølgen innen
  kategorien, og sammen med `categories.ts` gir den den globale,
  sirkulære forrige/neste-rekkefølgen.
- **Definisjonen finnes bare ett sted.** Søk, lister, forhåndsvisning og
  begrepsside leser den samme strengen. Kopier den aldri inn i en tekst.
- **Begrepslenker refererer til slug**, ikke til kopiert tekst:
  `[synlig tekst](begrep:slug)`. Den synlige teksten kan bøyes fritt.
- **Et begrep publiseres først når siden er komplett** — definisjon, enkel
  forklaring, demonstrasjon, dybde og minst én etterprøvbar fagkilde. Alt annet
  er redaksjonell kø og skal aldri nå den offentlige appen.
- Fagkilder skal som hovedregel være autoritative standard-/metrologikilder,
  faglige retningslinjer eller primærkilder. Ikke bruk blogginnlegg som fasit
  når en normativ eller autoritativ kilde finnes.
- Aliaser skrives i grunnform; søket håndterer bøyning og æ/ø/å selv.
- Validering kjører ved modullasting og stopper bygget ved feil. Nytt begrep
  krever også en demonstrasjon: id i `src/demos/ids.ts`, komponent i
  `src/demos/` og oppføring i `src/demos/registry.tsx`.
