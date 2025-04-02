#! /usr/bin/env bash

set -e

PACKAGE_NAME=$(jq -r '.name' package.json)
CURRENT_VERSION=$(jq -r '.version' package.json)
LATEST_VERSION_ON_NPM=$(pnpm view $PACKAGE_NAME version)

if [ "$CURRENT_VERSION" == "$LATEST_VERSION_ON_NPM" ]; then
  echo "Current version is the same as the latest version on npm. Nothing to do here ✅"
  exit 0
fi

echo "⚙️ Publishing $PACKAGE_NAME@$CURRENT_VERSION to npm..."

pnpm publish
