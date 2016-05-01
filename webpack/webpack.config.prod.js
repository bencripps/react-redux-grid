const webpack = require('webpack');
const loaders = require('./loaders');

module.exports = {
    entry: [
        './demo/entry.js'
    ],
    output: {
        path: __dirname + '/../demo/lib',
        filename: 'bundle.js',
        publicPath: 'lib/'
    },
    target: 'web',
    node: {
        fs: 'empty'
    },
    module: {
        loaders: loaders
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        })
    ]
};