import {
  GET_MOVIES_REQUEST,
  GET_MOVIES_SUCCESS,
  GET_MOVIES_FAILURE,
} from '../constants';
import moviesQuery from '../graphql-queries/movies.graphql';
import makeRequest from '../utils/make-request';

const DURATIONS = {
  'Episode I – The Phantom Menace': 136,
  'Episode II – Attack of the Clones': 142,
  'Episode III – Revenge of the Sith': 140,
  'Episode IV – A New Hope': 121,
  'Episode V – The Empire Strikes Back': 124,
  'Episode VI – Return of the Jedi': 131,
  'Episode VII – The Force Awakens': 136,
  'Episode VIII – The Last Jedi': 152,
};

function fillMoviesDurations(movies) {
  movies.sort((a, b) => a.release.localeCompare(b.release));
  console.info(movies);
  return movies.map(movie => ({
    ...movie,
    duration: DURATIONS[movie.title],
  }));
}

function requestMovies() {
  return {
    type: GET_MOVIES_REQUEST,
  };
}

function receiveMovies(response) {
  return {
    error: null,
    movies: fillMoviesDurations(response.data.movies.items),
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
