const path = require('path');
const loaders = require('./loaders');

process.env.NODE_ENV = 'development';

module.exports = {
    entry: {
        client: 'webpack-dev-server/client?http://localhost:8080',
        bundle: './demo/entry.js'
    },
    devServer: {
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    },
    output: {
        path: path.join(__dirname, '/../demo/lib'),
        filename: '[name].js',
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
      rules: [
        {
          test: /\.jsx?$/, // both .js and .jsx
          loader: 'eslint-loader',
          include: [
            path.resolve(__dirname, 'src'),
            path.resolve(__dirname, 'demo')
          ],
          enforce: 'pre',
          options: {
            configFile: '.eslintrc.js',
            emitError: true,
            failOnError: true,
            failOnWarning: false
          },
        },
        ...loaders
      ]
    },
    devtool: 'inline-source-map'
};
