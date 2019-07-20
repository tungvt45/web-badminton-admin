import api from './../../../utils/helpers/api';
export const getAllPromotion = param => {
  const defaultParams = { page: 1, element: 5 };
  return api({
    method: 'get',
    url: 'promotions/',
    params: { ...defaultParams, ...param }
  });
};
export const createPromotion = data => {
  return api({
    method: 'post',
    url: 'promotions/',
    data
  });
};
export const updatePromotion = data => {
  return api({
    method: 'put',
    url: 'promotions/',
    data
  });
};
