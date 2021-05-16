import React, { Component } from 'react';
import { Table, Tag, Space } from 'antd';
import { Popconfirm } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Modal, Button } from 'antd';
import { Descriptions, Badge } from 'antd';

const { Column, ColumnGroup } = Table;

var data = [
    {
      key: '1',
      orderId: '1392145675911540738',
      userName: 'lbw',
      time: '2021-05-11 15:52:46',
      address: '湖北省 武汉市 珞南街道 珞喻路 129号武汉大学',
      tags: ['待处理'],
      courierName:'qwq',
      dateBegin:'2021-05-11 02:00:00',
      dateEnd:'2021-05-11 03:00:00',
      isClassify:'已分类',
      items:'goodsType:金属,goodsWeight:10-15kg;',
      weight:'2kg',
      integration:'10积分'
    },
    {
        key: '2',
        orderId: '1392148089641218050',
        userName: 'qwq',
        time: '2021-05-15 11:49:55',
        address: '湖北省 武汉市 珞南街道 珞喻路 129号武汉大学',
        tags: ['已完成'],
        courierName:'lbw',
        dateBegin:'2021-05-11 02:00:00',
        dateEnd:'2021-05-11 03:00:00',
        isClassify:'已分类',
        items:'goodsType:金属,goodsWeight:10-15kg;',
        weight:'2kg',
        integration:'10积分'
      },
  ];

class AppointOrder extends Component {


    showDetail=(order,record)=>
    {
        const {orderId,userName,time,address,tags,courierName,dateBegin,dateEnd,isClassify,items,weight,integration} = order
        // console.log(order,record)
        Modal.info({
            width:'800',
            title: '订单详细信息',
            content: (
                <Descriptions bordered  extra={<Button type="primary">Edit</Button>}  >
                    <Descriptions.Item label="orderId">{orderId}</Descriptions.Item>
                    <Descriptions.Item label="userName">{userName}</Descriptions.Item>
                    <Descriptions.Item label="time">{time}</Descriptions.Item>
                    <Descriptions.Item label="address">{address}</Descriptions.Item>
                    <Descriptions.Item label="courierName" >
                    {courierName}
                    </Descriptions.Item>
                    <Descriptions.Item label="dateBegin">
                    {dateBegin}
                    </Descriptions.Item>
                    <Descriptions.Item label="dateEnd">{dateEnd}</Descriptions.Item>
                    <Descriptions.Item label="isClassify">{isClassify}</Descriptions.Item>
                    <Descriptions.Item label="items" span={3}>{items}</Descriptions.Item>
                    <Descriptions.Item label="weight">
                    {weight}
                    </Descriptions.Item>
                    <Descriptions.Item label="integration">
                    {integration}
                    </Descriptions.Item>
                </Descriptions>
            ),
            onOk() {},
          });
    }


    confirmDelete(text)
    {
        console.log('delete',text)
        // data.unshift()
    }
    render() {
        return (
            <>
                  <Table   dataSource={data}>
                    <Column title="订单id" dataIndex="orderId" key="orderId" />
                    <Column title="用户名" dataIndex="userName" key="userId" />
                    <Column title="下单时间" dataIndex="time" key="time" />
                    <Column
                        title="状态"
                        dataIndex="tags"
                        key="tags"
                        render={tags => (
                            <>
                            {tags.map(tag => (
                                <Tag color={tag=='待处理'?'blue':'green'} key={tag}>
                                {tag}
                                </Tag>
                            ))}
                            </>
                        )}
                        />
                    <Column title="上门地址" dataIndex="address" key="address" />
                    <Column title="骑手名" dataIndex="courierName" key="courierName" />
                    <Column
                        title="Action"
                        key="action"
                        render={(text, record) => (
                            <Space size="middle">
                            <a onClick={()=>{this.showDetail(text,record)}}>详情</a>
                            
                            <Popconfirm title="Are you sure？"     onConfirm={()=>{this.confirmDelete(text)}}
 icon={<QuestionCircleOutlined style={{ color: 'red' }} />}>
                                <a href="#">Delete</a>
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