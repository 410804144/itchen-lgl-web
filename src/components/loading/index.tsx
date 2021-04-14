import React from 'react'
import { Spin } from 'antd'

interface Props {
  text?: string
  style?: any
}

/** Loading 组件 */
function Loading(props: Props) {
  return <Spin tip={props.text} style={props.style} />
}

Loading.defaultProps = {
  text: '加载中',
}

export default Loading
