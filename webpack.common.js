const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: ["babel-polyfill", 'whatwg-fetch', './js/index.js']
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'News App',
            myPageHeader: 'News Application',
            template: './index.html',
            filename: './index.html'
        })
    ],
    output: {
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js',
        path: path.resolve(__dirname, './dist')
    },
    resolveLoader: {
        modules: [
            'node_modules',
            path.resolve(__dirname, 'loaders')
        ]
    },
    module: {
        rules: [
            {
                test: /\.json$/,
                use: [
                    'json-loader',
                    {
                        loader: path.resolve('loaders/test.js')
                    }
                ]
            },
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }]
            },
            {
                test: /\.html/,
                use: 'raw-loader',
                exclude: [
                    path.resolve(__dirname, './index.html'),
                ]
            }
        ]
    }
};