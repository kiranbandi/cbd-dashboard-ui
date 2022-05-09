'use strict';
var webpack = require("webpack");
var path = require("path");
const TerserPlugin = require('terser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: ['babel-polyfill', './src/app.jsx'],
    output: {
        path: path.resolve("build/assets/bundle"),
        filename: "bundle.js",
        publicPath: "/assets/bundle/"
    },
    plugins: [new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('production')
        }
    }),
    new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1
    }),
    new TerserPlugin({
        parallel: true,
        terserOptions: { ecma: 6 }
    }),
    new HtmlWebpackPlugin({
        filename: '../../index.html',
        template: './src/assets/index.template.html',
        alwaysWriteToDisk: true
    })
    ],
    module: {
        rules: require("./rules.config"),
    },
    resolve: {
        extensions: ['.js', '.jsx']
    }
}