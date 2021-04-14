/** 商品相关 */
import request, { RequestOptions } from '@/utils/request'

/** 新增商品 */
export function create(param: CreateParam, extra?: RequestOptions): Promise<undefined> {
  const options = {
    url: '/web_api/item/create',
    method: 'post' as 'post',
    data: param,
    ...(extra || {}),
  }
  return request(options)
}

/** 新增商品参数 */
export interface CreateParam {
  /** 商品图片 */
  itemImage?: string
  /** 商品名称 */
  itemName: string
  /** 商品价格 */
  price: number
  /** 商品单位 */
  unit?: string
}

/** 删除商品 */
export function del(itemId: number, extra?: RequestOptions): Promise<undefined> {
  const options = {
    url: `/web_api/item/del/${itemId}`,
    method: 'post' as 'post',
    ...(extra || {}),
  }
  return request(options)
}

/** 隐藏商品 */
export function disable(itemId: number, extra?: RequestOptions): Promise<undefined> {
  const options = {
    url: `/web_api/item/disable/${itemId}`,
    method: 'post' as 'post',
    ...(extra || {}),
  }
  return request(options)
}

/** 显示商品 */
export function enable(itemId: number, extra?: RequestOptions): Promise<undefined> {
  const options = {
    url: `/web_api/item/enable/${itemId}`,
    method: 'post' as 'post',
    ...(extra || {}),
  }
  return request(options)
}

/** 获取商品列表 */
export function list(param: ListParam, extra?: RequestOptions): Promise<ListRes> {
  const options = {
    url: '/web_api/item/list',
    method: 'get' as 'get',
    data: param,
    ...(extra || {}),
  }
  return request(options)
}

/** 获取商品列表 */
export interface ListParam {
  /** 商品名称(多个参数使用逗号隔开） */
  itemNames?: string
}

/** 获取商品列表应答数组 */
export type ListRes = ListResItem[]

/** 获取商品列表应答数组元素 */
export interface ListResItem {
  /** id */
  id?: number
  /** 商品图片 */
  itemImage?: string
  /** 商品名称 */
  itemName?: string
  /** 商品状态 */
  itemStatus?: 'ENABLE' | 'DISABLE'
  /** 单价 */
  price?: number
  /** 单位 */
  unit?: string
}

/** 修改商品 */
export function modify(param: ModifyParam, extra?: RequestOptions): Promise<undefined> {
  const options = {
    url: '/web_api/item/modify',
    method: 'post' as 'post',
    data: param,
    ...(extra || {}),
  }
  return request(options)
}

/** 修改商品参数 */
export interface ModifyParam {
  /** 商品id */
  itemId: number
  /** 商品图片 */
  itemImage?: string
  /** 商品名称 */
  itemName: string
  /** 商品价格 */
  price: number
  /** 商品单位 */
  unit?: string
}
