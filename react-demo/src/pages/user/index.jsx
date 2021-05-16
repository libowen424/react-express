import React, { Component,useState  } from 'react';
import {
    Card,
    Button,
    Table,
    Modal,
    message,
} from 'antd'
import { getAllUsers, reqRoles, deleteUser, addUser, updateUser } from '../../api';
import { Form, Input,  Select } from 'antd';
const { Option } = Select;
const Item = Form.Item

class User extends Component {
    constructor()
    {
        super()
        this.getUsers()
        this.getRoles()
        this.initColumns()
    }

    state ={
        users: [], // 所有用户列表
        roles: [], // 所有角色列表
        isShow: false, // 是否显示确认框
    }


    /*
    显示添加界面
    */
    showAdd = () => {
        this.user = null // 去除前面保存的user
        // console.log(this.formRef.current)
        this.setState({isShow: true})
        setTimeout(() => {
            this.formRef.current.setFieldsValue({
                username:null,
                password:null,
                roleId:null
            })
        },200);
    }

    /*
    显示修改界面
    */
    showUpdate = (user) => {
        // console.log(user)
        this.user = user // 保存user
        this.setState({
        isShow: true
        })
        // console.log(this.formRef.current)
        setTimeout(() => {
            this.formRef.current.setFieldsValue({
                username:user.username,
                password:user.password,
                roleId:user.roleId
            })
        }, 200);

    }

    deleteUser=async (user)=>{

        Modal.confirm({
            title: `确认删除${user.username}吗?`,
            onOk: async () => {
                let result = await deleteUser(user._id)
                if(result.status===200) {
                message.success('删除用户成功!')
                this.getUsers()
              }
            }
          })

    }
    initColumns = () => {
        this.columns = [
        {
            title: '用户名',
            dataIndex: 'username'
        },
        {
            title: '密码',
            dataIndex: 'password'
        },
        {
            title: '所属角色',
            dataIndex: 'roleId',
            render: (roleId) => {
                if(this.roleNames)
                {
                    return this.roleNames[roleId]
                }
                else
                {
                return ''
                }
            }
        },
        {
            title: '操作',
            dataIndex:'_id',
            render: (_id) =>
            {
                const user = this.state.users.find((user)=>user._id===_id)
                // console.log(user)
                return (
                <span>
                    <Button onClick={() => this.showUpdate(user)}>修改</Button>
                    <Button onClick={() => this.deleteUser(user)}>删除</Button>
                </span>
                )
            }
        },
        ]
    }

    /**
     * 根据roles的数组生成所有包含角色名的对象
     * {roleid,roleName}
     */
    initRoleNames=(roles)=>
    {
        let roleNames = roles.reduce((pre,role)=>{
            pre[role._id]=role.name
            return pre
        },{})
        this.roleNames = roleNames
        // console.log(this.roleNames)
    }
    getUsers = async()=>{
        let res = await getAllUsers()
        // console.log(res.data.data)
        if(res.data.code===200)
        {
            this.setState({
                users:res.data.data
            })
        }
    }
    getRoles = async ()=>{
        let res = await reqRoles()
        // console.log(res)
        if(res.data.code ===200)
        {
            this.setState({
                roles:res.data.data
            })
            this.initRoleNames(res.data.data)
        }
    }

    addOrUpdateUser = async ()=>{
        console.log(this.formRef.current.getFieldsValue())
        const updateUserInfo = this.formRef.current.getFieldsValue()
        this.setState({isShow: false})
        if(this.user)
        {
            this.user.username=updateUserInfo.username
            this.user.password=updateUserInfo.password
            this.user.roleId=updateUserInfo.roleId
            // console.log('this.user',this.user)

            let res = await updateUser(this.user)
            // console.log(res)
        }
        else
        {
           let res = await addUser(updateUserInfo)
        //    console.log(res)
        }
        this.getUsers()
    }

    cancelAddRoleModel=()=>{
        this.setState({isShow: false})
    }

    //用户操作表单数据
    formRef = React.createRef();
    componentDidMount()
    {

    }
    
    render() {
        
        const {users, isShow, roles} = this.state

        const title = <Button type='primary' onClick={this.showAdd}>创建用户</Button>
       
        const user = this.user || {}

        const layout = {
            labelCol: {
              span: 4,
            },
            wrapperCol: {
              span: 16,
            },
          };
        return (
            <Card title={title}>
                <Table
                bordered
                rowKey='_id'
                dataSource={users}
                columns={this.columns}
                pagination={{defaultPageSize: 5}}
                />
        

            <Modal
                title={user._id ? '修改用户' : '添加用户'}
                visible={isShow}
                onOk={this.addOrUpdateUser}
                onCancel={this.cancelAddRoleModel}
            >
                <Form {...layout} ref={this.formRef} name="user">
                    <Item name='username' label='用户名'
                            rules={[
                                {
                                    required: true,
                                },
                                ]}
                    >
                        <Input autoComplete="off"  value={user.name}/>
                    </Item>

                    <Item name='password' label='密码'
                            rules={[
                                {
                                    required: true,
                                },
                                ]}
                    >
                        <Input autoComplete="off"  value={user.password} />
                    </Item>

                    <Item name='roleId' label='角色'
                            rules={[
                                {
                                    required: true,
                                },
                                ]}
                    >
                        <Select>
                            {
                            roles.map(role => <Option key={role._id} value={role._id}>{role.name}</Option>)
                            }
                        </Select>
                    </Item>
                </Form>
            </Modal>

          </Card>
        );
    }
}

export default User;