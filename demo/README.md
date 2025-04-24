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

2. Create a `.env` file in this directory with the following:

```env
CLIENT_ID=
CLIENT_SECRET=
ORGANIZATION_ID=
WORKSPACE_ID=
B_BASE_URL=
```

## Development

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
