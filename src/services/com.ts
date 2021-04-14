/** 共通相关 */
import request, { RequestOptions } from '@/utils/request'

/** 显示文件 */
export function image(imageName: string, extra?: RequestOptions): Promise<undefined> {
  const options = {
    url: `/web_api/com/image/${imageName}`,
    method: 'get' as 'get',
    ...(extra || {}),
  }
  return request(options)
}

/** 上传文件 */
export function upload(extra?: RequestOptions): Promise<UploadRes> {
  const options = {
    url: '/web_api/com/upload',
    method: 'post' as 'post',
    ...(extra || {}),
  }
  return request(options)
}

export type UploadRes = string
