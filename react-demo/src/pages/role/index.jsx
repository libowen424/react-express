import React, { Component } from 'react';
import {
    Card,
    Button,
    Table,
    Modal,
    Form, Input,
    Tree ,
    message
  } from 'antd'
import {reqRoles,addRole} from '../../api/index'
import menuList from '../../config/menuConfig'
import {updateRole} from '../../api/index'
import memoryUtils from '../../utils/memoryUtils.js'
import storageUtils from '../../utils/storageUtils'

const { TreeNode } = Tree;

const Item = Form.Item

class Role extends Component {

    state = 
    {
        //角色数组
        roles:[],
        //选中的角色
        selectedRole:{},
        //是否显示窗口
        isShowAdd:false,
        isShowAuth:false,
        //选中的角色对应的被选中的按钮
        checkedKeys:[]
    }


    //初始化列名
    initColum = () =>{
        this.columns = [
            {
                title:'角色名称',
                dataIndex:'name'
            },
            // {
            //     title:'创建时间',
            //     dataIndex:'name'
            // },            
            {
                title:'授权时间',
                dataIndex:'authTime'
            },            {
                title:'授权人',
                dataIndex:'authName'
            },
        ]
    }

    //选择Table某一行
    onRow = (role)=>{
        // console.log(role)
        return{
            onClick: event =>{
                //点击行
                // console.log('row onClick()', role)
                this.setState({
                    selectedRole:role
                })
                // console.log(this.state.selectedRole)
            }
        }
    }

    //选择按钮某一行
    onrowSelect =(record)=>
    {
        // console.log(record)
        this.setState({
            selectedRole:record
        })
    }

    //用户操作表单数据
    formRef = React.createRef();
        
    //获取角色数据
    getRoles = async ()=>{
        // debugger
        const result = await reqRoles()
        if(result.data.code==200)
        {
            const roles = result.data.data
            this.setState({
                roles,
            })
        }
        // console.log(result,'@')
    }

    //显示更新弹窗
    showUpdateRole=()=>{
        this.setState({isShowAuth:true})
        //根据选中角色的菜单初始化树状列表
        const {menus} = this.state.selectedRole
        this.setState({
            checkedKeys:menus
        })
    }

    //添加角色
    addRole= async ()=>
    {
        // console.log(this.formRef.current.getFieldValue())
        const {roleName} = this.formRef.current.getFieldValue()
        // console.log(roleName)
        let res = await addRole(roleName)
        console.log(res)
        if(res.data.code===200)
        {
        this.getRoles()
        this.cancelAddRoleModel()
        }
    }

    //取消弹窗
    cancelAddRoleModel = () => {
        this.setState({isShowAdd: false})
        this.formRef.current.resetFields();
    }

    //根据动他路由表获取TreeNodes
    getTreeNodes= (menuList)=>{
        return menuList.reduce((pre,item)=>{
            pre.push(
                {
                    title:item.title,
                    key:item.key,
                    children:item.children? this.getTreeNodes(item.children):null
                }
            )
            return pre
        },[])
    }

    //树状列表被选中后进行更新
    onTreeCheck= checkedKeys =>{
        this.setState({
            checkedKeys
        })
        // console.log('checkedKeys',checkedKeys)
        // console.log('选中角色的菜单',this.state.selectedRole.menus)
    }

    //更新角色的权限
    updateRole=async ()=>{
        let {selectedRole,checkedKeys} = this.state
        selectedRole.menus=checkedKeys
        let res = await updateRole({_id:selectedRole._id,authName:memoryUtils.user.username,authTime:String(new Date()),menus:checkedKeys})
        // console.log(res)
        if(res.data.code===200)
        {
            //如果当前更新的是自己的角色
            //强制退出

            if(selectedRole._id === memoryUtils.user.roleId)
            {
                memoryUtils.user={}
                storageUtils.removeUser()
                this.props.history.replace('/login')
                message.success('当前用户角色权限修改了，请重新登录');
            }
            else
            {
                message.success('角色权限修改成功');
                this.setState({isShowAuth: false})
                this.getRoles()
            }
        }
    }

    constructor(){
        super()
        this.getRoles()
        this.initColum()
    }

    render() {
        const {roles,selectedRole ,isShowAdd,isShowAuth ,checkedKeys} = this.state

        const title = (
            <span>
              <Button type='primary' onClick={()=>{this.setState({isShowAdd:true})}}>创建角色</Button> &nbsp;&nbsp;
              <Button type='primary' onClick={this.showUpdateRole} disabled={!selectedRole._id}>设置角色权限</Button>
            </span>
          )

        /**
         * Addform所需样式
         */
        const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
        };

        // updataForm Item布局的配置对象
        const formItemLayout = {
            labelCol: { span: 4 },  // 左侧label的宽度
            wrapperCol: { span: 15 }, // 右侧包裹的宽度
        }
        
        const treeChilren = this.getTreeNodes(menuList)
        // console.log(treeChilren)
        
        return (
            <Card title={title}>
                <Table
                rowSelection={{type:'radio', selectedRowKeys:[selectedRole._id],onSelect:this.onrowSelect}}
                bordered
                rowKey='_id'
                dataSource={roles}
                columns={this.columns}
                pagination={{defaultPageSize:5}}
                onRow={this.onRow}
                />

                <Modal
                    title="添加角色"
                    visible={isShowAdd}
                    onOk={this.addRole}
                    onCancel={
                        this.cancelAddRoleModel
                    }
                    >
                          <Form
                          ref={this.formRef}
                            {...layout}
                            name="basic"
                            >
                            <Form.Item
                                label="roleName"
                                name="roleName"
                                rules={[{ required: true, message: 'Please input your roleName!' }]}
                            >
                                <Input  autoComplete="off"  />
                            </Form.Item>

                        </Form>
                </Modal>

                <Modal
                    title="设置角色权限"
                    visible={isShowAuth}
                    onOk={this.updateRole}
                    onCancel={() => {
                        this.setState({isShowAuth: false})
                    }}
                    >
                    <div>
                        <Item label='角色名称' {...formItemLayout}>
                        <Input value={selectedRole.name} disabled/>
                        </Item> 

                        <Tree
                            checkable
                            defaultExpandAll={true}
                            checkedKeys={checkedKeys}
                            treeData={[
                                {
                                title:"平台权限",key:'all',
                                children:treeChilren
                                }
                            ]}
                            onCheck={
                                this.onTreeCheck
                            }
                        >

                        </Tree>
                    </div>

                </Modal>

            </Card>
        );
    }
}

export default Role;