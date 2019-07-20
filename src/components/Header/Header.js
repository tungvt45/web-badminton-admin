import React, { Component } from 'react';
import { Dropdown, Menu, Icon, Layout } from 'antd';
import * as routes from '../../utils/constants/route';
import ChangePasswordModal from '../Modal/ChangePassword/ChangePasswordModal';

import './Header.scss';

class Header extends Component {
  state = {
    visible: false,
    type: '',
    profile: {}
  };

  handleClick = item => {
    if (item.key === routes.ROUTE_PROFILE) {
      this.setState({ visible: true, type: 'profile' });
    } else if (item.key === routes.ROUTE_CHANGE_PASSWORD) {
      this.setState({ visible: true, type: 'password' });
    } else {
      window.location.href = '#' + item.key;
    }
  };
  handleCancelModal = () => this.setState({ visible: false, type: '' });

  render() {
    const { visible, type } = this.state;
    const menu = (
      <Menu onClick={this.handleClick}>
        <Menu.Item key={routes.ROUTE_CHANGE_PASSWORD}>
          Change Password
        </Menu.Item>
        <Menu.Item key={routes.ROUTE_LOGOUT}>Logout</Menu.Item>
      </Menu>
    );
    return (
      <Layout.Header className="header-container">
        <Dropdown overlay={menu}>
          <Icon type="user" className="user-icon" />
        </Dropdown>

        {visible && type === 'password' && (
          <ChangePasswordModal
            visible={visible}
            cancelModal={this.handleCancelModal}
          />
        )}
      </Layout.Header>
    );
  }
}

export default Header;
