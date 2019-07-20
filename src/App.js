import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Cookie from 'js-cookie';
import jwt_decode from 'jwt-decode';
import Routes from './Routes';
import './App.scss';
import Header from './components/Header/Header';
import MenuList from './components/Menu/MenuList';
// import Footer from './components/Footer/Footer';
// import { isDiff } from './utils/helpers/helpers';
import { TOKEN } from './utils/constants/constants';
import * as routes from './utils/constants/route';
import { updateRole } from './page/system/systemAction';
class App extends Component {
  // shouldComponentUpdate(nextProps, nextState) {
  //   return isDiff(nextProps.location !== this.props.location);
  // }
  componentDidMount() {
    // refresh keep token and update role in redux
    if (Cookie.get(TOKEN)) {
      const decoded = jwt_decode(Cookie.get(TOKEN));
      console.log('decode', decoded);
      this.props.updateRole(decoded.role);
    } else {
      window.location.href = '#' + routes.ROUTE_LOGIN;
    }
  }
  render() {
    const { location } = this.props;
    const isLogin = location.pathname === '/login';
    return (
      <div className="wrapper">
        {!isLogin && <Header />}
        {!isLogin && <MenuList />}
        <div>
          <Routes />
        </div>
        {/* {!isLogin && <Footer />} */}
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
      updateRole
    }
  )(App)
);
