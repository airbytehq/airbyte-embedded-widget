# Airbyte Embedded Widget

An embeddable widget for integrating Airbyte's data synchronization capabilities into your application.

## Features

Easy, lightweight integration for Airbyte Embedded customers to enable user configurations within any web application

## Usage


To use this library, you will first need to follow the setup guide for Airbyte Embedded.

https://docs.airbyte.com/ai-agents/embedded/widget/quickstart

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
