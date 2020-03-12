module.exports = {
  lintOnSave: false,//关闭eslint
  devServer: {
    proxy: {    //配置代理服务器
      // 接口小暗号
      '/del': {
        target: 'https://c.y.qq.com', //要转发的目标网址目标网址 
        changeOrigin: true,
        pathRewrite: {
          "^/del": ''  //将路径中多余的暗号 删除
        }
      },
      '/player': {
        target: 'http://47.95.207.1:3000',
        changeOrigin: true,
        pathRewrite: {
          '^/player': ''
        }
      }

    }
  },
}