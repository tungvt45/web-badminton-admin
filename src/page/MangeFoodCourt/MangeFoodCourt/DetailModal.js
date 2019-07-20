import React, { Component } from 'react';
import { Modal, Form, Input } from 'antd';
import { MODE } from '../../../utils/constants/constants';
class ManageFCModal extends Component {
  async componentDidMount() {}

  handleSubmit = e => {
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        this.props.cancelModal();
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { visible, mode, itemSelected } = this.props;
    const titleModal = mode === MODE.ADD ? '' : 'Product details';
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
            <div className="col-md-6">
              <span className="lab-text">Description</span>
              <Form.Item>
                {getFieldDecorator('description', {
                  initialValue:
                    mode === MODE.EDIT ? itemSelected.description : ''
                })(<Input disabled />)}
              </Form.Item>
            </div>
            <div className="col-md-6">
              <span className="lab-text">Flex</span>
              <Form.Item>
                {getFieldDecorator('flex', {
                  initialValue: mode === MODE.EDIT ? itemSelected.flex : ''
                })(<Input disabled />)}
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <span className="lab-text">Weight</span>
              <Form.Item>
                {getFieldDecorator('weight', {
                  initialValue: mode === MODE.EDIT ? itemSelected.weight : ''
                })(<Input disabled />)}
              </Form.Item>
            </div>
            <div className="col-md-6">
              <span className="lab-text">Shaft</span>
              <Form.Item>
                {getFieldDecorator('shaft', {
                  initialValue: mode === MODE.EDIT ? itemSelected.shaft : ''
                })(<Input disabled />)}
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <span className="lab-text">Color</span>
              <Form.Item>
                {getFieldDecorator('color', {
                  initialValue: mode === MODE.EDIT ? itemSelected.color : ''
                })(<Input disabled />)}
              </Form.Item>
            </div>
            <div className="col-md-6">
              <span className="lab-text">Producer</span>
              <Form.Item>
                {getFieldDecorator('producer', {
                  initialValue:
                    mode === MODE.EDIT && itemSelected.producer
                      ? itemSelected.producer.id
                      : ''
                })(<Input disabled />)}
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <span className="lab-text">Promotion</span>
              <Form.Item>
                {getFieldDecorator('promotion', {
                  initialValue:
                    mode === MODE.EDIT && itemSelected.promotion
                      ? itemSelected.promotion.id
                      : ''
                })(<Input disabled />)}
              </Form.Item>
            </div>
          </div>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(ManageFCModal);
