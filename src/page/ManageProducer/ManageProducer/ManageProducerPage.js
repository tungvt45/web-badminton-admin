import React, { Component } from 'react';
import { Button, Table, Tooltip, Icon, Pagination } from 'antd';
import { getAllProducer } from './ProducerService';
import { isEmpty } from './../../../utils/helpers/helpers';
import './Producer.scss';
import { MODE } from './../../../utils/constants/constants';
import ManageProducerModal from './ManageProducerModal';
let pageNo = 0;
class ManageProducerPage extends Component {
  state = {
    visibleModal: false,
    visibleDetailModal: false,
    mode: MODE.ADD,
    itemSelected: {},
    producerList: []
  };

  openModal = () => {
    this.setState({ visibleModal: true, mode: MODE.ADD, itemSelected: {} });
  };
  editModal = item => {
    this.setState({ visibleModal: true, mode: MODE.EDIT, itemSelected: item });
  };

  handleCancel = () => {
    this.setState({ visibleModal: false, mode: MODE.ADD, itemSelected: {} });
  };
  // Detail
  componentDidMount() {
    this.fetchUser();
  }
  fetchUser = async params => {
    const res = await getAllProducer(params);
    this.setState({ producerList: res.data });
  };
  changePagination = (page, pageSize) => {
    pageNo = page - 1;
    this.fetchUser({ page });
  };
  render() {
    const { visibleModal, itemSelected, mode, producerList } = this.state;
    const columns = [
      {
        title: 'STT',
        dataIndex: 'no',
        align: 'center',
        render: (text, record, index) => <span>{pageNo * 5 + index + 1}</span>,
        key: 'no'
      },
      {
        title: 'Producer Name',
        dataIndex: 'name',
        key: 'name',
        align: 'center'
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
        align: 'center'
      },
      {
        title: 'Phone Number',
        dataIndex: 'phone',
        key: 'phone',
        align: 'center'
      },

      {
        title: 'Action',
        dataIndex: 'action',
        render: (text, record) => (
          <div>
            <Tooltip title="Update">
              <Icon
                type="edit"
                style={{ marginRight: '5px' }}
                className="edit-icon"
                onClick={() => this.editModal(record)}
              />
            </Tooltip>
          </div>
        ),
        align: 'center',
        key: 'action'
      }
    ];
    return (
      <div style={{ paddingLeft: '20%' }} className="manage-fc-container">
        <div style={{ textAlign: 'center', padding: '30px' }}>
          <h2>List Producer</h2>
        </div>
        <div className="col-lg-12 header-page-container">
          <Button
            type="primary"
            className="create-btn"
            onClick={this.openModal}
          >
            <Icon type="plus" />
            Create Producer
          </Button>
        </div>
        <div className="card-body">
          <Table
            dataSource={producerList.data || []}
            columns={columns}
            bordered
            pagination={false}
          />
          {!isEmpty(producerList) && (
            <div className="pagination-container">
              <Pagination
                defaultCurrent={1}
                defaultPageSize={1}
                onChange={this.changePagination}
                total={producerList.data ? producerList.maxPage : 0}
              />
            </div>
          )}
        </div>
        {visibleModal && (
          <ManageProducerModal
            visible={visibleModal}
            itemSelected={itemSelected}
            mode={mode}
            cancelModal={this.handleCancel}
            fetchData={this.fetchUser}
          />
        )}
      </div>
    );
  }
}

export default ManageProducerPage;
