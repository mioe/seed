import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			'@seed/common': `${path.resolve(__dirname, '../backend/src/common')}/`,
		},
	},
	plugins: [
		vue(),
	],
})
