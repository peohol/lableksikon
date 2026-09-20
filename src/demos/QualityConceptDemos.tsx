import { DemonstrationFrame } from "@/components/DemonstrationFrame";
import shared from "./demos.module.css";
import styles from "./QualityConceptDemos.module.css";

function ValueRows({ rows }: { rows: Array<{ label: string; values: string }> }) {
  return (
    <div className={styles.valueRows}>
      {rows.map((row) => (
        <div key={row.label} className={styles.valueRow}>
          <span className={styles.rowLabel}>{row.label}</span>
          <span className={styles.rowValues}>{row.values}</span>
        </div>
      ))}
    </div>
  );
}

function Flow({ items }: { items: string[] }) {
  return (
    <ol className={styles.flow}>
      {items.map((item, index) => (
        <li key={item} className={styles.flowItem}>
          <span className={styles.flowNumber}>{index + 1}</span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  );
}

export function RepeterbarhetDemo() {
  return (
    <DemonstrationFrame
      kind="illustrasjon"
      instruction="Se hvor tett seks målinger ligger når forholdene holdes mest mulig like."
      label="Repeterbarhet illustrert med én kort måleserie"
      afterword="Repeterbarhet beskriver korttidsvariasjonen under spesifiserte, like forhold."
    >
      <ValueRows rows={[{ label: "Samme serie", values: "100,1 · 99,9 · 100,0 · 100,2 · 99,8 · 100,0" }]} />
    </DemonstrationFrame>
  );
}

export function IntermediarDemo() {
  return (
    <DemonstrationFrame
      kind="sammenligning"
      instruction="Sammenlign serier fra samme laboratorium når dag og operatør varierer."
      label="Intermediær presisjon på tvers av dager"
      afterword="Her undersøkes mer av laboratoriets normale variasjon enn ved repeterbarhet."
    >
      <ValueRows
        rows={[
          { label: "Mandag · A", values: "99,8 · 100,1 · 100,0" },
          { label: "Onsdag · B", values: "100,5 · 100,2 · 100,4" },
          { label: "Fredag · A", values: "99,7 · 100,3 · 99,9" },
        ]}
      />
    </DemonstrationFrame>
  );
}

export function ReproduserbarhetDemo() {
  return (
    <DemonstrationFrame
      kind="sammenligning"
      instruction="Se hvordan samme materiale kan gi litt ulike resultater i ulike laboratorier."
      label="Reproduserbarhet mellom laboratorier"
      afterword="Reproduserbarhet er presisjon under betingelser som omfatter ulike laboratorier."
    >
      <ValueRows
        rows={[
          { label: "Lab A", values: "100,2 · 99,7 · 100,0" },
          { label: "Lab B", values: "101,0 · 100,4 · 100,8" },
          { label: "Lab C", values: "99,1 · 99,5 · 99,3" },
        ]}
      />
    </DemonstrationFrame>
  );
}

export function SkjevhetDemo() {
  return (
    <DemonstrationFrame
      kind="sammenligning"
      instruction="Sammenlign middelverdien med en referanseverdi."
      label="Systematisk skjevhet mot referanse"
      afterword="Gjennomsnittet kan ligge stabilt på feil side av referansen selv når spredningen er liten."
    >
      <div className={styles.bigComparison}>
        <div><span className="readout-label">Referanse</span><strong>100,0</strong></div>
        <span aria-hidden="true" className={styles.arrow}>→</span>
        <div><span className="readout-label">Middelverdi</span><strong>104,0</strong></div>
        <div className={styles.delta}><span className="readout-label">Skjevhet</span><strong>+4,0</strong></div>
      </div>
    </DemonstrationFrame>
  );
}

export function GjenvinningDemo() {
  return (
    <DemonstrationFrame
      kind="formel"
      instruction="Følg hva som skjer når en kjent mengde analytt tilsettes prøven."
      label="Spike recovery beregnet fra før- og ettermåling"
      afterword="Her er spike recovery \((98-80)/20 = 90\,\%\). Ordet recovery brukes også om andre størrelser."
    >
      <div className={styles.formulaLine}>
        <span>Før: 80</span><span>+ spike: 20</span><span>målt etter: 98</span><strong>90 %</strong>
      </div>
    </DemonstrationFrame>
  );
}

export function UtvidetUsikkerhetDemo() {
  return (
    <DemonstrationFrame
      kind="formel"
      instruction="Se hvordan standardusikkerhet blir til utvidet usikkerhet."
      label="Utvidet måleusikkerhet fra kombinert standardusikkerhet"
      afterword="\(k = 2\) gir ofte omtrent 95 % dekning, men bare under passende fordelingsforutsetninger."
    >
      <div className={styles.formulaLine}><span>{"\\(u_c = 1{,}5\\)"}</span><span>{"\\(k = 2\\)"}</span><strong>{"\\(U = 3{,}0\\)"}</strong><span>{"\\(100 \\pm 3\\)"}</span></div>
    </DemonstrationFrame>
  );
}

export function DekningsfaktorDemo() {
  return (
    <DemonstrationFrame
      kind="sammenligning"
      instruction="Sammenlign intervallet når samme standardusikkerhet multipliseres med ulike \(k\)."
      label="Dekningsfaktor og intervallbredde"
      afterword="Større \(k\) gir et bredere intervall; ønsket dekning og sannsynlighetsfordeling bestemmer passende \(k\)."
    >
      <ValueRows rows={[{ label: "\\(k = 1\\)", values: "98,5 ├──── 100 ────┤ 101,5" }, { label: "\\(k = 2\\)", values: "97,0 ├──────── 100 ────────┤ 103,0" }]} />
    </DemonstrationFrame>
  );
}

export function SelektivitetDemo() {
  return (
    <DemonstrationFrame
      kind="sammenligning"
      instruction="Se om analyttsignalet kan bestemmes uten at interferenten endrer svaret."
      label="Selektiv måling i nærvær av interferent"
      afterword="Selektivitet handler om hvor uavhengig analyttresultatet er av andre relevante komponenter."
    >
      <div className={styles.columns}>
        <div><span className={styles.cardTitle}>Bare analytt</span><strong className={styles.signal}>100</strong></div>
        <div><span className={styles.cardTitle}>Analytt + interferent</span><strong className={styles.signal}>101</strong></div>
        <div><span className={styles.cardTitle}>Dårlig selektiv metode</span><strong className={styles.signal}>132</strong></div>
      </div>
    </DemonstrationFrame>
  );
}

export function SpesifisitetDemo() {
  return (
    <DemonstrationFrame
      kind="sammenligning"
      instruction="Skill mellom det foretrukne begrepet og sektoravhengig språkbruk."
      label="Terminologien selektivitet og spesifisitet"
      afterword="IUPAC og Eurachem foretrekker selektivitet; «spesifisitet» brukes ulikt mellom fagområder."
    >
      <div className={styles.columns}>
        <div><span className={styles.cardTitle}>Selektivitet</span><p className={shared.note}>Definert måleegenskap: analytten kan bestemmes uavhengig av relevante interferenter.</p></div>
        <div><span className={styles.cardTitle}>Spesifisitet</span><p className={shared.note}>Brukes i noen sektorer som synonym eller om svært høy selektivitet. Betydningen må oppgis.</p></div>
      </div>
    </DemonstrationFrame>
  );
}

export function FolsomhetDemo() {
  return (
    <DemonstrationFrame
      kind="sammenligning"
      instruction="Sammenlign hvor mye signalet endres for samme konsentrasjonsendring."
      label="Følsomhet som stigningstall"
      afterword="Brattere respons betyr høyere følsomhet; det er ikke det samme som lav deteksjonsgrense."
    >
      <svg viewBox="0 0 420 220" className={shared.svg} role="img" aria-label="To rette linjer med ulik stigning">
        <line x1="45" y1="180" x2="390" y2="180" className={styles.axis} />
        <line x1="45" y1="180" x2="45" y2="25" className={styles.axis} />
        <line x1="45" y1="170" x2="360" y2="80" className={styles.lineMuted} />
        <line x1="45" y1="170" x2="300" y2="30" className={styles.lineAccent} />
        <text x="305" y="28" className={styles.svgText}>høy følsomhet</text>
        <text x="300" y="105" className={styles.svgText}>lav følsomhet</text>
      </svg>
    </DemonstrationFrame>
  );
}

export function RobusthetDemo() {
  return (
    <DemonstrationFrame
      kind="sammenligning"
      instruction="Gjør små, tilsiktede metodeendringer og se om resultatet holder seg akseptabelt."
      label="Robusthet ved små endringer i driftsbetingelser"
      afterword="Robusthet vurderes mot på forhånd definerte ytelseskrav, ikke mot at resultatet er helt uendret."
    >
      <ValueRows rows={[{ label: "Standard", values: "100,0" }, { label: "pH +0,2", values: "99,6" }, { label: "Flow −5 %", values: "100,4" }, { label: "Kolonne +2 °C", values: "99,8" }]} />
    </DemonstrationFrame>
  );
}

export function SporbarhetDemo() {
  return (
    <DemonstrationFrame
      kind="stegvis"
      instruction="Følg den dokumenterte kjeden bak resultatet."
      label="Metrologisk sporbarhetskjede"
      afterword="Hvert ledd bidrar med måleusikkerhet; en ubrutt kjede gjør ikke i seg selv resultatet feilfritt eller egnet til formålet."
    >
      <Flow items={["Prøveresultat", "Kalibreringsstandard", "Referansemateriale / referanse", "Definert referanse eller SI-enhet"]} />
    </DemonstrationFrame>
  );
}

export function ValideringDemo() {
  return (
    <DemonstrationFrame
      kind="stegvis"
      instruction="Start med bruken metoden skal ha — ikke med testene."
      label="Validering fra tiltenkt bruk til dokumentert egnethet"
      afterword="Validering er formålsstyrt: kravene må både være passende for bruken og dokumentert oppfylt."
    >
      <Flow items={["Definer tiltenkt bruk", "Sett relevante ytelseskrav", "Samle objektiv evidens", "Konkluder om metoden er egnet"]} />
    </DemonstrationFrame>
  );
}

export function VerifiseringDemo() {
  return (
    <DemonstrationFrame
      kind="stegvis"
      instruction="Kontroller at spesifiserte krav faktisk oppfylles i den aktuelle situasjonen."
      label="Verifisering av spesifiserte krav"
      afterword="Verifisering spør om krav er oppfylt; validering spør i tillegg om kravene er riktige for den tiltenkte bruken."
    >
      <Flow items={["Spesifiserte krav", "Lokal gjennomføring og data", "Sammenlign med krav", "Dokumenter oppfylt / ikke oppfylt"]} />
    </DemonstrationFrame>
  );
}

export function KontrollkortDemo() {
  const points = [104, 98, 101, 103, 99, 105, 102, 100, 101, 112];
  return (
    <DemonstrationFrame
      kind="illustrasjon"
      instruction="Følg kontrollresultater over tid og se etter signal om at prosessen har endret seg."
      label="Shewhart-lignende kontrollkort med ett punkt utenfor kontrollgrensen"
      afterword="Kontrollgrenser beskriver prosessens statistiske stabilitet og er ikke det samme som spesifikasjons- eller akseptgrenser."
    >
      <svg viewBox="0 0 520 230" className={shared.svg} role="img" aria-label="Kontrollkort med senterlinje, øvre og nedre kontrollgrense og ti punkter">
        <line x1="45" y1="115" x2="490" y2="115" className={styles.lineAccent} />
        <line x1="45" y1="45" x2="490" y2="45" className={styles.limit} />
        <line x1="45" y1="185" x2="490" y2="185" className={styles.limit} />
        {points.map((value, index) => {
          const x = 55 + index * 46;
          const y = 115 - (value - 100) * 8;
          return <circle key={`${value}-${index}`} cx={x} cy={y} r="6" className={value > 108 ? styles.pointWarning : styles.point} />;
        })}
      </svg>
    </DemonstrationFrame>
  );
}
