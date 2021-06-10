const path = require('path')
const Dotenv = require('dotenv-webpack')
const {merge} = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 8000,
        hot: true
    },
    plugins: [
        new Dotenv({
            path: './.env.dev'
        })
    ]
})
