import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";

import {
  BakgrunnssignalDemo,
  IoneforsterkningDemo,
  IonesuppresjonDemo,
  InterferensDemo,
  KrysskontamineringDemo,
  ProvelagringDemo,
} from "@/demos/SampleConceptDemos";

function formulas(container: HTMLElement) {
  return Array.from(container.querySelectorAll("[data-math-tex]")).map((node) =>
    node.getAttribute("data-math-tex"),
  );
}

describe("interaktive prøve- og miljødemoer", () => {
  it("ionesuppresjon: samme analyttmengde gir lavere matriserespons", () => {
    const { container } = render(<IonesuppresjonDemo />);
    const slider = screen.getByRole("slider", { name: "Grad av ionesuppresjon" });
    fireEvent.change(slider, { target: { value: "60" } });
    expect(formulas(container)).toContain("I = 40");
    expect(formulas(container)).toContain("\\frac{\\Delta I}{I_0} = -60\\,\\%");
    expect(slider).toHaveAttribute("aria-valuetext", expect.stringContaining("matriserespons 40"));
  });

  it("ioneforsterkning: samme analyttmengde gir høyere matriserespons", () => {
    const { container } = render(<IoneforsterkningDemo />);
    const slider = screen.getByRole("slider", { name: "Grad av ioneforsterkning" });
    fireEvent.change(slider, { target: { value: "50" } });
    expect(formulas(container)).toContain("I = 150");
    expect(formulas(container)).toContain("\\frac{\\Delta I}{I_0} = +50\\,\\%");
  });

  it("interferens: full overlap legger hele interferentsignalet til analyttens målepunkt", () => {
    const { container } = render(<InterferensDemo />);
    const interferentTrace = container.querySelector('[data-series="interferent"]');
    expect(interferentTrace).toHaveAttribute("stroke-dasharray", "4 6");

    const slider = screen.getByRole("slider", { name: "Overlapp mellom interferent og analytt" });
    fireEvent.change(slider, { target: { value: "100" } });
    expect(formulas(container)).toContain("I_{\\mathrm{int}} = 70{,}0");
    expect(formulas(container)).toContain("I_{\\mathrm{obs}} = 170{,}0");
    expect(screen.getByText(/tydelig overvurdert/)).toBeInTheDocument();
  });

  it("bakgrunnssignal: baseline og støy kan endres uavhengig", () => {
    const { container } = render(<BakgrunnssignalDemo />);
    const trace = container.querySelector("[data-background-trace]");
    const initialPath = trace?.getAttribute("d");

    const baseline = screen.getByRole("slider", { name: "Bakgrunnsnivå i signalkurven" });
    fireEvent.change(baseline, { target: { value: "15" } });
    expect(trace?.getAttribute("d")).not.toBe(initialPath);

    const noise = screen.getByRole("slider", { name: "Tilfeldig støy i signalkurven" });
    fireEvent.change(noise, { target: { value: "0" } });
    expect(formulas(container)).toContain("B = 15{,}0");
    expect(formulas(container)).toContain("A_{\\mathrm{støy}} = 0{,}0");
  });

  it("krysskontaminering: carry-over avtar videre gjennom sekvensen", () => {
    const { container } = render(<KrysskontamineringDemo />);
    const slider = screen.getByRole("slider", { name: "Carry-over-andel mellom injeksjoner" });
    fireEvent.change(slider, { target: { value: "10" } });
    expect(formulas(container)).toContain("I_{\\mathrm{blank}} = 10{,}0");
    expect(formulas(container)).toContain("\\Delta I = 1{,}00");
    expect(formulas(container)).toContain("I_{\\mathrm{obs}} = 21{,}00");
  });

  it("prøvelagring: temperaturvalg og tid følger valgt stabilitetskurve", async () => {
    const user = userEvent.setup();
    const { container } = render(<ProvelagringDemo />);
    await user.click(screen.getByRole("button", { name: "35 °C" }));
    const slider = screen.getByRole("slider", { name: "Lagringstid i stabilitetsillustrasjonen" });
    fireEvent.change(slider, { target: { value: "168" } });
    expect(formulas(container)).toContain("t = 168\\,\\mathrm{h}");
    expect(formulas(container)).toContain("C_t/C_0 = 3{,}9\\,\\%");
    expect(slider).toHaveAttribute("aria-valuetext", expect.stringContaining("3,9 prosent"));
  });
});

describe("tilgjengelighet i prøve- og miljødemoene", () => {
  const demos = [
    ["ionesuppresjon", <IonesuppresjonDemo key="a" />],
    ["ioneforsterkning", <IoneforsterkningDemo key="b" />],
    ["interferens", <InterferensDemo key="c" />],
    ["bakgrunnssignal", <BakgrunnssignalDemo key="d" />],
    ["krysskontaminering", <KrysskontamineringDemo key="e" />],
    ["prøvelagring", <ProvelagringDemo key="f" />],
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
