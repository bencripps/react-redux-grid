module.exports = [
    {
        test: /\.js$|\.jsx$/,
        loader: 'babel-loader',
        enforce: 'pre',
        exclude: /node_modules|\.json$|\.test\.js/
    },
    {
        test: /\.js$|\.jsx$/,
        enforce: 'pre',
        exclude: /node_modules|test|\.test\.js/,
        loader: 'istanbul-instrumenter-loader'
    }
];
