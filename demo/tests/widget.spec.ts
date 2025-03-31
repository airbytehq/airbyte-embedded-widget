import { test, expect } from "@playwright/test";

test("widget opens and displays correctly", async ({ page }) => {
  // Start the dev server
  await page.goto("https://localhost:5173");

  // Accept any SSL certificate warnings
  await page.getByRole("button", { name: "Advanced" }).click();
  await page.getByRole("button", { name: "Proceed to localhost (unsafe)" }).click();

  // Check if the widget button is present
  const widgetButton = page.getByRole("button", { name: "Open Airbyte" });
  await expect(widgetButton).toBeVisible();

  // Click the button to open the widget
  await widgetButton.click();

  // Check if the dialog is visible
  const dialog = page.getByRole("dialog", { name: "Airbyte Widget" });
  await expect(dialog).toBeVisible();

  // Check if the iframe is present
  const iframe = page.frameLocator("iframe");
  await expect(iframe).toBeVisible();

  // Close the dialog
  await page.getByRole("button", { name: "Close" }).click();

  // Check if the dialog is closed
  await expect(dialog).not.toBeVisible();
});
