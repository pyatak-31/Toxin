const path = require('path'),
    paths = require('./paths')
    fs = require('fs'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    { CleanWebpackPlugin } = require('clean-webpack-plugin'),
    CopyWebpackPlugin = require('copy-webpack-plugin');

//фунцция перебора страниц .pug
const PAGES_DIR = `${paths.src}/pages/`,
    folders = fs.readdirSync(PAGES_DIR),
    PAGE = [],
    Pages = [];

folders.forEach((folder) => {
    Pages.push(`${paths.src}/pages/${folder}`)
})
        
for (let page of Pages) {
    const p = fs.readdirSync(page).filter(fileName => { 
        return fileName.endsWith('.pug')
    }).join('');
    PAGE.push(p);
}

module.exports = {
    target: "web",

    entry: {
        main: `${paths.src}/main.js`,
    },

    output: {
        path: paths.build,
        filename: '[name].bundle.js',
        publicPath: '',
    },

    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: `${paths.src}/assets/static`, to: `static` },
            ]
        }),

        ...PAGE.map((page, i) =>
        new HtmlWebpackPlugin({
            template: `${Pages[i]}/${page}`,
            filename: `./${page.replace(/\.pug/, '.html')}`,
            inject: true,
        })
    ),

        new CleanWebpackPlugin(),
    ],

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },

            {
                test: /\.(?:ico|gif|png|jpg|jpeg|webp|svg)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'img/[name][ext]'
                },
            },

            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: 'asset/resource',
                exclude: /(components|pages)/,
                generator: {
                    filename: 'fonts/[name][ext]'
                },
            },

            {
                test: /\.(scss|css)$/,
                use: [
                    'style-loader', 
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true, importLoaders: 1 }
                    },
                    { loader: 'postcss-loader', options: { sourceMap: true } },
                    { loader: 'sass-loader', options: { sourceMap: true } }
                ],
            },

            {
                test: /\.pug$/,
                use: ['pug-loader'],
            },
        ],
    }
}