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
      external: [
        '@material-ui/core',
        '@material-ui/icons',
        'date-fns',
        'react',
        'react/jsx-runtime',
        'react-dom',
      ],
      output: {
        freeze: false,
      },
    },
  },
  plugins: [
    react(),
  ],
});
