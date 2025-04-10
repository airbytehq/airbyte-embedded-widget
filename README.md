# Airbyte Embedded Widget

An embeddable widget for integrating Airbyte's data synchronization capabilities into your application.

## Features

Easy, lightweight integration for Airbyte Embedded customers to enable user configurations with any web application

## Installation

```bash
# Using pnpm (recommended)
pnpm install

# Using npm
npm install

# Using yarn
yarn install
```

## Project Structure

- `/src` - The widget library source code
- `/demo` - A demo application showcasing the widget usage

## Development

The project includes a demo application to showcase and test the widget. To run the demo:

```bash
cd demo
pnpm install
pnpm dev
```

The demo server will start at `https://localhost:3003`. You may need to accept the self-signed certificate warning in your browser.

## Building the Library

To build the widget library:

```bash
pnpm build
```

The built files will be in the `dist` directory.

## Usage

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

These values should be passed to where you initializze the widget like so:

```typescript
import { EmbeddedWidget } from "airbyte-embedded-widget";

// Initialize the widget
const widget = new EmbeddedWidget({
  token: res.token,
});
```

## Demo Application

The demo application in the `/demo` directory shows a complete example of integrating the widget. It includes:

- HTTPS setup with Vite
- Environment variable configuration
- Basic styling and layout
- API token handling

To configure the demo, create a `.env` file in the `/demo` directory:

```env
VITE_AB_EMBEDDED_TOKEN=""
```

You can fetch an Airbyte Embedded token using the curl request example above.

You can then run the demo app using `pnpm dev` and access a very simple example UI at `https://localhost:3003` in your browser.

## Publishing

This repository is configured to publish to npmjs.org whenever:

1. There is an update to the main branch.
2. A new version is created in the `package.json`.

To create a new version, you can use the following command:

```bash
pnpm version <major|minor|patch>
```

and then push those changes to the main branch. Don't forget the tags!

```bash
git push origin main --tags && git push
```

## License

This software is proprietary and confidential. Commercial terms apply. Please see [LICENSE.txt](LICENSE.txt) for details or contact Airbyte, Inc. for licensing information.
