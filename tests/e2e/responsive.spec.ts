import { expect, test, type Page } from "@playwright/test";

const WIDTHS = [320, 375, 390, 768, 1280, 1600];
const PATHS = [
  "/",
  "/a-aa",
  "/kategori/kalibrering",
  "/kategori/prove",
  "/kategori/statistikk",
  "/kategori/separasjon",
  "/kategori/deteksjon",
  "/kategori/provetaking",
  "/kategori/kvalitetssikring",
  "/kategori/enheter",
  "/begrep/noyaktighet",
  "/begrep/kvantifiseringsgrense",
  "/begrep/matrikstilpasset",
  "/begrep/ionesuppresjon",
  "/begrep/provelagring",
  "/begrep/konfidensintervall",
  "/begrep/korrelasjon",
  "/begrep/uteligger",
  "/begrep/opplosning",
  "/begrep/selektivitetsfaktor",
  "/begrep/dodvolum",
  "/begrep/injeksjonsvolum",
  "/begrep/mrm",
  "/begrep/masseopplosning",
  "/begrep/uvdetektor",
  "/begrep/ledningsevne",
  "/begrep/representativ",
  "/begrep/ekstraksjon",
  "/begrep/fortynningsfaktor",
  "/begrep/provemengde",
  "/begrep/akkreditering",
  "/begrep/srm",
  "/begrep/revisjonsspor",
  "/begrep/sienheter",
  "/begrep/molaritet",
  "/begrep/ppm",
];

async function horizontalOverflow(page: Page) {
  return page.evaluate(() => {
    const doc = document.documentElement;
    const widest = Array.from(document.querySelectorAll<HTMLElement>("body *")).reduce(
      (max, node) => Math.max(max, node.getBoundingClientRect().right),
      0,
    );
    return {
      scrolls: doc.scrollWidth > doc.clientWidth,
      widest: Math.round(widest),
      client: doc.clientWidth,
    };
  });
}

test.describe("responsivitet", () => {
  test.skip(({ hasTouch }) => hasTouch, "Setter egen viewport per test.");

  for (const width of WIDTHS) {
    test(`ingen horisontal scrolling ved ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      for (const path of PATHS) {
        await page.goto(path);
        const result = await horizontalOverflow(page);
        expect(result.scrolls, `${path} @ ${width}px`).toBe(false);
        expect(result.widest, `${path} @ ${width}px`).toBeLessThanOrEqual(result.client + 1);
      }
    });
  }

  test("lange begrepsnavn brytes i stedet for å kuttes", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 900 });
    await page.goto("/begrep/noyaktighet");
    const heading = page.getByRole("heading", { level: 1 });
    await expect(heading).toHaveText("Riktighet, presisjon og nøyaktighet");
    const box = (await heading.boundingBox())!;
    expect(box.height).toBeGreaterThan(40);
    expect(await heading.evaluate((node) => getComputedStyle(node).textOverflow)).toBe("clip");
  });

  test("bred demonstrasjon strekker seg utenfor lesespalten på stor skjerm", async ({ page }) => {
    await page.setViewportSize({ width: 1600, height: 1000 });
    await page.goto("/begrep/opplosning");
    const figure = page.getByRole("figure");
    const paragraph = page.getByRole("heading", { level: 1 });
    const figureBox = (await figure.boundingBox())!;
    const textBox = (await paragraph.boundingBox())!;
    expect(figureBox.width).toBeGreaterThan(textBox.width);
  });

  test("teksten står stille når demonstrasjonen er bred", async ({ page }) => {
    await page.setViewportSize({ width: 1600, height: 1000 });
    await page.goto("/begrep/linearitet");
    const definition = page.locator("article p").first();
    const wideBox = (await definition.boundingBox())!;
    await page.goto("/begrep/presisjon");
    const narrowBox = (await page.locator("article p").first().boundingBox())!;
    expect(wideBox.x).toBe(narrowBox.x);
    expect(wideBox.width).toBe(narrowBox.width);
  });

  test("lesespalten stopper på 38rem", async ({ page }) => {
    await page.setViewportSize({ width: 1600, height: 1000 });
    await page.goto("/begrep/presisjon");
    const paragraph = page.locator("article p").first();
    const box = (await paragraph.boundingBox())!;
    expect(box.width).toBeLessThanOrEqual(38 * 16 + 1);
  });

  test("A–Å beholder treffflatene på bokstavene ved 320px", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 900 });
    await page.goto("/a-aa");
    const letter = page.getByRole("link", { name: "P", exact: true });
    const box = (await letter.boundingBox())!;
    expect(box.width).toBeGreaterThanOrEqual(34);
    expect(box.height).toBeGreaterThanOrEqual(40);
  });

  test("bokstavbaren er sticky under headeren uansett headerhøyde", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 700 });
    await page.goto("/a-aa");
    const header = page.locator("header");
    const bar = page.getByRole("navigation", { name: "Hopp til bokstav" });
    await page.mouse.wheel(0, 600);
    await page.waitForTimeout(200);
    const headerBox = (await header.boundingBox())!;
    const barBox = (await bar.boundingBox())!;
    expect(Math.round(barBox.y)).toBeGreaterThanOrEqual(
      Math.round(headerBox.y + headerBox.height) - 1,
    );
  });

  test("kategorigriddet går fra én til flere spalter", async ({ page }) => {
    const columnsAt = async (width: number) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/");
      await page.getByRole("link", { name: "Kvalitet i måling", exact: true }).waitFor();
      return page.evaluate(() => {
        const grid = document.querySelector("main div[class*='grid']") as HTMLElement;
        return getComputedStyle(grid).gridTemplateColumns.split(" ").length;
      });
    };
    expect(await columnsAt(320)).toBe(1);
    expect(await columnsAt(768)).toBe(2);
    expect(await columnsAt(1280)).toBeGreaterThanOrEqual(3);
  });
});
