import { expect, test } from "@playwright/test";

test.describe("tema", () => {
  test("følger systemet, lagrer overstyring og kan gå tilbake til systemvalg", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "dark" });
    await page.goto("/");

    const theme = page.getByRole("combobox", { name: "Utseende" });
    await expect(theme).toHaveValue("system");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");

    await theme.selectOption("light");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");

    await page.reload();
    await expect(theme).toHaveValue("light");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");

    await theme.selectOption("system");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");

    await page.emulateMedia({ colorScheme: "light" });
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  });
});
