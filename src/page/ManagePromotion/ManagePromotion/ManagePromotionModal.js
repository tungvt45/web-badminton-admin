import React, { Component } from 'react';
import { Modal, Form, Input, message } from 'antd';
import { createPromotion, updatePromotion } from './PromotionService';
import { MODE } from '../../../utils/constants/constants';
import { isEmpty } from '../../../utils/helpers/helpers';
class ManagePromotionModal extends Component {
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
            await createPromotion({ ...values });
            message.success('Create success!');
          } else {
            await updatePromotion({ ...itemSelected, ...values });
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
      mode === MODE.ADD ? 'Create Promotion' : 'Update Promotion';
    return (
      <Modal
        title={titleModal}
        centered
        visible={visible}
        onOk={this.handleSubmit}
        onCancel={() => this.props.cancelModal()}
      >
        <Form>
          {/* <div className="row">
            <div className="col-md-12">
              <span className="lab-text">Type</span>
              <Form.Item>
                {getFieldDecorator('type', {
                  initialValue: mode === MODE.EDIT ? itemSelected.type : '',
                  rules: [{ required: true, message: 'Nhập từ 1-100 kí tự!' }]
                })(<Input placeholder="Mô tả" maxLength={100} />)}
              </Form.Item>
            </div>
          </div> */}
          <div className="row">
            <div className="col-md-12">
              <span className="lab-text">Amount</span>
              <Form.Item>
                {getFieldDecorator('discount', {
                  initialValue: mode === MODE.EDIT ? itemSelected.discount : '',
                  rules: [{ required: true, message: 'Nhập từ 1-100 kí tự!' }]
                })(<Input placeholder="Số tiền" type="number" />)}
              </Form.Item>
            </div>
          </div>
          {isErr && (
            <p style={{ color: 'red', textAlign: 'center' }}>
              Promotion is exit !
            </p>
          )}
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(ManagePromotionModal);
