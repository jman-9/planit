import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), tailwindcss()],
  server: {
    open: false,
  },
  resolve: {
    alias: {
      '@planit/shared': path.resolve(__dirname, '../../packages/shared'),
    },
  },
  publicDir: "../../public"
});
