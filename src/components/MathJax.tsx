"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

interface MathJaxApi {
  startup?: { promise?: Promise<void> };
  typesetPromise?: (elements?: HTMLElement[]) => Promise<void>;
}

declare global {
  interface Window {
    MathJax?: MathJaxApi;
  }
}

function typesetCurrentPage() {
  const mathJax = window.MathJax;
  const root = document.getElementById("innhold");
  if (!mathJax?.typesetPromise || !root) return;

  const ready = mathJax.startup?.promise ?? Promise.resolve();
  void ready.then(() => mathJax.typesetPromise?.([root]));
}

/**
 * MathJax kjøres én gang etter innlasting og på nytt etter klientnavigasjon.
 * Vi bruker standardavgrensningene \\(...\\) og \\[...\\] slik at
 * ordinære dollartegn aldri tolkes som matematikk.
 */
export function MathJax() {
  const pathname = usePathname();

  useEffect(() => {
    typesetCurrentPage();
  }, [pathname]);

  return (
    <Script
      id="mathjax"
      src="https://cdn.jsdelivr.net/npm/mathjax@4/tex-chtml.js"
      strategy="afterInteractive"
      onLoad={typesetCurrentPage}
    />
  );
}
