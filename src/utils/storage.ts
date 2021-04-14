/**
 * 本地存储，json 化存取
 * 若本地存储不可用，则存在 window.bika_storage 中
 */
const STORE_KEY = 'bika_storage'

class LocalStore {
  set(key: string, value: any): void {
    try {
      return localStorage.setItem(key, JSON.stringify(value))
    } catch (e) {}

    if (!window[STORE_KEY]) {
      window[STORE_KEY] = {}
    }
    window[STORE_KEY][key] = value
  }

  /** 如果没有内容，返回的是 null */
  get(key: string): any {
    try {
      const value = localStorage.getItem(key)
      return value !== null ? JSON.parse(value) : value
    } catch (e) {}

    const value = window[STORE_KEY]?.[key]
    return value !== void 0 ? value : null
  }

  remove(key: string): void {
    try {
      return localStorage.removeItem(key)
    } catch (e) {}

    if (window[STORE_KEY]) {
      delete window[STORE_KEY][key]
    }
  }

  /** 清除所有数据 */
  clear(): void {
    try {
      return localStorage.clear()
    } catch (e) {}

    window[STORE_KEY] = {}
  }
}

const localStore = new LocalStore()
export default localStore
