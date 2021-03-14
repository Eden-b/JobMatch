import {
  FETCH_ALL_CARDS,
  FETCH_USER_CARDS,
  FETCH_USER_CARDS_FAIL,
  FETCH_USER_CARDS_SUCCESS,
  FETCH_ALL_SUCCESS,
  FETCH_ALL_FAIL,
  ADD_CARD,
  DELETE_CARD,
  ADD_CARD_ERROR,
  EDIT_CARD,
  FETCH_FAVORITES_CARDS,
  ADD_FAVORITE_CARD,
  DELETE_FAVORITE_CARD,
  FETCH_SEARCHED_CARDS,
  CLEAR_SEARCHED_CARDS,
  CLEAR_CARDS,
} from './cardTypes';

const initialState = {
  cards: [],
  myCards: [],
  favorites: [],
  searched: [],
  isLoading: null,
  succussMsg: null,
};

const cardReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_CARDS:
    case FETCH_USER_CARDS:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_ALL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        cards: [...action.payload],
      };
    case FETCH_USER_CARDS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        myCards: [...action.payload.cards],
      };
    case FETCH_FAVORITES_CARDS:
      return {
        ...state,
        favorites: [...action.payload.favorites],
      };
    case FETCH_SEARCHED_CARDS:
      return {
        ...state,
        searched: [...action.payload.cards],
      };
    case CLEAR_SEARCHED_CARDS:
      return {
        ...state,
        searched: [],
      };
    case ADD_FAVORITE_CARD:
      return {
        ...state,
        favorites: [...state.favorites, action.payload.card],
      };
    case ADD_CARD:
      return {
        ...state,
        myCards: [...state.myCards, action.payload.card],
        succussMsg: action.payload.message,
      };

    case DELETE_FAVORITE_CARD:
      return {
        ...state,
        favorites: [
          ...state.favorites.filter((card) => card._id !== action.payload.card),
        ],
      };

    case DELETE_CARD:
      return {
        ...state,
        myCards: [
          ...state.myCards.filter((card) => card._id !== action.payload.id),
        ],
        succussMsg: action.payload.message,
      };
    case EDIT_CARD:
      return {
        ...state,
        myCards: [
          ...state.myCards.map((card) => {
            if (card._id === action.payload.card._id)
              card = action.payload.card;
            return card;
          }),
        ],
        succussMsg: action.payload.message,
      };

    case ADD_CARD_ERROR:
    case FETCH_ALL_FAIL:
    case FETCH_USER_CARDS_FAIL:
    case CLEAR_CARDS:
      return {
        cards: [],
        myCards: [],
        favorites: [],
        searched: [],
        isLoading: false,
      };

    default:
      return state;
  }
};

export default cardReducer;
