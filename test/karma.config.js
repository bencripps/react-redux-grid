const loaders = require('../webpack/loaders');
const BROWSERS = process.argv && process.argv.indexOf('--browser') !== -1
    ? ['PhantomJS', 'Chrome']
    : ['PhantomJS'];

module.exports = function exports(config) {
    config.set({
        browsers: BROWSERS,
        files: [
            '../webpack/webpack.test.js',
            '../node_modules/babel-polyfill/dist/polyfill.js',
            '../test/components/**/*.js'
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
            '../test/components/**/*.js': ['babel'],
            '../webpack/webpack.test.js': ['webpack']
        },

        babelPreprocessor: {
            options: {
                presets: ['es2015']
            }
        },

        phantomjsLauncher: {
            exitOnResourceError: true
        },

        webpack: {
            module: {
                loaders: loaders
            },
            target: 'web',
            node: {
                fs: 'empty'
            },
            webpackMiddleware: {
                noInfo: true
            }
        }
    });
};