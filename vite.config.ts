import * as path from 'node:path';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'


export default defineConfig({
  build: {
    lib: {
      formats: ['es', 'cjs'],
      entry: path.resolve(__dirname, 'lib/index.ts'),
      fileName: 'materialui-daterange-picker',
    },
    rollupOptions: {
      external (source, importer) {
        if (!importer) {
          return false;
        }

        return !(/\.{1,2}/).test(source);
      },
      output: {
        freeze: false,
      },
    },
  },
  plugins: [
    react(),
  ],
});
