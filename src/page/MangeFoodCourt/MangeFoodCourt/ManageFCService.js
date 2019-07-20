import api from './../../../utils/helpers/api';
export const getAllProduct = param => {
  const defaultParams = { page: 1, element: 5 };
  return api({
    method: 'get',
    url: 'products/',
    params: { ...defaultParams, ...param }
  });
};
export const createProduct = data => {
  return api({
    method: 'post',
    url: 'products/',
    data
  });
};
export const updateProduct = data => {
  return api({
    method: 'put',
    url: 'products/',
    data
  });
};
export const getAllProducer = param => {
  return api({
    method: 'get',
    url: 'producers/',
    params: { ...param, page: 1, element: 100 }
  });
};
export const getAllPromotion = param => {
  return api({
    method: 'get',
    url: 'promotions/',
    params: { ...param, page: 1, element: 100 }
  });
};
