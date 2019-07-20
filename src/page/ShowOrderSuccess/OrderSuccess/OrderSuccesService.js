import api from '../../../utils/helpers/api';

export const getOrderSuccess = () => {
  return api({
    method: 'get',
    url: '/api/orders/stores/orderDetails-ready'
  });
};
export const getOrderWaiting = () => {
  return api({
    method: 'get',
    url: '/api/orders/stores/orderDetails'
  });
};
