# act-webpack-build
简易webpack构建( 以webpack2为基础 )

- css的模块化，预处理器的编译。启用 `autoprefixer` 自动添加浏览器前缀
- 支持js、css、scss等代码检查、打包、压缩混淆、图片转base64等
- 静态资源按需自动注入到html中，并可自动加上hash值
- 快速编译，自动刷新。
- 公用lib组件抽离打包，生成一个公共的bundle文件

##### 开发要求

> 约定 `/src/*.html` 为入口文件。
>
> 在 `/src/js/` 一级目录下需要有一个同名的js文件作为该文件入口

##### 开发环境

> `npm run dev`

##### 生成环境

> `npm run online`

##### 本地调试

> `npm run server`

##### 清除打包文件

> `npm run clearn`