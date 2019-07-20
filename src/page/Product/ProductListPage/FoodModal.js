import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Form, Select, Input, message } from 'antd';
import { actionGetListFoodByCate } from '../productAction';
import {
  getCategoryFc,
  createFood,
  updateFood,
  getAllFoodOption
} from './CateFoodService';
import { isEmpty } from '../../../utils/helpers/helpers';
import { MODE } from '../../../utils/constants/constants';
import UploadFirebase from '../../../components/uploadFirebase/UploadFirebase';
class FoodModal extends Component {
  constructor(props) {
    super(props);
    const temp = [];
    const { item } = props.foodModal;
    if (!isEmpty(item.imageVMS)) {
      item.imageVMS.forEach(el =>
        temp.push({ url: el.image, uid: el.id, status: 'done' })
      );
    }
    this.state = {
      cateFCList: [],
      subCate: [],
      foodOptionList: [],
      subFoodOption: [],
      urlImage: props.foodModal.item.foodImage || '',
      fileList: [...temp]
    };
  }

  // async để call api, await hoạt động
  async componentDidMount() {
    const res = await getCategoryFc();
    const listFoodOption = await getAllFoodOption();
    this.setState({
      cateFCList: res.data,
      subCate: res.data.categoryVM || [],
      foodOptionList: listFoodOption.data,
      subFoodOption: listFoodOption.data.foodOptionVMS || []
    });
  }
  handleChangeUpload = (url, file) => {
    const temp = [...this.state.fileList];
    temp.push({ url: url, uid: file.uid, name: file.name, status: 'done' });
    this.setState({ fileList: temp });
  };

  handleRemove = file => {
    const temp = this.state.fileList.filter(item => item.uid !== file.uid);
    this.setState({ fileList: temp });
  };

  handleSubmit = e => {
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        try {
          const { foodModal } = this.props;
          const { fileList } = this.state;
          const temp = [];
          if (!isEmpty(fileList)) {
            fileList.forEach(el => temp.push({ image: el.url }));
          }
          if (foodModal.mode === MODE.ADD) {
            delete values.fcCategoryId;
            await createFood({
              ...values,
              imageVMS: temp,
              storeCategoryId: foodModal.parent.categoryId
            });
            message.success('create success');
          } else {
            await updateFood({
              ...foodModal.item,
              ...values,
              imageVMS: temp
            });
            message.success('update success');
          }
          this.props.cancelModal();
          this.props.fetchData();
          this.props.actionGetListFoodByCate(foodModal.parent.categoryId);
        } catch (err) {}
      }
    });
  };
  handleSelect = value => {
    const { cateFCList } = this.state;
    const temp = cateFCList.filter(item => item.fcCategoryId === value);
    this.setState({ subCate: !isEmpty(temp) ? temp[0].categoryVM : [] });
  };
  handleSelectFoodOption = value => {
    const { foodOptionList } = this.state;
    const temp = foodOptionList.filter(
      item => item.foodOptionParentId === value
    );
    this.setState({
      subFoodOption: !isEmpty(temp) ? temp[0].foodOptionVMS : []
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { foodModal } = this.props;
    const {
      cateFCList,
      subCate,
      urlImage,
      foodOptionList,
      subFoodOption,
      fileList
    } = this.state;
    console.log('abc', foodModal);
    const titleModal =
      foodModal.mode === MODE.ADD ? 'Tạo Mới Món Ăn' : 'Chỉnh Sửa Món Ăn';
    return (
      <Modal
        title={titleModal}
        centered
        width={960}
        visible={foodModal.visible}
        onOk={this.handleSubmit}
        onCancel={() => this.props.cancelModal()}
      >
        <Form>
          <div className="row">
            <div className="col-md-6">
              <span className="lab-text">Tên Món Ăn</span>
              <Form.Item>
                {getFieldDecorator('foodName', {
                  initialValue:
                    foodModal.mode === MODE.EDIT ? foodModal.item.foodName : '',
                  rules: [{ required: true, message: 'Nhập Tên Món Ăn!' }]
                })(<Input placeholder="Tên Món ăn" />)}
              </Form.Item>
            </div>
            <div className="col-md-6">
              <span className="lab-text">Mô Tả</span>
              <Form.Item>
                {getFieldDecorator('foodDescription', {
                  initialValue:
                    foodModal.mode === MODE.EDIT
                      ? foodModal.item.foodDescription
                      : '',
                  rules: [
                    {
                      required: true,
                      message: 'Nhập Mô Tả!'
                    }
                  ]
                })(<Input placeholder="Mô tả" />)}
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <span className="lab-text">Hình Ảnh</span>
              <div>
                <UploadFirebase
                  handleChangeUpload={this.handleChangeUpload}
                  handleRemove={this.handleRemove}
                  imageUrl={urlImage}
                  fileList={fileList}
                />
              </div>
            </div>
            <div className="col-md-6">
              <span className="lab-text">Đơn Vị Món Ăn</span>
              <Form.Item>
                {getFieldDecorator('foodUnit', {
                  initialValue:
                    foodModal.mode === MODE.EDIT ? foodModal.item.foodUnit : '',
                  rules: [{ required: true, message: 'Nhập Đơn Vị Món Ăn!' }]
                })(<Input placeholder="Đơn vị" />)}
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <span className="lab-text">Giá</span>
              <Form.Item>
                {getFieldDecorator('price', {
                  initialValue:
                    foodModal.mode === MODE.EDIT ? foodModal.item.price : '',
                  rules: [{ required: true, message: 'Nhập Giá!' }]
                })(<Input type="number" placeholder="VNĐ" />)}
              </Form.Item>
            </div>
            <div className="col-md-6">
              <span className="lab-text">Số Lượng</span>
              <Form.Item>
                {getFieldDecorator('quantity', {
                  initialValue:
                    foodModal.mode === MODE.EDIT ? foodModal.item.quantity : '',
                  rules: [{ required: true, message: 'Nhập Số Lượng' }]
                })(<Input type="number" placeholder="123" />)}
              </Form.Item>
            </div>
          </div>
          {foodModal.mode === MODE.ADD && (
            <div className="row">
              <div className="col-md-6">
                <span className="lab-text">Chọn Danh Mục Food Court</span>
                <Form.Item>
                  {getFieldDecorator('fcCategoryId', {
                    rules: [{ required: true, message: 'Chọn Danh Mục!' }]
                  })(
                    <Select
                      style={{ width: '100%' }}
                      onSelect={this.handleSelect}
                    >
                      {!isEmpty(cateFCList) &&
                        cateFCList.map(el => (
                          <Select.Option
                            value={el.fcCategoryId}
                            key={el.fcCategoryId}
                          >
                            {el.fcCategoryName}
                          </Select.Option>
                        ))}
                    </Select>
                  )}
                </Form.Item>
              </div>
              <div className="col-md-6">
                <span className="lab-text">Chọn Danh Mục Món Ăn</span>
                <Form.Item>
                  {getFieldDecorator('fcSubCategoryId', {
                    rules: [{ required: true, message: 'Nhập Danh Mục Nhỏ!' }]
                  })(
                    <Select style={{ width: '100%' }}>
                      {!isEmpty(subCate) &&
                        subCate.map(el => (
                          <Select.Option
                            value={el.categoryId}
                            key={el.categoryId}
                          >
                            {el.categoryName}
                          </Select.Option>
                        ))}
                    </Select>
                  )}
                </Form.Item>
              </div>
            </div>
          )}
          <div className="row">
            <div className="col-md-6">
              <span className="lab-text">Chọn Danh Mục Món Ăn Thêm</span>
              <Form.Item>
                {getFieldDecorator('foodOptionId', {
                  rules: [
                    { required: true, message: 'Chọn Danh Mục Món Ăn Thêm!' }
                  ]
                })(
                  <Select
                    style={{ width: '100%' }}
                    onSelect={this.handleSelectFoodOption}
                  >
                    {!isEmpty(foodOptionList) &&
                      foodOptionList.map(el => (
                        <Select.Option
                          value={el.foodOptionParentId}
                          key={el.foodOptionParentId}
                        >
                          {el.foodOptionNameParent}
                        </Select.Option>
                      ))}
                  </Select>
                )}
              </Form.Item>
            </div>
            <div className="col-md-6">
              <span className="lab-text">Chọn Món Ăn Thêm</span>
              <Form.Item>
                {getFieldDecorator('foId', {
                  rules: [{ required: true, message: 'Chọn Món Ăn Thêm!' }]
                })(
                  <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="--- Chọn Món Ăn Thêm ---"
                  >
                    {!isEmpty(subFoodOption) &&
                      subFoodOption.map(el => (
                        <Select.Option value={el.foId} key={el.foId}>
                          {el.foName}
                        </Select.Option>
                      ))}
                  </Select>
                )}
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <span className="lab-text">Giảm Giá %</span>
              <Form.Item>
                {getFieldDecorator('promotion', {
                  initialValue:
                    foodModal.mode === MODE.EDIT ? foodModal.item.promotion : ''
                })(<Input type="number" placeholder="Số % giảm giá" />)}
              </Form.Item>
            </div>
          </div>
        </Form>
      </Modal>
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
)(Form.create()(FoodModal));
