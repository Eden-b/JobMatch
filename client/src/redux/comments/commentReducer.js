import {
  FETCH_CARD_COMMENTS,
  FETCH_CARD_COMMENTS_FAIL,
  ADD_CARD_COMMENTS,
} from './commentTypes';

const initialState = {
  comments: [],
};

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CARD_COMMENTS:
      return {
        ...state,
        comments: [...action.payload.comments],
      };
    case ADD_CARD_COMMENTS:
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };
    case FETCH_CARD_COMMENTS_FAIL:
      return {
        ...state,
        comments: [],
      };

    default:
      return state;
  }
};

export default commentReducer;
