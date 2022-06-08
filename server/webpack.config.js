const nodeExternals = require('webpack-node-externals')
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin')

module.exports = (options, webpack) => ({
	...options,
	entry: ['webpack/hot/poll?100', options.entry],
	devtool: 'inline-source-map',
	externals: [
		nodeExternals({
			allowlist: ['webpack/hot/poll?100'],
		}),
	],
	plugins: [
		...options.plugins,
		new webpack.HotModuleReplacementPlugin(),
		new RunScriptWebpackPlugin({
			name: options.output.filename,
			nodeArgs: ['--inspect'],
		}),
	],
})
