import { observable, action, computed } from 'mobx'
import * as userSvc from '@/services/user'
import storage from '@/utils/storage'
import history from '@/utils/history'

class UserStore {
  /** 用户信息 */
  @observable info: userSvc.GetUserRes = {} as any

  /** 是否登录 */
  @computed get isLogin() {
    return !!this.info.uid
  }

  /** 更新用户信息 */
  @action updateInfo(info) {
    this.info = info
  }

  /** 初始化 */
  @action.bound init() {
    const token = storage.get('token')
    if (token) {
      return userSvc.getUser().then((res) => {
        this.updateInfo(res)
      })
    } else {
      return Promise.resolve()
    }
  }

  /** 用户登录 */
  @action login(payload: userSvc.LoginParam) {
    return userSvc.login(payload).then((res) => {
      storage.set('token', res.token)
      this.init()
      history.replace('')
    })
  }

  /** 退出登录 */
  @action logout() {
    storage.remove('token')
    this.updateInfo({})
  }

  /** 设置登录token */
  @action setToken(token) {
    storage.set('token', token)
  }
}

const userStore = new UserStore()
export default userStore
