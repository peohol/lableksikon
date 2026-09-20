import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const PAGES = [
  ["forsiden", "/"],
  ["søkeresultat", "/?q=usikkerhet"],
  ["kategoriside", "/kategori/kalibrering"],
  ["A–Å", "/a-aa"],
  ["begrep med interaktiv demonstrasjon", "/begrep/presisjon"],
  ["begrep med stor graf", "/begrep/opplosning"],
  ["separasjonsbegrep med statisk demonstrasjon", "/begrep/dodvolum"],
  ["deteksjonsbegrep med statisk demonstrasjon", "/begrep/mrm"],
  ["prøvetakingsbegrep med statisk demonstrasjon", "/begrep/representativ"],
  ["kvalitetssikringskategori", "/kategori/kvalitetssikring"],
  ["kvalitetssikringsbegrep", "/begrep/internkontroll"],
  ["enhetskategori", "/kategori/enheter"],
  ["enhetsbegrep", "/begrep/ppm"],
  ["feilkildekategori", "/kategori/feilkilder"],
  ["feilkildebegrep", "/begrep/grovfeil"],
  ["begrep med formel", "/begrep/standardavvik"],
  ["ny interaktiv kvalitetsdemo", "/begrep/repeterbarhet"],
  ["ny interaktiv statistikkdemo", "/begrep/median"],
  ["begrep med stegvis demonstrasjon", "/begrep/standardaddisjon"],
];

test.describe("automatisert tilgjengelighetssjekk", () => {
  test.skip(({ hasTouch }) => hasTouch, "Kjøres én gang, på desktop-profilen.");

  for (const [name, path] of PAGES) {
    test(`${name} har ingen aksefeil`, async ({ page }) => {
      await page.goto(path as string);
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();
      expect(results.violations).toEqual([]);
    });
  }

  test("åpen dybde og åpen forhåndsvisning har ingen aksefeil", async ({ page }) => {
    await page.goto("/begrep/presisjon");
    await page.locator("summary").click();
    await page.getByRole("link", { name: "måleusikkerhet", exact: true }).hover();
    await expect(page.getByRole("dialog")).toBeVisible();
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  });

  test("siden er på norsk bokmål", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("lang", "nb");
  });
});
