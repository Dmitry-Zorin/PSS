const esbuild = require('esbuild')
const { nodeExternalsPlugin } = require('esbuild-node-externals')

const options = {
	platform: 'node',
	target: 'es2021',
	entryPoints: ['src/index.ts'],
	outdir: 'dist',
	sourcemap: true,
	bundle: true,
	plugins: [nodeExternalsPlugin()],
}

esbuild.build(options)
