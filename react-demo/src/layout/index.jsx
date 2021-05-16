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
import { ExclamationCircleOutlined } from '@ant-design/icons';
import menuList from '../config/menuConfig'
import {formateDate} from '../utils/dateUtils'
import {getRoleById} from '../api/index'
import ArticleList from '../pages/articles/articleList';
import logo from '../assets/logo.png';

const { confirm } = Modal;
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

/**
 * 总布局，项目中其他页面内容都渲染到该组件中的content部分中
 */
class TotalLayout extends Component {

    
    state = {
        currentTime: formateDate(Date.now()), // 当前时间字符串
        AuthMenus:[]
    }

    openKey=[]

    getTime = () => {
        // 每隔1s获取当前时间, 并更新状态数据currentTime
        this.intervalId = setInterval(() => {
          const currentTime = formateDate(Date.now())
          this.setState({currentTime})
        }, 1000)
      }

    //登出
    exit=()=>
    {
        confirm({
            title: '确定要退出吗?',
            icon: <ExclamationCircleOutlined />,
            content: 'Some descriptions',
            onOk:()=> {
                memoryUtils.user={}
                storageUtils.removeUser()
                this.props.history.replace('/login')
            },
            onCancel() {
            //   console.log('Cancel');
            },
          });
    }

    getRolesById=async ()=>{
        const roleId = memoryUtils.user.roleId
        let res = await getRoleById(roleId)
        const menus = res.data.data.menus
        // console.log(res.data.data.menus)
        this.setState({
            AuthMenus:menus
        })

    }
    //判断当前登录用户对item是否有权限
    hasAuth=(item)=>{
        const {key,isPublic} = item
        const {AuthMenus} = this.state
        const roleId = memoryUtils.user.roleId
        // console.log(roleId)

        // let menus=['/home']
        if(isPublic||AuthMenus.indexOf(key)!==-1)
        {
            // console.log('true',key)
            return true
        }
        //如果用户有此item的某个子权限
        else if(item.children)
        {
            return !!item.children.find(child => AuthMenus.indexOf(child.key)!==-1)
        }
        else
        {
            // console.log('false',key)
            return false
        }
    }

    /**
     * 根据menu 的数据数组生成标签数组
     */
    getMenuNodes = (menuList)=>
    {
        const path = this.props.location.pathname
        return menuList.map(item =>{
            //当前用户有item的权限，才去添加，显示相应的页面
            if(this.hasAuth(item))
            {
                // console.log(this.hasAuth(item),item.key)
                if(!item.children)
                {
                    return (
                        <Menu.Item key={item.key}>
                            <Link to={item.key}>
                                {item.icon}
                                {item.title}
                            </Link>
                        </Menu.Item>
                    )
                }
                /**
                 * 要确定默认展开的SubMenu，需要在有children的地方找到需要展开的那一项
                 */
                else
                {
                    //查找与当前请求路径匹配的子Item
                    const cItem = item.children.find(cItem =>{
                        return cItem.key===path
                    })
                    //如果存在，说明当前item所对应的子列表需要展开
                    if(cItem)
                        this.openKey=[item.key]
                    return (
                        <SubMenu key={item.key} title={
                            <span>
                            {item.icon}
                            {item.title}
                            </span>
                    }>
                            {/* 对item的children递归调用 */}
                            {this.getMenuNodes(item.children)}
                        </SubMenu>
                    )
                }
            }
            
        })
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

    constructor()
    {
        super()
        this.getRolesById()
    }
    componentDidMount()
    {
        this.getTime()
    }
    componentWillUnmount()
    {
        clearInterval(this.intervalId)
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


        // debugger
        //最好可以放在componentWillMount(已废弃)
        const menuNodes = this.getMenuNodes(menuList)
        // console.log('menuNodes',menuNodes)
        const path = this.props.location.pathname
        const openKey = this.openKey
        // console.log('openkey',openKey)
        // const title = this.getTitle()
        const {currentTime} = this.state
        return (

            <div className="admin">
                 <Layout className="totalLayout">
                    <Header className="header">
                        <img src={logo} className="logo" />
                        <text className="logoText"> 欢迎来到回收君</text> 
                        {user!=null
                           &&
                        <div className="welComeTitle" >
                            欢迎您,{user.username}<span onClick={this.exit} className="exit">退出</span>
                        </div>
                        }   

                    </Header>
                    <div className="header-bottom">
                            <div className="header-bottom-right">
                                <span className="curtime">{currentTime}</span>
                            </div>
                    </div>
                    <Content style={{ padding: '0 50px' }}>
                        <Layout style={{ padding: '0px 0', height:'100%' }}>
                            <Sider width={200} style={{height:'100%'}}>
                            <Menu
                                theme="dark"
                                mode="inline"
                                //根据路由确认默认选中
                                // defaultSelectedKeys={[path]}//问题是如果输入根路径，第一次会匹配到'/'，导致/home无法匹配到
                                selectedKeys={[path]}
                                defaultOpenKeys={openKey}
                                // openKeys={openKey}
                            >
                                {
                                    menuNodes
                                }
                            </Menu>
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