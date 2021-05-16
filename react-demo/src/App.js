/*
应用的根组件
*/
import React from 'react'//即使没用，定义组件也一定要引入
import {Component} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Login from './pages/login/login.jsx'
import TotalLayout from './layout'
import Regist from './pages/regist/index'

export default class App extends Component
{
    render()
    {
        return(
            <BrowserRouter>
                <Switch>{/*只匹配其中一个 */}
                    {/* 根路由只有三个选择：登录、注册、总布局 */}
                    <Route path='/login' component={Login}></Route>
                    <Route path='/regist' component={Regist}></Route>
                    <Route path='/' component={TotalLayout}></Route>
                </Switch>
            </BrowserRouter>
        )
    }
}