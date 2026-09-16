"use client";

import { useState } from "react";

import { DemonstrationFrame } from "@/components/DemonstrationFrame";
import { Chip, ChipGroup, Readout, Verdict } from "./primitives";
import shared from "./demos.module.css";
import styles from "./MatriseeffektMatrikser.module.css";

const MATRICES = [
  {
    id: "vann",
    name: "Rent vann",
    factor: 1,
    signal: "100 %",
    bias: "riktig",
    text: "Referansesituasjonen: prøven oppfører seg som kalibreringsløsningene.",
  },
  {
    id: "blod",
    name: "Blodplasma",
    factor: 0.62,
    signal: "62 %",
    bias: "38 % for lavt",
    text: "Ionesuppresjon fra fosfolipider og salter demper signalet. Kurven i vann overvurderer hva instrumentet gir i plasma.",
  },
  {
    id: "jord",
    name: "Jordekstrakt",
    factor: 1.18,
    signal: "118 %",
    bias: "18 % for høyt",
    text: "Humusstoffer forsterker responsen her. Samme kalibrering gir nå for høye svar.",
  },
] as const;

export default function MatriseeffektMatrikser() {
  const [selected, setSelected] = useState<(typeof MATRICES)[number]["id"]>("vann");
  const matrix = MATRICES.find((entry) => entry.id === selected) ?? MATRICES[0];

  const endY = 186 - (186 - 34) * matrix.factor;
  const labelY = Math.max(50, Math.min(176, endY + 16));

  return (
    <DemonstrationFrame
      kind="sammenligning"
      instruction="Bytt matriks"
      label="Demonstrasjon: samme kalibrering i tre matrikser"
    >
      <ChipGroup label="Velg matriks">
        {MATRICES.map((entry) => (
          <Chip
            key={entry.id}
            variant="choice"
            pressed={entry.id === selected}
            onClick={() => setSelected(entry.id)}
          >
            {entry.name}
          </Chip>
        ))}
      </ChipGroup>

      <div className={`${shared.split} ${styles.body}`}>
        <div className={shared.figureCol}>
          <svg viewBox="0 0 340 220" aria-hidden="true" className={shared.svg}>
            <line x1="44" y1="186" x2="326" y2="186" className="svg-axis" />
            <line x1="44" y1="186" x2="44" y2="18" className="svg-axis" />
            <line x1="44" y1="186" x2="318" y2="34" className="series-ink-stroke" strokeWidth="2" />
            <line
              x1="44"
              y1="186"
              x2="318"
              y2={endY.toFixed(1)}
              className="series-2-stroke"
              strokeWidth="2"
              strokeDasharray="7 5"
            />
            <text x="318" y="28" className="svg-label svg-label-ink" textAnchor="end">
              kalibrering i vann
            </text>
            <text x="318" y={labelY.toFixed(1)} className="svg-label svg-label-warning" textAnchor="end">
              prøven i matriks
            </text>
            <text x="185" y="212" className="svg-label" textAnchor="middle">
              konsentrasjon
            </text>
          </svg>
        </div>
        <div className={shared.readingCol}>
          <Readout label="Signal sammenlignet med vann" value={matrix.signal} />
          <Readout label="Resultatet blir" value={matrix.bias} size="small" tone="warning" />
          <Verdict reserve={4.4}>{matrix.text}</Verdict>
        </div>
      </div>
    </DemonstrationFrame>
  );
}
