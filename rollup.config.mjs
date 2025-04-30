import typescript from "rollup-plugin-typescript2";
import { readFileSync } from "fs";

const pkg = JSON.parse(readFileSync("./package.json", "utf8"));

/** @type {import('rollup').RollupOptions} */
export default {
  input: "src/index.ts",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      sourcemap: true,
      exports: "named",
    },
    {
      file: pkg.module,
      format: "es",
      sourcemap: true,
    },
    {
      file: "dist/airbyte-embedded-widget.iife.js",
      format: "iife",
      name: "AirbyteEmbeddedWidget",
      sourcemap: true,
      extend: true,
      exports: "named",
      globals: {
        AirbyteEmbeddedWidget: "AirbyteEmbeddedWidget",
      },
    },
  ],
  plugins: [
    typescript({
      tsconfig: "./tsconfig.json",
      useTsconfigDeclarationDir: true,
    }),
  ],
};
