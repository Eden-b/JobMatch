import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
} from './authTypes';

const initialState = {
  // token: localStorage.getItem('token'),
  token: null,
  isAuthenticated: null,
  isLoading: false,
  user: null,
  successMsg: '',
};

const authReducer = function (state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };

    case USER_LOADED:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        token: action.payload,
      };
    case REGISTER_SUCCESS:
      // localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        isLoading: false,
        successMsg: action.payload.message,
        // isAuthenticated: true,
      };
    case LOGIN_SUCCESS:
      // localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        isLoading: false,
        successMsg: '',
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    case LOGIN_FAIL:
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGOUT_SUCCESS:
      // localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        successMsg: '',
      };

    default:
      return state;
  }
};

export default authReducer;
