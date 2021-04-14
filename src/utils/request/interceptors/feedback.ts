/**
 * 请求反馈
 */
import { message } from 'antd'

export default function(instance) {
  // 请求
  instance.interceptors.request.use(
    (config) => config,
    (error) => Promise.reject(error)
  )

  // 响应
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      const { status, data } = error.response || {}
      if (status !== 200) {
        const msg = typeof data?.data === 'string' ? data?.data : ''
        message.error(msg || '请求失败，请重试')
      }
      return Promise.reject(error)
    }
  )
}
