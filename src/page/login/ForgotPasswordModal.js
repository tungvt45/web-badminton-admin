import React, { Component } from 'react';
import { Modal, Form, Input, message } from 'antd';
import { ForgotPassword } from './LoginService';
class ForgotPasswordModal extends Component {
  handleSubmit = e => {
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        await ForgotPassword(values);
        message.success('Please Check Mail !!!');
        this.props.cancelModal();
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { visible } = this.props;
    return (
      <Modal
        title="Forgot Password"
        centered
        visible={visible}
        onOk={this.handleSubmit}
        onCancel={() => this.props.cancelModal()}
      >
        <Form>
          <div className="row">
            <div className="col-md-12">
              <span className="lab-text">Username</span>
              <Form.Item>
                {getFieldDecorator('username', {
                  rules: [{ required: true, message: 'Nhập Username!' }]
                })(<Input placeholder="username" />)}
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <span className="lab-text">Email</span>
              <Form.Item>
                {getFieldDecorator('email', {
                  rules: [{ required: true, message: 'Nhập Email!' }]
                })(<Input placeholder="email" />)}
              </Form.Item>
            </div>
          </div>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(ForgotPasswordModal);
