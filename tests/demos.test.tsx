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
import {
  DekningsfaktorDemo,
  FolsomhetDemo,
  GjenvinningDemo,
  IntermediarDemo,
  KontrollkortDemo,
  RepeterbarhetDemo,
  ReproduserbarhetDemo,
  RobusthetDemo,
  SelektivitetDemo,
  SkjevhetDemo,
  UtvidetUsikkerhetDemo,
} from "@/demos/QualityConceptDemos";
import {
  GjennomsnittDemo,
  MedianDemo,
  UteliggerDemo,
  VariansDemo,
} from "@/demos/StatisticsConceptDemos";
import StandardavvikFormelDemo, { MEASUREMENTS } from "@/demos/StandardavvikFormel";
import {
  comma,
  fitLine,
  mean,
  median,
  relativeStandardDeviation,
  sampleStandardDeviation,
  sampleVariance,
} from "@/lib/statistics";

describe("regnefunksjoner", () => {
  it("regner ut gjennomsnitt, utvalgsstandardavvik og RSD", () => {
    const values = [10.2, 10.4, 10.1, 10.5, 10.3, 10.3];
    expect(mean(values)).toBeCloseTo(10.3, 10);
    expect(sampleStandardDeviation(values)).toBeCloseTo(0.1414213562, 8);
    expect(relativeStandardDeviation(values)).toBeCloseTo(1.3730229, 6);
    expect(sampleVariance(values)).toBeCloseTo(0.02, 8);
    expect(median([2, 4, 7, 9, 30])).toBe(7);
    expect(median([2, 4, 7, 9])).toBe(5.5);
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
    expect(screen.getByText(/^utvidet usikkerhet/)).toBeInTheDocument();
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

  it("repeterbarhet: slideren endrer korttidsspredningen", () => {
    render(<RepeterbarhetDemo />);
    const slider = screen.getByRole("slider", { name: "Tilfeldig variasjon i den korte serien" });
    fireEvent.change(slider, { target: { value: "0" } });
    expect(screen.getByText(/svært tett/)).toBeInTheDocument();
    fireEvent.change(slider, { target: { value: "100" } });
    expect(screen.getByText(/Stor korttidsvariasjon/)).toBeInTheDocument();
  });

  it("intermediær presisjon: mellom-serie-slideren flytter serienivåene", () => {
    render(<IntermediarDemo />);
    const slider = screen.getByRole("slider", { name: "Variasjon mellom dager og operatører" });
    fireEvent.change(slider, { target: { value: "0" } });
    expect(screen.getByText(/nesten oppå hverandre/)).toBeInTheDocument();
    fireEvent.change(slider, { target: { value: "100" } });
    expect(screen.getByText(/dominerer nå den samlede presisjonen/)).toBeInTheDocument();
  });

  it("reproduserbarhet: laboratorieforskjeller endres uavhengig av innen-lab-spredning", () => {
    render(<ReproduserbarhetDemo />);
    const slider = screen.getByRole("slider", { name: "Variasjon mellom laboratorier" });
    fireEvent.change(slider, { target: { value: "0" } });
    expect(screen.getByText(/nesten samme nivå/)).toBeInTheDocument();
    fireEvent.change(slider, { target: { value: "100" } });
    expect(screen.getByText(/mye større enn spredningen innen hvert laboratorium/)).toBeInTheDocument();
  });

  it("skjevhet: hele klyngen kan flyttes uten å endre presisjonen", () => {
    render(<SkjevhetDemo />);
    const slider = screen.getByRole("slider", { name: "Systematisk skjevhet" });
    fireEvent.change(slider, { target: { value: "0" } });
    expect(screen.getByText(/praktisk talt på referansen/)).toBeInTheDocument();
    fireEvent.change(slider, { target: { value: "5" } });
    expect(screen.getByText(/systematisk forskjøvet/)).toBeInTheDocument();
  });

  it("gjenvinning: slideren endrer målt etter-verdi og recovery", () => {
    const { container } = render(<GjenvinningDemo />);
    const slider = screen.getByRole("slider", { name: "Gjenfunnet andel av tilsetningen" });
    fireEvent.change(slider, { target: { value: "50" } });
    expect(screen.getByText(/stor del av den tilsatte mengden/)).toBeInTheDocument();
    const formulas = Array.from(container.querySelectorAll("[data-math-tex]")).map((node) =>
      node.getAttribute("data-math-tex"),
    );
    expect(formulas).toContain("90{,}0");
    expect(formulas.some((tex) => tex?.includes("50\\,\\%"))).toBe(true);
  });

  it("utvidet usikkerhet: k gjør intervallet bredere", () => {
    const { container } = render(<UtvidetUsikkerhetDemo />);
    const slider = screen.getByRole("slider", { name: "Dekningsfaktor for utvidet måleusikkerhet" });
    fireEvent.change(slider, { target: { value: "3" } });
    const formulas = Array.from(container.querySelectorAll("[data-math-tex]")).map((node) =>
      node.getAttribute("data-math-tex"),
    );
    expect(formulas).toContain("U = 4{,}50");
    expect(formulas.some((tex) => tex?.includes("95{,}50") && tex?.includes("104{,}50"))).toBe(true);
  });

  it("dekningsfaktor: større k øker dekningsarealet i normalillustrasjonen", () => {
    render(<DekningsfaktorDemo />);
    const slider = screen.getByRole("slider", { name: "Dekningsfaktor k" });
    const before = slider.getAttribute("aria-valuetext");
    fireEvent.change(slider, { target: { value: "3" } });
    expect(slider.getAttribute("aria-valuetext")).not.toBe(before);
    expect(slider.getAttribute("aria-valuetext")).toContain("99,7 prosent");
  });

  it("selektivitet: sterkere interferent flytter det tilsynelatende signalet", () => {
    render(<SelektivitetDemo />);
    const slider = screen.getByRole("slider", { name: "Styrke på interferentsignalet" });
    fireEvent.change(slider, { target: { value: "0" } });
    expect(screen.getByText(/bidrar lite/)).toBeInTheDocument();
    fireEvent.change(slider, { target: { value: "100" } });
    expect(screen.getByText(/dominerer nå en betydelig del/)).toBeInTheDocument();
  });

  it("følsomhet: samme konsentrasjonsendring gir større signalendring når slope øker", () => {
    const { container } = render(<FolsomhetDemo />);
    const slider = screen.getByRole("slider", { name: "Stigningstall for kalibreringsresponsen" });
    fireEvent.change(slider, { target: { value: "2.5" } });
    const formulas = Array.from(container.querySelectorAll("[data-math-tex]")).map((node) =>
      node.getAttribute("data-math-tex"),
    );
    expect(formulas).toContain("\\Delta y = 100{,}0");
    expect(formulas.some((tex) => tex?.endsWith("= 2{,}50"))).toBe(true);
  });

  it("robusthet: større pH-avvik kan flytte ytelsen utenfor det definerte området", () => {
    render(<RobusthetDemo />);
    const slider = screen.getByRole("slider", { name: "pH i robusthetsillustrasjonen" });
    fireEvent.change(slider, { target: { value: "7" } });
    expect(screen.getByText(/holder den illustrerte ytelsen innenfor/)).toBeInTheDocument();
    fireEvent.change(slider, { target: { value: "7.5" } });
    expect(screen.getByText(/ligger den illustrerte ytelsen utenfor/)).toBeInTheDocument();
  });

  it("kontrollkort: nivåskift flytter senere punkter mot og over faste grenser", () => {
    render(<KontrollkortDemo />);
    const slider = screen.getByRole("slider", { name: "Nivåskift fra måling 6" });
    fireEvent.change(slider, { target: { value: "1" } });
    expect(screen.getByText(/har flyttet seg oppover/)).toBeInTheDocument();
    fireEvent.change(slider, { target: { value: "5" } });
    expect(screen.getByText(/kontrollpunkt ligger utenfor/)).toBeInTheDocument();
  });

  it("gjennomsnitt: balansepunktet følger et flyttet datapunkt", () => {
    render(<GjennomsnittDemo />);
    const slider = screen.getByRole("slider", { name: "Plassering av den femte observasjonen" });
    fireEvent.change(slider, { target: { value: "18" } });
    const formula = screen.getByText("Gjennomsnitt").closest("div")?.querySelector("[data-math-tex]");
    expect(formula).toHaveAttribute("data-math-tex", "\\bar{x} = 7{,}6");
  });

  it("median: medianen står mens gjennomsnittet flyttes av ytterpunktet", () => {
    render(<MedianDemo />);
    const slider = screen.getByRole("slider", { name: "Plassering av den største observasjonen" });
    fireEvent.change(slider, { target: { value: "30" } });
    expect(screen.getByText(/Medianen blir 7,0 hele veien/)).toBeInTheDocument();
    const formula = screen.getByText("Gjennomsnitt").closest("div")?.querySelector("[data-math-tex]");
    expect(formula).toHaveAttribute("data-math-tex", "\\bar{x} = 10{,}4");
  });

  it("varians: et fjernt punkt øker utvalgsvariansen", () => {
    render(<VariansDemo />);
    const slider = screen.getByRole("slider", { name: "Plassering av den fjerde observasjonen" });
    const before = slider.getAttribute("aria-valuetext");
    fireEvent.change(slider, { target: { value: "18" } });
    expect(slider.getAttribute("aria-valuetext")).not.toBe(before);
    expect(slider.getAttribute("aria-valuetext")).toContain("varians");
  });

  it("uteligger: et fjernt punkt varsler om stor påvirkning uten å kalles feil", () => {
    render(<UteliggerDemo />);
    const slider = screen.getByRole("slider", { name: "Plassering av den mulige uteliggeren" });
    fireEvent.change(slider, { target: { value: "30" } });
    expect(screen.getByText(/Gjennomsnitt og standardavvik trekkes kraftig/)).toBeInTheDocument();
    expect(screen.getByText(/ikke automatisk en feil/)).toBeInTheDocument();
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
    const { container } = render(<StandardavvikFormelDemo />);
    // Endres måleserien, skal tallene under følge med av seg selv.
    const average = comma(mean(MEASUREMENTS), 2).replace(",", "{,}");
    const standardDeviation = comma(sampleStandardDeviation(MEASUREMENTS), 2).replace(",", "{,}");
    const rsd = comma(relativeStandardDeviation(MEASUREMENTS), 1).replace(",", "{,}");
    const expected =
      `\\bar{x} = ${average}\\,\\mathrm{mg/L} \\quad s = ${standardDeviation}\\,\\mathrm{mg/L} \\quad \\mathrm{RSD} = ${rsd}\\,\\%`;
    const result = container.querySelector('[data-math-tex*="RSD"]');
    expect(result).toHaveAttribute("data-math-tex", expected);
    // Og verdiene skal fortsatt regnes fra akkurat denne serien.
    expect(result?.getAttribute("data-math-tex")).toContain("10{,}30");
    expect(result?.getAttribute("data-math-tex")).toContain("0{,}14");
    expect(result?.getAttribute("data-math-tex")).toContain("1{,}4");
  });

  it("viser like mange søyler som målinger", () => {
    const { container } = render(<StandardavvikFormelDemo />);
    const bars = container.querySelectorAll("[class*='bars'] > div");
    expect(bars.length).toBe(MEASUREMENTS.length);
  });

  it("standardavvik forklarer hvert ledd i MathJax-formelen", () => {
    const { container } = render(<StandardavvikFormel />);
    const formulas = Array.from(container.querySelectorAll("[data-math-tex]")).map((node) =>
      node.getAttribute("data-math-tex"),
    );
    expect(formulas.some((tex) => tex?.includes("\\sqrt"))).toBe(true);
    const terms = screen.getAllByRole("term").map((node) =>
      node.querySelector("[data-math-tex]")?.getAttribute("data-math-tex"),
    );
    expect(terms).toEqual(["x_i - \\bar{x}", "(\\ldots)^2", "n - 1", "\\sqrt{\\;}"]);
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
    ["repeterbarhet", <RepeterbarhetDemo key="l" />],
    ["intermediær presisjon", <IntermediarDemo key="m" />],
    ["reproduserbarhet", <ReproduserbarhetDemo key="n" />],
    ["skjevhet", <SkjevhetDemo key="o" />],
    ["gjenvinning", <GjenvinningDemo key="o1" />],
    ["utvidet måleusikkerhet", <UtvidetUsikkerhetDemo key="o2" />],
    ["dekningsfaktor", <DekningsfaktorDemo key="o3" />],
    ["selektivitet", <SelektivitetDemo key="o4" />],
    ["følsomhet", <FolsomhetDemo key="o5" />],
    ["robusthet", <RobusthetDemo key="o6" />],
    ["kontrollkort", <KontrollkortDemo key="o7" />],
    ["gjennomsnitt", <GjennomsnittDemo key="p" />],
    ["median", <MedianDemo key="q" />],
    ["varians", <VariansDemo key="r" />],
    ["uteligger", <UteliggerDemo key="s" />],
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
