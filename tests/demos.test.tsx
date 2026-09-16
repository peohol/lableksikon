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
import { fitLine } from "@/lib/statistics";

describe("regnefunksjoner", () => {
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

  it("oppløsning: slideren styrer R og konklusjonen", () => {
    render(<OpplosningTopper />);
    const slider = screen.getByRole("slider", { name: "Avstand mellom toppene" });
    fireEvent.change(slider, { target: { value: "0" } });
    expect(screen.getByText(/smelter sammen/)).toBeInTheDocument();
    fireEvent.change(slider, { target: { value: "100" } });
    expect(screen.getByText(/tilnærmet helt skilt/)).toBeInTheDocument();
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
