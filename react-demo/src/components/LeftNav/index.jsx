import { useEffect, useState } from "react"
import { withRouter } from "react-router"
import menuList from '../../config/menuConfig'
import memoryUtils from '../../utils/memoryUtils.js'
import { Menu } from 'antd';
import {Link} from 'react-router-dom'


const { SubMenu } = Menu;

function LeftNav(props)
{

    const path = props.location.pathname


    // var openkey=[]
    //判断当前登录用户对item是否有权限
    const hasAuth=(item)=>{
        const {key,isPublic} = item
        const AuthMenus = memoryUtils.user.authMenus


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
    
    const [openkey,setOpenkey]=useState([])
    /**
     * 要确定默认展开的SubMenu，需要在有children的地方找到需要展开的那一项
     */
    function getDefaultOpenKey()
    {
        menuList.map((item)=>{
            if(hasAuth(item)&&item.children)
            {
                // console.log(item)
                //查找与当前请求路径匹配的子Item
                const cItem = item.children.find(cItem =>{
                    return cItem.key===path
                })
                //如果存在，说明当前item所对应的子列表需要展开
                if(cItem)
                {
                    // console.log(cItem)
                    setOpenkey([item.key])
                }
            }
        })
    }
    useEffect(()=>{
        getDefaultOpenKey()
        // console.log(openkey)
    },[])

    function onOpenChange(openKeys)
    {
        // console.log(openKeys)
        setOpenkey(openKeys)
    }
    /**
     * 根据menu 的数据数组生成标签数组
     */
    const getMenuNodes = (menuList)=>
    {
        console.log('getMenuNodes')
        return menuList.map(item =>{
            //当前用户有item的权限，才去添加，显示相应的页面
            if(hasAuth(item))
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

                else
                {
                    return (
                        <SubMenu key={item.key} title={
                            <span>
                            {item.icon}
                            {item.title}
                            </span>
                    }>
                            {/* 对item的children递归调用 */}
                            {getMenuNodes(item.children)}
                        </SubMenu>
                    )
                }
            }
            
        })
    }

    console.log(openkey)
    return (
    <Menu
        theme="dark"
        mode="inline"
        //根据路由确认默认选中
        // defaultSelectedKeys={[path]}//问题是如果输入根路径，第一次会匹配到'/'，导致/home无法匹配到
        selectedKeys={[path]}
        openKeys={openkey}
        onOpenChange={(openkeys)=>{onOpenChange(openkeys)}}
    >
        {
            getMenuNodes(menuList)
        }
    </Menu>
    )
}

export default withRouter(LeftNav)