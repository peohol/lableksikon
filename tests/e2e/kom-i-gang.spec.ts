import { expect, test } from "@playwright/test";

test.describe("Nybegynnerguide for nettapp", () => {
  test("guiden kan åpnes fra forsiden og forklarer tjenestene", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Slik kommer du i gang →" }).click();

    await expect(page).toHaveURL(/\/kom-i-gang$/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Lag din første nettapp");
    await expect(page.getByRole("heading", { name: "Hva er egentlig en nettapp?" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Opprett GitHub-konto og et repo" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Koble Vercel til GitHub" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Velg Claude Code eller Codex i nettleseren" })).toBeVisible();

    await expect(page.getByRole("link", { name: /Offisiell veiledning for Claude Code i skyen/ })).toHaveAttribute(
      "href",
      "https://code.claude.com/docs/en/web-quickstart",
    );
    await expect(page.getByRole("link", { name: /Offisiell veiledning for Codex Cloud/ })).toHaveAttribute(
      "href",
      "https://developers.openai.com/codex/environments/cloud-environments",
    );
  });

  test("den lille nettappen kan brukes med tastatur", async ({ page }) => {
    await page.goto("/kom-i-gang");
    const button = page.getByRole("button", { name: "Trykk her" });
    await button.focus();
    await page.keyboard.press("Enter");
    await page.keyboard.press("Space");

    await expect(page.getByText("Du har trykket 2 ganger.")).toBeVisible();
  });

  test("begge teksteksemplene tilbys med kopieringsknapper", async ({ page }) => {
    await page.goto("/kom-i-gang");

    await expect(page.getByText("Fil: index.html")).toBeVisible();
    await expect(page.getByText("Eksempel på en oppgave")).toBeVisible();
    await expect(page.getByRole("button", { name: "Kopier tekst" })).toHaveCount(2);
    await expect(page.getByText("<!doctype html>")).toBeVisible();
  });

  test("innholdet kan leses på en smal skjerm uten horisontal rulling", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 740 });
    await page.goto("/kom-i-gang");

    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    );
    expect(hasHorizontalOverflow).toBe(false);
  });
});
