"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { enqueueMathJax, MATHJAX_READY_EVENT } from "@/lib/mathjax-client";

function typesetCurrentPage() {
  const root = document.getElementById("innhold");
  if (!root) return;

  enqueueMathJax(async (mathJax) => {
    await mathJax.typesetPromise?.([root]);
  });
}

/**
 * MathJax typesetter den første siden ved egen oppstart. Etter klientnavigasjon
 * ber vi den lete etter ny matematikk. Dynamiske formler bruker MathFormula.
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
      onLoad={() => window.dispatchEvent(new Event(MATHJAX_READY_EVENT))}
    />
  );
}
