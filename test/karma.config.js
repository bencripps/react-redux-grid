const loaders = require('../webpack/loaders');

module.exports = function exports(config) {
    config.set({
        browsers: ['PhantomJS'],

        files: [
            '../webpack/webpack.test.js'
        ],
        frameworks: ['chai', 'mocha'],
        plugins: [
            'karma-chrome-launcher',
            'karma-chai',
            'karma-mocha',
            'karma-webpack',
            'phantomjs-prebuilt',
            'karma-phantomjs-launcher'
        ],

        preprocessors: {
            '../webpack/webpack.test.js': ['webpack']
        },
        reporters: ['dots'],
        singleRun: false,

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