import type { Metadata } from "next";
import Link from "next/link";

import { CopyStarterCode, CopyTaskPrompt, TinyWebApp } from "./InteractiveExamples";
import styles from "./page.module.css";

const description =
  "En trinnvis veiledning for å lage og publisere en nettapp med GitHub, Vercel og Claude Code eller Codex — uten å installere programmer.";

export const metadata: Metadata = {
  title: "Lag din første nettapp",
  description,
  alternates: { canonical: "/kom-i-gang" },
  openGraph: {
    type: "website",
    locale: "nb_NO",
    siteName: "Lableksion",
    title: "Lag din første nettapp — Lableksion",
    description,
    url: "/kom-i-gang",
  },
};

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={styles.externalLink}>
      {children} <span aria-hidden="true">↗</span>
    </a>
  );
}

export default function GettingStartedPage() {
  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <Link href="/" className={styles.backLink}>
          ← Til forsiden
        </Link>
        <p className={styles.kicker}>PRAKTISK VEILEDNING · OPPDATERT 19. OKTOBER 2026</p>
        <h1>Lag din første nettapp</h1>
        <p className={styles.lead}>
          Fra en idé til en app du kan åpne og dele med andre. Alt gjøres i nettleseren — uten
          programmeringserfaring, terminal eller installasjon av utviklerverktøy.
        </p>
        <nav className={styles.contents} aria-label="Gå til et kapittel">
          <a href="#hva-er-en-app">Hva er en nettapp?</a>
          <a href="#slik-virker-det">Hvordan henger det sammen?</a>
          <a href="#github">1. GitHub</a>
          <a href="#vercel">2. Vercel</a>
          <a href="#kodeassistent">3. Claude Code eller Codex</a>
          <a href="#publiser-endring">4. Vis den ferdige appen</a>
        </nav>
      </header>

      <section id="hva-er-en-app" className={styles.section}>
        <p className={styles.kicker}>FØR DU BEGYNNER</p>
        <h2>Hva er egentlig en nettapp?</h2>
        <div className={styles.reading}>
          <p>
            En <strong>nettapp</strong> er et program du bruker gjennom en nettleser, for eksempel
            Chrome, Edge eller Safari. Det kan være en enkel huskeliste, en kalkulator eller et
            verktøy som hjelper deg å holde oversikt over noe.
          </p>
          <p>
            Du åpner den med en nettadresse, akkurat som en vanlig nettside. Forskjellen er at en
            nettapp gjerne <em>gjør noe</em> når du trykker, skriver eller velger. Prøv den lille
            appen nedenfor.
          </p>
        </div>
        <TinyWebApp />
        <p className={styles.afterExample}>
          En nettapp kan begynne så enkelt. Senere kan den få flere sider, huske informasjon og
          ha brukerkontoer. Slike funksjoner kan kreve flere tjenester enn dem vi bruker her.
        </p>
      </section>

      <section id="slik-virker-det" className={styles.section}>
        <p className={styles.kicker}>OVERSIKT</p>
        <h2>Tre tjenester, tre ulike oppgaver</h2>
        <div className={styles.reading}>
          <p>
            Tenk på appen som et lite byggverk. Noen må ta vare på tegningene, noen må bygge og
            vise frem resultatet, og noen må gjøre endringer når du får nye ideer.
          </p>
        </div>

        <figure className={styles.flowFigure}>
          <figcaption className={styles.figureTitle}>Slik går filene fra idé til nettleser</figcaption>
          <div className={styles.flowTrack}>
            <div className={styles.flowNode}>
              <span className={styles.flowNumber}>01 · OPPBEVARER</span>
              <strong>GitHub</strong>
              <span>Lagrer filene og tidligere versjoner av appen.</span>
            </div>
            <span className={styles.flowArrow} aria-hidden="true">→</span>
            <div className={styles.flowNode}>
              <span className={styles.flowNumber}>02 · PUBLISERER</span>
              <strong>Vercel</strong>
              <span>Henter filene og gjør appen tilgjengelig på nett.</span>
            </div>
            <span className={styles.flowArrow} aria-hidden="true">→</span>
            <div className={styles.flowNode}>
              <span className={styles.flowNumber}>03 · BRUKES I</span>
              <strong>Nettleseren</strong>
              <span>Her ser, tester og bruker du appen.</span>
            </div>
          </div>
          <div className={styles.flowAgent}>
            <span className={styles.agentArrow} aria-hidden="true">↑</span>
            <div>
              <strong>Claude Code eller Codex</strong>
              <span>Du beskriver hva du vil ha. Språkmodellen kan lage og forbedre filene i GitHub.</span>
            </div>
          </div>
          <p className={styles.figureCaption}>
            Claude Code og Codex er alternativer til hverandre. Du trenger bare å velge én av
            dem. De publiserer ikke appen på Vercel — det skjer via forbindelsen med GitHub.
          </p>
        </figure>

        <div className={styles.glossary} aria-label="Tre ord du vil møte">
          <div>
            <strong>Repo (repository)</strong>
            <p>Appens mappe på GitHub. Her ligger alle filene.</p>
          </div>
          <div>
            <strong>Endring (commit)</strong>
            <p>En lagret versjon av filene. Tidligere versjoner kan finnes igjen.</p>
          </div>
          <div>
            <strong>Endringsforslag (pull request)</strong>
            <p>En måte å undersøke en endring før den legges til i den ferdige appen.</p>
          </div>
        </div>
      </section>

      <section id="github" className={styles.section}>
        <div className={styles.sectionHeading}>
          <span className={styles.sectionNumber} aria-hidden="true">1</span>
          <div>
            <p className={styles.kicker}>LAGRE PROSJEKTET</p>
            <h2>Opprett GitHub-konto og et repo</h2>
          </div>
        </div>
        <ol className={styles.steps}>
          <li>
            <h3>Registrer deg</h3>
            <p>
              Åpne <ExternalLink href="https://github.com/signup">GitHub – registrering</ExternalLink>.
              Opprett en konto, bekreft e-postadressen og følg sikkerhetsstegene. GitHub Free
              holder til dette eksempelet.
            </p>
          </li>
          <li>
            <h3>Lag en mappe for appen</h3>
            <p>
              Åpne <ExternalLink href="https://github.com/new">New repository</ExternalLink>.
              Velg din egen konto under <strong>Owner</strong>, og skriv for eksempel{" "}
              <span className={styles.inlineCode}>min-forste-nettapp</span> i feltet{" "}
              <strong>Repository name</strong>.
            </p>
            <p>
              Velg <strong>Public</strong> hvis dette er et øvingsprosjekt du gjerne viser
              frem. Velg <strong>Private</strong> hvis andre ikke skal kunne se filene. Du kan
              bruke begge med Vercel; private repoer kan kreve et ekstra tilgangssteg hos
              språkmodellen.
            </p>
          </li>
          <li>
            <h3>Opprett repoet</h3>
            <p>
              Velg <strong>Add README</strong> (en beskrivelsesfil), og trykk{" "}
              <strong>Create repository</strong>. Nå har appen fått sin egen plass, men den har
              ennå ingen nettside å vise frem.
            </p>
          </li>
          <li>
            <h3>Legg inn en helt enkel startside</h3>
            <p>
              I repoet velger du <strong>Add file</strong> eller plussmenyen over fillisten,
              deretter <strong>Create new file</strong>. Gi filen navnet{" "}
              <span className={styles.inlineCode}>index.html</span>. Kopier innholdet nedenfor
              og lim det inn i det store tekstfeltet. Du trenger ikke forstå koden.
            </p>
            <CopyStarterCode />
            <p>
              Trykk <strong>Commit changes</strong> og bekreft. La filen lagres på{" "}
              <span className={styles.inlineCode}>main</span> (hovedversjonen). Denne
              startsiden er foreløpig bare en nettside; straks skal du få språkmodellen til å
              gjøre den interaktiv.
            </p>
          </li>
        </ol>
        <p className={styles.milestone}><span aria-hidden="true">✓</span> Du har nå et GitHub-repo med en startside.</p>
      </section>

      <section id="vercel" className={styles.section}>
        <div className={styles.sectionHeading}>
          <span className={styles.sectionNumber} aria-hidden="true">2</span>
          <div>
            <p className={styles.kicker}>VIS APPEN PÅ NETT</p>
            <h2>Koble Vercel til GitHub</h2>
          </div>
        </div>
        <ol className={styles.steps}>
          <li>
            <h3>Registrer deg med GitHub-kontoen din</h3>
            <p>
              Åpne <ExternalLink href="https://vercel.com/signup">Vercel – registrering</ExternalLink>,
              velg <strong>Continue with GitHub</strong>, og godkjenn tilkoblingen hos GitHub.
              Til en personlig, ikke-kommersiell øvelse kan du bruke gratisplanen{" "}
              <strong>Hobby</strong>. Kommersiell bruk krever normalt en betalt plan.
            </p>
          </li>
          <li>
            <h3>Opprett et Vercel-prosjekt</h3>
            <p>
              På Vercels oversikt velger du <strong>Add New… → Project</strong> (noen steder{" "}
              <strong>New Project</strong>). Finn repoet{" "}
              <span className={styles.inlineCode}>min-forste-nettapp</span> under GitHub og
              velg <strong>Import</strong>. Hvis det ikke vises, må du gi Vercels
              GitHub-tilkobling tilgang til akkurat dette repoet.
            </p>
          </li>
          <li>
            <h3>Velg innstillingene for den enkle startsiden</h3>
            <p>
              Under <strong>Framework Preset</strong> velger du <strong>Other</strong>.
              Dersom <strong>Build Command</strong> vises, slå på <strong>Override</strong> og
              la feltet stå tomt. La <strong>Output Directory</strong> bruke standardvalget
              (rotmappen, <span className={styles.inlineCode}>.</span>). Ikke endre de andre
              innstillingene.
            </p>
            <p className={styles.smallNote}>
              Dette gjelder eksempelet med én HTML-fil. Hvis appen senere bygges om til et større
              system, for eksempel Next.js, må Vercel-innstillingen passe til den nye appen.
            </p>
          </li>
          <li>
            <h3>Publiser og åpne nettadressen</h3>
            <p>
              Velg <strong>Deploy</strong>. Når Vercel melder at publiseringen er ferdig,
              velger du <strong>Visit</strong> eller åpner prosjektets nettadresse, som
              vanligvis slutter på <span className={styles.inlineCode}>.vercel.app</span>.
              Du skal se teksten «Hei, verden!».
            </p>
          </li>
        </ol>
        <p className={styles.milestone}><span aria-hidden="true">✓</span> Nå ligger startsiden på internett, og Vercel følger med på nye endringer i GitHub.</p>
        <p className={styles.caution}>
          <strong>Viktig:</strong> Et privat repo gjør ikke automatisk den publiserte nettsiden
          privat. Ikke legg inn personopplysninger, passord eller hemmelige nøkler i eksempelet.
        </p>
      </section>

      <section id="kodeassistent" className={styles.section}>
        <div className={styles.sectionHeading}>
          <span className={styles.sectionNumber} aria-hidden="true">3</span>
          <div>
            <p className={styles.kicker}>BYGG VIDERE MED SPRÅKMODELL</p>
            <h2>Velg Claude Code eller Codex i nettleseren</h2>
          </div>
        </div>
        <p className={styles.sectionIntro}>
          Begge kan lese filene, skrive kode, prøve ut endringer og foreslå dem i GitHub. Velg
          den tjenesten du ønsker å bruke. Du trenger <strong>ikke</strong> terminal,
          skrivebordsapp eller ekstra programmer.
        </p>

        <div className={styles.choiceGrid}>
          <article className={styles.choice}>
            <div className={styles.choiceTop}>
              <p className={styles.kicker}>ALTERNATIV A</p>
              <h3>Claude Code i skyen</h3>
              <span>Fra Anthropic</span>
            </div>
            <ol>
              <li>
                Registrer deg på <ExternalLink href="https://claude.ai">claude.ai</ExternalLink>.
                Skyøkter i Claude Code krever en konto med tilgang, blant annet Pro eller Max.
              </li>
              <li>
                Åpne <ExternalLink href="https://claude.ai/code">claude.ai/code</ExternalLink>.
                Velg <strong>Sign in with GitHub</strong> når du blir bedt om det, og godkjenn
                tilkoblingen.
              </li>
              <li>
                På Pro/Max opprettes normalt et standardmiljø automatisk. På Team/Enterprise
                kan det være nødvendig å velge <strong>Create &amp; finish</strong>, eller at en
                administrator tillater GitHub-tilkoblingen.
              </li>
              <li>
                Velg repoet i feltet under skriveboksen, og bruk gjerne{" "}
                <strong>Plan</strong> første gang hvis du vil se fremgangsmåten før noe endres.
                Skriv oppgaven din og send.
              </li>
              <li>
                Når arbeidet er ferdig, se gjennom endringene. Velg{" "}
                <strong>Create PR</strong> for å opprette et endringsforslag på GitHub.
              </li>
            </ol>
            <ExternalLink href="https://code.claude.com/docs/en/web-quickstart">
              Offisiell veiledning for Claude Code i skyen
            </ExternalLink>
          </article>

          <article className={styles.choice}>
            <div className={styles.choiceTop}>
              <p className={styles.kicker}>ALTERNATIV B</p>
              <h3>Codex Cloud</h3>
              <span>Fra OpenAI / ChatGPT</span>
            </div>
            <ol>
              <li>
                Registrer deg på{" "}
                <ExternalLink href="https://chatgpt.com">chatgpt.com</ExternalLink>.
                Codex Cloud er tilgjengelig for kvalifiserte betalte kontoer, blant annet Plus,
                Pro og Business; ikke Free eller Go. Tilgangen kan avhenge av utrulling.
              </li>
              <li>
                Åpne <ExternalLink href="https://chatgpt.com/codex">Codex i ChatGPT</ExternalLink>.
                I en ny oppgave velger du <strong>Work in → Cloud</strong>, deretter{" "}
                <strong>Select environment → Create environment</strong>.
              </li>
              <li>
                Koble til GitHub hvis du blir bedt om det. Velg repoet du nettopp laget, og
                trykk <strong>Get started</strong>. Codex forbereder prosjektet og kontrollerer
                at det kan arbeides med.
              </li>
              <li>
                Les oppsummeringen, svar på eventuelle spørsmål og velg{" "}
                <strong>Publish</strong> for å gjøre arbeidsmiljøet klart. Velg deretter{" "}
                <strong>Start a new task</strong> og beskriv endringen du ønsker.
              </li>
              <li>
                Se gjennom resultatet og be Codex opprette et{" "}
                <strong>endringsforslag (pull request)</strong> på GitHub. Oppgaven i skyen er
                ikke det samme som at nettstedet er oppdatert.
              </li>
            </ol>
            <ExternalLink href="https://developers.openai.com/codex/environments/cloud-environments">
              Offisiell veiledning for Codex Cloud
            </ExternalLink>
          </article>
        </div>

        <div className={styles.promptSection}>
          <h3>En første oppgave du kan prøve</h3>
          <p>
            Lim inn dette i Claude Code eller Codex. Du forteller hva appen skal gjøre;
            språkmodellen tar seg av selve kodingen.
          </p>
          <CopyTaskPrompt />
        </div>
      </section>

      <section id="publiser-endring" className={styles.section}>
        <div className={styles.sectionHeading}>
          <span className={styles.sectionNumber} aria-hidden="true">4</span>
          <div>
            <p className={styles.kicker}>FRA FORSLAG TIL FERDIG APP</p>
            <h2>Godkjenn endringen og se resultatet</h2>
          </div>
        </div>
        <ol className={styles.steps}>
          <li>
            <h3>Åpne endringsforslaget på GitHub</h3>
            <p>
              Gå til fanen <strong>Pull requests</strong> i repoet og åpne forslaget.
              Under <strong>Files changed</strong> kan du se hva språkmodellen har endret.
              Du kan også be den forklare endringene med vanlige ord.
            </p>
          </li>
          <li>
            <h3>Test før du godkjenner</h3>
            <p>
              Vercel oppretter normalt en egen forhåndsvisning når et endringsforslag er åpnet.
              Åpne lenken fra Vercel i forslaget og kontroller at det du ba om, virker — også
              på en smal skjerm. Ser du en feil, be språkmodellen rette den i samme forslag.
            </p>
          </li>
          <li>
            <h3>Legg endringen inn i hovedversjonen</h3>
            <p>
              Når du er fornøyd og kontrollene er bestått, velger du{" "}
              <strong>Merge pull request</strong> og bekrefter. Endringen blir nå del av{" "}
              <span className={styles.inlineCode}>main</span>, og Vercel publiserer en ny
              versjon automatisk. Åpne nettadressen din på nytt etter at publiseringen er ferdig.
            </p>
          </li>
        </ol>

        <figure className={styles.lastFigure}>
          <figcaption>Den vanlige arbeidsflyten videre</figcaption>
          <div className={styles.loop}>
            <span>Beskriv en forbedring</span>
            <span aria-hidden="true">→</span>
            <span>La modellen foreslå en endring</span>
            <span aria-hidden="true">→</span>
            <span>Test og godkjenn</span>
            <span aria-hidden="true">→</span>
            <span>Se oppdateringen på Vercel</span>
          </div>
        </figure>
      </section>

      <section className={styles.section} aria-labelledby="feil">
        <p className={styles.kicker}>HVIS NOE STOPPER OPP</p>
        <h2 id="feil">Vanlige spørsmål</h2>
        <div className={styles.faq}>
          <details>
            <summary>Jeg finner ikke repoet mitt i Vercel eller språkmodellen.</summary>
            <p>
              Kontroller at du er logget inn på riktig GitHub-konto. Gå gjennom
              tilgangstillatelsene du ga til tjenesten. For private repoer kan Claude Code
              kreve at <strong>Claude GitHub App</strong> installeres med tilgang til akkurat
              dette repoet. Vercel må også ha tilgang til repoet.
            </p>
          </details>
          <details>
            <summary>Vercel sier at publiseringen feilet.</summary>
            <p>
              Kontroller at filen heter <span className={styles.inlineCode}>index.html</span>{" "}
              og ligger øverst i repoet, at <strong>Framework Preset</strong> er{" "}
              <strong>Other</strong>, og at <strong>Build Command</strong> er tomt. Hvis du
              har byttet til et annet oppsett, be språkmodellen forklare hvilke
              Vercel-innstillinger som må endres.
            </p>
          </details>
          <details>
            <summary>Modellen er ferdig, men nettsiden har ikke endret seg.</summary>
            <p>
              Se etter et åpent endringsforslag under <strong>Pull requests</strong>.
              Endringen må normalt godkjennes og legges inn i hovedversjonen før Vercel
              oppdaterer den vanlige nettadressen. Kontroller deretter status i Vercel.
            </p>
          </details>
          <details>
            <summary>Kan jeg bruke gratisplanene?</summary>
            <p>
              GitHub Free og Vercel Hobby er tilstrekkelig for dette enkle, personlige og
              ikke-kommersielle eksempelet. Nettleserutgavene av skyagentene har egne
              tilgangskrav og bruksgrenser. Undersøk gjeldende pris og tilgang i{" "}
              <ExternalLink href="https://claude.ai/upgrade">Claude</ExternalLink> eller{" "}
              <ExternalLink href="https://chatgpt.com/pricing">ChatGPT</ExternalLink> før du
              oppretter et betalt abonnement.
            </p>
          </details>
        </div>
      </section>

      <footer className={styles.references}>
        <p className={styles.kicker}>KILDER OG OPPDATERING</p>
        <h2>Kontrollert mot tjenestenes egne veiledninger</h2>
        <p>
          Trinnene er kontrollert 19. oktober 2026. Tjenestene oppdaterer av og til
          knappenavn og skjermbilder. Hvis noe ser annerledes ut, er de offisielle
          veiledningene nedenfor beste utgangspunkt.
        </p>
        <ul>
          <li><ExternalLink href="https://docs.github.com/en/get-started/start-your-journey/creating-a-repository-for-your-project-on-github">GitHub: konto, repo og startside</ExternalLink></li>
          <li><ExternalLink href="https://vercel.com/docs/git">Vercel: koble GitHub-repo til et prosjekt</ExternalLink></li>
          <li><ExternalLink href="https://vercel.com/docs/builds/configure-a-build">Vercel: publisere en enkel HTML-side</ExternalLink></li>
          <li><ExternalLink href="https://code.claude.com/docs/en/web-quickstart">Anthropic: Claude Code i skyen</ExternalLink></li>
          <li><ExternalLink href="https://developers.openai.com/codex/environments/cloud-environments">OpenAI: Codex Cloud og arbeidsmiljøer</ExternalLink></li>
          <li><ExternalLink href="https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan">OpenAI: hvem kan bruke Codex Cloud</ExternalLink></li>
        </ul>
        <Link href="/" className={styles.homeLink}>← Tilbake til Lableksion</Link>
      </footer>
    </div>
  );
}
