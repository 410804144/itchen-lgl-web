import { hot } from 'react-hot-loader/root'
import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'
import 'antd/dist/antd.css'
import '@/styles'
import Pages from '@/pages'
import history from '@/utils/history'

const App = hot(Pages)

ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>,
  document.getElementById('app')
)
