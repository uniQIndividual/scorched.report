import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import react from "@astrojs/react";
const DEV_PORT = 2121;


// https://astro.build/config
export default defineConfig({
  site: process.env.CI ? 'https://scorched.report' : `http://localhost:${DEV_PORT}`,
  base: process.env.CI ? undefined : undefined,
  // output: 'server',

  /* Like Vercel, Netlify,… Mimicking for dev. server */
  // trailingSlash: 'always',

  server: {
    /* Dev. server only */
    port: DEV_PORT
  },
  integrations: [
  //
  sitemap(), tailwind(), react()]
});