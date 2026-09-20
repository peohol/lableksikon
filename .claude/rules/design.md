---
paths:
  - "src/**"
---

# Designsystem og demonstrasjoner

Normativ kilde: `design_handoff_lableksion/README.md`. Gjenskap designet
presist — ikke moderniser, forenkle eller reinterpretér det.

- **Ingen nye designtokens.** Farger, typografi, spacing, radier og skygger
  ligger i `src/styles/tokens.css` og kommer fra handoffens kapittel 1. Trengs
  en ny verdi, oppdateres handoffen først. Ingen gradienter, ingen skygger
  utenom de to overlay-flatene, ingen fargede bakgrunner på tekstblokker.
- **Lesespalten er 38rem.** En bred demonstrasjon velger spalte via de navngitte
  grid-linjene på begrepssiden, aldri ved å flytte teksten.
- **Demonstrasjoner deler ytre ramme, ikke indre layout.** Felles er
  `DemonstrationFrame`, primitivene i `src/demos/primitives.tsx`, typografien og
  tilgjengeligheten. Pedagogikken bestemmes av begrepet. Maks én primær
  interaksjon, maks to dataserier (`accent` og `warning`), og alle tilstander
  skal ha en meningsfull verdict-tekst.
- **Matematikk skrives som TeX og rendres med MathJax.** Bruk `\\(...\\)`
  inline og `\\[...\\]` for egne linjer. Ikke håndformater matematiske
  uttrykk med Unicode-symboler eller HTML når de kan uttrykkes i TeX.
- **Alt som kan dras skal også kunne styres fra tastaturet.** Hard regel.
- **Aldri farge alene.** Verdict-tekst sier hva som skjer, chips har tegn i
  tillegg til fyll, dataserier skiller seg på strektype i tillegg til farge.
- Dekorativ SVG er `aria-hidden`, og betydningen finnes i tekst ved siden av.
  Bruk native HTML-elementer framfor ARIA når native semantikk finnes.
- Ingen horisontal scrolling ned til 320px. Beholdere med tekst eller
  flex-barn har `min-width: 0`, grid-spor er `minmax(0, …)`.
