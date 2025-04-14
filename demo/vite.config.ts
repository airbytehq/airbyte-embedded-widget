import { defineConfig, loadEnv } from "vite";
import basicSsl from "@vitejs/plugin-basic-ssl";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [basicSsl()],
    server: {
      port: 3003,
      https: {},
    },
    define: {
      "process.env": env,
    },
    resolve: {
      alias: {
        "@": "/src",
      },
    },
  };
});
