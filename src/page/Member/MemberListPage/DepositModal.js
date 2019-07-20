import React, { Component } from 'react';
import { Modal, Form, Input, message } from 'antd';
import { deposit } from './MemberService';
import md5 from 'md5';
class DepositModal extends Component {
  state = {
    isErr: false
  };
  handleSubmit = e => {
    let password = '';
    let temp = {};
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        try {
          const { itemSelected } = this.props;
          temp = { ...values, customerId: itemSelected.customerId };
          delete itemSelected.fullname;
        } catch (err) {}
      }
    });

    Modal.confirm({
      title: 'Nhập Password Xác Thực !',
      content: (
        <div>
          <p>Password</p>
          <Input onChange={e => (password = md5(e.target.value.trim()))} />
        </div>
      ),
      onOk: async () => {
        try {
          await deposit({ ...temp }, { password });
          message.success('Nộp tiền thành công!');
          this.props.cancelDepositModal();
        } catch (err) {
          this.setState({ isErr: true });
          message.error('Sai mật khẩu!');
        }
      },
      onCancel() {}
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { visible, itemSelected } = this.props;
    return (
      <Modal
        title="Nộp Tiền Cho Khách Hàng"
        centered
        visible={visible}
        onOk={this.handleSubmit}
        onCancel={() => this.props.cancelDepositModal()}
      >
        <Form>
          <div className="row">
            <div className="col-md-12">
              <span className="lab-text">Tên Khách Hàng</span>
              <Form.Item>
                {getFieldDecorator('fullname', {
                  initialValue: itemSelected.fullname
                })(<Input disabled />)}
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <span className="lab-text">Nhập Số Tiền</span>
              <Form.Item>
                {getFieldDecorator('tranTotal', {
                  rules: [{ required: true, message: 'Nhập Số Tiền' }]
                })(<Input placeholder="Tên Khách hàng" />)}
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <span className="lab-text">Mô Tả Giao Dịch</span>
              <Form.Item>
                {getFieldDecorator('tranDescription', {
                  rules: [{ required: true, message: 'Nhập Mô Tả Giao Dịch' }]
                })(<Input placeholder="Tên Khách hàng" />)}
              </Form.Item>
            </div>
          </div>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(DepositModal);
