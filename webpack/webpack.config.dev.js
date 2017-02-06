const path = require('path');
const loaders = require('./loaders');

process.env.NODE_ENV = 'development';

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
    resolve: {
        extensions: ['.js', '.jsx', '.styl']
    },
    devtool: 'inline-source-map'
};
