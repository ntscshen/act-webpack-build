# act-webpack-build
[传送门：Ashley Nolan的前端(2016)问卷调查](https://ashleynolan.co.uk/blog/frontend-tooling-survey-2016-results)

简易webpack构建( webpack2 )

> versions1( 学习版本 )

### 目录结构说明( versions2 )

```javascript
.
├── assets // 上传CND后的代码
│   └── 2017-03-31-414-act-test
│       ├── images
│       │   └── na-banner1.jpg
│       ├── index.html
│       ├── index.min.css
│       └── js
│           └── main.js
├── dist // build的文件
│   └── 2017-03-31-414-act-test
│       ├── images
│       │   └── na-banner1.jpg
│       ├── index.html
│       ├── index.min.css
│       └── js
│           └── main.js
├── gulpfile.js
├── package.json
├── src // 入口文件
│   └── 2017-03-31-414-act-test // 当前活动名称
│       ├── css
│       │   └── index.scss
│       ├── images
│       │   ├── WechatIMG242.jpeg
│       │   └── na-banner1.jpg
│       ├── index.html // 主入口页面( 自动引入CSS和JS )。在开发模式中 CSS为内嵌入HTML(不是外链形式)
│       └── js
│           └── index.js // 主入口JS( require(html);require(css) )
├── up.js // 上传gulp插件
├── upcache.json // 上传后的缓存文件
├── webpack.config.js // 配置活动名文件
└── webpack.config.lib.js // webpack配置文件
```

### 功能说明

- 页面自动引入 `css` 和 `js` 文件。
- `css` 预编译( 前缀、优化 )。
- `Js` 打包编译,自动刷新( ES6支持 )
- 功能标识,根据开发/生产环境进行不同配置的打包
- 自动上传CND

### CLI目录( npm scripts )

| 命令                 | 作用&效果                                    |
| ------------------ | ---------------------------------------- |
| `npm run dev`      | 构建开发环境代码                                 |
| `npm run online`   | 构建生产环境代码                                 |
| `npm run up`       | 上传( **dist目录** )下( 图片 \| css \| js ) 到 `CND` ( 并构建 `assets` 目录 ) |
| `npm run server`   | 开启本地服务器( 基于 **dist目录** `webpack-dev-server` && `browser-sync` ) |
| `npm run clean`    | 清除编译后的文件( **dist** )                     |
| `npm run clean-up` | 清除上传后的文件( **assets目录** )                 |

##### 环境约定

>  测试机node版本 `6.10.0`

注： `up.js` xx上传文件( 删除 )
