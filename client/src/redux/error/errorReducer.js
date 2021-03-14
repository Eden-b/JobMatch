import { CLEAR_ERRORS, GET_ERRORS } from './errorTypes';

const intialState = {
  message: {},
  status: null,
  id: null,
};

const errorReducer = function (state = intialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return {
        message: action.payload.message,
        status: action.payload.status,
        id: action.payload.id,
      };

    case CLEAR_ERRORS:
      return {
        message: {},
        status: null,
        id: null,
      };

    default:
      return state;
  }
};

export default errorReducer;
