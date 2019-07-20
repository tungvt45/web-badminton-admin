import api from '../../utils/helpers/api';

export const getListFeedBack = () => {
    return api({
      method: 'get',
      url: '/api/stores/feedbacks'
    });
  };