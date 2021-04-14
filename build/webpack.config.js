const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin')
const context = path.resolve(__dirname, '../src')

module.exports = {
  mode: 'production',
  context,
  entry: {
    index: './index.tsx',
  },
  output: {
    path: path.resolve(context, '../dist'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.scss', '.css'],
    alias: {
      '@': context,
    },
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|tsx?)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.s?css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
          { loader: 'sass-loader', options: { implementation: require('sass') } },
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [path.resolve(context, './styles/mixin.scss')],
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10 * 1024,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: '../public/index.html',
      favicon: '../public/favicon.png',
    }),
    // new AntdDayjsWebpackPlugin(),
  ],
}
