import React, { Component } from 'react';
import { Table } from 'antd';
import {isEmpty} from '../../utils/helpers/helpers';
import {getListFeedBack} from './FeedbackService';
class ViewFeedback extends Component {
  state={
    listFeedback: []
  }
  componentDidMount() {
   this.fecthFeedback()
  }
  fecthFeedback = async () => {
    try {
      const res = await getListFeedBack();
      this.setState({ listFeedback: res.data });
    } catch (err) {}
  };
  render() {
    const {listFeedback} = this.state;
    const columns = [
      {
        title: 'STT',
        dataIndex: 'no',
        align: 'center',
        render: (text, record, index) => <span>{index + 1}</span>,
        key: 'no'
      },
      {
        title: 'Ngày Feedback',
        dataIndex: 'fbDate',
        key: 'fbDate',
        align: 'center'
      },
      
      {
        title: 'Món Ăn',
        dataIndex: 'foodName',
        render: (text, record) => <span>{record.foodVM.foodName}</span>,
        key: 'foodName',
        align: 'center'
      },
      {
        title: 'Nội Dung Feedback',
        dataIndex: 'fbContent',
        key: 'fbContent',
        align: 'center'
      },
    ];
    return (
      <div style={{ paddingLeft: '20%' }}>
        <div style={{ textAlign: 'center', padding: '30px' }}>
          <h2>Feedback Khách Hàng</h2>
        </div>
         <Table
          style={{ marginRight: '10px' }}
          columns={columns}
          dataSource={!isEmpty(listFeedback) ? listFeedback : []}
          pagination={false}
          bordered
        />
      </div>
    );
  }
}
export default ViewFeedback;
