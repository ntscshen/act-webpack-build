# act-webpack-build
简易webpack构建( 以webpack2为基础 )

- 页面自动引入 `css` 和 `js` 文件。
  - 当前文件的hash值变更都会导致当前文件名的改变以解决静态资源缓存问题、资源引用由内部自动完成
- `css` 预编译
  - 启动 [autoprefixer](https://github.com/postcss/autoprefixer) 自动添加前缀
  - 启动 [cssnano](https://www.npmjs.com/package/cssnano) 执行css优化
  - 压缩打包
- `Js`
  - 快速打包编译,自动刷新
  - 公共 `Utils` 组件抽离打包
  - 压缩混淆打包
- 图片压缩( 8K下图片自动转换base64 )
- 功能标识,根据开发/生产环境进行不同配置的打包
- 常用的框架和类库的单独打包( 如:jQuery )
- 支持ES6特性、支持模块化( `import` 、 `require` 等)
  - 此为前端三大框架的基础功能

##### 开发约定

>  `/src/*.html` 为入口文件。
>
>  在 `/src/js/` 一级目录下需要有一个同名的js文件作为该文件入口

##### 开发环境

> `npm run dev` 以调试为基础

##### 生产环境

> `npm run online` 以上传CMS条件为基础( html、css、image、js 优化压缩混淆base64 )

##### 本地服务器环境

> `npm run server` 

##### 清除打包文件

> `npm run clearn` 清除编译后的文件