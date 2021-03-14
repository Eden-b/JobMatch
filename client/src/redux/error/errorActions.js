import { CLEAR_ERRORS, GET_ERRORS } from './errorTypes';

export const getErrors = ({ message, status, id = null }) => {
  return {
    type: GET_ERRORS,
    payload: {
      message,
      status,
      id,
    },
  };
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
