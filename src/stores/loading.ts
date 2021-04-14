import { observable, action, toJS } from 'mobx'

interface Loading {
  [key: string]: boolean
}

class LoadingStore {
  /** 加载信息 */
  @observable map: Loading = {}

  // TODO 支持数组
  /** 是否加载中 */
  is(url) {
    let target = url
    // 获取 services 中请求函数的 url
    if (typeof url === 'function') {
      const matches = url.toString().match(/url:\s['"`](.*)['"`]/)
      if (matches) {
        target = matches[1]
      }
    }
    // FIXME 这个判断不是很合理
    return Object.keys(this.map).some((key) => key.indexOf(target) === 0 && this.map[key])
  }

  /** 更新 */
  @action update(url, loading) {
    this.map = Object.assign({}, this.map, { [url]: loading })
  }

  /** 重置 */
  @action reset() {
    this.map = {}
  }
}

const loadingStore = new LoadingStore()
export default loadingStore
