import { test, expect } from "@playwright/test";

test.describe("Airbyte Widget", () => {
  test.beforeEach(async ({ page }) => {
    // Add route interception to mock the API response
    await page.route("**/api/widget_token", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: "eyJ0b2tlbiI6ICJtb2NrLXRva2VuIiwgIndpZGdldFVybCI6ICJodHRwczovL2Zvby5haXJieXRlLmNvbS9lbWJlZGRlZC13aWRnZXQmd29ya3NwYWNlSWQ9Zm9vJmFsbG93ZWRPcmlnaW49aHR0cHMlM0ElMkYlMkZsb2NhbGhvc3QlM0EzMDAzIn0",
      });
    });

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
