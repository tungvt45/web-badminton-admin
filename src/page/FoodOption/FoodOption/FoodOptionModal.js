import React, { Component } from 'react';
import { Modal, Form, Input, message } from 'antd';
import { createFoodOption, updateFoodOption } from './FoodOptionService';
import { MODE } from '../../../utils/constants/constants';

class FoodOptionModal extends Component {
  state = {
    isErr: false
  };
  handleSubmit = e => {
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        try {
          const { parent, mode, item } = this.props.subFoodOptionModal;
          console.log('foId', parent.foParentId);
          if (mode === MODE.ADD) {
            // implemenet add function
            await createFoodOption({
              ...values,
              foodOptionParent: parent.foId
            });
            message.success('Tạo Mới Thành Công!');
          } else {
            await updateFoodOption({
              ...values,
              foodOptionParent: parent.foId
            });
            message.success('Chỉnh Sửa Thành Công!');
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
    const { subFoodOptionModal } = this.props;
    console.log('sub cate', subFoodOptionModal);
    const titleModal =
      subFoodOptionModal.mode === MODE.ADD
        ? 'Tạo Mới Danh Mục Món Ăn'
        : 'Chỉnh Sửa Danh Mục Món Ăn';
    return (
      <Modal
        title={titleModal}
        centered
        visible={subFoodOptionModal.visible}
        onOk={this.handleSubmit}
        onCancel={() => this.props.cancelModal()}
      >
        <Form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col-md-12">
              <span className="lab-text">Danh Mục Món Ăn Thêm</span>
              <Form.Item>
                {getFieldDecorator('foodOptionNameParent', {
                  initialValue: subFoodOptionModal.parent.foodOptionNameParent
                })(<Input disabled />)}
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <span className="lab-text">Món Ăn Thêm</span>
              <Form.Item>
                {getFieldDecorator('foName', {
                  initialValue: subFoodOptionModal.item.foName,
                  rules: [
                    {
                      required: true,
                      message: 'Nhập từ 1 - 100 kí tự!'
                    }
                  ]
                })(<Input placeholder="Danh Mục Món Ăn" maxLength={100} />)}
              </Form.Item>
            </div>
            <div className="col-md-12">
              <span className="lab-text">Giá</span>
              <Form.Item>
                {getFieldDecorator('optionPrice', {
                  initialValue: subFoodOptionModal.item.optionPrice,
                  rules: [
                    {
                      required: true,
                      message: 'Nhập từ 1 - 100 kí tự!'
                    }
                  ]
                })(<Input placeholder="Danh Mục Món Ăn" maxLength={100} />)}
              </Form.Item>
            </div>
          </div>

          {isErr && (
            <p style={{ color: 'red', textAlign: 'center' }}>
              Danh mục món ăn đã tồn tại!
            </p>
          )}
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(FoodOptionModal);
