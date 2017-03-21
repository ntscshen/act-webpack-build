// const webpack = require('webpack');
// const path = require('path');
// // 自动生成HTML文件(资源自动引入)
// const htmlWebpackPlugin = require('html-webpack-plugin');
// // css分离
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
// // JS代码压缩
// const uglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
// // const
// // module.exports = function(options) {
// const config = {
//     devtool: 'eval-source-map', // 便于调试
//     entry: './src/js/index.js',
//     output: {
//         path: __dirname + '/dist',
//         filename: './js/[name].js'
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.scss$/,
//                 use: [
//                     {
//                         loader: 'style-loader'
//                     }, {
//                         loader: 'css-loader',
//                         options: {
//                             sourceMap: true,
//                             importLoaders: 1
//                         }
//                     }, {
//                         loader: 'postcss-loader' // 配置项在 LoaderOptionsPlugin中添加
//                     }, {
//                         loader: 'sass-loader',
//                         options: {
//                             sourceMap: true
//                         }
//                     }
//                 ]
//             }, {
//                 test: /\.js$/,
//                 loader: 'babel-loader',
//                 exclude: path.resolve(__dirname, 'node_modules'), // 解析成一个绝对路径
//                 options: {
//                     presets: ['es2015']
//                 }
//             }
//         ]
//     },
//     plugins: [
//         new webpack.LoaderOptionsPlugin({
//             options: {
//                 postcss: function() {
//                     return [
//                         require('precss'), require('autoprefixer')({
//                             browsers: ['ie>=8', '>1% in CN']
//                         })
//                     ];
//                 },
//                 devServer: {
//                     contentBase: './dist',
//                     historyApiFallback: true,
//                     hot:true,
//                     inline: true
//                 }
//             }
//         }),
//         new uglifyjsWebpackPlugin(),
//         new htmlWebpackPlugin({
//             filename: 'index.html',
//             template: __dirname + '/src/index.html',
//             inject: 'body',
//             info: '',
//             minify: {
//                 collapseWhitespace: true,
//                 // 删除空格 - 压缩HTML
//                 removeComments: true,
//                 // 清除HTML注释
//                 collapseBooleanAttributes: true,
//                 // 省略Boolean属性 <input checked="true"/> ==> <input />
//                 removeEmptyAttributes: true,
//                 // 删除所有空格作属性值 <input id="" /> ==> <input />
//                 removeScriptTypeAttributes: true,
//                 // 删除script默认type="text/javascript"
//                 removeStyleLinkTypeAttributes: true,
//                 // 删除<style>和<link>的type="text/css"
//                 minifyCSS: true, // 压缩页面JS
//                 minifyJS: true // 压缩页面CSS
//             }
//         })
//     ]
// };
// module.exports = config;
//
// /*
// online：js or html unglify
//  */

const default_webpack_config = require('./webpack.config.generate');
module.exports = default_webpack_config({dev: true});
