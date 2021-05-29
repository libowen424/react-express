import React, { Component } from 'react';
import logo from '../../assets/logo.png';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import './Header.less'
import TimeCount from '../TimeCount/index'


const { confirm } = Modal;

class MyHeader extends Component {

    //登出
    exit=()=>
    {
        const {onExitUser} = this.props
        confirm({
            title: '确定要退出吗?',
            icon: <ExclamationCircleOutlined />,
            content: 'Some descriptions',
            onOk:()=> {
                onExitUser()
            },
            onCancel() {
            //   console.log('Cancel');
            },
            });
    }

    render() {
        const {user} = this.props
        return (
            <>
                <img src={logo} className="logo" />
                <span className="logoText"> 欢迎来到回收君</span> 
                {user!=null
                    &&
                <div className="welComeTitle" >
                    欢迎您,{user.username}<span onClick={this.exit} className="exit">退出</span>
                </div>
                }   
                <TimeCount/>
            </>
        );
    }
}

export default MyHeader;