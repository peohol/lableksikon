import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { axe } from "vitest-axe";

import {
  FTestDemo,
  FrihetsgraderDemo,
  GjennomsnittDemo,
  KonfidensintervallDemo,
  KorrelasjonDemo,
  MedianDemo,
  MinsteKvadraterDemo,
  NormalfordelingDemo,
  RegresjonDemo,
  SignifikansnivaDemo,
  TTestDemo,
  UteliggerDemo,
  VariansDemo,
} from "@/demos/StatisticsConceptDemos";

const demos = [
  ["gjennomsnitt", <GjennomsnittDemo key="a" />],
  ["median", <MedianDemo key="b" />],
  ["varians", <VariansDemo key="c" />],
  ["normalfordeling", <NormalfordelingDemo key="d" />],
  ["frihetsgrader", <FrihetsgraderDemo key="e" />],
  ["konfidensintervall", <KonfidensintervallDemo key="f" />],
  ["signifikansnivå", <SignifikansnivaDemo key="g" />],
  ["t-test", <TTestDemo key="h" />],
  ["F-test", <FTestDemo key="i" />],
  ["regresjon", <RegresjonDemo key="j" />],
  ["minste kvadrater", <MinsteKvadraterDemo key="k" />],
  ["korrelasjon", <KorrelasjonDemo key="l" />],
  ["uteligger", <UteliggerDemo key="m" />],
] as const;

describe("statistikkdemoer", () => {
  it.each(demos)("%s har ingen aksefeil", async (_name, element) => {
    const { container } = render(<main>{element}</main>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
