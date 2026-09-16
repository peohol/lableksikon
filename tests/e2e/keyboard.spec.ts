import { expect, test } from "@playwright/test";

test.describe("tastaturreise", () => {
  test.skip(({ hasTouch }) => hasTouch, "Kjøres på desktop-profilen.");

  test("hele hovedreisen uten mus", async ({ page }) => {
    await page.goto("/");

    // Skip-lenken ligger først i DOM og blir synlig ved fokus.
    await page.keyboard.press("Tab");
    const skipLink = page.getByRole("link", { name: "Hopp til innhold" });
    await expect(skipLink).toBeFocused();
    await expect(skipLink).toBeInViewport();

    // Videre til ordmerket og headersøket.
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: "Lableksion" })).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(page.getByRole("combobox", { name: "Søk etter begrep" })).toBeFocused();

    // Hovedsøket: skriv, velg treff med tastatur.
    await page.keyboard.press("Tab");
    await expect(page.getByLabel("Søk", { exact: true })).toBeFocused();
    await page.keyboard.type("deteksjon");
    await expect(page.getByText("1 treff")).toBeVisible();
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: /Deteksjonsgrense/ })).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/begrep\/deteksjonsgrense$/);

    // Demonstrasjonen kan betjenes fra tastaturet.
    const slider = page.getByRole("slider", { name: "Støynivå i bakgrunnen" });
    await slider.focus();
    const before = await slider.inputValue();
    await page.keyboard.press("ArrowRight");
    expect(await slider.inputValue()).not.toBe(before);

    // Dybden åpnes med tastaturet.
    const summary = page.locator("summary");
    await summary.focus();
    await expect(summary).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page.locator("details")).toHaveAttribute("open", "");

    // Forrige/neste er vanlige lenker.
    const nextLink = page
      .getByRole("navigation", { name: "Bla mellom begreper" })
      .getByRole("link", { name: /Neste/ });
    await nextLink.focus();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/begrep\/internstandard$/);
  });

  test("begrepsforhåndsvisning på tastatur: åpne, gå inn, Escape", async ({ page }) => {
    await page.goto("/begrep/presisjon");
    const conceptLink = page.getByRole("link", { name: "riktighet", exact: true });
    await conceptLink.focus();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog).toContainText("Riktighet, presisjon og nøyaktighet");

    // Tab flytter fokus inn i kortet.
    await page.keyboard.press("Tab");
    await expect(dialog.getByRole("link", { name: /Gå til begrepet/ })).toBeFocused();

    // Escape lukker og gir fokus tilbake — uten å åpne på nytt.
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(conceptLink).toBeFocused();
    await expect(page.getByRole("dialog")).toHaveCount(0);
  });

  test("brødteksten flytter seg ikke når forhåndsvisningen åpnes", async ({ page }) => {
    await page.goto("/begrep/presisjon");
    const heading = page.getByRole("heading", { level: 1 });
    const before = await heading.boundingBox();
    const paragraph = page.getByRole("link", { name: "måleusikkerhet", exact: true });
    await paragraph.hover();
    await expect(page.getByRole("dialog")).toBeVisible();
    const after = await heading.boundingBox();
    expect(after?.y).toBe(before?.y);
  });
});
