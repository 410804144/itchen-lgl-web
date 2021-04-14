import { useState } from 'react'

/** 切换状态 */
export function useToggle(initState: boolean = false): [boolean, (nextState?: any) => void] {
  const [active, setActive] = useState(initState)
  const toggle = (state) => {
    if (typeof state === 'boolean') {
      setActive(state)
    } else {
      setActive(!active)
    }
  }

  return [active, toggle]
}

/** 强制更新页面 */
export function useForceUpdate() {
  const [, setState] = useState(false)
  const forceUpdate = () => {
    setState((state) => !state)
  }
  return forceUpdate
}
