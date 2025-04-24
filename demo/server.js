const express = require("express");

// Disable SSL verification for development
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware for parsing JSON requests
app.use(express.json());

// Add CORS middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// Read config from environment variables
const BASE_URL = process.env.BASE_URL || "https://api.airbyte.com";
const AIRBYTE_WIDGET_URL = `${BASE_URL}/v1/embedded/widget`;
const AIRBYTE_ACCESS_KEY_URL = `${BASE_URL}/v1/applications/token`;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const WORKSPACE_ID = process.env.WORKSPACE_ID;
const ORGANIZATION_ID = process.env.ORGANIZATION_ID;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || "http://localhost:3000";

// GET /api/widget → fetch widget token and return it
app.get("/api/widget", async (req, res) => {
  try {
    console.log("CLIENT_ID", CLIENT_ID);
    console.log("CLIENT_SECRET", CLIENT_SECRET);
    const access_key_body = JSON.stringify({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      "grant-type": "client_credentials",
    });
    console.log("access_key_body", access_key_body);
    const response = await fetch(AIRBYTE_ACCESS_KEY_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: access_key_body,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error response from Airbyte:", errorText);
      return res.status(500).json({ error: "Failed to fetch access token" });
    }

    const access_key_response = await response.json();
    const access_key = access_key_response.access_token;
    console.log("access token acquired");

    const widget_token_response = await fetch(AIRBYTE_WIDGET_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_key}`,
      },
      body: JSON.stringify({
        workspaceId: WORKSPACE_ID,
        organizationId: ORGANIZATION_ID,
        allowedOrigin: ALLOWED_ORIGIN,
      }),
    });

    if (!widget_token_response.ok) {
      const errorText = await widget_token_response.text();
      console.error("Error response from Airbyte:", errorText);
      return res.status(500).json({ error: "Failed to fetch embedded token" });
    }

    const widget_token = await widget_token_response.text();
    console.log("embedded token", widget_token);
    res.json({ token: widget_token });
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /embedded_response → handle data from widget callback
app.post("/api/embedded_response", (req, res) => {
  console.log("Received embedded widget data:", req.body);
  res.status(200).send("OK");
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
