const loaders = require('./loaders');

module.exports = function exports(config) {
    config.set({
        browsers: ['Chrome'],

        files: [
            'test.webpack.js'
        ],
        frameworks: ['chai', 'mocha'],
        plugins: [
            'karma-chrome-launcher',
            'karma-chai',
            'karma-mocha',
            'karma-sourcemap-loader',
            'karma-webpack'
        ],

        preprocessors: {
            'test.webpack.js': ['webpack', 'sourcemap']
        },
        reporters: ['dots'],
        singleRun: true,

        webpack: {
            devtool: 'inline-source-map',
            module: {
                loaders: loaders
            },
            webpackMiddleware: {
                noInfo: true
            }
        }
    });
};