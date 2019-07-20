import api from '../../../utils/helpers/api';

export const getStoreStatic = param => {
  return api({
    method: 'get',
    url: '/api/statistic-fcs',
    params: { ...param }
  });
};
