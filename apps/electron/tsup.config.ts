import { defineConfig } from 'tsup';
import path from 'path';

export default defineConfig({
  entry: ['src/main.ts', 'src/preload.ts'],
  outDir: 'dist',
  format: ['cjs'],
  target: 'es2020',
  clean: true,
  esbuildOptions(options) {
    options.alias = {
      '@planit/shared': path.resolve(__dirname, '../../packages/shared'),
    };
  },
  define: {
    'MODE': JSON.stringify(process.env.MODE || 'dev')
  },
  external: ['electron'],
});
