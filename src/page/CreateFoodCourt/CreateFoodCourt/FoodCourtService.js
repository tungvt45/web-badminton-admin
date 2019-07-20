import api from '../../../utils/helpers/api'; //config api with axios

export const getListRoles = () => {
  return api({
    method: 'get',
    url: '/api/all-role'
  });
};
export const getListUser = () => {
  return api({
    method: 'get',
    url: '/user'
  });
};
export const getListFoodCourt = () => {
  return api({
    method: 'get',
    url: '/api/foodcourt/all'
  });
};
export const createFoodCourt = data => {
  return api({
    method: 'post',
    url: '/api/auth/sign-up',
    data
  });
};
export const updateStatusUser = data => {
  return api({
    method: 'put',
    url: '/user/update',
    data
  });
};
export const searchUser = params => {
  return api({
    method: 'get',
    url: '/api/search-emp',
    params
  });
};
