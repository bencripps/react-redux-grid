const loaders = require('./loaders');

module.exports = {
    entry: [
        './demo/entry.js'
    ],
    devServer: {
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    },
    output: {
        path: __dirname + '/../demo/lib',
        filename: 'bundle.js',
        sourceMapFilename: 'debugging/[file].map',
        publicPath: 'http://localhost:8080/demo/lib/',
        crossOriginLoading: 'use-credentials'
    },
    target: 'web',
    node: {
        fs: 'empty'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.styl']
    },
    module: {
        rules: loaders
    },
    devtool: 'inline-source-map'
};
