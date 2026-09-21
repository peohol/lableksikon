import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

const interactiveDemos = [
  ["kalibreringskurve", <KalibreringskurveDemo key="a" />],
  ["kvantifiseringsgrense", <KvantifiseringsgrenseDemo key="b" />],
  ["responsfaktor", <ResponsfaktorDemo key="c" />],
  ["arbeidsområde", <ArbeidsomradeDemo key="d" />],
  ["vektet regresjon", <VektetRegresjonDemo key="e" />],
  ["nullpunkt", <NullpunktDemo key="f" />],
  ["drift", <DriftDemo key="g" />],
  ["matrikstilpasset kalibrering", <MatrikstilpassetKalibreringDemo key="h" />],
] as const;

const mathTex = (container: HTMLElement) =>
  Array.from(container.querySelectorAll("[data-math-tex]")).map((node) =>
    node.getAttribute("data-math-tex"),
  );

describe("interaktive kalibreringsdemoer", () => {
  it("kalibreringskurve: ukjent respons projiseres til estimert nivå", () => {
    const { container } = render(<KalibreringskurveDemo />);
    const slider = screen.getByRole("slider", { name: "Respons for ukjent prøve" });
    fireEvent.change(slider, { target: { value: "100" } });
    expect(slider).toHaveAttribute(
      "aria-valuetext",
      expect.stringContaining("estimert analyttnivå 50,0"),
    );
    expect(mathTex(container)).toContain("\\hat{x} = 50{,}0");
  });

  it("kvantifiseringsgrense: nivå 16 oppfyller det illustrative CV-kravet", () => {
    render(<KvantifiseringsgrenseDemo />);
    const slider = screen.getByRole("slider", {
      name: "Konsentrasjon i LOQ-illustrasjonen",
    });
    fireEvent.change(slider, { target: { value: "16" } });
    expect(slider).toHaveAttribute("aria-valuetext", expect.stringContaining("CV 10,0 prosent"));
    expect(screen.getByText(/presisjonskravet oppfylt/)).toBeInTheDocument();
    fireEvent.change(slider, { target: { value: "9" } });
    expect(screen.getByText(/relative spredningen fortsatt for stor/)).toBeInTheDocument();
  });

  it("responsfaktor: samme mengde gir ulike signaler med fast forhold", () => {
    const { container } = render(<ResponsfaktorDemo />);
    const slider = screen.getByRole("slider", { name: "Analyttmengde for responsfaktor" });
    fireEvent.change(slider, { target: { value: "20" } });
    const formulas = mathTex(container);
    expect(formulas).toContain("y_A = 1000");
    expect(formulas).toContain("y_B = 600");
    expect(screen.getByText(/Forholdet mellom responsfaktorene er 1,67/)).toBeInTheDocument();
  });

  it("arbeidsområde: verdict skifter ved nedre og øvre grense", () => {
    render(<ArbeidsomradeDemo />);
    const slider = screen.getByRole("slider", { name: "Analyttnivå i arbeidsområdet" });
    fireEvent.change(slider, { target: { value: "10" } });
    expect(screen.getByText(/under det illustrerte arbeidsområdet/)).toBeInTheDocument();
    fireEvent.change(slider, { target: { value: "20" } });
    expect(screen.getByText(/ligger i det illustrerte arbeidsområdet/)).toBeInTheDocument();
    fireEvent.change(slider, { target: { value: "100" } });
    expect(screen.getByText(/ligger i det illustrerte arbeidsområdet/)).toBeInTheDocument();
    fireEvent.change(slider, { target: { value: "110" } });
    expect(screen.getByText(/over det illustrerte arbeidsområdet/)).toBeInTheDocument();
  });

  it("vektet regresjon: valg av 1/x² endrer modellen og er et ekte enkeltvalg", async () => {
    const user = userEvent.setup();
    const { container } = render(<VektetRegresjonDemo />);
    const before = mathTex(container);
    const choice = screen.getByRole("button", { name: "1/x²" });
    await user.click(choice);
    expect(choice).toHaveAttribute("aria-pressed", "true");
    expect(mathTex(container)).not.toEqual(before);
  });

  it("nullpunkt: fri og tvunget modell faller sammen når konstantleddet er null", () => {
    render(<NullpunktDemo />);
    const slider = screen.getByRole("slider", {
      name: "Konstantledd i kalibreringsmodellen",
    });
    fireEvent.change(slider, { target: { value: "0" } });
    expect(screen.getByText(/faller den frie modellen sammen/)).toBeInTheDocument();
  });

  it("drift: null drift fjerner den systematiske tidsutviklingen", () => {
    render(<DriftDemo />);
    const slider = screen.getByRole("slider", {
      name: "Drifthastighet gjennom analyseserien",
    });
    fireEvent.change(slider, { target: { value: "0" } });
    expect(screen.getByText(/bare den faste tilfeldige variasjonen igjen/)).toBeInTheDocument();
    fireEvent.change(slider, { target: { value: "1.5" } });
    expect(slider).toHaveAttribute(
      "aria-valuetext",
      expect.stringContaining("total systematisk endring 10,5"),
    );
  });

  it("matrikstilpasset kalibrering: kurvene faller sammen uten slope-effekt", () => {
    render(<MatrikstilpassetKalibreringDemo />);
    const slider = screen.getByRole("slider", {
      name: "Matriksrespons relativt til løsemiddel",
    });
    fireEvent.change(slider, { target: { value: "100" } });
    expect(screen.getByText(/faller kurvene sammen/)).toBeInTheDocument();
    expect(slider).toHaveAttribute(
      "aria-valuetext",
      expect.stringContaining("estimert nivå med løsemiddelkurve 70,0"),
    );
  });
});

describe("grafiske kalibreringsdemoer", () => {
  it.each(interactiveDemos)("%s har ingen axe-feil", async (_name, element) => {
    const { container } = render(<main>{element}</main>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
