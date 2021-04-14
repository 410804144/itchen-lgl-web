/** 等待 */
export async function sleep(time: number) {
  await new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}

/** 当前时间 */
export function nowTime() {
  return new Date().getTime()
}
