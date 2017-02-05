module.exports = [
    {
        test: /\.js$|\.jsx$/,
        enforce: 'pre',
        loader: 'babel-loader',
        exclude: /node_modules|\.json$|\.test\.js/
    },
    {
        test: /\.js$|\.jsx$/,
        enforce: 'pre',
        exclude: /node_modules|test|\.test\.js/,
        loader: 'isparta-loader'
    }
];
