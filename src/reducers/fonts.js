import { FONTS_LOADED } from '../constants';

export default function query(state = {}, action) {
  switch (action.type) {
    case FONTS_LOADED:
      return {
        ...state,
        loaded: action.loaded,
      };
    default:
      return state;
  }
}
