const loaders = require('../webpack/loaders');
const BROWSERS = process.argv && process.argv.indexOf('--browser') !== -1
    ? ['jsdom', 'Chrome']
    : ['jsdom'];

module.exports = function exports(config) {
    config.set({
        browsers: BROWSERS,
        files: [
            './../webpack/webpack.test.js'
        ],
        client: {
            captureConsole: false
        },
        frameworks: ['chai', 'mocha', 'es6-shim', 'sinon-chai'],
        plugins: [
            'karma-chrome-launcher',
            'karma-chai',
            'karma-mocha',
            'karma-es6-shim',
            'karma-webpack',
            'karma-babel-preprocessor',
            'karma-jsdom-launcher',
            'karma-sourcemap-loader',
            'karma-sinon-chai',
            'karma-spec-reporter'
        ],

        preprocessors: {
            './../webpack/webpack.test.js': ['babel', 'webpack', 'sourcemap']
        },

        babelPreprocessor: {
            options: {
                presets: ['es2015']
            }
        },
        reporters: ['spec'],
        specReporter: {
            maxLogLines: 20,
            suppressErrorSummary: false,
            suppressFailed: false,
            suppressPassed: false,
            suppressSkipped: false
        },
        singleRun: BROWSERS.length === 1,
        webpack: {
            module: {
                loaders: loaders
            },
            externals: {
                cheerio: 'window',
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
                quiet: true,
                stats: 'errors-only'
            }
        },
        webpackMiddleware: {
            noInfo: true,
            quiet: true
        }
    });
};
