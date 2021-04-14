/**
 * 统一请求参数
 */
export default function(instance) {
  instance.interceptors.request.use(
    (config) => {
      const { data, method } = config
      if (data && (!method || method === 'get')) {
        config.params = data
        delete config.data
      }
      return config
    },
    (error) => Promise.reject(error)
  )
}
