import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePluginFonts } from 'vite-plugin-fonts'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
	plugins: [
		react(),
		tsconfigPaths(),
		VitePluginFonts({
			custom: {
				families: [
					{
						name: 'Alumni Sans',
						src: './src/assets/fonts/Alumni_Sans/*.ttf',
					},
					{
						name: 'Nunito Sans',
						src: './src/assets/fonts/Nunito_Sans/*.ttf',
					},
				],
				display: 'block',
				preload: true,
			},
		}),
	],
	server: {
		port: 8000,
	},
	build: {
		sourcemap: 'hidden',
		rollupOptions: {
			output: {
				entryFileNames: `assets/[name].js`,
				chunkFileNames: `assets/[name].js`,
				assetFileNames: `assets/[name].[ext]`,
			},
		},
	},
})
