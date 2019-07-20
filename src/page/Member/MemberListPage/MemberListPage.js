import React, { Component } from 'react';
import { Button, Table, Input, Tooltip, Icon, Modal, Pagination } from 'antd';
import MemberModal from './MemberModal';
import DepositModal from './DepositModal';
import { getListMember, updateStatusUser, searchUser } from './MemberService';
import './Member.scss';
import { isEmpty } from '../../../utils/helpers/helpers';
class MemberListPage extends Component {
  state = {
    visibleModal: false,
    visibleDepositMember: false,
    itemSelected: {},
    memberList: {}
  };
  // Create Member
  openModal = () => this.setState({ visibleModal: true });
  handleCancel = () => this.setState({ visibleModal: false });
  // Deposit
  callDepositModal = item => {
    this.setState({ visibleDepositMember: true, itemSelected: item });
  };
  handleCancelDepositModal = () => {
    this.setState({ visibleDepositMember: false, itemSelected: {} });
  };

  componentDidMount() {
    this.fetchUser();
  }
  fetchUser = async params => {
    const res = await getListMember(params);
    this.setState({ memberList: res.data });
    console.log('memberList', res.data);
  };
  handleUpdate = item => {
    Modal.confirm({
      title: 'Change Status ?',
      content: (
        <span>
          Do you want change status from&nbsp;
          <span style={{ color: '#1890ff' }}>
            {item.active ? 'active' : 'inactive'}
          </span>
          &nbsp; to&nbsp;
          <span style={{ color: 'red' }}>
            {item.active ? 'inactive' : 'active'}
          </span>
          ?
        </span>
      ),
      onOk: async () => {
        try {
          await updateStatusUser({ ...item, active: !item.active });
          this.fetchUser();
        } catch (err) {}
      },
      onCancel() {}
    });
  };
  handleSearch = async value => {
    if (isEmpty(value.trim())) {
      this.fetchUser();
    } else {
      const res = await searchUser({ name: value });
      this.setState({ memberList: res.data });
    }
  };
  changePagination = (page, pageSize) => {
    this.fetchUser({ page: page - 1 });
  };
  render() {
    const {
      visibleModal,
      memberList,
      visibleDepositMember,
      itemSelected
    } = this.state;
    const columns = [
      {
        title: 'STT',
        dataIndex: 'no',
        align: 'center',
        render: (text, record, index) => (
          <span>{memberList.number * 5 + index + 1}</span>
        ),
        key: 'no'
      },
      {
        title: 'Username',
        dataIndex: 'username',
        key: 'username'
      },
      {
        title: 'Tên',
        dataIndex: 'fullname',
        key: 'fullname'
      },
      {
        title: 'Địa Chỉ',
        dataIndex: 'address',
        key: 'address'
      },
      {
        title: 'Ngày Sinh',
        dataIndex: 'birthday',
        render: (text, record) => (
          <span>{new Date(record.birthday).toLocaleDateString()}</span>
        ),
        key: 'birthday'
      },
      {
        title: 'Số Điện Thoại',
        dataIndex: 'phone',
        key: 'phone',
        align: 'center'
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email'
      },

      {
        title: 'Status',
        dataIndex: 'active',
        render: (text, record) => (
          <span>
            {record.active ? (
              <span style={{ color: '#1890ff' }}>active</span>
            ) : (
              <span style={{ color: 'red' }}>inative</span>
            )}
          </span>
        ),
        align: 'center',
        key: 'active'
      },
      {
        title: 'Hành Động',
        dataIndex: 'action',
        render: (text, record) => (
          <div>
            <Tooltip title="Chỉnh Sửa">
              <Icon
                type="edit"
                className="edit-icon"
                onClick={() => this.handleUpdate(record)}
              />
            </Tooltip>
            &nbsp;
            {/* {!isEmpty(memberList) &&
              memberList.content.map(el => ( */}
            <Tooltip title="Nộp Tiền">
              <Icon
                type="dollar"
                className="deposit-icon"
                onClick={e => {
                  this.callDepositModal(record);
                }}
              />
            </Tooltip>
            {/* ))} */}
          </div>
        ),
        align: 'center',
        key: 'action'
      }
    ];
    return (
      <div style={{ paddingLeft: '20%' }}>
        <div style={{ textAlign: 'center', padding: '30px' }}>
          <h2>Danh Sách Thành Viên</h2>
        </div>
        <div className="col-lg-12 header-page-container">
          <Button
            type="primary"
            className="create-btn"
            onClick={this.openModal}
          >
            Tạo Mới Thành Viên
          </Button>
          <Input.Search
            placeholder="Search"
            onSearch={this.handleSearch}
            enterButton
          />
        </div>
        <div className="card-body">
          <Table
            dataSource={memberList.content || []}
            columns={columns}
            bordered
            pagination={false}
          />
          {!isEmpty(memberList) && (
            <div className="pagination-container">
              <Pagination
                defaultCurrent={1}
                defaultPageSize={5}
                onChange={this.changePagination}
                total={memberList.content ? memberList.totalElements : 0}
              />
            </div>
          )}
        </div>

        {visibleModal && (
          <MemberModal
            visible={visibleModal}
            cancelModal={this.handleCancel}
            fetchData={this.fetchUser}
          />
        )}
        {visibleDepositMember && (
          <DepositModal
            visible={visibleDepositMember}
            itemSelected={itemSelected}
            cancelDepositModal={this.handleCancelDepositModal}
          />
        )}
      </div>
    );
  }
}
export default MemberListPage;
