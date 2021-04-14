import React, { useEffect } from 'react'
import { Switch, Route, useLocation } from 'react-router-dom'
import {Menu, Dropdown, Space, Tabs, Spin} from 'antd'
import ProLayout from '@ant-design/pro-layout'
import { Route as proRoute } from '@ant-design/pro-layout/lib/typings'
import Icon, { LogoutOutlined, UserSwitchOutlined } from '@ant-design/icons'
import * as icons from '@ant-design/icons/lib/icons'
import { observer, useLocalStore } from 'mobx-react'
import { Loading } from '@/components'
import useStore from '@/stores'
import loadable from '@/utils/loadable'
import logo from '@/assets/logo.png'
import storage from '@/utils/storage'
import './style.scss'

/** 页面路由 */
const routes = {
}

/** 页面入口 */
function Pages() {
  const location = useLocation()
  const { user } = useStore()
  const store = useLocalStore(() => ({
    loaded: false,
    initMenu: false, // 是否已经初始化菜单
    path: [],
    route: {} as proRoute,
    tabKey: 1,
    tabCurrent: '',
    tabList: [],
    init: () => {
      console.log('init')
      user.init().finally(() => {
        store.loaded = true
      })
    },
  }))

  useEffect(() => {
    store.init()
  }, [])

  // 构建路由
  const baseRoute = [
    <Route key='/login' path='/login' component={loadable(() => import('@/pages/base/login'))} />,
    <Route key='/' path='/' exact component={loadable(() => import('@/pages/base/home'))} />,
    <Route key='*' path='*' component={loadable(() => import('@/pages/base/404'))} />,
  ]
  const availableRoute = store.path.map((path) => <Route key={path} path={path} component={routes[path]} />)

  return (
    store.loaded ? (
      <Switch>{[...availableRoute, ...baseRoute]}</Switch>
    ) : (
      <div className={'spin'}><Spin size="large" /></div>
    )
  )
}

export default observer(Pages)
