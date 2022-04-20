module.exports = [{
    test: /\.js$/,
    exclude: /node_modules/,
    use: 'babel-loader'
},
{
    test: /\.jsx$/,
    exclude: /node_modules/,
    use: 'babel-loader'
},
{
    test: /\.scss$/,
    use: [{ loader: "style-loader" }, { 'loader': 'css-loader', options: { import: true, url: false } }, { 'loader': 'sass-loader', options: { url: false } }]
},
{
    test: /\.css/,
    use: [{ loader: "style-loader" }, { 'loader': 'css-loader', options: { import: true, url: false } }],
},
{
    test: /\.(jpe?g|png|gif|svg)$/i,
    use: [
        'file?hash=sha512&digest=hex&name=[hash].[ext]',
        'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
    ]
}]