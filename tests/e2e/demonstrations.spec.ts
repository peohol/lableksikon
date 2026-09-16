import { expect, test } from "@playwright/test";

test.describe("direkte manipulasjon i demonstrasjoner", () => {
  test.skip(({ hasTouch }) => hasTouch, "Musedragging kjøres på desktop-profilen.");

  test("bare toppunktet i linearitetsgrafen kan dras", async ({ page }) => {
    await page.goto("/begrep/linearitet");

    const readout = page.getByText(/^R² = /);
    const before = await readout.textContent();

    const svg = page.locator("svg").first();
    const svgBox = (await svg.boundingBox())!;
    const handle = page.locator("[data-drag-handle]");
    const handleBox = (await handle.boundingBox())!;

    // Et punkt nede til venstre i plottet, langt fra det draggbare punktet.
    const idleX = svgBox.x + svgBox.width * 0.2;
    const idleY = svgBox.y + svgBox.height * 0.8;
    await page.mouse.move(idleX, idleY);
    await page.mouse.down();
    await page.mouse.move(idleX, svgBox.y + svgBox.height * 0.4, { steps: 8 });
    await page.mouse.up();
    await expect(readout).toHaveText(before as string);

    // Selve punktet skal derimot kunne dras.
    await page.mouse.move(handleBox.x + handleBox.width / 2, handleBox.y + handleBox.height / 2);
    await page.mouse.down();
    await page.mouse.move(
      handleBox.x + handleBox.width / 2,
      handleBox.y + handleBox.height / 2 + 90,
      { steps: 10 },
    );
    await page.mouse.up();
    await expect(readout).not.toHaveText(before as string);
  });

  test("slideren gjør det samme fra tastaturet", async ({ page }) => {
    await page.goto("/begrep/linearitet");
    const readout = page.getByText(/^R² = /);
    const before = await readout.textContent();
    const slider = page.getByRole("slider", { name: "Avbøying av kalibreringskurven" });
    await slider.focus();
    await page.keyboard.press("End");
    await expect(readout).not.toHaveText(before as string);
    await expect(page.getByText(/Tydelig metning/)).toBeVisible();
  });

  test("headersøket annonserer hvor mange treff som vises", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("combobox", { name: "Søk etter begrep" }).fill("e");
    await expect(page.getByRole("option")).toHaveCount(8);
    await expect(page.getByRole("status")).toHaveText(/treff — viser de 8 mest relevante/);
  });
});
