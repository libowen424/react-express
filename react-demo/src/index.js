/**
 * 入口文件
 */
import React from 'react'
import ReactDom from 'react-dom'
import App from './App'
import memoryUtils from './utils/memoryUtils.js';
import storeUtils from './utils/storageUtils'

/**
 * 读取local中的保存的user
 * 如果有，保存到内存中
 * 用于免登录，如果缓存中有，就直接读取到内存
 */
const user = storeUtils.getUser()
memoryUtils.user = user


//渲染App组件
ReactDom.render(
        <App/>,
    document.getElementById('root')
    )