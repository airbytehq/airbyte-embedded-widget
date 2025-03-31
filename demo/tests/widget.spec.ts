import { test, expect } from "@playwright/test";

test.describe("Airbyte Widget", () => {
  test.beforeEach(async ({ page }) => {
    // Enable verbose logging
    page.on("console", (msg) => console.log("Browser console:", msg.text()));
    page.on("pageerror", (err) => console.error("Browser error:", err));

    // Mock all required API endpoints
    await page.route("**/api/v1/applications/token", async (route) => {
      console.log("Token request intercepted");
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ access_token: "test-token" }),
      });
    });

    // Mock config templates endpoint
    await page.route("**/api/v1/config_templates/list", async (route) => {
      console.log("Config templates request intercepted");
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          configTemplates: [],
          totalCount: 0,
        }),
      });
    });

    // Mock any other API endpoints that might be called
    await page.route("**/api/v1/**", async (route) => {
      console.log(`API request intercepted: ${route.request().url()}`);
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({}),
      });
    });

    // Navigate to the page and wait for network idle
    console.log("Navigating to page...");
    await page.goto("/", { waitUntil: "networkidle" });
    console.log("Page loaded");

    // Wait for either the widget button to appear or an error message
    console.log("Waiting for widget initialization...");
    await Promise.race([
      page.waitForSelector("button.airbyte-widget-button:has-text('Open Airbyte')", { timeout: 10000 }),
      page.waitForSelector("#error", { timeout: 10000 }),
    ]);

    // Check for any error messages
    const errorEl = page.locator("#error");
    const errorText = await errorEl.textContent();
    if (errorText && errorText.trim()) {
      console.error("Error on page:", errorText);
      throw new Error(`Widget initialization failed: ${errorText}`);
    }

    // Verify widget button is present
    const button = page.locator("button.airbyte-widget-button:has-text('Open Airbyte')");
    await expect(button).toBeVisible();
    console.log("Widget button is visible");
  });

  test("widget opens and closes correctly", async ({ page }) => {
    console.log("Starting widget test...");

    // Click the button to open the widget
    const button = page.locator("button.airbyte-widget-button:has-text('Open Airbyte')");
    await button.click();
    console.log("Widget button clicked");

    // Check if the dialog is visible
    const dialog = page.locator("dialog.airbyte-widget-dialog");
    await expect(dialog).toBeVisible();
    console.log("Dialog is visible");

    // Check if the iframe is present and visible
    const iframeElement = page.locator("iframe.airbyte-widget-iframe");
    await expect(iframeElement).toBeVisible();
    console.log("Iframe is visible");

    // Verify iframe source contains required parameters
    const iframeSrc = await iframeElement.getAttribute("src");
    console.log("Iframe src:", iframeSrc);
    expect(iframeSrc).toContain("workspaceId=");
    expect(iframeSrc).toContain("organizationId=");
    expect(iframeSrc).toContain("auth=");

    // Close the dialog
    const closeButton = page.locator("button.airbyte-widget-close");
    await closeButton.click();
    console.log("Dialog closed");

    // Verify dialog is closed
    await expect(dialog).not.toBeVisible();
    console.log("Dialog is not visible");
  });
});
