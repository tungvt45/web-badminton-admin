import api from '../../../utils/helpers/api'; //config api with axios
export const getListOrder = () => {
  return api({
    method: 'get',
    url: '/order'
  });
};
export const getListOrderDetails = params => {
  return api({
    method: 'get',
    url: '/orderDetail',
    params
  });
};
