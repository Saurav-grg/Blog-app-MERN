import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        // target: 'https://zenquest-api.vercel.app',
        target: 'http://localhost:4428',

        changeOrigin: true,
      },
    },
  },
});
