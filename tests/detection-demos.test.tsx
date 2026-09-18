import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { axe } from "vitest-axe";

import {
  FidDemo,
  FragmenteringDemo,
  GcmsDemo,
  IoniseringDemo,
  LcmsDemo,
  LedningsevneDemo,
  MasseopplosningDemo,
  MassespektrometriDemo,
  MrmDemo,
  SignalStoyDemo,
  SimDemo,
  UvdetektorDemo,
} from "@/demos/DetectionConceptDemos";

const demos = [
  ["signal-støy-forhold", <SignalStoyDemo key="a" />],
  ["massespektrometri", <MassespektrometriDemo key="b" />],
  ["ionisering", <IoniseringDemo key="c" />],
  ["fragmentering", <FragmenteringDemo key="d" />],
  ["SIM", <SimDemo key="e" />],
  ["MRM", <MrmDemo key="f" />],
  ["masseoppløsning", <MasseopplosningDemo key="g" />],
  ["LC-MS", <LcmsDemo key="h" />],
  ["GC-MS", <GcmsDemo key="i" />],
  ["UV-detektor", <UvdetektorDemo key="j" />],
  ["FID", <FidDemo key="k" />],
  ["ledningsevne", <LedningsevneDemo key="l" />],
] as const;

describe("deteksjonsdemoer", () => {
  it.each(demos)("%s har ingen aksefeil", async (_name, element) => {
    const { container } = render(<main>{element}</main>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
