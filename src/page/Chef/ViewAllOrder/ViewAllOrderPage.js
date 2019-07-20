import React, { Component } from 'react';
import { Table, Button, Modal, Select, message, Tag, Tooltip } from 'antd';
import './OrderPage.scss';
import { getOrderChef, submitOrder, cancelOrder } from './OrderPageService';
import { isEmpty } from './../../../utils/helpers/helpers';

const confirm = Modal.confirm;

class ViewAllOrderPage extends Component {
  intervalID = 0;
  state = {
    listOrder: {}
  };

  componentDidMount() {
    this.intervalID = setInterval(this.fetchOrder, 2000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  fetchOrder = async () => {
    try {
      const res = await getOrderChef();
      this.setState({ listOrder: res.data });
    } catch (err) {}
  };
  showDeleteConfirm(item) {
    confirm({
      title: 'Chọn Lý Do Hủy Order?',
      content: (
        <div>
          <Select defaultValue="Lý Do" style={{ width: '100%' }}>
            <Select.Option value="jack">Hết Thức Ăn</Select.Option>
            <Select.Option value="lucy">Sự Cố Bất Ngờ</Select.Option>
          </Select>
        </div>
      ),
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          await cancelOrder({ orderDetailId: item.orderDetailId });
          this.fetchOrder();
          message.success('Đã Hủy Order!');
        } catch (err) {}
      },
      onCancel() {}
    });
  }
  showMessageSucces = async item => {
    try {
      await submitOrder({ orderDetailId: item.orderDetailId });
      this.fetchOrder();
      // console.log('order', item.orderNumber);
      // console.log('food', item.foodVM.foodName);
      message.success('Hoàn Thành Món Ăn!');
    } catch (err) {}
  };
  render() {
    const { listOrder } = this.state;

    const columns = [
      {
        title: 'Món Ăn',
        dataIndex: 'foodName',
        render: (text, records) => <b>{records.foodVM.foodName}</b>,
        key: 'foodName',
        align: 'center'
      },
      {
        title: 'Số Lượng',
        dataIndex: 'quantity',
        render: (text, records) => <b>{records.quantity}</b>,
        key: 'quantity',
        align: 'center'
      },
      {
        title: 'Tùy Chọn',
        dataIndex: 'foName',
        render: (text, records) => (
          <div>
            {!isEmpty(records.orderDetailFoodOption) &&
              records.orderDetailFoodOption.map((item, index) => (
                <Tag style={{ color: 'green', fontSize: '20px' }} key={index}>
                  <b>{item.foName}</b>
                </Tag>
              ))}
          </div>
        ),
        key: 'foName',
        align: 'center'
      },
      {
        title: 'Ghi chú',
        dataIndex: 'foDescription',
        render: (text, records) => (
          <b>
            {!isEmpty(records.orderDetailFoodOption) &&
              records.orderDetailFoodOption.map(item => (
                <div key={item.id}>
                  <span>{item.foDescription}</span>
                </div>
              ))}
          </b>
        ),
        key: 'foDescription',
        align: 'center'
      },
      {
        title: 'Số Order',
        dataIndex: 'orderNumber',
        key: 'orderNumber',
        align: 'center'
      },

      {
        title: 'Hành Động',
        dataIndex: 'action',
        render: (text, records) => (
          <div>
            <Tooltip title="Hoàn Thành Món Ăn">
              <Button
                style={{
                  marginRight: 5,
                  color: 'green',
                  background: '#e6e6e6'
                }}
                icon="check"
                onClick={() => this.showMessageSucces(records)}
              />
            </Tooltip>
            <Tooltip title="Hủy Món Ăn">
              <Button
                style={{ color: '#f1af30', background: '#e6e6e6' }}
                icon="close"
                onClick={() => this.showDeleteConfirm(records)}
              />
            </Tooltip>
          </div>
        ),
        key: 'action',
        align: 'center'
      }
    ];
    return (
      <div className="order-container">
        <Table
          columns={columns}
          dataSource={!isEmpty(listOrder) ? listOrder : []}
          pagination={false}
        />
      </div>
    );
  }
}
export default ViewAllOrderPage;
