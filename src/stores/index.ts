import { createContext, useContext } from 'react'
import loadingStore from './loading'
import userStore from './user'

const storeContext = createContext({
  user: userStore,
  loading: loadingStore,
})
const useStore = () => useContext(storeContext)

export default useStore
