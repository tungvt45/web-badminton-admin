import React, { Component } from 'react';
import { Table, Modal, Tooltip, Button, message } from 'antd';
import { getOrderCancel, rollbackOrder } from './OrderCancelService';
import { isEmpty } from './../../../utils/helpers/helpers';

const confirm = Modal.confirm;

class OrderCancelPage extends Component {
  intervalID = 0;
  state = {
    listOrderCancel: []
  };
  componentDidMount() {
    this.intervalID = setInterval(this.fecthOrderCancel, 2000);
  }
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }
  fecthOrderCancel = async () => {
    try {
      const res = await getOrderCancel();
      this.setState({ listOrderCancel: res.data });
    } catch (err) {}
  };
  rollbackOrder(item) {
    confirm({
      title: 'Bạn Có Chắc Chắn Muốn Thực Hiện?',
      content: (
        <div>
          <span>Hoàn Tiền Cho Khách</span>
        </div>
      ),
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          await rollbackOrder({ orderDetailId: item.orderDetailId });
          this.fecthOrderCancel();
          message.success('Đã Hủy Order!');
        } catch (err) {}
      },
      onCancel() {}
    });
  }
  render() {
    const { listOrderCancel } = this.state;
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
        title: 'Cửa hàng',
        dataIndex: 'storeName',
        render: (text, record) => <span>{record.storeVM.storeName}</span>,
        key: 'storeName',
        align: 'center'
      },
      {
        title: 'Tổng Tiền',
        dataIndex: 'totalPrice',
        key: 'totalPrice',
        align: 'center'
      },
      {
        title: 'Trạng Thái',
        dataIndex: 'active',
        render: (text, records) => (
          <span>
            {records.oderDetailStatus && (
              <b style={{ color: 'red' }}>Hủy Bỏ Order</b>
            )}
          </span>
        ),
        key: 'active',
        align: 'center'
      },
      {
        title: 'Hành Động',
        dataIndex: 'action',
        render: (text, records) => (
          <Tooltip title="Hoàn Tiền Cho Khách">
            <div>
              <Button
                style={{
                  marginRight: 5,
                  color: 'green',
                  background: '#e6e6e6'
                }}
                icon="check"
                onClick={() => this.rollbackOrder(records)}
              />
            </div>
          </Tooltip>
        ),
        key: 'action',
        align: 'center'
      }
    ];
    return (
      <div style={{ paddingLeft: '20%' }}>
        <div style={{ textAlign: 'center', padding: '30px' }}>
          <h2>Danh Sách Order Bị Hủy</h2>
        </div>
        <Table
          style={{ marginRight: '10px' }}
          columns={columns}
          dataSource={!isEmpty(listOrderCancel) ? listOrderCancel : []}
          pagination={false}
          bordered
        />
      </div>
    );
  }
}

export default OrderCancelPage;
