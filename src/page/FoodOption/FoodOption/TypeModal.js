import React, { Component } from 'react';
import { Modal, Form, Input, message } from 'antd';
import { createFoodOption, updateFoodOption } from './FoodOptionService';
import { MODE } from '../../../utils/constants/constants';

class TypeModal extends Component {
  state = {
    isErr: false
  };
  handleSubmit = e => {
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        try {
          const { typeModal } = this.props;
          if (typeModal.mode === MODE.ADD) {
            await createFoodOption({ ...values, active: true });
            message.success('Tạo mới thành công');
          } else {
            console.log('edit', { ...typeModal.item, ...values }, values);
            // await updateCategoryFc({ ...categoryModal.item, ...values });
            await updateFoodOption({
              ...values
            });
            message.success('Chỉnh sửa thành công');
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
    const { typeModal } = this.props;
    const titleModal =
      typeModal.mode === MODE.ADD
        ? 'Tạo Mới Danh Mục Món Ăn Thêm'
        : 'Chỉnh Sửa Danh Mục Món Ăn Thêm';
    return (
      <Modal
        title={titleModal}
        centered
        visible={typeModal.visible}
        onOk={this.handleSubmit}
        onCancel={() => this.props.cancelModal()}
      >
        <Form>
          <div className="row">
            <div className="col-md-12">
              <span className="lab-text">Danh Mục Món Ăn Thêm</span>
              <Form.Item>
                {getFieldDecorator('foName', {
                  initialValue:
                    typeModal.mode === MODE.EDIT
                      ? typeModal.item.foodOptionNameParent
                      : '',
                  rules: [
                    {
                      required: true,
                      message: 'Nhập từ 1 - 100 kí tự!'
                    }
                  ]
                })(<Input placeholder="Tên danh mục" maxLength={100} />)}
              </Form.Item>
            </div>
          </div>

          {isErr && (
            <p style={{ color: 'red', textAlign: 'center' }}>
              Tên danh mục đã tồn tại!
            </p>
          )}
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(TypeModal);
