import { CHANGE_QUERY } from '../constants';

export default function changeQuery(params) {
  return {
    castName: params.castName || null,
    movieTitle: params.movieTitle || null,
    order: params.order || null,
    type: CHANGE_QUERY,
  };
}
