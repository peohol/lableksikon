import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";

import {
  SporbarhetDemo,
  ValideringDemo,
  VerifiseringDemo,
} from "@/demos/QualityConceptDemos";
import {
  EttpunktskalibreringDemo,
  EksternKalibreringDemo,
  KontrollproveDemo,
} from "@/demos/CalibrationConceptDemos";
import {
  KontamineringDemo,
  MatriksblankDemo,
} from "@/demos/SampleConceptDemos";

const demos = [
  ["sporbarhet", <SporbarhetDemo key="a" />],
  ["validering", <ValideringDemo key="b" />],
  ["verifisering", <VerifiseringDemo key="c" />],
  ["ettpunktskalibrering", <EttpunktskalibreringDemo key="d" />],
  ["ekstern kalibrering", <EksternKalibreringDemo key="e" />],
  ["kontrollprøve", <KontrollproveDemo key="f" />],
  ["matriksblank", <MatriksblankDemo key="g" />],
  ["kontaminering", <KontamineringDemo key="h" />],
] as const;

const mathTex = (container: HTMLElement) =>
  Array.from(container.querySelectorAll("[data-math-tex]")).map((node) =>
    node.getAttribute("data-math-tex"),
  );

describe("gjenværende grafiske demonstrasjoner", () => {
  it("sporbarhet: valgt ledd viser sin rolle i kjeden", async () => {
    const user = userEvent.setup();
    render(<SporbarhetDemo />);
    const choice = screen.getByRole("button", { name: "Definert referanse" });
    await user.click(choice);
    expect(choice).toHaveAttribute("aria-pressed", "true");
    expect(
      screen.getByText(/Kjeden ender i en angitt metrologisk referanse/),
    ).toBeInTheDocument();
    const chain = screen.getByRole("list", { name: "Metrologisk sporbarhetskjede" });
    expect(within(chain).getAllByRole("listitem")).toHaveLength(4);
  });

  it("validering: flyten består av fire strukturerte trinn", () => {
    render(<ValideringDemo />);
    const flow = screen.getByRole("list", {
      name: "Valideringsflyt fra tiltenkt bruk via ytelseskrav og evidens til konklusjon",
    });
    expect(within(flow).getAllByRole("listitem")).toHaveLength(4);
    expect(within(flow).getByText("Tiltenkt bruk")).toBeInTheDocument();
    expect(within(flow).getByText("Konklusjon")).toBeInTheDocument();
  });

  it("verifisering: lokale resultater viser både oppfylt og ikke oppfylt", () => {
    render(<VerifiseringDemo />);
    expect(screen.getAllByText("oppfylt")).toHaveLength(2);
    expect(screen.getByText("ikke oppfylt")).toBeInTheDocument();
    expect(screen.getByText(/Øvre nivå faller utenfor kravet/)).toBeInTheDocument();
  });

  it("ettpunktskalibrering: ukjent modellform viser flere mulige modeller", async () => {
    const user = userEvent.setup();
    render(<EttpunktskalibreringDemo />);
    const choice = screen.getByRole("button", { name: "Modellform ikke fastlagt" });
    await user.click(choice);
    expect(choice).toHaveAttribute("aria-pressed", "true");
    expect(
      screen.getByText(/Ett punkt kan derfor ikke alene fastsette både stigningstall og konstantledd/),
    ).toBeInTheDocument();
  });

  it("ekstern kalibrering: 60 prosent prøverespons gir 40 prosent negativ skjevhet", () => {
    const { container } = render(<EksternKalibreringDemo />);
    const slider = screen.getByRole("slider", {
      name: "Prøverespons relativt til ekstern kalibrator",
    });
    fireEvent.change(slider, { target: { value: "60" } });
    expect(slider).toHaveAttribute(
      "aria-valuetext",
      expect.stringContaining("estimert nivå 36,0"),
    );
    expect(mathTex(container)).toContain("\\hat{x} = 36{,}0");
    expect(mathTex(container)).toContain("-40{,}0\\,\\%");
  });

  it("kontrollprøve: kontroll utenfor fast område utløser advarsel", () => {
    render(<KontrollproveDemo />);
    const slider = screen.getByRole("slider", {
      name: "Forskyvning av siste kontrollprøve",
    });
    fireEvent.change(slider, { target: { value: "6" } });
    expect(slider).toHaveAttribute(
      "aria-valuetext",
      expect.stringContaining("utenfor kontrollkravet"),
    );
    expect(screen.getByText(/bør ikke ukritisk godtas/)).toBeInTheDocument();
  });

  it("matriksblank: tre signalspor gjør matriksbidraget synlig", () => {
    render(<MatriksblankDemo />);
    expect(screen.getByText("Løsemiddelblank")).toBeInTheDocument();
    expect(screen.getByText("Matriksblank")).toBeInTheDocument();
    expect(screen.getByText("Prøve")).toBeInTheDocument();
    expect(screen.getByText("Matriksrelatert topp")).toBeInTheDocument();
  });

  it("kontaminering: opparbeidingskilde rammer metodeblank og prøve, ikke reagensblank", async () => {
    const user = userEvent.setup();
    render(<KontamineringDemo />);
    await user.click(screen.getByRole("button", { name: "Under opparbeiding" }));
    const matrix = screen.getByRole("list", {
      name: "Hvilke materialer som viser kontamineringssignalet",
    });
    const reagent = within(matrix).getByText("Reagensblank").parentElement;
    const method = within(matrix).getByText("Metodeblank").parentElement;
    const sample = within(matrix).getByText("Prøve").parentElement;
    expect(reagent).not.toBeNull();
    expect(method).not.toBeNull();
    expect(sample).not.toBeNull();
    expect(within(reagent as HTMLElement).getByText("ingen bidrag")).toBeInTheDocument();
    expect(within(method as HTMLElement).getByText("signal")).toBeInTheDocument();
    expect(within(sample as HTMLElement).getByText("signal")).toBeInTheDocument();
  });
});

describe("tilgjengelighet i gjenværende visuelle demoer", () => {
  it.each(demos)("%s har ingen axe-feil", async (_name, element) => {
    const { container } = render(<main>{element}</main>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
