import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import path from 'node:path';

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
  ],
  server: {
    host: true,
    port: 8080,
    watch: {
      usePolling: true,
    },
    allowedHosts: [
      'localhost',
      'frontend-563289858941.europe-west4.run.app',
      'yukselsoftware.de', // yukselsoftware.de ekleniyor
    ],
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'lib': path.resolve(__dirname, 'src/lib'),
    },
  },
  build: {
    sourcemap: false,
  },
});