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
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'lib': path.resolve(__dirname, 'src/lib'),  // lib klasörüne alias ekledik
    }
  },
  build: {
    sourcemap: false  // Source map dosyalarını devre dışı bırakıyoruz
  }
});
