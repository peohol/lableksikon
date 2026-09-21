import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";

import {
  FTestDemo,
  FrihetsgraderDemo,
  GjennomsnittDemo,
  KonfidensintervallDemo,
  KorrelasjonDemo,
  MedianDemo,
  MinsteKvadraterDemo,
  NormalfordelingDemo,
  RegresjonDemo,
  SignifikansnivaDemo,
  TTestDemo,
  UteliggerDemo,
  VariansDemo,
} from "@/demos/StatisticsConceptDemos";

const demos = [
  ["gjennomsnitt", <GjennomsnittDemo key="a" />],
  ["median", <MedianDemo key="b" />],
  ["varians", <VariansDemo key="c" />],
  ["normalfordeling", <NormalfordelingDemo key="d" />],
  ["frihetsgrader", <FrihetsgraderDemo key="e" />],
  ["konfidensintervall", <KonfidensintervallDemo key="f" />],
  ["signifikansnivå", <SignifikansnivaDemo key="g" />],
  ["t-test", <TTestDemo key="h" />],
  ["F-test", <FTestDemo key="i" />],
  ["regresjon", <RegresjonDemo key="j" />],
  ["minste kvadrater", <MinsteKvadraterDemo key="k" />],
  ["korrelasjon", <KorrelasjonDemo key="l" />],
  ["uteligger", <UteliggerDemo key="m" />],
] as const;

describe("interaktive statistikkdemoer", () => {
  it("normalfordeling: standardavvik endrer kurvens geometri", () => {
    const { container } = render(<NormalfordelingDemo />);
    const slider = screen.getByRole("slider", { name: "Standardavvik i normalfordelingen" });
    const curve = container.querySelector("[data-normal-curve='true']");
    const before = curve?.getAttribute("d");
    fireEvent.change(slider, { target: { value: "2" } });
    expect(curve?.getAttribute("d")).not.toBe(before);
    expect(slider).toHaveAttribute("aria-valuetext", "standardavvik 2,0");
  });

  it("frihetsgrader: tredje avvik følger de to frie og holder summen null", () => {
    const { container } = render(<FrihetsgraderDemo />);
    fireEvent.change(screen.getByRole("slider", { name: "Første frie avvik" }), { target: { value: "2" } });
    fireEvent.change(screen.getByRole("slider", { name: "Andre frie avvik" }), { target: { value: "2" } });
    const formulas = Array.from(container.querySelectorAll("[data-math-tex]")).map((node) =>
      node.getAttribute("data-math-tex"),
    );
    expect(formulas).toContain("d_3 = -4{,}0");
    expect(formulas).toContain("d_1+d_2+d_3=0");
  });

  it("konfidensintervall: større utvalg gir smalere intervaller", () => {
    render(<KonfidensintervallDemo />);
    const slider = screen.getByRole("slider", { name: "Utvalgsstørrelse for konfidensintervallene" });
    fireEvent.change(slider, { target: { value: "100" } });
    expect(slider).toHaveAttribute("aria-valuetext", expect.stringContaining("halv intervallbredde 1,18"));
  });

  it("signifikansnivå: større alfa flytter den kritiske z-grensen innover", () => {
    render(<SignifikansnivaDemo />);
    const slider = screen.getByRole("slider", { name: "Signifikansnivå alfa" });
    fireEvent.change(slider, { target: { value: "0.1" } });
    expect(slider).toHaveAttribute("aria-valuetext", expect.stringContaining("1,64"));
  });

  it("t-test: null forskjell gir t null og p én", () => {
    const { container } = render(<TTestDemo />);
    const slider = screen.getByRole("slider", { name: "Forskjell mellom gruppemidlene" });
    fireEvent.change(slider, { target: { value: "0" } });
    let formulas = Array.from(container.querySelectorAll("[data-math-tex]")).map((node) =>
      node.getAttribute("data-math-tex"),
    );
    expect(formulas).toContain("t = 0{,}00");
    expect(formulas).toContain("p = 1{,}000");
    fireEvent.change(slider, { target: { value: "3" } });
    formulas = Array.from(container.querySelectorAll("[data-math-tex]")).map((node) =>
      node.getAttribute("data-math-tex"),
    );
    expect(formulas).not.toContain("t = 0{,}00");
  });

  it("F-test: dobling av spredningen firedobler variansen", () => {
    const { container } = render(<FTestDemo />);
    const slider = screen.getByRole("slider", { name: "Relativ spredning i gruppe B" });
    fireEvent.change(slider, { target: { value: "2" } });
    const formulas = Array.from(container.querySelectorAll("[data-math-tex]")).map((node) =>
      node.getAttribute("data-math-tex"),
    );
    expect(formulas.some((tex) => tex?.endsWith("= 4{,}00"))).toBe(true);
  });

  it("regresjon: flyttet datapunkt endrer tilpasset stigningstall", () => {
    render(<RegresjonDemo />);
    const slider = screen.getByRole("slider", { name: "Høyde på det siste regresjonspunktet" });
    const before = slider.getAttribute("aria-valuetext");
    fireEvent.change(slider, { target: { value: "9" } });
    expect(slider.getAttribute("aria-valuetext")).not.toBe(before);
  });

  it("minste kvadrater: kandidat nær OLS-linjen gir verdict om minimum", () => {
    render(<MinsteKvadraterDemo />);
    const slider = screen.getByRole("slider", { name: "Stigningstall for kandidatlinjen" });
    fireEvent.change(slider, { target: { value: "1" } });
    expect(screen.getByText(/nær minste-kvadraters løsning/)).toBeInTheDocument();
  });

  it("korrelasjon: U-form kan ha Pearsons r lik null", async () => {
    const user = userEvent.setup();
    const { container } = render(<KorrelasjonDemo />);
    await user.click(screen.getByRole("button", { name: "U-formet" }));
    const formulas = Array.from(container.querySelectorAll("[data-math-tex]")).map((node) =>
      node.getAttribute("data-math-tex"),
    );
    expect(formulas).toContain("r = 0{,}000");
    expect(screen.getByText(/tydelig U-formet/)).toBeInTheDocument();
  });
});

describe("statistikkdemoer", () => {
  it.each(demos)("%s har ingen aksefeil", async (_name, element) => {
    const { container } = render(<main>{element}</main>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
