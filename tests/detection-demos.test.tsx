import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";

import {
  FidDemo,
  FragmenteringDemo,
  GcmsDemo,
  IoniseringDemo,
  LcmsDemo,
  LedningsevneDemo,
  MasseopplosningDemo,
  MassespektrometriDemo,
  MrmDemo,
  SignalStoyDemo,
  SimDemo,
  UvdetektorDemo,
} from "@/demos/DetectionConceptDemos";

const demos = [
  ["signal-støy-forhold", <SignalStoyDemo key="a" />],
  ["massespektrometri", <MassespektrometriDemo key="b" />],
  ["ionisering", <IoniseringDemo key="c" />],
  ["fragmentering", <FragmenteringDemo key="d" />],
  ["SIM", <SimDemo key="e" />],
  ["MRM", <MrmDemo key="f" />],
  ["masseoppløsning", <MasseopplosningDemo key="g" />],
  ["LC-MS", <LcmsDemo key="h" />],
  ["GC-MS", <GcmsDemo key="i" />],
  ["UV-detektor", <UvdetektorDemo key="j" />],
  ["FID", <FidDemo key="k" />],
  ["ledningsevne", <LedningsevneDemo key="l" />],
] as const;

const mathTex = (container: HTMLElement) =>
  Array.from(container.querySelectorAll("[data-math-tex]")).map((node) =>
    node.getAttribute("data-math-tex"),
  );

describe("grafiske deteksjonsdemoer", () => {
  it("signal/støy: høyere støy gir lavere illustrert S/N", () => {
    render(<SignalStoyDemo />);
    const slider = screen.getByRole("slider", { name: "Støyamplitude i signaltracen" });
    fireEvent.change(slider, { target: { value: "30" } });
    expect(slider).toHaveAttribute(
      "aria-valuetext",
      expect.stringContaining("signal-støy-forhold 3,0"),
    );
    expect(screen.getByText(/lite fremtredende mot den illustrerte støyen/)).toBeInTheDocument();
  });

  it("massespektrometri: instrumenttrinn kan utforskes direkte", async () => {
    const user = userEvent.setup();
    render(<MassespektrometriDemo />);
    await user.click(screen.getByRole("button", { name: "Spektrum" }));
    expect(screen.getByRole("button", { name: "Spektrum" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText(/Signalintensitet vises mot masse-til-ladning/)).toBeInTheDocument();
  });

  it("ionisering: negativ modus oppdaterer eksempelionet", async () => {
    const user = userEvent.setup();
    const { container } = render(<IoniseringDemo />);
    await user.click(screen.getByRole("button", { name: "Negativ" }));
    expect(mathTex(container)).toContain("[M-H]^-");
  });

  it("fragmentering: høy illustrativ energi gjør produkt 182 mest intenst", () => {
    render(<FragmenteringDemo />);
    const slider = screen.getByRole("slider", { name: "Illustrativ kollisjonsenergi" });
    fireEvent.change(slider, { target: { value: "50" } });
    expect(slider).toHaveAttribute(
      "aria-valuetext",
      expect.stringContaining("mest intens topp masse-til-ladning 182"),
    );
  });

  it("SIM: målrettet modus oppgir bare de monitorerte ionene", async () => {
    const user = userEvent.setup();
    const { container } = render(<SimDemo />);
    await user.click(screen.getByRole("button", { name: "SIM" }));
    expect(mathTex(container)).toContain("m/z = 121,\\ 165,\\ 193");
    expect(screen.getByText(/Bare de tre valgte signalene fremheves/)).toBeInTheDocument();
  });

  it("MRM: produktvalget endrer hele overgangsavlesningen", async () => {
    const user = userEvent.setup();
    const { container } = render(<MrmDemo />);
    await user.click(screen.getByRole("button", { name: "Produkt 154" }));
    expect(mathTex(container)).toContain("300 \\rightarrow 154");
    expect(mathTex(container)).toContain("m/z = 154");
  });

  it("masseoppløsning: bredde 0,010 gir resolving power 50 000", () => {
    const { container } = render(<MasseopplosningDemo />);
    const slider = screen.getByRole("slider", {
      name: "Massetoppens bredde ved halv høyde",
    });
    fireEvent.change(slider, { target: { value: "0.01" } });
    expect(slider).toHaveAttribute(
      "aria-valuetext",
      expect.stringContaining("resolving power omtrent 50000"),
    );
    expect(mathTex(container)).toContain("\\Delta m = 0{,}010");
    expect(mathTex(container)).toContain("m/\\Delta m \\approx 50000");
    expect(screen.getByTestId("mass-resolution-signal")).toBeInTheDocument();
    expect(container.querySelectorAll("[data-testid='mass-resolution-signal']")).toHaveLength(1);
  });

  it("LC-MS: valgt kromatografisk topp oppdaterer spektral avlesning", async () => {
    const user = userEvent.setup();
    const { container } = render(<LcmsDemo />);
    const choice = screen.getByRole("button", { name: "Topp B" });
    await user.click(choice);
    expect(choice).toHaveAttribute("aria-pressed", "true");
    expect(mathTex(container)).toContain("m/z = 356");
  });

  it("GC-MS: valgt GC-topp har et annet base peak", async () => {
    const user = userEvent.setup();
    const { container } = render(<GcmsDemo />);
    await user.click(screen.getByRole("button", { name: "Topp B" }));
    expect(mathTex(container)).toContain("m/z = 91");
  });

  it("UV-detektor: ti prosent transmisjon gir absorbans én", () => {
    const { container } = render(<UvdetektorDemo />);
    const slider = screen.getByRole("slider", { name: "Transmisjon gjennom UV-cellen" });
    fireEvent.change(slider, { target: { value: "10" } });
    expect(slider).toHaveAttribute("aria-valuetext", expect.stringContaining("absorbans 1,000"));
    expect(mathTex(container)).toContain("A = -\\log_{10}(T) = 1{,}000");
  });

  it("FID: større illustrert analyttmengde øker signalet", () => {
    render(<FidDemo />);
    const slider = screen.getByRole("slider", {
      name: "Illustrert analyttmengde inn i FID-flammen",
    });
    fireEvent.change(slider, { target: { value: "10" } });
    expect(slider).toHaveAttribute("aria-valuetext", expect.stringContaining("relativt signal 120"));
  });

  it("ledningsevne: samme analyttbidrag blir 50 prosent av bakgrunnen ved nivå 7", () => {
    render(<LedningsevneDemo />);
    const slider = screen.getByRole("slider", { name: "Bakgrunnsledningsevne" });
    fireEvent.change(slider, { target: { value: "7" } });
    expect(slider).toHaveAttribute(
      "aria-valuetext",
      expect.stringContaining("relativ analyttøkning 50 prosent"),
    );
  });
});

describe("tilgjengelighet i deteksjonsdemoene", () => {
  it.each(demos)("%s har ingen axe-feil", async (_name, element) => {
    const { container } = render(<main>{element}</main>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
