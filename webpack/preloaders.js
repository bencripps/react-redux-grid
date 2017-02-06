module.exports = [
    {
        test: /\.js$|\.jsx$/,
        loaders: ['babel-loader'],
        exclude: /node_modules|\.json$|\.test\.js/
    },
    {
        test: /\.js$|\.jsx$/,
        exclude: /node_modules|test|\.test\.js/,
        loader: 'isparta'
    }
];
