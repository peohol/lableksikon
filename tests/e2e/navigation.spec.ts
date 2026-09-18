import { expect, test } from "@playwright/test";

test.describe("URL-er og navigasjon", () => {
  test("forsiden lister kategorier og veien til A–Å", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Begrepene i analytisk kjemi, forklart så enkelt som mulig.",
    );
    await expect(page.getByRole("link", { name: "Kvalitet i måling", exact: true })).toBeVisible();
    await expect(page.getByRole("link", { name: /Alle \d+ begreper, A–Å/ })).toBeVisible();
  });

  test("går fra forside til begrep, kategori og tilbake", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Presisjon", exact: true }).click();
    await expect(page).toHaveURL(/\/begrep\/presisjon$/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Presisjon");

    await page.getByRole("link", { name: "Kvalitet i måling", exact: true }).click();
    await expect(page).toHaveURL(/\/kategori\/kvalitet$/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Kvalitet i måling");

    await page.goBack();
    await expect(page).toHaveURL(/\/begrep\/presisjon$/);
    await page.goForward();
    await expect(page).toHaveURL(/\/kategori\/kvalitet$/);
  });

  test("dyplenking og reload virker", async ({ page }) => {
    await page.goto("/begrep/mrm");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("MRM");
    await page.reload();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("MRM");
  });

  test("ukjent begrep gir 404-side, ikke en halvferdig begrepsside", async ({ page }) => {
    const response = await page.goto("/begrep/finnes-ikke");
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Siden finnes ikke.");
  });

  test("upubliserte begreper har ingen side", async ({ page }) => {
    const response = await page.goto("/begrep/ringtest");
    expect(response?.status()).toBe(404);
  });

  test("søketilstanden ligger i URL-en og kan deles", async ({ page }) => {
    await page.goto("/");
    await page.getByLabel("Søk", { exact: true }).fill("pilkast");
    await expect(page).toHaveURL(/\?q=pilkast/);

    await page.goto("/?q=pilkast");
    await expect(page.getByLabel("Søk", { exact: true })).toHaveValue("pilkast");
    await expect(page.getByText("1 treff")).toBeVisible();
    await expect(page.getByText(/treff på beslektet ord/)).toBeVisible();
  });

  test("tomt søk gir to utveier, aldri en blindvei", async ({ page }) => {
    await page.goto("/?q=zzz");
    await expect(page.getByText("Ingen treff på «zzz».")).toBeVisible();
    await expect(page.getByRole("button", { name: "Vis alle kategorier" })).toBeVisible();
    await page.getByRole("link", { name: "Alle begreper A–Å" }).click();
    await expect(page).toHaveURL(/\/a-aa$/);
  });

  test("forrige/neste er global og sirkulær", async ({ page }) => {
    await page.goto("/begrep/ledningsevne");
    const next = page.getByRole("navigation", { name: "Bla mellom begreper" }).getByRole("link", {
      name: /Neste/,
    });
    await expect(next).toContainText("Presisjon");
    await next.click();
    await expect(page).toHaveURL(/\/begrep\/presisjon$/);
  });

  test("A–Å hopper til bokstavseksjonen", async ({ page }) => {
    await page.goto("/a-aa");
    await page.getByRole("link", { name: "P", exact: true }).click();
    await expect(page).toHaveURL(/#bok-p$/);
    await expect(page.locator("#bok-p")).toBeInViewport();
  });

  test("headersøket tar deg til begrepet", async ({ page }) => {
    await page.goto("/a-aa");
    await page.getByRole("combobox", { name: "Søk etter begrep" }).fill("matrise");
    const option = page.getByRole("option").first();
    await expect(option).toContainText("Matriseeffekt");
    await option.click();
    await expect(page).toHaveURL(/\/begrep\/matriseeffekt$/);
  });
});
