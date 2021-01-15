const path = require('path');
const webpack = require("webpack");
const dotenv = require('dotenv');

module.exports = () => {
    const env = dotenv.config().parsed;

    return {
        entry: {
            index: "./src",
        },
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "[name].bundle.js"
        },
        mode: env.NODE_ENV,
        devtool: env.NODE_ENV === 'development' ? 'inline-source-map' : undefined,
        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            compress: true,
            port: env.UI_PORT
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                },
                {
                    test: /\.css$/,
                    use: ["style-loader", "css-loader"]
                },
                {
                    test: /\.(png|jpg|ico)$/,
                    loader: 'file-loader'
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    loader: 'file-loader'
                },
                /*{
                    test: /\.(js)$/,
                    exclude: /node_modules/,
                    use: ['babel-loader', 'eslint-loader']
                }*/
            ]
        },
        plugins: [
            new webpack.DefinePlugin(
                Object.keys(env).reduce((obj, name) => {
                    obj[`process.env.${name}`] = JSON.stringify(env[name]);
                    return obj;
                }, {})
            )
        ]
    }
}
