/** 用户相关 */
import request, { RequestOptions } from '@/utils/request'

/** 获取用户信息 */
export function getUser(extra?: RequestOptions): Promise<GetUserRes> {
  const options = {
    url: '/web_api/user/getUser',
    method: 'get' as 'get',
    ...(extra || {}),
  }
  return request(options)
}

/** 获取用户信息应答 */
export interface GetUserRes {
  /** 昵称 */
  nickname?: string
  /** uid */
  uid?: number
}

/** 登陆 */
export function login(param: LoginParam, extra?: RequestOptions): Promise<LoginRes> {
  const options = {
    url: '/web_api/user/login',
    method: 'post' as 'post',
    data: param,
    ...(extra || {}),
  }
  return request(options)
}

/** 登陆参数 */
export interface LoginParam {
  /** 密码 */
  password: string
  /** 用户名 */
  username: string
}

/** 登陆应答 */
export interface LoginRes {
  /** 昵称 */
  nickname?: string
  /** token */
  token?: string
  /** uid */
  uid?: number
}

/** 注册 */
export function register(param: RegisterParam, extra?: RequestOptions): Promise<undefined> {
  const options = {
    url: '/web_api/user/register',
    method: 'post' as 'post',
    data: param,
    ...(extra || {}),
  }
  return request(options)
}

/** 注册参数 */
export interface RegisterParam {
  /** 昵称 */
  nickname: string
  /** 密码 */
  password: string
  /** 用户名 */
  username: string
}
