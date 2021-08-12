const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const path = require('path')
const { merge } = require('webpack-merge')
const common = require('./webpack.common')

module.exports = merge(common, {
	mode: 'development',
	target: 'web',
	devtool: 'eval-source-map',
	stats: 'errors-only',
	devServer: {
		port: 8000,
		contentBase: path.join(__dirname, 'dist'),
		hot: true,
		compress: true,
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							plugins: ['react-refresh/babel'],
						},
					},
				],
			},
		],
	},
	plugins: [
		new ReactRefreshWebpackPlugin(),
	],
})
