import dayjs from 'dayjs'

/** 格式化时间 */
export function formatTime(time?: string, format = 'YYYY-MM-DD HH:mm:ss'): string {
  if (!time) {
    return ''
  }

  const value = /\+0000$/.test(time) ? time.replace(/\+0000$/, '+00:00') : time
  return time ? dayjs(value).format(format) : ''
}

/** 格式化数字 */
export function formatNum(num?: string | number, decimal = 2, completion = true): number | string {
  const res = (parseFloat(num as string) || 0).toFixed(decimal)
  return completion ? res : parseFloat(res)
}

/** 格式化百分比 */
export function formatPercent(num?: number): string {
  return num !== void 0 ? `${num * 100}%` : ''
}
