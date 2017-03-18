/* eslint indent: 0 */
const glob = require('glob');
const { resolve } = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
     js: glob.sync('./src/*.js')  
    },
    output: {
        path: resolve('dist'),
        filename: 'bundle.js',
        library: 'calendarModel',
        libraryTarget: 'umd',
        umdNamedDefine: true
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
    }
};