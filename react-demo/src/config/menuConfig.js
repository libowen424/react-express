import { HomeTwoTone ,UserOutlined, CopyTwoTone,SettingTwoTone} from '@ant-design/icons';

/**
 * 导航菜单配置
 * 根据这个配置进行动态渲染导航路由
 * title：导航名
 * icon：导航的图标
 * key：对应的路由
 */

const menuList = [
    {
        title:'首页',//菜单标题名称
        icon:<HomeTwoTone />,//图标的名称
        key:'/home',//对应的path
        isPublic:true//设置为公开，都能查看
    },
    {
        title:'订单管理',
        icon:<CopyTwoTone />,
        key:'/order',
        children:[
            {
                title:'上门订单',
                icon:<CopyTwoTone />,
                key:'/order/appointOrder',
            },
            {
                title:'投递订单',
                icon:<CopyTwoTone />,
                key:'/order/deliverOrder',
            }
        ]
    },
    {
        title:'用户管理',
        icon:<UserOutlined />,
        key:'/user',
    },
    {
        title:'权限管理',
        icon:<SettingTwoTone />,
        key:'/role',
    },
    {
        title:'文章管理',
        icon:<CopyTwoTone />,
        key:'/articles',
        children:[
            {
                title:'文章列表',
                icon:<CopyTwoTone />,
                key:'/articles/articleList',
            },
            {
                title:'上传文章',
                icon:<CopyTwoTone />,
                key:'/articles/upload',
            }
        ]
    }
]

export default menuList