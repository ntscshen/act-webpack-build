// 1、raw-loader 集成 devServer 热载入测试( HTML加载 )
// 2、测试(css和js热载入)
// 测试用到npm包
// 1、style-loader：通过内嵌的方式<style>标签将CSS添加到DOM中( 一般与css-loader结合使用 )
// 2、css-loader：
// 3、postcss-loader
// 4、sass-loader
// 5、autoprefixer
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = function(options) {
    var ACT_ENTRY = __dirname + '/src/' + options + '/js/index.js';
    var ACT_OUTPUT = __dirname + '/dist/' + options + '/';
    var ACT_HTML_PLUGIN = __dirname + '/src/' + options + '/index.html';

    var webpackConfig = {
        entry: ACT_ENTRY,
        output: {
            path: ACT_OUTPUT,
            // path: __dirname + '/dist/',
            filename: 'js/[name].js'
        },
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    exclude: path.resolve(__dirname, 'node_modules'),
                    use: [
                        {
                            loader: 'style-loader'
                        }, {
                            loader: 'css-loader?importLoaders=1',
                            options: {
                                // root: './img', // url(/image.png) => url(./img/image.png)
                                minimize: true // 集成了cssnano,设置之后CSS会被优化压缩
                            }
                        }, {
                            loader: 'postcss-loader',
                            options: {
                                plugins: function() {
                                    return [require('autoprefixer')];
                                }
                            }
                        }, {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                }, {
                    test: /\.html$/,
                    exclude: path.resolve(__dirname, 'node_modules'),
                    loader: 'raw-loader'
                }, {
                    test: /\.(gif|png|jpe?g|svg)$/i,
                    exclude: path.resolve(__dirname, 'node_modules'),
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: 'images/[name].[ext]'
                            }
                        }
                    ]
                }, {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: path.resolve(__dirname, 'node_modules'), // 解析成一个绝对路径
                    options: {
                        presets: ['es2015']
                    }
                }
            ]
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                // template: __dirname + '/src/index.html',
                template: ACT_HTML_PLUGIN,
                inject: 'body'
            }),
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify('production'),
                    NODE_DEV: JSON.stringify('dev'),
                    NODE_SERVER: JSON.stringify('server')
                }
            }),
            new BrowserSyncPlugin({
                host: 'localhost',
                port: 3000,
                proxy: 'http://localhost:8088'
            }, {reload: false})
        ],
        devServer: {
            contentBase: __dirname + '/dist/' + options,
            port: 8088,
            inline: true,
            hot: true
        }
    };

    // 开发和生成环境的区分
    if (process.env.NODE_ENV === 'production') { // 生产环境
        console.log('--- --- --- --- --- ---  --- --- --- 生产环境 --- --- --- --- --- ---  --- --- --- ');
        console.log('--- --- --- --- --- ---  --- --- --- 项目名称：' + global.act_name);
        console.log('--- --- --- --- --- ---  --- --- --- 生产环境 --- --- --- --- --- ---  --- --- --- ');
        webpackConfig.plugins = (webpackConfig.plugins || []).concat([ // 严谨
            new UglifyjsWebpackPlugin(),
            new ExtractTextPlugin('./index.min.css')
        ]);
        webpackConfig.module.rules.shift();
        webpackConfig.module.rules.use = webpackConfig.module.rules.unshift({
            test: /\.scss$/,
            exclude: path.resolve(__dirname, 'node_modules'),
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                    {
                        loader: 'css-loader?importLoaders=1',
                        options: {
                            // root: './img', // url(/image.png) => url(./img/image.png)
                            minimize: true // 集成了cssnano,设置之后CSS会被优化压缩
                        }
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function() {
                                return [require('autoprefixer')];
                            }
                        }
                    }, {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            })
        });
    } else { // 开发环境
        console.log('--- --- --- --- --- ---  --- --- --- 开发环境 --- --- --- --- --- ---  --- --- --- ');
        console.log('--- --- --- --- --- ---  --- --- --- 项目名称：' + global.act_name);
        console.log('--- --- --- --- --- ---  --- --- --- 开发环境 --- --- --- --- --- ---  --- --- --- ');
        module.exports.devtool = 'source-map';
    }

    return webpackConfig;
};

/*
1、当前的webpack配置通过style-loader实现的CSS热加载、可以使用 css-hot-loader(只支持1.0)实现开发环境css文件提取
2、browser-sync 和 browser-sync-webpack-plugin ： 在监视模式运行wabpack、才会启动BrowserSync
3、可以摒弃webpack-dev-server，只使用 browser-Sync。
4、也可以使用webpack-dev-sever的( 热加载 )功能和browser-sync( 终端调试 )
使用borwser-sync-webpack-plugin代理webpack-dev-server的输出、以便获得两者的特性功能
 */
/*
使用npm脚本进行CIL的开发
1、npm允许在 package.json文件里面,使用scripts字段定义脚本命令
...
{
    "srcipts":{
        "server": "webpack-dev-server --online --hot --watch"
    }
}
...
上述代码是package.json文件里的一个片段
npm run server 等同于 webpack-dev-server --online --hot --watch
2、把构建工具的命令存放在package.json的srcipts里。有很多优点。
    1、集中管理
    2、使用者不需要知道当前项目是干嘛的\只要允许npm run server就可以打开服务器、使用当前构建的功能
3、查看当前的所有npm脚本,使用不带任何参数的 npm run 命令
$ npm run
  clean
    rimraf dist
  dev
    webpack
  server
    webpack-dev-server --watch

 */
/*
图片的处理
url-laoder是对file-loader的上层封装
image-webpack-loader : 使用imagemin缩小PNG，JPEG，GIF和SVG图像

 */
