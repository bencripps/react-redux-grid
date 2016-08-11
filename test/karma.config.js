const loaders = require('../webpack/loaders');
const preLoaders = require('../webpack/preloaders');

const BROWSERS = process.argv && process.argv.indexOf('--browser') !== -1
    ? ['jsdom', 'Chrome']
    : ['jsdom'];

const COVERAGE = process.argv && process.argv.indexOf('--coverage') !== -1;

const SINGLE_RUN = process.argv
    && process.argv.indexOf('--no-single-run') === -1;

const PRELOADERS = COVERAGE ? preLoaders : [];

const REPORTERS = COVERAGE
    ? ['spec', 'coverage']
    : ['spec'];

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
            'karma-coverage',
            'karma-mocha',
            'karma-mocha-reporter',
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
        reporters: REPORTERS,
        specReporter: {
            maxLogLines: 20,
            suppressErrorSummary: false,
            suppressFailed: false,
            suppressPassed: false,
            suppressSkipped: false
        },
        singleRun: SINGLE_RUN,
        webpack: {
            isparta: {
                embedSource: true,
                noAutoWrap: true,
                babel: {
                    presets: ['es2015', 'stage-0', 'react']
                }
            },
            resolve: {
                extensions: ['', '.js', '.jsx', '.styl']
            },
            module: {
                preLoaders: PRELOADERS,
                loaders: loaders
            },
            externals: {
                cheerio: 'window',
                'react/lib/ExecutionEnvironment': true,
                'react/lib/ReactContext': true
            },
            target: 'web',
            node: {
                fs: 'empty'
            },
            devServer: {
                quiet: false
            }
        },
        webpackMiddleware: {
            noInfo: true,
            quiet: true
        },
        coverageReporter: {
            reporters: [
                { type: 'text' },
                { type: 'lcovonly', subdir: './../../' }
            ]
        }
    });
};
