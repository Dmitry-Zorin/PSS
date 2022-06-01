import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
	server: {
		port: 8000,
	},
	plugins: [react()],
	build: {
		sourcemap: 'hidden',
	},
})
