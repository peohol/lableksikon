import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
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

describe("separasjonsdemoer", () => {
  it.each(demos)("%s har ingen aksefeil", async (_name, element) => {
    const { container } = render(<main>{element}</main>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
