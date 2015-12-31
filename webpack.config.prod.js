module.exports = {
    entry: [
        './demo/entry.js'
    ],
    output: {
        path: __dirname + '/demo/lib',
        filename: 'bundle.js',
        publicPath: 'lib/'
    },
    target: 'web',
    node: {
        fs: 'empty'
    },
    module: {
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
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
                loaders: ['url-loader?limit=10000&mimetype=application/font-woff' ]
            },
            {   
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
                loaders: ['file-loader']
            },
            {
                test: /\.json$/,
                loaders: ['json-loader']
            }
        ]
    }
};