const path = require('path');
const loaders = require('../webpack/loaders');
const BROWSERS = process.argv && process.argv.indexOf('--browser') !== -1
    ? ['PhantomJS', 'Chrome']
    : ['PhantomJS'];

module.exports = function exports(config) {
    config.set({
        browsers: BROWSERS,
        files: [
            './../webpack/webpack.test.js',
        ],
        frameworks: ['chai', 'mocha'],
        plugins: [
            'karma-chrome-launcher',
            'karma-chai',
            'karma-mocha',
            'karma-webpack',
            'phantomjs-prebuilt',
            'karma-phantomjs-launcher',
            'karma-babel-preprocessor'
        ],

        preprocessors: {
            './../webpack/webpack.test.js': ['babel', 'webpack']
        },

        babelPreprocessor: {
            options: {
                presets: ['es2015']
            }
        },

        phantomjsLauncher: {
            exitOnResourceError: true
        },
        singleRun: false, //BROWSERS.length === 1,
        webpack: {
            module: {
                loaders: loaders
            },
            resolve: {
                extensions: [
                    '',
                    '.js',
                    '.test.js'
                ]
            },
            target: 'web',
            node: {
                fs: 'empty'
            },
            devServer: {
                quiet: false
            },
            webpackMiddleware: {
                noInfo: true
            }
        }
    });
};