const path = require('path');
const webpack = require("webpack");
const WriteFilePlugin = require('write-file-webpack-plugin');

'use strict';
module.exports = {
    mode: 'development',
    entry: ['babel-polyfill', './src/app.jsx'],
    output: {
        path: path.resolve("C:\\Users\\bvenk\\Sites\\elentra-1x-me\\www-root\\javascript"),
        filename: "sask-dashboard.js"
    },
    devServer: {
        inline: true,
        contentBase: './build',
        port: 8887,
        watchOptions: {
            ignored: [
                path.resolve(__dirname, 'build'),
                path.resolve(__dirname, 'node_modules')
            ]
        }
    },
    plugins: [new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('development')
        }
    }), new WriteFilePlugin()],
    module: {
        rules: require("./rules.config"),
    },
    resolve: {
        extensions: ['.js', '.jsx']
    }
}