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
    use: [{ loader: "style-loader" }, { 'loader': 'css-loader', options: { import: true, url: false } }, { 'loader': 'sass-loader' }]
},
{
    test: /\.css/,
    use: [{ loader: "style-loader" }, { 'loader': 'css-loader', options: { import: true, url: false } }],
}]