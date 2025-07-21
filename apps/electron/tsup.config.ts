import { defineConfig } from 'tsup';
import path from 'path';

const isDev = process.env.MODE !== 'build';

export default defineConfig({
  entry: ['src/main.ts', 'src/preload.ts'],
  outDir: isDev
    ? 'dist'
    : path.resolve(__dirname, '../../dist'),
  format: ['cjs'],
  target: 'es2020',
  clean: true,
  esbuildOptions(options) {
    options.alias = {
      '@planit/shared': path.resolve(__dirname, '../../packages/shared'),
    };
  },
});
