import reactRefresh from '@vitejs/plugin-react-refresh'
import { defineConfig } from 'vite'

export default defineConfig({
	plugins: [reactRefresh()],
	esbuild: {
		loader: 'jsx',
	},
	optimizeDeps: {
		esbuildOptions: {
			loader: {
				'.js': 'jsx',
			},
		},
	},
})
