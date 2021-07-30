const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const path = require('path')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
	mode: 'development',
	devtool: 'inline-source-map',
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		compress: true,
		port: 8000,
		hot: true,
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
		new ReactRefreshWebpackPlugin,
	],
})
