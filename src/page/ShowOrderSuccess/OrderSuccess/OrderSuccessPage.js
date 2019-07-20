import React, { Component } from 'react';
import { List, Badge, Table, Icon } from 'antd';
import './OrderSuccess.scss';
import { getOrderSuccess, getOrderWaiting } from './OrderSuccesService';
import { isEmpty } from './../../../utils/helpers/helpers';

class OrderSuccessPage extends Component {
  intervalID = 0;
  state = {
    orderListSuccess: [],
    orderListWaitting: []
  };
  componentDidMount() {
    this.intervalID = setInterval(this.getData, 2000);
  }
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }
  getData = async () => {
    try {
      const res = await getOrderSuccess();
      const { data } = await getOrderWaiting();
      this.setState({ orderListSuccess: res.data, orderListWaitting: data });
      console.log('orderListSuccess', res.data);
    } catch (err) {}
  };
  render() {
    const { orderListSuccess, orderListWaitting } = this.state;
    const columns = [
      {
        title: 'Số Order',
        dataIndex: 'orderNumber',
        render: (text, records) => (
          <b style={{ color: 'green' }}>{records.orderNumber}</b>
        ),
        key: 'orderNumber',
        align: 'center'
      },
      {
        title: 'Món Ăn',
        dataIndex: 'foodName',
        render: (text, records) => <b>{records.foodVM.foodName}</b>,
        key: 'foodName',
        align: 'center'
      },
      {
        title: 'Nhà Hàng',
        dataIndex: 'storeName',
        render: (text, records) => <b>{records.storeVM.storeName}</b>,
        key: 'storeName',
        align: 'center'
      },
      {
        title: 'Sẵn Sàng',
        dataIndex: 'active',
        render: (text, records) => (
          <span>
            {records.oderDetailStatus && (
              <Icon style={{ color: 'green' }} type="check" />
            )}
          </span>
        ),
        key: 'active',
        align: 'center'
      }
    ];
    return (
      <div className="Order-container">
        <div className="left-container">
          <Table
            columns={columns}
            dataSource={!isEmpty(orderListSuccess) ? orderListSuccess : []}
            pagination={false}
          />
        </div>
        <div className="right-container">
          <b className={{ fontsize: '30px' }}>
            <Icon type="sync" spin /> Món Ăn Đang Nấu
          </b>
          <List
            itemLayout="horizontal"
            dataSource={!isEmpty(orderListWaitting) ? orderListWaitting : []}
            renderItem={item => (
              <List.Item>
                <Badge
                  count={item.orderNumber}
                  style={{
                    backgroundColor: '#fff',
                    color: 'red',
                    margin: '0 20px',
                    fontSize: '25px'
                  }}
                />

                <List.Item.Meta
                  title={item.foodVM.foodName}
                  description={item.storeVM.storeName}
                />
                <img
                  style={{ marginRight: '5px' }}
                  width={180}
                  height={80}
                  alt="logo"
                  src={item.foodVM.foodImage}
                />
              </List.Item>
            )}
          />
        </div>
      </div>
    );
  }
}

export default OrderSuccessPage;
