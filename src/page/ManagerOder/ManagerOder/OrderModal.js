import React, { Component } from 'react';
import { Modal, Form, Table } from 'antd';
import { getListOrderDetails } from './OrderService';
import { isEmpty } from '../../../utils/helpers/helpers';
class OrderModal extends Component {
  state = {
    listOrderDetail: {}
  };
  componentDidMount() {
    this.fetchOrderDetails();
  }
  fetchOrderDetails = async params => {
    const { itemSelected } = this.props;
    const res = await getListOrderDetails({ orderId: itemSelected.id });
    this.setState({ listOrderDetail: res.data });
  };
  render() {
    const { visible } = this.props;
    const { listOrderDetail } = this.state;
    console.log(listOrderDetail);
    const columns = [
      {
        title: 'STT',
        dataIndex: 'no',
        align: 'center',
        render: (text, record, index) => <span>{index + 1}</span>,
        key: 'no'
      },
      {
        title: 'Product Name',
        dataIndex: 'name',
        render: (text, records) => (
          <b>{records.orderDetailIdentity.product.name}</b>
        ),
        key: 'name',
        align: 'center'
      },
      {
        title: 'Quantity',
        dataIndex: 'quantity',
        render: (text, records) => <b>{records.quantity}</b>,
        key: 'quantity',
        align: 'center'
      },
      {
        title: 'Amount',
        dataIndex: 'money',
        render: (text, records) => <b>{records.money}</b>,
        key: 'money',
        align: 'center'
      }
    ];
    return (
      <Modal
        title={'Order Detail'}
        centered
        visible={visible}
        onOk={() => this.props.cancelModal()}
        onCancel={() => this.props.cancelModal()}
      >
        <div>
          <Table
            style={{ marginRight: '10px' }}
            columns={columns}
            dataSource={!isEmpty(listOrderDetail) ? listOrderDetail : []}
            pagination={false}
            bordered
          />
        </div>
      </Modal>
    );
  }
}

export default Form.create()(OrderModal);
