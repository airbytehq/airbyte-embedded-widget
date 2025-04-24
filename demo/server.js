const express = require("express");

const app = express();
const PORT = process.env.PORT || 3001;

// Read config from environment variables
const AIRBYTE_WIDGET_URL = "https://api.airbyte.com/v1/embedded/widget";
const AIRBYTE_ACCESS_KEY_URL = "https://api.airbyte.com/v1/applications/token";
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const WORKSPACE_ID = process.env.WORKSPACE_ID;
const ORGANIZATION_ID = process.env.ORGANIZATION_ID || "00000000-0000-0000-0000-000000000000";
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || "localhost";

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
    const access_key_response = await (await fetch(AIRBYTE_ACCESS_KEY_URL, {
      method: "POST",
      headers: {
        "accept": "application/json",
        "Content-Type": "application/json",
      },
      body: access_key_body,
    })).json();
    console.log("access_key_response", access_key_response);

    const access_key = await access_key_response.access_token;
    console.log("access key", access_key);

    const widget_token_response = await fetch(AIRBYTE_WIDGET_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${access_key}`,
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

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
