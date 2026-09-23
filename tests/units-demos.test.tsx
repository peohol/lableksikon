import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";

import {
  MasseprosentDemo,
  MolmasseDemo,
  MolaritetDemo,
  PpmDemo,
  SiSystemDemo,
} from "@/demos/UnitsConceptDemos";

const demos = [
  ["SI-enheter", <SiSystemDemo key="a" />],
  ["molmasse", <MolmasseDemo key="b" />],
  ["molaritet", <MolaritetDemo key="c" />],
  ["masseprosent", <MasseprosentDemo key="d" />],
  ["ppm", <PpmDemo key="e" />],
] as const;

const mathTex = (container: HTMLElement) =>
  Array.from(container.querySelectorAll("[data-math-tex]")).map((node) =>
    node.getAttribute("data-math-tex"),
  );

describe("grafiske enhetsdemonstrasjoner", () => {
  it("SI: valg av coulomb viser ampere og sekund i den avledede enheten", async () => {
    const user = userEvent.setup();
    const { container } = render(<SiSystemDemo />);
    const choice = screen.getByRole("button", { name: "C" });
    await user.click(choice);
    expect(choice).toHaveAttribute("aria-pressed", "true");
    expect(mathTex(container)).toContain("\\mathrm{C} = \\mathrm{A}\\,\\mathrm{s}");
  });

  it("molmasse: 0,50 mol ved 40 g/mol gir 20 g", () => {
    const { container } = render(<MolmasseDemo />);
    const slider = screen.getByRole("slider", {
      name: "Stoffmengde i molmasseillustrasjonen",
    });
    fireEvent.change(slider, { target: { value: "0.5" } });
    expect(slider).toHaveAttribute(
      "aria-valuetext",
      expect.stringContaining("masse 20,0 gram"),
    );
    expect(mathTex(container)).toContain("m = nM = 20{,}0\\,\\mathrm{g}");
  });

  it("molaritet: 0,100 mol i 1,00 L gir 0,100 mol/L", () => {
    const { container } = render(<MolaritetDemo />);
    const slider = screen.getByRole("slider", {
      name: "Sluttvolum for stoffmengdekonsentrasjon",
    });
    fireEvent.change(slider, { target: { value: "1" } });
    expect(slider).toHaveAttribute(
      "aria-valuetext",
      expect.stringContaining("konsentrasjon 0,100 mol per liter"),
    );
    expect(mathTex(container)).toContain("c = n/V = 0{,}100\\,\\mathrm{mol/L}");
  });

  it("masseprosent: nevneren følger totalmassen", () => {
    const { container } = render(<MasseprosentDemo />);
    const slider = screen.getByRole("slider", {
      name: "Analyttmasse i masseprosentblandingen",
    });
    fireEvent.change(slider, { target: { value: "20" } });
    expect(slider).toHaveAttribute(
      "aria-valuetext",
      expect.stringContaining("masseprosent 16,67"),
    );
    expect(mathTex(container)).toContain("120{,}0\\,\\mathrm{g}");
    expect(mathTex(container)).toContain("w = 16{,}67\\,\\%");
  });

  it("ppm: zoomstigen ender på 10^-6 og skiller dette fra mg/L", () => {
    const { container } = render(<PpmDemo />);
    expect(
      screen.getByRole("img", {
        name: "Tre zoomnivåer fra én av hundre til én av én million",
      }),
    ).toBeInTheDocument();
    expect(mathTex(container)).toContain("10^{-6}");
    expect(mathTex(container)).toContain(
      "1\\,\\mathrm{mg/L} \\ne 1\\,\\mathrm{ppm}\\ \\text{generelt}",
    );
  });
});

describe("tilgjengelighet i enhetsdemoene", () => {
  it.each(demos)("%s har ingen axe-feil", async (_name, element) => {
    const { container } = render(<main>{element}</main>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
