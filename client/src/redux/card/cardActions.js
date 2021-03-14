import {
  FETCH_ALL_CARDS,
  FETCH_ALL_FAIL,
  FETCH_ALL_SUCCESS,
  FETCH_USER_CARDS,
  FETCH_USER_CARDS_FAIL,
  FETCH_USER_CARDS_SUCCESS,
  ADD_CARD,
  DELETE_CARD,
  ADD_CARD_ERROR,
  DELETE_CARD_ERROR,
  EDIT_CARD,
  FETCH_FAVORITES_CARDS,
  ADD_FAVORITE_CARD,
  DELETE_FAVORITE_CARD,
  FETCH_SEARCHED_CARDS,
  CLEAR_SEARCHED_CARDS,
} from './cardTypes';

import { clearErrors, getErrors } from '../error/errorActions';

import * as api from '../../services/apiService';
export const getAllCardsAction = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_ALL_CARDS });
    const { data } = await api.getAllCards();
    dispatch({ type: FETCH_ALL_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: FETCH_ALL_FAIL });
    dispatch(
      getErrors({
        message: err.response.data,
        status: err.status,
        id: FETCH_ALL_FAIL,
      })
    );
  }
};

export const getUserFavoriteCardsAction = () => async (dispatch) => {
  try {
    const { data } = await api.getUserFavoriteCards();
    dispatch({ type: FETCH_FAVORITES_CARDS, payload: data });
  } catch (err) {}
};

export const AddUserFavoriteCardAction = (id) => async (dispatch) => {
  try {
    // console.log(id);
    const { data } = await api.addUserFavoriteCard(id);
    dispatch({ type: ADD_FAVORITE_CARD, payload: data });
  } catch (err) {
    console.log(err.response);
  }
};

export const deleteUserFavoriteCardAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.deleteUserFavoriteCard(id);
    dispatch({ type: DELETE_FAVORITE_CARD, payload: data });
  } catch (err) {
    console.log(err.response.data);
  }
};

export const getAllUserCardsAction = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_USER_CARDS });
    const { data } = await api.getUserCards();
    dispatch({ type: FETCH_USER_CARDS_SUCCESS, payload: data });
    dispatch(clearErrors());
  } catch (err) {
    dispatch({ type: FETCH_USER_CARDS_FAIL });
    dispatch(
      getErrors({
        message: err.response.data,
        status: err.status,
        id: FETCH_USER_CARDS_FAIL,
      })
    );
  }
};

export const addCardAction = (body) => async (dispatch) => {
  try {
    const { data } = await api.addUserCard(body);
    dispatch({ type: ADD_CARD, payload: data });
  } catch (err) {
    dispatch({ type: ADD_CARD_ERROR });
    getErrors({
      message: err.response.data,
      status: err.status,
      id: ADD_CARD_ERROR,
    });
  }
};

export const deleteCardAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.deleteCard(id);
    dispatch({ type: DELETE_CARD, payload: { ...data, id } });
  } catch (err) {
    dispatch({ type: DELETE_CARD_ERROR });
    getErrors({
      message: err.response.data,
      status: err.status,
      id: DELETE_CARD_ERROR,
    });
  }
};

export const editCardAction = (id, body) => async (dispatch) => {
  try {
    const { data } = await api.editCard(id, body);
    dispatch({ type: EDIT_CARD, payload: data });
  } catch (err) {
    console.log(err);
  }
};


export const getSearchedCardsAction = (q) => async (dispatch) => {
  try {
    const { data } = await api.searchCard(q);

    dispatch({ type: FETCH_SEARCHED_CARDS, payload: data });
  } catch (err) {
    console.log(err);
  }
};

export const clearSearchedCardsAction = () => async (dispatch) => {
  try {
    dispatch({ type: CLEAR_SEARCHED_CARDS });
  } catch (err) {
    console.log(err);
  }
};
