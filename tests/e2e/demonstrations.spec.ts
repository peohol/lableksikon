import { expect, test } from "@playwright/test";

test.describe("direkte manipulasjon i demonstrasjoner", () => {
  test.skip(({ hasTouch }) => hasTouch, "Musedragging kjøres på desktop-profilen.");

  test("bare toppunktet i linearitetsgrafen kan dras", async ({ page }) => {
    await page.goto("/begrep/linearitet");

    const readout = page
      .getByText("Best tilpassede rette linje")
      .locator("..")
      .locator("mjx-container")
      .visible();
    await expect(readout).toBeVisible();
    const before = await readout.innerHTML();

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
    await expect.poll(async () => readout.innerHTML()).toBe(before);

    // Selve punktet skal derimot kunne dras.
    await page.mouse.move(handleBox.x + handleBox.width / 2, handleBox.y + handleBox.height / 2);
    await page.mouse.down();
    await page.mouse.move(
      handleBox.x + handleBox.width / 2,
      handleBox.y + handleBox.height / 2 + 90,
      { steps: 10 },
    );
    await page.mouse.up();
    await expect.poll(async () => readout.innerHTML()).not.toBe(before);
  });

  test("slideren gjør det samme fra tastaturet", async ({ page }) => {
    await page.goto("/begrep/linearitet");
    const readout = page
      .getByText("Best tilpassede rette linje")
      .locator("..")
      .locator("mjx-container")
      .visible();
    await expect(readout).toBeVisible();
    const before = await readout.innerHTML();
    const slider = page.getByRole("slider", { name: "Avbøying av kalibreringskurven" });
    await slider.focus();
    await page.keyboard.press("End");
    await expect.poll(async () => readout.innerHTML()).not.toBe(before);
    await expect(page.getByText(/Tydelig metning/)).toBeVisible();
  });

  test("MathJax viser ikke rå TeX under raske slideroppdateringer", async ({ page }) => {
    await page.goto("/begrep/repeterbarhet");

    const readout = page
      .getByText("Relativt standardavvik")
      .locator("..")
      .locator("mjx-container")
      .visible();
    await expect(readout).toBeVisible();
    const before = await readout.innerHTML();

    await page.evaluate(() => {
      const isHidden = (node: Node) => {
        let element = node.parentElement;
        while (element) {
          const style = getComputedStyle(element);
          if (
            element.getAttribute("aria-hidden") === "true" ||
            style.display === "none" ||
            style.visibility === "hidden" ||
            style.opacity === "0"
          ) {
            return true;
          }
          element = element.parentElement;
        }
        return false;
      };

      const inspect = () => {
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        let node = walker.nextNode();
        while (node) {
          const text = node.textContent ?? "";
          if ((text.includes("\\(") || text.includes("\\)")) && !isHidden(node)) {
            document.body.dataset.rawMathVisible = "true";
            return;
          }
          node = walker.nextNode();
        }
      };

      document.body.dataset.rawMathVisible = "false";
      inspect();
      const observer = new MutationObserver(inspect);
      observer.observe(document.body, {
        subtree: true,
        childList: true,
        characterData: true,
        attributes: true,
        attributeFilter: ["aria-hidden", "class", "style"],
      });
      (window as typeof window & { __mathSourceObserver?: MutationObserver }).__mathSourceObserver =
        observer;
    });

    const slider = page.getByRole("slider", { name: "Tilfeldig variasjon i den korte serien" });
    await slider.focus();
    for (let step = 0; step < 12; step += 1) {
      await page.keyboard.press("ArrowRight");
    }
    await page.keyboard.press("End");

    await expect.poll(async () => readout.innerHTML()).not.toBe(before);
    expect(await page.evaluate(() => document.body.dataset.rawMathVisible)).toBe("false");
  });

  test("skjevhet kan flyttes fra null til tydelig systematisk forskyvning", async ({ page }) => {
    await page.goto("/begrep/skjevhet");
    const slider = page.getByRole("slider", { name: "Systematisk skjevhet" });
    await slider.focus();
    await page.keyboard.press("Home");
    for (let step = 0; step < 10; step += 1) {
      await page.keyboard.press("ArrowRight");
    }
    await expect(slider).toHaveValue("0");
    await expect(page.getByText(/praktisk talt på referansen/)).toBeVisible();
    await page.keyboard.press("End");
    await expect(page.getByText(/^Punktene er fortsatt tett samlet, men hele klyngen ligger systematisk forskjøvet fra referansen\.$/)).toBeVisible();
  });

  test("medianen står stille når ytterpunktet flyttes", async ({ page }) => {
    await page.goto("/begrep/median");
    const slider = page.getByRole("slider", { name: "Plassering av den største observasjonen" });
    await slider.focus();
    await page.keyboard.press("End");
    await expect(page.getByText(/Medianen blir 7,0 hele veien/)).toBeVisible();
  });

  test("headersøket annonserer hvor mange treff som vises", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("combobox", { name: "Søk etter begrep" }).fill("e");
    const searchResults = page.getByRole("listbox", { name: "Søketreff" });
    await expect(searchResults.getByRole("option")).toHaveCount(8);
    await expect(page.getByRole("status")).toHaveText(/treff — viser de 8 mest relevante/);
  });
});
