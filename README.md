# Lableksion

Lableksion er et pedagogisk oppslagsverk for begreper i analytisk kjemi. Hvert
begrep har fire lag i fast rekkefølge — kort definisjon, hverdagslig forklaring,
pedagogisk demonstrasjon og valgfri teknisk dybde — og du kan bla gjennom hele
verket kontinuerlig med forrige/neste.

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
npm run test:e2e # nettlesertester (Playwright: tastatur, popover, responsivitet, akse)
```

E2E-testene bygger ikke selv: kjør `npm run build` først. Første gang må
nettleseren installeres med `npx playwright install chromium`. Er Chromium
allerede installert i miljøet, kan den brukes med
`PLAYWRIGHT_CHROMIUM_PATH=/sti/til/chromium npm run test:e2e`.

## Struktur

```
src/
  app/                 Ruter: / , /begrep/<slug> , /kategori/<slug> , /a-aa
  components/          Grensesnittkomponenter (header, søk, lister, popover, ramme)
  content/
    categories.ts      Kategorier i redaksjonell rekkefølge
    terms/             Ett publisert begrep per fil
    drafts.ts          Begreper uten komplett innhold — publiseres ikke
    schema.ts          Datamodell og validering (Zod)
    richtext.ts        Inline-format for begrepslenker
    index.ts           Oppslag, rekkefølge, validering
  demos/               Demonstrasjonene, én komponent per begrep
  lib/                 Søk, norsk normalisering, alfabet, småfunksjoner
  styles/              Designtokens og felles primitiver
tests/                 Enhets- og komponenttester
tests/e2e/             Playwright-tester
design_handoff_lableksion/   Normativ designspesifikasjon (endres ikke)
```

Innholdet ligger som typede TypeScript-filer. Hvert begrep er én post med slug,
tittel, kategori, definisjon, forklaring, dybde, demonstrasjonsreferanse og
aliaser. Definisjonen finnes bare der — søk, lister, forhåndsvisning og
begrepsside leser den samme strengen.

## Innhold i denne versjonen

Elleve begreper er publisert, med hver sin demonstrasjon. De øvrige begrepene
fra designprototypen ligger som redaksjonell kø i `src/content/drafts.ts` og har
ingen offentlig side. Tekstene er hentet fra prototypen og er ikke faglig
kvalitetssikret.

## Drift

Appen er en ren statisk Next.js-app uten database, innlogging eller backend.
Den bygges med `npm run build` og kan deployes til Vercel uten videre
konfigurasjon. Sett `NEXT_PUBLIC_SITE_URL` til produksjonsdomenet, slik at
metadata, sitemap og robots peker riktig.
