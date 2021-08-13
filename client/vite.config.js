import reactRefresh from '@vitejs/plugin-react-refresh'
import { defineConfig } from 'vite'

export default defineConfig({
	server: {
		port: 8000,
	},
	plugins: [reactRefresh()],
	build: {
		sourcemap: 'hidden',
	},
})
