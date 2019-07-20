import React, { Component } from 'react';
import { Button, Table, Tooltip, Icon, Pagination } from 'antd';
import { getAllPromotion } from './PromotionService';
import { isEmpty } from './../../../utils/helpers/helpers';
import './Promotion.scss';
import { MODE } from './../../../utils/constants/constants';
import ManagePromotionModal from './ManagePromotionModal';
let pageNo = 0;
class ManagePromotionPage extends Component {
  state = {
    visibleModal: false,
    visibleDetailModal: false,
    mode: MODE.ADD,
    itemSelected: {},
    promotionList: []
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
    const res = await getAllPromotion(params);
    this.setState({ promotionList: res.data });
  };
  changePagination = (page, pageSize) => {
    pageNo = page - 1;
    this.fetchUser({ page });
  };
  render() {
    const { visibleModal, itemSelected, mode, promotionList } = this.state;
    const columns = [
      {
        title: 'STT',
        dataIndex: 'no',
        align: 'center',
        render: (text, record, index) => <span>{pageNo * 5 + index + 1}</span>,
        key: 'no'
      },
      {
        title: 'Amount',
        dataIndex: 'discount',
        key: 'discount',
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
          <h2>Management Promotion</h2>
        </div>
        <div className="col-lg-12 header-page-container">
          <Button
            type="primary"
            className="create-btn"
            onClick={this.openModal}
          >
            <Icon type="plus" />
            Create Promotion
          </Button>
        </div>
        <div className="card-body">
          <Table
            dataSource={promotionList.data || []}
            columns={columns}
            bordered
            pagination={false}
          />
          {!isEmpty(promotionList) && (
            <div className="pagination-container">
              <Pagination
                defaultCurrent={1}
                defaultPageSize={1}
                onChange={this.changePagination}
                total={promotionList.data ? promotionList.maxPage : 0}
              />
            </div>
          )}
        </div>
        {visibleModal && (
          <ManagePromotionModal
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

export default ManagePromotionPage;
