/*
 * Filename: /Users/wei/Desktop/otcgo/new-neo-browser/webpack.config.js
 * Path: /Users/wei/Desktop/otcgo/new-neo-browser
 * Created Date: Monday, March 19th 2018, 4:55:47 pm
 * Author: qknow
 * 
 * Copyright (c) 2018 Your Company
 */

const path = require('path')

module.exports = {
    entry: {
        comp: './component.js',
        home: './js/home.js'
    },
    output: {
        path: path.join('/dist/js'),
        filename: '[name].js'
    },
    module: {
        rules: [
          {
            test: /\.js$/,
            loader: 'babel-loader',
          },
        ],
    },
}