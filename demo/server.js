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
const AIRBYTE_WIDGET_URL = `${BASE_URL}/v1/embedded/widget_token`;
const AIRBYTE_ACCESS_TOKEN_URL = `${BASE_URL}/v1/applications/token`;
const AIRBYTE_CLIENT_ID = process.env.AIRBYTE_CLIENT_ID;
const AIRBYTE_CLIENT_SECRET = process.env.AIRBYTE_CLIENT_SECRET;
const ORGANIZATION_ID = process.env.AIRBYTE_ORGANIZATION_ID;
const EXTERNAL_USER_ID = process.env.EXTERNAL_USER_ID;

// GET /api/widget → fetch widget token and return it
app.get("/api/widget_token", async (req, res) => {
  try {
    // Determine the allowed origin from the request
    const origin =
      req.headers.origin ||
      req.headers.referer?.replace(/\/$/, "") ||
      process.env.ALLOWED_ORIGIN ||
      "http://localhost:3000";

    const access_token_body = JSON.stringify({
      client_id: AIRBYTE_CLIENT_ID,
      client_secret: AIRBYTE_CLIENT_SECRET,
      "grant-type": "client_credentials",
    });
    const response = await fetch(AIRBYTE_ACCESS_TOKEN_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: access_token_body,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error response from Airbyte:", errorText);
      return res.status(500).json({ error: "Failed to fetch access token" });
    }

    const access_token_response = await response.json();
    const access_token = access_token_response.access_token;

    const widget_token_response = await fetch(AIRBYTE_WIDGET_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify({
        organizationId: ORGANIZATION_ID,
        allowedOrigin: origin,
        externalUserId: EXTERNAL_USER_ID,
      }),
    });

    if (!widget_token_response.ok) {
      const errorText = await widget_token_response.text();
      console.error("Error response from Airbyte:", errorText);
      return res.status(500).json({ error: "Failed to fetch embedded token" });
    }

    const widget_response = await widget_token_response.json();

    res.json({ token: widget_response.token });
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /embedded_response → handle data from widget callback
app.post("/api/embedded_response", (req, res) => {
  res.status(200).send("OK");
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
