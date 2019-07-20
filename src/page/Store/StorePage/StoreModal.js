import React, { Component } from 'react';
import { Modal, Form, Input, message, Radio } from 'antd';
import { createStore, updateStore } from './StoreService';
import { MODE } from '../../../utils/constants/constants';
import UploadImageStore from '../../../components/uploadFirebase/UploadImageStore';

class StoreModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urlImage: props.itemSelected.storeImage || '',
      isErr: false
    };
  }
  handleChangeUpload = url => {
    this.setState({ urlImage: url });
  };

  async componentDidMount() {}
  handleSubmit = e => {
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const { mode, itemSelected } = this.props;
        try {
          const { urlImage } = this.state;
          if (mode === MODE.ADD) {
            await createStore({ ...values, storeImage: urlImage });
            message.success('Tạo Mới Cửa Hàng Thành Công!');
          } else {
            await updateStore({
              ...itemSelected,
              ...values,
              storeImage: urlImage
            });
            message.success('Chỉnh Sửa Cửa Hàng Thành Công!');
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
    const { isErr, urlImage } = this.state;
    const { getFieldDecorator } = this.props.form;
    const { visible, mode, itemSelected } = this.props;
    const titleModal =
      mode === MODE.ADD ? 'Tạo Mới Cửa Hàng' : 'Chỉnh Sửa Cửa Hàng';

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
              <span className="lab-text">Tên Cửa Hàng</span>
              <Form.Item>
                {getFieldDecorator('storeName', {
                  initialValue:
                    mode === MODE.EDIT ? itemSelected.storeName : '',
                  rules: [{ required: true, message: 'Nhập từ 1 - 100 kí tự!' }]
                })(<Input placeholder="Tên Cửa Hàng" maxLength={100} />)}
              </Form.Item>
            </div>
            <div className="col-md-6">
              <span className="lab-text">Mô tả</span>
              <Form.Item>
                {getFieldDecorator('storeDescription', {
                  initialValue:
                    mode === MODE.EDIT ? itemSelected.storeDescription : '',
                  rules: [{ required: true, message: 'Nhập từ 1 - 100 kí tự!' }]
                })(<Input placeholder="Mô tả" maxLength={100} />)}
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <span className="lab-text">Hình Ảnh</span>
              <div>
                <UploadImageStore
                  handleChangeUpload={this.handleChangeUpload}
                  imageUrl={urlImage}
                />
              </div>
            </div>
          </div>
          {mode === MODE.EDIT && (
            <div className="row">
              <div className="col-md-6">
                <span className="lab-text">Trạng Thái</span>
                <Form.Item>
                  {getFieldDecorator('active', {
                    initialValue: itemSelected.active
                  })(
                    <Radio.Group>
                      <Radio value={true}>Active</Radio>
                      <Radio value={false}>Inactive</Radio>
                    </Radio.Group>
                  )}
                </Form.Item>
              </div>
            </div>
          )}
          {isErr && (
            <p style={{ color: 'red', textAlign: 'center' }}>
              Tên cửa hàng đã tồn tại!
            </p>
          )}
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(StoreModal);
