import { resolve } from 'path'
import { defineConfig } from 'histoire'

export default defineConfig({
	outDir: '.histoire/dist',

	// Alternative way of specifying histoire config
	setupFile: `${resolve(__dirname, 'src')}/histoire.setup.ts`,

	vite: {
		build: {
			lib: false,
			rollupOptions: {
				output: {
					format: 'cjs',
				},
			},
		},
	},
})
