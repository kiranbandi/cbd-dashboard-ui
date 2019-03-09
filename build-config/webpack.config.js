const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

'use strict';
module.exports = {
    mode: 'development',
    entry: ['babel-polyfill', './src/app.jsx'],
    output: {
        path: __dirname + '/build/assets/bundle',
        filename: "bundle.js",
        publicPath: "/assets/bundle"
    },
    devServer: {
        inline: true,
        contentBase: './build',
        port: 8888,
        watchOptions: {
            ignored: [
                path.resolve(__dirname, 'build'),
                path.resolve(__dirname, 'node_modules')
            ]
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: '../../../../build/index.html',
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