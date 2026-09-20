"use client";

import { useEffect, useRef } from "react";

import { enqueueMathJax, MATHJAX_READY_EVENT } from "@/lib/mathjax-client";

export function MathFormula({
  tex,
  label,
}: {
  tex: string;
  /** Valgfri, naturlig opplesning når TeX-uttrykket trenger ekstra kontekst. */
  label?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const render = () => {
      const element = ref.current;
      if (!element) return;

      enqueueMathJax(async (mathJax) => {
        const current = ref.current;
        if (!current || !mathJax.typesetPromise) return;

        // Glem eventuell forrige formel mens den fortsatt finnes i DOM-en,
        // erstatt kildeteksten og typesett den nye formelen.
        mathJax.typesetClear?.([current]);
        current.textContent = `\\(${tex}\\)`;
        await mathJax.typesetPromise([current]);
      });
    };

    if (!enqueueMathJax(async () => undefined)) {
      window.addEventListener(MATHJAX_READY_EVENT, render, { once: true });
      return () => window.removeEventListener(MATHJAX_READY_EVENT, render);
    }

    render();
  }, [tex]);

  return <span ref={ref} aria-label={label} />;
}
