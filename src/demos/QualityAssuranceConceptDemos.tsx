"use client";

import { useState } from "react";

import { DemonstrationFrame } from "@/components/DemonstrationFrame";
import { MathFormula } from "@/components/MathFormula";
import { comma } from "@/lib/statistics";
import { Chip, ChipGroup, Readout, Slider, Verdict } from "./primitives";
import shared from "./demos.module.css";
import styles from "./QualityAssuranceConceptDemos.module.css";

const texNumber = (value: number, digits = 1) =>
  comma(value, digits).replace(",", "{,}");

export function AkkrediteringDemo() {
  const [activity, setActivity] = useState<"scope" | "outside">("scope");

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Bytt mellom en aktivitet som står i det definerte akkrediteringsomfanget og en aktivitet laboratoriet også utfører, men utenfor omfanget."
      label="Akkreditering gjelder et definert omfang — ikke automatisk hele laboratoriet"
      afterword="Det avgjørende er hva akkrediteringsorganet faktisk har vurdert og ført opp i omfanget, inklusive relevante aktiviteter, metoder, materialer og eventuelle begrensninger."
    >
      <div className={shared.stack}>
        <svg viewBox="0 0 620 280" className={shared.svg} aria-hidden="true">
          <rect x="45" y="35" width="530" height="205" rx="20" className={styles.labFrame} />
          <rect x="75" y="70" width="210" height="70" rx="12" className={styles.scopeBox} />
          <rect x="335" y="70" width="210" height="70" rx="12" className={styles.scopeBox} />
          <rect x="75" y="165" width="210" height="48" rx="12" className={styles.scopeBox} />
          <rect x="335" y="165" width="210" height="48" rx="12" className={styles.outsideBox} />
          <text x="180" y="112" className={styles.svgLabel}>Analyse A · matriks X</text>
          <text x="440" y="112" className={styles.svgLabel}>Analyse B · matriks Y</text>
          <text x="180" y="195" className={styles.svgLabel}>Prøvetaking</text>
          <text x="440" y="195" className={styles.svgLabel}>FoU-aktivitet</text>
          <rect
            x={activity === "scope" ? 67 : 327}
            y={activity === "scope" ? 62 : 157}
            width="226"
            height={activity === "scope" ? 86 : 64}
            rx="16"
            className={activity === "scope" ? styles.scopeHighlight : styles.outsideHighlight}
          />
        </svg>
        <ChipGroup label="Aktivitet som undersøkes">
          <Chip variant="choice" pressed={activity === "scope"} onClick={() => setActivity("scope")}>
            I akkrediteringsomfanget
          </Chip>
          <Chip variant="choice" pressed={activity === "outside"} onClick={() => setActivity("outside")}>
            Utenfor omfanget
          </Chip>
        </ChipGroup>
        <Verdict tone={activity === "outside" ? "warning" : "normal"} reserve={3}>
          {activity === "scope"
            ? "Denne aktiviteten er markert som del av det illustrerte omfanget: akkrediteringspåstanden kan knyttes til akkurat den definerte aktiviteten."
            : "Laboratoriet kan utføre aktiviteten, men den ligger utenfor det illustrerte omfanget. Akkrediteringen kan derfor ikke uten videre brukes som påstand om denne aktiviteten."}
        </Verdict>
      </div>
    </DemonstrationFrame>
  );
}

export function RingtestDemo() {
  const [result, setResult] = useState(103);
  const assigned = 100;
  const ptSd = 2;
  const z = (result - assigned) / ptSd;
  const absZ = Math.abs(z);
  const tone = absZ > 2 ? "warning" : "normal";
  const xFor = (value: number) => 70 + ((value - 92) / 16) * 470;
  const peerResults = [95.8, 97.5, 98.9, 99.6, 100.5, 101.2, 102.7, 104.1];

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Flytt laboratoriets resultat rundt den tildelte verdien og se z-skåren og plasseringen mot de andre deltakerne."
      label="Kompetanseprøving sammenligner resultatet mot en ekstern referanseramme"
      afterword="z-skår er én vanlig ytelsesstatistikk, men ikke den eneste. Hvilken statistikk og hvilke vurderingsgrenser som brukes, bestemmes av den aktuelle PT-ordningen og dens forhåndsfastsatte kriterier."
    >
      <div className={shared.stack}>
        <svg viewBox="0 0 620 260" className={shared.svg} aria-hidden="true">
          <rect x={xFor(96)} y="42" width={xFor(104) - xFor(96)} height="150" className={styles.acceptBand} />
          <rect x={xFor(94)} y="42" width={xFor(96) - xFor(94)} height="150" className={styles.warningBand} />
          <rect x={xFor(104)} y="42" width={xFor(106) - xFor(104)} height="150" className={styles.warningBand} />
          <line x1={xFor(assigned)} y1="35" x2={xFor(assigned)} y2="205" className={styles.referenceLine} />
          {[94, 96, 104, 106].map((value) => (
            <line key={value} x1={xFor(value)} y1="42" x2={xFor(value)} y2="192" className={styles.zoneBoundary} />
          ))}
          <text x={xFor(94)} y="225" className={styles.axisLabel}>z = −3</text>
          <text x={xFor(96)} y="225" className={styles.axisLabel}>−2</text>
          <text x={xFor(100)} y="225" className={styles.axisLabel}>0</text>
          <text x={xFor(104)} y="225" className={styles.axisLabel}>+2</text>
          <text x={xFor(106)} y="225" className={styles.axisLabel}>+3</text>
          {peerResults.map((value, index) => (
            <circle key={index} cx={xFor(value)} cy={75 + (index % 4) * 28} r="7" className={styles.peerPoint} />
          ))}
          <circle cx={xFor(result)} cy="205" r="11" className={tone === "warning" ? styles.labPointWarning : styles.labPoint} />
        </svg>
        <div className={shared.row}>
          <Readout label="Tildelt verdi" value={<MathFormula tex="100" />} size="small" />
          <Readout label="σ for vurdering" value={<MathFormula tex="2{,}0" />} size="small" />
          <Readout label="z-skår" value={<MathFormula tex={"z = (x-x_a)/\\sigma_{pt} = " + texNumber(z, 2)} />} size="small" tone={tone} />
        </div>
        <Verdict tone={tone} reserve={3}>
          {absZ <= 2
            ? "Resultatet ligger innenfor den sentrale illustrerte sonen (|z| ≤ 2)."
            : absZ <= 3
              ? "Resultatet ligger i den illustrerte varslingssonen mellom |z| = 2 og 3."
              : "Resultatet ligger utenfor |z| = 3 i denne illustrasjonen og krever oppfølging etter PT-ordningens kriterier."}
        </Verdict>
        <Slider
          label="Laboratoriets resultat i kompetanseprøvingen"
          valueText={"resultat " + comma(result, 1) + "; z-skår " + comma(z, 2)}
          value={result}
          onChange={setResult}
          min={92}
          max={108}
          step={0.5}
          ends={["lavt resultat", "høyt resultat"]}
        />
      </div>
    </DemonstrationFrame>
  );
}

export function SrmDemo() {
  const [field, setField] = useState<"value" | "uncertainty" | "traceability" | "conditions">("value");
  const fields = {
    value: { y: 66, height: 42, label: "Sertifisert verdi", text: "Verdien gjelder den egenskapen sertifikatet faktisk definerer." },
    uncertainty: { y: 116, height: 42, label: "Måleusikkerhet", text: "Usikkerheten hører til den sertifiserte verdien og må leses sammen med den." },
    traceability: { y: 166, height: 42, label: "Metrologisk sporbarhet", text: "Sertifikatet beskriver referansen som den sertifiserte verdien er sporbar til." },
    conditions: { y: 216, height: 42, label: "Betingelser", text: "Gyldighet, lagring, håndtering og tiltenkt bruk avgrenser hva sertifikatet dekker." },
  } as const;
  const selected = fields[field];

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Velg en del av det skjematiske sertifikatet og se hva opplysningen faktisk gjør."
      label="Et sertifisert referansemateriale er mer enn et materiale med et tall på etiketten"
      afterword="Sertifiseringen gjelder bestemte egenskapsverdier og deres dokumenterte metrologiske grunnlag — ikke automatisk alle egenskaper ved materialet."
    >
      <div className={shared.stack}>
        <svg viewBox="0 0 520 330" className={shared.svg} aria-hidden="true">
          <rect x="110" y="30" width="300" height="270" rx="12" className={styles.certificatePage} />
          {[66, 116, 166, 216].map((y) => (
            <rect key={y} x="145" y={y} width="230" height="42" rx="7" className={styles.certificateLine} />
          ))}
          <text x="165" y="92" className={styles.certificateText}>Sertifisert verdi</text>
          <text x="165" y="142" className={styles.certificateText}>Måleusikkerhet</text>
          <text x="165" y="192" className={styles.certificateText}>Metrologisk sporbarhet</text>
          <text x="165" y="242" className={styles.certificateText}>Betingelser</text>
          <rect x="138" y={selected.y - 7} width="244" height={selected.height + 14} rx="10" className={styles.certificateHighlight} />
        </svg>
        <ChipGroup label="Del av CRM-sertifikatet">
          <Chip variant="choice" pressed={field === "value"} onClick={() => setField("value")}>Verdi</Chip>
          <Chip variant="choice" pressed={field === "uncertainty"} onClick={() => setField("uncertainty")}>Usikkerhet</Chip>
          <Chip variant="choice" pressed={field === "traceability"} onClick={() => setField("traceability")}>Sporbarhet</Chip>
          <Chip variant="choice" pressed={field === "conditions"} onClick={() => setField("conditions")}>Betingelser</Chip>
        </ChipGroup>
        <Readout label={selected.label} value={selected.text} size="small" />
      </div>
    </DemonstrationFrame>
  );
}

export function StandardmetodeDemo() {
  return (
    <DemonstrationFrame
      kind="illustrasjon"
      instruction="Følg den grafiske kjeden fra publisert standard til en metode som laboratoriet faktisk har vist at det kan bruke som forutsatt."
      label="Publisert standard er startpunktet — lokal verifisering kobler den til laboratoriets egen ytelse"
      afterword="Hvor omfattende verifisering som er nødvendig avhenger av metoden, bruksområdet, endringer fra standarden og hvilke ytelsesegenskaper som er kritiske."
    >
      <svg viewBox="0 0 720 250" className={shared.svg} role="img" aria-label="Tre trinn fra publisert standard via lokal verifisering til autorisert rutine">
        <rect x="45" y="75" width="180" height="95" rx="16" className={styles.processBox} />
        <path d="M235 123 L285 123" className={styles.arrow} />
        <rect x="295" y="55" width="180" height="135" rx="16" className={styles.processBoxStrong} />
        <path d="M485 123 L535 123" className={styles.arrow} />
        <rect x="545" y="75" width="140" height="95" rx="16" className={styles.processBox} />
        <circle cx="385" cy="123" r="34" className={styles.verificationGauge} />
        <text x="135" y="126" className={styles.svgLabel}>Publisert standard</text>
        <text x="385" y="126" className={styles.svgLabel}>Lokal verifisering</text>
        <text x="615" y="126" className={styles.svgLabel}>Autorisert rutine</text>
      </svg>
    </DemonstrationFrame>
  );
}

export function AvviksbehandlingDemo() {
  const [mode, setMode] = useState<"correction" | "cause">("correction");

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Velg om håndteringen stopper etter å rette den konkrete situasjonen, eller går videre til årsak og effektkontroll."
      label="Korreksjon retter hendelsen; korrigerende tiltak skal redusere risikoen for gjentakelse"
      afterword="Ikke alle avvik krever samme nivå av årsaksanalyse. Omfanget må stå i forhold til konsekvens, gjentakelsesrisiko og kravene i styringssystemet."
    >
      <div className={shared.stack}>
        <svg viewBox="0 0 680 280" className={shared.svg} aria-hidden="true">
          <rect x="35" y="95" width="130" height="70" rx="14" className={styles.issueBox} />
          <path d="M175 130 L245 130" className={styles.arrow} />
          <rect x="255" y="95" width="130" height="70" rx="14" className={styles.correctionBox} />
          <path d="M395 130 L445 130 L465 90" className={mode === "cause" ? styles.arrow : styles.arrowMuted} />
          <path d="M445 130 L465 190" className={mode === "cause" ? styles.arrow : styles.arrowMuted} />
          <rect x="475" y="55" width="165" height="70" rx="14" className={mode === "cause" ? styles.causeBox : styles.processBoxMuted} />
          <rect x="475" y="155" width="165" height="70" rx="14" className={mode === "cause" ? styles.effectBox : styles.processBoxMuted} />
          <text x="100" y="134" className={styles.svgLabel}>Avvik</text>
          <text x="320" y="134" className={styles.svgLabel}>Korreksjon</text>
          <text x="557" y="94" className={styles.svgLabel}>Årsak + tiltak</text>
          <text x="557" y="194" className={styles.svgLabel}>Effektkontroll</text>
        </svg>
        <ChipGroup label="Hvor langt går oppfølgingen?">
          <Chip variant="choice" pressed={mode === "correction"} onClick={() => setMode("correction")}>Bare korreksjon</Chip>
          <Chip variant="choice" pressed={mode === "cause"} onClick={() => setMode("cause")}>Årsak + tiltak + effektkontroll</Chip>
        </ChipGroup>
        <Verdict tone={mode === "correction" ? "warning" : "normal"} reserve={3}>
          {mode === "correction"
            ? "Den konkrete feilen er rettet, men en eventuell underliggende årsak er ikke undersøkt i denne banen."
            : "Oppfølgingen går videre fra hendelsen til årsak, korrigerende tiltak og kontroll av om tiltaket faktisk virker."}
        </Verdict>
      </div>
    </DemonstrationFrame>
  );
}

export function InternkontrollDemo() {
  const [scenario, setScenario] = useState<"drift" | "contamination" | "variation">("drift");
  const rows = [
    { key: "control", label: "Kontrollmateriale", drift: true, contamination: false, variation: true },
    { key: "blank", label: "Blank", drift: false, contamination: true, variation: false },
    { key: "duplicate", label: "Duplikat", drift: false, contamination: false, variation: true },
    { key: "chart", label: "Kontrollkort", drift: true, contamination: false, variation: true },
  ] as const;

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Velg hvilken type problem som oppstår og se hvilke kontrolltyper som er mest direkte informative i den forenklede matrisen."
      label="Ulike interne kontroller ser etter ulike feilmodi"
      afterword="Dette er en pedagogisk matrise, ikke en komplett regelbok. Egnet kontrollopplegg må bygges rundt metode, matriks, risiko og hvilke feil som faktisk kan påvirke resultatene."
    >
      <div className={shared.stack}>
        <div className={styles.controlMatrix} role="list" aria-label="Kontrolltyper og respons på valgt feilscenario">
          {rows.map((row) => {
            const active = row[scenario];
            return (
              <div key={row.key} className={active ? styles.controlRowActive : styles.controlRow} role="listitem">
                <span>{row.label}</span>
                <span className={active ? styles.statusOn : styles.statusOff}>{active ? "treffer" : "ikke primær"}</span>
              </div>
            );
          })}
        </div>
        <ChipGroup label="Illustrert feilscenario">
          <Chip variant="choice" pressed={scenario === "drift"} onClick={() => setScenario("drift")}>Drift</Chip>
          <Chip variant="choice" pressed={scenario === "contamination"} onClick={() => setScenario("contamination")}>Kontaminering</Chip>
          <Chip variant="choice" pressed={scenario === "variation"} onClick={() => setScenario("variation")}>Økt variasjon</Chip>
        </ChipGroup>
      </div>
    </DemonstrationFrame>
  );
}

export function RevisjonssporDemo() {
  const [changes, setChanges] = useState(2);
  const versions = [
    { version: "v1", value: "12,4", actor: "Original" },
    { version: "v2", value: "12,9", actor: "Korrigert" },
    { version: "v3", value: "12,7", actor: "Revidert" },
    { version: "v4", value: "12,8", actor: "Godkjent" },
  ];

  return (
    <DemonstrationFrame
      kind="interaktiv"
      instruction="Øk antall registrerte endringer og se at tidligere versjoner fortsatt ligger igjen i historikken."
      label="Et revisjonsspor bevarer endringshistorikken i stedet for å overskrive den"
      afterword="Hva som må logges, og hvilke metadata som kreves, avhenger av system og regelverk. Hovedpoenget er at relevante endringer skal kunne rekonstrueres."
    >
      <div className={shared.stack}>
        <div className={styles.auditTimeline} role="list" aria-label="Bevarte versjoner i revisjonssporet">
          {versions.slice(0, changes + 1).map((item, index) => (
            <div key={item.version} className={styles.auditVersion} role="listitem">
              <span className={styles.auditDot}>{index + 1}</span>
              <strong>{item.version}</strong>
              <span>{item.value}</span>
              <small>{item.actor}</small>
            </div>
          ))}
        </div>
        <div className={shared.row}>
          <Readout label="Bevarte versjoner" value={<MathFormula tex={String(changes + 1)} />} size="small" />
          <Readout label="Aktiv verdi" value={versions[changes]!.value} size="small" />
        </div>
        <Slider
          label="Antall endringer i revisjonssporet"
          valueText={"antall endringer " + changes + "; bevarte versjoner " + (changes + 1)}
          value={changes}
          onChange={setChanges}
          min={0}
          max={3}
          step={1}
          ends={["original", "flere dokumenterte endringer"]}
        />
        <p className={shared.note}>Dette revisjonssporet gjelder data- og dokumenthistorikk, ikke metrologisk sporbarhet av et måleresultat.</p>
      </div>
    </DemonstrationFrame>
  );
}
