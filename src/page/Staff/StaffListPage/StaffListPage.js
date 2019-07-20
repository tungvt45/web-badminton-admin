import React, { Component } from 'react';
import {
  Button,
  Table,
  Input,
  Tooltip,
  Icon,
  Modal,
  Pagination,
  message
} from 'antd';
import StaffModal from './StaffModal';
import {
  getListUser,
  updateStatusUser,
  searchUser
} from './../../CreateFoodCourt/CreateFoodCourt/FoodCourtService';
import './Staff.scss';
import { isEmpty } from '../../../utils/helpers/helpers';
class StaffListPage extends Component {
  state = {
    visibleModal: false,
    userList: {},
    isErr: false
  };

  openModal = () => this.setState({ visibleModal: true });
  handleCancel = () => this.setState({ visibleModal: false });
  componentDidMount() {
    this.fetchUser();
  }
  fetchUser = async params => {
    const res = await getListUser(params);
    this.setState({ userList: res.data });
  };
  handelUpdate = item => {
    Modal.confirm({
      title: 'Cấp Quyền?',
      content: (
        <span>
          Bạn Muốn Thay Đổi Quyền Truy Cập Từ&nbsp;
          <span style={{ color: '#1890ff' }}>
            {item.active ? 'Cho Phép' : 'Không Cho Phép'}
          </span>
          &nbsp; to&nbsp;
          <span style={{ color: 'red' }}>
            {item.active ? 'Không Cho Phép' : 'Cho Phép'}
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
    try {
      if (isEmpty(value.trim())) {
        this.fetchUser();
      } else {
        const res = await searchUser({ name: value });
        this.setState({ userList: res.data });
      }
    } catch (err) {
      this.setState({ isErr: true });
      message.warning('No matched');
    }
  };
  changePagination = (page, pageSize) => {
    this.fetchUser({ page: page - 1 });
  };
  getRole = roleId => {
    if (roleId === 3) return 'Thu Ngân';
    if (roleId === 4) return 'Quản Lý Cửa Hàng';
    if (roleId === 5) return 'Đầu Bếp';
  };
  render() {
    const { visibleModal, userList } = this.state;
    const columns = [
      {
        title: 'STT',
        dataIndex: 'no',
        align: 'center',
        render: (text, record, index) => (
          <span>{userList.number * 5 + index + 1}</span>
        ),
        key: 'no'
      },
      {
        title: 'Username',
        dataIndex: 'username',
        key: 'username',
        align: 'center'
      },
      {
        title: 'Tên',
        dataIndex: 'fullname',
        key: 'fullname',
        align: 'center'
      },
      {
        title: 'Địa Chỉ',
        dataIndex: 'address',
        key: 'address',
        align: 'center'
      },
      {
        title: 'Ngày Sinh',
        dataIndex: 'birthday',
        render: text => <span>{new Date(text).toLocaleDateString()}</span>,
        key: 'birthday',
        align: 'center'
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
        key: 'email',
        align: 'center'
      },
      {
        title: 'Vai Trò',
        dataIndex: 'roleId',
        key: 'roleId',
        render: (text, record) => <span>{this.getRole(record.roleId)}</span>,
        align: 'center'
      },
      {
        title: 'Quyền Truy Cập',
        dataIndex: 'active',
        render: (text, record) => (
          <span>
            {record.active ? (
              <span style={{ color: '#1890ff' }}>Cho Phép Truy Cập</span>
            ) : (
              <span style={{ color: 'red' }}>Không Cho Phép Truy Cập</span>
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
          <Tooltip title="Chỉnh sửa quyền truy cập">
            <Icon
              type="edit"
              className="edit-icon"
              onClick={() => this.handelUpdate(record)}
            />
          </Tooltip>
        ),
        align: 'center',
        key: 'action'
      }
    ];
    return (
      <div style={{ paddingLeft: '20%' }}>
        <div style={{ textAlign: 'center', padding: '30px' }}>
          <h2>Danh Sách Nhân Viên</h2>
        </div>
        <div className="col-lg-12 header-page-container">
          <Button
            type="primary"
            className="create-btn"
            onClick={this.openModal}
          >
            <Icon type="plus" />
            Tạo Mới Nhân Viên
          </Button>

          <Input.Search
            placeholder="Search"
            onSearch={this.handleSearch}
            enterButton
          />
        </div>
        <div className="card-body">
          <Table
            dataSource={userList.content || []}
            columns={columns}
            bordered
            pagination={false}
          />
          {!isEmpty(userList) && (
            <div className="pagination-container">
              <Pagination
                defaultCurrent={1}
                defaultPageSize={5}
                onChange={this.changePagination}
                total={userList.content ? userList.totalElements : 0}
              />
            </div>
          )}
        </div>

        {visibleModal && (
          <StaffModal
            visible={visibleModal}
            cancelModal={this.handleCancel}
            fetchData={this.fetchUser}
          />
        )}
      </div>
    );
  }
}
export default StaffListPage;
