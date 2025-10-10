import { expect, test } from "@playwright/test";
import { loggerUtil } from "./utils";
test.describe("Supabase Blogs Feed on blogs Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/en/blogs");
    await page.waitForLoadState("networkidle");
  });

  test("should display blogs list", async ({ page }) => {
    await page
      .locator('.grid, [data-testid="blog-data"]')
      .first()
      .waitFor({ state: "visible", timeout: 15000 });

    const blogItem = page.locator('[data-testid="blog-item"]').first();
    await expect(blogItem).toBeVisible({ timeout: 15000 });
    loggerUtil({
      text: "blog item on Home page was successfully displayed",
      value: "Done!",
    });

    const blogCount = await page.locator('[data-testid="blog-item"]').count();
    expect(blogCount).toBeGreaterThan(0);
    loggerUtil({
      text: "blog count is greater than 0",
      value: "Done!",
    });
  });

  test("should render blogs in responsive grid", async ({ page }) => {
    await page.locator(".grid").waitFor({ state: "visible", timeout: 15000 });

    const gridContainer = page.locator(".grid");
    await expect(gridContainer).toBeVisible();

    const className = await gridContainer.getAttribute("class");
    expect(className).toContain("grid-cols-1");
    expect(className).toContain("sm:grid-cols-2");
    expect(className).toContain("lg:grid-cols-3");
    loggerUtil({
      text: "blog items are in responsive friendly grid",
      value: "Done!",
    });
  });
});
