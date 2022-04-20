'use strict';
var webpack = require("webpack");
var path = require("path");
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: ['./src/app.jsx'],
    output: {
        path: path.resolve("build"),
        filename: "visual-summary.js"
    },
    plugins: [new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('production')
        }
    }),
    // Ignore all locale files of moment.js
    new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/,
    }),
    new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1
    }),
    new TerserPlugin({
        parallel: true,
        terserOptions: { ecma: 6 }
    })],
    module: {
        rules: require("./rules.config"),
    },
    resolve: {
        extensions: ['.js', '.jsx']
    }
}