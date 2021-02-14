const paths = require('./paths'),
    webpack = require('webpack'),
    { merge } = require('webpack-merge'),
    common = require('./webpack.merge.js');

module.exports = merge(common, {
    mode: 'development',

    devtool: 'inline-source-map',

    devServer: {
        historyApiFallback: true,
        contentBase: paths.build,
        open: true,
        compress: true,
        hot: true,
        port: 8080,
        inline: true,
        watchContentBase: true,
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
})