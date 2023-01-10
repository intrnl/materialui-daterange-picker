import * as path from 'node:path';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';


export default defineConfig({
	build: {
		lib: {
			formats: ['es', 'cjs'],
			entry: path.resolve(__dirname, './lib/index.ts'),
			fileName: (format) => `material-daterange-picker.${format}.js`,
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
		dts({ outputDir: './types/' }),
	],
});
