const webpack = require('webpack');
const path = require('path');
// 自动生成HTML文件(资源自动引入)
const htmlWebpackPlugin = require('html-webpack-plugin');
// css分离
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const extractCSS = new ExtractTextPlugin('css/[name].css');
// JS代码压缩
const uglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
// 搜索css资源、并优化css(默认使用cssnano)
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = function(options) {
    options = options || {};
    var plugins = [];
    var devtools = '';
    plugins.push(new webpack.LoaderOptionsPlugin({
        options: {
            postcss: function() {
                return [
                    require('precss'), require('autoprefixer')({
                        browsers: ['ie>=8', '>1% in CN']
                    })
                ];
            },
            devServer: {
                contentBase: './dist',
                port: '8088',
                historyApiFallback: true,
                hot: true,
                inline: true
            }
        }
    }), new ExtractTextPlugin('[name].css'), new OptimizeCssAssetsPlugin());
    var dev = options.dev !== undefined
        ? options.dev
        : true;
    if (dev) { // dev
        plugins.push(new htmlWebpackPlugin({
            filename: 'index.html',
            template: __dirname + '/src/index.html',
            inject: 'body'
        }));
        // webpackConfig.devtool = 'eval-source-map';
        devtools = 'eval-source-map'; // dev调试模式
    } else { // online
        devtools = '';
        plugins.push(new uglifyjsWebpackPlugin());
        plugins.push(new htmlWebpackPlugin({
            filename: 'index.html',
            template: __dirname + '/src/index.html',
            inject: 'body',
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                collapseBooleanAttributes: true,
                removeEmptyAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                minifyCSS: true,
                minifyJS: true
            }
        }));
    }
    var webpackConfig = {
        devtool: devtools, // 便于调试
        entry: './src/js/index.js',
        output: {
            path: __dirname + '/dist',
            filename: './js/[name].js'
        },
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    exclude: path.resolve(__dirname, 'node_modules'), // 解析成一个绝对路径
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            {
                                loader: 'css-loader?importLoaders=1',
                                options: {
                                    sourceMap: true
                                }
                            }, {
                                loader: 'postcss-loader'
                            }, {
                                loader: 'sass-loader',
                                options: {
                                    sourceMap: true
                                }
                            }
                        ]
                    })
                }, {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: path.resolve(__dirname, 'node_modules'), // 解析成一个绝对路径
                    options: {
                        presets: ['es2015']
                    }
                }, {
                    test: /\.(png|jpg|gif|svg)$/i,
                    exclude: path.resolve(__dirname, 'node_modules'),
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: 'images/[name].[ext]'
                            }
                        }, {
                            loader: 'image-webpack-loader',
                            options: {
                                progressive: true,
                                optimizationLevel: 7,
                                interlaced: false,
                                pngquant: {
                                    quality: '65-90',
                                    speed: 4
                                }
                            }
                        }
                    ]
                }
            ]
        },
        plugins: plugins
    };
    return webpackConfig;
};
