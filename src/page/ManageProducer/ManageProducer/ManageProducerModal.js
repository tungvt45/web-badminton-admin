import React, { Component } from 'react';
import { Modal, Form, Input, message } from 'antd';
import { createProducer, updateProducer } from './ProducerService';
import { MODE } from '../../../utils/constants/constants';
import { isEmpty } from '../../../utils/helpers/helpers';
class ManageProducerModal extends Component {
  state = {
    isErr: false
  };
  handleSubmit = e => {
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const { mode, itemSelected } = this.props;
        const { fileList } = this.state;
        const temp = [];
        if (!isEmpty(fileList)) {
          fileList.forEach(el => temp.push({ url: el.url }));
        }
        try {
          if (mode === MODE.ADD) {
            await createProducer({ ...values });
            message.success('Create success!');
          } else {
            await updateProducer({ ...itemSelected, ...values });
            message.success('Update success!');
          }
          this.props.cancelModal();
          this.props.fetchData();
        } catch (err) {
          this.setState({ isErr: true });
        }
      }
    });
  };
  render() {
    const { isErr } = this.state;
    const { getFieldDecorator } = this.props.form;
    const { visible, mode, itemSelected } = this.props;
    const titleModal =
      mode === MODE.ADD ? 'Create Producer' : 'Update Producer';
    return (
      <Modal
        title={titleModal}
        centered
        visible={visible}
        onOk={this.handleSubmit}
        onCancel={() => this.props.cancelModal()}
      >
        <Form>
          <div className="row">
            <div className="col-md-12">
              <span className="lab-text">Producer Name</span>
              <Form.Item>
                {getFieldDecorator('name', {
                  initialValue: mode === MODE.EDIT ? itemSelected.name : '',
                  rules: [{ required: true, message: 'Nhập từ 1-100 kí tự!' }]
                })(<Input placeholder="Producer Name" maxLength={100} />)}
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <span className="lab-text">Address</span>
              <Form.Item>
                {getFieldDecorator('address', {
                  initialValue: mode === MODE.EDIT ? itemSelected.address : '',
                  rules: [{ required: true, message: 'Nhập từ 1-100 kí tự!' }]
                })(<Input placeholder="Address" maxLength={100} />)}
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <span className="lab-text">Phone Number</span>
              <Form.Item>
                {getFieldDecorator('phone', {
                  initialValue: mode === MODE.EDIT ? itemSelected.phone : '',
                  rules: [{ required: true, message: 'Nhập từ 1-100 kí tự!' }]
                })(<Input placeholder="Số Điện Thoại" type="number" />)}
              </Form.Item>
            </div>
          </div>
          {isErr && (
            <p style={{ color: 'red', textAlign: 'center' }}>
              Producer is exit !
            </p>
          )}
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(ManageProducerModal);
