import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";

import {
  AkkrediteringDemo,
  AvviksbehandlingDemo,
  InternkontrollDemo,
  RevisjonssporDemo,
  RingtestDemo,
  SrmDemo,
  StandardmetodeDemo,
} from "@/demos/QualityAssuranceConceptDemos";

describe("kvalitetssikringsdemonstrasjoner", () => {
  const demos = [
    ["akkreditering", <AkkrediteringDemo key="a" />],
    ["ringtest", <RingtestDemo key="b" />],
    ["sertifisert referansemateriale", <SrmDemo key="c" />],
    ["standardmetode", <StandardmetodeDemo key="d" />],
    ["avviksbehandling", <AvviksbehandlingDemo key="e" />],
    ["internkontroll", <InternkontrollDemo key="f" />],
    ["revisjonsspor", <RevisjonssporDemo key="g" />],
  ] as const;

  it.each(demos)("%s har ingen aksefeil", async (_name, element) => {
    const { container } = render(<main>{element}</main>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
