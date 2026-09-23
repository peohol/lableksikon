# Plan for mer pedagogiske demonstrasjoner

Dette dokumentet startet som en redaksjonell og pedagogisk gjennomgang av alle publiserte begreper per 20. september 2026 og brukes nå også til å spore implementeringen. Rader merket **Implementert** er bygget i den angitte PR-en; rader merket **Beholdt** er vurdert på nytt og beholdes fordi dagens løsning allerede er visuelt sterk eller fordi mer interaksjon ville gitt liten faglig gevinst.

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
| Presisjon | P2 | ✅ **Beholdt.** Dagens interaktive spredningsdemo er visuelt sterk og fungerer som mønster for resten. |
| Repeterbarhet | P0 | ✅ **Implementert i PR #15.** Vis seks–åtte målepunkter som punktsky/strip-plot rundt et nivå. Slider for tilfeldig variasjon; RSD/SD oppdateres samtidig. Brukeren ser direkte hva «tett serie» betyr. |
| Intermediær presisjon | P0 | ✅ **Implementert i PR #15.** Tre grupper for dag/operatør. Én kontroll for mellom-serie-variasjon som flytter gruppesentra uten å endre innen-serie-spredningen. Gjør skillet mot repeterbarhet visuelt. |
| Reproduserbarhet | P0 | ✅ **Implementert i PR #15.** Samme idé på laboratorienivå: tre laboratorier med egne klynger. Slider for mellom-laboratorievariasjon. |
| Skjevhet | P0 | ✅ **Implementert i PR #15.** Målepunkter mot en referanselinje/målskive. Slider flytter hele klyngen sideveis uten å endre spredningen; avlest skjevhet oppdateres. |
| Gjenvinning | P0 | ✅ **Implementert i PR #17.** Tre søyler/beholdere viser før spike, tilsatt mengde og målt etter; slider endrer gjenfunnet andel og MathJax-beregningen følger. |
| Måleusikkerhet | P2 | ✅ **Beholdt.** Det byggbare usikkerhetsbudsjettet er allerede interaktivt og visuelt; ytterligere mekanikk er ikke nødvendig i denne runden. |
| Utvidet måleusikkerhet | P0 | ✅ **Implementert i PR #17.** Intervall rundt måleresultatet utvider og trekker seg sammen med dekningsfaktoren; `U = k u_c` og endepunktene oppdateres. |
| Dekningsfaktor | P0 | ✅ **Implementert i PR #17.** Standard normalfordeling med dynamisk dekningsareal viser hvordan større `k` gir større illustrert dekning. |
| Selektivitet | P0 | ✅ **Implementert i PR #17.** Overlappende analytt- og interferentsignal; slider for interferentstyrke viser bidraget ved analyttposisjonen og påvirkning på tilsynelatende signal. |
| Spesifisitet | P2 | ✅ **Beholdt som terminologisk sammenligning.** Begrepet brukes ulikt mellom fagområder; en tvungen grafisk skala ville lett antyde en entydig definisjon som ikke finnes. |
| Følsomhet | P0 | ✅ **Implementert i PR #17.** Interaktiv kalibreringslinje med fast `Δx`; slider endrer stigningstall og synlig `Δy`. |
| Robusthet | P0 | ✅ **Implementert i PR #17.** pH-slider flytter et punkt langs ytelseskurven rundt nominell innstilling med synlig forhåndsdefinert akseptområde. |
| Sporbarhet | P1 | ✅ **Implementert i PR #29.** Interaktiv kjede viser prøveresultat, arbeidsstandard, referansestandard og definert referanse som egne noder med usikkerhetsledd og forklaring av valgt ledd. |
| Validering | P2 | ✅ **Implementert i PR #29.** Grafisk flyt viser tiltenkt bruk → ytelseskrav → evidens → konklusjon uten å gjøre prosessbegrepet kunstig interaktivt. |
| Verifisering | P2 | ✅ **Implementert i PR #29.** Strukturert grafisk sammenligning kobler spesifiserte krav til lokale resultater og viser tydelig oppfylt/ikke oppfylt. |
| Kontrollkort | P0 | ✅ **Implementert i PR #17.** Ekte kontrollkort med punkter over tid; slider påfører nivåskift fra måling 6 mens kontrollgrensene forblir faste. |
| Nøyaktighet | P2 | ✅ **Beholdt.** Målskivevisualiseringen skiller presisjon og riktighet/skjevhet tydelig og trenger ikke mer interaksjon. |

## Kalibrering og kontroll

| Begrep | Prioritet | Forslag |
|---|---|---|
| Kalibreringskurve | P0 | ✅ **Implementert i PR #20.** Ukjent respons styres med slider og projiseres via kalibreringslinjen til estimert analyttnivå; modell og estimat oppdateres med MathJax. |
| Linearitet | P2 | ✅ **Beholdt.** Dagens interaktive kurve der øvre punkt kan bøyes av er allerede et referanseeksempel. |
| Arbeidsområde | P0 | ✅ **Implementert i PR #20.** Nivåmarkør flyttes gjennom LLOQ–ULOQ mens illustrert presisjon/skjevhet og verdict viser når metodekravene er oppfylt. |
| Deteksjonsgrense | P2 | ✅ **Beholdt.** Dagens støyinteraksjon viser mekanismen direkte. |
| Kvantifiseringsgrense | P0 | ✅ **Implementert i PR #20.** Replikaer samler seg rundt målverdien når nivået øker; illustrert CV sammenlignes eksplisitt med et definert LOQ-krav. |
| Responsfaktor | P0 | ✅ **Implementert i PR #20.** To responslinjer viser ulike stigningstall; samme analyttmengde gir ulike signaler mens responsfaktorene og forholdet oppdateres. |
| Vektet regresjon | P0 | ✅ **Implementert i PR #20.** Samme heteroskedastiske datasett kan tilpasses uvektet, med `1/x` eller `1/x^2`; linje og residualer endres synlig. |
| Nullpunkt / konstantledd | P0 | ✅ **Implementert i PR #20.** Slider flytter konstantleddet med fast stigningstall; fri modell sammenlignes direkte med en stiplet modell tvunget gjennom null. |
| Ettpunktskalibrering | P1 | ✅ **Implementert i PR #29.** Toggle mellom dokumentert modellform og ikke fastlagt modell viser én entydig proporsjonal modell versus flere mulige linjer gjennom samme kalibratorpunkt. |
| Ekstern kalibrering | P1 | ✅ **Implementert i PR #29.** Separat kalibratorserie og prøve vises i samme plot; slider endrer prøvens relative respons og viser projisert estimat og skjevhet. |
| Matrikstilpasset kalibrering | P0 | ✅ **Implementert i PR #20.** Slider endrer matriseeffekten; løsemiddel- og matrikstilpasset kurve viser hvordan samme prøverespons gir skjev eller korrigert tolkning. |
| Internstandard | P2 | ✅ **Beholdt.** Før/etter-tap-demoen viser visuelt hvorfor forholdet kan være mer robust enn råsignal. |
| Standardaddisjon | P2 | ✅ **Beholdt.** Dagens stegvis/interaktive demo er allerede visuell og pedagogisk. |
| Blindprøve | P1 | ✅ **Beholdt.** De tre eksisterende blindprøveillustrasjonene er visuelt nyttige; kontamineringsdemoen i PR #29 dekker i tillegg interaktiv lokalisering av kilde via blankmønster. |
| Drift | P0 | ✅ **Implementert i PR #20.** Tidsserie med fast tilfeldig småstøy og slider for systematisk drift viser kontrollpunkter som gradvis vandrer mot faste grenser. |
| Kontrollprøve | P1 | ✅ **Implementert i PR #29.** Egne kontrollpunkter er innskutt i analyseserien; slider flytter siste kontroll utenfor faste illustrative grenser og oppdaterer vurderingen. |

## Prøven og omgivelsene

| Begrep | Prioritet | Forslag |
|---|---|---|
| Matriseeffekt | P2 | ✅ **Beholdt.** Dagens matrisevelger og responskurver er allerede interaktive og visuelt informative. |
| Ionesuppresjon | P0 | ✅ **Implementert i PR #21.** Samme analyttmengde vises som kromatografiske signaler i ren løsning og matriks; slider reduserer matriseresponsen og oppdaterer responsendringen med MathJax. |
| Ioneforsterkning | P0 | ✅ **Implementert i PR #21.** Deler grafikkmotor med suppressjon, men slideren øker matriseresponsen ved uendret analyttmengde. |
| Interferens | P0 | ✅ **Implementert i PR #21.** Interferentsignalet beveges inn mot analytten; separat analytt, interferent og observert sum viser hvordan overlapp gir systematisk overestimering. |
| Bakgrunnssignal | P0 | ✅ **Implementert i PR #21.** Signaltrace med uavhengige slidere for bakgrunnsnivå og tilfeldig støy gjør skillet mellom nivå og variasjon synlig. |
| Matriksblank | P1 | ✅ **Implementert i PR #29.** Tre signalspor for løsemiddelblank, matriksblank og prøve viser matriksrelatert topp i de to sistnevnte og analyttbidrag bare i prøven. |
| Kontaminering | P1 | ✅ **Implementert i PR #29.** Valg av kontamineringskilde i arbeidsflyten oppdaterer en matrise som viser hvilke blanker og prøver som får signal. |
| Krysskontaminering | P0 | ✅ **Implementert i PR #21.** Sekvensen høy prøve → blank → neste prøve viser avtakende carry-over; slider oppdaterer blanksignal og ekstra bidrag i neste prøve. |
| Prøvelagring | P0 | ✅ **Implementert i PR #21.** Tre pedagogiske stabilitetskurver for temperatur kombineres med temperaturvalg og tidsslider; gjenværende analytt avleses med MathJax. |

## Statistikk og beregning

| Begrep | Prioritet | Forslag |
|---|---|---|
| Gjennomsnitt | P0 | ✅ **Implementert i PR #15.** «Balansepunkt» på tallinje. Dra ett datapunkt; gjennomsnittet flytter seg som tyngdepunkt. Dette viser mer enn et enkelt summeringsregnestykke. |
| Median | P0 | ✅ **Implementert i PR #15.** Fem punkter på tallinje. Dra ekstremverdien langt ut og se medianen stå stille mens gjennomsnittet flytter seg. |
| Varians | P0 | ✅ **Implementert i PR #15.** Punktdiagram med middelverdi og vertikale avstander. Dra ett punkt; vis avvik og kvadrerte bidrag som arealer/søyler. |
| Standardavvik | P1 | ✅ **Beholdt.** Dagens MathJax-formel kombineres allerede med et grafisk søylediagram av måleserien og beregnet `s`; variansdemoen dekker den dynamiske punktpåvirkningen. |
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
| Mobilfase | P1 | ✅ **Implementert i PR #23.** Animert transport gjennom kolonne med valg mellom LC, GC og SFC; faseformen endres mens transportrollen bevares. |
| Stasjonærfase | P0 | ✅ **Implementert i PR #23.** To analyttsoner beveger seg gjennom en kolonne; slider for relativ interaksjon med stasjonærfasen endrer hastighet/retensjon. |
| Retensjonstid | P0 | ✅ **Implementert i PR #23.** Kromatogram med bevegelig topp. Marker injeksjon, `t_M`, `t_R` og justert retensjonstid direkte på tidsaksen. |
| Gradient | P0 | ✅ **Implementert i PR #23.** Øvre panel: mobilfasesammensetning mot tid. Nedre panel: kromatogram. Slider for gradientbratthet viser hvordan sent eluerende topper flyttes sammen. |
| Isokratisk | P1 | ✅ **Implementert i PR #23.** Samme todelte visualisering som gradient, men flat sammensetningslinje. Kan sammenlignes med gradient uten å bli en ren tekstrad. |
| Elueringsrekkefølge | P0 | ✅ **Implementert i PR #23.** Tre topper/analyttsoner. Én kontroll for selektivitet/stasjonærfase gjør at B og C kan bytte rekkefølge; viser at rekkefølgen er metodeavhengig. |
| Toppbredde | P0 | ✅ **Implementert i PR #23.** Én Gauss-lignende topp med slider for bredde. Vis både basisbredde og bredde ved halv høyde som målestreker. |
| Haledannelse | P0 | ✅ **Implementert i PR #23.** Slider fra symmetrisk til halende topp. Vis asymmetri/tailing-mål der faglig passende og hvordan nabotopp påvirkes. |
| Platetall | P0 | ✅ **Implementert i PR #23.** Hold `t_R` fast og endre toppbredde; kromatografisk topp blir smalere mens `N` øker. Dette bør være én av de mest direkte demoene. |
| Selektivitetsfaktor | P0 | ✅ **Implementert i PR #23.** To retinerte topper med fast `t_M`. Slider endrer `k_2/k_1`; toppenes relative plassering og `\alpha` oppdateres. |
| Oppløsning | P2 | ✅ **Beholdt.** Dagens interaktive toppseparasjon viser mekanismen direkte. |
| Dødvolum | P1 | ✅ **Implementert i PR #23.** Skjematisk væskebane med kolonne og ekstrakolonnevolum markert. Toggle mellom hold-up-volum og ekstrakolonnevolum viser hvorfor «dødvolum» er tvetydig. |
| Injeksjonsvolum | P0 | ✅ **Implementert i PR #23.** Slider for injeksjonsvolum. Prøveplugg og kromatografisk topp blir bredere/overlastet når volumet øker; signalmengde øker samtidig. |

## Deteksjon og måleprinsipp

| Begrep | Prioritet | Forslag |
|---|---|---|
| Signal/støy | P0 | ✅ **Implementert i PR #24.** Signaltrace med én analytttopp og stabilt generert bakgrunnsstøy. Slider for støynivå endrer beregnet S/N og hvor tydelig toppen fremstår. |
| Massespektrometri | P1 | ✅ **Implementert i PR #24.** Vis instrumentkjeden som fysisk skisse: kilde → masseanalysator → detektor → spektrum. Hover/valg kan fremheve trinnet, men interaksjon er ikke nødvendig. |
| Ionisering | P1 | ✅ **Implementert i PR #24.** Vis nøytralt molekyl som går inn i kilde og ioner ut. Valg positiv/negativ modus bytter typiske ionformer. |
| Fragmentering | P0 | ✅ **Implementert i PR #24.** Forløperion → fragmenttre + produktspektrum. Slider for kollisjonsenergi kan gradvis endre hvilke produkt-ioner som dominerer. |
| SIM-modus | P0 | ✅ **Implementert i PR #24.** Massespektrum med mange topper. Toggle full scan/SIM fremhever de valgte `m/z`-signalene og gjør den målrettede innsamlingen konkret. |
| MRM | P0 | ✅ **Implementert i PR #24.** To spektra/trinn: Q1 velger forløper, fragmentering, Q3 velger produkt. Ett valg av overgang fremheves gjennom hele kjeden. |
| Masseoppløsning | P0 | ✅ **Implementert i PR #24.** To nærliggende massetopper. Slider for peak width/resolving power avgjør om de ses som én eller to. Vis `m/\Delta m`. |
| LC-MS | P1 | ✅ **Implementert i PR #24.** Kromatogram øverst, massespektrum nederst. Valg av chromatografisk topp oppdaterer spekteret og illustrerer de to informasjonsdimensjonene. |
| GC-MS | P1 | ✅ **Implementert i PR #24.** Samme pedagogiske mønster som LC-MS, men med GC-kontekst og tydelig EI-lignende spektrum. |
| UV-detektor | P0 | ✅ **Implementert i PR #24.** Lysstråle gjennom celle. Slider for transmisjon eller konsentrasjon endrer lysintensitet og absorbans; `A=-\log_{10}T` oppdateres. |
| FID | P1 | ✅ **Implementert i PR #24.** Vis GC-eluat inn i flamme og strøm ut. En enkel kontroll for karbonmengde kan endre signalhøyden, men prosessvisualet er viktigere enn interaksjon. |
| Ledningsevne | P0 | ✅ **Implementert i PR #24.** Ionisk sone passerer gjennom målecelle og gir topp i signaltrace. Slider for bakgrunnsledningsevne viser hvorfor analyttsignal må ses mot eluentbakgrunn. |

## Prøvetaking og opparbeiding

| Begrep | Prioritet | Forslag |
|---|---|---|
| Representativ prøve | P0 | ✅ **Implementert i PR #26.** Heterogent rutenett med ulike nivåer. Brukeren velger lokalt eller fordelt uttak; uttakets middelverdi sammenlignes med middelverdien i hele det illustrerte partiet. |
| Delprøve | P1 | ✅ **Implementert i PR #26.** Grafisk reduksjonskjede fra laboratorieprøve via testprøve til testportion, med synlig mindre prøvemengde for hvert trinn. |
| Homogenisering | P0 | ✅ **Implementert i PR #26.** Partikler/fargefelt før og etter blanding. Slider for homogeniseringsgrad reduserer forskjellen mellom flere små uttak. |
| Ekstraksjon | P0 | ✅ **Implementert i PR #26.** To væskefaser/beholdere med analyttprikker. Slider for fordelingsforhold eller ekstraksjonstrinn flytter analytten mellom fasene; recovery vises. |
| Oppkonsentrering | P0 | ✅ **Implementert i PR #26.** Beholder med samme analyttmengde og synkende volum. Slider for sluttvolum øker konsentrasjonen visuelt og numerisk. |
| Fortynning | P0 | ✅ **Implementert i PR #26.** Samme analyttmengde i økende sluttvolum; beholderfylling og partikkeltetthet visualiserer at konsentrasjonen faller, samtidig som MathJax viser fortynningsfaktor og ny konsentrasjon. |
| Fortynningsfaktor | P1 | ✅ **Implementert i PR #26.** Koble fortynningsgrafikken til en enkel interaktiv aliquot/sluttvolum-kontroll. Vis faktor og tilbakeberegnet originalkonsentrasjon med MathJax. |
| Filtrering | P1 | ✅ **Implementert i PR #26.** Partikler og oppløst analytt gjennom filtermembran. Toggle «analytt oppløst»/«partikkelbundet» viser hvorfor filtrering kan endre målestørrelsen. |
| Oppslutning | P1 | ✅ **Implementert i PR #26.** Vis kompleks fast matriks som gradvis brytes ned til måleløsning. Interaksjon er valgfri; en sekvensillustrasjon kan være nok. |
| Prøvemengde | P0 | ✅ **Implementert i PR #26.** Heterogent partikkelsett med slider for antall partikler i uttaket. Flere partikler visualiseres samtidig som en eksplisitt pedagogisk `1/√n`-skala faller; teksten presiserer at virkelig prøvetakingsusikkerhet avhenger av materialet og designet. |

## Kvalitetssikring

| Begrep | Prioritet | Forslag |
|---|---|---|
| Akkreditering | P1 | ✅ **Implementert i PR #27.** Aktivitetskart viser hvilke laboratorieaktiviteter som ligger innenfor og utenfor et definert akkrediteringsomfang. |
| Ringtest / kompetanseprøving | P0 | ✅ **Implementert i PR #27.** Punktplot viser andre laboratorier, tildelt verdi, z-soner og eget resultat; slider oppdaterer z-skår og vurdering. |
| Sertifisert referansemateriale | P1 | ✅ **Implementert i PR #27.** Interaktiv sertifikatanatomi fremhever sertifisert verdi, måleusikkerhet, metrologisk sporbarhet og betingelser. |
| Standardmetode | P2 | ✅ **Implementert i PR #27.** Grafisk flyt viser publisert standard → lokal verifisering → autorisert rutine. |
| Avviksbehandling | P2 | ✅ **Implementert i PR #27.** Flyten viser avvik → vurdering av påvirket arbeid/resultater → korreksjon og, ved behov, årsak/korrigerende tiltak → etterfølgende effektkontroll. |
| Intern kvalitetskontroll | P0 | ✅ **Implementert i PR #27.** Feilmodus–kontroll-matrise viser hvilke interne kontrolltyper som er mest direkte informative ved drift, kontaminering og økt variasjon. |
| Revisjonsspor | P1 | ✅ **Implementert i PR #27.** Versjonstidslinjen bevarer verdi, status, aktør, tidspunkt og begrunnelse for hver dokumenterte endring. |

## Enheter og referansemateriale

| Begrep | Prioritet | Forslag |
|---|---|---|
| SI-enheter | P1 | ✅ **Implementert i PR #28.** Baseenhetene vises som byggesteiner; valg av Pa, J eller C fremhever hvilke baseenheter som inngår og viser uttrykket med MathJax. |
| Molmasse | P0 | ✅ **Implementert i PR #28.** Stoffmengdeslider oppdaterer masse ved fast molmasse, med koblet balanse-/mengdevisualisering og MathJax-avlesninger. |
| Molaritet / stoffmengdekonsentrasjon | P0 | ✅ **Implementert i PR #28.** Sluttvolumslider endrer væskevolum og konsentrasjon ved fast stoffmengde; 12 separate soluttsymboler bevares gjennom hele området. |
| Masseprosent | P0 | ✅ **Implementert i PR #28.** Dynamisk stablet blandingssøyle og analyttslider viser at nevneren er total masse, med oppdatert masseprosent. |
| ppm | P1 | ✅ **Implementert i PR #28.** Tre grafiske zoomnivåer går fra 1 av 100 via 1 av 10 000 til 1 av 1 000 000 og kobles eksplisitt til `10^{-6}`. |

## Feilkilder

| Begrep | Prioritet | Forslag |
|---|---|---|
| Grov feil | P1 | ✅ **Implementert i PR #28.** Samme ekstreme datapunkt beholdes mens årsaken toggles mellom ukjent og dokumentert prøveforbytting, slik at skillet mellom uteligger og grov feil blir synlig. |

---

## Status etter visualiseringsrunden

Den planlagte visualiseringsrunden er gjennomført på tvers av statistikk, kvalitet i måling, kalibrering, prøvematriks, separasjon, deteksjon, prøvetaking/opparbeiding, kvalitetssikring, enheter og feilkilder.

Noen demoer er bevisst beholdt uten ny interaksjon fordi de allerede kommuniserer mekanismen visuelt, eller fordi begrepet er så terminologisk/prosessuelt at ekstra grafikk ville risikert å gjøre forklaringen mer misvisende enn pedagogisk.

Målet er fortsatt ikke «interaktivitet overalt». Målet er at brukeren, der det er faglig mulig, kan endre én relevant årsak og **se virkningen** uten å måtte lese seg til den.
