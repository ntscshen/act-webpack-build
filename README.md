# act-webpack-build
[传送门：Ashley Nolan的前端问卷调查](https://ashleynolan.co.uk/blog/frontend-tooling-survey-2016-results)

简易webpack构建( webpack2 )

 .
 ├── dist // 打包后的文件
 │   └── 2017-03-31-414-act-test
 │       ├── css
 │       │   └── index.min.css // autoprefixer(添加前缀) + cssnano(优化CSS结构)
 │       ├── images
 │       │   └── na-banner1.jpg
 │       ├── index.html // 自动引入css和js。在开发模式css为内嵌式
 │       └── main.js // 主入口文件 需要require(html和css)
 ├── package.json
 ├── src // 入口：开发文件
 │   └── 2017-03-31-414-act-test // 当前活动名称
 │       ├── css
 │       │   └── index.scss
 │       ├── images
 │       │   ├── WechatIMG242.jpeg
 │       │   └── na-banner1.jpg
 │       ├── index.html // 入口页面
 │       └── js
 │           └── index.js // 入口JS文件
 ├── webpack.config.js
 └── webpack.config.lib.js

- 页面自动引入 `css` 和 `js` 文件。
- `css` 预编译添加前缀、优化。
- `Js` 打包编译,自动刷新( ES6支持 )
- 功能标识,根据开发/生产环境进行不同配置的打包

##### 环境约定

>  当前本机的：node版本 `6.10.0`
>

##### 开发环境

> `npm run dev` 

##### 生产环境

> `npm run online` 代码压缩

##### 生产环境(2) - 上传本地图片到服务器

> `npm run imgup ` 

##### 本地服务器环境

> `npm run server` 

##### 清除打包文件

> `npm run clearn` 清除编译后的文件( dist )
