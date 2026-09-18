import { DemonstrationFrame } from "@/components/DemonstrationFrame";
import shared from "./demos.module.css";
import styles from "./QualityConceptDemos.module.css";

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

function Rows({ rows }: { rows: Array<{ label: string; value: string }> }) {
  return (
    <div className={styles.valueRows}>
      {rows.map((row) => (
        <div key={row.label} className={styles.valueRow}>
          <span className={styles.rowLabel}>{row.label}</span>
          <span className={styles.rowValues}>{row.value}</span>
        </div>
      ))}
    </div>
  );
}

export function AkkrediteringDemo() {
  return (
    <DemonstrationFrame
      kind="stegvis"
      instruction="Følg hva som faktisk blir vurdert og hva akkrediteringen gjelder."
      label="Akkreditering fra vurdering til definert omfang"
      afterword="Akkreditering gjelder spesifiserte aktiviteter i omfanget, ikke automatisk alt laboratoriet gjør."
    >
      <Flow items={["Definer aktiviteter og omfang", "Vurder kompetanse og styringssystem", "Lukk eventuelle avvik", "Akkrediteringsorganet bekrefter omfanget"]} />
    </DemonstrationFrame>
  );
}

export function RingtestDemo() {
  return (
    <DemonstrationFrame
      kind="stegvis"
      instruction="Følg én runde med ekstern kompetanseprøving."
      label="Kompetanseprøving som uavhengig sammenligning"
      afterword="Ved proficiency testing vurderes deltakerens prestasjon mot kriterier som er fastsatt før resultatet vurderes."
    >
      <Flow items={["Samme eller sammenlignbart PT-materiale sendes ut", "Laboratoriene måler uavhengig", "Resultatene vurderes mot forhåndsfastsatte kriterier", "Laboratoriet følger opp tilbakemeldingen"]} />
    </DemonstrationFrame>
  );
}

export function SrmDemo() {
  return (
    <DemonstrationFrame
      kind="sammenligning"
      instruction="Se hvilke opplysninger som gjør et referansemateriale sertifisert."
      label="Hva sertifikatet til et CRM må knytte til den sertifiserte verdien"
      afterword="Sertifiseringen gjelder bestemte egenskapsverdier — ikke automatisk alle egenskaper ved materialet."
    >
      <Rows rows={[
        { label: "Sertifisert verdi", value: "for eksempel stoffmengdekonsentrasjon" },
        { label: "Måleusikkerhet", value: "oppgitt for den sertifiserte verdien" },
        { label: "Metrologisk sporbarhet", value: "dokumentert referanse og sporbarhetsgrunnlag" },
        { label: "Betingelser", value: "gyldighet, håndtering og relevant bruk" },
      ]} />
    </DemonstrationFrame>
  );
}

export function StandardmetodeDemo() {
  return (
    <DemonstrationFrame
      kind="stegvis"
      instruction="Følg veien fra publisert standard til lokal rutine."
      label="En standardmetode må fortsatt fungere i laboratoriet som bruker den"
      afterword="Publisert standard er ikke det samme som dokumentert lokal ytelse; relevant verifisering gjenstår."
    >
      <Flow items={["Velg relevant publisert standard", "Kontroller bruksområde og krav", "Verifiser relevant ytelse lokalt", "Autoriser og bruk metoden innenfor gyldig område"]} />
    </DemonstrationFrame>
  );
}

export function AvviksbehandlingDemo() {
  return (
    <DemonstrationFrame
      kind="stegvis"
      instruction="Følg et avvik fra oppdagelse til dokumentert oppfølging."
      label="Avviksbehandling skiller umiddelbar korreksjon fra årsaksrettet tiltak"
      afterword="Å rette den konkrete feilen er ikke nok når en underliggende årsak kan gi samme avvik på nytt."
    >
      <Flow items={["Oppdag og avgrens avviket", "Vurder berørt arbeid og resultater", "Korriger den konkrete situasjonen", "Finn årsak ved behov", "Iverksett korrigerende tiltak", "Kontroller effekt og dokumenter"]} />
    </DemonstrationFrame>
  );
}

export function InternkontrollDemo() {
  return (
    <DemonstrationFrame
      kind="sammenligning"
      instruction="Se hvordan ulike interne kontroller fanger ulike typer endring."
      label="Intern kvalitetskontroll følger rutineytelsen fra serie til serie"
      afterword="Kontrollopplegget bør velges etter metode og risiko; én kontrolltype kan ikke fange alle feil."
    >
      <Rows rows={[
        { label: "Kontrollmateriale", value: "kan avdekke skjevhet, drift eller økt variasjon" },
        { label: "Blank", value: "kan avdekke bakgrunn eller kontaminering" },
        { label: "Duplikat", value: "kan følge repeterbarhet i aktuelle prøver" },
        { label: "Kontrollkort", value: "viser utvikling og ikke-tilfeldige mønstre over tid" },
      ]} />
    </DemonstrationFrame>
  );
}

export function RevisjonssporDemo() {
  return (
    <DemonstrationFrame
      kind="stegvis"
      instruction="Følg en resultatrevisjon uten at den opprinnelige historikken forsvinner."
      label="Revisjonsspor gjør relevante dataendringer rekonstruerbare"
      afterword="Poenget er ikke bare å lagre siste verdi, men å bevare en etterprøvbar endringshistorikk."
    >
      <Flow items={["Opprinnelige data registreres", "En autorisert bruker gjør en endring", "Bruker og tidspunkt logges", "Relevant begrunnelse knyttes til endringen", "Historikken er tilgjengelig ved gjennomgang"]} />
      <p className={shared.note}>Dette revisjonssporet gjelder data- og dokumenthistorikk, ikke metrologisk sporbarhet av et måleresultat.</p>
    </DemonstrationFrame>
  );
}
