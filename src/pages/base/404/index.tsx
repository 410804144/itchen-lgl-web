import React from 'react'
import { Button, Result } from 'antd'
import history from '@/utils/history'

/** 404页面 */
export default function NoMatch() {
  return (
    <Result
      status='404'
      title='404'
      subTitle='Sorry, the page you visited does not exist.'
      extra={
        <Button type='primary' onClick={() => history.replace('/')}>
          返回首页
        </Button>
      }
    />
  )
}
