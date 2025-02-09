import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), nodePolyfills()],
  base: './',
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      // Wyklucz wszystkie pliki testowe
      external: (id) => id.includes('.test.') || id.includes('__tests__')
    }
  },
  publicDir: 'public',
  resolve: {
    alias: {
      'source-map-js': 'source-map',
      'path': 'path-browserify',
      'url': 'url',
      '@': resolve(__dirname, 'src'),
      '@test': resolve(__dirname, 'test'),
    },
  },
  // Add server configuration to handle assets in development
  server: {
    fs: {
      strict: false
    }
  }
})
