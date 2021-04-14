/**
 * 用户鉴权
 */
import history from '@/utils/history'
import storage from '@/utils/storage'

const HEADER_KEY = 'Authorization'

export default function(instance) {
  // 请求
  instance.interceptors.request.use(
    (config) => {
      // 进行登录时，先清除原先 token
      const loginUrl = '/api/admin/account/login'
      if (config.url === loginUrl) {
        storage.remove('token')
      }

      const token = storage.get('token')
      if (token) {
        config.headers = config.headers || {}
        config.headers[HEADER_KEY] = token
      }
      return config
    },
    (error) => Promise.reject(error)
  )

  // 响应
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      const { status } = error.response || {}
      if (status === 401) {
        // 失效后移除旧 cookie
        storage.remove('token')

        if (error.config.autoLogin) {
          history.push('/login')
        }
      }
      return Promise.reject(error)
    }
  )
}
