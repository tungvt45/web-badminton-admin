import React, { Component } from 'react';
import { Table, Button, Input, message, Modal, Tooltip } from 'antd';
import { isEmpty } from './../../../utils/helpers/helpers';
import {
  getOrderGuest,
  submitOrderForGuest,
  searchOrder
} from './OrderGuestServiec';

const confirm = Modal.confirm;

class OrderListPage extends Component {
  state = {
    listOrderGuest: []
  };
  componentDidMount() {
    this.fecthOrderGuest();
  }
  fecthOrderGuest = async () => {
    try {
      const res = await getOrderGuest();
      this.setState({ listOrderGuest: res.data });
    } catch (err) {}
  };
  submitOrderGuest(item) {
    confirm({
      title: 'Bạn Có Chắc Chắn Muốn Thực Hiện?',
      content: (
        <div>
          <span>Chuyển Order Đến Store</span>
        </div>
      ),
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          await submitOrderForGuest({ orderId: item.orderId });
          this.fecthOrderGuest();
          message.success('Thực Hiện Thành Công!');
        } catch (err) {}
      },
      onCancel() {}
    });
  }
  handleSearch = async value => {
    if (isEmpty(value)) {
      this.fecthOrderGuest();
    } else {
      try {
        const res = await searchOrder({ orderId: value });
        this.setState({ listOrderGuest: [res.data] });
      } catch (err) {}
    }
  };
  render() {
    const { listOrderGuest } = this.state;
    console.log('listOrderGuest', listOrderGuest);
    const columns = [
      {
        title: 'STT',
        dataIndex: 'no',
        align: 'center',
        render: (text, record, index) => <span>{index + 1}</span>,
        key: 'no'
      },
      {
        title: 'OrderId',
        dataIndex: 'orderId',
        key: 'orderId',
        align: 'center'
      },
      {
        title: 'Số Order',
        dataIndex: 'orderNumber',
        key: 'orderNumber',
        align: 'center'
      },
      {
        title: 'Tổng Tiền',
        dataIndex: 'totalOrder',
        key: 'totalOrder',
        align: 'center'
      },

      {
        title: 'Hành Động',
        dataIndex: 'action',
        render: (text, records) => (
          <Tooltip title="Đã Nhận Tiền Từ Khách Hàng">
            <div>
              <Button
                style={{
                  marginRight: 5,
                  color: 'green',
                  background: '#e6e6e6'
                }}
                icon="check"
                onClick={() => this.submitOrderGuest(records)}
              />
            </div>
          </Tooltip>
        ),
        key: 'action',
        align: 'center'
      }
    ];
    return (
      <div className="order-guest" style={{ paddingLeft: '20%' }}>
        <div style={{ textAlign: 'center', padding: '30px' }}>
          <h2>Danh Sách Order Khách Vãn Lai</h2>
        </div>
        <div
          className="col-lg-4"
          style={{ paddingBottom: '15px', marginLeft: '65%' }}
        >
          <Input.Search
            placeholder="Search"
            onSearch={this.handleSearch}
            enterButton
          />
        </div>
        <Table
          style={{ marginRight: '10px' }}
          columns={columns}
          dataSource={!isEmpty(listOrderGuest) && listOrderGuest}
          pagination={false}
          bordered
        />
      </div>
    );
  }
}
export default OrderListPage;
