const path = require('path');
var webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

'use strict';
module.exports = {
    mode: 'development',
    entry: ['babel-polyfill', './src/app.jsx'],
    output: {
        path: path.resolve("build/assets/bundle"),
        filename: "bundle.js",
        publicPath: "/assets/bundle/"
    },
    watchOptions: {
        ignored: [
            path.resolve(__dirname, 'build'),
            path.resolve(__dirname, 'node_modules')
        ]
    },
    devServer: {
        static: './build',
        port: 8080,
        https: true,
        allowedHosts: "all",
    },
    plugins: [new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('development')
        }
    }),
    new HtmlWebpackPlugin({
        filename: '../../index.html',
        template: './src/assets/index.template.html',
        alwaysWriteToDisk: true
    }),
    new HtmlWebpackHarddiskPlugin()
    ],
    module: {
        rules: require("./rules.config"),
    },
    resolve: {
        extensions: ['.js', '.jsx']
    }
}