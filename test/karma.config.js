const loaders = require('../webpack/loaders');
const path = require('path');
const BROWSERS = process.argv && process.argv.indexOf('--browser') !== -1
    ? ['PhantomJS', 'Chrome']
    : ['PhantomJS'];

module.exports = function exports(config) {
    config.set({
        browsers: BROWSERS,
        files: [
            './../webpack/webpack.test.js'
        ],
        frameworks: ['chai', 'mocha', 'es6-shim'],
        plugins: [
            'karma-chrome-launcher',
            'karma-chai',
            'karma-mocha',
            'karma-es6-shim',
            'karma-webpack',
            'karma-babel-preprocessor',
            'karma-phantomjs-launcher',
            'karma-sourcemap-loader',
            'phantomjs-prebuilt'
        ],

        preprocessors: {
            './../webpack/webpack.test.js': ['babel', 'webpack', 'sourcemap']
        },

        babelPreprocessor: {
            options: {
                presets: ['es2015']
            }
        },

        phantomjsLauncher: {
            exitOnResourceError: false
        },
        singleRun: BROWSERS.length === 1,
        webpack: {
            module: {
                loaders: loaders
            },
            externals: {
                'cheerio': 'window',
                'react/lib/ExecutionEnvironment': true,
                'react/lib/ReactContext': true
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