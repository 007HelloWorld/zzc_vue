
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {  
  publicPath: process.env.VUE_APP_BASE_URL,
  productionSourceMap: false,
  chainWebpack: (config) => {
    // 通过webpack-chain，链式操作修改webpack
    config.resolve.alias
      .set('@', resolve('src'))
  },
  devServer: {
    open: true, // 自动在浏览器打开
    sockHost: 'localhost',
    disableHostCheck: true, // 防止一直发起socket检测请求
    proxy: {
      '/api': {
        target: 'https://smcloud-test.shimaowy.com',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/' // 这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调
          // 用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
        }
      }
    }
  }
}
