import React, { Component } from 'react';
import { Table, Button, Tooltip } from 'antd';
import { getListOrder } from './OrderService';
import { isEmpty } from '../../../utils/helpers/helpers';
import OrderModal from './OrderModal';
class ManageOrderPage extends Component {
  state = {
    visibleModal: false,
    listOder: [],
    listOrderDetail: []
  };
  openModal = item => {
    this.setState({ visibleModal: true, itemSelected: item });
  };
  handleCancel = () => {
    this.setState({ visibleModal: false, itemSelected: {} });
  };
  componentDidMount() {
    this.fetchOrder();
  }
  fetchOrder = async () => {
    const res = await getListOrder();
    this.setState({ listOder: res.data });
  };
  render() {
    const { listOder, visibleModal, itemSelected } = this.state;
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
        dataIndex: 'id',
        key: 'id',
        align: 'center'
      },
      {
        title: 'Date',
        dataIndex: 'date',
        render: text => <span>{new Date(text).toLocaleDateString()}</span>,
        key: 'date',
        align: 'center'
      },

      {
        title: 'Detail',
        dataIndex: 'action',
        render: (text, records) => (
          <Tooltip title="Info Order Detail">
            <div>
              <Button
                style={{
                  marginRight: 5,
                  color: 'green',
                  background: '#e6e6e6'
                }}
                icon="info"
                onClick={() => this.openModal(records)}
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
          <h2>List Order</h2>
        </div>
        <Table
          style={{ marginRight: '10px' }}
          columns={columns}
          dataSource={!isEmpty(listOder) ? listOder : []}
          pagination={false}
          bordered
        />
        {visibleModal && (
          <OrderModal
            visible={visibleModal}
            itemSelected={itemSelected}
            cancelModal={this.handleCancel}
            fetchData={this.fetchUser}
          />
        )}
      </div>
    );
  }
}

export default ManageOrderPage;
