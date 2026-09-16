import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";

import { CategoryBlock } from "@/components/CategoryBlock";
import { ConceptLink } from "@/components/ConceptLink";
import { DemonstrationFrame } from "@/components/DemonstrationFrame";
import { DepthDisclosure } from "@/components/DepthDisclosure";
import { HeaderSearch } from "@/components/HeaderSearch";
import { PreviousNextNavigation } from "@/components/PreviousNextNavigation";
import { Prose } from "@/components/Prose";
import { TermListItem } from "@/components/TermListItem";
import { getNeighbours, getTerm, publishedCategories, termsInCategory } from "@/content";
import { buildSearchIndex } from "@/lib/search-index";

const push = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push, replace: vi.fn(), prefetch: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
}));

beforeEach(() => {
  push.mockClear();
});

const presisjon = getTerm("presisjon")!;

describe("ConceptLink og forhåndsvisning", () => {
  const renderLink = () =>
    render(
      <p>
        Les om{" "}
        <ConceptLink
          slug="maleusikkerhet"
          label="måleusikkerhet"
          title="Måleusikkerhet"
          definition="Et intervall som angir hvor det sanne resultatet med rimelig sikkerhet ligger."
          categoryName="Kvalitet i måling"
        />{" "}
        her.
      </p>,
    );

  it("er en ekte lenke til begrepssiden", () => {
    renderLink();
    const link = screen.getByRole("link", { name: "måleusikkerhet" });
    expect(link).toHaveAttribute("href", "/begrep/maleusikkerhet");
    expect(link).toHaveAttribute("aria-haspopup", "dialog");
  });

  it("åpner forhåndsvisningen på tastaturfokus", async () => {
    renderLink();
    const link = screen.getByRole("link", { name: "måleusikkerhet" });
    link.focus();
    const dialog = await screen.findByRole("dialog");
    expect(within(dialog).getByText("Måleusikkerhet")).toBeInTheDocument();
    expect(
      within(dialog).getByText(/Et intervall som angir hvor det sanne resultatet/),
    ).toBeInTheDocument();
  });

  it("har en eksplisitt vei til begrepssiden i kortet", async () => {
    renderLink();
    screen.getByRole("link", { name: "måleusikkerhet" }).focus();
    const dialog = await screen.findByRole("dialog");
    expect(within(dialog).getByRole("link", { name: /Gå til begrepet/ })).toHaveAttribute(
      "href",
      "/begrep/maleusikkerhet",
    );
  });

  it("lukker med Escape og gir fokus tilbake til lenken uten å åpne på nytt", async () => {
    const user = userEvent.setup();
    renderLink();
    const link = screen.getByRole("link", { name: "måleusikkerhet" });
    link.focus();
    await screen.findByRole("dialog");
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(link).toHaveFocus();
  });

  it("lukker med Lukk-knappen", async () => {
    const user = userEvent.setup();
    renderLink();
    const link = screen.getByRole("link", { name: "måleusikkerhet" });
    link.focus();
    const dialog = await screen.findByRole("dialog");
    await user.click(within(dialog).getByRole("button", { name: "Lukk" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(link).toHaveFocus();
  });
});

describe("DepthDisclosure", () => {
  it("er lukket som standard og kan åpnes", async () => {
    const user = userEvent.setup();
    render(
      <DepthDisclosure title="Dybde: noe teknisk">
        <p>Dybdeinnhold</p>
      </DepthDisclosure>,
    );
    const details = screen.getByText("Dybde: noe teknisk").closest("details");
    expect(details).not.toHaveAttribute("open");
    await user.click(screen.getByText("Dybde: noe teknisk"));
    expect(details).toHaveAttribute("open");
  });
});

describe("HeaderSearch", () => {
  const entries = buildSearchIndex();

  it("er en combobox som åpner en listbox med treff", async () => {
    const user = userEvent.setup();
    render(<HeaderSearch entries={entries} termCount={entries.length} />);
    const input = screen.getByRole("combobox", { name: "Søk etter begrep" });
    expect(input).toHaveAttribute("aria-expanded", "false");
    await user.type(input, "presisjon");
    expect(input).toHaveAttribute("aria-expanded", "true");
    const listbox = screen.getByRole("listbox", { name: "Søketreff" });
    expect(within(listbox).getAllByRole("option").length).toBeGreaterThan(0);
  });

  it("navigerer til det valgte treffet med piltast og Enter", async () => {
    const user = userEvent.setup();
    render(<HeaderSearch entries={entries} termCount={entries.length} />);
    const input = screen.getByRole("combobox", { name: "Søk etter begrep" });
    await user.type(input, "blind");
    await user.keyboard("{ArrowDown}{Enter}");
    expect(push).toHaveBeenCalledWith("/begrep/blindprove");
  });

  it("tømmer feltet med Escape", async () => {
    const user = userEvent.setup();
    render(<HeaderSearch entries={entries} termCount={entries.length} />);
    const input = screen.getByRole("combobox", { name: "Søk etter begrep" });
    await user.type(input, "presisjon");
    await user.keyboard("{Escape}");
    expect(input).toHaveValue("");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("teller viste treff, ikke bare totalen, når det er flere enn plassen tillater", async () => {
    const user = userEvent.setup();
    render(<HeaderSearch entries={entries} termCount={entries.length} />);
    // «e» finnes i alle begrepene, så lista kappes på åtte.
    await user.type(screen.getByRole("combobox", { name: "Søk etter begrep" }), "e");
    const options = screen.getAllByRole("option");
    expect(options.length).toBe(8);
    expect(screen.getByRole("status")).toHaveTextContent(
      `${entries.length} treff — viser de 8 mest relevante`,
    );
  });

  it("annonserer treffantallet én gang, fra et live-område som alltid finnes", async () => {
    const user = userEvent.setup();
    render(<HeaderSearch entries={entries} termCount={entries.length} />);
    const status = screen.getByRole("status");
    expect(status).toBeInTheDocument();
    expect(status).toHaveTextContent("");

    await user.type(screen.getByRole("combobox", { name: "Søk etter begrep" }), "blind");
    expect(status).toHaveTextContent("1 treff");
    // Den synlige telleren er en duplikat og skal ikke leses opp i tillegg.
    const announced = screen.getAllByText("1 treff").filter((node) => !node.closest("[aria-hidden='true']"));
    expect(announced).toHaveLength(1);
  });

  it("viser treffårsak for indirekte treff", async () => {
    const user = userEvent.setup();
    render(<HeaderSearch entries={entries} termCount={entries.length} />);
    await user.type(screen.getByRole("combobox", { name: "Søk etter begrep" }), "pilkast");
    expect(screen.getByText(/treff på beslektet ord/)).toBeInTheDocument();
  });
});

describe("Lister og navigasjon", () => {
  it("viser definisjonen fra begrepets egen post i en detaljert rad", () => {
    render(
      <TermListItem
        slug={presisjon.slug}
        title={presisjon.title}
        definition={presisjon.definition}
        kicker="Kvalitet i måling"
      />,
    );
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/begrep/presisjon");
    expect(link).toHaveTextContent(presisjon.definition);
  });

  it("annonserer kategoribytte i forrige/neste", () => {
    const neighbours = getNeighbours("noyaktighet")!;
    render(
      <PreviousNextNavigation
        current={getTerm("noyaktighet")!}
        previous={neighbours.previous}
        next={neighbours.next}
      />,
    );
    expect(screen.getByText(/Neste · Kalibrering og kontroll/)).toBeInTheDocument();
    expect(screen.getByText("← Forrige")).toBeInTheDocument();
  });

  it("viser maks fem begreper per kategoriblokk", () => {
    const category = publishedCategories.find((c) => c.slug === "kalibrering")!;
    render(<CategoryBlock category={category} terms={termsInCategory("kalibrering")} />);
    expect(screen.getAllByRole("listitem").length).toBeLessThanOrEqual(5);
    expect(screen.getByRole("link", { name: "Kalibrering og kontroll" })).toHaveAttribute(
      "href",
      "/kategori/kalibrering",
    );
  });
});

describe("DemonstrationFrame", () => {
  it("merker rammen med type, handlingsanvisning og tilgjengelig navn", () => {
    render(
      <DemonstrationFrame
        kind="interaktiv"
        instruction="Skru på spredningen"
        label="Demonstrasjon: spredning"
      >
        <p>innhold</p>
      </DemonstrationFrame>,
    );
    const figure = screen.getByRole("figure", { name: "Demonstrasjon: spredning" });
    expect(within(figure).getByText("Demonstrasjon · interaktiv")).toBeInTheDocument();
    expect(within(figure).getByText("Skru på spredningen")).toBeInTheDocument();
  });
});

describe("Tilgjengelighet", () => {
  it("har ingen aksefeil i lesespalten med begrepslenker", async () => {
    const { container } = render(
      <main>
        <h1>{presisjon.title}</h1>
        <Prose blocks={presisjon.explanation} variant="explanation" />
        <DepthDisclosure title={presisjon.depth.title}>
          <Prose blocks={presisjon.depth.blocks} variant="depth" />
        </DepthDisclosure>
      </main>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("har ingen aksefeil i søket", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <HeaderSearch entries={buildSearchIndex()} termCount={11} />,
    );
    await user.type(screen.getByRole("combobox", { name: "Søk etter begrep" }), "presisjon");
    expect(await axe(container)).toHaveNoViolations();
  });
});
