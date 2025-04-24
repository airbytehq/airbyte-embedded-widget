# Airbyte Embedded Widget Demo

This is a demo application showcasing the usage of the Airbyte Embedded Widget. It provides a simple example of how to integrate and configure the widget in a web application.

## Features

- HTTPS-enabled development server
- Environment variable configuration
- Basic styling and layout
- API token handling
- Real-time widget updates

## Setup

1. Install dependencies:

```bash
pnpm install
```

2. Fetch embedded token

To use this library, you will first need to fetch an Airbyte Embedded token. You should do this in your server, though if you are simply testing this locally, you can use:

```
curl --location '$AIRBYTE_BASE_URL/api/public/v1/embedded/widget' \
--header 'Content-Type: application/json' \
--header 'Accept: text/plain' \
--data '{
  "workspaceId": "$CUSTOMER_WORKSPACE_ID",
  "allowedOrigin": "$EMBEDDING_ORIGIN"
}'
```

`AIRBYTE_BASE_URL`: where your Airbyte instance is deployed
`CUSTOMER_WORKSPACE_ID`: the workspace you have associated with this customer
`EMBEDDING_ORIGIN` here refers to where you are adding this widget to. It will be used to generate an `allowedOrigin` parameter for the webapp to open communications with the widget. If you are running the widget locally using our demo app, the allowed origin should be `https://localhost:3003`, for example.

You can also, optionally, send an `externalUserId` in your request and we will attach it to the jwt encoded within the Airbyte Embedded token for provenance purposes.

Embedded tokens are short-lived (15-minutes) and only allow an end user to create and edit Airbyte source configurations within the workspace you have created for them.

3. Create a `.env` file in the `/demo` directory:

```env
CLIENT_ID=
CLIENT_SECRET=
ORGANIZATION_ID=
WORKSPACE_ID=
B_BASE_URL=
```

You can fetch an Airbyte Embedded token using the curl request example above.

Start the backend server:

```bash
env $(cat .env | xargs) node server.js
```

The server will start at `https://localhost:3001`.

To start the frontend serve:

```bash
npx serve .
```

You may need to accept the self-signed certificate warning in your browser.

## Project Structure

- `index.html` - Main HTML file with widget container
- `server.js` - Backend server requesting the embedded URL
- `.env` - Environment variables (not committed to git)

## Note

This is a demo application for testing and showcasing the Airbyte Embedded Widget. For production use, refer to the main project's README for integration instructions.

## License

This demo application is part of the Airbyte Embedded Widget package. Please see the main [LICENSE.txt](../LICENSE.txt) for licensing information.
