import React  from 'react'
import { Space, Input, Button } from 'antd'
import { UserOutlined, LockTwoTone } from '@ant-design/icons'
import { observer, useLocalStore } from 'mobx-react'
import * as userSvc from '@/services/user'
import useStore from '@/stores'
import logo from '@/assets/logo.png'
import './style.scss'

/** 登录页 */
function Login() {
  const { user, loading } = useStore()
  const store = useLocalStore(() => ({
    form: {} as userSvc.LoginParam,
    updateForm: (key, e) => {
      store.form[key] = e.target.value
    },
    login: () => {
      user.login(store.form).then()
    },
  }))

  return (
    <div className='page-login'>
      <Space direction='vertical' size='large'>
        <div className='header'>
          <img alt='logo' className='logo' src={logo} />
          <span className='title'>五金</span>
        </div>
        <Space direction='vertical' size='middle' style={{ width: 368 }}>
          <Input
            size='large'
            prefix={<UserOutlined style={{ color: '#1890ff' }} />}
            placeholder='用户名'
            value={store.form.username}
            onChange={store.updateForm.bind(this, 'username')}
          />
          <Input.Password
            size='large'
            prefix={<LockTwoTone />}
            placeholder='密码'
            value={store.form.password}
            onChange={store.updateForm.bind(this, 'password')}
          />
        </Space>
        <Button block type='primary' size='large' loading={loading.is(userSvc.login)} onClick={store.login}>
          登录
        </Button>
      </Space>
    </div>
  )
}

export default observer(Login)
