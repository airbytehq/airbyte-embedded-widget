/** @type {import('next').NextConfig} */
const nextConfig = {
  // This tells Next.js to look at the source code of the specified package(s)
  // and compile it as part of the application build, enabling HMR.
  transpilePackages: ["@airbyte-embedded/airbyte-embedded-widget"],
  // Enable externalDir to properly handle external package resources
  experimental: {
    externalDir: true,
  },
};

module.exports = nextConfig;
