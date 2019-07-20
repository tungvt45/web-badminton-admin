import React, { Component } from 'react';
import { Table, Tooltip, Icon, Modal } from 'antd';
import FoodCourtModal from './FoodCourtModal';
import { getListUser, updateStatusUser } from './FoodCourtService';
import './FoodCourt.scss';
import { isEmpty } from '../../../utils/helpers/helpers';

class CreateFoodCourt extends Component {
  state = {
    visibleModal: false,
    userList: []
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
  handleUpdate = item => {
    Modal.confirm({
      title: 'Cấp Quyền?',
      content: (
        <span>
          Do you want change status to&nbsp;
          <span style={{ color: '#1890ff' }}>
            {item.active ? 'Active' : 'Inactive'}
          </span>
          &nbsp; to&nbsp;
          <span style={{ color: 'red' }}>
            {item.active ? 'Inactive' : 'Active'}
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
  render() {
    const { visibleModal, userList } = this.state;
    const columns = [
      {
        title: 'STT',
        dataIndex: 'no',
        align: 'center',
        render: (text, record, index) => <span>{index + 1}</span>,
        key: 'no'
      },
      {
        title: 'Name',
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
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        align: 'center'
      },
      {
        title: 'Role',
        dataIndex: 'role',
        key: 'role',
        align: 'center'
      },
      {
        title: 'Status',
        dataIndex: 'active',
        render: (text, record) => (
          <span>
            {record.active ? (
              <span style={{ color: '#1890ff' }}>Active</span>
            ) : (
              <span style={{ color: 'red' }}>Inactive</span>
            )}
          </span>
        ),
        align: 'center',
        key: 'active'
      },
      {
        title: 'Action',
        dataIndex: 'action',
        render: (text, record) => (
          <span>
            {record.active ? (
              <Tooltip title="Update">
                <Icon
                  type="unlock"
                  className="edit-icon"
                  onClick={() => this.handleUpdate(record)}
                />
              </Tooltip>
            ) : (
              <Tooltip title="Update">
                <Icon
                  type="lock"
                  className="edit-icon"
                  onClick={() => this.handleUpdate(record)}
                />
              </Tooltip>
            )}
          </span>
        ),
        align: 'center',
        key: 'action'
      }
    ];
    return (
      <div style={{ paddingLeft: '20%' }}>
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h2>List Customer</h2>
        </div>
        <div className="col-lg-12 header-page-container" />
        <div className="card-body">
          <Table
            dataSource={!isEmpty(userList) ? userList : []}
            columns={columns}
            bordered
            pagination={false}
          />
        </div>
        {visibleModal && (
          <FoodCourtModal
            visible={visibleModal}
            cancelModal={this.handleCancel}
            fetchData={this.fetchUser}
          />
        )}
      </div>
    );
  }
}
export default CreateFoodCourt;
