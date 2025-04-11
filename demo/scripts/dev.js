const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

// Load environment variables from .env file
const envPath = path.resolve(__dirname, "../.env");
dotenv.config({ path: envPath });

// Get or set default WEBAPP_URL from environment
const WEBAPP_URL = process.env.AB_WEBAPP_URL || "https://local.airbyte.dev";
console.log(`Using WEBAPP_URL: ${WEBAPP_URL}`);

// Function to decode base64 (Node.js replacement for browser's atob)
function atob(str) {
  return Buffer.from(str, "base64").toString("binary");
}

// Function to parse and manipulate the embedded token
function manipulateEmbeddedToken(token) {
  try {
    console.log("Intercepting and manipulating embedded token...");

    // Make sure the base64 string is properly padded
    const padded = token.padEnd(token.length + ((4 - (token.length % 4)) % 4), "=");

    // Replace URL-safe characters
    const base64 = padded.replace(/-/g, "+").replace(/_/g, "/");

    const decodedToken = JSON.parse(atob(base64));

    // Log original token data
    console.log("Original widget URL:", decodedToken.widgetUrl);

    // Extract and modify the widget URL
    const originalWidgetUrl = new URL(decodedToken.widgetUrl);

    const newWidgetUrl = new URL(
      `${WEBAPP_URL}${originalWidgetUrl.pathname.toString()}?${originalWidgetUrl.searchParams.toString()}`
    );

    decodedToken.widgetUrl = newWidgetUrl.toString();

    console.log("Modifying token with admin token from .env");
    // Allow optionally overriding the embedded scoped token with an instance admin one
    decodedToken.token = process.env.AB_ADMIN_TOKEN ?? decodedToken.token;

    // Log the modified widget URL
    console.log("Modified widget URL:", decodedToken.widgetUrl);

    // Return the manipulated token
    return btoa(JSON.stringify(decodedToken));
  } catch (error) {
    console.error("Error manipulating token:", error);
    return token; // Return original token if there's an error
  }
}

// Get the current embedded token
const originalToken = process.env.VITE_AB_EMBEDDED_TOKEN || "";

// Manipulate the token
const manipulatedToken = manipulateEmbeddedToken(originalToken);

// Create a temporary .env file with the manipulated token
const tempEnvPath = path.resolve(__dirname, "../.env.local");
const envContent = `VITE_AB_EMBEDDED_TOKEN="${manipulatedToken}"`;

fs.writeFileSync(tempEnvPath, envContent);
console.log("Created temporary .env.local with manipulated token");

// Start the Vite dev server
console.log("Starting Vite dev server...");
const viteProcess = spawn("pnpm", ["dev"], {
  stdio: "inherit",
  shell: true,
  cwd: path.resolve(__dirname, ".."),
  env: {
    ...process.env,
    VITE_AB_EMBEDDED_TOKEN: manipulatedToken,
  },
});

// Handle process exit
process.on("SIGINT", () => {
  console.log("Cleaning up...");

  // Clean up temporary .env file
  if (fs.existsSync(tempEnvPath)) {
    fs.unlinkSync(tempEnvPath);
    console.log("Removed temporary .env.local file");
  }

  viteProcess.kill("SIGINT");
  process.exit();
});

viteProcess.on("exit", () => {
  // Clean up temporary .env file
  if (fs.existsSync(tempEnvPath)) {
    fs.unlinkSync(tempEnvPath);
    console.log("Removed temporary .env.local file");
  }

  process.exit();
});
