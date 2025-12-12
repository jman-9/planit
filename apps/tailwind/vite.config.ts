import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'
import path from 'path';

const mode = process.env.MODE || 'web';
const webbasepath = process.env.WEBBASEPATH || '/';
const basepath = mode !== 'electron' ? webbasepath : './';

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
  publicDir: "../../public",
  build: {
    outDir: mode !== 'electron' ? 'dist' : '../electron/dist/renderer',
    emptyOutDir: true,
  },
  base: basepath,
  define: {
    _USE_ELECTRON_ : mode !== 'electron' ? false : true,
    _WEB_BASE_PATH_ : JSON.stringify(webbasepath),
  },
});
