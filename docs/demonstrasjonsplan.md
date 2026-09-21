# Plan for mer pedagogiske demonstrasjoner

Dette dokumentet er en redaksjonell og pedagogisk gjennomgang av alle publiserte begreper per 20. september 2026. Det beskriver **ideer**, ikke ferdige spesifikasjoner. Nye demonstrasjoner skal ikke implementeres som del av denne gjennomgangen.

## Mål

Demonstrasjonen skal helst la brukeren **se mekanismen**, ikke bare lese et nytt eksempel på det samme som står i forklaringen.

Prioriter i denne rekkefølgen:

1. **Interaktiv visualisering** når én meningsfull parameter kan varieres og konsekvensen kan sees umiddelbart.
2. **Statisk faglig visualisering** når interaksjon ikke tilfører nok.
3. **Tekstlig/prosessuell demonstrasjon** bare når selve begrepet er organisatorisk, normativt eller vanskelig å visualisere uten å konstruere en misvisende analogi.

Eksisterende sterke mønstre er særlig **Presisjon**, **Linearitet**, **Måleusikkerhet**, **Deteksjonsgrense**, **Internstandard**, **Standardaddisjon**, **Matriseeffekt** og **Oppløsning**. De bør brukes som pedagogiske referanser: én tydelig idé, høyst én primær interaksjon og umiddelbar visuell respons.

Prioritet i tabellene:

- **P0**: stor pedagogisk gevinst; bør tidlig erstattes eller bygges om.
- **P1**: tydelig gevinst, men mindre kritisk.
- **P2**: dagens demo er allerede god, eller begrepet egner seg dårlig for mer interaktivitet.

## Felles krav til matematikk

Alle matematiske uttrykk skal skrives som TeX og rendres med **MathJax**.

- Inline: `\\(...\\)`
- Egen linje: `\\[...\\]`
- Unngå håndskrevne Unicode-formler som `x̄`, `μ ± 2σ`, `m/Δm`, `1/x²` og lignende når de fungerer som matematiske uttrykk.
- Enheter inne i uttrykk skrives semantisk, for eksempel `\\(10\\,\\mathrm{mg/L}\\)`.
- Samme regel gjelder forklaringstekst, dybdetekst, avlesninger, akselabeler, formler og verdict-tekst i demonstrasjoner.

---

## Kvalitet i måling

| Begrep | Prioritet | Forslag |
|---|---|---|
| Presisjon | P2 | Behold dagens interaktive spredningsdemo. Den er et godt mønster for resten. |
| Repeterbarhet | P0 | ✅ **Implementert i PR #15.** Vis seks–åtte målepunkter som punktsky/strip-plot rundt et nivå. Slider for tilfeldig variasjon; RSD/SD oppdateres samtidig. Brukeren ser direkte hva «tett serie» betyr. |
| Intermediær presisjon | P0 | ✅ **Implementert i PR #15.** Tre grupper for dag/operatør. Én kontroll for mellom-serie-variasjon som flytter gruppesentra uten å endre innen-serie-spredningen. Gjør skillet mot repeterbarhet visuelt. |
| Reproduserbarhet | P0 | ✅ **Implementert i PR #15.** Samme idé på laboratorienivå: tre laboratorier med egne klynger. Slider for mellom-laboratorievariasjon. |
| Skjevhet | P0 | ✅ **Implementert i PR #15.** Målepunkter mot en referanselinje/målskive. Slider flytter hele klyngen sideveis uten å endre spredningen; avlest skjevhet oppdateres. |
| Gjenvinning | P0 | ✅ **Implementert i PR #17.** Tre søyler/beholdere viser før spike, tilsatt mengde og målt etter; slider endrer gjenfunnet andel og MathJax-beregningen følger. |
| Måleusikkerhet | P2 | Behold dagens byggbare usikkerhetsbudsjett. Kan senere suppleres med en synlig usikkerhetsstolpe på sluttresultatet. |
| Utvidet måleusikkerhet | P0 | ✅ **Implementert i PR #17.** Intervall rundt måleresultatet utvider og trekker seg sammen med dekningsfaktoren; `U = k u_c` og endepunktene oppdateres. |
| Dekningsfaktor | P0 | ✅ **Implementert i PR #17.** Standard normalfordeling med dynamisk dekningsareal viser hvordan større `k` gir større illustrert dekning. |
| Selektivitet | P0 | ✅ **Implementert i PR #17.** Overlappende analytt- og interferentsignal; slider for interferentstyrke viser bidraget ved analyttposisjonen og påvirkning på tilsynelatende signal. |
| Spesifisitet | P2 | Begrepet er i stor grad terminologisk. Behold en ryddig sammenligning, eventuelt med et lite spekter fra lav til høy selektivitet i stedet for mer interaksjon. |
| Følsomhet | P0 | ✅ **Implementert i PR #17.** Interaktiv kalibreringslinje med fast `Δx`; slider endrer stigningstall og synlig `Δy`. |
| Robusthet | P0 | ✅ **Implementert i PR #17.** pH-slider flytter et punkt langs ytelseskurven rundt nominell innstilling med synlig forhåndsdefinert akseptområde. |
| Sporbarhet | P1 | Behold kjeden, men visualiser hvert kalibreringsledd som noder med tilhørende usikkerhet. Klikk/valg av ledd viser hvordan kjeden knytter resultatet til referansen. Ikke lat som sporbarhet er «nærhet til sann verdi». |
| Validering | P2 | Prosessbegrep. En visuell «krav → studie → evidens → konklusjon»-flyt er tilstrekkelig; interaksjon gir lite uten å gjøre demoen til et skjema. |
| Verifisering | P2 | Prosessbegrep. Vis spesifiserte krav på venstre side og lokale resultater på høyre, med tydelig oppfylt/ikke oppfylt. Ingen sterk grunn til slider. |
| Kontrollkort | P0 | ✅ **Implementert i PR #17.** Ekte kontrollkort med punkter over tid; slider påfører nivåskift fra måling 6 mens kontrollgrensene forblir faste. |
| Nøyaktighet | P2 | Behold målskivevisualiseringen som skiller presisjon og riktighet/skjevhet. Den er visuelt sterk selv uten interaksjon. |

## Kalibrering og kontroll

| Begrep | Prioritet | Forslag |
|---|---|---|
| Kalibreringskurve | P0 | ✅ **Implementert i PR #20.** Ukjent respons styres med slider og projiseres via kalibreringslinjen til estimert analyttnivå; modell og estimat oppdateres med MathJax. |
| Linearitet | P2 | Behold dagens interaktive kurve der øvre punkt kan bøyes av. Dette er referanseeksemplet. |
| Arbeidsområde | P0 | ✅ **Implementert i PR #20.** Nivåmarkør flyttes gjennom LLOQ–ULOQ mens illustrert presisjon/skjevhet og verdict viser når metodekravene er oppfylt. |
| Deteksjonsgrense | P2 | Behold dagens støyinteraksjon. |
| Kvantifiseringsgrense | P0 | ✅ **Implementert i PR #20.** Replikaer samler seg rundt målverdien når nivået øker; illustrert CV sammenlignes eksplisitt med et definert LOQ-krav. |
| Responsfaktor | P0 | ✅ **Implementert i PR #20.** To responslinjer viser ulike stigningstall; samme analyttmengde gir ulike signaler mens responsfaktorene og forholdet oppdateres. |
| Vektet regresjon | P0 | ✅ **Implementert i PR #20.** Samme heteroskedastiske datasett kan tilpasses uvektet, med `1/x` eller `1/x^2`; linje og residualer endres synlig. |
| Nullpunkt / konstantledd | P0 | ✅ **Implementert i PR #20.** Slider flytter konstantleddet med fast stigningstall; fri modell sammenlignes direkte med en stiplet modell tvunget gjennom null. |
| Ettpunktskalibrering | P1 | Vis én kjent kalibrator og en antatt modellform. Toggle «modellform kjent»/«ukjent» illustrerer hva ett punkt kan og ikke kan fastsette. |
| Ekstern kalibrering | P1 | To parallelle spor: separat kalibratorserie og prøve. Vis at prøveresponsen projiseres på kurven; en matriseeffekt-toggle kan demonstrere sårbarheten. |
| Matrikstilpasset kalibrering | P0 | ✅ **Implementert i PR #20.** Slider endrer matriseeffekten; løsemiddel- og matrikstilpasset kurve viser hvordan samme prøverespons gir skjev eller korrigert tolkning. |
| Internstandard | P2 | Behold dagens før/etter-tap-demo der forholdet bevares bedre enn råsignal. |
| Standardaddisjon | P2 | Behold dagens stegvis/interaktive demo. |
| Blindprøve | P1 | Dagens tre blindprøvetyper er visuelt nyttige. Kan senere gjøres til en enkel prosesslinje der man velger hvor i arbeidsflyten «forurensningen» oppstår og ser hvilken blank som fanger den. |
| Drift | P0 | ✅ **Implementert i PR #20.** Tidsserie med fast tilfeldig småstøy og slider for systematisk drift viser kontrollpunkter som gradvis vandrer mot faste grenser. |
| Kontrollprøve | P1 | Vis prøveserie med innskutte kontrollpunkter på tidsakse. Én kontroll kan gå utenfor akseptgrensen og utløse verdict om serien. |

## Prøven og omgivelsene

| Begrep | Prioritet | Forslag |
|---|---|---|
| Matriseeffekt | P2 | Behold dagens matrisevelger og responskurver. |
| Ionesuppresjon | P0 | ✅ **Implementert i PR #21.** Samme analyttmengde vises som kromatografiske signaler i ren løsning og matriks; slider reduserer matriseresponsen og oppdaterer responsendringen med MathJax. |
| Ioneforsterkning | P0 | ✅ **Implementert i PR #21.** Deler grafikkmotor med suppressjon, men slideren øker matriseresponsen ved uendret analyttmengde. |
| Interferens | P0 | ✅ **Implementert i PR #21.** Interferentsignalet beveges inn mot analytten; separat analytt, interferent og observert sum viser hvordan overlapp gir systematisk overestimering. |
| Bakgrunnssignal | P0 | ✅ **Implementert i PR #21.** Signaltrace med uavhengige slidere for bakgrunnsnivå og tilfeldig støy gjør skillet mellom nivå og variasjon synlig. |
| Matriksblank | P1 | Sammenlign tre mini-signaler: løsemiddelblank, matriksblank og prøve. Vis en matriksrelatert topp som bare dukker opp i de to siste. |
| Kontaminering | P1 | Vis arbeidsflyt som rom/reagens/beholder/prøve/instrument. Valg av kontamineringskilde «farger» hvilke blanker/resultater som rammes. |
| Krysskontaminering | P0 | ✅ **Implementert i PR #21.** Sekvensen høy prøve → blank → neste prøve viser avtakende carry-over; slider oppdaterer blanksignal og ekstra bidrag i neste prøve. |
| Prøvelagring | P0 | ✅ **Implementert i PR #21.** Tre pedagogiske stabilitetskurver for temperatur kombineres med temperaturvalg og tidsslider; gjenværende analytt avleses med MathJax. |

## Statistikk og beregning

| Begrep | Prioritet | Forslag |
|---|---|---|
| Gjennomsnitt | P0 | ✅ **Implementert i PR #15.** «Balansepunkt» på tallinje. Dra ett datapunkt; gjennomsnittet flytter seg som tyngdepunkt. Dette viser mer enn et enkelt summeringsregnestykke. |
| Median | P0 | ✅ **Implementert i PR #15.** Fem punkter på tallinje. Dra ekstremverdien langt ut og se medianen stå stille mens gjennomsnittet flytter seg. |
| Varians | P0 | ✅ **Implementert i PR #15.** Punktdiagram med middelverdi og vertikale avstander. Dra ett punkt; vis avvik og kvadrerte bidrag som arealer/søyler. |
| Standardavvik | P1 | Dagens formelforklaring er ryddig, men kan senere få samme punktdiagram som varians og vise `s` direkte når ett punkt flyttes. |
| Normalfordeling | P0 | ✅ **Implementert i PR #19.** Klokkekurve med slider for standardavvik; arealene innen ett, to og tre standardavvik er markert direkte i figuren. |
| Frihetsgrader | P0 | ✅ **Implementert i PR #19.** Tre observasjoner med fast gjennomsnitt; to avvik styres fritt og det tredje følger automatisk slik at avvikssummen forblir null. |
| Konfidensintervall | P0 | ✅ **Implementert i PR #19.** Tjue intervaller vises mot én sann parameterlinje; utvalgsstørrelsen styrer bredden og ett intervall demonstrerer manglende dekning. |
| Signifikansnivå | P0 | ✅ **Implementert i PR #19.** Nullfordeling med markerte tosidige haler; slider for signifikansnivå flytter kritiske grenser og endrer forkastningsarealet. |
| t-test | P0 | ✅ **Implementert i PR #19.** To punktgrupper med konstant spredning; slider flytter gruppemiddel og oppdaterer Welch t-statistikk og tosidig p-verdi. |
| F-test | P0 | ✅ **Implementert i PR #19.** To punktsett med samme middelverdi; slider endrer spredningen i gruppe B og variansforholdet oppdateres. |
| Regresjon | P0 | ✅ **Implementert i PR #19.** Punktdiagram med OLS-linje; siste punkt kan flyttes og residualene vises som vertikale segmenter mens linje og forklaringsgrad oppdateres. |
| Minste kvadrater | P0 | ✅ **Implementert i PR #19.** Kandidatlinjens stigningstall styres med slider; residualer og SSE endres mot en stiplet OLS-løsning og synlig minimum. |
| Korrelasjon | P0 | ✅ **Implementert i PR #19.** Punktsky kan byttes mellom positiv lineær, U-formet og negativ lineær sammenheng; Pearsons r oppdateres og U-formen viser hvorfor r nær null ikke betyr «ingen sammenheng». |
| Uteligger | P0 | ✅ **Implementert i PR #15.** Dra ett punkt bort fra resten og vis samtidig middelverdi, median, SD og eventuelt regresjonslinje. Poenget er påvirkning, ikke automatisk sletting. |

## Separasjon

| Begrep | Prioritet | Forslag |
|---|---|---|
| Mobilfase | P1 | ✅ **Implementert i PR #23.** Animert transport gjennom kolonne med valg mellom LC, GC og SFC; faseformen endres mens transportrollen bevares.  der mobilfasen beveger analyttsoner gjennom systemet. Valg LC/GC/SFC endrer faseikon/etikett, ikke den grunnleggende mekanismen. |
| Stasjonærfase | P0 | ✅ **Implementert i PR #23.** To analyttsoner beveger seg gjennom en kolonne; slider for relativ interaksjon med stasjonærfasen endrer hastighet/retensjon. |
| Retensjonstid | P0 | ✅ **Implementert i PR #23.** Kromatogram med bevegelig topp. Marker injeksjon, `t_M`, `t_R` og justert retensjonstid direkte på tidsaksen. |
| Gradient | P0 | ✅ **Implementert i PR #23.** Øvre panel: mobilfasesammensetning mot tid. Nedre panel: kromatogram. Slider for gradientbratthet viser hvordan sent eluerende topper flyttes sammen. |
| Isokratisk | P1 | ✅ **Implementert i PR #23.** Samme todelte visualisering som gradient, men flat sammensetningslinje. Kan sammenlignes med gradient uten å bli en ren tekstrad. |
| Elueringsrekkefølge | P0 | ✅ **Implementert i PR #23.** Tre topper/analyttsoner. Én kontroll for selektivitet/stasjonærfase gjør at B og C kan bytte rekkefølge; viser at rekkefølgen er metodeavhengig. |
| Toppbredde | P0 | ✅ **Implementert i PR #23.** Én Gauss-lignende topp med slider for bredde. Vis både basisbredde og bredde ved halv høyde som målestreker. |
| Haledannelse | P0 | ✅ **Implementert i PR #23.** Slider fra symmetrisk til halende topp. Vis asymmetri/tailing-mål der faglig passende og hvordan nabotopp påvirkes. |
| Platetall | P0 | ✅ **Implementert i PR #23.** Hold `t_R` fast og endre toppbredde; kromatografisk topp blir smalere mens `N` øker. Dette bør være én av de mest direkte demoene. |
| Selektivitetsfaktor | P0 | ✅ **Implementert i PR #23.** To retinerte topper med fast `t_M`. Slider endrer `k_2/k_1`; toppenes relative plassering og `\alpha` oppdateres. |
| Oppløsning | P2 | Behold dagens interaktive toppseparasjon. |
| Dødvolum | P1 | ✅ **Implementert i PR #23.** Skjematisk væskebane med kolonne og ekstrakolonnevolum markert. Toggle mellom hold-up-volum og ekstrakolonnevolum viser hvorfor «dødvolum» er tvetydig. |
| Injeksjonsvolum | P0 | ✅ **Implementert i PR #23.** Slider for injeksjonsvolum. Prøveplugg og kromatografisk topp blir bredere/overlastet når volumet øker; signalmengde øker samtidig. |

## Deteksjon og måleprinsipp

| Begrep | Prioritet | Forslag |
|---|---|---|
| Signal/støy | P0 | Reell signaltrace med én analytttopp og tilfeldig støy. Slider for støynivå; beregnet S/N og synlig oppdagbarhet endres. |
| Massespektrometri | P1 | Vis instrumentkjeden som fysisk skisse: kilde → masseanalysator → detektor → spektrum. Hover/valg kan fremheve trinnet, men interaksjon er ikke nødvendig. |
| Ionisering | P1 | Vis nøytralt molekyl som går inn i kilde og ioner ut. Valg positiv/negativ modus bytter typiske ionformer. |
| Fragmentering | P0 | Forløperion → fragmenttre + produktspektrum. Slider for kollisjonsenergi kan gradvis endre hvilke produkt-ioner som dominerer. |
| SIM-modus | P0 | Massespektrum med mange topper. Toggle full scan/SIM gjør bare valgte `m/z` synlige/monitorerte og viser høyere dwell/tydeligere målretting konseptuelt. |
| MRM | P0 | To spektra/trinn: Q1 velger forløper, fragmentering, Q3 velger produkt. Ett valg av overgang fremheves gjennom hele kjeden. |
| Masseoppløsning | P0 | To nærliggende massetopper. Slider for peak width/resolving power avgjør om de ses som én eller to. Vis `m/\Delta m`. |
| LC-MS | P1 | Kromatogram øverst, massespektrum nederst. Valg av chromatografisk topp oppdaterer spekteret og illustrerer de to informasjonsdimensjonene. |
| GC-MS | P1 | Samme pedagogiske mønster som LC-MS, men med GC-kontekst og tydelig EI-lignende spektrum. |
| UV-detektor | P0 | Lysstråle gjennom celle. Slider for transmisjon eller konsentrasjon endrer lysintensitet og absorbans; `A=-\log_{10}T` oppdateres. |
| FID | P1 | Vis GC-eluat inn i flamme og strøm ut. En enkel kontroll for karbonmengde kan endre signalhøyden, men prosessvisualet er viktigere enn interaksjon. |
| Ledningsevne | P0 | Ionisk sone passerer gjennom målecelle og gir topp i signaltrace. Slider for bakgrunnsledningsevne viser hvorfor analyttsignal må ses mot eluentbakgrunn. |

## Prøvetaking og opparbeiding

| Begrep | Prioritet | Forslag |
|---|---|---|
| Representativ prøve | P0 | Heterogent rutenett/parti med ulike konsentrasjoner. Brukeren velger ett lokalt eller flere fordelte uttak; estimatet sammenlignes med sann middelverdi i hele partiet. |
| Delprøve | P1 | Vis fysisk reduksjon fra laboratorieprøve til testportion med animert deling. En «skjev deling» kan vise tap av representativitet. |
| Homogenisering | P0 | Partikler/fargefelt før og etter blanding. Slider for homogeniseringsgrad reduserer forskjellen mellom flere små uttak. |
| Ekstraksjon | P0 | To væskefaser/beholdere med analyttprikker. Slider for fordelingsforhold eller ekstraksjonstrinn flytter analytten mellom fasene; recovery vises. |
| Oppkonsentrering | P0 | Beholder med samme analyttmengde og synkende volum. Slider for sluttvolum øker konsentrasjonen visuelt og numerisk. |
| Fortynning | P0 | Motsatt av oppkonsentrering: samme analyttmengde, økende sluttvolum. Konsentrasjon og fargeintensitet faller. |
| Fortynningsfaktor | P1 | Koble fortynningsgrafikken til en enkel interaktiv aliquot/sluttvolum-kontroll. Vis faktor og tilbakeberegnet originalkonsentrasjon med MathJax. |
| Filtrering | P1 | Partikler og oppløst analytt gjennom filtermembran. Toggle «analytt oppløst»/«partikkelbundet» viser hvorfor filtrering kan endre målestørrelsen. |
| Oppslutning | P1 | Vis kompleks fast matriks som gradvis brytes ned til måleløsning. Interaksjon er valgfri; en sekvensillustrasjon kan være nok. |
| Prøvemengde | P0 | Heterogent partikkelsett. Slider for prøvemasse trekker flere/færre partikler og viser hvordan sampling variance typisk faller når flere partikler inngår. |

## Kvalitetssikring

| Begrep | Prioritet | Forslag |
|---|---|---|
| Akkreditering | P1 | Vis laboratoriets aktiviteter som et «kart» der bare noen felt ligger innenfor akkrediteringsomfanget. Det gjør omfangsbegrepet mer konkret enn en prosessliste. |
| Ringtest / kompetanseprøving | P0 | Punktplot med resultater fra mange laboratorier rundt assigned value. Marker eget laboratorium; valg/slider for eget resultat viser z-score/avvik og hvor det ligger i gruppen. |
| Sertifisert referansemateriale | P1 | Tegn et sertifikat med callouts til sertifisert verdi, usikkerhet, sporbarhet og gyldighetsbetingelser. Dette er bedre som visuell dokumentanatomi enn som tabell. |
| Standardmetode | P2 | Prosessbegrep. En tydelig «publisert metode → lokal verifisering → autorisert bruk»-flyt er tilstrekkelig. |
| Avviksbehandling | P2 | Prosessbegrep. Dagens flyt kan forbedres visuelt med tydelig skille mellom korreksjon og korrigerende tiltak, men trenger ikke interaksjon. |
| Intern kvalitetskontroll | P0 | Samle kontrollmateriale, blank og duplikat i en liten prøveserie; vis hvordan de avdekker ulike feil. Kontrollkortet kan reagere på valgt feilkilde. |
| Revisjonsspor | P1 | Vis en tidslinje for én verdi med versjoner, hvem, når og begrunnelse. Klikk på et trinn kan vise før/etter uten å gjøre dette til en ren tekstliste. |

## Enheter og referansemateriale

| Begrep | Prioritet | Forslag |
|---|---|---|
| SI-enheter | P1 | Vis baseenhetene som byggesteiner som kombineres til én avledet enhet. Eksempelvis kan Pa bygges visuelt fra `kg\,m^{-1}\,s^{-2}`. |
| Molmasse | P0 | Tre koblede størrelser `m`, `n` og `M`. Slider for stoffmengde eller masse oppdaterer den tredje og en enkel «mengde stoff ↔ masse»-visualisering. |
| Molaritet / stoffmengdekonsentrasjon | P0 | Beholder med volum og stoffmengde. Slider for sluttvolum eller stoffmengde endrer konsentrasjonen visuelt og i `c=n/V`. |
| Masseprosent | P0 | To komponenter i en blanding som stablet søyle. Slider for analyttmasse eller løsemiddelmasse viser at nevneren er total masse. |
| ppm | P1 | Bruk en skala som zoomer fra 1 av 100 til 1 av 10 000 til 1 av 1 000 000, og koble dette til `10^{-6}`. Unngå å tegne en million prikker. |

## Feilkilder

| Begrep | Prioritet | Forslag |
|---|---|---|
| Grov feil | P1 | Vis samme datasett med ett ekstremt punkt. Toggle mellom «ukjent årsak» og «dokumentert forbytting/feilregistrering» viser hvorfor et avvikende punkt først blir grov feil når hendelsen faktisk er identifisert. |

---

## Foreslått implementeringsrekkefølge senere

Når demoene faktisk skal bygges, bør de tas som noen få sammenhengende familier i stedet for 105 enkeltstående småoppgaver:

1. **Statistikk + kvalitet i måling**: punktskyer, fordelinger, intervaller og kontrollkort kan dele mye visualiseringslogikk.
2. **Kalibrering + prøvematriks**: kurver, residualer, arbeidsområde, respons og matriseeffekt.
3. **Separasjon + deteksjon**: kromatogrammer, topper, spektra og instrumentflyt.
4. **Prøvetaking/opparbeiding + enheter**: beholdere, partikler, volum og mengdeforhold.
5. **Kvalitetssikring og øvrige prosessbegreper**: hovedsakelig statiske, men tydeligere visuelle forklaringer.

Målet bør ikke være «interaktivitet overalt». Målet er at brukeren, der det er faglig mulig, kan endre én relevant årsak og **se virkningen** uten å måtte lese seg til den.
