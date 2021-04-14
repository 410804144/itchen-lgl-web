const path = require('path')
const context = path.resolve(__dirname, './src')

module.exports = {
  presets: [
    [
      '@babel/env',
      {
        targets: '> 1%, last 2 versions',
        useBuiltIns: 'usage',
        corejs: 3,
      },
    ],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  plugins: [
    'react-hot-loader/babel',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    '@babel/plugin-syntax-dynamic-import',
  ],
}
