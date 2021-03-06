import {
  GET_MOVIES_REQUEST,
  GET_MOVIES_SUCCESS,
  GET_MOVIES_FAILURE,
} from '../constants';

export default function movies(state = {}, action) {
  switch (action.type) {
    case GET_MOVIES_REQUEST:
      return {
        ...state,
      };
    case GET_MOVIES_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    case GET_MOVIES_SUCCESS:
      return {
        ...state,
        cast: action.cast,
        error: null,
        movies: action.movies,
      };
    default:
      return state;
  }
}
