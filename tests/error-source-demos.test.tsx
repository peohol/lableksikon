import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";

import { GrovfeilDemo } from "@/demos/ErrorSourceConceptDemos";

describe("feilkildedemonstrasjon", () => {
  it("grov feil har ingen aksefeil", async () => {
    const { container } = render(
      <main>
        <GrovfeilDemo />
      </main>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
