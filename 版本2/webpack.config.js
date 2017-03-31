const act_webapck_config = require('./webpack.config.lib');
module.exports = act_webapck_config('2017-03-31-414-act-test');
// const path = require('path');
// const webpack = require('webpack');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
// const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
//
// module.exports = {
//     entry: __dirname + '/src/js/index.js',
//     output: {
//         path: __dirname + '/dist/',
//         filename: '[name].js'
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.scss$/,
//                 exclude: path.resolve(__dirname, 'node_modules'),
//                 use: [
//                     {
//                         loader: 'style-loader'
//                     }, {
//                         loader: 'css-loader?importLoaders=1',
//                         options: {
//                             minimize: true
//                         }
//                     }, {
//                         loader: 'postcss-loader',
//                         options: {
//                             plugins: function() {
//                                 return [require('autoprefixer')];
//                             }
//                         }
//                     }, {
//                         loader: 'sass-loader',
//                         options: {
//                             sourceMap: true
//                         }
//                     }
//                 ]
//             }, {
//                 test: /\.html$/,
//                 exclude: path.resolve(__dirname, 'node_modules'),
//                 loader: 'raw-loader'
//             }, {
//                 test: /\.(gif|png|jpe?g|svg)$/i,
//                 exclude: path.resolve(__dirname, 'node_modules'),
//                 use: [
//                     {
//                         loader: 'file-loader',
//                         options: {
//                             name: 'images/[name].[ext]'
//                         }
//                     }
//                 ]
//             }
//         ]
//     },
//     plugins: [
//         new webpack.HotModuleReplacementPlugin(),
//         new HtmlWebpackPlugin({filename: 'index.html', inject: 'body'}),
//         new webpack.DefinePlugin({
//             'process.env': {
//                 NODE_ENV: JSON.stringify('production')
//             }
//         }),
//         new BrowserSyncPlugin({
//             host: 'localhost',
//             port: 3000,
//             proxy: 'http://localhost:8088'
//         }, {reload: false})
//     ],
//     devServer: {
//         contentBase: __dirname + '/dist',
//         port: 8088,
//         inline: true,
//         hot: true
//     }
// };
//
// // 开发和生成环境的区分
// if (process.env.NODE_ENV === 'production') {
//     console.log('--- --- --- --- --- ---  --- --- --- 生产环境 --- --- --- --- --- ---  --- --- --- ');
//     module.exports.plugins = (module.exports.plugins || []).concat([ // 严谨
//         new UglifyjsWebpackPlugin(),
//         new ExtractTextPlugin('./css/index.min.css')
//     ]);
//     module.exports.module.rules.shift();
//     module.exports.module.rules.use = module.exports.module.rules.unshift({
//         test: /\.scss$/,
//         exclude: path.resolve(__dirname, 'node_modules'),
//         use: ExtractTextPlugin.extract({
//             fallback: 'style-loader',
//             use: [
//                 {
//                     loader: 'css-loader?importLoaders=1',
//                     options: {
//                         minimize: true
//                     }
//                 }, {
//                     loader: 'postcss-loader',
//                     options: {
//                         plugins: function() {
//                             return [require('autoprefixer')];
//                         }
//                     }
//                 }, {
//                     loader: 'sass-loader',
//                     options: {
//                         sourceMap: true
//                     }
//                 }
//             ]
//         })
//     });
// } else {
//     console.log('--- --- --- --- --- ---  --- --- --- 开发环境 --- --- --- --- --- ---  --- --- --- ');
//     module.exports.devtool = 'source-map';
// }
