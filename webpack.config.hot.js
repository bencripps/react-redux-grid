module.exports = {
    entry: [
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:8080',
        './demo/entry.js'
    ],
    devServer: {
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    },
    output: {
        path: __dirname,
        filename: 'lib/bundle.js',
        sourceMapFilename: 'debugging/[file].map',
        publicPath: 'http://localhost:8080/',
        crossOriginLoading: 'use-credentials'
    },
    target: 'web',
    node: {
        fs: 'empty'
    },
    module: {
        eslint: {
            configFile: '.eslintrc',
            emitError: true,
            failOnError: true,
            failOnWarning: false
        },
        loaders: [
            {
                test: /\.js$|\.jsx$/,
                loaders: ['react-hot', 'babel-loader?stage=0&optional=runtime'],
                exclude: /node_modules|\.json$/,
                options: {
                    optional: ['runtime']
                }
            },
            {
                test: /\.styl$/,
                exclude: /node_modules|\.json$/,
                loaders: ['style-loader', 'css-loader', 'stylus-loader']
            },
            {
              test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
              loaders: ['file-loader']
            },
            {
                test: /\.json$/,
                loaders: ['json-loader']
            }
        ]
    },
    devtool: 'inline-source-map'
};