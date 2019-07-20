import React, { Component } from "react";
import { Modal, Form, Input, message, Select } from "antd";
import {
  getAllProducer,
  getAllPromotion,
  createProduct,
  updateProduct
} from "./ManageFCService";
import { MODE } from "../../../utils/constants/constants";
import { isEmpty } from "../../../utils/helpers/helpers";

import UploadFirebase from "../../../components/uploadFirebase/UploadFirebase";
class ManageFCModal extends Component {
  constructor(props) {
    super(props);
    const temp = [];
    const { itemSelected } = this.props;
    // {
    //   !isEmpty(itemSelected.image) &&
    //     itemSelected.image.map(item => console.log('image', item.url));
    // }
    console.log(itemSelected.image);
    if (!isEmpty(itemSelected.image)) {
      itemSelected.image.forEach(el =>
        temp.push({ url: el.url, uid: el.id, status: "done" })
      );
    }
    this.state = {
      urlImage: "",
      fileList: [...temp],
      isErr: false,
      promotionList: [],
      producerList: []
    };
  }
  async componentDidMount() {
    const promotion = await getAllPromotion();
    const producer = await getAllProducer();
    this.setState({
      promotionList: promotion.data,
      producerList: producer.data
    });

    console.log("producer", producer.data);
  }

  handleChangeUpload = (url, file) => {
    const temp = [...this.state.fileList];
    temp.push({ url: url, uid: file.uid, name: file.name, status: "done" });
    this.setState({ fileList: temp });
  };
  handleRemove = file => {
    const temp = this.state.fileList.filter(item => item.uid !== file.uid);
    this.setState({ fileList: temp });
  };
  handleSubmit = e => {
    this.props.form.validateFields(async (err, values) => {
      console.log("value", values);
      if (!err) {
        const { mode, itemSelected } = this.props;
        const { fileList } = this.state;
        const temp = [];
        if (!isEmpty(fileList)) {
          fileList.forEach(el => temp.push({ url: el.url }));
        }
        console.log("id", itemSelected.id);
        try {
          if (mode === MODE.ADD) {
            await createProduct({ ...values, image: temp });
            message.success("Create success!");
          } else {
            console.log(itemSelected, values, temp);
            await updateProduct({ ...itemSelected, ...values, image: temp });
            message.success("Update success!");
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
    const {
      isErr,
      urlImage,
      fileList,
      producerList,
      promotionList
    } = this.state;
    console.log("promotionList", promotionList);
    console.log("producerList", itemSelected);
    const { getFieldDecorator } = this.props.form;
    const { visible, mode, itemSelected } = this.props;
    const titleModal = mode === MODE.ADD ? "Create Product" : "Update Product";
    return (
      <Modal
        title={titleModal}
        centered
        visible={visible}
        width={960}
        onOk={this.handleSubmit}
        onCancel={() => this.props.cancelModal()}
      >
        <Form>
          <div className="row">
            <div className="col-md-12">
              <span className="lab-text">Product Name</span>
              <Form.Item>
                {getFieldDecorator("name", {
                  initialValue: mode === MODE.EDIT ? itemSelected.name : "",
                  rules: [{ required: true, message: "Nhập từ 1-100 kí tự!" }]
                })(<Input placeholder="name" maxLength={100} />)}
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <span className="lab-text">Description</span>
              <Form.Item>
                {getFieldDecorator("description", {
                  initialValue:
                    mode === MODE.EDIT ? itemSelected.description : "",
                  rules: [{ required: true, message: "Nhập từ 1-100 kí tự!" }]
                })(<Input placeholder="description" maxLength={100} />)}
              </Form.Item>
            </div>
            <div className="col-md-6">
              <span className="lab-text">Amount</span>
              <Form.Item>
                {getFieldDecorator("price", {
                  initialValue: mode === MODE.EDIT ? itemSelected.price : "",
                  rules: [{ required: true, message: "Nhập từ 1-100 kí tự!" }]
                })(<Input placeholder="Số tiền" type="number" />)}
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <span className="lab-text">Flex</span>
              <Form.Item>
                {getFieldDecorator("flex", {
                  initialValue: mode === MODE.EDIT ? itemSelected.flex : "",
                  rules: [{ required: true, message: "Nhập từ 1-100 kí tự!" }]
                })(<Input placeholder="flex" maxLength={100} />)}
              </Form.Item>
            </div>
            <div className="col-md-6">
              <span className="lab-text">Shaft</span>
              <Form.Item>
                {getFieldDecorator("shaft", {
                  initialValue: mode === MODE.EDIT ? itemSelected.shaft : "",
                  rules: [{ required: true, message: "Nhập từ 1-100 kí tự!" }]
                })(<Input placeholder="shaft" maxLength={100} />)}
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <span className="lab-text">Weight</span>
              <Form.Item>
                {getFieldDecorator("weight", {
                  initialValue: mode === MODE.EDIT ? itemSelected.weight : "",
                  rules: [{ required: true, message: "Nhập từ 1-100 kí tự!" }]
                })(<Input placeholder="Kích thước" type="number" />)}
              </Form.Item>
            </div>
            <div className="col-md-6">
              <span className="lab-text">Color</span>
              <Form.Item>
                {getFieldDecorator("color", {
                  initialValue: mode === MODE.EDIT ? itemSelected.color : "",
                  rules: [{ required: true, message: "Nhập từ 1-100 kí tự!" }]
                })(<Input placeholder="Màu Sắc" maxLength={100} />)}
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <span className="lab-text">Promotion</span>
              <Form.Item>
                {getFieldDecorator("promotionId", {
                  initialValue:
                    mode === MODE.EDIT && itemSelected.promotion
                      ? itemSelected.promotion.id
                      : ""
                })(
                  <Select style={{ width: "100%" }}>
                    {!isEmpty(promotionList) &&
                      promotionList.data.map(el => (
                        <Select.Option value={el.id} key={el.id}>
                          {el.type}
                        </Select.Option>
                      ))}
                  </Select>
                )}
              </Form.Item>
            </div>
            <div className="col-md-6">
              <span className="lab-text">Producer</span>
              <Form.Item>
                {getFieldDecorator("producerId", {
                  initialValue:
                    mode === MODE.EDIT && itemSelected.producer
                      ? itemSelected.producer.id
                      : "",
                  rules: [{ required: true, message: "Chọn Nhà Sản Xuất!" }]
                })(
                  <Select style={{ width: "100%" }}>
                    {!isEmpty(producerList) &&
                      producerList.data.map(el => (
                        <Select.Option value={el.id} key={el.id}>
                          {el.name}
                        </Select.Option>
                      ))}
                  </Select>
                )}
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <span className="lab-text">Image</span>
              <div>
                <UploadFirebase
                  handleChangeUpload={this.handleChangeUpload}
                  handleRemove={this.handleRemove}
                  imageUrl={urlImage}
                  fileList={fileList}
                />
              </div>
            </div>
          </div>
          {isErr && (
            <p style={{ color: "red", textAlign: "center" }}>
              Product is exit !
            </p>
          )}
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(ManageFCModal);
