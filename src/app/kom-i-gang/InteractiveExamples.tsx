"use client";

import { useState } from "react";

import styles from "./page.module.css";

const starterCode = [
  "<!doctype html>",
  '<html lang="nb">',
  "  <head>",
  '    <meta charset="utf-8">',
  '    <meta name="viewport" content="width=device-width, initial-scale=1">',
  "    <title>Min første nettapp</title>",
  "  </head>",
  "  <body>",
  "    <h1>Hei, verden!</h1>",
  "    <p>Dette er min første nettapp.</p>",
  "  </body>",
  "</html>",
].join("\n");

const taskPrompt = [
  "Gjør startsiden i index.html til en enkel huskeliste der jeg kan legge til nye punkter, krysse dem av og slette dem.",
  "Lag et rolig, oversiktlig design som også fungerer på mobil. Bruk bare HTML, CSS og JavaScript foreløpig – ingen database, innlogging, nye rammeverk eller betalte tjenester.",
  "Test resultatet og opprett et endringsforslag (pull request) på GitHub. Ikke endre main direkte. Forklar kort med vanlige ord hva du har gjort.",
].join("\n\n");

function CopyBlock({ title, content }: { title: string; content: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className={styles.codeCard}>
      <div className={styles.codeHeader}>
        <span>{title}</span>
        <button type="button" className={styles.copyButton} onClick={copy}>
          {copied ? "Kopiert!" : "Kopier tekst"}
        </button>
      </div>
      <pre>
        <code>{content}</code>
      </pre>
    </div>
  );
}

export function CopyStarterCode() {
  return <CopyBlock title="Fil: index.html" content={starterCode} />;
}

export function CopyTaskPrompt() {
  return <CopyBlock title="Eksempel på en oppgave" content={taskPrompt} />;
}

export function TinyWebApp() {
  const [count, setCount] = useState(0);

  return (
    <div className={styles.miniBrowser} aria-label="Prøv en liten nettapp">
      <div className={styles.browserBar} aria-hidden="true">
        <span className={styles.browserDot} />
        <span className={styles.browserDot} />
        <span className={styles.browserDot} />
        <span className={styles.browserAddress}>eksempel på en nettapp</span>
      </div>
      <div className={styles.browserContent}>
        <h3>En enkel telleapp</h3>
        <p>Trykk på knappen og se hva som skjer.</p>
        <div className={styles.countRow}>
          <button type="button" className={styles.demoButton} onClick={() => setCount((n) => n + 1)}>
            Trykk her
          </button>
          <span className={styles.countNumber} aria-label={String(count)}>
            {count}
          </span>
        </div>
        <p className={styles.demoResult} aria-live="polite">
          {count === 0
            ? "Tallet starter på null."
            : "Du har trykket " + count + (count === 1 ? " gang." : " ganger.")}
        </p>
      </div>
    </div>
  );
}
