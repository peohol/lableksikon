import { act, render, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { MathFormula } from "@/components/MathFormula";

interface PendingTypeset {
  element: HTMLElement;
  finish: () => void;
}

describe("MathFormula", () => {
  afterEach(() => {
    delete window.MathJax;
  });

  it("viser aldri rå TeX mens en ny sliderverdi typesettes", async () => {
    const pending: PendingTypeset[] = [];

    window.MathJax = {
      startup: { promise: Promise.resolve() },
      typesetClear: vi.fn(),
      typesetPromise: vi.fn(([element]) => {
        return new Promise<void>((resolve) => {
          pending.push({
            element,
            finish: () => {
              element.textContent = `rendret: ${element.textContent}`;
              resolve();
            },
          });
        });
      }),
    };

    const { container, rerender } = render(<MathFormula tex="x = 1" />);

    await waitFor(() => expect(pending).toHaveLength(1));
    expect(pending[0]!.element).not.toBeVisible();

    await act(async () => {
      pending[0]!.finish();
    });

    await waitFor(() => {
      const visible = container.querySelector<HTMLElement>('[data-math-slot][aria-hidden="false"]');
      expect(visible).toBeVisible();
      expect(visible).toHaveTextContent("rendret: \\(x = 1\\)");
    });

    rerender(<MathFormula tex="x = 2" />);
    await waitFor(() => expect(pending).toHaveLength(2));

    const oldVisible = container.querySelector<HTMLElement>('[data-math-slot][aria-hidden="false"]');
    const staging = pending[1]!.element;
    expect(oldVisible).toHaveTextContent("x = 1");
    expect(oldVisible).not.toHaveTextContent("x = 2");
    expect(staging).toHaveTextContent("\\(x = 2\\)");
    expect(staging).not.toBeVisible();

    // En enda nyere sliderverdi kommer mens x=2 fortsatt typesettes.
    rerender(<MathFormula tex="x = 3" />);
    expect(pending).toHaveLength(2);

    await act(async () => {
      pending[1]!.finish();
    });

    // x=2 var allerede utdatert og skal aldri byttes inn. Komponenten hopper
    // direkte til siste etterspurte verdi.
    await waitFor(() => expect(pending).toHaveLength(3));
    const stillVisible = container.querySelector<HTMLElement>('[data-math-slot][aria-hidden="false"]');
    expect(stillVisible).toHaveTextContent("x = 1");
    expect(stillVisible).not.toHaveTextContent("x = 2");
    expect(pending[2]!.element).toHaveTextContent("\\(x = 3\\)");
    expect(pending[2]!.element).not.toBeVisible();

    await act(async () => {
      pending[2]!.finish();
    });

    await waitFor(() => {
      const visible = container.querySelector<HTMLElement>('[data-math-slot][aria-hidden="false"]');
      expect(visible).toBeVisible();
      expect(visible).toHaveTextContent("rendret: \\(x = 3\\)");
    });
  });
});
