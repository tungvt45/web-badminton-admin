import React from 'react';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
import cookie from 'js-cookie';
import { connect } from 'react-redux';
import { Constants, RouteMap } from './utils/constants';

import Login from './page/login/Login';
import NotFound from './page/NotFound';
import CreateFoodCourt from './page/CreateFoodCourt/CreateFoodCourt/CreateFoodCourt';
import ManageFoodCourt from './page/MangeFoodCourt/MangeFoodCourt/ManageFCPage';
import ManageOrderPage from './page/ManagerOder/ManagerOder/ManageOrderPage';
import ManagePromotionPage from './page/ManagePromotion/ManagePromotion/ManagePromotionPage';
import ManagerProducerPage from './page/ManageProducer/ManageProducer/ManageProducerPage';
const Logout = () => {
  cookie.remove(Constants.TOKEN);
  return <Redirect to={RouteMap.ROUTE_LOGIN} />;
};

const Routes = ({ location, role }) => {
  const token = cookie.get(Constants.TOKEN);
  if (!token && location.pathname !== RouteMap.ROUTE_LOGIN) {
    return <Redirect to={RouteMap.ROUTE_LOGIN} />;
  }
  const checkRole = () => {
    if (role === Constants.ROLES.SYSTEM_ADMIN) {
      return RouteMap.ROUTE_CREATE_FOODCOURT;
    }
    return Route.ROUTE_LOGIN;
  };
  return (
    <Switch>
      <Redirect from="#/" to={checkRole} />
      <Route
        exact
        path={RouteMap.ROUTE_DASHBOARD}
        component={CreateFoodCourt}
      />
      <Route exact path={RouteMap.ROUTE_LOGIN} component={Login} />
      <Route exact path={RouteMap.ROUTE_LOGOUT} component={Logout} />
      <Route
        exact
        path={RouteMap.ROUTE_MANAGE_FOODCOURT}
        component={ManageFoodCourt}
      />
      <Route
        exact
        path={RouteMap.ROUTE_CREATE_FOODCOURT}
        component={CreateFoodCourt}
      />
      <Route
        exact
        path={RouteMap.ROUTE_MANAGE_PROMOTION}
        component={ManagePromotionPage}
      />
      <Route
        exact
        path={RouteMap.ROUTE_MANAGE_PRODUCER}
        component={ManagerProducerPage}
      />
      <Route
        exact
        path={RouteMap.ROUTE_ORDER_BADMINTON}
        component={ManageOrderPage}
      />
      ;
      <Route component={NotFound} />
    </Switch>
  );
};

export default withRouter(
  connect(
    state => ({
      role: state.system.role
    }),
    {
      // action
    }
  )(Routes)
);
