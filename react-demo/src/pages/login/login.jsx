import React, { Component } from 'react';
import { Layout } from 'antd';
import './login.less';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {Link, Redirect} from 'react-router-dom'
import {login ,getRoleById} from'../../api/index'
import { message } from 'antd';
import memoryUtils from '../../utils/memoryUtils.js';
import storeUtils from '../../utils/storageUtils'
import MyHeader from '../../components/MyHeader/MyHeader'
const { Header, Content, Footer } = Layout;

/**
 * 登录的路由组件
 */
class Login extends Component {
    
    onFinish = async (values) => {
        // console.log('Received values of form: ', values);
        const data = {
            'username':values.username,
            'password':values.password
        }
        let res = await login(data)
        // console.log(res.data)
        if(res.data.code===200)
        {
            const user = res.data.data
            //将user保存到内存
            memoryUtils.user= user
            let res2 = await getRoleById(user.roleId)
            console.log(res2)
            memoryUtils.user.authMenus = res2.data.data.menus
            //将user保存到local中
            storeUtils.saveUser(user)
            this.props.history.replace(
                '/'
            )
        }
        else
        {
            message.error('登录失败');
        }
      };

    render() {

        /**
         * 判断是否登录
         * 如果用户已经登陆，跳转到home
         */
        const user = memoryUtils.user
        if(user&&user._id)
        {
            return (
                <Redirect to='/home'></Redirect>
            )
        }

        return (
        <div className="login">
        <Layout className="layout">
            <Header className="header">
              <MyHeader/>
            </Header>
            <Content className="content">
                <Form
                    name="normal_login"
                    className="login-form"
                    // initialValues={{
                    //     remember: true,
                    // }}
                    onFinish={this.onFinish}
                    >
                    <Form.Item
                        name="username"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your Username!',
                        },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                        ]}
                    >
                        <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                        />
                    </Form.Item>


                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                        </Button>
                        Or 
                        <Link to='/regist' style={{color:'blue',marginLeft:'20px'}}>
                        register now!
                        </Link>
                    </Form.Item>
                    </Form>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Blog System By lbw424</Footer>
        </Layout>
        </div>
        );
    }
}

export default Login;