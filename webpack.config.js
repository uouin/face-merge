/**
 * Created by yitala on 2018/3/6.
 */
const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const webpack = require('webpack'); //to access built-in plugins
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const config = {
    entry: path.join(__dirname,'./src/js/index.js'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'index.bundle.[hash].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules\/(?!(dom7|swiper)\/).*/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            { test: /\.txt$/, use: 'raw-loader' },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attrs: [':data-src','img:src']
                    }
                }
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {}
                    }
                ]
            }
        ]
    },
    plugins: [
        new UglifyJsPlugin(),
        new HtmlWebpackPlugin({template: path.join(__dirname,'./src/index.html')})
    ],
    devServer: {
        historyApiFallback: true,
        hot: true,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 300
        }
    }
};

module.exports = config;