import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";

import {
  MasseprosentDemo,
  MolmasseDemo,
  MolaritetDemo,
  PpmDemo,
  SiSystemDemo,
} from "@/demos/UnitsConceptDemos";

describe("enhetsdemonstrasjoner", () => {
  const demos = [
    ["SI-enheter", <SiSystemDemo key="a" />],
    ["molmasse", <MolmasseDemo key="b" />],
    ["molaritet", <MolaritetDemo key="c" />],
    ["masseprosent", <MasseprosentDemo key="d" />],
    ["ppm", <PpmDemo key="e" />],
  ] as const;

  it.each(demos)("%s har ingen aksefeil", async (_name, element) => {
    const { container } = render(<main>{element}</main>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
