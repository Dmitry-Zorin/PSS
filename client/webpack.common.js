const Dotenv = require('dotenv-webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

module.exports = {
	entry: {
		main: path.join(__dirname, 'src/index.js'),
	},
	output: {
		path: path.join(__dirname, 'dist'),
		filename: '[name].bundle.js',
		clean: true,
	},
	module: {
		rules: [
			{
				test: /\.jpg$/,
				type: 'asset/resource',
			},
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'src/index.html'),
		}),
		new MiniCssExtractPlugin(),
		new Dotenv(),
	],
}
