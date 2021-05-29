import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import './index.less'
import {Route, Redirect, Switch, Link} from 'react-router-dom'
import Home from '../pages/home/index'
import User from '../pages/user/index'
import Role from '../pages/role/index'
import Uplaod from '../pages/articles/upload'
import AppointOrder from '../pages/order/appointOrder/index'
import DeliverOrder from '../pages/order/deliverOrder/index'
import memoryUtils from '../utils/memoryUtils.js'
import storageUtils from '../utils/storageUtils.js'
import { Modal, Button, Space } from 'antd';
import {formateDate} from '../utils/dateUtils'
import ArticleList from '../pages/articles/articleList';
import MyHeader from '../components/MyHeader/MyHeader'
import LeftNav from '../components/LeftNav';
import menuList from '../config/menuConfig'

const { confirm } = Modal;
const { Header, Content, Footer, Sider } = Layout;

/**
 * 总布局，项目中其他页面内容都渲染到该组件中的content部分中
 */
class TotalLayout extends Component {


    onExitUser=()=>{
        memoryUtils.user={}
        storageUtils.removeUser()
        this.props.history.replace('/login')
    }


    /**
     * 根据路径获取当前页面的title
     */
     getTitle = () => {
        // 得到当前请求路径
        const path = this.props.location.pathname
        let title
        menuList.forEach(item => {
          if (item.key===path) { // 如果当前item对象的key与path一样,item的title就是需要显示的title
            title = item.title
          } else if (item.children) {
            // 在所有子item中查找匹配的
            const cItem = item.children.find(cItem => path.indexOf(cItem.key)===0)
            // 如果有值才说明有匹配的
            if(cItem) {
              // 取出它的title
              title = cItem.title
            }
          }
        })
        return title
      }




    render() {

        //如果内存中没有存贮user，说明没有登录
        const user = memoryUtils.user
        if(!user || !user._id)
        {
            //自动跳转到login
            //在render中可以用Redirect来跳转，在事件回调中就要用编程式导航
            return <Redirect to='/login'></Redirect>
        }


        return (

            <div className="admin">
                 <Layout className="totalLayout">
                     
                    <Header className="header">
                        <MyHeader user={user} onExitUser={this.onExitUser}/>
                    </Header>


                    <Content style={{ padding: '0 50px' }}>
                        <Layout style={{ padding: '0px 0', height:'100%' }}>
                            <Sider width={200} style={{height:'100%'}}>
                                <LeftNav/>
                            </Sider>
                            
                            <Content style={{ padding: '0 24px', minHeight: 280 }}>
                                <Switch>
                                    <Route path='/home' component={Home}></Route>
                                    <Route path='/user' component={User}></Route>
                                    <Route path='/role' component={Role}></Route>
                                    <Route path='/articles/upload' component={Uplaod}></Route>
                                    <Route path='/articles/articleList' component={ArticleList}></Route>
                                    <Route path='/order/appointOrder' component={AppointOrder}></Route>
                                    <Route path='/order/deliverOrder' component={DeliverOrder}></Route>
                                    <Redirect to='/home'></Redirect>
                                </Switch>
                            </Content>
                        </Layout>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                    Blog System By lbw424
                    </Footer>
                </Layout>
            </div>
        );
    }
}

export default TotalLayout;