/*
 * Filename: /Users/wei/Desktop/otcgo/new-neo-browser/webpack.config.js
 * Path: /Users/wei/Desktop/otcgo/new-neo-browser
 * Created Date: Monday, March 19th 2018, 4:55:47 pm
 * Author: qknow
 * 
 * Copyright (c) 2018 Your Company
 */

const path = require('path')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const env = process.env.NODE_ENV

module.exports = {
    mode: env || "development",
    entry: {
        comp: './component/comp.js',
        index: './js/index.js',
        addrinfo: './js/addrinfo.js',
        assets: './js/assets.js',
        blockinfo: './js/blockinfo.js',
        traninfo: './js/traninfo.js',
        assetinfo: './js/assetinfo.js',
        eventVue: './js/eventVue.js',
        compcss: './styles/comp.css'
    },
    // devtool: env === 'production' ? 'cheap-module-source-map' : 'source-map',
    output: {
        path: path.join(__dirname + '/dist'),
        filename: '[name].js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
        }, ],
        rules: [{
            test: /\.css$/,
            use: ["style-loader", {
                loader: "css-loader",
                options: {
                    minimize: true
                }
            }, "postcss-loader"],
        }],
        rules: [{
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: [{
                    loader: 'css-loader',
                    options: {
                        minimize: true
                    }
                }]
            })
        }]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true,
        })
    ],
    optimization: {
        minimizer: [
            new TerserPlugin({
                test: /\.js(\?.*)?$/i,
                extractComments: true,
                cache: true,
                parallel: true,
                sourceMap: true, // Must be set to true if using source-maps in production
                terserOptions: {
                    // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
                    extractComments: 'all',
                    compress: {
                        warnings: false,
                        drop_console: true,
                        drop_debugger: true
                    },
                }
            }),
        ]
    }
}


// if (process.env.NODE_ENV === 'production') {
//     module.exports.optimization = {
//         minimizer: [
//             new TerserPlugin({
//                 extractComments: true,
//                 cache: true,
//                 parallel: true,
//                 sourceMap: true, // Must be set to true if using source-maps in production
//                 terserOptions: {
//                     // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
//                     extractComments: 'all',
//                     compress: {
//                         drop_console: true,
//                     },
//                 }
//             }),
//         ]
//     }
// }