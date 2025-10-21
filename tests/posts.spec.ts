import { expect, test } from "@playwright/test";
import { loggerUtil } from "./utils";

test.describe("Posts Feed on Main Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/my-site");
    await page.waitForLoadState("networkidle");
  });

  test("should display posts list", async ({ page }) => {
    const loadingText = page.getByText("Loading posts...");
    await loadingText
      .waitFor({ state: "hidden", timeout: 15000 })
      .catch(() => {});

    await page
      .locator('.grid, [data-testid="post-data"]')
      .first()
      .waitFor({ state: "visible", timeout: 15000 });

    const postItem = page.locator('[data-testid="post-item"]').first();
    await expect(postItem).toBeVisible({ timeout: 15000 });
    loggerUtil({
      text: "post item on Home page was successfully displayed",
      value: "Done!",
    });

    const postCount = await page.locator('[data-testid="post-item"]').count();
    expect(postCount).toBeGreaterThan(0);
    loggerUtil({
      text: "posts count is greater than 0",
      value: "Done!",
    });
  });

  test("should render posts in responsive grid", async ({ page }) => {
    await page.locator(".grid").waitFor({ state: "visible", timeout: 15000 });

    const gridContainer = page.locator(".grid");
    await expect(gridContainer).toBeVisible();

    const className = await gridContainer.getAttribute("class");
    expect(className).toContain("grid-cols-1");
    expect(className).toContain("sm:grid-cols-2");
    expect(className).toContain("lg:grid-cols-3");
    loggerUtil({
      text: "post items are in responsive friendly grid",
      value: "Done!",
    });
  });

  test("should have working read more link text", async ({ page }) => {
    await page.locator(".grid").waitFor({ state: "visible", timeout: 15000 });

    const firstPost = page.locator('[data-testid="post-item"]').first();
    await expect(firstPost).toBeVisible({ timeout: 15000 });

    const readMoreLink = firstPost.locator('a[href*="/posts/"]');
    await expect(readMoreLink).toBeVisible();
    loggerUtil({
      text: "read more link is visible",
      value: "Done!",
    });

    const linkText = await readMoreLink.textContent();
    expect(linkText).toBeTruthy();
    loggerUtil({
      text: "read more link text is truthy",
      value: "Done!",
    });
  });
});
