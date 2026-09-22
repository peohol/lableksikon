import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";

import {
  DelproveDemo,
  EkstraksjonDemo,
  FiltreringDemo,
  FortynningDemo,
  FortynningsfaktorDemo,
  HomogeniseringDemo,
  OppkonsentreringDemo,
  OppslutningDemo,
  ProvemengdeDemo,
  RepresentativDemo,
} from "@/demos/SamplePreparationConceptDemos";

const demos = [
  ["representativ prøve", <RepresentativDemo key="a" />],
  ["delprøve", <DelproveDemo key="b" />],
  ["homogenisering", <HomogeniseringDemo key="c" />],
  ["ekstraksjon", <EkstraksjonDemo key="d" />],
  ["oppkonsentrering", <OppkonsentreringDemo key="e" />],
  ["fortynning", <FortynningDemo key="f" />],
  ["fortynningsfaktor", <FortynningsfaktorDemo key="g" />],
  ["filtrering", <FiltreringDemo key="h" />],
  ["oppslutning", <OppslutningDemo key="i" />],
  ["prøvemengde", <ProvemengdeDemo key="j" />],
] as const;

const mathTex = (container: HTMLElement) =>
  Array.from(container.querySelectorAll("[data-math-tex]")).map((node) =>
    node.getAttribute("data-math-tex"),
  );

describe("grafiske demoer for prøvetaking og opparbeiding", () => {
  it("representativ prøve: fordelt uttak gir en egen valgt tilstand", async () => {
    const user = userEvent.setup();
    render(<RepresentativDemo />);
    const choice = screen.getByRole("button", { name: "Fordelt uttak" });
    await user.click(choice);
    expect(choice).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText(/fanger flere deler av den illustrerte heterogeniteten/)).toBeInTheDocument();
  });

  it("delprøve: viser prøvereduksjonen grafisk og navngitt", () => {
    render(<DelproveDemo />);
    expect(
      screen.getByRole("img", {
        name: /Tre beholdere med gradvis mindre prøvemengde/,
      }),
    ).toBeInTheDocument();
  });

  it("homogenisering: full blanding gir samme verdi i alle fire delprøver", () => {
    const { container } = render(<HomogeniseringDemo />);
    const slider = screen.getByRole("slider", {
      name: "Homogeniseringsgrad i illustrasjonen",
    });
    fireEvent.change(slider, { target: { value: "100" } });
    expect(slider).toHaveAttribute(
      "aria-valuetext",
      expect.stringContaining("spenn mellom delprøver 0,0"),
    );
    expect(mathTex(container).filter((value) => value === "10{,}0")).toHaveLength(4);
  });

  it("ekstraksjon: 100 prosent flytter hele den illustrerte analytten til ekstraktet", () => {
    const { container } = render(<EkstraksjonDemo />);
    const slider = screen.getByRole("slider", {
      name: "Illustrert ekstraksjonsgjenvinning",
    });
    fireEvent.change(slider, { target: { value: "100" } });
    expect(slider).toHaveAttribute(
      "aria-valuetext",
      expect.stringContaining("igjen 0 prosent"),
    );
    expect(mathTex(container)).toContain("100\\,\\%");
    expect(mathTex(container)).toContain("0\\,\\%");
  });

  it("oppkonsentrering: 10 ng i 1 mL gir 10 ng/mL", () => {
    const { container } = render(<OppkonsentreringDemo />);
    const slider = screen.getByRole("slider", {
      name: "Sluttvolum ved oppkonsentrering",
    });
    fireEvent.change(slider, { target: { value: "1" } });
    expect(slider).toHaveAttribute(
      "aria-valuetext",
      expect.stringContaining("konsentrasjon 10,00 nanogram per milliliter"),
    );
    expect(mathTex(container)).toContain("c = m/V = 10{,}00\\,\\mathrm{ng/mL}");
  });

  it("fortynning: sluttvolum 20 mL gir faktor 20 og 5 µg/mL", () => {
    const { container } = render(<FortynningDemo />);
    const slider = screen.getByRole("slider", { name: "Sluttvolum ved fortynning" });
    fireEvent.change(slider, { target: { value: "20" } });
    expect(slider).toHaveAttribute(
      "aria-valuetext",
      expect.stringContaining("ny konsentrasjon 5,0"),
    );
    expect(mathTex(container)).toContain("F = 20{,}0");
    expect(mathTex(container)).toContain("c_2 = 5{,}0\\,\\mu\\mathrm{g/mL}");
  });

  it("fortynningsfaktor: 1 mL til 20 mL gir faktor 20 og 60 mg/L tilbakeberegnet", () => {
    const { container } = render(<FortynningsfaktorDemo />);
    const slider = screen.getByRole("slider", {
      name: "Aliquotvolum for fortynningsfaktoren",
    });
    fireEvent.change(slider, { target: { value: "1" } });
    expect(slider).toHaveAttribute(
      "aria-valuetext",
      expect.stringContaining("opprinnelig konsentrasjon 60,0"),
    );
    expect(mathTex(container)).toContain("F = V_2/V_1 = 20{,}00");
    expect(mathTex(container)).toContain("c_0 = 3{,}0F = 60{,}0\\,\\mathrm{mg/L}");
  });

  it("filtrering: partikkelbundet analytt gir eksplisitt tapsadvarsel", async () => {
    const user = userEvent.setup();
    render(<FiltreringDemo />);
    const choice = screen.getByRole("button", { name: "Partikkelbundet" });
    await user.click(choice);
    expect(choice).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText(/holdes nå tilbake sammen med partiklene/)).toBeInTheDocument();
  });

  it("oppslutning: full illustrert oppslutning etterlater ingen faste fragmenter", () => {
    const { container } = render(<OppslutningDemo />);
    const slider = screen.getByRole("slider", {
      name: "Oppslutningsgrad i illustrasjonen",
    });
    fireEvent.change(slider, { target: { value: "100" } });
    expect(slider).toHaveAttribute(
      "aria-valuetext",
      expect.stringContaining("faste matriksfragmenter 0"),
    );
    expect(mathTex(container)).toContain("100\\,\\%");
  });

  it("prøvemengde: 40 partikler viser forventet 1/sqrt(n)-skala", () => {
    const { container } = render(<ProvemengdeDemo />);
    const slider = screen.getByRole("slider", {
      name: "Prøvemengde målt som antall illustrerte partikler",
    });
    fireEvent.change(slider, { target: { value: "40" } });
    expect(slider).toHaveAttribute(
      "aria-valuetext",
      expect.stringContaining("15,8 prosent"),
    );
    expect(mathTex(container)).toContain("100/\\sqrt{n} = 15{,}8\\,\\%");
  });
});

describe("tilgjengelighet i prøvetakings- og opparbeidingsdemoene", () => {
  it.each(demos)("%s har ingen axe-feil", async (_name, element) => {
    const { container } = render(<main>{element}</main>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
