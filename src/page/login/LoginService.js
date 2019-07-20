import Cookie from 'js-cookie';

import api from '../../utils/helpers/api';
import { Constants } from '../../utils/constants';

export const requestLogin = users => {
  Cookie.remove(Constants.EXPIRED);
  Cookie.remove(Constants.TOKEN);
  console.log('USER', users);
  if (users.rememberMe) {
    Cookie.set(Constants.LAST_LOGIN, users.email);
  } else {
    Cookie.remove(Constants.LAST_LOGIN);
  }
  return api({
    method: 'post',
    url: '/user/login',
    data: users
  });
};

export const getAccountInfo = () => {
  return api({
    method: 'get',
    url: '/api/account'
  });
};
export const ForgotPassword = data => {
  return api({
    method: 'put',
    url: '/api/forgot-password',
    data
  });
};
