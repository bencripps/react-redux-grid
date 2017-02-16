module.exports = [
    {
        test: /\.js$|\.jsx$/,
        enforce: 'pre',
        exclude: /node_modules|test|\.test\.|.styl/,
        loader: 'istanbul-instrumenter-loader',
        query: {
            esModules: true
        }
    }
];
