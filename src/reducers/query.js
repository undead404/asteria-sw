import { CHANGE_QUERY } from '../constants';

export default function query(state = {}, action) {
  switch (action.type) {
    case CHANGE_QUERY:
      return {
        ...state,
        castName: action.castName,
        movieTitle: action.movieTitle,
        order: action.order,
      };
    default:
      return state;
  }
}
