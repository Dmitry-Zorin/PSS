import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import csp from 'vite-plugin-csp'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
	plugins: [react(), tsconfigPaths(), csp()],
	server: {
		port: 8000,
	},
	build: {
		sourcemap: 'hidden',
	},
})
