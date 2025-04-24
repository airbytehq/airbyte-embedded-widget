import { test, expect } from "@playwright/test";

test.describe("Airbyte Widget", () => {
  test.beforeEach(async ({ page }) => {
    page.on("console", (msg) => console.log(`BROWSER LOG: ${msg.type()}: ${msg.text()}`));
    page.on("pageerror", (err) => console.error("BROWSER ERROR:", err.message));
    page.on("request", (request) => console.log(`>> ${request.method()} ${request.url()}`));
    page.on("response", (response) => console.log(`<< ${response.status()} ${response.url()}`));

    await page.goto("/", {
      timeout: 30000,
      waitUntil: "domcontentloaded",
    });

    await page.waitForLoadState("networkidle", { timeout: 10000 });

    const hasWidgetButton = (await page.locator("button.airbyte-widget-button").count()) > 0;
  });

  test("widget loads on the page", async ({ page }) => {
    await page.waitForSelector('button:has-text("Open Airbyte")', { timeout: 20000 });
    console.log("Found button by text content");
  });
});
