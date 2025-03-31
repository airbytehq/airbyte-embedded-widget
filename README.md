# Airbyte Embedded Widget

A lightweight, embeddable widget for integrating Airbyte's data synchronization capabilities into your application.

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

The demo server will start at `https://localhost:3000`. You may need to accept the self-signed certificate warning in your browser.

## Building the Library

To build the widget library:

```bash
pnpm build
```

The built files will be in the `dist` directory.

## Usage

```typescript
import { EmbeddedWidget } from "airbyte-embedded-widget";

// Initialize the widget
const widget = new EmbeddedWidget({
  organizationId: "your_organization_id",
  workspaceId: "your_customer_workspace_id",
  token: "your_api_token",
  // Additional configuration options
});

// Mount the widget
widget.mount("#widget-container");
```

## Demo Application

The demo application in the `/demo` directory shows a complete example of integrating the widget. It includes:

- HTTPS setup with Vite
- Environment variable configuration
- Basic styling and layout
- API token handling

To configure the demo, create a `.env` file in the `/demo` directory:

```env
VITE_API_TOKEN=your_api_token_here
```

## License

This software is proprietary and confidential. Commercial terms apply. Please see [LICENSE.txt](LICENSE.txt) for details or contact Airbyte, Inc. for licensing information.
