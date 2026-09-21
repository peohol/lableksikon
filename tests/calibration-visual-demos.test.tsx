import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";

import {
  ArbeidsomradeDemo,
  DriftDemo,
  KalibreringskurveDemo,
  KvantifiseringsgrenseDemo,
  MatrikstilpassetKalibreringDemo,
  NullpunktDemo,
  ResponsfaktorDemo,
  VektetRegresjonDemo,
} from "@/demos/CalibrationConceptDemos";

function formulas(container: HTMLElement) {
  return Array.from(container.querySelectorAll("[data-math-tex]")).map((node) =>
    node.getAttribute("data-math-tex"),
  );
}

describe("interaktive kalibreringsdemoer", () => {
  it("kalibreringskurve: ukjent respons projiseres til nytt estimert nivå", () => {
    const { container } = render(<KalibreringskurveDemo />);
    const slider = screen.getByRole("slider", { name: "Respons fra den ukjente prøven" });
    fireEvent.change(slider, { target: { value: "200" } });
    expect(slider).toHaveAttribute("aria-valuetext", expect.stringContaining("90,0 mg/L"));
    expect(formulas(container)).toContain("\\hat{x} = 90{,}0\\,\\mathrm{mg/L}");
  });

  it("arbeidsområde: markøren kan flyttes fra gyldig område til under LLOQ", () => {
    render(<ArbeidsomradeDemo />);
    expect(screen.getByText(/innenfor det illustrerte arbeidsområdet/)).toBeInTheDocument();
    const slider = screen.getByRole("slider", { name: "Analyttnivå gjennom arbeidsområdet" });
    fireEvent.change(slider, { target: { value: "4" } });
    expect(slider).toHaveAttribute("aria-valuetext", expect.stringContaining("utenfor"));
    expect(screen.getByText(/utenfor det illustrerte arbeidsområdet/)).toBeInTheDocument();
  });

  it("kvantifiseringsgrense: punktenes faktiske spredning samsvarer med vist CV", () => {
    const { container } = render(<KvantifiseringsgrenseDemo />);
    const recoveries = Array.from(container.querySelectorAll("[data-recovery]")).map((node) =>
      Number(node.getAttribute("data-recovery")),
    );
    const average = recoveries.reduce((sum, value) => sum + value, 0) / recoveries.length;
    const sd = Math.sqrt(
      recoveries.reduce((sum, value) => sum + (value - average) ** 2, 0) /
        (recoveries.length - 1),
    );
    expect((sd / average) * 100).toBeCloseTo(25, 8);

    const slider = screen.getByRole("slider", { name: "Konsentrasjonsnivå for LOQ-illustrasjonen" });
    expect(screen.getByText(/for variable/)).toBeInTheDocument();
    fireEvent.change(slider, { target: { value: "9" } });
    expect(screen.getByText(/presisjonskravet oppfylt/)).toBeInTheDocument();
    expect(slider).toHaveAttribute("aria-valuetext", expect.stringContaining("16,7 prosent"));
  });

  it("responsfaktor: signalene følger analyttmengden mens responsfaktorene er konstante", () => {
    const { container } = render(<ResponsfaktorDemo />);
    const slider = screen.getByRole("slider", { name: "Analyttmengde i responsfaktorillustrasjonen" });
    fireEvent.change(slider, { target: { value: "20" } });
    expect(slider).toHaveAttribute(
      "aria-valuetext",
      "mengde 20; signal A 1000; signal B 600",
    );
    expect(formulas(container)).toContain("RF_A = 50");
    expect(formulas(container)).toContain("RF_B = 30");
  });

  it("vektet regresjon: valg av 1/x² endrer den tilpassede modellen", async () => {
    const user = userEvent.setup();
    const { container } = render(<VektetRegresjonDemo />);
    const before = screen
      .getByText("Tilpasset modell")
      .closest("div")
      ?.querySelector("[data-math-tex]")
      ?.getAttribute("data-math-tex");
    await user.click(screen.getByRole("button", { name: "Omvendt kvadrert nivå" }));
    const after = screen
      .getByText("Tilpasset modell")
      .closest("div")
      ?.querySelector("[data-math-tex]")
      ?.getAttribute("data-math-tex");
    expect(after).not.toBe(before);
    expect(formulas(container).some((tex) => tex?.startsWith("e_1 = "))).toBe(true);
    expect(screen.getByText(/lave nivåer større relativ vekt/)).toBeInTheDocument();
  });

  it("nullpunkt: konstantleddet kan flyttes til null uten å endre stigningstallet", () => {
    const { container } = render(<NullpunktDemo />);
    const slider = screen.getByRole("slider", { name: "Konstantledd i kalibreringsmodellen" });
    fireEvent.change(slider, { target: { value: "0" } });
    expect(formulas(container)).toContain("a = 0");
    expect(screen.getByText(/skjærer nå nesten i null/)).toBeInTheDocument();
  });

  it("drift: høy driftshastighet fører kontrollpunkter utenfor faste grenser", () => {
    render(<DriftDemo />);
    const slider = screen.getByRole("slider", { name: "Driftshastighet gjennom analyseserien" });
    fireEvent.change(slider, { target: { value: "1" } });
    expect(screen.getByText(/utenfor de faste illustrerte grensene/)).toBeInTheDocument();
    expect(slider).toHaveAttribute("aria-valuetext", expect.stringContaining("106,9"));
  });

  it("matrikstilpasset kalibrering: begge kalibreringskurvenes skjæringspunkter vises", () => {
    const { container } = render(<MatrikstilpassetKalibreringDemo />);
    const slider = screen.getByRole("slider", { name: "Matriseeffekt på respons" });

    fireEvent.change(slider, { target: { value: "50" } });
    expect(formulas(container)).toContain("\\hat{x}_{\\mathrm{solv}} = 5{,}0");
    expect(formulas(container)).toContain("\\hat{x}_{\\mathrm{matrix}} = 10{,}0");
    expect(screen.getByText(/undervurdere nivået/)).toBeInTheDocument();

    fireEvent.change(slider, { target: { value: "120" } });
    const solvent = container.querySelector('[data-calibration-intersection="solvent"]');
    const matrix = container.querySelector('[data-calibration-intersection="matrix"]');
    expect(Number(solvent?.getAttribute("cx"))).toBeGreaterThan(Number(matrix?.getAttribute("cx")));
    expect(formulas(container)).toContain("\\hat{x}_{\\mathrm{solv}} = 12{,}0");
    expect(formulas(container)).toContain("\\hat{x}_{\\mathrm{matrix}} = 10{,}0");
  });
});

describe("tilgjengelighet i kalibreringsdemoene", () => {
  const demos = [
    ["kalibreringskurve", <KalibreringskurveDemo key="a" />],
    ["arbeidsområde", <ArbeidsomradeDemo key="b" />],
    ["kvantifiseringsgrense", <KvantifiseringsgrenseDemo key="c" />],
    ["responsfaktor", <ResponsfaktorDemo key="d" />],
    ["vektet regresjon", <VektetRegresjonDemo key="e" />],
    ["nullpunkt", <NullpunktDemo key="f" />],
    ["drift", <DriftDemo key="g" />],
    ["matrikstilpasset kalibrering", <MatrikstilpassetKalibreringDemo key="h" />],
  ] as const;

  it.each(demos)("%s har ingen axe-feil", async (_name, element) => {
    const { container } = render(<main>{element}</main>);
    expect(await axe(container)).toHaveNoViolations();
  });

  it.each(demos)("%s skjuler dekorativ SVG fra skjermlesere", (_name, element) => {
    const { container } = render(<div>{element}</div>);
    for (const svg of container.querySelectorAll("svg")) {
      expect(svg).toHaveAttribute("aria-hidden", "true");
    }
  });
});
