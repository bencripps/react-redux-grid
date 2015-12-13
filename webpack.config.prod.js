var path = require('path');

module.exports = {
    entry: './demo/entry.js',
    output: {
        path: __dirname,
        filename: 'lib/bundle.js'
    },
    module: {
        loaders: [{
            test: path.join(__dirname, 'src'),
            loader: 'babel-loader?stage=0&optional=runtime',
            exclude: /node_modules/,
            options: {
                optional: ['runtime']
            }
        }, {
            test: /\.styl$/,
            loaders: ['style-loader', 'css-loader', 'stylus-loader']
        }]
    }
};