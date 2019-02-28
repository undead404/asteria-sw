import {
  GET_MOVIES_REQUEST,
  GET_MOVIES_SUCCESS,
  GET_MOVIES_FAILURE,
} from '../constants';
import moviesQuery from '../graphql-queries/movies.graphql';
import makeRequest from '../utils/make-request';

function requestMovies() {
  return {
    type: GET_MOVIES_REQUEST,
  };
}

function receiveMovies(response) {
  return {
    error: null,
    movies: response.data.movies.items,
    type: GET_MOVIES_SUCCESS,
  };
}

function receiveMoviesError(error) {
  return {
    error,
    type: GET_MOVIES_FAILURE,
  };
}

export default function getMovies() {
  return makeRequest(
    [requestMovies, receiveMovies, receiveMoviesError],
    moviesQuery,
  );
}
