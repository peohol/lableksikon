# Handoff: Lableksion

## Oversikt

Lableksion er et pedagogisk oppslagsverk for begreper i analytisk kjemi. Hvert begrep har fire lag av informasjon i fast rekkefølge — definisjon, hverdagslig forklaring, pedagogisk demonstrasjon, valgfri teknisk dybde — og navigasjon som gjør at man kan bla gjennom hele verket kontinuerlig. Målgruppen er både førstegangslesere og fagpersoner som vil ha en presis oppfriskning.

Produktet skal oppleves som et rolig oppslagsverk. Det skal ikke ligne en lærebok, et dashboard eller en kursplattform.

## Om designfilene

Filene i denne pakken er **designreferanser skrevet i HTML** — prototyper som viser tilsiktet utseende og oppførsel. De er ikke produksjonskode som skal kopieres direkte.

Oppgaven er å **gjenskape designet i kodebasens eksisterende miljø** (React, Vue, Svelte, hva som gjelder) med etablerte mønstre og biblioteker. Finnes ingen kodebase ennå, velg selv et passende rammeverk og implementer designet der. Prototypen er bygget som én enkeltfil uten router, uten backend og uten bygg; ingenting av det er en anbefaling for produksjon.

## Fidelity

**Høy fidelity.** Farger, typografi, spacing, tekstbredder, states og interaksjoner i prototypen er bevisste og skal gjenskapes presist. Tokenverdiene under er normative.

To unntak, som er bevisst lofi:
- **Prototypeinnholdet** (definisjoner, forklaringer, dybdetekster, tall i demonstrasjonene) er representativt eksempelinnhold, ikke faglig fasit. Se «Innhold» nederst.
- **De tre SVG-illustrasjonene** (blindprøveglass, pilskiver, blankfigurene) er skisser som viser hva figuren skal kommunisere, ikke ferdig illustrasjon.

## Låste beslutninger

Disse er ferdig utforsket og skal følges, ikke revurderes.

### Informasjonsarkitektur

Forsiden: hovedsøk → kategorier → maks 5 synlige begreper per kategori → «Alle N i …» til kategorisiden → «Alle begreper A–Å».

Begrepssiden, i denne rekkefølgen, ovenfra og ned i én lesespalte:

1. kategori (lenke) og posisjon i kategorien
2. tittel
3. kort, presis definisjon
4. enkel forklaring i hverdagslig språk
5. pedagogisk demonstrasjon
6. valgfri teknisk dybdeforklaring, **lukket som standard**
7. forrige/neste

Demonstrasjonen har konsistent ytre ramme og fri indre layout.

### Ferdige begreper

Det finnes **ingen offentlig «ufullstendig begrep»-tilstand**. Et begrep publiseres ikke før den offentlige siden er komplett, og demonstrasjonen regnes som en del av en komplett side. Demonstrasjonen behøver ikke være interaktiv — statisk illustrasjon, sammenligning eller formelforklaring er fullverdige løsninger.

Prototypen har en midlertidig «ikke laget ennå»-tilstand for de 94 begrepene uten tekst. Den er et stillas for å stressteste arkitekturen og **skal ikke implementeres**. Trenger redaksjonen en tilsvarende tilstand internt, hører den i et redaksjonsverktøy, ikke i produktet.

### Dybdeforklaring

Én disclosure per side, lukket som standard. Innholdet kan inneholde underoverskrifter (h3), avsnitt, lister, formler, figurer og begrepslenker. **Ingen nested accordions** som standardmønster; innfør det bare hvis en konkret innholdstype senere krever det.

### Begrepslenker

Visuelt gjenkjennelig lenke i løpende tekst. Desktop: hover og tastaturfokus gir forhåndsvisning, klikk navigerer. Touch: første trykk gir forhåndsvisning uten navigasjon, kortet har eksplisitt vei til begrepssiden. Ingen layout shift i brødteksten. Full tastaturstøtte. Teknisk implementasjon velges fritt (se «Tekniske oppgaver»).

### URL-er

Ekte URL-er og normal nettlesernavigasjon:

- `/` — forsiden
- `/begrep/<slug>` — begrepsside
- `/kategori/<slug>` — kategoriside
- `/a-aa` — alle begreper

Tilbake/fram, direkte lenking, reload og deling skal fungere normalt. Søketilstand bør ligge i query (`?q=`) slik at et søkeresultat kan deles. Prototypen har ingen routing; det er en mangel i prototypen, ikke en designbeslutning.

---

# 1. Designsystem

## 1.1 Typografi

**Skrifter**

| Rolle | Familie | Vekter | Brukes til |
| --- | --- | --- | --- |
| Lesetekst | Newsreader (serif) | 300–600, italic 400 | titler, definisjon, brødtekst, dybdetekst, listetitler, tall i demonstrasjoner |
| Grensesnitt | IBM Plex Sans | 400, 500, 600 | kategori-kicker, labels, metadata, knappetekst, figcaption, aksetekst, inputfelt |

Fallback: `Newsreader, Georgia, serif` og `'IBM Plex Sans', system-ui, sans-serif`.

Regelen er enkel: **alt som skal leses er serif, alt som skal betjenes eller merkes er sans.** Tall som er en del av det pedagogiske budskapet (RSD 3,4 %, R² = 0,998, S/N = 1,3) er serif; enhetene og forklaringene rundt dem i sans.

**Skala** (clamp der størrelsen skal følge viewport)

| Token | Verdi | Line-height | Letter-spacing | Bruk |
| --- | --- | --- | --- | --- |
| `title-page` | clamp(28px, 5.4vw, 46px) | 1.08 | −0.018em | begrepstittel (h1) |
| `title-home` | clamp(28px, 5vw, 44px) | 1.12 | −0.015em | forsidens h1 |
| `title-section` | clamp(28px, 5vw, 40–42px) | 1.10 | −0.015em | kategoriside, A–Å (h1) |
| `definition` | clamp(18px, 2.5vw, 24px) | 1.38 | 0 | den korte definisjonen |
| `body` | clamp(17px, 2.1vw, 19px) | 1.60 | 0 | enkel forklaring |
| `body-depth` | 17px | 1.62 | 0 | dybdetekst |
| `lead-italic` | clamp(17px, 2.2vw, 20px) | 1.45 | 0 | kategoriens spørsmålslinje, figur-etterord |
| `list-title` | 17–21px (clamp(19px, 2.3vw, 21px) i lister) | 1.20–1.25 | 0 | begrepsnavn i lister og treff |
| `list-def` | 16px | 1.45 | 0 | definisjon i lister og treff |
| `readout` | 24–30px | 1.05–1.10 | 0 | store tall i demonstrasjoner |
| `ui` | 13.5–15px | 1.4 | 0 | knapper, input, chips |
| `meta` | 11–13px | 1.3–1.5 | 0 | antall, aksetekst, hjelpetekst |
| `kicker` | 10–11px, 600 | 1.0 | +0.09–0.11em, uppercase | kategori, figcaption-etikett, dybdens h3 |

**Maksimal tekstbredde:** 38rem for lesespalten (definisjon, forklaring, dybde). Tekst inne i demonstrasjoner og i lister: 52–54em der linjene kan bli lange. Forsidens intro: 36em. Ingen lesetekst skal gå bredere enn 38rem uansett skjermbredde.

**Behandling per teksttype**

- **Definisjon**: største lesetekst på siden, etterfulgt av en 1px hårlinje i `border-strong-ink` som skiller den fra forklaringen. Aldri i boks, aldri uthevet med farge.
- **Enkel forklaring**: 2 avsnitt à 2–4 setninger er normalen. `text-wrap: pretty`.
- **Metadata**: sans, `text-secondary`, aldri større enn 13px.
- **Labels/kickers**: sans 600, uppercase, sperret. Brukes bare til kategori, figuretikett og dybdens underoverskrifter.
- **Teknisk innhold**: samme serif som brødteksten, ett hakk mindre (17px) og med litt større linjeavstand (1.62). Formler settes i `FormulaBlock` (se 2.22), variabelnavn i løpende tekst settes med samme serif, ikke monospace.

## 1.2 Farger

Semantiske tokens. Kontrast oppgitt mot det underlaget tokenet faktisk brukes på.

| Token | Hex | Bruk | Kontrast |
| --- | --- | --- | --- |
| `background` | `#faf8f4` | sidebakgrunn | — |
| `surface` | `#ffffff` | demonstrasjonsramme, popover, dropdown, inputfelt | — |
| `surface-muted` | `#f7f5f0` | plottflate inne i demonstrasjoner, skiveflate | — |
| `text-primary` | `#1b1a17` | titler, definisjon, ink i grafikk | 15.3:1 på background |
| `text-body` | `#2f2c26` | brødtekst, dybdetekst | 11.6:1 |
| `text-secondary` | `#4a453c` | metadata, aksetekst, hjelpetekst, italic ledetekst | 7.7:1 |
| `text-tertiary` | `#6b6458` | kickers, figcaption, tellere | 5.6:1 |
| `text-disabled` | `#b8b0a2` | bokstav uten treff i A–Å | 2.1:1 — brukes **kun** på ikke-interaktive tegn, aldri på tekst som skal leses |
| `border` | `#e6e0d4` | radskiller, rammer inne i demonstrasjoner | — |
| `border-strong` | `#d9d2c4` | ytre ramme på demonstrasjonsflate, dashed hjelpelinjer | — |
| `border-input` | `#c9c1b0` | inputfelt, inaktiv chip, sekundærknapp | — |
| `border-ink` | `#1b1a17` | hårlinje under definisjon, seksjonsskille, popover-ramme, primærknapp | — |
| `accent` | `#1f6f6b` | lenker, kategori-kicker, aktiv chip, dataserie 1 | 5.1:1 på background |
| `accent-hover` | `#15514e` | lenke hover/active | 7.6:1 |
| `accent-soft` | `rgba(31,111,107,.24)` | usikkerhetsintervall, flatefyll | — |
| `warning` | `#b4552d` | «under grensa», avvik, grenseverdi, dataserie 2 | 4.6:1 på background |
| `focus` | `#1f6f6b` | focus ring | — |
| `ink-invert` | `#ffffff` | tekst på `border-ink`- og `accent`-flater | 15.3:1 / 5.1:1 |

Regler:
- Maks to dataserier per demonstrasjon: `accent` og `warning`. Trengs en tredje, bruk `text-primary` som strek, ikke en ny farge.
- `warning` er ikke en feilfarge. Den betyr «her er det noe å legge merke til faglig» — grenseverdi krysset, signal under grensa, kurve som avviker. Systemet har ingen error- eller success-farge; produktet har ingen skjemaer eller destruktive handlinger.
- Ingen gradienter, ingen fargede bakgrunner på tekstblokker.

## 1.3 Spacing og layout

**Spacing-skala** (px): 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 26, 32, 40, 48, 56.

I praksis: 6–10 mellom tett beslektede elementer (label og verdi), 12–18 innenfor en komponent, 20–26 mellom komponenter, 32–56 mellom sidens hovedseksjoner. Store vertikale sprang skaleres: `clamp(18px, 3vw, 28px)` før dybde-disclosure, `clamp(22px, 3.5vw, 34px)` før demonstrasjonen, `clamp(28px, 5vw, 48px)` før forrige/neste.

**Responsive sidepaddinger:** `clamp(16px, 4vw, 40px)` horisontalt for alt hovedinnhold. Header bruker `clamp(12px, 3vw, 40px)`. Toppadding på sider: `clamp(20px, 4vw, 44px)` for begrepsside, `clamp(28px, 6vw, 68px)` for forsiden.

**Sidebredder**

| Kontekst | Maksbredde |
| --- | --- |
| Lesespalte (all lesetekst) | 38rem |
| Forsiden (kategorigrid) | 78rem |
| Kategoriside | 60rem |
| A–Å | 66rem |
| Demonstrasjon, normal | = lesespalten (38rem) |
| Demonstrasjon, bred | 64rem (graf), 70rem (svært bred graf) |
| Popover | 308px (desktop) |

Begrepssiden er ett grid med navngitte linjer, slik at en demonstrasjon kan velge spalte uten at teksten flytter seg:

```
grid-template-columns:
  [full-start] minmax(0,1fr) [text-start] minmax(0,38rem) [text-end] minmax(0,1fr) [full-end];
column-gap: clamp(16px, 3vw, 32px);
```

Tekst ligger i `text-start/text-end`. En bred demonstrasjon ligger i `full-start/full-end` med `justify-self:center`, `width:100%` og egen maksbredde. Dette er hele mekanismen bak «demonstrasjonen kan få stor visuell prioritet».

**Vertikal rytme:** alle seksjonsskiller er 1px linjer, ikke bokser. Tre nivåer: `border-ink` for strukturelle skiller (under definisjonen, over forrige/neste, under kategorioverskrift), `border` for radskillere og lister, `border-strong` dashed for hjelpelinjer i grafikk.

**Breakpoints** — definert av layoutbehov, ikke enhetsnavn:

| Grense | Hva utløser den |
| --- | --- |
| ~380px | chips og knapperader går fra én rad til flere |
| ~620px | popover går fra ankret kort til bottom sheet |
| ~700px | demonstrasjoner med to kolonner (graf + avlesning) kan stå side om side |
| ~900px | kategorigrid går fra 2 til 3 spalter |
| ~1100px | bred demonstrasjon blir faktisk bredere enn lesespalten |

Alt dette er i prototypen løst med `flex-wrap`, `grid-template-columns: repeat(auto-fill, minmax(min(100%, Xrem), 1fr))` og `clamp()` — ikke med media queries. Behold den tilnærmingen der den holder; bruk container queries i produksjon der komponenten må vite sin egen bredde.

## 1.4 Former og overflater

| Egenskap | Verdi | Bruk |
| --- | --- | --- |
| radius-sm | 6px | små flater, plottflate, stegkort (8px) |
| radius-md | 10px | demonstrasjonsramme, popover, søkedropdown |
| radius-pill | 22–24px | inputfelt, chips, knapper |
| border | 1px solid | alle rammer. 1.5px der elementet er interaktivt (chip, knapp, inputfelt i fokusbar tilstand) |
| dashed | 1px/1.5px dashed | hjelpelinjer i grafikk, «ikke laget ennå»-ramme (utgår) |
| shadow-pop | `0 12px 32px rgba(27,26,23,.18)` | popover |
| shadow-menu | `0 12px 30px rgba(27,26,23,.15)` | søkedropdown |
| focus ring | `outline: 2.5px solid #1f6f6b; outline-offset: 2px; border-radius: 2px` via `:focus-visible` | alt interaktivt |

Skygge finnes **bare** på de to overlay-flatene. Kort, rammer og seksjoner har aldri skygge. Ingen andre dekorative effekter.

**Interaktive states**

| Element | Default | Hover | Focus-visible | Active/valgt |
| --- | --- | --- | --- | --- |
| Tekstlenke | `accent` | `accent-hover` | focus ring | — |
| Begrepslenke | `accent` + 1.5px dotted underline | samme + popover | focus ring + popover | — |
| Begrepsnavn i liste | `text-primary` + 1px `border-input` underline | underline blir `accent` | focus ring | — |
| Primærknapp | `border-ink` fyll, `ink-invert` tekst | mørkere fyll | focus ring | — |
| Sekundærknapp | `surface` + 1.5px `border-input` | `border-ink` ramme | focus ring | — |
| Chip | `surface` + 1.5px `border-input` + `+`-tegn | `border-ink` ramme | focus ring | `accent` fyll, hvit tekst, `✓`-tegn, `aria-pressed="true"` |
| Disclosure | `▸` + `border` under | understreking | focus ring | `▾`, `aria-expanded="true"` |
| Slider | native, `accent-color: accent` | — | focus ring | — |

---

# 2. Komponenter

Hver komponent: struktur, varianter, states, responsiv regel.

## 2.1 Header

Sticky topp, `background` med 95 % opasitet og 6px backdrop-blur, 1px `border` under. Innhold i `max-width:78rem`, `flex`, `justify-content:space-between`, `flex-wrap:wrap`, `gap:10px 16px`.

Venstre: ordmerket «Lableksion», Newsreader 20px/500, som knapp/lenke til `/`. Høyre: kompakt `SearchField` (`flex:1 1 170px; max-width:22rem`).

Ingen annen navigasjon. Ingen kategorimeny i headeren — kategoriene finnes på forsiden og i kickeren på hver begrepsside.

Responsivt: under ~380px wrapper søkefeltet til egen linje under ordmerket. Headeren vokser i høyde; sticky-offset for A–Å-bokstavbaren må regnes ut fra faktisk høyde, ikke en konstant.

## 2.2 SearchField

To varianter av samme komponent.

- **hero** (forsiden): label «SØK» i kicker-stil over feltet, 100 % bredde opptil 34rem, `min-height:48px`, padding 14/18, 1.5px `border-ink`, radius-pill, placeholder «Begrep, synonym eller et ord du husker».
- **compact** (header): `min-height:40px`, padding 9/13, 1px `border-input`, placeholder «Søk i N begreper».

States: default, fokus (focus ring), med innhold (viser resultater). Escape tømmer feltet. `role="combobox"` + `aria-expanded` når varianten har dropdown.

Hero-varianten viser resultatene **inline på siden** i stedet for kategoriene. Compact-varianten viser en dropdown. Begge skriver til samme søketilstand; i produksjon bør den ligge i URL-en.

## 2.3 SearchResults

Rangering, låst: 1) tittel starter med søkestrengen, 2) tittel inneholder den, 3) treff på synonym/beslektet ord, 4) treff i definisjonen. Sortering innen samme nivå alfabetisk (`localeCompare('nb')`). Søket normaliserer æ/ø/å og er case-insensitivt.

Hvert treff viser kategori + treffårsak i kicker (`· treff på beslektet ord`, `· treff i definisjonen`), tittel, definisjon. Hele raden er klikkbar, `min-height:44px`, 1px `border` under.

Teller over listen, `aria-live="polite"`: «1 treff», «14 treff», «66 treff — viser de 20 mest relevante». Inline-varianten kapper på 20, dropdown på 8 pluss raden «Se alle treff på forsiden →».

Varianter: inline (forsiden, viser definisjon) og dropdown (header, viser bare tittel + kategori, maks `min(62vh, 420px)` med scroll).

## 2.4 CategoryOverview

Forsidens grid av `CategoryBlock`: `repeat(auto-fill, minmax(min(100%, 19rem), 1fr))`, gap `clamp(26px, 3.4vw, 40px)`. Rekkefølgen på kategoriene er redaksjonell og fast — ikke alfabetisk, ikke etter størrelse. Under griddet: én rad «Alle N begreper, A–Å →».

## 2.5 CategoryBlock

Overskrift i kicker-stil, `accent`, med antall («18 begreper») høyrestilt i `text-tertiary`, 1px `border-ink` under. Under: kategoriens spørsmål i `lead-italic` («Hvor mye kan vi stole på tallet?»). Så maks **5** begrepsnavn som egne rader (`min-height:40px`), deretter «Alle 18 i kvalitet i måling →» hvis kategorien har mer enn 5.

Kategorier med 5 eller færre begreper viser alle og har ingen «alle»-lenke. Kategorier med ett begrep skriver «1 begrep».

## 2.6 CategoryPage

`max-width:60rem`. Tilbakelenke «← Alle kategorier», h1 med kategorinavn, spørsmålet i `lead-italic`, teller, deretter full liste av `TermListItem` med definisjon. Ingen demonstrasjoner, ingen filtrering — kategorier over 20 begreper skal fortsatt være én liste, ikke paginert.

## 2.7 AlphabeticalIndex

`max-width:66rem`. Sticky bokstavbar rett under headeren: alle 29 bokstaver (A–Å), `min-width:34px; min-height:40px`, `accent` når bokstaven har begreper, `text-disabled` når den ikke har. Bokstaver uten treff er ikke lenker.

Under: én seksjon per bokstav med anker-id, `scroll-margin-top` tilsvarende header + bokstavbar. Begrepene i to eller flere spalter: `repeat(auto-fill, minmax(min(100%, 17rem), 1fr))`, bare tittel, `min-height:44px`.

Sortering `localeCompare('nb')`; æ/ø/å har egne seksjoner.

## 2.8 TermListItem

Klikkbar rad. Varianter: **compact** (bare tittel — A–Å, kategoriblokk) og **detailed** (kicker med kategori/treffårsak + tittel + definisjon — søketreff, kategoriside). `min-height:44px`, 1px `border` under, hele raden er treffflate, tekst venstrestilt.

## 2.9 TermHeader

Kategori som lenke i kicker-stil (`accent`) + posisjon i `text-tertiary` («2 av 16», eller «eneste begrep i kategorien» når kategorien har ett). Deretter h1 i `title-page` med `overflow-wrap:break-word`.

Lange titler («Utvidet måleusikkerhet med dekningsfaktor», «Riktighet, presisjon og nøyaktighet») skal brytes over flere linjer og aldri forkortes med ellipse.

## 2.10 Definition

`definition`-skala, `text-primary`, `text-wrap:pretty`, 18px bunnpadding og 1px `border-ink` under. Én setning er normen, to er maks. Definisjonen er samme streng som brukes i søk, popover og lister — den finnes bare ett sted i datamodellen.

## 2.11 PlainLanguageExplanation

`body`-skala, `text-body`, maks 38rem, 2 avsnitt med 14px mellomrom. Inneholder 1–3 `ConceptLink`. Struktur som fungerer: hverdagslig analogi først, deretter hva det betyr på laben.

## 2.12 ConceptLink

`<a>` i løpende tekst: `accent`, ingen underline, 1.5px dotted bunnkant, 1px padding-bottom. `aria-haspopup="dialog"`.

Oppførsel — desktop (hover + fine pointer): pointerenter/fokus åpner popover, klikk navigerer. Touch/uten hover: første trykk åpner popover uten navigasjon, andre trykk på samme lenke lukker. Fokus åpner popover uavhengig av pekertype, slik at tastaturbrukere på touch-enheter også får definisjonen.

Flere lenker tett på hverandre: bare én popover åpen om gangen; ny lenke overtar umiddelbart uten flimmer (bruk en liten skjul-forsinkelse, ~200 ms, som avbrytes når en ny åpnes).

## 2.13 ConceptPreviewPopover

`position:fixed` — aldri i tekstflyten, så brødteksten flytter seg ikke. `surface`, 1px `border-ink`, radius-md, padding 14/16, `shadow-pop`, `role="dialog"` med tilgjengelig navn.

Innhold: kategori i kicker, tittel 20px serif, definisjon 16px serif, «Gå til begrepet →» (primærknapp) og «Lukk».

Plassering: ankret under lenken, 10px klaring; vipper over lenken når det ikke er 210px plass under; klemmes innenfor 12px fra viewportkanten. Under 620px: bottom sheet, 12px fra bunnen, bredde `min(100vw − 24px, 420px)`.

Tastatur: Tab fra lenken flytter fokus inn i kortet; fokus ut av kortet lukker det; Escape lukker og returnerer fokus til lenken (og må ikke gjenåpne kortet når fokus flyttes tilbake — det var den eneste reelle feilen prototypen hadde her). Pointerdown utenfor lukker.

## 2.14 DemonstrationFrame

Den ytre rammen er det gjenkjennelige, det indre er fritt.

Ramme: `surface`, 1px `border-strong`, radius-md, `min-width:0`. `figcaption` på toppen med 1px `border` under, `flex` med `space-between` og `flex-wrap`:
- venstre: typeetikett i kicker-stil — `Demonstrasjon · illustrasjon | interaktiv | interaktiv, stor | før og etter | sammenligning | stegvis | formel`
- høyre: kort handlingsanvisning i vanlig setningsform, 12.5px sans («Skru opp støyen til toppen forsvinner»)

Innhold: padding 16–20px. Bredde-varianter: **text** (38rem, standard), **wide** (`full-start/full-end`, maks 64rem), **extra-wide** (maks 70rem, bare for grafer som virkelig trenger det).

`role="group"` med `aria-label` som beskriver hva demonstrasjonen viser. Dekorativ SVG får `aria-hidden="true"`; betydningen skal alltid finnes i tekst ved siden av (readout + `Verdict`).

Valgfritt etterord under innholdet: `lead-italic`, `text-secondary` — brukes til å peke på det man ellers overser («Legg merke til at klyngen aldri flytter seg inn mot blinken»).

## 2.15 DepthDisclosure

Én per side. Trigger: full bredde, venstrestilt, `▸`/`▾` i `accent` + tittel i 14.5px sans/500, `min-height:48px`, 1px `border` under, `aria-expanded`. Lukket som standard.

Tittelen sier hva dybden inneholder, ikke «Les mer»: «Dybde: regresjon, residualer og hvorfor R² ikke er nok».

Åpnet innhold: `body-depth`, maks 38em, h3 i kicker-stil (`accent`) når teksten er lang nok til å trenge inndeling, avsnitt med 12–14px mellomrom, begrepslenker som ellers.

## 2.16 PreviousNextNavigation

1px `border-ink` over, `grid-template-columns: repeat(auto-fit, minmax(min(100%, 13rem), 1fr))`, gap 12/20. Venstre: «← Forrige» (+ « · kategorinavn» hvis forrige begrep ligger i en annen kategori) og tittel i `accent` 19px. Høyre: samme, høyrestilt.

Rekkefølgen er global: kategoriene i redaksjonell rekkefølge, begrepene i sin rekkefølge innen kategorien, sirkulært — etter siste begrep i siste kategori kommer første begrep i første kategori. Kategoribytte skal alltid annonseres i etiketten. `min-height:52px`, titler brytes over flere linjer.

## 2.17 EmptySearchState

«Ingen treff på «zzz».» i 19px serif, deretter én forklarende setning om at søket også leter i synonymer og beslektede ord, deretter to utveier som knapper: «Vis alle kategorier» (primær) og «Alle begreper A–Å» (sekundær). Aldri en blindvei.

---

## Pedagogiske primitiver

Byggeklosser som kan brukes *inne* i en demonstrasjon. De standardiserer ikke demonstrasjonens indre layout — de sikrer at kontroller og avlesninger ser like ut og oppfører seg likt.

## 2.18 Slider

Native `input[type=range]`, `accent-color: accent`, `width:100%`, `height:30–32px` for treffflate. Alltid: `aria-label` som sier hva som endres, og `aria-valuetext` som oversetter tallet til mening («Signal-støy-forhold 1,3»). Endepunktetiketter i 11.5px sans under, venstre/høyre («rolig bakgrunn» / «mye støy»). Én slider styrer én parameter.

## 2.19 SegmentedChoice / chips

Radikalt enkle: pill, 1.5px ramme, `min-height:44px`, `aria-pressed`. Valgt tilstand markeres med **både** fyllfarge og et tegn (`✓`/`+` for av/på-chips, fyll for enkeltvalg) — aldri farge alene. Enkeltvalg (matriks: vann/blod/jord) bruker `border-ink`-fyll; av/på-bidrag (usikkerhetsbudsjett) bruker `accent`-fyll. Gruppen har `role="group"` med `aria-label`.

## 2.20 StepIndicator

`<ol>` uten punkter, `flex-wrap`, gap 8px, hvert steg `flex:1 1 140px`. Hvert steg er en knapp med «STEG n» i kicker over navnet, radius 8px, `min-height:56px`, `aria-current="step"` på aktivt steg. Aktivt steg: `accent`-fyll, hvit tekst. I tillegg «Forrige steg»/«Neste steg» som knapper, og stegnummer i figcaption-teksten.

Stegene skal kunne velges direkte, ikke bare framover.

## 2.21 Verdict / feedback line

Én linje som oversetter demonstrasjonens tilstand til mening. 17px serif, `min-height` reservert for 2–4 linjer slik at layouten ikke hopper, `aria-live="polite"`.

Betydningen ligger i ordene; farge er forsterkning. Når tilstanden er faglig kritisk, prefikses teksten («Under grensa: du kan ikke lenger si sikkert at det er noe der») i tillegg til at fargen skifter til `warning`.

## 2.22 FormulaBlock

Formelen settes i Newsreader, `clamp(26px, 5.5vw, 38px)`, sentrert, med brøkstrek og rottegn bygget av 1.5px `border-ink` og flex — ikke som bilde. Under følger en `<dl>` i `repeat(auto-fit, minmax(min(100%, 13rem), 1fr))` der hvert ledd i formelen forklares med symbolet som `<dt>` (21px serif) og forklaringen som `<dd>` (16.5px serif).

Produksjon bør vurdere MathML eller KaTeX for komplekse uttrykk; uansett skal hvert ledd ha en forklaring i tekst, og formelen skal ha et lesbart tekstalternativ.

## 2.23 ComparisonLayout

`repeat(auto-fit, minmax(min(100%, 11rem), 1fr))`, gap 18px. Hver kolonne: figur (SVG, maks 150px), navn i 13px sans/600, kort forklaring i 16.5px serif. Under kan følge en rad med «Måles ved» / «Uttrykkes som» i to spalter for å gjøre sammenligningen eksplisitt.

Brukes for 2–4 nærliggende begreper eller tilstander. Kolonnene skal være parallelle i oppbygning — samme figurtype, samme setningslengde.

## 2.24 Chart container

`surface-muted` flate, 1px `border`, radius-sm. SVG med `viewBox` og `width:100%` — aldri fast pixelbredde. Akser i 1px `text-primary`, aksetekster 12–14px sans `text-secondary`, hjelpelinjer dashed `border-strong`. Dataserie 1 `accent`, serie 2 `warning`, tilpasset linje dashed.

For dra-interaksjon: `touch-action:none`, treffområde minst 14px radius, og **alltid** en slider eller tilsvarende tastaturbetjent kontroll som gjør det samme.

---

# 3. Demonstrasjonsprinsipper

**Hovedregel: velg demonstrasjonen ut fra hva brukeren må forstå intuitivt. Aldri velg en UI-komponent først og press fagstoffet inn i den.**

Spør, i denne rekkefølgen:

1. Hva er misforståelsen? Hva tror folk feilaktig om dette begrepet?
2. Hvilken *erfaring* fjerner misforståelsen? Å se to tilstander ved siden av hverandre? Å skru på en parameter til noe brekker? Å følge en prosess i riktig rekkefølge?
3. Først da: hvilken form gir den erfaringen med minst mulig mekanikk?

Formen skal alltid tape mot innsikten. En slider som ikke endrer betydning, er pynt.

| Form | Velg når | Eksempel i prototypen |
| --- | --- | --- |
| **Statisk illustrasjon** | begrepet er en kategori eller en struktur, ikke en variabel. Ingenting å skru på | Blindprøve: tre typer, hva hver fanger opp |
| **Før/etter** | poenget er at noe *forblir* uendret, eller at én handling har en overraskende konsekvens | Internstandard: søl bort 30 % — forholdet står stille |
| **Sammenligning** | begrepet forveksles med nærliggende begreper, og skillet *er* innholdet | Riktighet, presisjon og nøyaktighet: tre skiver |
| **Slider** | én parameter styrer alt, og det finnes en terskel der konklusjonen snur | Deteksjonsgrense: støy opp til S/N < 3 |
| **Manipulerbar graf** | brukeren må selv ødelegge noe for å se konsekvensen, og forholdet mellom to grafer er poenget | Linearitet: dra punktet, se residualene bue |
| **Stegvis prosess** | rekkefølgen er selve innholdet, og hvert steg forutsetter det forrige | Standardaddisjon: fire steg til ekstrapolasjonen |
| **Formel med forklaring** | uttrykket *er* begrepet, og hvert ledd har en grunn til å være der | Standardavvik: fire ledd forklart |
| **Simulering** | flere parametere virker sammen, og poenget er samspillet, ikke én sammenheng | Ikke brukt ennå. Vurder for f.eks. gradienteluering |

Grenser som gjelder alle former:
- Maks **én** primær interaksjon per demonstrasjon. Trengs to, er begrepet sannsynligvis to begreper.
- Alle tilstander skal ha en meningsfull `Verdict`-tekst — også utgangstilstanden.
- Demonstrasjonen skal kunne forstås uten at man har lest dybdeforklaringen.
- Finnes ingen god demonstrasjon, er statisk illustrasjon riktig svar. Ingen demonstrasjon er ikke et alternativ på en publisert side.

---

# 4. Responsive regler

Beskrevet som oppførsel, ikke som breakpoints.

**Ca. 320px (minste støttede bredde)**
- Sidepadding 16px. Lesespalten er full bredde minus padding; `clamp()` gir 28px h1, 18px definisjon, 17px brødtekst.
- Header: ordmerke på én linje, søkefeltet wrapper til egen linje under, full bredde.
- Kategorigrid: én spalte. Hver `CategoryBlock` viser fortsatt 5 begreper + «alle»-lenke.
- A–Å: bokstavbaren wrapper til 3 rader à ~10 bokstaver, hver bokstav beholder 34×40px treffflate. Begrepslisten er én spalte.
- Demonstrasjoner: alle indre kolonner stables. Grafer beholder sitt `viewBox`-forhold og krymper i bredde; readout og kontroller havner under grafen. Minste indre kolonnebredde er satt til 180–210px, så ingenting tvinger horisontal scroll.
- Formelen skalerer ned til 26px; forklaringslisten blir én spalte.
- Popover: bottom sheet i full bredde minus 24px, fast 12px fra bunnen.
- Forrige/neste: stables i to rader, begge venstrestilt i praksis (høyrestilling beholdes, men kolonnen er full bredde).
- Lange begrepsnavn brytes med `overflow-wrap:break-word`. Aldri ellipse, aldri horisontal scroll.

**Vanlig mobil (360–430px)**
Som over, men sidepadding vokser mot 17px (4vw) og typografien et hakk opp. Chips står 2 per rad.

**Nettbrett (600–900px)**
- Popover går fra bottom sheet til ankret kort ved ~620px.
- Demonstrasjoner med graf + avlesning står side om side fra ~700px.
- Kategorigrid 2 spalter.
- Lesespalten når sin maksbredde 38rem rundt 700px og slutter å vokse.

**Laptop (900–1400px)**
- Kategorigrid 3 spalter (forsiden bruker hele 78rem).
- Brede demonstrasjoner begynner å strekke seg utenfor lesespalten rundt 1100px, sentrert om samme akse.
- A–Å viser 3 spalter per bokstavseksjon.

**Stor desktop (>1400px)**
- Ingenting vokser mer enn sin maksbredde. Lesespalten blir stående på 38rem, forsiden på 78rem, bred demonstrasjon på 64–70rem. Sidene sentreres; det blir mye luft, og det er meningen.
- Sidepadding stopper på 40px.

Generelt: alle beholdere som inneholder tekst eller flexbarn har `min-width:0`, og alle grid-spor er `minmax(0, ...)`. Det er det som hindrer overflow ved lange ord og brede SVG-er.

---

# 5. Tilgjengelighet

Etablerte regler som skal videreføres:

- **Full tastaturbruk.** Hele hovedreisen skal kunne gjennomføres uten mus: forside → søk → resultat → begrepsside → demonstrasjon → åpne/lukke dybde → begrepsforhåndsvisning → neste begrep. Skip-lenke «Hopp til innhold» først i DOM, synlig ved fokus.
- **`:focus-visible`** på alt interaktivt: 2.5px `accent`, 2px offset. Aldri `outline:none` uten erstatning.
- **Touch targets** minimum 44×44px. Sliders 30–32px høye. Bokstaver i A–Å 34×40px (akseptabelt fordi de står i et tett rutenett med egne mellomrom).
- **ARIA-semantikk:** `role="combobox"` + `aria-expanded` på søk med dropdown, `role="listbox"` på resultatlisten, `aria-expanded` på disclosure, `aria-pressed` på chips, `aria-current="step"` i stegindikator, `role="group"` + `aria-label` på demonstrasjonsramme og kontrollgrupper, `role="dialog"` + tilgjengelig navn på popover, `aria-haspopup="dialog"` på begrepslenker.
- **`aria-live="polite"`** på alt som endrer *betydning* uten at fokus flyttes: verdict-linjer, søketeller. Ikke på rene tallavlesninger som endres kontinuerlig under dragging.
- **Aldri farge alene.** Verdict-tekst sier hva som skjer; chips har tegn i tillegg til fyll; dataserier skiller seg på strektype (heltrukken/stiplet) i tillegg til farge; bokstaver uten treff i A–Å er ikke-interaktive i tillegg til å være lysere.
- **Interaktive visualiseringer trenger alternativ input.** Alt som kan dras skal også kunne styres med en slider eller knapper. Dette er en hard regel, ikke en anbefaling.
- **Grafikk:** dekorativ SVG `aria-hidden="true"`, med betydningen tilgjengelig som tekst ved siden av. Ingen informasjon bare i SVG-tekst.
- **Reduced motion:** systemet har ingen animasjoner i dag. Innføres de senere (overganger i demonstrasjoner, popover-inntoning), skal de respektere `prefers-reduced-motion: reduce` og reduseres til umiddelbar tilstandsendring.
- **Språk:** `lang="nb"`. Viktig for skjermleseruttale og orddeling.

---

# 6. Implementasjonsspesifikasjon

## 6.1 Låste produkt- og designbeslutninger

Implementasjonen skal følge disse uten å revurdere dem:

1. Sidestrukturen på begrepssiden: kategori/posisjon → tittel → definisjon → enkel forklaring → demonstrasjon → dybde (lukket) → forrige/neste.
2. Lesespalte 38rem. Demonstrasjonen kan velge tekstbredde eller full bredde via grid-linjene, uten at teksten flytter seg.
3. Demonstrasjonen har konsistent ytre ramme med typeetikett og handlingsanvisning, og fri indre layout.
4. Én dybde-disclosure per side, lukket som standard, uten nested accordions.
5. Forsiden: søk, kategorier i redaksjonell rekkefølge, maks 5 begreper per kategori, vei til kategoriside og til A–Å. Ikke skjult «skriv hvor som helst»-søk.
6. Global, sirkulær forrige/neste-rekkefølge som krysser kategorigrenser og annonserer kategoribyttet.
7. Begrepslenker med forhåndsvisning på hover og fokus, trykk-for-forhåndsvisning på touch, uten layout shift, med eksplisitt vei til begrepssiden.
8. Definisjonen finnes én gang i datamodellen og gjenbrukes overalt.
9. Ingen offentlig «ufullstendig begrep»-tilstand.
10. Alle tokens i kapittel 1. Ingen nye farger, skrifter, radier eller skygger uten at systemet oppdateres bevisst.
11. Søkerangeringen og treffårsak-merkingen i 2.3.
12. Tilgjengelighetsreglene i kapittel 5, særlig tastaturekvivalent for direkte manipulasjon.

## 6.2 Tekniske problemer Claude Code skal løse selv

Velg egne løsninger; prototypen har ingen mening om dem:

- **Ekte URL-routing og browser history** for `/`, `/begrep/<slug>`, `/kategori/<slug>`, `/a-aa`, med søketilstand i query. Tilbake/fram, reload, dyplenking og deling skal fungere. Vurder også `prefers-reduced-data`-vennlig lasting og server-rendering for lenkbarhet og SEO.
- **Robust tilgjengelig popover.** Prototypens håndkodede Tab-avskjæring er et stillas. Bruk plattformens popover-/anchor-API, eller et vedlikeholdt bibliotek, og få fokushåndtering, plassering, kollisjonsdeteksjon og bottom-sheet-varianten derfra. Kravene står i 2.13.
- **Datadrevet begrepsmodell uten duplisering.** Ett begrep = én post (slug, tittel, kategori, definisjon, forklaring, demonstrasjonsreferanse, dybde, aliaser, relaterte begreper). Definisjon og tittel skal aldri finnes i mer enn én kilde. Begrepslenker i teksten refererer til slug, ikke til kopiert tekst; vurder MDX eller strukturert innhold med en lenkekomponent.
- **Synonym- og aliasmodell for søk med norske bøyninger.** Prototypen har en flat nøkkelordstreng per begrep — det holder ikke. Trengs: eksplisitte aliaser, håndtering av bøyninger og bestemt form («måleusikkerheten», «kurver», «matrikser»), prefikssøk, æ/ø/å-normalisering, og gjerne en liten stemmer eller et søkebibliotek med norsk støtte. Treffårsak-merkingen i UI-et forutsetter at søket vet *hvorfor* noe traff.
- **Tastaturekvivalent for direkte manipulasjon.** Enten som i prototypen (slider ved siden av dra-punktet) eller som fokuserbare grafpunkter med piltaster. Kravet er hardt; formen er fri.
- **Faktisk testing ved ~320px.** Prototypen er utviklet og verifisert i et bredere vindu; 320px-oppførselen er resonnert fram og delvis simulert, ikke målt på enhet. Verifiser hele reisen på en reell 320px-bredde.
- **Automatiserte tilgjengelighets- og responsive tester** der det gir verdi: aksetester i CI, tastaturreiser som e2e-tester, visuelle regresjonstester på 320 / 768 / 1280 / 1600px.
- **Innholdsproduksjon og redaksjonsverktøy**: hvordan forfattere skriver begreper, hvordan demonstrasjoner registreres og knyttes til begrep, hvordan et begrep publiseres først når siden er komplett.

## 6.3 Prototypeinnhold som ikke er faglig fasit

- Alle definisjoner, forklaringer og dybdetekster er skrevet som **eksempelinnhold** for å teste lesbarhet, tekstmengde og hierarki. De skal fagfellevurderes eller skrives om av fagperson før publisering.
- Tallene i demonstrasjonene (RSD-verdier, S/N-terskler, 62 %/118 % matrikseffekt, usikkerhetsbidrag på 2,5/3,2/1,8/0,9 %, R²-verdier, R = 1,5-kravet) er plausible, men valgt for å gi tydelige pedagogiske utfall.
- Begrepsutvalget — 105 begreper i 10 kategorier — er laget for å stressteste arkitekturen ved realistisk skala. Kategorinavn, kategorirekkefølge og plassering av enkeltbegreper er redaksjonelle beslutninger som ikke er kvalitetssikret faglig.
- 11 begreper har komplett innhold; de øvrige 94 finnes bare som tittel + definisjon i datalaget.
- SVG-figurene er skisser. Endelige illustrasjoner bør lages av illustratør eller fagperson.

## 6.4 Filer

| Fil | Innhold |
| --- | --- |
| `Lableksion.dc.html` | Referanseprototypen. 105 begreper, 11 komplette begrepssider, 6 interaktive og 5 statiske/strukturelle demonstrasjoner, søk, kategorisider, A–Å, begrepslenker med popover. Åpnes direkte i nettleser. |
| `Lableksion konsepter.dc.html` | De tre opprinnelige konseptene som lesespalten ble valgt fra. Historikk — viser hvilke alternativer som ble forkastet og hvorfor. |
| `README.md` | Dette dokumentet. Normativ for design og låste beslutninger. |

De to HTML-filene er selvstendige designreferanser. De bruker et lite runtime for streaming-rendring (`support.js`) som ikke skal reimplementeres — logikken som betyr noe er beskrevet i dette dokumentet.
