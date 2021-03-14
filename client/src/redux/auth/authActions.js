import * as api from '../../services/apiService';
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  AUTH_ERROR,
  USER_LOADED,
  USER_LOADING,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
} from './authTypes';
import { CLEAR_CARDS } from '../card/cardTypes';
import { getErrors, clearErrors } from '../error/errorActions';
// import { CLEAR_ERRORS } from '../error/errorTypes';
// import { GET_ERRORS } from '../error/errorTypes';

const userLoading = () => {
  return {
    type: USER_LOADING,
  };
};

const authError = () => {
  return {
    type: AUTH_ERROR,
  };
};

const userLoaded = (data) => {
  return {
    type: USER_LOADED,
    payload: data,
  };
};
// auto user auth when app load.
export const loadUser = () => async (dispatch, getState) => {
  // Loading user
  dispatch(userLoading());

  // const token = getState().auth.token;
  const token = await localStorage.getItem('token');

  //save token in header if exists && loadUser
  if (token) {
    // api.setTokenAsDefault(token);

    return dispatch(userLoaded(token));
  }
  // api.setTokenAsDefault(null);
  dispatch(authError());
  await localStorage.removeItem('item');
  return dispatch(getErrors({ message: 'token not provided' }));
};

//user registration.
export const userRegister = (body, message) => (dispatch) => {
  dispatch(loadUser());
  api
    .userRegister(body)
    .then(() => {
      dispatch({ type: REGISTER_SUCCESS, payload: { message } });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({ type: REGISTER_FAIL });
      return dispatch(
        getErrors({
          message: err.response.data.message,
          status: err.response.status,
          id: REGISTER_FAIL,
        })
      );
    });
};

//user login
export const userLogin = (body) => async (dispatch) => {
  try {
    const { data } = await api.userLogin(body);
    await localStorage.setItem('token', data.token);
    await localStorage.setItem('user', JSON.stringify(data.user));
    dispatch({ type: LOGIN_SUCCESS, payload: { ...data } });
    dispatch(clearErrors());
    window.location = '/';
  } catch (err) {
    await localStorage.removeItem('token');
    await localStorage.removeItem('user');
    dispatch({ type: LOGIN_FAIL });
    dispatch(
      getErrors({
        message: err.response.data.message,
        status: err.response.status,
        id: LOGIN_FAIL,
      })
    );
  }
};

export const userLogout = () => async (dispatch) => {
  try {
    localStorage.clear();
    dispatch({ type: LOGOUT_SUCCESS });
    dispatch({ type: CLEAR_CARDS });
    window.location = '/';
  } catch (err) {
    console.log(err);
  }
};
