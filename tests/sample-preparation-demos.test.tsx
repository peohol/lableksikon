import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { axe } from "vitest-axe";

import {
  DelproveDemo,
  EkstraksjonDemo,
  FiltreringDemo,
  FortynningDemo,
  FortynningsfaktorDemo,
  HomogeniseringDemo,
  OppkonsentreringDemo,
  OppslutningDemo,
  ProvemengdeDemo,
  RepresentativDemo,
} from "@/demos/SamplePreparationConceptDemos";

const demos = [
  ["representativ prøve", <RepresentativDemo key="a" />],
  ["delprøve", <DelproveDemo key="b" />],
  ["homogenisering", <HomogeniseringDemo key="c" />],
  ["ekstraksjon", <EkstraksjonDemo key="d" />],
  ["oppkonsentrering", <OppkonsentreringDemo key="e" />],
  ["fortynning", <FortynningDemo key="f" />],
  ["fortynningsfaktor", <FortynningsfaktorDemo key="g" />],
  ["filtrering", <FiltreringDemo key="h" />],
  ["oppslutning", <OppslutningDemo key="i" />],
  ["prøvemengde", <ProvemengdeDemo key="j" />],
] as const;

describe("demoer for prøvetaking og opparbeiding", () => {
  it.each(demos)("%s har ingen aksefeil", async (_name, element) => {
    const { container } = render(<main>{element}</main>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
