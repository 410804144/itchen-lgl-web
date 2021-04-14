const merge = require('webpack-merge')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const baseConfig = require('./webpack.config')

const isAnalyzer = process.env.ANALYZER === 'true'

module.exports = merge.smart(baseConfig, {
  output: {
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[chunkhash].chunk.js',
  },
  plugins: [
    new ScriptExtHtmlWebpackPlugin({
      inline: /^runtime\.(.*)\.js$/,
    }),
    isAnalyzer && new BundleAnalyzerPlugin(),
  ].filter(Boolean),
})
