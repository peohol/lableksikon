import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";

import {
  AkkrediteringDemo,
  AvviksbehandlingDemo,
  InternkontrollDemo,
  RevisjonssporDemo,
  RingtestDemo,
  SrmDemo,
  StandardmetodeDemo,
} from "@/demos/QualityAssuranceConceptDemos";

const demos = [
  ["akkreditering", <AkkrediteringDemo key="a" />],
  ["ringtest", <RingtestDemo key="b" />],
  ["sertifisert referansemateriale", <SrmDemo key="c" />],
  ["standardmetode", <StandardmetodeDemo key="d" />],
  ["avviksbehandling", <AvviksbehandlingDemo key="e" />],
  ["internkontroll", <InternkontrollDemo key="f" />],
  ["revisjonsspor", <RevisjonssporDemo key="g" />],
] as const;

const mathTex = (container: HTMLElement) =>
  Array.from(container.querySelectorAll("[data-math-tex]")).map((node) =>
    node.getAttribute("data-math-tex"),
  );

describe("grafiske kvalitetssikringsdemonstrasjoner", () => {
  it("akkreditering: aktivitet utenfor omfanget gir eksplisitt avgrensning", async () => {
    const user = userEvent.setup();
    render(<AkkrediteringDemo />);
    const choice = screen.getByRole("button", { name: "Utenfor omfanget" });
    await user.click(choice);
    expect(choice).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText(/kan derfor ikke uten videre brukes som påstand/)).toBeInTheDocument();
  });

  it("ringtest: resultat 108 gir z = 4", () => {
    const { container } = render(<RingtestDemo />);
    const slider = screen.getByRole("slider", {
      name: "Laboratoriets resultat i kompetanseprøvingen",
    });
    fireEvent.change(slider, { target: { value: "108" } });
    expect(slider).toHaveAttribute("aria-valuetext", expect.stringContaining("z-skår 4,00"));
    expect(mathTex(container)).toContain("z = (x-x_a)/\\sigma_{pt} = 4{,}00");
    expect(screen.getByText(/utenfor \|z\| = 3/)).toBeInTheDocument();
  });

  it("ringtest: grenseverdien z = 3 krever oppfølging og deltakerfordelingen er tilgjengelig", () => {
    render(<RingtestDemo />);
    const slider = screen.getByRole("slider", {
      name: "Laboratoriets resultat i kompetanseprøvingen",
    });
    fireEvent.change(slider, { target: { value: "106" } });
    expect(screen.getByText(/ved eller utenfor \|z\| = 3/)).toBeInTheDocument();
    expect(screen.getByText("95,8 · 97,5 · 98,9 · 99,6 · 100,5 · 101,2 · 102,7 · 104,1")).toBeInTheDocument();
  });

  it("CRM: sporbarhetsfeltet forklarer referansen til sertifisert verdi", async () => {
    const user = userEvent.setup();
    render(<SrmDemo />);
    const choice = screen.getByRole("button", { name: "Sporbarhet" });
    await user.click(choice);
    expect(choice).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText(/referansen som den sertifiserte verdien er sporbar til/)).toBeInTheDocument();
  });

  it("standardmetode: prosessen er en navngitt grafisk illustrasjon", () => {
    render(<StandardmetodeDemo />);
    expect(
      screen.getByRole("img", {
        name: /Tre trinn fra publisert standard via lokal verifisering/,
      }),
    ).toBeInTheDocument();
  });

  it("avviksbehandling: årsaksrettet spor inkluderer effektkontroll", async () => {
    const user = userEvent.setup();
    render(<AvviksbehandlingDemo />);
    const choice = screen.getByRole("button", {
      name: "Årsak + tiltak + effektkontroll",
    });
    await user.click(choice);
    expect(choice).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText(/kontroll av om tiltaket faktisk virker/)).toBeInTheDocument();
  });

  it("internkontroll: blank er direkte relevant i kontamineringsscenarioet", async () => {
    const user = userEvent.setup();
    render(<InternkontrollDemo />);
    await user.click(screen.getByRole("button", { name: "Kontaminering" }));
    const matrix = screen.getByRole("list", {
      name: "Kontrolltyper og respons på valgt feilscenario",
    });
    const blank = within(matrix).getByText("Blank").parentElement;
    expect(blank).not.toBeNull();
    expect(within(blank as HTMLElement).getByText("treffer")).toBeInTheDocument();
  });

  it("revisjonsspor: tre endringer bevarer fire versjoner", () => {
    const { container } = render(<RevisjonssporDemo />);
    const slider = screen.getByRole("slider", {
      name: "Antall endringer i revisjonssporet",
    });
    fireEvent.change(slider, { target: { value: "3" } });
    expect(slider).toHaveAttribute(
      "aria-valuetext",
      expect.stringContaining("bevarte versjoner 4"),
    );
    expect(mathTex(container)).toContain("4");
    const history = screen.getByRole("list", { name: "Bevarte versjoner i revisjonssporet" });
    expect(within(history).getAllByRole("listitem")).toHaveLength(4);
    expect(within(history).getByText("v1")).toBeInTheDocument();
    expect(within(history).getByText("v4")).toBeInTheDocument();
    expect(within(history).getByText("Analytiker A · 09:14")).toBeInTheDocument();
    expect(within(history).getByText("Fagansvarlig · 10:21")).toBeInTheDocument();
    expect(screen.getAllByText("12,8").length).toBeGreaterThan(0);
  });
});

describe("tilgjengelighet i kvalitetssikringsdemoene", () => {
  it.each(demos)("%s har ingen axe-feil", async (_name, element) => {
    const { container } = render(<main>{element}</main>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
