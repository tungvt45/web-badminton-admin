import api from '../../../utils/helpers/api';

export const getOrderCancel = () => {
  return api({
    method: 'get',
    url: '/api/orders/orders/order-cancel'
  });
};
export const rollbackOrder = params => {
  return api({
    method: 'post',
    url: '/api/orders/rollback-order',
    params
  });
};
