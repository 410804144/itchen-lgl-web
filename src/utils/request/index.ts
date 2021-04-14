import axios, { AxiosRequestConfig } from 'axios'
import qs from 'qs'
import authInterceptor from './interceptors/auth'
import feedbackInterceptor from './interceptors/feedback'
import loadingInterceptor from './interceptors/loading'
import transformInterceptor from './interceptors/transform'

/** 请求配置项 */
export interface RequestOptions extends AxiosRequestConfig {
  /**
   * 是否自动自动登录
   * @default true
   */
  autoLogin?: boolean
  /** 静默请求（不显示 loading） */
  silent?: boolean
  /** 请求参数 */
  data?: any
}

const instance = axios.create({
  timeout: 30 * 1000,
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
})

const defaultConfig: RequestOptions = {
  autoLogin: true,
}

// 添加拦截器，request 处理顺序自底向上，response 相反
feedbackInterceptor(instance)
authInterceptor(instance)
transformInterceptor(instance)
loadingInterceptor(instance)

/** 发起请求 */
function request(options: RequestOptions) {
  const requestOptions = Object.assign({}, options, defaultConfig)
  return instance(requestOptions).then((res) => {
    if (res.status !== 200) {
      return Promise.reject(res)
    }

    return res.data.data
  })
}

export default request
