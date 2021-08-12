const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = merge(common, {
	mode: 'production',
	target: 'browserslist',
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: 'babel-loader',
			},
		],
	},
	optimization: {
		minimizer: [
			'...',
			new CssMinimizerPlugin(),
		],
	},
})
