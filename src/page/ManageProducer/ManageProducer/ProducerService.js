import api from './../../../utils/helpers/api';
export const getAllProducer = param => {
  const defaultParams = { page: 1, element: 5 };
  return api({
    method: 'get',
    url: 'producers/',
    params: { ...defaultParams, ...param }
  });
};
export const createProducer = data => {
  return api({
    method: 'post',
    url: 'producers/',
    data
  });
};
export const updateProducer = data => {
  return api({
    method: 'put',
    url: 'producers/',
    data
  });
};
