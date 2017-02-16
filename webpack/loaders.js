const path = require('path');

module.exports = [
    {
        test: /\.js$|\.jsx$/,
        loader: 'babel-loader',
        exclude: /node_modules|\.json$/
    },
    {
        loader: 'babel-loader',
        include: path.resolve(__dirname, '../test')
    },
    {
        test: /\.styl$/,
        exclude: /node_modules|\.json$/,
        use: ['style-loader', 'css-loader', 'stylus-loader']
    },
    {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
    },
    {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
    },
    {
        test: /\.json$/,
        loader: 'json-loader'
    }
];
