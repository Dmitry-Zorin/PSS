const CompressionPlugin = require('compression-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	output: {
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
				use: ['style-loader', 'css-loader'],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Cистема хранения научных трудов',
			template: './src/index.html',
		}),
		new CompressionPlugin(),
		new Dotenv(),
	],
}
