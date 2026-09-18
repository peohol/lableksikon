import { expect, test, type Page } from "@playwright/test";

const EXPECTED_PUBLIC_URLS = 117;

async function columnCount(page: Page, selector: string) {
  return page.locator(selector).evaluate((node) => {
    const columns = getComputedStyle(node as HTMLElement).gridTemplateColumns;
    return columns === "none" ? 1 : columns.split(" ").length;
  });
}

test.describe("produksjonskontrakt", () => {
  test.skip(({ hasTouch }) => hasTouch, "Kjøres én gang med eksplisitte viewporter.");

  test("sitemap og robots dekker hele den offentlige flaten", async ({ request }) => {
    const sitemap = await request.get("/sitemap.xml");
    expect(sitemap.status()).toBe(200);
    const xml = await sitemap.text();
    const locations = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);

    expect(locations).toHaveLength(EXPECTED_PUBLIC_URLS);
    expect(locations.some((url) => new URL(url).pathname === "/a-aa")).toBe(true);
    expect(locations.some((url) => new URL(url).pathname === "/kategori/feilkilder")).toBe(true);
    expect(locations.some((url) => new URL(url).pathname === "/begrep/grovfeil")).toBe(true);
    expect(new Set(locations).size).toBe(locations.length);

    const robots = await request.get("/robots.txt");
    expect(robots.status()).toBe(200);
    const robotsText = await robots.text();
    expect(robotsText).toContain("User-Agent: *");
    expect(robotsText).toContain("Allow: /");
    expect(robotsText).toMatch(/Sitemap: https?:\/\//);
  });

  test("offentlige sidetyper har komplett delingsmetadata", async ({ page }) => {
    const pages = [
      ["/", "Lableksion — begrepene i analytisk kjemi, forklart"],
      ["/kategori/kvalitet", "Kvalitet i måling — Lableksion"],
      ["/a-aa", "Alle begreper A–Å — Lableksion"],
    ] as const;

    for (const [path, title] of pages) {
      await page.goto(path);
      await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", title);
      await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute("content", "nb_NO");
      await expect(page.locator('meta[property="og:site_name"]')).toHaveAttribute("content", "Lableksion");

      const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
      expect(canonical).toBeTruthy();
      expect(new URL(canonical as string).pathname).toBe(path);
    }
  });

  test("begrepssider har komplett delings- og strukturert metadata", async ({ page }) => {
    await page.goto("/begrep/presisjon");

    await expect(page).toHaveTitle("Presisjon — Lableksion");
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /gjentatte målinger/);
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", "Presisjon — Lableksion");
    await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute("content", "nb_NO");
    await expect(page.locator('meta[property="og:site_name"]')).toHaveAttribute("content", "Lableksion");

    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    expect(canonical).toBeTruthy();
    expect(new URL(canonical as string).pathname).toBe("/begrep/presisjon");

    const rawJsonLd = await page.locator('script[type="application/ld+json"]').textContent();
    const jsonLd = JSON.parse(rawJsonLd as string);
    expect(jsonLd["@type"]).toBe("DefinedTerm");
    expect(jsonLd.inLanguage).toBe("nb");
    expect(new URL(jsonLd.url).pathname).toBe("/begrep/presisjon");
    expect(new URL(jsonLd.inDefinedTermSet.url).pathname).toBe("/");
    expect(jsonLd.citation.length).toBeGreaterThan(0);
  });

  test("normative sidebredder og grid skalerer ved alle referansebredder", async ({ page }) => {
    const viewports = [
      { width: 320, homeColumns: 1, indexColumns: 1 },
      { width: 768, homeColumns: 2, indexColumns: 2 },
      { width: 1280, homeColumns: 3, indexColumns: 3 },
      { width: 1600, homeColumns: 3, indexColumns: 3 },
    ];

    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: 1000 });

      await page.goto("/");
      const home = page.locator("main > div");
      const homeBox = (await home.boundingBox())!;
      expect(homeBox.width, `forside @ ${viewport.width}px`).toBeLessThanOrEqual(78 * 16 + 1);

      const categoryGrid = page.locator("main div[class*='grid']").first();
      expect(await columnCount(page, "main div[class*='grid']")).toBe(viewport.homeColumns);
      await expect(categoryGrid).toBeVisible();

      await page.goto("/begrep/noyaktighet");
      const definition = page.locator("article header").locator("p").last();
      const definitionBox = (await definition.boundingBox())!;
      expect(definitionBox.width, `lesespalte @ ${viewport.width}px`).toBeLessThanOrEqual(38 * 16 + 1);

      const figure = page.getByRole("figure");
      const details = page.locator("details");
      const sources = page.getByRole("heading", { name: "Fagkilder" });
      const navigation = page.getByRole("navigation", { name: "Bla mellom begreper" });
      const figureBox = (await figure.boundingBox())!;
      const detailsBox = (await details.boundingBox())!;
      const sourcesBox = (await sources.boundingBox())!;
      const navigationBox = (await navigation.boundingBox())!;
      expect(figureBox.y).toBeLessThan(detailsBox.y);
      expect(detailsBox.y).toBeLessThan(sourcesBox.y);
      expect(sourcesBox.y).toBeLessThan(navigationBox.y);

      await page.goto("/a-aa");
      expect(await columnCount(page, "#bok-s > div")).toBe(viewport.indexColumns);
    }
  });

  test("sticky header forblir forankret uten å dekke innhold", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 700 });
    await page.goto("/a-aa");

    const header = page.locator("header");
    const letterBar = page.getByRole("navigation", { name: "Hopp til bokstav" });
    await page.mouse.wheel(0, 800);
    await page.waitForTimeout(100);

    const headerBox = (await header.boundingBox())!;
    const letterBarBox = (await letterBar.boundingBox())!;
    expect(Math.round(headerBox.y)).toBe(0);
    expect(letterBarBox.y).toBeGreaterThanOrEqual(headerBox.height - 1);
  });
});
