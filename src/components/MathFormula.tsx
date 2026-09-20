"use client";

import { useEffect, useRef, useState } from "react";

import { enqueueMathJax, MATHJAX_READY_EVENT } from "@/lib/mathjax-client";
import styles from "./MathFormula.module.css";

type SlotIndex = 0 | 1;

export function MathFormula({
  tex,
  label,
}: {
  tex: string;
  /** Valgfri, naturlig opplesning når TeX-uttrykket trenger ekstra kontekst. */
  label?: string;
}) {
  const firstRef = useRef<HTMLSpanElement>(null);
  const secondRef = useRef<HTMLSpanElement>(null);
  const [activeSlot, setActiveSlot] = useState<SlotIndex | null>(null);

  const activeSlotRef = useRef<SlotIndex | null>(null);
  const requestedTexRef = useRef(tex);
  const renderedTexRef = useRef<string | null>(null);
  const renderingRef = useRef(false);
  const mountedRef = useRef(false);
  const scheduleRef = useRef<(() => boolean) | null>(null);

  useEffect(() => {
    mountedRef.current = true;
    const first = firstRef.current;
    const second = secondRef.current;

    const schedule = () => {
      if (!mountedRef.current) return false;
      if (renderingRef.current || renderedTexRef.current === requestedTexRef.current) return true;

      const sourceTex = requestedTexRef.current;
      renderingRef.current = true;

      const queued = enqueueMathJax(async (mathJax) => {
        try {
          if (!mountedRef.current || !mathJax.typesetPromise) return;

          const targetIndex: SlotIndex = activeSlotRef.current === 0 ? 1 : 0;
          const target = targetIndex === 0 ? first : second;
          if (!target) return;

          // Typesett neste verdi i en skjult buffer. Den ferdigrendrede forrige
          // formelen forblir synlig helt til MathJax er ferdig.
          mathJax.typesetClear?.([target]);
          target.textContent = `\\(${sourceTex}\\)`;
          await mathJax.typesetPromise([target]);

          // Slideren kan ha rukket å produsere en nyere verdi. I så fall lar vi
          // den gamle, ferdigrendrede formelen stå og hopper direkte til siste TeX.
          if (!mountedRef.current || requestedTexRef.current !== sourceTex) return;

          renderedTexRef.current = sourceTex;
          activeSlotRef.current = targetIndex;
          setActiveSlot(targetIndex);
        } finally {
          renderingRef.current = false;
          if (mountedRef.current && requestedTexRef.current !== sourceTex) {
            queueMicrotask(schedule);
          }
        }
      });

      if (!queued) renderingRef.current = false;
      return queued;
    };

    scheduleRef.current = schedule;
    const renderWhenReady = () => schedule();
    window.addEventListener(MATHJAX_READY_EVENT, renderWhenReady);
    schedule();

    return () => {
      mountedRef.current = false;
      scheduleRef.current = null;
      window.removeEventListener(MATHJAX_READY_EVENT, renderWhenReady);
      const elements = [first, second].filter((element): element is HTMLSpanElement => Boolean(element));
      if (elements.length > 0) window.MathJax?.typesetClear?.(elements);
    };
  }, []);

  useEffect(() => {
    requestedTexRef.current = tex;
    scheduleRef.current?.();
  }, [tex]);

  return (
    <span className={styles.wrapper} aria-label={label} suppressHydrationWarning>
      <span
        ref={firstRef}
        data-math-slot="0"
        aria-hidden={activeSlot !== 0}
        className={`${styles.slot} ${
          activeSlot === 0 ? styles.visible : activeSlot === null ? styles.initial : styles.hidden
        }`}
      />
      <span
        ref={secondRef}
        data-math-slot="1"
        aria-hidden={activeSlot !== 1}
        className={`${styles.slot} ${activeSlot === 1 ? styles.visible : styles.hidden}`}
      />
    </span>
  );
}
