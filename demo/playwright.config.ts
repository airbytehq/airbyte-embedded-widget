import { defineConfig, devices } from "@playwright/test";
import { loadEnv } from "vite";

// Load test environment variables
const env = loadEnv("test", process.cwd(), "");

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: "https://localhost:3000",
    trace: "on-first-retry",
    ignoreHTTPSErrors: true,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: "NODE_ENV=test pnpm dev",
    url: "https://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000, // 120 seconds
    ignoreHTTPSErrors: true,
    env: {
      NODE_ENV: "test",
      VITE_AB_BASE_URL: env.VITE_AB_BASE_URL,
      VITE_AB_API_CLIENT_ID: env.VITE_AB_API_CLIENT_ID,
      VITE_AB_API_CLIENT_SECRET: env.VITE_AB_API_CLIENT_SECRET,
      VITE_AB_WORKSPACE_ID: env.VITE_AB_WORKSPACE_ID,
      VITE_AB_ORGANIZATION_ID: env.VITE_AB_ORGANIZATION_ID,
    },
  },
});
