# Lableksion — repo-regler

Pedagogisk oppslagsverk for begreper i analytisk kjemi. Next.js (App Router),
TypeScript, CSS Modules, statisk generert, driftet på Vercel.

## Designkilde

`design_handoff_lableksion/README.md` er **normativ** for produkt, UX,
designsystem, responsivitet og tilgjengelighet. `Lableksion.dc.html` og
`Designsystem.dc.html` i samme mappe er visuelle referanser.
`Lableksion konsepter.dc.html` er historikk — forkastede konsepter er ikke
designretning.

Handoff-filene skal ikke endres eller slettes. De er prototyper: de skal ikke
gjøres om til produksjonskode og `support.js` skal ikke brukes som runtime.

Avvik fra handoffen gjøres bare når en regel i kapittel 5 (tilgjengelighet)
eller gyldig HTML/ARIA krever det, og skal kommenteres i koden der det skjer.

## Varige regler

- **Ingen nye designtokens.** Farger, typografi, spacing, radier og skygger
  ligger i `src/styles/tokens.css` og kommer fra handoffens kapittel 1. Nye
  verdier krever at handoffen oppdateres først.
- **Definisjonen finnes ett sted.** Hvert begrep har én post under
  `src/content/terms/`. Søk, lister, popover og begrepsside leser derfra.
  Begrepslenker i tekst refererer til slug: `[synlig tekst](begrep:slug)`.
- **Ingen offentlig «ufullstendig begrep»-tilstand.** Et begrep publiseres
  først når definisjon, enkel forklaring, demonstrasjon og dybde er på plass.
  Alt annet ligger i `src/content/drafts.ts` og skal aldri nå den offentlige
  appen.
- **Demonstrasjoner deler ytre ramme, ikke indre layout.** Felles er
  `DemonstrationFrame`, primitivene i `src/demos/primitives.tsx`, typografien
  og tilgjengeligheten. Pedagogikken bestemmes av begrepet.
- **Alt som kan dras skal også kunne styres fra tastaturet.** Hard regel.
- **Ingen database, innlogging eller CMS** uten at et konkret behov krever det.

## Arbeidsmåte

- Repo-eier er ikke utvikler. Tekniske veivalg — rammeverk, biblioteker,
  mappestruktur, testoppsett — tas av kodeagenten uten å spørre. Spør bare om
  ting som krever eierens konto, hemmeligheter eller en visuell vurdering.
- Kjør `npm run check` (lint, typecheck, enhetstester, produksjonsbuild) før du
  er ferdig. E2E: `npm run test:e2e`.
- Nytt begrep: lag `src/content/terms/<slug>.ts`, registrer det i
  `src/content/terms/index.ts`, legg demonstrasjonen i `src/demos/` og id-en i
  `src/demos/ids.ts` + `src/demos/registry.tsx`. Innholdsvalidering kjører ved
  modullasting og stopper bygget ved feil.
