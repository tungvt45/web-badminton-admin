import React, { Component } from 'react';
import { Button, Table, Tooltip, Icon, Pagination } from 'antd';
import ManageFCModal from './ManageFCModal';
import DetailModal from './DetailModal';
import { getAllProduct } from './ManageFCService';
import { isEmpty } from './../../../utils/helpers/helpers';
import './ManageFC.scss';
import { MODE } from './../../../utils/constants/constants';
let pageNo = 0;
class ManageFCPage extends Component {
  state = {
    visibleModal: false,
    visibleDetailModal: false,
    mode: MODE.ADD,
    itemSelected: {},
    productList: []
  };
  // Create Update
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

  detailModal = item => {
    this.setState({
      visibleDetailModal: true,
      mode: MODE.EDIT,
      itemSelected: item
    });
  };

  handleCancelDetailModal = () => {
    this.setState({
      visibleDetailModal: false,
      mode: MODE.ADD,
      itemSelected: {}
    });
  };
  componentDidMount() {
    this.fetchUser();
  }
  fetchUser = async params => {
    const res = await getAllProduct(params);
    this.setState({ productList: res.data });
  };
  changePagination = (page, pageSize) => {
    pageNo = page - 1;
    this.fetchUser({ page });
  };
  render() {
    const {
      visibleModal,
      itemSelected,
      mode,
      productList,
      visibleDetailModal
    } = this.state;
    const columns = [
      {
        title: 'STT',
        dataIndex: 'no',
        align: 'center',
        render: (text, record, index) => <span>{pageNo * 5 + index + 1}</span>,
        key: 'no'
      },
      {
        title: 'Product Name',
        dataIndex: 'name',
        key: 'name',
        align: 'center'
      },
      {
        title: 'Image',
        dataIndex: 'url',
        render: (text, records) => (
          <b>
            {!isEmpty(records.image) && (
              <div>
                <img className="image" src={records.image[0].url} alt="" />
              </div>
            )}
          </b>
        ),

        key: 'foodImage',
        align: 'center'
      },
      {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        align: 'center'
      },
     
      {
        title: 'Action',
        dataIndex: 'action',
        render: (text, record) => (
          <div>
            <Tooltip title="Detail">
              <Icon
                type="info"
                style={{ marginRight: '5px' }}
                className="edit-icon"
                onClick={() => this.detailModal(record)}
              />
            </Tooltip>
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
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h2>Management Product</h2>
        </div>
        <div className="col-lg-12 header-page-container">
          <Button
            type="primary"
            className="create-btn"
            onClick={this.openModal}
          >
            <Icon type="plus" />
            Create Product
          </Button>
        </div>
        <div className="card-body">
          <Table
            dataSource={productList.data || []}
            columns={columns}
            bordered
            pagination={false}
          />
          {!isEmpty(productList) && (
            <div className="pagination-container">
              <Pagination
                defaultCurrent={1}
                defaultPageSize={1}
                onChange={this.changePagination}
                total={productList.data ? productList.maxPage : 0}
              />
            </div>
          )}
        </div>
        {visibleModal && (
          <ManageFCModal
            visible={visibleModal}
            itemSelected={itemSelected}
            mode={mode}
            cancelModal={this.handleCancel}
            fetchData={this.fetchUser}
          />
        )}
        {visibleDetailModal && (
          <DetailModal
            visible={visibleDetailModal}
            itemSelected={itemSelected}
            mode={mode}
            cancelModal={this.handleCancelDetailModal}
            fetchData={this.fetchUser}
          />
        )}
      </div>
    );
  }
}

export default ManageFCPage;
