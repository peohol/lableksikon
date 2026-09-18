import { describe, expect, it } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";

import DeteksjonsgrenseStoy from "@/demos/DeteksjonsgrenseStoy";
import InternstandardForhold from "@/demos/InternstandardForhold";
import LinearitetKurve from "@/demos/LinearitetKurve";
import MatriseeffektMatrikser from "@/demos/MatriseeffektMatrikser";
import PresisjonSpredning from "@/demos/PresisjonSpredning";
import StandardaddisjonSteg from "@/demos/StandardaddisjonSteg";
import Usikkerhetsbudsjett from "@/demos/Usikkerhetsbudsjett";
import BlindproveTyper from "@/demos/BlindproveTyper";
import RiktighetSkiver from "@/demos/RiktighetSkiver";
import StandardavvikFormel from "@/demos/StandardavvikFormel";
import OpplosningTopper from "@/demos/OpplosningTopper";
import StandardavvikFormelDemo, { MEASUREMENTS } from "@/demos/StandardavvikFormel";
import {
  comma,
  fitLine,
  mean,
  relativeStandardDeviation,
  sampleStandardDeviation,
} from "@/lib/statistics";

describe("regnefunksjoner", () => {
  it("regner ut gjennomsnitt, utvalgsstandardavvik og RSD", () => {
    const values = [10.2, 10.4, 10.1, 10.5, 10.3, 10.3];
    expect(mean(values)).toBeCloseTo(10.3, 10);
    expect(sampleStandardDeviation(values)).toBeCloseTo(0.1414213562, 8);
    expect(relativeStandardDeviation(values)).toBeCloseTo(1.3730229, 6);
  });

  it("bruker n − 1, ikke n", () => {
    // Populasjonsvarianten ville gitt 0,129 for den samme serien.
    expect(sampleStandardDeviation([10.2, 10.4, 10.1, 10.5, 10.3, 10.3])).toBeGreaterThan(0.13);
  });

  it("tilpasser en rett linje uten avvik", () => {
    const fit = fitLine([0, 1, 2, 3]);
    expect(fit.slope).toBeCloseTo(1);
    expect(fit.r2).toBeCloseTo(1);
  });

  it("gir lavere R² når punktene bøyer av", () => {
    expect(fitLine([0, 1, 2, 2.2]).r2).toBeLessThan(1);
  });
});

describe("interaktive demonstrasjoner", () => {
  it("presisjon: slideren endrer RSD og verdict", () => {
    render(<PresisjonSpredning />);
    const slider = screen.getByRole("slider", { name: "Spredning mellom målingene" });
    // Native input[type=range]: tastaturbetjening kommer fra plattformen.
    expect(slider).toHaveAttribute("type", "range");
    expect(slider).toHaveAttribute("aria-valuetext", expect.stringContaining("RSD"));
    expect(screen.getByText(/Akseptabel presisjon/)).toBeInTheDocument();
    fireEvent.change(slider, { target: { value: "0" } });
    expect(screen.getByText(/svært presise/)).toBeInTheDocument();
    fireEvent.change(slider, { target: { value: "100" } });
    expect(screen.getByText(/For dårlig presisjon/)).toBeInTheDocument();
  });

  it("deteksjonsgrense: verdict skifter når S/N faller under 3", () => {
    render(<DeteksjonsgrenseStoy />);
    const slider = screen.getByRole("slider", { name: "Støynivå i bakgrunnen" });
    fireEvent.change(slider, { target: { value: "0" } });
    expect(screen.getByText(/godt over støyen/)).toBeInTheDocument();
    fireEvent.change(slider, { target: { value: "100" } });
    expect(screen.getByText(/Under grensa/)).toBeInTheDocument();
  });

  it("usikkerhet: chips har aria-pressed og endrer intervallet", async () => {
    const user = userEvent.setup();
    render(<Usikkerhetsbudsjett />);
    const chip = screen.getByRole("button", { name: /Opparbeiding/ });
    expect(chip).toHaveAttribute("aria-pressed", "false");
    await user.click(chip);
    expect(chip).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText(/utvidet usikkerhet, k = 2/)).toBeInTheDocument();
  });

  it("usikkerhet: alle tre konklusjonene kan faktisk nås", async () => {
    const user = userEvent.setup();
    render(<Usikkerhetsbudsjett />);
    const chip = (name: RegExp) => screen.getByRole("button", { name });

    // Utgangstilstand: intervallet ligger trygt under grenseverdien.
    expect(screen.getByText(/Hele intervallet ligger under/)).toBeInTheDocument();

    // Med opparbeidingen med krysser intervallet grensa.
    await user.click(chip(/Opparbeiding/));
    expect(screen.getByText(/krysser grenseverdien/)).toBeInTheDocument();

    // Det minste bidraget endrer ikke konklusjonen — poenget med kvadratisk sum.
    await user.click(chip(/Temperatur/));
    expect(screen.getByText(/krysser grenseverdien/)).toBeInTheDocument();

    // Uten bidrag i det hele tatt finnes ingen slark.
    await user.click(chip(/Opparbeiding/));
    await user.click(chip(/Temperatur/));
    await user.click(chip(/Repeterbarhet/));
    await user.click(chip(/Kalibreringskurve/));
    expect(screen.getByText(/et punkt uten slark/)).toBeInTheDocument();
  });

  it("internstandard: før og etter endrer signalene, men ikke forholdet", async () => {
    const user = userEvent.setup();
    render(<InternstandardForhold />);
    expect(screen.getByText(/620 enheter/)).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /Søl bort 30 %/ }));
    expect(screen.getByText(/434 enheter/)).toBeInTheDocument();
    expect(screen.getByText("0,72")).toBeInTheDocument();
    expect(screen.getByText(/Tapet er regnet bort/)).toBeInTheDocument();
  });

  it("matriseeffekt: enkeltvalg bytter matriks", async () => {
    const user = userEvent.setup();
    render(<MatriseeffektMatrikser />);
    const group = screen.getByRole("group", { name: "Velg matriks" });
    await user.click(within(group).getByRole("button", { name: "Blodplasma" }));
    expect(within(group).getByRole("button", { name: "Blodplasma" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByText("62 %")).toBeInTheDocument();
    expect(screen.getByText("38 % for lavt")).toBeInTheDocument();
  });

  it("standardaddisjon: stegene kan velges direkte og med knapper", async () => {
    const user = userEvent.setup();
    render(<StandardaddisjonSteg />);
    const steps = screen.getAllByRole("button", { name: /Steg \d/ });
    expect(steps[0]).toHaveAttribute("aria-current", "step");
    await user.click(steps[3]!);
    expect(steps[3]).toHaveAttribute("aria-current", "step");
    expect(screen.getByText(/Forleng linja bakover/)).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /Forrige steg/ }));
    expect(steps[2]).toHaveAttribute("aria-current", "step");
  });

  it("linearitet: dra-punktet har en tastaturbetjent slider ved siden av", () => {
    render(<LinearitetKurve />);
    // Hard regel: alt som kan dras skal også kunne styres fra tastaturet.
    const slider = screen.getByRole("slider", { name: "Avbøying av kalibreringskurven" });
    expect(slider).toHaveAttribute("type", "range");
    fireEvent.change(slider, { target: { value: "100" } });
    expect(screen.getByText(/Tydelig metning/)).toBeInTheDocument();
  });

  it("linearitet: bare toppunktet kan dras, ikke resten av grafen", () => {
    const { container } = render(<LinearitetKurve />);
    const svg = container.querySelector("svg") as SVGSVGElement;
    const handle = container.querySelector("[data-drag-handle]") as SVGCircleElement;
    expect(handle).toBeInTheDocument();

    // Trefflata er romsligere enn selve punktet, for finger og mus.
    expect(Number(handle.getAttribute("r"))).toBeGreaterThanOrEqual(20);

    // Dragging et vilkårlig sted i grafen skal ikke endre kurven.
    fireEvent.pointerDown(svg, { clientY: 260 });
    fireEvent.pointerMove(svg, { clientY: 40 });
    fireEvent.pointerUp(svg, { clientY: 40 });
    expect(screen.getByText(/Punktene ligger på linja/)).toBeInTheDocument();

    // Dragging i selve punktet skal endre den.
    fireEvent.pointerDown(handle, { clientY: 260 });
    fireEvent.pointerMove(handle, { clientY: 260 });
    fireEvent.pointerUp(handle, { clientY: 260 });
    expect(screen.getByText(/Tydelig metning/)).toBeInTheDocument();
  });

  it("oppløsning: slideren styrer R og konklusjonen", () => {
    render(<OpplosningTopper />);
    const slider = screen.getByRole("slider", { name: "Avstand mellom toppene" });
    fireEvent.change(slider, { target: { value: "0" } });
    expect(screen.getByText(/overlapper kraftig/)).toBeInTheDocument();
    fireEvent.change(slider, { target: { value: "100" } });
    expect(screen.getByText(/^For omtrent gaussiske topper/)).toBeInTheDocument();
  });
});

describe("statiske demonstrasjoner", () => {
  it("blindprøve viser tre typer med tekst", () => {
    render(<BlindproveTyper />);
    expect(screen.getByText("Reagensblank")).toBeInTheDocument();
    expect(screen.getByText("Metodeblank")).toBeInTheDocument();
    expect(screen.getByText("Matriksblank")).toBeInTheDocument();
  });

  it("riktighet viser tre parallelle skiver", () => {
    render(<RiktighetSkiver />);
    expect(screen.getByText("Presis, men ikke riktig")).toBeInTheDocument();
    expect(screen.getByText("Nøyaktig")).toBeInTheDocument();
  });

  it("viser statistikk som er regnet ut av måleserien, ikke hardkodet", () => {
    render(<StandardavvikFormelDemo />);
    // Endres måleserien, skal tallene under følge med av seg selv.
    const expected =
      `x̄ = ${comma(mean(MEASUREMENTS), 2)} mg/L` +
      `\u00a0 s = ${comma(sampleStandardDeviation(MEASUREMENTS), 2)} mg/L` +
      `\u00a0 RSD = ${comma(relativeStandardDeviation(MEASUREMENTS), 1)} %`;
    const result = screen.getByText(/^x̄ =/);
    expect(result.textContent?.replace(/\s+/g, " ").trim()).toBe(
      expected.replace(/\s+/g, " ").trim(),
    );
    // Og verdiene skal være de riktige for akkurat denne serien.
    expect(result).toHaveTextContent("x̄ = 10,30 mg/L");
    expect(result).toHaveTextContent("s = 0,14 mg/L");
    expect(result).toHaveTextContent("RSD = 1,4 %");
  });

  it("viser like mange søyler som målinger", () => {
    const { container } = render(<StandardavvikFormelDemo />);
    const bars = container.querySelectorAll("[class*='bars'] > div");
    expect(bars.length).toBe(MEASUREMENTS.length);
  });

  it("standardavvik forklarer hvert ledd i formelen og har tekstalternativ", () => {
    render(<StandardavvikFormel />);
    expect(screen.getByText(/Standardavviket s er kvadratroten/)).toBeInTheDocument();
    const terms = screen.getAllByRole("term").map((node) => node.textContent);
    expect(terms).toEqual(["xᵢ − x̄", "( … )²", "n − 1", "√"]);
    expect(screen.getByText(/Antall frihetsgrader/)).toBeInTheDocument();
  });
});

describe("tilgjengelighet i demonstrasjoner", () => {
  const demos = [
    ["presisjon", <PresisjonSpredning key="a" />],
    ["usikkerhet", <Usikkerhetsbudsjett key="b" />],
    ["linearitet", <LinearitetKurve key="c" />],
    ["deteksjonsgrense", <DeteksjonsgrenseStoy key="d" />],
    ["internstandard", <InternstandardForhold key="e" />],
    ["standardaddisjon", <StandardaddisjonSteg key="f" />],
    ["matriseeffekt", <MatriseeffektMatrikser key="g" />],
    ["oppløsning", <OpplosningTopper key="h" />],
    ["blindprøve", <BlindproveTyper key="i" />],
    ["riktighet", <RiktighetSkiver key="j" />],
    ["standardavvik", <StandardavvikFormel key="k" />],
  ] as const;

  it.each(demos)("%s har ingen aksefeil", async (_name, element) => {
    const { container } = render(<main>{element}</main>);
    expect(await axe(container)).toHaveNoViolations();
  });

  it.each(demos)("%s merker dekorativ SVG som skjult for skjermlesere", (_name, element) => {
    const { container } = render(<div>{element}</div>);
    for (const svg of container.querySelectorAll("svg")) {
      expect(svg).toHaveAttribute("aria-hidden", "true");
    }
  });
});
