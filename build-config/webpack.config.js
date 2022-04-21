const path = require('path');
const webpack = require("webpack");
const WriteFilePlugin = require('write-file-webpack-plugin');

'use strict';
module.exports = {
    mode: 'development',
    entry: ['./src/app.jsx'],
    output: {
        path: path.resolve("C:\\Users\\bvenk\\Sites\\elentra-1x-me\\www-root\\javascript"),
        filename: "visual-summary.js"
    },
    watch: true,
    watchOptions: {
        ignored: [
            path.resolve(__dirname, 'build'),
            path.resolve(__dirname, 'node_modules')
        ]
    },
    plugins: [new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('development')
        }
    }),
    // Ignore all locale files of moment.js to reduce final bundle size
    new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/,
    }),
    new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1
    }), new WriteFilePlugin()],
    module: {
        rules: require("./rules.config"),
    },
    resolve: {
        extensions: ['.js', '.jsx']
    }
}