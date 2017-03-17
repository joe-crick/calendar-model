/* eslint indent: 0 */

const { resolve } = require('path');
const webpack = require('webpack');
const JsDocPlugin = require('jsdoc-webpack-plugin');

module.exports = {
    entry: [
        './index.js'
    ],
    output: {
        path: resolve('dist'),
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader'
            }
        }]
    },
    resolve: {
        extensions: ['.js']
    },
    plugins: [
        new JsDocPlugin({})
    ]
};