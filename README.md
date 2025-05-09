# Airbyte Embedded Widget

An embeddable widget for integrating Airbyte's data synchronization capabilities into your application.

## Features

Easy, lightweight integration for Airbyte Embedded customers to enable user configurations within any web application

## Usage

You can use the widget in two ways:

### Option 1: Via npm (React/Vue/etc.)

Install the package:

```bash
pnpm add @airbyte-embedded/airbyte-embedded-widget
# or npm install / yarn add
```

Use it in your application:

```html
<button id="open-airbyte">Open Airbyte</button>

<script type="module">
  import { AirbyteEmbeddedWidget } from "@airbyte-embedded/airbyte-embedded-widget";

  const widget = new AirbyteEmbeddedWidget({
    token: "<your-token-here>",
    onEvent: (event) => {
      console.log("Widget event:", event);
    },
  });

  document.getElementById("open-airbyte").addEventListener("click", () => widget.open());
</script>
```

---

### Option 2: Via `<script>` tag (CDN)

Load the widget via a CDN:

```html
<button id="open-airbyte">Open Airbyte</button>

<script src="https://cdn.jsdelivr.net/npm/@airbyte-embedded/airbyte-embedded-widget@0.4.2"></script>
<script>
  const widget = new AirbyteEmbeddedWidget({
    token: "<your-token-here>",
    onEvent: (event) => {
      console.log("Widget event:", event);
    },
  });

  document.getElementById("open-airbyte").addEventListener("click", () => widget.open());
</script>
```

---

### Authentication

To use this library, you will first need to fetch an Airbyte Embedded token. You should do this in your server, though if you are simply testing this locally, you can use:

```bash
curl --location '$AIRBYTE_BASE_URL/api/public/v1/embedded/widget' \
--header 'Content-Type: application/json' \
--header 'Accept: text/plain' \
--data '{
  "workspaceId": "$CUSTOMER_WORKSPACE_ID",
  "allowedOrigin": "$EMBEDDING_ORIGIN"
}'
```

- `AIRBYTE_BASE_URL`: where your Airbyte instance is deployed
- `CUSTOMER_WORKSPACE_ID`: the workspace you have associated with this customer
- `EMBEDDING_ORIGIN`: the origin where you're embedding the widget (used for CORS validation)

You can also, optionally, send an `externalUserId` in your request and we will attach it to the JWT encoded within the Airbyte Embedded token for provenance.

Embedded tokens are short-lived (15 minutes) and only allow the user to create/edit configurations within the scoped workspace.

---

### Event Callbacks

You can pass an `onEvent` callback to receive messages when the user completes actions in the widget:

```ts
{
  type: "end_user_action_result";
  message: "partial_user_config_created" | "partial_user_config_updated";
  data: PartialUserConfigRead;
}
```

Or, in case of error:

```ts
{
  type: "end_user_action_result";
  message: "partial_user_config_update_error" | "partial_user_config_create_error";
  error: Error;
}
```

Use this to trigger actions like refreshing your UI or storing source IDs.

---

### Configuration Example

```html
<button id="open-airbyte">Open Airbyte</button>

<script>
  const widget = new AirbyteEmbeddedWidget({
    token: "<your-token-here>",
    onEvent: handleWidgetEvent,
  });

  document.getElementById("open-airbyte").addEventListener("click", () => widget.open());
</script>
```

## Demo Application

The demo application in the `/demo` directory shows a complete example of integrating the widget. It includes:

- Environment variable configuration
- Basic styling and layout
- API token handling

## Project Structure

- `/src` - The widget library source code
- `/demo` - A demo application showcasing the widget usage

## Installation

```bash
# Using pnpm (highly recommended)
pnpm install

# Using npm
npm install

# Using yarn
yarn install
```

## Building the Library

To build the widget library:

```bash
pnpm build
```

The built files will be in the `dist` directory.

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
