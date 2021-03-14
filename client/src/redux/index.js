import { combineReducers } from 'redux';
import authReducer from './auth/authReducer';
import errorReducer from './error/errorReducer';
import cardReducer from './card/cardReducer';
import commentReducer from './comments/commentReducer';

export default combineReducers({
  auth: authReducer,
  error: errorReducer,
  card: cardReducer,
  comments: commentReducer,
});
