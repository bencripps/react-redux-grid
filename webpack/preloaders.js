module.exports = [
    {
        test: /\.js$|\.jsx$/,
        enforce: 'post',
        exclude: /node_modules|test|webpack/,
        loader: 'istanbul-instrumenter-loader',
        query: {
            esModules: true
        }
    }
];
