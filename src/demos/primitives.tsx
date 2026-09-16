"use client";

import { useId } from "react";

import styles from "./primitives.module.css";

/**
 * Pedagogiske primitiver: byggeklosser som kan brukes inne i en demonstrasjon.
 * De standardiserer ikke den indre layouten — de sikrer at kontroller og
 * avlesninger ser like ut og oppfører seg likt.
 */

/** 2.18 Slider. Én slider styrer én parameter, alltid med `aria-valuetext`. */
export function Slider({
  label,
  valueText,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  ends,
}: {
  label: string;
  valueText: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  ends?: [string, string];
}) {
  return (
    <div className={styles.sliderWrap}>
      <input
        type="range"
        className="slider"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-label={label}
        aria-valuetext={valueText}
        onChange={(event) => onChange(Number(event.target.value))}
      />
      {ends ? (
        <div className="slider-ends">
          <span>{ends[0]}</span>
          <span>{ends[1]}</span>
        </div>
      ) : null}
    </div>
  );
}

/** 2.21 Verdict. Oversetter tilstanden til mening; farge er bare forsterkning. */
export function Verdict({
  children,
  tone = "normal",
  /** Reservert høyde i em, slik at layouten ikke hopper når teksten skifter. */
  reserve = 2.9,
}: {
  children: React.ReactNode;
  tone?: "normal" | "warning";
  reserve?: number;
}) {
  return (
    <p
      aria-live="polite"
      className={`verdict ${tone === "warning" ? "verdict-warning" : ""} ${styles.verdict}`}
      style={{ minHeight: `${reserve}em` }}
    >
      {children}
    </p>
  );
}

/** Stor avlesning med sans-etikett over. */
export function Readout({
  label,
  value,
  size = "normal",
  tone = "normal",
}: {
  label: string;
  value: React.ReactNode;
  size?: "normal" | "small";
  tone?: "normal" | "warning";
}) {
  return (
    <div className={styles.readout}>
      <span className="readout-label">{label}</span>
      <span
        className={`readout ${size === "small" ? "readout-small" : ""}`}
        style={tone === "warning" ? { color: "var(--color-warning)" } : undefined}
      >
        {value}
      </span>
    </div>
  );
}

/** 2.19 Chips. Valgt tilstand markeres med både fyll og tegn. */
export function ChipGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div role="group" aria-label={label} className={styles.chipGroup}>
      {children}
    </div>
  );
}

export function Chip({
  pressed,
  onClick,
  children,
  variant = "toggle",
}: {
  pressed: boolean;
  onClick: () => void;
  children: React.ReactNode;
  variant?: "toggle" | "choice";
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={`chip ${variant === "choice" ? "chip-choice" : ""}`}
    >
      {variant === "toggle" ? (
        <span aria-hidden="true" className={styles.chipMark}>
          {pressed ? "✓" : "+"}
        </span>
      ) : null}
      <span>{children}</span>
    </button>
  );
}

/** 2.20 StepIndicator. Stegene kan velges direkte, ikke bare framover. */
export function StepIndicator({
  label,
  steps,
  current,
  onSelect,
}: {
  label: string;
  steps: string[];
  current: number;
  onSelect: (index: number) => void;
}) {
  const id = useId();
  return (
    <ol className={styles.steps} aria-label={label}>
      {steps.map((step, index) => (
        <li key={`${id}-${index}`} className={styles.step}>
          <button
            type="button"
            onClick={() => onSelect(index)}
            aria-current={index === current ? "step" : undefined}
            className={`${styles.stepButton} ${index === current ? styles.stepCurrent : ""}`}
          >
            <span className={`kicker ${styles.stepNumber}`}>Steg {index + 1}</span>
            <span className={styles.stepName}>{step}</span>
          </button>
        </li>
      ))}
    </ol>
  );
}
