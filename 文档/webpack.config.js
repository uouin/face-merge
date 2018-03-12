/**
 * Created by yitala on 2018/3/6.
 */
const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const webpack = require('webpack'); //to access built-in plugins
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const config = {
    entry: path.join(__dirname,'./src/js/index.js'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'js/[name].[hash].js'
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
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
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
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'assets/[name].[hash].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins:getPlugins(),
    devServer: {
        historyApiFallback: true,
        hot: true,
        compress: true,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 300
        }
    }
};

module.exports = config;

function getPlugins() {
    let plugins = [
        new HtmlWebpackPlugin({template: path.join(__dirname,'./src/index.html')}),
        new ExtractTextPlugin("styles.[hash].css")
    ];

    if(process.env.ENV !== 'dev'){
        plugins.push(new UglifyJsPlugin())
    }
    return plugins;
}