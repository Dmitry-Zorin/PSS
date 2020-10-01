const path = require('path');

const isDevelopment = true; //process.env.NODE_ENV !== 'production';

module.exports = {
    entry: {
        index: "./src",
    },
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "[name].bundle.js"
    },
    mode: isDevelopment ? 'development' : 'production',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        compress: true,
        port: 8000
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
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: "[name].[ext]",
                            outputPath: "fonts/"
                        }
                    }
                ]
            }
        ]
    }
}