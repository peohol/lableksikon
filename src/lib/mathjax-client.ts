"use client";

export const MATHJAX_READY_EVENT = "lableksion:mathjax-ready";

export interface MathJaxApi {
  startup?: { promise?: Promise<void> };
  typesetClear?: (elements?: HTMLElement[]) => void;
  typesetPromise?: (elements?: HTMLElement[]) => Promise<void>;
}

declare global {
  interface Window {
    MathJax?: MathJaxApi;
  }
}

let queue: Promise<unknown> = Promise.resolve();

/**
 * Serialiserer MathJax-jobber. Det hindrer at side-navigasjon og dynamiske
 * avlesninger prøver å typesette samtidig.
 */
export function enqueueMathJax(task: (mathJax: MathJaxApi) => Promise<void>): boolean {
  const mathJax = window.MathJax;
  if (!mathJax?.typesetPromise) return false;

  queue = queue
    .then(async () => {
      await (mathJax.startup?.promise ?? Promise.resolve());
      await task(mathJax);
    })
    .catch(() => undefined);

  return true;
}
