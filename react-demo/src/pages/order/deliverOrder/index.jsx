import React, { Component } from 'react';
import { Table, Tag, Space } from 'antd';
import { Modal } from 'antd';
import { DeliverOrderInterface, UserInterface } from '../../../api';
import { Form, Input, Button } from 'antd';

const { Column } = Table;


class DeliverOrder extends Component {


    getAllDeliverOrders=async ()=>
    {
        let res = await DeliverOrderInterface(null,null,null,null,null,null,null,null,null,null,'getAll')
        // console.log('@',res.data.data)
        this.setState(
            (state,props)=>{
                return {allDeliverOrders:res.data.data.value}
            }
        )
    }



    showFinish=(text)=>{

        const tailLayout = {
            wrapperCol: {
              offset: 8,
              span: 16,
            },
          };
        const model = Modal.info({
            title: '垃圾分类情况',
            okText:'取消',
            content: (
                <Form
                name="basic"
                onFinish={(values)=>{
                    model.destroy()
                    this.onFinish(values,text.userId)}}
              >
                <Form.Item
                  label="重量"
                  name="weight"
                  rules={[{ required: true, message: 'Please input weight!' }]}
                >
                  <Input />
                </Form.Item>
          
                <Form.Item
                  label="积分"
                  name="integration"
                  rules={[{ required: true, message: 'Please input integration!' }]}
                >
                  <Input.Password />
                </Form.Item>
          
                <Form.Item {...tailLayout} >
                  <Button type="primary" htmlType="submit">
                    提交
                  </Button>
                </Form.Item>
              </Form>
            )
        })
    }

    onFinish=async(values,userId)=>{
        let res =await UserInterface(null,null,null,userId,null,null,null,userId,'get')
        console.log(res.data.data.value)
        const {integration,trashWeight,orderNum} = res.data.data.value
        let res1 = await UserInterface(null,integration+Number(values.integration),null,userId,orderNum+1,null,trashWeight+Number(values.weight),userId,'update')
        console.log(res1)
    }
    constructor()
    {
        super()
        this.state={
            allDeliverOrders:[],
        }
    }

    componentDidMount()
    {
        this.getAllDeliverOrders()
    }

    render() {
        const {allDeliverOrders} = this.state
        return (
            <>
                  <Table dataSource={allDeliverOrders}>
                    <Column title="订单id" dataIndex="orderId" key="orderId" />
                    <Column title="用户名" dataIndex="userId" key="userId" />
                    <Column title="投递时间" dataIndex="time" key="time" />
                    <Column
                        title="状态"
                        dataIndex="orderStatus"
                        key="orderStatus"
                        render={orderStatus => (
                            <>
                                <Tag color={orderStatus==0?'red':orderStatus==1?'orange':orderStatus==2?'blue':'green'} key={orderStatus}>
                                {orderStatus==0?'待接收':orderStatus==1?'已接收':orderStatus==2?'处理中':'已完成'}
                                </Tag>
                            </>
                        )}
                        />
                    <Column title="投递地址" dataIndex="place" key="place" />
                    <Column title="地区编号" dataIndex="addrNo" key="addrNo" />
                    <Column title="垃圾桶id" dataIndex="bucketId" key="bucketId" />

                    <Column title="分类" dataIndex="category" key="category" />
                    <Column
                        title="Action"
                        key="action"
                        render={(text, record) => (
                            <Space size="middle">
                            <a onClick={()=>{this.showFinish(text,record)}}>完成</a>
                            </Space>
                        )}
                    />
                </Table>
            </>
        );
    }
}


export default DeliverOrder;