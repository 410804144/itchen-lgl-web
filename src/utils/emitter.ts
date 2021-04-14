import mitt from 'mitt'
const emitter = mitt()

const nameMap = {}

/** 生成唯一事件名 */
export function getUniqueName() {
  while (true) {
    const name = (Math.random() * 1000000).toFixed(0)
    if (!nameMap[name]) {
      nameMap[name] = 1
      return name
    }
  }
}

export default emitter
