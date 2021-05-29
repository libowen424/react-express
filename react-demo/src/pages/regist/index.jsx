import React, { Component } from 'react';
import { Layout } from 'antd';
import './regist.less';
import {regist} from '../../api/index'
import {Link} from'react-router-dom'
import {
    Form,
    Input,
    Select,
    Checkbox,
    Button,
  } from 'antd';
import MyHeader from '../../components/MyHeader/MyHeader'

const { Option } = Select;
const { Header, Content, Footer } = Layout;

const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

class Regist extends Component {
    onFinish = async (values) => {
        /**
         * 验证后发送请求
         */
        const data = {
            'username':values.username,
            'password':values.password
        }
        let res = await regist(data)
        // console.log('Received values of form: ', values);
        console.log(res)
        if(res.data.code === '200')
        {
            this.props.history.goBack()
        }
      };

    prefixSelector = (
    <Form.Item name="prefix" noStyle>
        <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
        </Select>
    </Form.Item>
    );

    render() {
        return (
            <div className="regist">
            <Layout className="layout">
                <Header className="header">
                    <MyHeader/>
                </Header>
                <Content className="content">

                    <Form
                        {...formItemLayout}
                        name="register"
                        onFinish={this.onFinish}
                        initialValues={{
                            prefix: '86',
                        }}
                        scrollToFirstError
                        >

                        {/* <Form.Item
                            name="email"
                            label="E-mail"
                            rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                            ]}
                        >
                            <Input />
                        </Form.Item> */}


                        <Form.Item
                            name="username"
                            label="Username"
                            tooltip="Your login UserName"
                            rules={[{ required: true, message: 'Please input your username!', whitespace: true }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                            ]}
                            hasFeedback
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            name="confirm"
                            label="Confirm"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                },
                            }),
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit" style={{marginLeft:'20px'}}>
                            Register
                            </Button>
                            Or 
                            <Link to='/login' style={{color:'blue'}}>
                            login now!
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

export default Regist;