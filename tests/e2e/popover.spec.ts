import { expect, test } from "@playwright/test";

test.describe("begrepslenker og forhåndsvisning", () => {
  test("hover åpner kortet, klikk navigerer (desktop)", async ({ page, hasTouch }) => {
    test.skip(hasTouch, "Gjelder pekere med hover.");
    await page.goto("/begrep/presisjon");
    const link = page.getByRole("link", { name: "måleusikkerhet", exact: true });
    await link.hover();
    await expect(page.getByRole("dialog")).toBeVisible();
    await link.click();
    await expect(page).toHaveURL(/\/begrep\/maleusikkerhet$/);
  });

  test("første trykk forhåndsviser uten å navigere (touch)", async ({ page, hasTouch }) => {
    test.skip(!hasTouch, "Gjelder touch.");
    await page.goto("/begrep/presisjon");
    const link = page.getByRole("link", { name: "måleusikkerhet", exact: true });
    await link.tap();
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(page).toHaveURL(/\/begrep\/presisjon$/);

    // Kortet har en eksplisitt vei videre.
    await page.getByRole("dialog").getByRole("link", { name: /Gå til begrepet/ }).tap();
    await expect(page).toHaveURL(/\/begrep\/maleusikkerhet$/);
  });

  test("nytt trykk på samme lenke lukker kortet (touch)", async ({ page, hasTouch }) => {
    test.skip(!hasTouch, "Gjelder touch.");
    await page.goto("/begrep/presisjon");
    const link = page.getByRole("link", { name: "måleusikkerhet", exact: true });
    await link.tap();
    await expect(page.getByRole("dialog")).toBeVisible();
    await link.tap();
    await expect(page.getByRole("dialog")).toHaveCount(0);
  });

  test("kortet blir en bottom sheet på smal skjerm", async ({ page, hasTouch }) => {
    await page.setViewportSize({ width: 375, height: 780 });
    await page.goto("/begrep/presisjon");
    // Kortet åpnes slik profilen tilsier: hover med peker, trykk på touch.
    // Et klikk med peker ville navigert videre i stedet.
    const link = page.getByRole("link", { name: "måleusikkerhet", exact: true });
    if (hasTouch) await link.tap();
    else await link.hover();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    const box = await dialog.boundingBox();
    const viewport = page.viewportSize()!;
    expect(box!.x).toBeCloseTo(12, 0);
    expect(viewport.height - (box!.y + box!.height)).toBeCloseTo(12, 0);
    expect(box!.width).toBeLessThanOrEqual(viewport.width - 24);
  });

  test("kortet holder seg innenfor viewporten på desktop", async ({ page, hasTouch }) => {
    test.skip(hasTouch, "Gjelder desktop.");
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/begrep/standardavvik");
    await page.locator("summary").click();
    const link = page.getByRole("link", { name: "måleusikkerhet", exact: true });
    await link.scrollIntoViewIfNeeded();
    await link.hover();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    const box = (await dialog.boundingBox())!;
    expect(box.x).toBeGreaterThanOrEqual(11);
    expect(box.x + box.width).toBeLessThanOrEqual(1280 - 11);
    expect(box.y).toBeGreaterThanOrEqual(11);
    expect(box.y + box.height).toBeLessThanOrEqual(900 - 11);
  });

  test("bare én forhåndsvisning er åpen om gangen", async ({ page, hasTouch }) => {
    test.skip(hasTouch, "Gjelder hover.");
    await page.goto("/begrep/presisjon");
    await page.getByRole("link", { name: "riktighet", exact: true }).hover();
    await expect(page.getByRole("dialog")).toHaveCount(1);
    await page.getByRole("link", { name: "måleusikkerhet", exact: true }).hover();
    await expect(page.getByRole("dialog")).toHaveCount(1);
    await expect(page.getByRole("dialog")).toContainText("Måleusikkerhet");
  });
});
