import { defineConfig } from 'astro/config';

// https://astro.build/config
import tailwind from "@astrojs/tailwind";
import vue from "@astrojs/vue";


// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), vue()],
});