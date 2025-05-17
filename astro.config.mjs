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
    '/gerbsnail': '/showcase/',
    '/GerbSnail': '/showcase/',
    '/asianketchup': '/leaderboards/playtime/',
    '/AsianKetchup': '/leaderboards/playtime/',
  },

  vite: {
    plugins: [tailwindcss()],
    /*
    Fix for https://github.com/tabler/tabler-icons/issues/1233#issuecomment-2821326649
    https://github.com/KevinVandy/mantine-react-table/issues/418
    */
    resolve: {
      alias: { '@tabler/icons-react': '@tabler/icons-react/dist/esm/icons/index.mjs', },
    }
  }
});