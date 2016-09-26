'use strict';

// Modules
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var ENV = process.env.npm_lifecycle_event;
var isProd = ENV === 'build';

module.exports = function makeWebpackConfig() {
    var config = {};

    config.entry = {
        app: './src/app/app.js'
    };

    config.output = {
        // Absolute output directory
        path: __dirname + '/dist',
        // Output path from the view of the page
        // Uses webpack-dev-server in development
        publicPath: isProd ? '/' : 'http://localhost:8080/',
        // Filename for entry points
        // Only adds hash in productio mode
        filename: isProd ? '[name].[hash].js' : '[name].bundle.js',
        // Filename for non-entry points
        // Only adds hash in production mode
        chunkFilename: isProd ? '[name].[hash].js' : '[name].bundle.js'
    };

    config.devtool = isProd ? 'source-map' : 'eval-source-map';

    // Initialize module
    config.module = {
        preLoaders: [],
        loaders: [{
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!postcss-loader')
        }, {
            test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
            loader: 'file'
        }, {
            test: /\.html$/,
            loader: 'raw'
        }]
    };

    config.postcss = [
        autoprefixer({
            browsers: ['last 2 version']
        })
    ];

    config.plugins = [];

    // Render index.html
    config.plugins.push(
        new HtmlWebpackPlugin({
            template: './src/public/index.html',
            inject: 'body'
        }),
        new ExtractTextPlugin('[name].[hash].css', {
            disable: !isProd
        })
    )

    // Add production specific plugins
    if (isProd) {
        config.plugins.push(
            // Only emit files when there are no errors
            new webpack.NoErrorsPlugin(),
            // Dedupe modules in the output
            new webpack.optimize.DedupePlugin(),
            // Minify all javascript, switch loaders to minimizing mode
            //new webpack.optimize.UglifyJsPlugin(),
            // Copy assets from the public folder
            new CopyWebpackPlugin([{
                from: __dirname + '/src/public'
            }])
        )
    }

    /**
     * Dev server configuration
     */
    config.devServer = {
        contentBase: './src/public',
        stats: 'minimal'
    };

    return config;
}();