import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Polyfill sederhana agar process.env.API_KEY tidak error di browser
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY)
  }
});