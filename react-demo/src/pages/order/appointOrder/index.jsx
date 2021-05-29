import React, { Component } from 'react';
import { Table, Tag, Space } from 'antd';
import { Popconfirm } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Modal, Button } from 'antd';
import { Descriptions } from 'antd';
import { AppointOrderInterface } from '../../../api';

const { Column } = Table;


class AppointOrder extends Component {

    constructor()
    {
        super()
        this.state={
            allAppointOrders:[]
        }
    }

    showDetail=(order,record)=>
    {
        const {orderId,senderName,time,addrNo,senderAddress,orderStatus,courierName,senderDateBegin,senderDateEnd,isClassified,items,senderWeight,integration} = order
        // console.log(order,record)
        Modal.info({
            width:'800',
            title: '订单详细信息',
            content: (
                <Descriptions bordered  extra={<Button type="primary">Edit</Button>}  >
                    <Descriptions.Item label="orderId">{orderId}</Descriptions.Item>
                    <Descriptions.Item label="userName">{senderName}</Descriptions.Item>
                    <Descriptions.Item label="time">{time}</Descriptions.Item>
                    <Descriptions.Item label="addrNo">{addrNo}</Descriptions.Item>
                    <Descriptions.Item label="senderAddress">{senderAddress}</Descriptions.Item>
                    <Descriptions.Item label="courierName" >
                    {courierName}
                    </Descriptions.Item>
                    <Descriptions.Item label="senderDateBegin">
                    {senderDateBegin}
                    </Descriptions.Item>
                    <Descriptions.Item label="senderDateEnd">{senderDateEnd}</Descriptions.Item>
                    <Descriptions.Item label="isClassified">{isClassified==0?'未分类':'已分类'}</Descriptions.Item>
                    <Descriptions.Item label="items">{items}</Descriptions.Item>
                    <Descriptions.Item label="senderWeight">
                    {senderWeight}
                    </Descriptions.Item>
                    <Descriptions.Item label="integration">
                    {integration}
                    </Descriptions.Item>
                </Descriptions>
            ),
            onOk() {},
          });
    }


    confirmFinish=async(text)=>
    {
        // console.log('delete',text)
        // data.unshift()
       await AppointOrderInterface(null,null,null,null,null,null,text.orderId,3,null,null,null,null,null,null,null,null,null,null,'update')
        this.getAllAppointOrders()
    }
    getAllAppointOrders=async ()=>{
        let res = await AppointOrderInterface(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,'getAll')
        // console.log('@',res.data.data)
        this.setState(
            (state,props)=>{
                return {allAppointOrders:res.data.data.value}
            }
        )
    }
    componentDidMount()
    {
        this.getAllAppointOrders()
    }
    render() {
        const {allAppointOrders} = this.state
        return (
            <>
                  <Table dataSource={allAppointOrders}>
                    <Column title="订单id" dataIndex="orderId" key="orderId" />
                    <Column title="用户名" dataIndex="senderName" key="senderName" />
                    <Column title="下单时间" dataIndex="time" key="time" />
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
                    <Column title="上门地址" dataIndex="senderAddress" key="senderAddress" />
                    <Column title="用户电话" dataIndex="senderTel" key="senderTel" />
                    <Column
                        title="Action"
                        key="action"
                        render={(text, record) => (
                            <Space size="middle">
                            <a onClick={()=>{this.showDetail(text,record)}}>详情</a>
                            
                            <Popconfirm title="Are you sure？"     onConfirm={()=>{this.confirmFinish(text)}}
 icon={<QuestionCircleOutlined style={{ color: 'red' }} />}>
                                <a>完成</a>
                            </Popconfirm>
                            </Space>
                        )}
                    />
                </Table>
            </>
        );
    }
}

export default AppointOrder;