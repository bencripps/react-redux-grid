module.exports = [
    {
        test: /\.js$|\.jsx$/,
        loaders: ['react-hot', 'babel-loader'],
        exclude: /node_modules|\.json$|\.test\.js/
    },
    {
        test: /\.js$|\.jsx$/,
        exclude: /node_modules|\.test\.js/,
        loader: 'isparta'
    }
];
