import { expect, test } from "@playwright/test";

test.describe("Posts Feed on Main Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/en");
    await page.waitForLoadState("networkidle");
  });

  test("should display posts list", async ({ page }) => {
    // Wait for loading text to disappear
    const loadingText = page.getByText("Loading posts...");
    await loadingText
      .waitFor({ state: "hidden", timeout: 15000 })
      .catch(() => {});

    // Wait for either the grid or post items to appear
    await page
      .locator('.grid, [data-testid="post-data"]')
      .first()
      .waitFor({ state: "visible", timeout: 15000 });

    const postItem = page.locator('[data-testid="post-item"]').first();
    await expect(postItem).toBeVisible({ timeout: 15000 });

    const postCount = await page.locator('[data-testid="post-item"]').count();
    expect(postCount).toBeGreaterThan(0);
  });

  // test("should display post title and body", async ({ page }) => {
  //   await page.locator(".grid").waitFor({ state: "visible", timeout: 15000 });

  //   const firstPost = page.locator('[data-testid="post-item"]').first();
  //   await expect(firstPost).toBeVisible({ timeout: 15000 });

  //   const title = firstPost.locator("h2");
  //   await expect(title).toBeVisible();
  //   const titleText = await title.textContent();
  //   expect(titleText).toBeTruthy();
  //   expect(titleText!.length).toBeGreaterThan(0);

  //   const body = firstPost.locator("p.text-gray-300");
  //   await expect(body).toBeVisible();
  //   const bodyText = await body.textContent();
  //   expect(bodyText).toBeTruthy();
  //   expect(bodyText!.length).toBeGreaterThan(0);
  // });

  // test("should have like button on each post", async ({ page }) => {
  //   await page.locator(".grid").waitFor({ state: "visible", timeout: 15000 });

  //   const firstPost = page.locator('[data-testid="post-item"]').first();
  //   await expect(firstPost).toBeVisible({ timeout: 15000 });

  //   const buttons = firstPost.locator("button");
  //   const buttonCount = await buttons.count();
  //   expect(buttonCount).toBeGreaterThan(0);
  // });

  // test("should display multiple posts in grid layout", async ({ page }) => {
  //   const gridContainer = page.locator(".grid.grid-cols-1");
  //   await expect(gridContainer).toBeVisible({ timeout: 15000 });

  //   await page.locator('[data-testid="post-item"]').first().waitFor({
  //     state: "visible",
  //     timeout: 15000,
  //   });

  //   const postCount = await page.locator('[data-testid="post-item"]').count();
  //   expect(postCount).toBeGreaterThanOrEqual(1);
  // });

  test("should render posts in responsive grid", async ({ page }) => {
    await page.locator(".grid").waitFor({ state: "visible", timeout: 15000 });

    const gridContainer = page.locator(".mt-8.px-4.grid");
    await expect(gridContainer).toBeVisible();

    const className = await gridContainer.getAttribute("class");
    expect(className).toContain("grid-cols-1");
    expect(className).toContain("sm:grid-cols-2");
    expect(className).toContain("lg:grid-cols-3");
  });

  test("should have working read more link text", async ({ page }) => {
    await page.locator(".grid").waitFor({ state: "visible", timeout: 15000 });

    const firstPost = page.locator('[data-testid="post-item"]').first();
    await expect(firstPost).toBeVisible({ timeout: 15000 });

    const readMoreLink = firstPost.locator('a[href*="/posts/"]');
    await expect(readMoreLink).toBeVisible();

    const linkText = await readMoreLink.textContent();
    expect(linkText).toBeTruthy();
  });

  // test("should display dots indicator on posts", async ({ page }) => {
  //   await page.locator(".grid").waitFor({ state: "visible", timeout: 15000 });

  //   const firstPost = page.locator('[data-testid="post-item"]').first();
  //   await expect(firstPost).toBeVisible({ timeout: 15000 });

  //   const actionsContainer = firstPost.locator(".flex.items-center.space-x-4");
  //   await expect(actionsContainer).toBeVisible();
  // });
  // test("DEBUG: check page content", async ({ page }) => {
  //   // Take a screenshot
  //   await page.screenshot({
  //     path: "playwright-report/homepage-debug.png",
  //     fullPage: true,
  //   });

  //   // Check what's rendered
  //   const bodyHTML = await page.locator("body").innerHTML();
  //   console.log("Body HTML length:", bodyHTML.length);

  //   // Check for key elements
  //   const hasWelcome = await page
  //     .getByText("welcome")
  //     .isVisible()
  //     .catch(() => false);
  //   const hasPostsMessage = await page
  //     .getByText("posts should be displayed")
  //     .isVisible()
  //     .catch(() => false);
  //   const hasGrid = await page
  //     .locator(".grid")
  //     .isVisible()
  //     .catch(() => false);
  //   const hasPostItems = await page
  //     .locator('[data-testid="post-item"]')
  //     .count();

  //   console.log({
  //     hasWelcome,
  //     hasPostsMessage,
  //     hasGrid,
  //     postCount: hasPostItems,
  //   });

  //   // This test always passes, it's just for debugging
  //   expect(true).toBe(true);
  // });
});
