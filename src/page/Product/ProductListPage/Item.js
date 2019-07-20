import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Icon, Tooltip, Modal } from 'antd';
import { actionGetListFoodByCate } from '../productAction';
import { updateFood } from './CateFoodService';
import { isEmpty } from '../../../utils/helpers/helpers';

class Item extends Component {
  // async để call api, await hoạt động
  componentDidMount() {
    this.fetchData();
  }
  fetchData = async () => {
    this.props.actionGetListFoodByCate(this.props.categoryId);
  };
  openEdit = (e, record) => {
    this.props.editFoodModal(record);
    e.stopPropagation();
  };
  handelUpdate = item => {
    Modal.confirm({
      title: 'Ẩn Hiện Món Ăn?',
      content: (
        <span>
          Bạn có muốn thay đổi từ&nbsp;
          <span style={{ color: '#1890ff' }}>
            {item.active ? 'Hiện' : 'Ẩn'}
          </span>
          &nbsp; món ăn&nbsp; sang&nbsp;
          <span style={{ color: 'red' }}>{item.active ? 'Ẩn' : 'Hiện'}</span>
          món ăn?
        </span>
      ),
      onOk: async () => {
        try {
          await updateFood({ ...item, active: !item.active });
          this.fetchData();
        } catch (err) {}
      },
      onCancel() {}
    });
  };
  render() {
    const { foodList } = this.props;

    const columns = [
      {
        title: 'Tên món ăn',
        dataIndex: 'foodName',
        key: 'foodName',
        align: 'center'
      },

      {
        title: 'Ảnh',
        dataIndex: 'foodImage',
        render: (text, records) => (
          <b>
            {!isEmpty(records.imageVMS) &&
              records.imageVMS.map(item => (
                <div key={item.id}>
                  <img className="image" src={item.image} alt="" />
                </div>
              ))}
          </b>
        ),

        key: 'foodImage',
        align: 'center'
      },
      {
        title: 'Mô tả',
        dataIndex: 'foodDescription',
        key: 'foodDescription',
        align: 'center'
      },
      {
        title: 'Đơn vị',
        dataIndex: 'foodUnit',
        key: 'foodUnit',
        align: 'center'
      },
      {
        title: 'Giá',
        dataIndex: 'price',
        key: 'price',
        align: 'center'
      },
      {
        title: 'Số Lượng',
        dataIndex: 'quantity',
        key: 'quantity',
        align: 'center'
      },
      {
        title: 'Giảm Giá %',
        dataIndex: 'promotion',
        key: 'promotion',
        align: 'center'
      },
      {
        title: 'Trạng Thái',
        dataIndex: 'active',
        render: (text, record) => (
          <span>
            {record.active ? (
              <span style={{ color: '#1890ff' }}>Hiện</span>
            ) : (
              <span style={{ color: 'red' }}>Ẩn</span>
            )}
          </span>
        ),
        key: 'active',
        align: 'center'
      },
      {
        title: 'Action',
        dataIndex: 'action',
        render: (text, record) => (
          <div>
            <Tooltip title="Chỉnh Sửa Món Ăn">
              <Icon
                style={{ color: 'blue' }}
                type="edit"
                onClick={e => this.openEdit(e, record)}
              />
            </Tooltip>
            <Tooltip title="Ẩn Hiện Món Ăn">
              <Icon
                style={{ marginLeft: '10px', color: 'red' }}
                type="close"
                onClick={() => this.handelUpdate(record)}
              />
            </Tooltip>
          </div>
        ),
        key: 'action',
        align: 'center'
      }
    ];

    if (isEmpty(foodList)) return '';
    return (
      <Table
        dataSource={foodList}
        columns={columns}
        pagination={false}
        bordered
      />
    );
  }
}
export default connect(
  state => ({
    foodList: state.product.foodList
  }),
  {
    actionGetListFoodByCate
  }
)(Item);
