import {
  FETCH_CARD_COMMENTS,
  FETCH_CARD_COMMENTS_FAIL,
  ADD_CARD_COMMENTS,
  ADD_CARD_COMMENTS_FAIL,
} from './commentTypes';
import { clearErrors, getErrors } from '../error/errorActions';
import * as api from '../../services/apiService';

export const getCardCommentsAction = (cardId) => async (dispatch) => {
  try {
    const { data } = await api.getCardComments(cardId);
    dispatch({ type: FETCH_CARD_COMMENTS, payload: data });
    dispatch(clearErrors());
  } catch (err) {
    const message = err.response.data.message;
    const status = err.response.status;
    dispatch(getErrors({ message, status, id: FETCH_CARD_COMMENTS_FAIL }));
  }
};

export const AddCardCommentsAction = (cardId, body) => async (dispatch) => {
  try {
    const { data } = await api.addCardComments(cardId, body);
    dispatch({ type: ADD_CARD_COMMENTS, payload: data.comment });
    dispatch(clearErrors());
  } catch (err) {
    const message = err.response.data.message;
    const status = err.response.status;
    dispatch(getErrors({ message, status, id: ADD_CARD_COMMENTS_FAIL }));
  }
};
