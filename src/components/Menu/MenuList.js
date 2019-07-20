import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { RouteMap } from '../../utils/constants';
import { ROLES } from '../../utils/constants/constants';

class MenuList extends Component {
  isActive = route => {
    return route === this.props.location.pathname;
  };
  getMenu = role => {
    return [
      {
        name: 'Management Customer',
        iconName: 'person',
        isShow: role === ROLES.SYSTEM_ADMIN,
        route: RouteMap.ROUTE_CREATE_FOODCOURT
      },
      {
        name: 'Management Product',
        iconName: 'art_track',
        isShow: role === ROLES.SYSTEM_ADMIN,
        route: RouteMap.ROUTE_MANAGE_FOODCOURT
      },
      {
        name: 'Management Promotion',
        iconName: 'attach_money',
        isShow: role === ROLES.SYSTEM_ADMIN,
        route: RouteMap.ROUTE_MANAGE_PROMOTION
      },
      {
        name: 'Management Producer',
        iconName: 'store',
        isShow: role === ROLES.SYSTEM_ADMIN,
        route: RouteMap.ROUTE_MANAGE_PRODUCER
      },
      {
        name: 'Management Order',
        iconName: 'assignment',
        isShow: role === ROLES.SYSTEM_ADMIN,
        route: RouteMap.ROUTE_ORDER_BADMINTON
      }
    ];
  };

  render() {
    const { role } = this.props;
    const menu = this.getMenu(role);
    return (
      <div>
        <div
          className="sidebar"
          data-color="purple"
          data-background-color="white"
          data-image="../assets/img/sidebar-1.jpg"
        >
          <div className="logo">
            <Link to={RouteMap.ROUTE_DASHBOARD}>
              <div className="simple-text logo-normal">Badminton</div>
            </Link>
          </div>
          <div className="sidebar-wrapper">
            <ul className="nav">
              {menu.map((el, index) => {
                if (el.isShow) {
                  return (
                    <li
                      key={index}
                      className={`nav-item ${this.isActive(el.route) &&
                        'active'}`}
                    >
                      <Link className="nav-link" to={el.route}>
                        <i className="material-icons">{el.iconName}</i>
                        <p>{el.name}</p>
                      </Link>
                    </li>
                  );
                }
                return '';
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(
  connect(
    state => ({
      role: state.system.role
    }),
    {
      // action
    }
  )(MenuList)
);
