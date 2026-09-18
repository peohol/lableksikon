# Lableksion

Lableksion er et pedagogisk oppslagsverk for begreper i analytisk kjemi. Hvert
begrep har en kort definisjon, en hverdagslig forklaring, en pedagogisk
demonstrasjon, valgfri teknisk dybde og etterprøvbare fagkilder. Du kan bla
gjennom hele verket kontinuerlig med forrige/neste.

Produktet skal oppleves som et rolig oppslagsverk, ikke som en lærebok, et
dashboard eller en kursplattform.

## Kjøre appen lokalt

Krever Node 22.22 eller nyere (eller Node 24.15 og nyere). Testverktøyet setter
den grensen; selve appen bygger også på eldre Node.

```bash
npm install
npm run dev      # utviklingsserver på http://localhost:3000
```

Andre kommandoer:

```bash
npm run build    # produksjonsbygg
npm run start    # kjører produksjonsbygget lokalt
npm run lint     # ESLint
npm run typecheck
npm run check    # lint + typecheck + enhetstester + build
```

## Tester

```bash
npm test         # enhets- og komponenttester (Vitest + Testing Library + axe)
npm run test:e2e # nettlesertester (tastatur, popover, responsivitet, axe og visuelle layoutkontrakter)
```

E2E-testene bygger ikke selv: kjør `npm run build` først. Første gang må
nettleseren installeres med `npx playwright install chromium`. Er Chromium
allerede installert i miljøet, kan den brukes med
`PLAYWRIGHT_CHROMIUM_PATH=/sti/til/chromium npm run test:e2e`.

## Struktur

```
src/
  app/                 Ruter: / , /begrep/<slug> , /kategori/<slug> , /a-aa
  components/          Grensesnittkomponenter
  content/
    categories.ts      Kategorier i redaksjonell rekkefølge
    terms/             Ett publisert begrep per fil
    drafts.ts          Aktiv redaksjonell kø for upubliserte utkast
    sources.ts         Gjenbrukbare autoritative fagkilder
    schema.ts          Datamodell og validering (Zod)
    richtext.ts        Inline-format for begrepslenker
    index.ts           Oppslag, rekkefølge, validering
  demos/               Demonstrasjonene
  lib/                 Søk, norsk normalisering, alfabet, småfunksjoner
  styles/              Designtokens og felles primitiver
tests/                 Enhets- og komponenttester
tests/e2e/             Playwright-tester
design_handoff_lableksion/   Normativ designspesifikasjon (endres ikke)
```

Innholdet ligger som typede TypeScript-filer. Hvert publiserte begrep har én
kanonisk definisjon som gjenbrukes i søk, lister og forhåndsvisning, samt
forklaring, dybde, demonstrasjon, aliaser og fagkilder.

## Innhold i denne versjonen

Alle de 105 begrepene fra den opprinnelige designprototypen er nå publisert i
10 kategorier. Begrepene er faglig gjennomgått og kildebelagt mot autoritative
kilder som blant annet JCGM/VIM, Eurachem, IUPAC, BIPM og relevante
standard-/referansekilder.

Den opprinnelige prototypekøen er ferdig behandlet. `drafts.ts` er nå en tom,
aktiv redaksjonell kø som kan brukes til nye begreper senere uten at uferdig
innhold blir offentlig.

## Drift

Appen er en ren statisk Next.js-app uten database, innlogging eller backend.
Den bygges med `npm run build` og kan deployes til Vercel uten videre
konfigurasjon; `vercel.json` sier hvilket rammeverk prosjektet bruker.

Vercel-prosjektet skal bruke Framework Preset `Next.js` og automatisk deteksjon
av Output Directory. Ikke sett Output Directory til `public`; Next.js-rutene
bygges og serves av Vercels Next.js-integrasjon.

Adressen i metadata, sitemap og robots hentes automatisk fra Vercels
produksjonsdomene. Får nettstedet et eget domene, settes `NEXT_PUBLIC_SITE_URL`
til det.
