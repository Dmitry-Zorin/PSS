const path = require('path')
const Dotenv = require('dotenv-webpack')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

module.exports = merge(common, {
	mode: 'development',
	devtool: 'inline-source-map',
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		port: 8000,
		hot: true,
	},
	module: {
		rules: [
			{
				test: /\.[jt]sx?$/,
				exclude: /node_modules/,
				use: [
					{
						loader: require.resolve('babel-loader'),
						options: {
							plugins: [
								require.resolve('react-refresh/babel'),
							],
						},
					},
				],
			},
		],
	},
	plugins:
		[
			new Dotenv({ path: './.env.dev' }),
			new ReactRefreshWebpackPlugin(),
		],
})
