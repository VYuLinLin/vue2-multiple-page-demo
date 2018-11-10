# vue2-multiple-page-demo

> 一个基于vue2 + webpack模板的多页面架构配置

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 第一步 首先请看一下我的项目结构目录，并增加类似 multiplePages 结构的目录
![目录结构](https://github.com/VYuLinLin/vue2-multiple-page-demo/blob/master/src/assets/directory.png)

只增加了multiplePages文件夹，包含page1和page2两个子系统，这两个子系统也都是单页面，当然也可以根据需求，配置成多页面。
其中page1项目有自己的路由，包含两个页面。page2比较简单，可以打包成一个简单的html页面。

## 第二步 修改多入口
在webpack的入口处增加多入口配置，也就是在build文件夹下webpack.base.conf.js增加如下代码：
``` js
const entrys = utils.getFilePathObj('./src/multiplePages/**/main.js')
entrys['app'] = './src/main.js'
module.exports = {
  context: path.resolve(__dirname, '../'),
  // entry: {
  //   app: './src/main.js'
  // },
  entry: entrys,
```
getFilePathObj 是一个获取模块下的指定文件的方法，比如：以上的entrys变量就是获取 multiplePages 文件夹子级文件夹下面的所有main.js入口。
代码如下：
```js
// 以下为新增部分
// 获取文件夹下的文件路径对象集合
const glob = require('glob')
exports.getFilePathObj = (pathStr) => {
  const entries = glob.sync(pathStr).reduce((result, entry) => {
    const moduleName = path.basename(path.dirname(entry)) // 获取模块名称
    result[moduleName] = entry
    return result
  }, {})
  return entries
}
```

## 第三步 html文件的生成与引用配置
一般webpack的dev(开发)和prod(生产)环境配置不太一样，所以出口配置也略有不同。
webpack.dev.conf.js 修改如下
```js
// 在原有HtmlWebpackPlugin配置参数里面增加chunks参数
new HtmlWebpackPlugin({
  filename: 'index.html',
  template: 'index.html',
  inject: true,
  chunks: ['app'] // 新增
})

// 在devWebpackConfig变量的最后新增如下代码
const pathObj = utils.getFilePathObj('./src/multiplePages/**/main.js')
if (Object.keys(pathObj).length) {
  for (const filename in pathObj) {
    devWebpackConfig.plugins.push(new HtmlWebpackPlugin({
      filename: filename + '.html',
      template: 'index.html',
      inject: true,
      chunks: [filename]
    }))
  }
}
// end
```

webpack.prod.conf.js 修改如下

```js
// 在原有HtmlWebpackPlugin配置参数里面增加chunks参数
new HtmlWebpackPlugin({
  filename: process.env.NODE_ENV === 'testing'
    ? 'index.html'
    : config.build.index,
  template: 'index.html',
  inject: true,
  minify: {
    removeComments: true,
    collapseWhitespace: true,
    removeAttributeQuotes: true
    // more options:
    // https://github.com/kangax/html-minifier#options-quick-reference
  },
  // necessary to consistently work with multiple chunks via CommonsChunkPlugin
  chunksSortMode: 'dependency',
  chunks: ['vendor', 'manifest', 'app'] // 新增
})

// 在webpackConfig变量的最后新增如下代码
const pathObj = utils.getFilePathObj('./src/multiplePages/**/main.js')
if (Object.keys(pathObj).length) {
  for (const filename in pathObj) {
    webpackConfig.plugins.push(new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, `../dist/${filename}.html`),
      template: 'index.html',
      inject: true, // js的引入位置，true 在body尾部引入js脚本
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunksSortMode: 'dependency', // 排序方式
      chunks: ['vendor', 'manifest', filename]
    }))
  }
}
```

## 最后需要改变一下出口的配置如下：
```js
output: {
  path: config.build.assetsRoot,
  filename: '[name].js',
  publicPath: process.env.NODE_ENV === 'production'
    ? './' + config.build.assetsPublicPath
    : './' + config.dev.assetsPublicPath
},
```

### 以上就是vue2框架利用vue-cli中得webpack模板打包成多页面的配置修改
### 顺序就是增加多页面目录结构 —— 修改统一的多入口配置 —— 修改不同环境的html生成配置 —— 修改出口配置中的路径参数
# 完毕