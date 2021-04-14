/**
 * 加载状态
 */
import loadingStore from '@/stores/loading'

export default function(instance) {
  // 请求
  instance.interceptors.request.use(
    (config) => {
      loadingStore.update(config.url, true)
      return config
    },
    (error) => Promise.reject(error)
  )

  // 响应
  instance.interceptors.response.use(
    (response) => {
      loadingStore.update(response.config.url, false)
      return response
    },
    (error) => {
      // FIXME 有可能会获取不到 url 信息，只能将 loading 状态置空
      if (error.config) {
        loadingStore.update(error.config.url, false)
      } else {
        loadingStore.reset()
      }
      return Promise.reject(error)
    }
  )
}
