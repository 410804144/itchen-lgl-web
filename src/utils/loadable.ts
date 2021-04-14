import Loadable from 'react-loadable'
import { Spin } from 'antd'

/** 异步加载组件 */
export default function loadable(loader, options?) {
  return Loadable({
    loading: Spin,
    delay: 300,
    loader,
    ...options,
  })
}
