import React, { Component } from 'react';
import { Button, Table, Tooltip, Icon, Collapse } from 'antd';
import FoodOptionModal from './FoodOptionModal';
import TypeModal from './TypeModal';
import { MODE } from '../../../utils/constants/constants';
import { getAllFoodOption } from './FoodOptionService';
import { isEmpty } from '../../../utils/helpers/helpers';
import './FoodOption.scss';
const Panel = Collapse.Panel;

class FoodOptionPage extends Component {
  state = {
    listFoodOption: [],
    typeModal: { visible: false, mode: MODE.ADD, item: {} },
    subFoodOptionModal: { visible: false, mode: MODE.ADD, item: {}, parent: {} }
  };
  componentDidMount() {
    this.fetchFoodOption();
  }
  fetchFoodOption = async () => {
    try {
      const res = await getAllFoodOption();
      this.setState({ listFoodOption: res.data });
      console.log('listFoodOption', res.data);
    } catch (err) {}
  };
  // type modal
  createTypeModal = () => {
    const temp = { visible: true, mode: MODE.ADD, item: {} };
    this.setState({ typeModal: temp });
  };
  editTypeModal = element => {
    const temp = { visible: true, mode: MODE.EDIT, item: element };
    this.setState({ typeModal: temp });
  };
  cancelTypeModal = () => {
    const temp = { visible: false, mode: MODE.ADD, item: {} };
    this.setState({ typeModal: temp });
  };
  // sub FoodOption modal
  createSubFoodOptionModal = el => {
    const temp = { visible: true, mode: MODE.ADD, item: {}, parent: el };
    this.setState({ subFoodOptionModal: temp });
  };
  editSubFoodOptionModal = (element, parentElement) => {
    const temp = {
      visible: true,
      mode: MODE.EDIT,
      item: element,
      parent: parentElement
    };
    this.setState({ subFoodOptionModal: temp });
  };
  cancelSubFoodOptionModal = () => {
    const temp = { visible: false, mode: MODE.ADD, item: {}, parent: {} };
    this.setState({ subFoodOptionModal: temp });
  };
  render() {
    const { typeModal, subFoodOptionModal, listFoodOption } = this.state;

    const columns = [
      {
        title: 'Tên Món Ăn Thêm',
        dataIndex: 'foName',
        key: 'foName',
        align: 'center'
      },
      {
        title: 'Giá Tiền',
        dataIndex: 'optionPrice',
        key: 'optionPrice',
        align: 'center'
      },
      {
        title: 'Hành Động',
        dataIndex: 'action',
        render: (text, record) => (
          <Tooltip title="Update">
            <Icon
              type="edit"
              className="edit-icon"
              onClick={() => this.editSubFoodOptionModal(record)}
            />
          </Tooltip>
        ),
        align: 'center',
        key: 'action'
      }
    ];
    return (
      <div className="food-option-container">
        <div className="col-lg-10">
          <div className="card">
            <div className="header-wrapper">
              <p className="header-page">Danh Mục Món Ăn Thêm</p>
              <Button type="primary" onClick={this.createTypeModal}>
                <Icon type="plus-circle" />
                Tạo Mới Danh Mục Món Ăn Thêm
              </Button>
            </div>

            <div className="card-body">
              <Collapse
                bordered={false}
                expandIcon={({ isActive }) => (
                  <Icon type="caret-right" rotate={isActive ? 90 : 0} />
                )}
              >
                {!isEmpty(listFoodOption) &&
                  listFoodOption.map(el => (
                    <Panel
                      header={el.foodOptionNameParent}
                      key={el.foId}
                      className="panel-item"
                      extra={
                        <span>
                          <Tooltip title="Tạo Danh Mục Món Ăn Thêm">
                            <Icon
                              style={{ color: 'blue' }}
                              type="plus-circle"
                              onClick={e => {
                                this.createSubFoodOptionModal(el);
                                e.stopPropagation();
                              }}
                            />
                          </Tooltip>
                          &nbsp; &nbsp;&nbsp;
                          <Tooltip title="Chỉnh Sửa Danh Mục Món Ăn Thêm">
                            <Icon
                              type="edit"
                              onClick={e => {
                                this.editTypeModal(el);
                                e.stopPropagation();
                              }}
                            />
                          </Tooltip>
                        </span>
                      }
                    >
                      {!isEmpty(el.foodOptionVMS) && (
                        <Table
                          dataSource={el.foodOptionVMS}
                          columns={columns}
                          pagination={false}
                          bordered
                        />
                      )}
                      {/* {!isEmpty(el.foodOptionVMS) &&
                        el.foodOptionVMS.map(item => (
                          <div className="sub-cate-item" key={item.foId}>
                            
                            <p className="text-item">{item.foName}</p>
                            <p>{item.optionPrice}</p>

                            <Tooltip title="Chỉnh Sửa Món Ăn Thêm">
                              <Icon
                                type="edit"
                                onClick={e => {
                                  this.editSubFoodOptionModal(item, el);
                                  e.stopPropagation();
                                }}
                              />
                            </Tooltip>
                          </div>
                        ))} */}
                    </Panel>
                  ))}
              </Collapse>
            </div>
          </div>
        </div>
        {typeModal.visible && (
          <TypeModal
            typeModal={typeModal}
            cancelModal={this.cancelTypeModal}
            fetchData={this.fetchFoodOption}
          />
        )}
        {subFoodOptionModal.visible && (
          <FoodOptionModal
            subFoodOptionModal={subFoodOptionModal}
            cancelModal={this.cancelSubFoodOptionModal}
            fetchData={this.fetchFoodOption}
          />
        )}
      </div>
    );
  }
}

export default FoodOptionPage;
