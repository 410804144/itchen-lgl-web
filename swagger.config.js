module.exports = {
  api: 'http://localhost:10000/v2/api-docs',
  output: './src/services',
  urlPrefix: '',
  headers: require('./build/proxy'),
  prettier: require('./prettier.config.js'),
  getFunctionName: (path, tag) => {
    const skipTags = ['staff', 'group']
    const reg = /^(\/web_api\/)([^/]+)\/(.*)/
    const name = skipTags.includes(tag) ? path : path.replace(reg, '$1$3')
    return name
      .replace(/^\/web_api\//, '')
      .replace(/\/\{[^}]+\}/, '')
      .replace(/\/([a-z])/g, ($1, $2) => $2.toUpperCase())
  },
}
