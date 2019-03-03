import { combineReducers } from 'redux';
import fonts from './fonts';
import movies from './movies';
import query from './query';

export default combineReducers({
  fonts,
  movies,
  query,
});
