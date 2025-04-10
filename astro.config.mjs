import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from "@astrojs/react";

import tailwindcss from '@tailwindcss/vite';

const DEV_PORT = 2121;


// https://astro.build/config
export default defineConfig({
  site: process.env.CI ? 'https://scorched.report' : `http://localhost:${DEV_PORT}`,
  base: process.env.CI ? undefined : undefined,

  // output: 'server',

  server: {
    /* Dev. server only */
    port: DEV_PORT
  },

  integrations: [
    //
    sitemap(), react()
  ],

  redirects: {
    '/naze': '/leaderboards/performance/',
    '/Naze': '/leaderboards/performance/',
    '/asianketchup': '/leaderboards/playtime/',
    '/AsianKetchup': '/leaderboards/playtime/',
  },

  vite: {
    plugins: [tailwindcss()]
  }
});