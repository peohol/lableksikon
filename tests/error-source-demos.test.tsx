import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";

import { GrovfeilDemo } from "@/demos/ErrorSourceConceptDemos";

describe("grafisk feilkildedemonstrasjon", () => {
  it("skiller ukjent uteligger fra dokumentert grov feil", async () => {
    const user = userEvent.setup();
    render(<GrovfeilDemo />);

    expect(
      screen.getByText(/ikke grunnlag for å kalle hendelsen en dokumentert grov feil/i),
    ).toBeInTheDocument();

    const documented = screen.getByRole("button", {
      name: "Dokumentert prøveforbytting",
    });
    await user.click(documented);

    expect(documented).toHaveAttribute("aria-pressed", "true");
    expect(
      screen.getByText(/prøveforbyttingen faktisk dokumentert/i),
    ).toBeInTheDocument();
  });

  it("grov feil har ingen axe-feil", async () => {
    const { container } = render(
      <main>
        <GrovfeilDemo />
      </main>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
