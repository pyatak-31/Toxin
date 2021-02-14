const paths = require('./paths'),
    { merge } = require('webpack-merge'),
    common = require('./webpack.merge.js'),
    MiniCssExtractPlugin = require('mini-css-extract-plugin'),
    OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'),
    TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',

    devtool: false,

    output: {
        path: paths.build,
        publicPath: '',
        filename: 'js/[name].[contenthash].bundle.js',
    },
    
    plugins: [
        new MiniCssExtractPlugin({
        filename: 'style/[name].[contenthash].css',
        chunkFilename: '[id].css',
        }),
    ],
  
    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../'
                        },
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            sourceMap: false,
                        },
                    },
                    'postcss-loader',
                    'sass-loader',
                ],
            },
        ],
    },
    optimization: {
        minimize: true,
        minimizer: [new OptimizeCssAssetsPlugin(), new TerserPlugin()],
        runtimeChunk: {
            name: 'runtime',
        },
    },

    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
    },
})