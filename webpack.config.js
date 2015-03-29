var webpack = require('webpack');
var path = require('path');
var nib = require('nib');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');

var envVars = new webpack.DefinePlugin({
    IS_DEV: process.env.ENV === 'dev'
});

module.exports = {
    context: path.join(__dirname, 'app'),
    entry: {
        app: './app.js'
    },
    output: {
        path: path.join(__dirname, 'www'),
        filename: '[name].build.js',
        chunkFilename: '[name].chunk.js'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: 'style!css!autoprefixer?{browsers:["> 1%", "last 2 versions", "ff >= 15", "ie >= 9", "Opera 12.1"]}'
            },
            {
                test: /\.styl$/,
                loader: 'style!css!autoprefixer?{browsers:["> 1%", "last 2 versions", "ff >= 15", "ie >= 9", "Opera 12.1"]}!stylus'
            },
            { test: /\.html$/, loader: 'html' },
            { test: /\.(jpe?g|png|gif|svg)$/i, loaders: ['image?bypassOnDebug&optimizationLevel=5&interlaced=false'] },
            {
                test: /\.html$/,
                loader: 'ngtemplate?relativeTo=' + path.join(__dirname, 'app/') + '!html'
            }
        ]
    },
    stylus: {
        use: [nib()]
    },
    resolve: {
        root: [
            path.join(__dirname, 'app'),
            path.join(__dirname, 'bower_components'),
            path.join(__dirname, 'node_modules')
        ],
        moduleDirectories: ['bower_components', 'node_modules']
    },
    externals: {

    },
    plugins: [
        envVars,

        new webpack.ProvidePlugin({
            _: 'lodash'
        }),
        new webpack.optimize.CommonsChunkPlugin('common.build.js'),
        new webpack.optimize.DedupePlugin(),
        // new webpack.ResolverPlugin(new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main'])),

        new HtmlWebpackPlugin({ template: 'app/index.html' }),
        new ngAnnotatePlugin({ add: true })
    ]
};
