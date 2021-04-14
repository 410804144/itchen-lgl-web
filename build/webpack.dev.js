const path = require('path')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config')
const proxy = require('./proxy')

module.exports = merge.smart(baseConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  devServer: {
    port: 10003,
    contentBase: path.join(__dirname, '../dist'),
    compress: true,
    historyApiFallback: true,
    hot: true,
    proxy: {
      '/web_api/': {
        target: 'http://localhost:10000',
        secure: false,
        changeOrigin: true,
        onProxyReq(proxyReq) {
          Object.keys(proxy).forEach((key) => {
            proxyReq.setHeader(key, proxy[key])
          })
        },
      },
    },
  },
})
