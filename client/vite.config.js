import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
	server: {
		port: 8000,
	},
	plugins: [react(), tsconfigPaths()],
	build: {
		sourcemap: 'hidden',
	},
})
