// jscs:disable maximumLineLength

var webpack = require('webpack');
var path = require('path');
var rimraf = require('rimraf');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var NgAnnotatePlugin = require('ng-annotate-webpack-plugin');
var BowerWebpackPlugin = require('bower-webpack-plugin');
var TransferWebpackPlugin = require('transfer-webpack-plugin');
var env = process.env.ENV || 'development';
var isProd = env === 'production';
var appDir = path.join(__dirname, 'app');
var distDir = path.join(__dirname, 'www');

var plugins = [
    new webpack.DefinePlugin({
        ENV: JSON.stringify(env),
        IS_DEV: env === 'development',
        VERSION: JSON.stringify(require('./package.json').version),
        ON_TEST: env === 'test'
    }),

    new webpack.ProvidePlugin({
        _: 'lodash'
    }),

    new webpack.optimize.CommonsChunkPlugin('common', 'common.build.js', null, Infinity),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(true),

    new HtmlWebpackPlugin({ template: 'app/index.html' }),
    new NgAnnotatePlugin({ add: true }),
    new BowerWebpackPlugin(),
    new TransferWebpackPlugin([
        { from: 'i18n', to: 'i18n' },
        { from: 'root' }
    ])
];

var imgLoader = [
    'file?name=assets/[sha512:hash:hex:18].[ext]'
];

if (isProd) {
    plugins.concat([
        new webpack.optimize.UglifyJsPlugin({
            mangle: true,
            compress: {
                drop_console: true
            },
            output: { comments: false }
        })
    ]);

    imgLoader.push('image?bypassOnDebug&optimizationLevel=5');
}

// remove build directory
rimraf.sync(distDir);

module.exports = {
    context: appDir,

    entry: {
        app: './index.js',
        common: ['libs']
    },

    output: {
        path: distDir,
        filename: '[name].build.js',
        chunkFilename: '[name].chunk.js'
    },

    module: {
        loaders: [
            { test: /\.js$/, loader: 'strict', exclude: /node_modules/ },
            {
                test: /\.css$/,
                loader: 'style!css!autoprefixer?{browsers:["> 1%", "last 2 versions", "ff >= 15", "ie >= 9", "Opera 12.1"]}'
            },
            {
                test: /\.styl$/,
                loader: 'style!css!autoprefixer?{browsers:["> 1%", "last 2 versions", "ff >= 15", "ie >= 9", "Opera 12.1"]}!stylus'
            },
            {
                test: /\.(woff|woff2)(\?.*)?$/,
                loader: 'url?name=assets/[sha512:hash:hex:18].[ext]&limit=5000&mimetype=application/font-woff'
            },
            { test: /\.(eot|ttf|otf|svg)([#\?].*)?$/, loader: 'file?name=assets/[sha512:hash:hex:18].[ext]' },
            { test: /\.(png|jpe?g|gif)$/i, loaders: imgLoader },
            { test: /\.html$/, loader: 'html' },
            { test: /\.json(\?.*)?$/, loader: 'json' }
        ],

        noParse: [
            /bower_components/
        ]
    },

    resolve: {
        extensions: ['', '.js', '.json', '.styl', '.css', '.html'],

        root: [
            appDir,
            path.join(__dirname, 'bower_components'),
            path.join(__dirname, 'node_modules')
        ]
    },

    plugins: plugins
};
