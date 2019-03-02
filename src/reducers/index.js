import { combineReducers } from 'redux';
import movies from './movies';
import query from './query';

export default combineReducers({
  movies,
  query,
});
