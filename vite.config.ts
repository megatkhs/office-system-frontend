/// <reference types="vitest" />
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import generouted from "@generouted/react-router/plugin";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), generouted()],
  resolve: {
    alias: [{ find: "@/", replacement: `${__dirname}/src/` }],
  },
  test: {
    globals: true,
    // vitest runnerがディレクトリ階層を考慮していないためrootを指定
    root: __dirname,
    environment: "happy-dom",
    setupFiles: "./vitest.setup.ts",
    coverage: {
      provider: "c8",
      reportsDirectory: "./.coverage",
    },
  },
});
