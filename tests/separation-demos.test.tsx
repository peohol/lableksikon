import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";

import {
  DodvolumDemo,
  ElueringsrekkefolgeDemo,
  GradientDemo,
  HaledannelseDemo,
  InjeksjonsvolumDemo,
  IsokratiskDemo,
  MobilfaseDemo,
  PlatetallDemo,
  RetensjonstidDemo,
  SeparasjonsfaktorDemo,
  StasjonarfaseDemo,
  ToppbreddeDemo,
} from "@/demos/SeparationConceptDemos";

const demos = [
  ["mobilfase", <MobilfaseDemo key="a" />],
  ["stasjonærfase", <StasjonarfaseDemo key="b" />],
  ["retensjonstid", <RetensjonstidDemo key="c" />],
  ["gradienteluering", <GradientDemo key="d" />],
  ["isokratisk eluering", <IsokratiskDemo key="e" />],
  ["elueringsrekkefølge", <ElueringsrekkefolgeDemo key="f" />],
  ["toppbredde", <ToppbreddeDemo key="g" />],
  ["haledannelse", <HaledannelseDemo key="h" />],
  ["platetall", <PlatetallDemo key="i" />],
  ["separasjonsfaktor", <SeparasjonsfaktorDemo key="j" />],
  ["dødvolum", <DodvolumDemo key="k" />],
  ["injeksjonsvolum", <InjeksjonsvolumDemo key="l" />],
] as const;

const mathTex = (container: HTMLElement) =>
  Array.from(container.querySelectorAll("[data-math-tex]")).map((node) =>
    node.getAttribute("data-math-tex"),
  );

describe("grafiske separasjonsdemoer", () => {
  it("mobilfase: kromatografitypen bytter fysisk transportfase", async () => {
    const user = userEvent.setup();
    render(<MobilfaseDemo />);
    await user.click(screen.getByRole("button", { name: "GC" }));
    expect(screen.getByText("gass / bæregass")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "GC" })).toHaveAttribute("aria-pressed", "true");
  });

  it("stasjonærfase: uten relativ interaksjonsforskjell beveger sonene seg like langt", () => {
    render(<StasjonarfaseDemo />);
    const slider = screen.getByRole("slider", {
      name: "Relativ vekselvirkning med stasjonærfasen for stoff B",
    });
    fireEvent.change(slider, { target: { value: "0" } });
    expect(screen.getByText(/beveger A og B seg like langt/)).toBeInTheDocument();
  });

  it("retensjonstid: justert tid følger toppmaksimum minus hold-up-tid", () => {
    const { container } = render(<RetensjonstidDemo />);
    const slider = screen.getByRole("slider", { name: "Retensjonstid for analytttoppen" });
    fireEvent.change(slider, { target: { value: "3" } });
    expect(slider).toHaveAttribute(
      "aria-valuetext",
      expect.stringContaining("justert retensjonstid 2,40 minutter"),
    );
    expect(mathTex(container)).toContain("t'_R = 2{,}40\\,\\mathrm{min}");
  });

  it("gradient: sluttstyrken kan økes uten å endre startverdien", () => {
    const { container } = render(<GradientDemo />);
    const slider = screen.getByRole("slider", {
      name: "Andel sterk komponent ved slutten av gradienten",
    });
    fireEvent.change(slider, { target: { value: "90" } });
    expect(slider).toHaveAttribute(
      "aria-valuetext",
      expect.stringContaining("90 prosent"),
    );
    expect(mathTex(container)).toContain("10\\,\\%");
    expect(mathTex(container)).toContain("90\\,\\%");
  });

  it("elueringsrekkefølge: B og C kan bytte plass", () => {
    render(<ElueringsrekkefolgeDemo />);
    const slider = screen.getByRole("slider", {
      name: "Relativ selektivitet mellom stoff B og C",
    });
    fireEvent.change(slider, { target: { value: "65" } });
    expect(screen.getByText("A → C → B")).toBeInTheDocument();
    fireEvent.change(slider, { target: { value: "-65" } });
    expect(screen.getByText("A → B → C")).toBeInTheDocument();
  });

  it("toppbredde: valgt bredde vises med MathJax", () => {
    const { container } = render(<ToppbreddeDemo />);
    const slider = screen.getByRole("slider", {
      name: "Bredde ved halv høyde for kromatografisk topp",
    });
    fireEvent.change(slider, { target: { value: "60" } });
    expect(mathTex(container)).toContain("w_h = 0{,}60\\,\\mathrm{min}");
  });

  it("haledannelse: null hale gir symmetrisk topp", () => {
    render(<HaledannelseDemo />);
    const slider = screen.getByRole("slider", { name: "Grad av haledannelse" });
    fireEvent.change(slider, { target: { value: "0" } });
    expect(screen.getByText(/Hovedtoppen er symmetrisk/)).toBeInTheDocument();
  });

  it("platetall: halvert basisbredde firedobler N i eksemplet", () => {
    const { container } = render(<PlatetallDemo />);
    const slider = screen.getByRole("slider", {
      name: "Basisbredde for platetallsillustrasjonen",
    });
    fireEvent.change(slider, { target: { value: "0.25" } });
    expect(slider).toHaveAttribute(
      "aria-valuetext",
      expect.stringContaining("platetall 6400"),
    );
    expect(mathTex(container)).toContain("N = 16(t_R/w_b)^2 = 6400");
  });

  it("separasjonsfaktor: alfa flytter den andre retensjonsfaktoren", () => {
    const { container } = render(<SeparasjonsfaktorDemo />);
    const slider = screen.getByRole("slider", { name: "Separasjonsfaktor alfa" });
    fireEvent.change(slider, { target: { value: "1.5" } });
    expect(mathTex(container)).toContain("k_2 = 3{,}00");
    expect(mathTex(container)).toContain("\\alpha = k_2/k_1 = 1{,}50");
  });

  it("dødvolum: valg skiller hold-up-volum fra ekstrakolonnevolum", async () => {
    const user = userEvent.setup();
    render(<DodvolumDemo />);
    await user.click(screen.getByRole("button", { name: "Ekstrakolonnevolum" }));
    expect(screen.getByText(/slanger, injektorforbindelser og detektorvolum/i)).toBeInTheDocument();
  });

  it("injeksjonsvolum: stor prøveplugg gir eksplisitt overlastadvarsel", () => {
    render(<InjeksjonsvolumDemo />);
    const slider = screen.getByRole("slider", { name: "Injeksjonsvolum" });
    fireEvent.change(slider, { target: { value: "20" } });
    expect(screen.getByText(/tydelig båndspredning/)).toBeInTheDocument();
  });

  it("isokratisk eluering er en faktisk navngitt grafisk illustrasjon", () => {
    render(<IsokratiskDemo />);
    expect(
      screen.getByRole("img", {
        name: /Flat mobilfasesammensetning over tid og tre kromatografiske topper/,
      }),
    ).toBeInTheDocument();
  });
});

describe("tilgjengelighet i separasjonsdemoene", () => {
  it.each(demos)("%s har ingen axe-feil", async (_name, element) => {
    const { container } = render(<main>{element}</main>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
