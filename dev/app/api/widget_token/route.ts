import { NextRequest, NextResponse } from "next/server";

// Disable SSL verification for development environments
if (process.env.NODE_ENV !== "production") {
  // SECURITY WARNING: This is only for development environments!
  // Disabling SSL verification is a security risk - never do this in production.
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  console.warn(
    "⚠️ SSL verification is disabled in development mode. This is a security risk and should never be done in production."
  );
}

// Debug logging function that only logs in development
const debugLog = (message: string, data?: any) => {
  if (process.env.NODE_ENV !== "production") {
    console.log(`[Debug] ${message}`, data || "");
  }
};

const BASE_URL = process.env.NEXT_PUBLIC_AIRBYTE_PUBLIC_API_URL || "https://local.airbyte.dev/api/public";
const AIRBYTE_WIDGET_URL = `https://api.airbyte.com/v1/embedded/widget_token`;
const AIRBYTE_ACCESS_TOKEN_URL = `https://api.airbyte.com/v1/applications/token`;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
const CLIENT_SECRET = process.env.NEXT_PUBLIC_CLIENT_SECRET;
const EXTERNAL_ID = process.env.NEXT_PUBLIC_EXTERNAL_USER_ID;
const ORGANIZATION_ID = process.env.NEXT_PUBLIC_ORGANIZATION_ID;
export async function GET(request: NextRequest) {
  try {
    const referer = request.headers.get("referer");
    const host = request.headers.get("host");

    if (!referer || !host || !referer.includes(host)) {
      debugLog("CSRF check failed", { referer, host });
      return NextResponse.json({ error: "Invalid request origin" }, { status: 403 });
    }

    // Validate required environment variables
    if (!CLIENT_ID) {
      return NextResponse.json({ error: "Missing CLIENT_ID environment variable" }, { status: 500 });
    }

    if (!CLIENT_SECRET) {
      return NextResponse.json({ error: "Missing CLIENT_SECRET environment variable" }, { status: 500 });
    }

    if (!EXTERNAL_ID) {
      return NextResponse.json({ error: "Missing EXTERNAL_ID environment variable" }, { status: 500 });
    }

    if (!ORGANIZATION_ID) {
      return NextResponse.json({ error: "Missing ORGANIZATION_ID environment variable" }, { status: 500 });
    }

    // Get access token
    const accessTokenBody = JSON.stringify({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      "grant-type": "client_credentials",
    });
    console.log("Access token body:", accessTokenBody);

    const response = await fetch(AIRBYTE_ACCESS_TOKEN_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: accessTokenBody,
    });
    debugLog("Access token body:", accessTokenBody);
    debugLog("Response status:", response.status);
    debugLog("Response ok:", response.ok);

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch access token" }, { status: 500 });
    }

    const accessTokenResponse = await response.json();
    const accessToken = accessTokenResponse.access_token;

    // Verify we have the access token before proceeding
    if (!accessToken) {
      return NextResponse.json({ error: "Invalid access token response" }, { status: 500 });
    }

    debugLog("Access token received");

    // Determine the allowed origin from the request
    const origin =
      request.headers.get("origin") ||
      request.headers.get("referer")?.replace(/\/$/, "") ||
      process.env.NEXT_PUBLIC_ALLOWED_ORIGIN ||
      "http://localhost:3003";

    debugLog("Using origin:", origin);

    const widgetTokenResponse = await fetch(AIRBYTE_WIDGET_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        externalUserId: EXTERNAL_ID,
        organizationId: ORGANIZATION_ID,
        allowedOrigin: origin,
      }),
    });

    debugLog("Widget token response status:", widgetTokenResponse.status);

    if (!widgetTokenResponse.ok) {
      const errorText = await widgetTokenResponse.text();
      debugLog("Error response:", errorText);
      return NextResponse.json({ error: "Failed to fetch embedded token" }, { status: 500 });
    }

    const widgetTokenJson = await widgetTokenResponse.json();
    const widgetToken = widgetTokenJson.token;
    if (!!process.env.NEXT_PUBLIC_WEBAPP_URL) {
      // Decode the base64 token for debugging (it's a JSON object)
      try {
        const decodedToken = JSON.parse(Buffer.from(widgetToken, "base64").toString());
        debugLog("Decoded token:", decodedToken);
        const tokenUrl = new URL(decodedToken.widgetUrl);

        const newToken = {
          widgetUrl: `${process.env.NEXT_PUBLIC_WEBAPP_URL}/widget?${tokenUrl.searchParams.toString()}`,
          token: decodedToken.token,
        };
        debugLog("New token:", newToken);

        // Base64 encode the newToken object
        const encodedToken = Buffer.from(JSON.stringify(newToken)).toString("base64");

        //Return the token in the response
        return NextResponse.json({ token: encodedToken });
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        debugLog("Could not decode token (may not be base64):", errorMessage);
      }
    }

    return NextResponse.json({ token: widgetToken });
  } catch (err) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
