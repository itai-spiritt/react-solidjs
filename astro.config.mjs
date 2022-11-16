import { defineConfig } from "astro/config";

// https://astro.build/config
import react from "@astrojs/react";
import solidJs from "@astrojs/solid-js";

// https://astro.build/config
export default defineConfig({
  output: "server",
  integrations: [react(), solidJs()],
});
